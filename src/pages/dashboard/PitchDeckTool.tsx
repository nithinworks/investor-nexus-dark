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

  if (loading) {
    return <div>Loading...</div>;
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