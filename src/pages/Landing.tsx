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
    <div className="min-h-screen bg-background text-foreground font-satoshi antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">IN</span>
                </div>
                <h1 className="text-lg font-semibold">
                  Investor Nexus
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8 ml-12">
                <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link to="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link to="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost" className="text-sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="text-sm">
                  Join waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative pt-20 pb-32 text-center overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_70%)]"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Announcing our $1.4M Fundraise
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] animate-slide-up">
              <span className="block text-foreground">Investor Nexus is the new</span>
              <span className="block">
                <span className="bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end bg-clip-text text-transparent">standard</span>
                {" "}for{" "}
                <span className="bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end bg-clip-text text-transparent">collaboration</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:0.2s]">
              Chat, code, cloud, deployments, and more.
            </p>

            {/* Email Input and CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md mx-auto animate-slide-up [animation-delay:0.4s]">
              <Input
                type="email"
                placeholder="Email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-1"
              />
              <Button className="bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end hover:opacity-90 text-white font-medium px-6 shrink-0">
                Join waitlist
              </Button>
            </div>

            {/* Mock Chat Interface */}
            <div className="relative max-w-4xl mx-auto animate-slide-up [animation-delay:0.6s]">
              <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">IN</span>
                    </div>
                    <span className="font-medium">Investor Nexus</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Core Team</span>
                  </div>
                </div>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-xs font-medium">T</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Tejas • 1:14 PM</div>
                      <div className="text-sm text-muted-foreground">
                        Hey Ari! I wanted to check in with you on the next release and bug list. Do you think we'll be on track to share the latest with the team on Friday?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mt-1">
                      <span className="text-xs font-medium">A</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Ari • 1:15 PM</div>
                      <div className="text-sm text-muted-foreground">
                        There are a few items on the tasklist that needs to be addressed on iOS.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need to find investors
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform combines AI matching with comprehensive investor data 
                to streamline your fundraising process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find investors by stage, industry, and investment thesis with AI-powered search.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get matched with relevant investors in seconds using our proprietary algorithm.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access verified contact information and investment preferences.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track your outreach performance and optimize your approach.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work together with your team to manage investor relationships.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">CRM Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly integrate with your existing CRM and workflow tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Trusted by founders worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card p-8 rounded-xl border border-border">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Found our Series A lead investor in just two weeks. The AI matching 
                  was incredibly accurate."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4 flex items-center justify-center">
                    <span className="font-medium">S</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-muted-foreground text-sm">CEO, TechFlow</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-card p-8 rounded-xl border border-border">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The platform saved us months of research. Every investor match 
                  was relevant to our industry."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4 flex items-center justify-center">
                    <span className="font-medium">M</span>
                  </div>
                  <div>
                    <p className="font-semibold">Marcus Johnson</p>
                    <p className="text-muted-foreground text-sm">Founder, GreenTech Labs</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-card p-8 rounded-xl border border-border">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Simple, clean interface with powerful features. Exactly what 
                  we needed for our fundraising."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4 flex items-center justify-center">
                    <span className="font-medium">E</span>
                  </div>
                  <div>
                    <p className="font-semibold">Elena Rodriguez</p>
                    <p className="text-muted-foreground text-sm">Co-founder, DataViz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-card p-12 rounded-2xl text-center border border-border">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to find your investors?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join thousands of founders who have successfully raised funding 
                with our platform.
              </p>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end hover:opacity-90 text-white font-medium px-8 py-3 text-base">
                  Start for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">IN</span>
                </div>
                <h3 className="text-lg font-semibold">Investor Nexus</h3>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                AI-powered investor matching for ambitious startups.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Investor Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;