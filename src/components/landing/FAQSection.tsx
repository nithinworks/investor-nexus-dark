
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI-powered investor matching work?",
      answer: "Our AI analyzes your startup profile, including industry, stage, funding amount, and business model, then matches you with investors who have a history of investing in similar companies. The algorithm considers over 50 data points to ensure highly relevant matches."
    },
    {
      question: "How many investors are in your database?",
      answer: "We have over 10,000 verified investors in our database, including VCs, angel investors, family offices, and corporate venture arms. Our database is continuously updated with new investors and their latest investment activities."
    },
    {
      question: "What information do you provide about investors?",
      answer: "Each investor profile includes contact details, investment preferences, check size ranges, portfolio companies, recent investments, geographic focus, and preferred industries. We also provide insights on their investment timeline and decision-making process."
    },
    {
      question: "Can I export investor lists?",
      answer: "Yes, you can export investor lists to CSV format for your outreach campaigns. You can also save multiple lists, organize them by tags, and share them with your team members."
    },
    {
      question: "Do you offer AI-generated pitch materials?",
      answer: "Yes, our AI tools can generate personalized pitch decks and investor emails based on your company information and the specific investor you're targeting. This helps you create more compelling and relevant outreach materials."
    },
    {
      question: "What's included in the free trial?",
      answer: "The 7-day free trial includes access to our full investor database, AI matching, basic filtering, and the ability to save up to 50 investors. You can also test our AI pitch deck and email generation tools."
    },
    {
      question: "How accurate is your investor data?",
      answer: "We maintain over 95% accuracy by continuously updating our database through multiple sources including SEC filings, press releases, and direct verification. Our team reviews and updates investor information monthly."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes, our platform supports team collaboration. You can share investor lists, assign tasks, track outreach progress, and manage your fundraising pipeline with your co-founders and team members."
    },
    {
      question: "Do you integrate with CRM systems?",
      answer: "Yes, we integrate with popular CRM systems including Salesforce, HubSpot, and Pipedrive. You can also use Zapier to connect with over 3,000 other tools and automate your fundraising workflow."
    },
    {
      question: "What if I need help with my fundraising strategy?",
      answer: "We provide comprehensive resources including fundraising guides, best practices, and email templates. Premium users also get access to fundraising workshops and can request strategy consultations with our team."
    }
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
            Everything you need to know about TheFinance and how it can help you raise funding
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
          <p className="text-white/60 text-base mb-4">
            Still have questions?
          </p>
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
