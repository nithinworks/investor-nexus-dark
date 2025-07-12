import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      actions: 10,
      description: "Perfect for exploring our platform",
      features: [
        "10 actions per month",
        "Access to investor database",
        "Advanced search & filters",
        "Save lists functionality",
        "View contact information",
        "AI email generator",
        "AI pitch deck generator",
        "CSV export capability",
      ],
      cta: "Get Started",
      popular: false,
      color: "border-white/20",
    },
    {
      name: "Starter",
      icon: Zap,
      price: { monthly: 19, yearly: 190 },
      actions: 100,
      description: "For early-stage startups",
      features: [
        "100 actions per month",
        "Access to investor database",
        "Advanced search & filters",
        "Unlimited saved lists",
        "View contact information",
        "AI email generator",
        "AI pitch deck generator",
        "CSV export capability",
        "Priority support",
      ],
      cta: "Start Now",
      popular: true,
      color: "border-red-500",
    },
    {
      name: "Premium",
      icon: Crown,
      price: { monthly: 49, yearly: 490 },
      actions: 500,
      description: "For serious fundraising",
      features: [
        "500 actions per month",
        "Access to investor database",
        "Advanced search & filters",
        "Unlimited saved lists",
        "View contact information",
        "AI email generator",
        "AI pitch deck generator",
        "CSV export capability",
        "Priority support",
        "Dedicated account manager",
      ],
      cta: "Go Premium",
      popular: false,
      color: "border-yellow-500",
    },
  ];

  const savings = Math.round(
    ((plans[1].price.monthly * 12 - plans[1].price.yearly) /
      (plans[1].price.monthly * 12)) *
      100
  );

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Simple, action-based pricing
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            All features included in every plan. Only the number of monthly
            actions differs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isYearly
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                Save {savings}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const monthlyPrice = isYearly
              ? plan.price.yearly / 12
              : plan.price.monthly;

            return (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border-2 p-8 hover:bg-white/10 transition-all duration-300 ${
                  plan.popular ? "border-red-500 scale-105" : plan.color
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.name === "Free"
                        ? "bg-white/10"
                        : plan.name === "Starter"
                        ? "bg-red-500/20"
                        : "bg-yellow-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        plan.name === "Free"
                          ? "text-white"
                          : plan.name === "Starter"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-4xl font-bold">${price}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-white/60">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                    {isYearly && plan.price.monthly > 0 && (
                      <div className="text-sm text-white/60 mt-1">
                        ${monthlyPrice.toFixed(0)}/month billed yearly
                      </div>
                    )}
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                    <span className="text-red-400 font-bold text-lg">
                      {plan.actions} actions/month
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/auth" className="block">
                  <Button
                    className={`w-full py-3 font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Action Explanation */}
        <div className="text-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold mb-3">
              What counts as an action?
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Actions include viewing investor contact details, exporting data
              to CSV, generating AI emails, and creating AI pitch decks.
              Browsing, searching, and filtering are always free and unlimited.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
