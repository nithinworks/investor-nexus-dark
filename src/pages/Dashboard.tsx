
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import FilterSection from "@/components/filters/FilterSection";
import InvestorList from "@/components/investors/InvestorList";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Bookmark, Download, FileSpreadsheet } from "lucide-react";

type Investor = Tables<"investors">;
type Profile = Tables<"profiles">;

const Dashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });

  // Fetch investors
  const { data: investors = [], isLoading } = useQuery({
    queryKey: ["investors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Investor[];
    },
  });

  // Fetch saved investors
  const { data: savedInvestors = [] } = useQuery({
    queryKey: ["saved-investors", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_investors")
        .select("investor_id")
        .eq("user_id", user!.id);

      if (error) throw error;
      return data.map((item) => item.investor_id!);
    },
    enabled: !!user,
  });

  // Fetch revealed contacts
  const { data: revealedContacts = [] } = useQuery({
    queryKey: ["revealed-contacts", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_reveals")
        .select("investor_id")
        .eq("user_id", user!.id);

      if (error) throw error;
      return data.map((item) => item.investor_id!);
    },
    enabled: !!user,
  });

  // Save/unsave investor mutation
  const toggleSaveMutation = useMutation({
    mutationFn: async (investorId: string) => {
      const isSaved = savedInvestors.includes(investorId);

      if (isSaved) {
        const { error } = await supabase
          .from("saved_investors")
          .delete()
          .eq("user_id", user!.id)
          .eq("investor_id", investorId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("saved_investors").insert({
          user_id: user!.id,
          investor_id: investorId,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-investors"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Contact reveal mutation
  const revealContactMutation = useMutation({
    mutationFn: async (investorId: string) => {
      // Check if contact is already revealed
      if (revealedContacts.includes(investorId)) {
        return;
      }

      // Check access limit for free users
      if (
        profile?.subscription_tier === "free" &&
        profile.access_used >= profile.access_limit
      ) {
        throw new Error(
          "You have reached your monthly contact reveal limit. Please upgrade to Pro."
        );
      }

      // Insert contact reveal record
      const { error } = await supabase.from("contact_reveals").insert({
        user_id: user!.id,
        investor_id: investorId,
      });

      if (error) throw error;

      // Update access count for free users
      if (profile?.subscription_tier === "free") {
        await supabase
          .from("profiles")
          .update({ access_used: (profile.access_used || 0) + 1 })
          .eq("id", user!.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revealed-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Success",
        description: "Contact information revealed!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter investors
  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      !searchTerm ||
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.funding_description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      investor.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      !selectedCountry ||
      selectedCountry === " " ||
      investor.location === selectedCountry;
    const matchesType =
      !selectedType ||
      selectedType === " " ||
      investor.funding_type === selectedType;
    const matchesStage =
      !selectedStage ||
      selectedStage === " " ||
      investor.funding_stage === selectedStage;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => investor.funding_industries?.includes(tag));

    return (
      matchesSearch &&
      matchesCountry &&
      matchesType &&
      matchesStage &&
      matchesTags
    );
  });

  const savedInvestorData = investors.filter((investor) =>
    savedInvestors.includes(investor.id)
  );

  // Get unique values for filters
  const countries = [
    ...new Set(investors.map((i) => i.location).filter(Boolean)),
  ].sort();
  const allTags = [
    ...new Set(investors.flatMap((i) => i.funding_industries || [])),
  ].sort();

  // Enhanced Export Function
  const handleExport = (investorData: Investor[], filename: string) => {
    const csvContent = [
      // CSV Headers
      "Name,Company,Location,Funding Type,Funding Stage,Check Sizes,Industries,Description,Website,Contact",
      // CSV Data
      ...investorData.map(investor => [
        `"${investor.name}"`,
        `"${investor.company || ''}"`,
        `"${investor.location || ''}"`,
        `"${investor.funding_type || ''}"`,
        `"${investor.funding_stage || ''}"`,
        `"${investor.check_sizes || ''}"`,
        `"${investor.funding_industries?.join('; ') || ''}"`,
        `"${investor.funding_description?.replace(/"/g, '""') || ''}"`,
        `"${investor.company_url || ''}"`,
        `"${revealedContacts.includes(investor.id) ? investor.contact : 'Not revealed'}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export Complete",
      description: `Successfully exported ${investorData.length} investors to ${filename}`,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black font-satoshi">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {profile && (
          <SubscriptionBanner
            accessUsed={profile.access_used || 0}
            accessLimit={profile.access_limit || 0}
            subscriptionTier={profile.subscription_tier || "free"}
          />
        )}

        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/10 via-transparent to-transparent rounded-2xl border border-white/10 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 font-satoshi">Investor Database</h1>
                <p className="text-gray-400 font-satoshi">Discover and connect with investors that match your startup's needs</p>
              </div>
              
              {/* Enhanced Export Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleExport(filteredInvestors, 'filtered_investors.csv')}
                  variant="outline"
                  className="backdrop-blur-sm border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 font-satoshi font-semibold transition-all duration-200 rounded-lg"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Filtered
                </Button>
                
                {savedInvestorData.length > 0 && (
                  <Button
                    onClick={() => handleExport(savedInvestorData, 'saved_investors.csv')}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-satoshi font-semibold transition-all duration-200 rounded-lg shadow-lg hover:shadow-red-500/25"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Saved
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              availableTags={allTags}
              countries={countries}
            />
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="backdrop-blur-xl bg-white/5 border border-white/10 mb-6 h-12 rounded-xl p-1 w-full max-w-md">
                <TabsTrigger
                  value="all"
                  className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 flex items-center gap-2 flex-1 font-satoshi"
                >
                  <Users className="h-4 w-4" />
                  All ({filteredInvestors.length})
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="text-white/60 data-[state=active]:bg-red-500/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 flex items-center gap-2 flex-1 font-satoshi"
                >
                  <Bookmark className="h-4 w-4" />
                  Saved ({savedInvestorData.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <InvestorList
                  investors={filteredInvestors}
                  savedInvestors={savedInvestors}
                  onToggleSave={(investorId) =>
                    toggleSaveMutation.mutate(investorId)
                  }
                  canSave={true}
                  revealedContacts={revealedContacts}
                  onRevealContact={(investorId) =>
                    revealContactMutation.mutate(investorId)
                  }
                  canRevealContact={true}
                />
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <InvestorList
                  investors={savedInvestorData}
                  savedInvestors={savedInvestors}
                  onToggleSave={(investorId) =>
                    toggleSaveMutation.mutate(investorId)
                  }
                  canSave={true}
                  revealedContacts={revealedContacts}
                  onRevealContact={(investorId) =>
                    revealContactMutation.mutate(investorId)
                  }
                  canRevealContact={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
