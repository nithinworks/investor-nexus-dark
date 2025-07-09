import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Search,
  Zap,
  ShieldCheck,
  Users,
  Briefcase,
  BarChart,
} from "lucide-react";

const Landing = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground font-satoshi antialiased overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-glass-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <span className="text-primary-foreground font-bold text-sm">IN</span>
                </div>
                <h1 className="text-lg font-semibold tracking-tight">
                  Investor Nexus
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8 ml-12">
                <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:glow-border rounded-lg px-3 py-2">
                  Features
                </Link>
                <Link to="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:glow-border rounded-lg px-3 py-2">
                  Pricing
                </Link>
                <Link to="#about" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:glow-border rounded-lg px-3 py-2">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost" className="text-sm btn-outline-glow">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="btn-glow text-sm">
                  Join waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative pt-24 pb-40 text-center overflow-hidden">
          {/* Hero glow background */}
          <div className="absolute inset-0 hero-glow">
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-12 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary mr-3 animate-glow-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Announcing our $1.4M Fundraise
              </span>
            </div>

            {/* Main Heading with Glow */}
            <div className="hero-glow mb-12">
              <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.9] animate-scale-in">
                <span className="block text-foreground font-extralight">AI Driven universal</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-gradient-primary to-gradient-primary-end bg-clip-text text-transparent font-medium">finance tool</span>
                  {" "}
                  <span className="text-foreground font-extralight">you need</span>
                </span>
              </h1>
            </div>

            {/* Trusted Badge */}
            <div className="flex items-center justify-center mb-16 animate-fade-in [animation-delay:0.3s]">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-secondary to-gradient-secondary-end border-2 border-background"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-warm to-gradient-warm-end border-2 border-background"></div>
              </div>
              <span className="ml-4 text-muted-foreground font-medium">Trusted by 20000+ Clients</span>
            </div>

            {/* Enhanced CTA Button */}
            <div className="mb-20 animate-scale-in [animation-delay:0.5s]">
              <button className="btn-glow group">
                <span>Enhance your journey!</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto animate-scale-in [animation-delay:0.7s]">
              <div className="glass-card rounded-3xl p-2 glow-primary">
                <div className="bg-background/80 rounded-2xl p-8 backdrop-blur-xl">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">G</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Welcome,</p>
                        <p className="font-semibold">Groww</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Overview</span>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs">A</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-surface rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Customer</span>
                      </div>
                      <p className="text-2xl font-bold">1,300</p>
                    </div>
                    <div className="glass-surface rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Briefcase className="h-5 w-5 text-accent" />
                        <span className="text-sm text-muted-foreground">Employees</span>
                      </div>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                    <div className="glass-surface rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <BarChart className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Request</span>
                      </div>
                      <p className="text-2xl font-bold">128</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid Section */}
        <section id="features" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Get <span className="bg-gradient-to-r from-gradient-primary to-gradient-primary-end bg-clip-text text-transparent font-medium">insights</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Advanced analytics and reporting capabilities for data-driven decisions
              </p>
            </div>
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Large Feature Card */}
              <div className="lg:col-span-2 lg:row-span-2 bento-item">
                <div className="h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Advanced Analytics</h3>
                  </div>
                  <div className="flex-1 glass-surface rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-xs text-muted-foreground">$3,250</div>
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl mb-4 flex items-end p-4">
                      <div className="flex space-x-1 items-end">
                        <div className="w-2 h-8 bg-primary rounded"></div>
                        <div className="w-2 h-12 bg-primary/70 rounded"></div>
                        <div className="w-2 h-6 bg-primary/50 rounded"></div>
                        <div className="w-2 h-16 bg-accent rounded"></div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Real-time performance tracking</p>
                  </div>
                </div>
              </div>

              {/* Top features in one place */}
              <div className="lg:col-span-2 bento-item">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-secondary/20 to-gradient-secondary-end/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-gradient-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">Top features in one place</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-surface rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Smart Search</p>
                  </div>
                  <div className="glass-surface rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                    </div>
                    <p className="text-sm font-medium">Verified Data</p>
                  </div>
                </div>
              </div>

              {/* Detailed account reports */}
              <div className="bento-item">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-warm/20 to-gradient-warm-end/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gradient-warm" />
                  </div>
                  <h3 className="text-lg font-semibold">Detailed account reports</h3>
                </div>
                <div className="glass-surface rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Q1 2024</span>
                    <span className="text-sm font-semibold text-primary">+24%</span>
                  </div>
                  <div className="h-16 flex items-end space-x-1">
                    {[40, 65, 30, 80, 55, 75].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-sm" style={{height: `${height}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights of community */}
              <div className="bento-item">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Insights of community</h3>
                </div>
                <div className="space-y-3">
                  <div className="glass-surface rounded-xl p-3 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold">5k</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Active Users</p>
                    </div>
                  </div>
                  <div className="glass-surface rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-2">Engagement Rate</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                <span className="bg-gradient-to-r from-gradient-primary to-gradient-primary-end bg-clip-text text-transparent font-medium">Offer</span> for everyone
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your fundraising needs
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Basic Plan */}
              <div className="pricing-card">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Basic</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Perfect for getting started</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Access to 100 investor profiles
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Basic search filters
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Email support
                  </li>
                </ul>
                <button className="btn-outline-glow w-full">Get started</button>
              </div>

              {/* Pro Plan - Featured */}
              <div className="pricing-card featured">
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$50</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">For serious fundraisers</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Access to 10,000+ investor profiles
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Advanced AI matching
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Contact information revealed
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Priority support
                  </li>
                </ul>
                <button className="btn-glow w-full">Start free trial</button>
              </div>

              {/* Enterprise Plan */}
              <div className="pricing-card">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$150</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">For growing companies</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Unlimited access
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Team collaboration tools
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Custom integrations
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    </div>
                    Dedicated account manager
                  </li>
                </ul>
                <button className="btn-outline-glow w-full">Contact sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="glass-card rounded-3xl p-16 glow-secondary">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Ready to <span className="bg-gradient-to-r from-gradient-primary to-gradient-primary-end bg-clip-text text-transparent font-medium">accelerate</span> your fundraising?
              </h2>
              <p className="text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
                Join thousands of founders who have successfully raised funding with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn-glow">
                  <span>Start for free</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="btn-outline-glow">
                  Schedule demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-surface border-t border-glass-border/20 relative">
        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <span className="text-primary-foreground font-bold text-sm">IN</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">Investor Nexus</h3>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                AI-powered investor matching for ambitious startups building the future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">API</a></li>
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-glass-border/20 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2024 Investor Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;