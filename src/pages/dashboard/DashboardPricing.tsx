import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Zap, Crown, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardPricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { subscriptionTier, openCustomerPortal } = useSubscription();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for getting started",
      monthlyPrice: 9,
      yearlyPrice: 90,
      reveals: 20,
      features: [
        "20 contact reveals per month",
        "Basic investor search",
        "Email support",
        "Basic filters"
      ],
      icon: Star,
      color: "text-blue-500",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      ctaText: "Current Plan"
    },
    {
      id: "pro",
      name: "Pro",
      description: "Best for growing businesses",
      monthlyPrice: 29,
      yearlyPrice: 290,
      reveals: 100,
      features: [
        "100 contact reveals per month",
        "Advanced search filters",
        "Export to CSV/Excel",
        "Priority email support",
        "Advanced analytics",
        "Custom saved lists"
      ],
      icon: Zap,
      color: "text-red-500",
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
      ctaText: "Upgrade to Pro",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For teams and large organizations",
      monthlyPrice: 99,
      yearlyPrice: 990,
      reveals: 500,
      features: [
        "500 contact reveals per month",
        "All Pro features",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
        "White-label options"
      ],
      icon: Crown,
      color: "text-purple-500",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50",
      ctaText: "Upgrade to Enterprise"
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) return;

    setLoadingPlan(planId);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          plan: planId,
          billingCycle: isYearly ? "yearly" : "monthly"
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (plan: any) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: any) => {
    const yearlyTotal = plan.monthlyPrice * 12;
    const savings = yearlyTotal - plan.yearlyPrice;
    const percentage = Math.round((savings / yearlyTotal) * 100);
    return { amount: savings, percentage };
  };

  const isCurrentPlan = (planId: string) => {
    return subscriptionTier?.toLowerCase() === planId;
  };

  const getPlanCtaText = (plan: any) => {
    if (isCurrentPlan(plan.id)) {
      return "Current Plan";
    }
    if (plan.id === "basic" && subscriptionTier !== "basic") {
      return "Downgrade";
    }
    return plan.ctaText;
  };

  const shouldShowUpgrade = (planId: string) => {
    const tierOrder = { basic: 1, pro: 2, enterprise: 3 };
    const currentTierLevel = tierOrder[subscriptionTier?.toLowerCase() as keyof typeof tierOrder] || 1;
    const planLevel = tierOrder[planId as keyof typeof tierOrder];
    return planLevel > currentTierLevel;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Pricing Plans
        </h1>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            You're currently on the {subscriptionTier} plan
          </CardTitle>
          <CardDescription>
            {subscriptionTier !== "basic" && (
              <div className="flex items-center gap-2">
                <span>Manage your subscription or billing details</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openCustomerPortal}
                  className="h-7"
                >
                  Manage Subscription
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            )}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <Label htmlFor="billing-toggle" className="text-base">
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label htmlFor="billing-toggle" className="text-base">
          Yearly
        </Label>
        {isYearly && (
          <Badge variant="secondary" className="ml-2">
            Save up to 17%
          </Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const PlanIcon = plan.icon;
          const price = getPrice(plan);
          const savings = getSavings(plan);
          const isCurrent = isCurrentPlan(plan.id);
          const showUpgrade = shouldShowUpgrade(plan.id);

          return (
            <Card
              key={plan.id}
              className={`relative ${plan.borderColor} ${
                isCurrent ? 'ring-2 ring-primary shadow-lg scale-105' : 
                plan.popular && !isCurrent ? 'ring-2 ring-primary/50 shadow-lg' : ''
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Current Plan
                  </Badge>
                </div>
              )}
              {plan.popular && !isCurrent && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto ${plan.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <PlanIcon className={`h-8 w-8 ${plan.color}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-card-foreground">
                      ${price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && savings.amount > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Save ${savings.amount} ({savings.percentage}% off)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-card-foreground">
                    {plan.reveals} contacts
                  </div>
                  <div className="text-sm text-muted-foreground">
                    reveals per month
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isCurrent ? "secondary" : showUpgrade ? "default" : "outline"}
                  size="lg"
                  onClick={() => isCurrent ? openCustomerPortal() : handleSubscribe(plan.id)}
                  disabled={loadingPlan === plan.id || isCurrent}
                >
                  {loadingPlan === plan.id ? "Loading..." : getPlanCtaText(plan)}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          All plans include verified investor contacts, regular database updates, and the ability to cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default DashboardPricing;