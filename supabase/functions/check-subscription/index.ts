import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use service role key to bypass RLS for upsert operations
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Find customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating to basic tier");
      await supabaseClient.from("profiles").upsert({
        id: user.id,
        email: user.email,
        stripe_customer_id: null,
        subscription_tier: 'basic',
        access_limit: 20,
        billing_cycle: 'monthly',
        subscription_price: 0,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });
      
      return new Response(JSON.stringify({ 
        subscription_tier: 'basic',
        access_limit: 20,
        billing_cycle: 'monthly',
        subscription_end: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    let subscriptionTier = 'basic';
    let accessLimit = 20;
    let billingCycle = 'monthly';
    let subscriptionPrice = 0;
    let subscriptionEnd = null;

    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      
      // Get price info
      const priceId = subscription.items.data[0].price.id;
      const price = await stripe.prices.retrieve(priceId);
      const amount = price.unit_amount || 0;
      subscriptionPrice = amount;
      billingCycle = price.recurring?.interval === 'year' ? 'yearly' : 'monthly';
      
      // Determine tier based on price
      if (billingCycle === 'monthly') {
        if (amount === 900) { subscriptionTier = 'basic'; accessLimit = 20; }
        else if (amount === 2900) { subscriptionTier = 'pro'; accessLimit = 100; }
        else if (amount === 9900) { subscriptionTier = 'enterprise'; accessLimit = 500; }
      } else { // yearly
        if (amount === 9000) { subscriptionTier = 'basic'; accessLimit = 20; }
        else if (amount === 29000) { subscriptionTier = 'pro'; accessLimit = 100; }
        else if (amount === 99000) { subscriptionTier = 'enterprise'; accessLimit = 500; }
      }
      
      logStep("Active subscription found", { 
        subscriptionId: subscription.id, 
        tier: subscriptionTier,
        amount,
        billingCycle,
        endDate: subscriptionEnd 
      });
    } else {
      logStep("No active subscription found");
    }

    // Update profile in database
    await supabaseClient.from("profiles").upsert({
      id: user.id,
      email: user.email,
      stripe_customer_id: customerId,
      subscription_tier: subscriptionTier,
      access_limit: accessLimit,
      billing_cycle: billingCycle,
      subscription_price: subscriptionPrice,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    logStep("Updated database with subscription info", { 
      tier: subscriptionTier,
      accessLimit,
      billingCycle,
      price: subscriptionPrice
    });

    return new Response(JSON.stringify({
      subscription_tier: subscriptionTier,
      access_limit: accessLimit,
      billing_cycle: billingCycle,
      subscription_price: subscriptionPrice,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});