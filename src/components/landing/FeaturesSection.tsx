
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { FeatureSkeletons } from "./FeatureSkeletons";

const FeaturesSection = () => {
  const items = [
    {
      title: "Curated Investor Database",
      description:
        "Access our premium database of 10,000+ verified investors across all stages and industries.",
      header: <FeatureSkeletons.SkeletonOne />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Detailed Investor Profiles",
      description:
        "Get complete investor information including contact details, fund size, check size, and investment preferences.",
      header: <FeatureSkeletons.SkeletonTwo />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Smart Filters & Search",
      description:
        "Find the perfect investors using advanced filters by industry, stage, check size, and investment focus.",
      header: <FeatureSkeletons.SkeletonThree />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Save & Export Lists",
      description:
        "Create custom investor lists, save your searches, and export data to CSV for your outreach campaigns.",
      header: <FeatureSkeletons.SkeletonFour />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-red-500" />,
    },
    {
      title: "AI-Powered Tools",
      description:
        "Generate personalized pitch decks and investor emails using our advanced AI technology.",
      header: <FeatureSkeletons.SkeletonFive />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Unbeatable Value",
      description:
        "Get the most comprehensive investor platform at the most competitive price in the market.",
      header: <FeatureSkeletons.SkeletonSix />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Track your outreach performance and optimize your approach with detailed analytics and insights.",
      header: <FeatureSkeletons.SkeletonSeven />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work together with your team to manage investor relationships and coordinate outreach efforts.",
      header: <FeatureSkeletons.SkeletonEight />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-red-500" />,
    },
    {
      title: "CRM Integration",
      description:
        "Seamlessly integrate with your existing CRM and workflow tools like Salesforce, HubSpot, and more.",
      header: <FeatureSkeletons.SkeletonNine />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Everything you need to find investors
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            Our platform combines AI matching with comprehensive investor
            data to streamline your fundraising process.
          </p>
        </div>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem] md:grid-cols-3">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default FeaturesSection;
