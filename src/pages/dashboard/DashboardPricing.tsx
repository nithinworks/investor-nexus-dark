
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
      color: "text-blue-400",
      borderColor: "border-blue-500/20",
      bgColor: "bg-blue-500/10",
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
      color: "text-red-400",
      borderColor: "border-red-500/20",
      bgColor: "bg-red-500/10",
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
      color: "text-purple-400",
      borderColor: "border-purple-500/20",
      bgColor: "bg-purple-500/10",
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
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-satoshi">
          Pricing Plans
        </h1>
        <p className="text-gray-400 font-satoshi text-sm md:text-base mt-2">
          Choose the plan that best fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-white font-satoshi text-lg">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            You're currently on the {subscriptionTier} plan
          </CardTitle>
          <CardDescription className="font-satoshi">
            {subscriptionTier !== "basic" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span className="text-gray-300">Manage your subscription or billing details</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openCustomerPortal}
                  className="h-8 px-3 text-xs font-satoshi border-white/20 text-white hover:bg-white/10"
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
      <div className="flex items-center justify-center space-x-4 py-4">
        <Label htmlFor="billing-toggle" className="text-white font-satoshi text-sm">
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label htmlFor="billing-toggle" className="text-white font-satoshi text-sm">
          Yearly
        </Label>
        {isYearly && (
          <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 font-satoshi text-xs">
            Save up to 17%
          </Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {plans.map((plan) => {
          const PlanIcon = plan.icon;
          const price = getPrice(plan);
          const savings = getSavings(plan);
          const isCurrent = isCurrentPlan(plan.id);
          const showUpgrade = shouldShowUpgrade(plan.id);

          return (
            <Card
              key={plan.id}
              className={`relative backdrop-blur-xl bg-white/5 border transition-all duration-300 hover:bg-white/10 hover:scale-105 ${plan.borderColor} ${
                isCurrent ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : 
                plan.popular && !isCurrent ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/10' : ''
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-satoshi text-xs px-3 py-1">
                    Current Plan
                  </Badge>
                </div>
              )}
              {plan.popular && !isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-red-600 text-white font-satoshi text-xs px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto ${plan.bgColor} rounded-2xl flex items-center justify-center mb-4 border ${plan.borderColor}`}>
                  <PlanIcon className={`h-6 w-6 md:h-8 md:w-8 ${plan.color}`} />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold text-white font-satoshi">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400 font-satoshi text-sm">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-white font-satoshi">
                      ${price}
                    </span>
                    <span className="text-gray-400 ml-1 font-satoshi text-sm">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && savings.amount > 0 && (
                    <p className="text-xs text-green-400 mt-1 font-satoshi">
                      Save ${savings.amount} ({savings.percentage}% off)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white font-satoshi">
                    {plan.reveals} contacts
                  </div>
                  <div className="text-xs text-gray-400 font-satoshi">
                    reveals per month
                  </div>
                </div>

                <ul className="space-y-2 md:space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-300 font-satoshi">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-satoshi text-sm font-semibold transition-all duration-200 ${
                    isCurrent 
                      ? "bg-white/10 text-white border border-white/20 hover:bg-white/20" 
                      : showUpgrade 
                        ? "bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-primary/25" 
                        : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                  size="lg"
                  onClick={() => isCurrent ? openCustomerPortal() : handleSubscribe(plan.id)}
                  disabled={loadingPlan === plan.id}
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
        <p className="text-sm text-gray-400 font-satoshi px-4">
          All plans include verified investor contacts, regular database updates, and the ability to cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default DashboardPricing;
