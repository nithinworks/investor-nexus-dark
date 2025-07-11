import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import StockTicker from "@/components/ui/StockTicker";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ArrowRight } from "lucide-react";

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
                <h1 className="text-base font-medium">TheFinance</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8 ml-12">
                <Link
                  to="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="/apply"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Join as Investor
                </Link>
                <Link
                  to="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button
                  variant="ghost"
                  className="text-sm text-white/60 hover:text-white hover:bg-white/5 h-8 px-3"
                >
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

        {/* Features Section - Pure black background */}
        <section className="py-24 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-semibold mb-4">
                Everything you need to find investors
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                Our platform combines AI matching with comprehensive investor
                data to streamline your fundraising process.
              </p>
            </div>
            <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem] md:grid-cols-3">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
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
                  "Found our Series A lead investor in just two weeks. The AI
                  matching was incredibly accurate."
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
                  "The platform saved us months of research. Every investor
                  match was relevant to our industry."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Marcus Johnson</p>
                    <p className="text-white/60 text-xs">
                      Founder, GreenTech Labs
                    </p>
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
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
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

const SkeletonOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Top Curated Investors Database */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-red-500/30">
            <span className="text-red-400 text-xs font-medium">Database</span>
          </div>
          <span className="text-red-400 text-xs font-mono">10,000+</span>
        </div>

        {/* Investor List */}
        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AC</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  Andreessen Horowitz
                </div>
                <div className="text-red-400/70 text-xs">
                  Series A-C • $1M-$50M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SV</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  Sequoia Capital
                </div>
                <div className="text-red-400/70 text-xs">
                  Seed-Series B • $500K-$25M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">BV</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  Bessemer Ventures
                </div>
                <div className="text-red-400/70 text-xs">
                  Series A-D • $2M-$100M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Investor Details Profile */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/40 flex items-center justify-center">
              <span className="text-white text-sm font-bold">JS</span>
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm font-medium">
                John Smith
              </div>
              <div className="text-red-400/70 text-xs">
                Partner @ Accel Partners
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Check Size</div>
            <div className="text-white/70 text-xs font-medium">$1M - $10M</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Stage</div>
            <div className="text-white/70 text-xs font-medium">Series A</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Industry</div>
            <div className="text-white/70 text-xs font-medium">
              SaaS, FinTech
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Location</div>
            <div className="text-white/70 text-xs font-medium">
              San Francisco
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Smart Filters & Search */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 border border-red-500/30">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400/60 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/60 text-sm">Search investors...</span>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">FinTech</span>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">Series A</span>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">$1M+</span>
          </div>
        </div>

        {/* Filter Results */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs">Results found</span>
            <span className="text-red-400/70 text-xs font-mono">247</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Save & Export Lists */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Saved Lists */}
        <div className="mb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-red-400 text-xs">📁</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  FinTech Investors
                </div>
                <div className="text-red-400/60 text-xs">42 investors</div>
              </div>
              <div className="w-4 h-4 rounded bg-red-400/60 flex items-center justify-center">
                <span className="text-white text-xs">⋯</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-red-400 text-xs">📁</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  Series A VCs
                </div>
                <div className="text-red-400/60 text-xs">28 investors</div>
              </div>
              <div className="w-4 h-4 rounded bg-red-400/60 flex items-center justify-center">
                <span className="text-white text-xs">⋯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-500/40 text-center">
          <span className="text-red-400 text-sm font-medium">
            Export to CSV
          </span>
        </div>
      </div>
    </div>
  );
};

const SkeletonFive = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* AI Tools */}
      <div className="absolute inset-0 p-4 z-10">
        {/* AI Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/40 flex items-center justify-center">
            <span className="text-white text-xs">🤖</span>
          </div>
          <span className="text-red-400 text-sm font-medium">AI</span>
        </div>

        {/* AI Tools Grid */}
        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">📄</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Pitch Deck Generator
                </div>
                <div className="text-red-400/60 text-xs">
                  Create compelling decks
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">✉️</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Email Generator
                </div>
                <div className="text-red-400/60 text-xs">
                  Personalized outreach
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">📊</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Market Analysis
                </div>
                <div className="text-red-400/60 text-xs">
                  AI-powered insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonSix = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Pricing */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Price Display */}
        <div className="text-center mb-3">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-500/40">
            <div className="text-red-400 text-lg font-bold mb-1">$29</div>
            <div className="text-white/60 text-xs">/month</div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">10,000+ investors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">Unlimited searches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">AI-powered tools</span>
          </div>
        </div>

        {/* Value Badge */}
        <div className="mt-3 bg-red-500/30 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/50 text-center">
          <span className="text-red-400 text-xs font-medium">Best Value</span>
        </div>
      </div>
    </div>
  );
};

// Add three more skeleton components for the complete 3x3 grid
const SkeletonSeven = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Analytics Dashboard */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-red-400 text-sm font-medium">Analytics</span>
          <span className="text-white/60 text-xs">Last 30 days</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs">Open Rate</div>
            <div className="text-white/80 text-sm font-bold">24.5%</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs">Response Rate</div>
            <div className="text-white/80 text-sm font-bold">8.2%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
          <div className="flex items-end gap-1 h-12">
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-6"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-8"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-4"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-10"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-7"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonEight = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Team Collaboration */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-400 text-sm font-medium">Team</span>
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center">
                <span className="text-white text-xs">JD</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  John Doe
                </div>
                <div className="text-red-400/60 text-xs">
                  Reviewing prospects
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs">SM</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Sarah Miller
                </div>
                <div className="text-red-400/60 text-xs">Sending outreach</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-3 bg-white/5 backdrop-blur-sm rounded p-2 border border-red-500/20">
          <span className="text-white/60 text-xs">3 active campaigns</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonNine = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* CRM Integration */}
      <div className="absolute inset-0 p-4 z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-400 text-sm font-medium">Integrations</span>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>

        {/* Integration Cards */}
        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">SF</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Salesforce
                </div>
                <div className="text-green-400/60 text-xs">Connected</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">HS</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">HubSpot</div>
                <div className="text-green-400/60 text-xs">Connected</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">ZP</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">Zapier</div>
                <div className="text-green-400/60 text-xs">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const items = [
  {
    title: "Curated Investor Database",
    description:
      "Access our premium database of 10,000+ verified investors across all stages and industries.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Detailed Investor Profiles",
    description:
      "Get complete investor information including contact details, fund size, check size, and investment preferences.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Smart Filters & Search",
    description:
      "Find the perfect investors using advanced filters by industry, stage, check size, and investment focus.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Save & Export Lists",
    description:
      "Create custom investor lists, save your searches, and export data to CSV for your outreach campaigns.",
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-red-500" />,
  },
  {
    title: "AI-Powered Tools",
    description:
      "Generate personalized pitch decks and investor emails using our advanced AI technology.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Unbeatable Value",
    description:
      "Get the most comprehensive investor platform at the most competitive price in the market.",
    header: <SkeletonSix />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Advanced Analytics",
    description:
      "Track your outreach performance and optimize your approach with detailed analytics and insights.",
    header: <SkeletonSeven />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Work together with your team to manage investor relationships and coordinate outreach efforts.",
    header: <SkeletonEight />,
    className: "md:col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-red-500" />,
  },
  {
    title: "CRM Integration",
    description:
      "Seamlessly integrate with your existing CRM and workflow tools like Salesforce, HubSpot, and more.",
    header: <SkeletonNine />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
  },
];

export default Landing;
