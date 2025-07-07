
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, Heart, Zap, Users, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-black"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent blur-xl"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                InvestorDirectory
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="border-gray-700/50 text-gray-300 hover:bg-pink-500/10 hover:border-pink-500/30 backdrop-blur-sm rounded-2xl">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl shadow-lg shadow-pink-500/25">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm mb-8">
            <span className="text-pink-400 text-sm font-medium">✨ Beta release</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Find Your Perfect<br />
            Investor Match
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with the right investors for your startup. Access our curated database of VCs, angels, and family offices from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-pink-500/25 transform hover:scale-105 transition-all duration-200">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-700/50 text-gray-300 hover:bg-pink-500/10 hover:border-pink-500/30 backdrop-blur-sm text-lg px-8 py-4 rounded-2xl">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Why Choose InvestorDirectory?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to find and connect with the right investors for your startup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Advanced Search</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Filter by investment stage, type, location, and expertise to find your ideal match
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-red-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Save Favorites</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Bookmark interesting investors and build your personalized prospect list
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Global Network</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Access investors from around the world across all major markets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Detailed Profiles</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Get comprehensive information about each investor's focus and portfolio
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-yellow-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Smart Matching</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Our algorithm suggests the best investor matches for your startup
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 rounded-3xl group hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-white text-xl mb-3">Real-time Updates</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Stay updated with the latest investor information and market trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Choose the plan that works best for your startup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-3xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl text-white mb-2">Free</CardTitle>
                <CardDescription className="text-5xl font-bold text-white mt-4 mb-2">
                  $0<span className="text-lg font-normal text-gray-400">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-4"></div>
                    100 investor views per month
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-4"></div>
                    Basic search and filters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-4"></div>
                    Save up to 50 investors
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full mt-6 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 hover:border-pink-500/30 transition-all duration-300">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-gray-900/50 border-pink-500/30 relative rounded-3xl shadow-2xl shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl text-white mb-2">Pro</CardTitle>
                <CardDescription className="text-5xl font-bold text-white mt-4 mb-2">
                  $29<span className="text-lg font-normal text-gray-300">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <ul className="space-y-4 text-gray-200">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4"></div>
                    Unlimited investor views
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4"></div>
                    Advanced search and filters
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4"></div>
                    Unlimited saved investors
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4"></div>
                    Export investor lists
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4"></div>
                    Priority support
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl shadow-lg shadow-pink-500/30 transform hover:scale-105 transition-all duration-200">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 shadow-2xl shadow-pink-500/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Ready to Find Your Next Investor?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of startups who have found their perfect investor match
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all duration-200">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 InvestorDirectory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
