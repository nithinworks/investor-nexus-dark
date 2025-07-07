import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Zap,
  ShieldCheck,
  Heart,
  Users,
  Briefcase,
  BarChart,
  Globe,
  Mail,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-host antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A089E6] to-[#6366f1] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Investor Nexus
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8 ml-12">
                <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Features
                </Link>
                <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Pricing
                </Link>
                <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
                  About
                </Link>
                <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Contact
                </Link>
                <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Blog
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 font-medium">
                  Log in
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-[#A089E6] to-[#6366f1] hover:from-[#9575e0] hover:to-[#5856eb] text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#A089E6]/20 via-[#271A58]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#6366f1]/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-[#A089E6]/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        <section className="relative z-10 pt-20 pb-32 text-center">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#A089E6]/20 to-[#6366f1]/20 border border-[#A089E6]/30 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-[#A089E6] mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-[#A089E6]">
                ✨ Manage Your Investor Search Effortlessly with AI
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              <span className="block">Simplify Your</span>
              <span className="block bg-gradient-to-r from-[#A089E6] via-white to-[#6366f1] bg-clip-text text-transparent">
                Investor Search
              </span>
              <span className="block">with AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Empower your startup with intelligent investor matching, seamless outreach automation, and 
              advanced analytics—so your team can focus on what truly matters: building the future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-[#A089E6] to-[#6366f1] hover:from-[#9575e0] hover:to-[#5856eb] text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105 min-w-[180px]">
                  Get Started →
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg rounded-xl min-w-[180px] transition-all duration-200 hover:border-white/30"
              >
                Request a Demo
              </Button>
            </div>

            {/* Stats or Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A089E6] to-[#6366f1] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>10,000+ investors indexed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A089E6] to-[#6366f1] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>500+ successful matches</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A089E6] to-[#6366f1] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>AI-powered insights</span>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="relative z-10 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 mb-6">
              Trusted by the world's best companies
            </p>
            <div className="flex justify-center items-center space-x-12">
              <img
                src="/placeholder.svg"
                alt="DigitalOcean"
                className="h-6 opacity-50"
              />
              <img
                src="/placeholder.svg"
                alt="Airbnb"
                className="h-6 opacity-50"
              />
              <img
                src="/placeholder.svg"
                alt="Adobe"
                className="h-6 opacity-50"
              />
              <img src="/placeholder.svg" alt="EA" className="h-6 opacity-50" />
              <img
                src="/placeholder.svg"
                alt="Wix"
                className="h-6 opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative z-10 py-24 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block p-4 bg-black/30 border border-gray-800/80 rounded-full mb-8">
                <ShieldCheck className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Why choose us?
              </h2>
              <p className="text-xl text-gray-400">
                A better way to buy, manage, and launch domains. Built for
                modern teams who value speed, clarity, and control.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <Zap className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Speed-First Experience
                </h3>
                <p className="text-gray-400">
                  From search to checkout in seconds. No fluff, just focus.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <BarChart className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Design-Led Simplicity
                </h3>
                <p className="text-gray-400">
                  Minimal, intuitive, no clutter. An interface that's a joy to
                  use.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <Search className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Domain Search</h3>
                <p className="text-gray-400">
                  Find names that actually make sense and connect to your brand.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <ShieldCheck className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Privacy Comes Standard
                </h3>
                <p className="text-gray-400">
                  Peace-of-mind protection integrations. Your data is safe with
                  us.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <Briefcase className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Built for Modern Teams
                </h3>
                <p className="text-gray-400">
                  Easy connect to your favorite stack. Collaborate with ease.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <Users className="h-7 w-7 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Made for Modern Teams
                </h3>
                <p className="text-gray-400">
                  Collaborate, launch, and scale without friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">
              What our customers say about us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <p className="text-gray-300 mb-6">
                  "I've tried most of the big registrars, but this one is in a
                  league of its own. The interface is clean, the search is
                  actually useful, and I had my domain connected to Netlify in
                  minutes. No weird upsells, just focus."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Amina R"
                    className="h-10 w-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Amina R, Product Designer</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <p className="text-gray-300 mb-6">
                  "Every step felt effortless. From finding a name to the final
                  checkout. The whole experience feels intentional and I
                  actually loved the unusual pro-level tools they give you."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Maya T"
                    className="h-10 w-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Maya T, Startup Founder</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/80">
                <p className="text-gray-300 mb-6">
                  "The search is so going live — I found a domain for my side
                  project that I actually like. The interface is clean, the
                  process is simple, and the team is responsive."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="James P"
                    className="h-10 w-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">James P, Indie Hacker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-12 rounded-3xl text-center border border-pink-500/30">
              <h2 className="text-4xl font-bold tracking-tighter mb-4">
                Ready to launch your next connection?
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Get started with our free trial and find your perfect investor
                match.
              </p>
              <form className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Input your email"
                  className="bg-black/30 border-gray-700/80 focus:ring-pink-500 h-12 flex-grow rounded-full text-white"
                />
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white rounded-full h-12 px-8 font-semibold"
                >
                  Join Beta
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0F]/50 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A089E6] to-[#6366f1] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <h3 className="text-xl font-semibold">Investor Nexus</h3>
              </div>
              <p className="text-white/60 max-w-sm">
                The intelligent platform for finding, connecting, and managing investor relationships.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    hello@investornexus.ai
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partnership Inquiries
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Address</h4>
              <p className="text-white/60">
                123 Innovation Drive,<br />
                San Francisco, CA 94107
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Social</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/50">
            <p>&copy; 2024 Investor Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
