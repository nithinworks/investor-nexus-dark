import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Star, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";

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
      actions: 10,
      features: [
        "10 actions per month",
        "Contact reveals",
        "AI tools access",
        "Export capability",
        "Basic filters",
      ],
      icon: Star,
      color: "text-blue-500",
      borderColor: "border-blue-500/20",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      ctaText: "Get Started Free",
    },
    {
      id: "starter",
      name: "Starter",
      description: "Great for growing startups",
      monthlyPrice: 19,
      yearlyPrice: 190,
      actions: 100,
      features: [
        "100 actions per month",
        "All Free features",
        "Advanced search filters",
        "Priority email support",
        "Enhanced analytics",
      ],
      icon: Zap,
      color: "text-red-500",
      borderColor: "border-red-500/40",
      bgGradient: "from-red-500/20 to-red-600/20",
      ctaText: "Get Started",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Best for serious entrepreneurs",
      monthlyPrice: 49,
      yearlyPrice: 490,
      actions: 500,
      features: [
        "500 actions per month",
        "All Starter features",
        "Unlimited exports",
        "Advanced AI tools",
        "API access",
        "Custom saved lists",
        "White-label options",
      ],
      icon: Crown,
      color: "text-purple-500",
      borderColor: "border-purple-500/20",
      bgGradient: "from-purple-500/10 to-purple-600/10",
      ctaText: "Get Started",
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoadingPlan(planId);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            plan: planId,
            billingCycle: isYearly ? "yearly" : "monthly",
          },
        }
      );

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, "_blank");
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
    if (plan.monthlyPrice === 0) return null;
    const yearlyTotal = plan.monthlyPrice * 12;
    const savings = yearlyTotal - plan.yearlyPrice;
    const percentage = Math.round((savings / yearlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen bg-black text-white font-satoshi antialiased">
      {/* Header */}
      <Header />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-red-500/5"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></div>
            <span className="text-xs font-medium text-red-400">
              Pricing Plans
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get access to our comprehensive investor database and unlock the
            funding opportunities your startup needs.
          </p>

          {/* Actions Explanation */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-red-500/20">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Activity className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">
                What are Actions?
              </h3>
            </div>
            <p className="text-white/70 mb-6 text-center">
              Actions are credits that let you access our platform's key
              features. Here's how they're consumed:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-4 border border-red-500/20 text-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-2"></div>
                <span className="text-white font-medium block">
                  <strong>1 Action</strong> = 1 Contact Reveal
                </span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-red-500/20 text-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-2"></div>
                <span className="text-white font-medium block">
                  <strong>1 Action</strong> = 1 AI Tool Usage
                </span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-red-500/20 text-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-2"></div>
                <span className="text-white font-medium block">
                  <strong>1 Action</strong> = 1 Data Export
                </span>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span
              className={`text-base ${
                !isYearly ? "text-white" : "text-white/60"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-red-600" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-base ${
                isYearly ? "text-white" : "text-white/60"
              }`}
            >
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/20">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = getPrice(plan);
            const savings = getSavings(plan);
            const IconComponent = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular
                    ? "border-red-500/40 shadow-xl shadow-red-500/10"
                    : plan.borderColor
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.bgGradient} border ${plan.borderColor} flex items-center justify-center`}
                  >
                    <IconComponent className={`h-8 w-8 ${plan.color}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-white/70 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-white/60 ml-1">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                  </div>

                  {isYearly && savings && (
                    <div className="text-green-400 text-sm">
                      Save ${savings.amount}/year ({savings.percentage}% off)
                    </div>
                  )}

                  <div className="text-red-400 font-semibold mt-2">
                    {plan.actions} actions/month
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 font-semibold transition-all duration-200 hover:scale-105 ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                  onClick={() =>
                    plan.id === "free"
                      ? navigate("/auth")
                      : handleSubscribe(plan.id)
                  }
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? "Loading..." : plan.ctaText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm mb-6">
            All plans include comprehensive investor access. No credit card
            required to start.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Verified investor contacts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Regular database updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>24/7 customer support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Back to Dashboard */}
          {user && (
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              Back to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
