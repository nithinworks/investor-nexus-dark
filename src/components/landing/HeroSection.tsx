
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-32 text-center min-h-screen flex items-center">
      {/* Background Image Container with blur overlay */}
      <div className="absolute inset-0 z-0">
        {/* Preloaded background image */}
        <img
          src="/lovable-uploads/c91f989b-a507-4c26-9009-6ccac777f819.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-0 animate-[hero-bg_1.5s_ease-out_0.3s_forwards]"
          loading="eager"
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/50 z-10"></div>
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-20"></div>
      </div>

      <div className="relative z-30 max-w-4xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
          <span className="text-xs font-medium text-white/90">
            AI-powered investor matching
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight animate-slide-up">
          <span className="block">Find the right investors</span>
          <span className="block text-white/80">for your startup</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:0.2s]">
          Connect with investors who match your vision. Our AI analyzes
          thousands of investor profiles to find your perfect funding
          partners.
        </p>

        {/* Single CTA Button */}
        <div className="flex justify-center mb-16 animate-slide-up [animation-delay:0.4s]">
          <Link to="/auth">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-base rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/25">
              Start for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 text-sm animate-slide-up [animation-delay:0.6s]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>10,000+ investors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>500+ successful matches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>AI-powered insights</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
