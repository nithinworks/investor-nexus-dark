import { Helmet } from "react-helmet-async";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import StockTicker from "@/components/ui/StockTicker";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>
          TheFinance - Premium Investor Database & Fundraising Platform
        </title>
        <meta
          name="description"
          content="Access 10,000+ verified investor profiles with contact information. Advanced search, AI tools, and export capabilities to accelerate your fundraising journey."
        />
        <meta
          name="keywords"
          content="investor database, fundraising, startup funding, venture capital, angel investors, pitch deck, investor contacts, startup tools"
        />
        <link rel="canonical" href="https://thefinance.vercel.app" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="TheFinance - Premium Investor Database & Fundraising Platform"
        />
        <meta
          property="og:description"
          content="Access 10,000+ verified investor profiles with contact information. Advanced search, AI tools, and export capabilities to accelerate your fundraising journey."
        />
        <meta property="og:url" content="https://thefinance.vercel.app" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="TheFinance - Premium Investor Database & Fundraising Platform"
        />
        <meta
          name="twitter:description"
          content="Access 10,000+ verified investor profiles with contact information. Advanced search, AI tools, and export capabilities to accelerate your fundraising journey."
        />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <StockTicker />
        <Header showLandingNav={true} />
        <HeroSection />
        <FeaturesSection />
        <WhyChooseUsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
