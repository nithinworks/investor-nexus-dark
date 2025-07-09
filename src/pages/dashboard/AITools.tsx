import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Crown, ArrowRight } from "lucide-react";
import PitchDeckGenerator from "@/components/ai/PitchDeckGenerator";
import InvestorEmailGenerator from "@/components/ai/InvestorEmailGenerator";
import { useSubscription } from "@/hooks/useSubscription";

const AITools = () => {
  const { subscriptionTier, loading } = useSubscription();
  const [activeTab, setActiveTab] = useState("pitch-deck");

  const isPaidUser = subscriptionTier === "pro" || subscriptionTier === "enterprise";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isPaidUser) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <Crown className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">AI Tools - Premium Feature</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Unlock powerful AI-driven tools to accelerate your fundraising journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-6 w-6 text-red-400" />
                    <h3 className="text-white font-semibold">AI Pitch Deck Generator</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Generate professional, investor-ready pitch decks with AI assistance. 
                    Get compelling content, structure, and speaker notes.
                  </p>
                  <div className="text-xs text-gray-400">
                    ✓ 13 professional slides<br/>
                    ✓ Investor-focused content<br/>
                    ✓ Financial projections<br/>
                    ✓ Export capabilities
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="h-6 w-6 text-red-400" />
                    <h3 className="text-white font-semibold">AI Investor Email Generator</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Create compelling investor outreach emails that get responses. 
                    Personalized, professional, and conversion-optimized.
                  </p>
                  <div className="text-xs text-gray-400">
                    ✓ Personalized messaging<br/>
                    ✓ Professional tone<br/>
                    ✓ Compelling subject lines<br/>
                    ✓ Copy & download options
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                  onClick={() => window.open('/pricing', '_blank')}
                >
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-gray-400 text-sm mt-3">
                  Start your 7-day free trial today
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <Crown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI-Powered Tools</h1>
              <p className="text-gray-400">Generate professional fundraising content with AI</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="backdrop-blur-xl bg-white/5 border border-white/10 mb-6 h-12 rounded-xl p-1 w-full max-w-md">
            <TabsTrigger
              value="pitch-deck"
              className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 flex items-center gap-2 flex-1 font-satoshi"
            >
              <FileText className="h-4 w-4" />
              Pitch Deck
            </TabsTrigger>
            <TabsTrigger
              value="investor-email"
              className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 flex items-center gap-2 flex-1 font-satoshi"
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
      </div>
    </div>
  );
};

export default AITools;