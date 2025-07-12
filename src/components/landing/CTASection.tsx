import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-red-500/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center">
            <Rocket className="h-10 w-10 text-red-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Launch Your
          <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Fundraising Journey?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of successful founders who have raised funding with our
          platform. Start connecting with the right investors today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Link to="/auth">
            <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-xl">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/apply">
            <Button
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 px-8 py-4 text-lg rounded-xl transition-all duration-200"
            >
              Join as Investor
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>SOC 2 compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
