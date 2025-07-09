import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail, Download, Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface InvestorEmailFormData {
  investorName: string;
  companyName: string;
  pitchSummary: string;
  fundingAmount: string;
  useOfFunds: string;
  contactInfo: string;
}

interface InvestorEmailGeneratorProps {
  formData: InvestorEmailFormData;
  setFormData: (data: InvestorEmailFormData) => void;
}

const InvestorEmailGenerator = ({ formData, setFormData }: InvestorEmailGeneratorProps) => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
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

    if (!formData.companyName || !formData.pitchSummary || !formData.fundingAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the company name, pitch summary, and funding amount fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-investor-email", {
        body: formData,
      });

      if (error) throw error;

      setGeneratedContent(data.generatedContent);
      toast({
        title: "Success!",
        description: "Your investor email has been generated successfully.",
      });
    } catch (error: any) {
      console.error("Error generating investor email:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate investor email. Please try again.",
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
    a.download = `InvestorEmail_${formData.companyName || "Email"}_${new Date().toISOString().split('T')[0]}.txt`;
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
              <Mail className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-white">AI Investor Email Generator</CardTitle>
              <CardDescription className="text-gray-300">
                Generate compelling investor outreach emails with AI assistance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investorName" className="text-white">Investor Name</Label>
              <Input
                id="investorName"
                placeholder="John Smith (optional)"
                value={formData.investorName}
                onChange={(e) => handleInputChange("investorName", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="pitchSummary" className="text-white">Pitch Summary *</Label>
            <Textarea
              id="pitchSummary"
              placeholder="Brief overview of your startup, what you do, key traction metrics, and why it's an exciting opportunity"
              value={formData.pitchSummary}
              onChange={(e) => handleInputChange("pitchSummary", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundingAmount" className="text-white">Funding Amount *</Label>
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

          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="text-white">Contact Information</Label>
            <Textarea
              id="contactInfo"
              placeholder="Your name, title, email, phone, and any relevant links (LinkedIn, company website, etc.)"
              value={formData.contactInfo}
              onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[80px]"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
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
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Generated Investor Email</CardTitle>
                <CardDescription className="text-gray-300">
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

export default InvestorEmailGenerator;