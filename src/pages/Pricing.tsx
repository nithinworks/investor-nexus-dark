import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Zap, Crown, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      reveals: 5,
      features: [
        "5 contact reveals per month",
        "Basic investor search",
        "Email support",
        "Basic filters"
      ],
      icon: Star,
      color: "text-blue-500",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      ctaText: "Get Started"
    },
    {
      id: "basic",
      name: "Basic",
      description: "Great for growing startups",
      monthlyPrice: 9,
      yearlyPrice: 90,
      reveals: 20,
      features: [
        "20 contact reveals per month",
        "Advanced investor search",
        "Priority email support",
        "Enhanced filters"
      ],
      icon: Star,
      color: "text-blue-500",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      ctaText: "Upgrade to Basic"
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
      ctaText: "Contact Sales"
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">TF</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                TheFinance
              </span>
            </div>
            {user && (
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get access to our comprehensive investor database and unlock the funding opportunities your startup needs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
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
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            const price = getPrice(plan);
            const savings = getSavings(plan);

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.borderColor} ${
                  plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
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
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => plan.id === "free" ? navigate("/auth") : handleSubscribe(plan.id)}
                    disabled={loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? "Loading..." : plan.ctaText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            All plans include:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">Verified investor contacts</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">Regular database updates</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;