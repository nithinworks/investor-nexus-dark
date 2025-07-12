import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How many investors are in your database?",
      answer:
        "We have over 10,000 verified investors in our database, including VCs, angel investors, family offices, and corporate venture arms. Our database is continuously updated with new investors and their latest investment activities.",
    },
    {
      question: "What counts as an action?",
      answer:
        "Actions include viewing investor contact details, exporting data to CSV, generating AI emails, and creating AI pitch decks. Browsing, searching, and filtering are always free and unlimited - you only use actions when accessing premium features.",
    },
    {
      question: "What information do you provide about investors?",
      answer:
        "Each investor profile includes contact details, fund size, check size ranges, investment preferences, portfolio companies, geographic focus, and preferred industries. We also provide insights on their investment thesis and recent activity.",
    },
    {
      question: "Can I export investor lists?",
      answer:
        "Yes, you can export investor lists to CSV format for your outreach campaigns. You can also save multiple lists, organize them by tags, and access them anytime. CSV exports include all available investor data.",
    },
    {
      question: "How do the AI tools work?",
      answer:
        "Our AI pitch deck generator creates professional presentations tailored to your startup and target investors. The AI email generator crafts personalized outreach emails based on investor preferences and your company profile. Both tools use advanced AI to improve your fundraising materials.",
    },
    {
      question: "How accurate is your investor data?",
      answer:
        "We maintain over 99% accuracy by continuously updating our database through multiple sources including SEC filings, press releases, and direct verification. Our team reviews and updates investor information regularly to ensure you have the most current data.",
    },
    {
      question: "What search filters are available?",
      answer:
        "You can filter by industry, investment stage, check size, geographic location, fund type, recent activity, and over 50+ other criteria. Our advanced search helps you find exactly the right investors for your startup and funding stage.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, we provide email support for all users, with priority support for paid plans. Premium users also get access to a dedicated account manager and can schedule consultation calls for fundraising strategy guidance.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing cycle. Unused actions don't roll over to the next month.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security with 99.9% uptime, encrypted data transmission, and secure storage. Your company information and search activity are kept completely confidential and never shared with third parties.",
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need to know about TheFinance and how it can help you
            raise funding
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white/5 rounded-2xl border border-red-500/20 backdrop-blur-sm p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-red-500/20 rounded-lg bg-white/5 backdrop-blur-sm px-6 hover:border-red-500/40 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-red-400 transition-colors py-6 text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-6 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-base mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@thefinance.com"
              className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium underline underline-offset-4"
            >
              Contact our support team
            </a>
            <span className="text-white/40 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium underline underline-offset-4"
            >
              Schedule a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
