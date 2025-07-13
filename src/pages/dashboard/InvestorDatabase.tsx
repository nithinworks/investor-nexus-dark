import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import FilterSection from "@/components/filters/FilterSection";
import InvestorList from "@/components/investors/InvestorList";
import { toast } from "@/hooks/use-toast";
import { Database, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useActions } from "@/hooks/useActions";

type Investor = Tables<"investors">;

const InvestorDatabase = () => {
  const { user } = useAuth();
  const { consumeAction, canPerformAction, getRemainingActions } = useActions();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Fetch user profile for access limits
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      return data;
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

      // Check if user can perform action and consume 1 credit for contact reveal
      if (!canPerformAction('contact_reveal')) {
        throw new Error(
          `You need at least 1 action to reveal contact information. You have ${getRemainingActions()} actions remaining.`
        );
      }

      const actionConsumed = await consumeAction('contact_reveal');
      if (!actionConsumed) {
        throw new Error("Failed to consume action for contact reveal.");
      }

      // Insert contact reveal record
      const { error } = await supabase.from("contact_reveals").insert({
        user_id: user!.id,
        investor_id: investorId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revealed-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Success",
        description: "Contact information revealed! (1 action consumed)",
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
      investor.location?.includes(selectedCountry);
    const matchesType =
      !selectedType ||
      selectedType === " " ||
      investor.funding_type === selectedType;
    const matchesStage =
      !selectedStage ||
      selectedStage === " " ||
      investor.funding_stage?.includes(selectedStage);
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

  // Get unique values for filters
  const countries = [
    ...new Set(investors.flatMap((i) => i.location || [])),
  ].sort();
  const allTags = [
    ...new Set(investors.flatMap((i) => i.funding_industries || [])),
  ].sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Investor Database
        </h1>
        <p className="text-muted-foreground">
          Discover and connect with investors that match your startup's needs
        </p>
      </div>

      {/* Stats Card */}
      <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-xl border border-red-500/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
            <Database className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Database Overview</h3>
            <p className="text-sm text-muted-foreground">Current investor database statistics</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {investors.length.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Investors
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {filteredInvestors.length.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Filtered Results
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {savedInvestors.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Your Saved
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default InvestorDatabase;