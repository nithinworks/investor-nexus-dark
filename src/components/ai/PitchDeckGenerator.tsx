import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, FileText, Download, Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";

interface PitchDeckFormData {
  companyName: string;
  industry: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  fundingAmount: string;
  useOfFunds: string;
}

interface PitchDeckGeneratorProps {
  formData: PitchDeckFormData;
  setFormData: (data: PitchDeckFormData) => void;
}

const PitchDeckGenerator = ({ formData, setFormData }: PitchDeckGeneratorProps) => {
  const { user } = useAuth();
  const { consumeAction, canPerformAction, getRemainingActions } = useActions();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerate = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate pitch decks.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.companyName || !formData.problem || !formData.solution) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the company name, problem, and solution fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if user can perform action and consume 2 credits for AI tool
    if (!canPerformAction()) {
      toast({
        title: "Action Limit Reached",
        description: `You need at least 2 actions to use this AI tool. You have ${getRemainingActions()} actions remaining.`,
        variant: "destructive",
      });
      return;
    }

    const actionConsumed = await consumeAction('ai_tool');
    if (!actionConsumed) {
      return; // Action consumption failed, error already shown
    }

    // Consume second credit for AI tool (total 2 credits)
    const secondActionConsumed = await consumeAction('ai_tool');
    if (!secondActionConsumed) {
      return; // Action consumption failed, error already shown
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-pitch-deck", {
        body: formData,
      });

      if (error) throw error;

      setGeneratedContent(data.generatedContent);
      toast({
        title: "Success!",
        description: "Your pitch deck has been generated successfully. (2 actions consumed)",
      });
    } catch (error: any) {
      console.error("Error generating pitch deck:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate pitch deck. Please try again.",
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
      description: "Pitch deck content copied to clipboard.",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.companyName || "PitchDeck"}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/20 p-2 rounded-xl">
              <FileText className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-white">AI Pitch Deck Generator</CardTitle>
              <CardDescription className="text-gray-300">
                Generate a professional investor pitch deck with AI assistance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Your startup name"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-white">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., FinTech, HealthTech, SaaS"
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem" className="text-white">Problem Statement *</Label>
            <Textarea
              id="problem"
              placeholder="What problem does your startup solve?"
              value={formData.problem}
              onChange={(e) => handleInputChange("problem", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution" className="text-white">Solution *</Label>
            <Textarea
              id="solution"
              placeholder="How does your product/service solve this problem?"
              value={formData.solution}
              onChange={(e) => handleInputChange("solution", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetMarket" className="text-white">Target Market</Label>
              <Textarea
                id="targetMarket"
                placeholder="Who are your customers? Market size?"
                value={formData.targetMarket}
                onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessModel" className="text-white">Business Model</Label>
              <Textarea
                id="businessModel"
                placeholder="How do you make money?"
                value={formData.businessModel}
                onChange={(e) => handleInputChange("businessModel", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[60px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundingAmount" className="text-white">Funding Amount</Label>
              <Input
                id="fundingAmount"
                placeholder="e.g., $500K, $2M Series A"
                value={formData.fundingAmount}
                onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="useOfFunds" className="text-white">Use of Funds</Label>
              <Input
                id="useOfFunds"
                placeholder="How will you use the funding?"
                value={formData.useOfFunds}
                onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Pitch Deck...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Pitch Deck
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Generated Pitch Deck</CardTitle>
                <CardDescription className="text-gray-300">
                  Your AI-generated pitch deck content
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
            <div className="bg-black/20 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-gray-200 text-sm whitespace-pre-wrap font-mono">
                {generatedContent}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PitchDeckGenerator;