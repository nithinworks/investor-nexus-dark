import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Zap,
  ShieldCheck,
  Users,
  Briefcase,
  BarChart,
} from "lucide-react";
import StockTicker from "@/components/ui/StockTicker";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi antialiased">
      {/* Stock Ticker */}
      <StockTicker />

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">TF</span>
                </div>
                <h1 className="text-base font-medium">
                  TheFinance
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8 ml-12">
                <Link to="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Features
                </Link>
                <Link to="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link to="/apply" className="text-sm text-white/60 hover:text-white transition-colors">
                  Join as Investor
                </Link>
                <Link to="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost" className="text-sm text-white/60 hover:text-white hover:bg-white/5 h-8 px-3">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-red-700 hover:bg-red-800 text-white text-sm h-8 px-4 rounded-md transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-24 overflow-hidden">
        {/* Hero Background Image with preload and blur effect */}
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
                e.currentTarget.style.opacity = '1';
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
              Connect with investors who match your vision. Our AI analyzes thousands of 
              investor profiles to find your perfect funding partners.
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

        {/* Features Section - Pure black background */}
        <section className="py-24 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-semibold mb-4">
                Everything you need to find investors
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                Our platform combines AI matching with comprehensive investor data 
                to streamline your fundraising process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <Search className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">Smart Search</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Find investors by stage, industry, and investment thesis with AI-powered search.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <Zap className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">Instant Matching</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Get matched with relevant investors in seconds using our proprietary algorithm.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <ShieldCheck className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">Verified Data</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Access verified contact information and investment preferences.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <BarChart className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">Analytics</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Track your outreach performance and optimize your approach.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <Users className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">Team Collaboration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Work together with your team to manage investor relationships.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <Briefcase className="h-5 w-5 text-red-500 mb-4" />
                <h3 className="text-base font-medium mb-2">CRM Integration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Seamlessly integrate with your existing CRM and workflow tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-center mb-16">
              Trusted by founders worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  "Found our Series A lead investor in just two weeks. The AI matching 
                  was incredibly accurate."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-white/60 text-xs">CEO, TechFlow</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  "The platform saved us months of research. Every investor match 
                  was relevant to our industry."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Marcus Johnson</p>
                    <p className="text-white/60 text-xs">Founder, GreenTech Labs</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  "Simple, clean interface with powerful features. Exactly what 
                  we needed for our fundraising."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Elena Rodriguez</p>
                    <p className="text-white/60 text-xs">Co-founder, DataViz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white/5 p-12 rounded-2xl text-center border border-white/10 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">
                Ready to find your investors?
              </h2>
              <p className="text-white/60 mb-8 text-base">
                Join thousands of founders who have successfully raised funding 
                with our platform.
              </p>
              <Link to="/auth">
                <Button className="bg-red-700 hover:bg-red-800 text-white font-medium px-8 py-3 text-sm rounded-md transition-all duration-200 hover:scale-105">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">TF</span>
                </div>
                <h3 className="text-base font-medium">TheFinance</h3>
              </div>
              <p className="text-white/60 text-sm max-w-sm">
                AI-powered investor matching for ambitious startups.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>&copy; 2024 TheFinance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
