import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Use service role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      logStep("Webhook signature verification failed", { error: err.message });
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    logStep("Event received", { type: event.type, id: event.id });

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event, supabaseClient, stripe);
        break;
      case "checkout.session.completed":
        await handleCheckoutCompleted(event, supabaseClient, stripe);
        break;
      default:
        logStep(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function handleSubscriptionChange(
  event: Stripe.Event,
  supabaseClient: any,
  stripe: Stripe
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  logStep("Handling subscription change", {
    subscriptionId: subscription.id,
    customerId,
    status: subscription.status,
  });

  // Get customer details
  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;
  if (!customer.email) {
    logStep("No email found for customer", { customerId });
    return;
  }

  // Find user by email
  const { data: userData, error: userError } =
    await supabaseClient.auth.admin.listUsers();
  if (userError) throw new Error(`Failed to list users: ${userError.message}`);

  const user = userData.users.find((u: any) => u.email === customer.email);
  if (!user) {
    logStep("No user found for email", { email: customer.email });
    return;
  }

  let subscriptionTier = "free";
  let accessLimit = 10;
  let billingCycle = "monthly";
  let subscriptionPrice = 0;
  let subscriptionEnd = null;

  if (subscription.status === "active") {
    subscriptionEnd = new Date(
      subscription.current_period_end * 1000
    ).toISOString();

    // Get price info
    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId);
    const amount = price.unit_amount || 0;
    subscriptionPrice = amount;
    billingCycle = price.recurring?.interval === "year" ? "yearly" : "monthly";

    // Determine tier based on price
    if (billingCycle === "monthly") {
      if (amount === 1900) {
        subscriptionTier = "starter";
        accessLimit = 100;
      } else if (amount === 4900) {
        subscriptionTier = "premium";
        accessLimit = 500;
      }
    } else {
      // yearly
      if (amount === 19000) {
        subscriptionTier = "starter";
        accessLimit = 100;
      } else if (amount === 49000) {
        subscriptionTier = "premium";
        accessLimit = 500;
      }
    }
  }

  // Update profile in database
  await supabaseClient.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      stripe_customer_id: customerId,
      subscription_tier: subscriptionTier,
      access_limit: accessLimit,
      billing_cycle: billingCycle,
      subscription_price: subscriptionPrice,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  logStep("Updated user subscription", {
    userId: user.id,
    tier: subscriptionTier,
    accessLimit,
    billingCycle,
  });
}

async function handleCheckoutCompleted(
  event: Stripe.Event,
  supabaseClient: any,
  stripe: Stripe
) {
  const session = event.data.object as Stripe.Checkout.Session;

  logStep("Handling checkout completed", {
    sessionId: session.id,
    customerId: session.customer,
  });

  // The subscription should be handled by subscription.created event
  // This is just for logging/tracking purposes
  if (session.metadata?.user_id) {
    logStep("Checkout completed for user", {
      userId: session.metadata.user_id,
      sessionId: session.id,
    });
  }
}
