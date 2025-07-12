import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Crown, ArrowRight } from "lucide-react";
import InvestorEmailGenerator from "@/components/ai/InvestorEmailGenerator";
import { useSubscription } from "@/hooks/useSubscription";

const InvestorEmailTool = () => {
  const { subscriptionTier, loading } = useSubscription();
  
  const [investorEmailForm, setInvestorEmailForm] = useState({
    investorName: "",
    companyName: "",
    pitchSummary: "",
    fundingAmount: "",
    useOfFunds: "",
    contactInfo: "",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-satoshi">
            AI Investor Email Generator
          </h1>
          <p className="text-muted-foreground mt-2 font-satoshi">
            Generate professional investor outreach emails with AI
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg">
          <Mail className="h-4 w-4" />
          <span className="font-medium font-satoshi">Email Generator</span>
        </div>
      </div>

      <div className="space-y-4">
        <InvestorEmailGenerator 
          formData={investorEmailForm}
          setFormData={setInvestorEmailForm}
        />
      </div>
    </div>
  );
};

export default InvestorEmailTool;