import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Crown, ArrowRight } from "lucide-react";
import PitchDeckGenerator from "@/components/ai/PitchDeckGenerator";
import { useSubscription } from "@/hooks/useSubscription";

const PitchDeckTool = () => {
  const { subscriptionTier, loading } = useSubscription();
  
  const [pitchDeckForm, setPitchDeckForm] = useState({
    companyName: "",
    industry: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    fundingAmount: "",
    useOfFunds: "",
  });

  const isPaidUser = subscriptionTier === "pro" || subscriptionTier === "enterprise";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isPaidUser) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-satoshi">
              AI Pitch Deck Generator
            </h1>
            <p className="text-muted-foreground mt-2 font-satoshi">
              Generate professional investor pitch decks with AI
            </p>
          </div>
        </div>

        <Card className="border-2 border-dashed border-blue-500/50 bg-blue-500/5">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground font-satoshi">
              Upgrade to Pro Required
            </CardTitle>
            <CardDescription className="text-base font-satoshi">
              The AI Pitch Deck Generator is available for Pro and Enterprise users only.
              Upgrade now to access this powerful tool and create investor-ready pitch decks.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" className="font-satoshi group">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-satoshi">
            AI Pitch Deck Generator
          </h1>
          <p className="text-muted-foreground mt-2 font-satoshi">
            Generate professional investor pitch decks with AI
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg">
          <FileText className="h-4 w-4" />
          <span className="font-medium font-satoshi">Pitch Deck Generator</span>
        </div>
      </div>

      <div className="space-y-4">
        <PitchDeckGenerator 
          formData={pitchDeckForm}
          setFormData={setPitchDeckForm}
        />
      </div>
    </div>
  );
};

export default PitchDeckTool;