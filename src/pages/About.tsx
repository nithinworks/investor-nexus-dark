import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StockTicker from "@/components/ui/StockTicker";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white font-['Satoshi']">
      <StockTicker />
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              About TheFinance
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing startup funding through AI-powered investor
              matching and data-driven insights.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <p className="text-lg text-white/80 leading-relaxed text-center">
                To democratize access to capital by connecting promising
                startups with the right investors through cutting-edge AI
                technology, comprehensive market data, and streamlined processes
                that eliminate traditional barriers in the funding ecosystem.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Precision</h3>
                <p className="text-white/70">
                  AI-driven matching ensures startups connect with investors who
                  align with their vision and goals.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Trust</h3>
                <p className="text-white/70">
                  Verified investor network and secure data handling ensure safe
                  and reliable connections.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Speed</h3>
                <p className="text-white/70">
                  Lightning-fast matching and streamlined processes reduce time
                  to funding significantly.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">JD</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">John Doe</h3>
                <p className="text-red-400 mb-4">CEO & Co-Founder</p>
                <p className="text-white/70">
                  Former VP at Goldman Sachs with 15+ years in investment
                  banking and venture capital.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">JS</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Jane Smith</h3>
                <p className="text-red-400 mb-4">CTO & Co-Founder</p>
                <p className="text-white/70">
                  AI/ML expert from Google with expertise in building scalable
                  matching algorithms.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12">Impact by Numbers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">$2B+</div>
                <p className="text-white/70">Funding Facilitated</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
                <p className="text-white/70">Active Investors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">95%</div>
                <p className="text-white/70">Match Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
