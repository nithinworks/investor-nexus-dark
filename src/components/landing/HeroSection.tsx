import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-40 md:pt-32 pb-32 text-center min-h-screen flex items-center">
      {/* Simple Background with image and subtle overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image with blur effect */}
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/c91f989b-a507-4c26-9009-6ccac777f819.png"
            alt="Professional investor background"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Simple dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
      </div>

      <div className="relative z-30 max-w-4xl mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          <span className="text-xs font-medium text-white/90">
            Premium investor database + AI tools
          </span>
        </div>

        {/* Main Heading - Optimized for 2 lines on mobile */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight animate-slide-up">
          <span className="block">Find the Right Investors.</span>
          <span className="block text-white/80">Instantly.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:0.2s]">
          Access a hand-curated investor database with detailed insights. Filter
          smartly, save your shortlist, export anytime, and pitch with AI tools.
        </p>

        {/* Single CTA Button */}
        <div className="flex justify-center mb-12 md:mb-16 animate-slide-up [animation-delay:0.4s]">
          <Link to="/auth">
            <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-semibold px-8 py-3 text-base rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Stats - Improved mobile layout */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center sm:gap-8 text-white/60 text-sm animate-slide-up [animation-delay:0.6s]">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>10,000+ verified investors</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>Advanced search filters</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <span>AI pitch deck & email tools</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
