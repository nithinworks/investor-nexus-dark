import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail, Download, Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";

interface InvestorEmailFormData {
  investorName: string;
  companyName: string;
  pitchSummary: string;
  fundingAmount: string;
  useOfFunds: string;
  contactInfo: string;
}

const InvestorEmailGenerator = () => {
  const { user } = useAuth();
  const { consumeAction, canPerformAction, getRemainingActions } = useActions();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<InvestorEmailFormData>({
    investorName: "",
    companyName: "",
    pitchSummary: "",
    fundingAmount: "",
    useOfFunds: "",
    contactInfo: "",
  });

  // Auto-scroll to result when content is generated
  useEffect(() => {
    if (generatedContent && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [generatedContent]);

  const handleInputChange = (
    field: keyof InvestorEmailFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate investor emails.",
        variant: "destructive",
      });
      return;
    }

    if (
      !formData.companyName ||
      !formData.pitchSummary ||
      !formData.fundingAmount
    ) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in at least the company name, pitch summary, and funding amount fields.",
        variant: "destructive",
      });
      return;
    }

    if (!canPerformAction("ai_tool", 2)) {
      toast({
        title: "Action Limit Reached",
        description: `You need at least 2 actions to use this AI tool. You have ${getRemainingActions()} actions remaining. Please upgrade your plan.`,
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-investor-email",
        {
          body: formData,
        }
      );

      if (error) throw error;

      const actionsConsumed = await consumeAction("ai_tool", 2);
      if (!actionsConsumed) {
        return;
      }

      if (data.generatedContent) {
        setGeneratedContent(data.generatedContent);
        toast({
          title: "Success!",
          description:
            "Your investor email has been generated successfully. (2 actions consumed)",
        });
      } else {
        throw new Error(
          "No content was generated. The response from the AI was empty."
        );
      }
    } catch (error: any) {
      console.error("Error generating investor email:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to generate investor email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Email content copied to clipboard.",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `InvestorEmail_${formData.companyName || "Email"}_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-satoshi">
      <Card className="backdrop-blur-sm bg-white/5 border-white/10">
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="investorName"
                className="text-white/90 text-sm font-medium"
              >
                Investor Name
              </Label>
              <Input
                id="investorName"
                placeholder="John Smith (optional)"
                value={formData.investorName}
                onChange={(e) =>
                  handleInputChange("investorName", e.target.value)
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="companyName"
                className="text-white/90 text-sm font-medium"
              >
                Company Name *
              </Label>
              <Input
                id="companyName"
                placeholder="Your startup name"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pitchSummary"
              className="text-white/90 text-sm font-medium"
            >
              Pitch Summary *
            </Label>
            <Textarea
              id="pitchSummary"
              placeholder="Brief overview of your startup, what you do, key traction metrics, and why it's an exciting opportunity"
              value={formData.pitchSummary}
              onChange={(e) =>
                handleInputChange("pitchSummary", e.target.value)
              }
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="fundingAmount"
                className="text-white/90 text-sm font-medium"
              >
                Funding Amount *
              </Label>
              <Input
                id="fundingAmount"
                placeholder="e.g., $500K, $2M Series A"
                value={formData.fundingAmount}
                onChange={(e) =>
                  handleInputChange("fundingAmount", e.target.value)
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="useOfFunds"
                className="text-white/90 text-sm font-medium"
              >
                Use of Funds
              </Label>
              <Input
                id="useOfFunds"
                placeholder="How will you use the funding?"
                value={formData.useOfFunds}
                onChange={(e) =>
                  handleInputChange("useOfFunds", e.target.value)
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contactInfo"
              className="text-white/90 text-sm font-medium"
            >
              Contact Information
            </Label>
            <Textarea
              id="contactInfo"
              placeholder="Your name, title, email, phone, and any relevant links (LinkedIn, company website, etc.)"
              value={formData.contactInfo}
              onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[80px] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Email...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Generate Investor Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card
          className="backdrop-blur-sm bg-white/5 border-white/10"
          ref={resultRef}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl font-medium">
                  Generated Investor Email
                </CardTitle>
                <CardDescription className="text-white/60 text-sm">
                  Your AI-generated investor outreach email
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={downloadAsText}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InvestorEmailGenerator;
