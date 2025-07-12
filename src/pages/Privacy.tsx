import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StockTicker from "@/components/ui/StockTicker";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white font-['Satoshi']">
      <StockTicker />
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Your privacy is our priority. Learn how we collect, use, and
              protect your information.
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-white/80 leading-relaxed">
                TheFinance ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                platform and services. Please read this policy carefully to
                understand our practices regarding your personal data.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Company information and professional details</li>
                    <li>Investment preferences and criteria</li>
                    <li>
                      Financial information (when necessary for verification)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">
                    Usage Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>Platform usage patterns and interactions</li>
                    <li>Search queries and preferences</li>
                    <li>Communication records within our platform</li>
                    <li>
                      Technical data such as IP address and device information
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-3 text-white/80 ml-4">
                <li>Provide and improve our investor matching services</li>
                <li>Facilitate connections between startups and investors</li>
                <li>Personalize your experience and recommendations</li>
                <li>Communicate important updates and notifications</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations and regulations</li>
                <li>Analyze usage patterns to enhance our services</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    With your explicit consent for investor matching purposes
                  </li>
                  <li>
                    With service providers who assist in platform operations
                  </li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In case of business transfers or mergers</li>
                  <li>To prevent fraud or security threats</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Data Security</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your
                personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Secure data storage with regular security audits</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal data on a need-to-know basis</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Your Rights and Choices
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Control visibility of your profile information</li>
                <li>Request data portability</li>
                <li>Object to certain data processing activities</li>
              </ul>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-white/80 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience, analyze usage patterns, and provide personalized
                content. You can control cookie settings through your browser,
                though some features may not function properly if cookies are
                disabled.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-white/80">
                <p>Email: privacy@thefinance.com</p>
                <p>Address: 123 Finance Street, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-white/80 leading-relaxed">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or applicable laws. We will notify you
                of significant changes via email or platform notifications. Your
                continued use of our services after such modifications
                constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
