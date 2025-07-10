import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIndustry = () => {
    if (newIndustry.trim() && !industries.includes(newIndustry.trim())) {
      setIndustries(prev => [...prev, newIndustry.trim()]);
      setNewIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    setIndustries(prev => prev.filter(i => i !== industry));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("investor_submissions")
        .insert({
          ...formData,
          funding_industries: industries,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Application submitted successfully! We'll review it and get back to you.");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest in joining our investor network. We'll review your application and get back to you within 2-3 business days.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Join Our Investor Network</CardTitle>
        <CardDescription>
          Apply to be featured in our investor database and connect with promising startups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company/Fund</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-background"
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
                onChange={(e) => handleInputChange("location", e.target.value)}
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
              onChange={(e) => handleInputChange("company_url", e.target.value)}
              placeholder="https://..."
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funding_type">Investment Type</Label>
              <Select onValueChange={(value) => handleInputChange("funding_type", value)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venture_capital">Venture Capital</SelectItem>
                  <SelectItem value="angel">Angel Investment</SelectItem>
                  <SelectItem value="private_equity">Private Equity</SelectItem>
                  <SelectItem value="corporate_venture">Corporate Venture</SelectItem>
                  <SelectItem value="accelerator">Accelerator/Incubator</SelectItem>
                  <SelectItem value="family_office">Family Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="funding_stage">Preferred Stages</Label>
              <Select onValueChange={(value) => handleInputChange("funding_stage", value)}>
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
              onChange={(e) => handleInputChange("check_sizes", e.target.value)}
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
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIndustry())}
              />
              <Button type="button" onClick={addIndustry} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge key={industry} variant="secondary" className="flex items-center gap-1">
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
              onChange={(e) => handleInputChange("funding_description", e.target.value)}
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
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvestorApplicationForm;