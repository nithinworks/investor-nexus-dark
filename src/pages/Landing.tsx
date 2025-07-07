
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, Heart, Zap, Users, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">InvestorDirectory</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Find Your Perfect Investor Match
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with the right investors for your startup. Access our curated database of VCs, angels, and family offices from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose InvestorDirectory?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to find and connect with the right investors for your startup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Search className="h-10 w-10 text-blue-500 mb-4" />
                <CardTitle className="text-white">Advanced Search</CardTitle>
                <CardDescription className="text-gray-400">
                  Filter by investment stage, type, location, and expertise to find your ideal match
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Heart className="h-10 w-10 text-red-500 mb-4" />
                <CardTitle className="text-white">Save Favorites</CardTitle>
                <CardDescription className="text-gray-400">
                  Bookmark interesting investors and build your personalized prospect list
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Globe className="h-10 w-10 text-green-500 mb-4" />
                <CardTitle className="text-white">Global Network</CardTitle>
                <CardDescription className="text-gray-400">
                  Access investors from around the world across all major markets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-500 mb-4" />
                <CardTitle className="text-white">Detailed Profiles</CardTitle>
                <CardDescription className="text-gray-400">
                  Get comprehensive information about each investor's focus and portfolio
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-yellow-500 mb-4" />
                <CardTitle className="text-white">Smart Matching</CardTitle>
                <CardDescription className="text-gray-400">
                  Our algorithm suggests the best investor matches for your startup
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Zap className="h-10 w-10 text-orange-500 mb-4" />
                <CardTitle className="text-white">Real-time Updates</CardTitle>
                <CardDescription className="text-gray-400">
                  Stay updated with the latest investor information and market trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">
              Choose the plan that works best for your startup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Free</CardTitle>
                <CardDescription className="text-4xl font-bold text-white mt-4">
                  $0<span className="text-lg font-normal text-gray-400">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    100 investor views per month
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Basic search and filters
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Save up to 50 investors
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full mt-6 bg-gray-700 hover:bg-gray-600">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-blue-900 to-purple-900 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                <CardDescription className="text-4xl font-bold text-white mt-4">
                  $29<span className="text-lg font-normal text-gray-300">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Unlimited investor views
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Advanced search and filters
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Unlimited saved investors
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Export investor lists
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Priority support
                  </li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Investor?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of startups who have found their perfect investor match
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Start Your Free Trial Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
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
