import StockTicker from "@/components/ui/StockTicker";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi antialiased">
      {/* Stock Ticker */}
      <StockTicker />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative pt-24 overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
