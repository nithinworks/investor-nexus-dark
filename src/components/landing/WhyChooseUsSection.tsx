import { CheckCircle } from "lucide-react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: "🎯",
      title: "Premium Data Quality",
      description:
        "10,000+ verified investor profiles with up-to-date contact information and investment details.",
      stat: "99% Data Accuracy",
    },
    {
      icon: "⚡",
      title: "Powerful Search Tools",
      description:
        "Advanced filters by industry, stage, check size, and location to find your perfect investors.",
      stat: "50+ Filter Options",
    },
    {
      icon: "📊",
      title: "Export & Save Lists",
      description:
        "Create custom investor lists and export complete data to CSV for your outreach campaigns.",
      stat: "Unlimited Exports",
    },
    {
      icon: "🤖",
      title: "AI Content Generation",
      description:
        "Generate professional pitch decks and personalized investor emails using advanced AI.",
      stat: "AI-Powered Tools",
    },
    {
      icon: "💰",
      title: "Unbeatable Value",
      description:
        "Get the most comprehensive investor platform at a fraction of the cost of competitors.",
      stat: "90% Cost Savings",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime to ensure your data is always protected.",
      stat: "99.9% Uptime",
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Why startups choose TheFinance
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            The most comprehensive investor database with powerful tools to
            accelerate your fundraising success.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300">
                <span className="text-3xl">{reason.icon}</span>
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                {reason.title}
              </h3>

              <p className="text-white/70 mb-6 leading-relaxed">
                {reason.description}
              </p>

              <div className="inline-flex items-center px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="text-red-400 font-semibold text-sm">
                  {reason.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <h4 className="font-semibold text-lg">Ready to raise funding?</h4>
              <p className="text-white/70">
                Join thousands of startups using TheFinance to find investors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
