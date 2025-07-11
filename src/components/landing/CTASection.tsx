
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 p-12 rounded-2xl text-center border border-red-500/20 backdrop-blur-sm relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 blur-xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Ready to find your investors?
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of founders who have successfully raised funding
              with our platform. Start your fundraising journey today.
            </p>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                <div className="text-red-400 text-2xl mb-2">⚡</div>
                <div className="text-white font-medium text-sm mb-1">Quick Setup</div>
                <div className="text-white/60 text-xs">Get started in under 5 minutes</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                <div className="text-red-400 text-2xl mb-2">🎯</div>
                <div className="text-white font-medium text-sm mb-1">AI Matching</div>
                <div className="text-white/60 text-xs">Find relevant investors instantly</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                <div className="text-red-400 text-2xl mb-2">📊</div>
                <div className="text-white font-medium text-sm mb-1">Track Progress</div>
                <div className="text-white/60 text-xs">Monitor your outreach success</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link to="/auth">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-base rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/25">
                  Start free trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 px-8 py-3 text-base rounded-lg transition-all duration-200">
                  View pricing
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
