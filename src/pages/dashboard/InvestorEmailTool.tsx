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
              AI Investor Email Generator
            </h1>
            <p className="text-muted-foreground mt-2 font-satoshi">
              Generate professional investor outreach emails with AI
            </p>
          </div>
        </div>

        <Card className="border-2 border-dashed border-red-500/50 bg-red-500/5">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground font-satoshi">
              Upgrade to Pro Required
            </CardTitle>
            <CardDescription className="text-base font-satoshi">
              The AI Investor Email Generator is available for Pro and Enterprise users only.
              Upgrade now to access this powerful tool and generate professional emails that get results.
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