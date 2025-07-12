import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StockTicker from "@/components/ui/StockTicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white font-['Satoshi']">
      <StockTicker />
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your funding journey? Get in touch with our
              team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-32"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-white/70">hello@thefinance.com</p>
                      <p className="text-white/70">support@thefinance.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-white/70">+1 (555) 123-4567</p>
                      <p className="text-white/70">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-white/70">123 Finance Street</p>
                      <p className="text-white/70">San Francisco, CA 94105</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-white/70">
                        Monday - Friday: 9AM - 6PM PST
                      </p>
                      <p className="text-white/70">Saturday: 10AM - 4PM PST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-xl font-bold mb-4">Quick Help</h2>
                <div className="space-y-3">
                  <p className="text-white/70 text-sm">
                    Looking for answers? Check our FAQ section for common
                    questions.
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    View FAQ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
