import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconDatabase,
  IconRobot,
} from "@tabler/icons-react";
import { FeatureSkeletons } from "./FeatureSkeletons";

const FeaturesSection = () => {
  const items = [
    {
      title: "Premium Investor Database",
      description:
        "Access 10,000+ verified investor profiles with detailed contact information, fund details, and investment preferences.",
      header: <FeatureSkeletons.SkeletonOne />,
      className: "md:col-span-1",
      icon: <IconDatabase className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Advanced Search & Filters",
      description:
        "Find your perfect investors using powerful filters by industry, stage, check size, location, and investment focus.",
      header: <FeatureSkeletons.SkeletonTwo />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Save & Export Lists",
      description:
        "Create custom investor lists, save your searches, and export complete investor data to CSV for your outreach campaigns.",
      header: <FeatureSkeletons.SkeletonThree />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-red-500" />,
    },
    {
      title: "AI Pitch Deck Generator",
      description:
        "Generate professional, investor-ready pitch decks tailored to your startup using our advanced AI technology.",
      header: <FeatureSkeletons.SkeletonFour />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-red-500" />,
    },
    {
      title: "AI Email Generator",
      description:
        "Create personalized, compelling investor outreach emails that get responses using AI-powered copywriting.",
      header: <FeatureSkeletons.SkeletonFive />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Complete Investor Intel",
      description:
        "Get fund size, check size ranges, portfolio companies, contact details, and investment thesis for each investor.",
      header: <FeatureSkeletons.SkeletonSix />,
      className: "md:col-span-1",
      icon: <IconRobot className="h-4 w-4 text-red-500" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Everything you need to raise funding
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            Premium investor database, advanced search tools, and AI-powered
            content generation to accelerate your fundraising process.
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
