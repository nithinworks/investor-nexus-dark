import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const InvestorApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [industries, setIndustries] = useState<string[]>([]);
  const [newIndustry, setNewIndustry] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    company: "",
    company_url: "",
    contact: "",
    contact_type: "email",
    location: "",
    funding_type: "",
    funding_stage: "",
    funding_description: "",
    check_sizes: "",
    image_url: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addIndustry = () => {
    if (newIndustry.trim() && !industries.includes(newIndustry.trim())) {
      setIndustries((prev) => [...prev, newIndustry.trim()]);
      setNewIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    setIndustries((prev) => prev.filter((i) => i !== industry));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("investor_submissions").insert({
        ...formData,
        funding_industries: industries,
        location: formData.location ? [formData.location] : [],
        funding_stage: formData.funding_stage ? [formData.funding_stage] : [],
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success(
        "Application submitted successfully! We'll review it and get back to you."
      );
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-red-500/40">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-full blur-sm"></div>
            </div>
            <h3 className="text-3xl font-bold text-white">
              Application Submitted!
            </h3>
            <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
              Thank you for your interest in joining our investor network. We'll
              review your application and get back to you within 2-3 business
              days.
            </p>
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <p className="text-red-400 text-sm font-medium">
                💡 Pro tip: Check your email for next steps and additional
                resources
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-6 border-b border-red-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">
            Complete Your Application
          </h2>
          <p className="text-white/70">
            Join our exclusive network of verified investors and gain access to
            premium deal flow.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="bg-white/10 border-red-500/20 text-white placeholder:text-white/50 focus:border-red-500/50 focus:ring-red-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Fund</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="bg-white/10 border-red-500/20 text-white placeholder:text-white/50 focus:border-red-500/50 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio/Professional Summary</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about your investment experience and background..."
                rows={4}
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Email *</Label>
                <Input
                  id="contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="e.g., San Francisco, CA"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_url">Company/Fund Website</Label>
              <Input
                id="company_url"
                type="url"
                value={formData.company_url}
                onChange={(e) =>
                  handleInputChange("company_url", e.target.value)
                }
                placeholder="https://..."
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="funding_type">Investment Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("funding_type", value)
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venture_capital">
                      Venture Capital
                    </SelectItem>
                    <SelectItem value="angel">Angel Investment</SelectItem>
                    <SelectItem value="private_equity">
                      Private Equity
                    </SelectItem>
                    <SelectItem value="corporate_venture">
                      Corporate Venture
                    </SelectItem>
                    <SelectItem value="accelerator">
                      Accelerator/Incubator
                    </SelectItem>
                    <SelectItem value="family_office">Family Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding_stage">Preferred Stages</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("funding_stage", value)
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series_a">Series A</SelectItem>
                    <SelectItem value="series_b">Series B</SelectItem>
                    <SelectItem value="series_c">Series C+</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="check_sizes">Typical Check Size</Label>
              <Input
                id="check_sizes"
                value={formData.check_sizes}
                onChange={(e) =>
                  handleInputChange("check_sizes", e.target.value)
                }
                placeholder="e.g., $25K - $500K"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Investment Industries</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  placeholder="Add industry..."
                  className="bg-background"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addIndustry())
                  }
                />
                <Button
                  type="button"
                  onClick={addIndustry}
                  size="icon"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {industry}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeIndustry(industry)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_description">Investment Focus</Label>
              <Textarea
                id="funding_description"
                value={formData.funding_description}
                onChange={(e) =>
                  handleInputChange("funding_description", e.target.value)
                }
                placeholder="Describe your investment thesis and what you look for in startups..."
                rows={3}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Profile Photo URL (Optional)</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                placeholder="https://..."
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.contact}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvestorApplicationForm;
