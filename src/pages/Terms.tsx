import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StockTicker from "@/components/ui/StockTicker";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white font-['Satoshi']">
      <StockTicker />
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our platform and
              services.
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-white/80 leading-relaxed">
                By accessing and using TheFinance platform, you accept and agree
                to be bound by the terms and provision of this agreement. If you
                do not agree to abide by the above, please do not use this
                service. These terms apply to all users of the platform,
                including startups, investors, and other participants.
              </p>
            </div>

            {/* Service Description */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Service Description</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                TheFinance provides an AI-powered platform that connects
                startups with potential investors. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Investor matching and discovery tools</li>
                <li>Profile creation and management</li>
                <li>Communication facilitation between parties</li>
                <li>Market data and analytics</li>
                <li>AI-powered recommendations and insights</li>
                <li>Pitch deck and email generation tools</li>
              </ul>
            </div>

            {/* User Obligations */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">User Obligations</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">
                    Account Registration
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>
                      Maintain the confidentiality of your account credentials
                    </li>
                    <li>Update your information as necessary</li>
                    <li>
                      You are responsible for all activities under your account
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">
                    Prohibited Activities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>
                      Misrepresenting your identity or company information
                    </li>
                    <li>Sharing false or misleading investment information</li>
                    <li>Attempting to circumvent platform security measures</li>
                    <li>
                      Using the platform for illegal or fraudulent activities
                    </li>
                    <li>Spamming or harassing other users</li>
                    <li>Violating intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Investment Disclaimers */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Investment Disclaimers
              </h2>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <p className="text-red-300 font-semibold mb-2">
                  Important Notice:
                </p>
                <p className="text-white/80 text-sm">
                  TheFinance is a platform service only. We do not provide
                  investment advice, financial planning, or recommendations
                  regarding specific investments.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>
                  All investments carry inherent risks and potential for loss
                </li>
                <li>Past performance does not guarantee future results</li>
                <li>Users should conduct their own due diligence</li>
                <li>We are not responsible for investment outcomes</li>
                <li>
                  Consult qualified professionals before making investment
                  decisions
                </li>
                <li>Ensure compliance with applicable securities laws</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Intellectual Property</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                The platform and its original content, features, and
                functionality are owned by TheFinance and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Users retain ownership of their submitted content</li>
                <li>
                  Users grant us license to use content for platform operations
                </li>
                <li>Respect third-party intellectual property rights</li>
                <li>Report any suspected IP violations</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Limitation of Liability
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, TheFinance
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited
                to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Investment losses or failed funding attempts</li>
                <li>Service interruptions or technical issues</li>
                <li>Third-party actions or content</li>
                <li>Unauthorized access to your account</li>
              </ul>
            </div>

            {/* Subscription and Billing */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Subscription and Billing
              </h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Paid subscriptions are billed in advance on a monthly or
                  annual basis. By subscribing, you agree to the following:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Automatic renewal unless cancelled before the renewal date
                  </li>
                  <li>No refunds for partial months or unused services</li>
                  <li>Price changes with 30 days advance notice</li>
                  <li>
                    Responsibility for all charges incurred under your account
                  </li>
                  <li>
                    Cancellation takes effect at the end of the current billing
                    period
                  </li>
                </ul>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Termination</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the
                service immediately, without prior notice, for conduct that we
                believe violates these Terms or is harmful to other users, us,
                or third parties.
              </p>
              <p className="text-white/80 leading-relaxed">
                You may terminate your account at any time by contacting us.
                Upon termination, your right to use the service will cease
                immediately.
              </p>
            </div>

            {/* Governing Law */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Governing Law</h2>
              <p className="text-white/80 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the
                State of California, without regard to its conflict of law
                provisions. Any disputes arising from these terms or your use of
                the service will be resolved through binding arbitration in San
                Francisco, California.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="space-y-2 text-white/80">
                <p>Email: legal@thefinance.com</p>
                <p>Address: 123 Finance Street, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-white/80 leading-relaxed">
                We reserve the right to modify these terms at any time. We will
                notify users of significant changes via email or platform
                notifications. Your continued use of the service after such
                modifications constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
