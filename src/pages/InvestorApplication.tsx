import InvestorApplicationForm from "@/components/forms/InvestorApplicationForm";
import Header from "@/components/layout/Header";
import { TrendingUp, Users, Target, CheckCircle } from "lucide-react";

const InvestorApplication = () => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi antialiased">
      {/* Header */}
      <Header />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-black to-red-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-red-400">
                Join Elite Investor Network
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-red-400 bg-clip-text text-transparent">
                Join Our Investor
              </span>
              <br />
              <span className="text-red-500">Network</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with ambitious startups and innovative entrepreneurs.
              Apply to be featured in our curated investor database and gain
              access to premium deal flow.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="text-red-400 text-3xl mb-3">
                  <Users className="h-8 w-8 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-white/60 text-sm">Active Investors</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="text-red-400 text-3xl mb-3">
                  <TrendingUp className="h-8 w-8 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">$2B+</div>
                <div className="text-white/60 text-sm">Funding Facilitated</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="text-red-400 text-3xl mb-3">
                  <Target className="h-8 w-8 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">95%</div>
                <div className="text-white/60 text-sm">Match Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-16">
          <InvestorApplicationForm />
        </div>

        {/* Process Steps */}
        <div className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Join our exclusive network in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Submit Application
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Fill out your comprehensive investor profile with your
                  investment focus, experience, and portfolio details
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Review Process
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Our expert team carefully reviews your application and
                  verifies your credentials within 2-3 business days
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Start Connecting
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Get featured in our premium database and start receiving
                  high-quality deal flow from vetted startups
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 rounded-2xl p-8 md:p-12 border border-red-500/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Join Our Network?
                </h3>
                <p className="text-white/70">
                  Exclusive benefits for verified investors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Premium Deal Flow
                    </h4>
                    <p className="text-white/60 text-sm">
                      Access to pre-screened, high-quality startups
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      AI-Powered Matching
                    </h4>
                    <p className="text-white/60 text-sm">
                      Get matched with startups that fit your thesis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Verified Profile
                    </h4>
                    <p className="text-white/60 text-sm">
                      Build credibility with our verification badge
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Network Effects
                    </h4>
                    <p className="text-white/60 text-sm">
                      Connect with other top-tier investors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorApplication;
