import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY is not set");
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified", { keyPrefix: stripeKey.substring(0, 8) });

    // Use service role key for authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header provided");
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } =
      await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("ERROR: Authentication error", { error: userError.message });
      throw new Error(`Authentication error: ${userError.message}`);
    }

    const user = userData.user;
    if (!user?.email) {
      logStep("ERROR: User not authenticated or email not available");
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Find customer
    logStep("Searching for Stripe customer", { email: user.email });
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      logStep("ERROR: No Stripe customer found", { email: user.email });
      throw new Error(
        "No Stripe customer found for this user. Please contact support."
      );
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", {
      customerId,
      customerEmail: customers.data[0].email,
    });

    // Check if customer has active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    logStep("Customer subscriptions", {
      customerId,
      activeSubscriptions: subscriptions.data.length,
      subscriptionIds: subscriptions.data.map((sub) => sub.id),
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    logStep("Creating customer portal session", {
      customerId,
      returnUrl: `${origin}/dashboard/billing`,
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard/billing`,
    });

    logStep("Customer portal session created successfully", {
      sessionId: portalSession.id,
      url: portalSession.url,
      customerId: portalSession.customer,
    });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logStep("ERROR in customer-portal", {
      message: errorMessage,
      stack: errorStack,
      errorType: error.constructor.name,
    });

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: "Check the Edge Function logs for more information",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
