import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Crown, ArrowRight } from "lucide-react";
import PitchDeckGenerator from "@/components/ai/PitchDeckGenerator";
import InvestorEmailGenerator from "@/components/ai/InvestorEmailGenerator";
import { useSubscription } from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";

const AITools = () => {
  const { subscriptionTier, loading } = useSubscription();
  const [activeTab, setActiveTab] = useState("pitch-deck");

  const isPaidUser =
    subscriptionTier === "pro" || subscriptionTier === "enterprise";

  return (
    <div className="min-h-screen bg-black p-6 font-satoshi">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <Crown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                AI-Powered Tools
              </h1>
              <p className="text-white/60">
                Generate professional fundraising content with AI
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <Skeleton className="h-48 w-full rounded-lg" />
        ) : isPaidUser ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="backdrop-blur-sm bg-white/5 border border-white/10 mb-6 h-12 rounded-lg p-1 w-full max-w-md">
              <TabsTrigger
                value="pitch-deck"
                className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md transition-all duration-200 flex items-center gap-2 flex-1 font-medium"
              >
                <FileText className="h-4 w-4" />
                Pitch Deck
              </TabsTrigger>
              <TabsTrigger
                value="investor-email"
                className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md transition-all duration-200 flex items-center gap-2 flex-1 font-medium"
              >
                <Mail className="h-4 w-4" />
                Investor Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pitch-deck" className="space-y-4">
              <PitchDeckGenerator />
            </TabsContent>

            <TabsContent value="investor-email" className="space-y-4">
              <InvestorEmailGenerator />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="backdrop-blur-sm bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <Crown className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                AI Tools - Premium Feature
              </CardTitle>
              <CardDescription className="text-white/60 text-lg">
                Unlock powerful AI-driven tools to accelerate your fundraising
                journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-6 w-6 text-red-400" />
                    <h3 className="text-white font-medium">
                      AI Pitch Deck Generator
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Generate professional, investor-ready pitch decks with AI
                    assistance. Get compelling content, structure, and speaker
                    notes.
                  </p>
                  <div className="text-xs text-white/50 space-y-1">
                    <div>✓ 13 professional slides</div>
                    <div>✓ Investor-focused content</div>
                    <div>✓ Financial projections</div>
                    <div>✓ Export capabilities</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="h-6 w-6 text-red-400" />
                    <h3 className="text-white font-medium">
                      AI Investor Email Generator
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Create compelling investor outreach emails that get
                    responses. Personalized, professional, and
                    conversion-optimized.
                  </p>
                  <div className="text-xs text-white/50 space-y-1">
                    <div>✓ Personalized messaging</div>
                    <div>✓ Professional tone</div>
                    <div>✓ Compelling subject lines</div>
                    <div>✓ Copy & download options</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                  onClick={() => window.open("/pricing", "_blank")}
                >
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-white/50 text-sm mt-3">
                  Start your 7-day free trial today
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AITools;
