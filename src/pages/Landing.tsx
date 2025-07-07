import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 border-b border-gray-800">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tighter">
                Investor Nexus
              </h1>
              <nav className="hidden md:flex items-center space-x-8 ml-10">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Company
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-20 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-black via-transparent to-transparent"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(224, 49, 142, 0.4), transparent)",
          }}
        ></div>

        <section className="relative z-10 pt-24 pb-32 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/30 border border-gray-800/80 mb-6">
              <span className="text-sm font-medium text-pink-400">
                Beta release
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Next-level
              <br />
              investor search.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              A better way to find, manage, and launch connections. Built for
              modern teams who value speed, clarity, and control.
            </p>

            <form className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 bg-black/30 border border-gray-800/80 rounded-full p-2 backdrop-blur-lg">
              <Input
                type="text"
                placeholder="Search by industry, name, or focus"
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-500 text-lg h-14 px-6"
              />
              <Select defaultValue="investor">
                <SelectTrigger className="bg-transparent border-none focus:ring-0 text-gray-400 text-lg h-14 w-auto md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-800 text-white">
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="firm">Firm</SelectItem>
                  <SelectItem value="fund">Fund</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full h-14 px-8 text-lg font-semibold"
              >
                Search
              </Button>
            </form>
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
                <Input
                  type="email"
                  placeholder="Input your email"
                  className="bg-black/30 border-gray-700/80 focus:ring-pink-500 h-12 flex-grow rounded-full"
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
      <footer className="bg-black/30 border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4">Investor Nexus</h3>
              <p className="text-gray-400">
                The best place to find your next investor.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    hello@nexus.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Work Inquiries
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Address</h4>
              <p className="text-gray-400">
                123 Nexus Lane,
                <br />
                San Francisco, CA 94107
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800/80 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Investor Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
