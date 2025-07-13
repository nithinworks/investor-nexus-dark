import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Trash2, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import InvestorList from "@/components/investors/InvestorList";
import { Tables } from "@/integrations/supabase/types";
import { useActions } from "@/hooks/useActions";

type Investor = Tables<"investors">;

const SavedLists = () => {
  const { user } = useAuth();
  const { consumeAction, canPerformAction, getRemainingActions } = useActions();
  const queryClient = useQueryClient();

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

  // Fetch investor details for saved investors
  const { data: investorDetails = [], isLoading } = useQuery({
    queryKey: ["saved-investor-details", savedInvestors],
    queryFn: async () => {
      if (savedInvestors.length === 0) return [];
      
      const { data, error } = await supabase
        .from("investors")
        .select("*")
        .in("id", savedInvestors);

      if (error) throw error;
      return data as Investor[];
    },
    enabled: savedInvestors.length > 0,
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

  // Remove from saved mutation
  const removeSavedMutation = useMutation({
    mutationFn: async (investorId: string) => {
      const { error } = await supabase
        .from("saved_investors")
        .delete()
        .eq("user_id", user!.id)
        .eq("investor_id", investorId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-investors"] });
      toast({
        title: "Success",
        description: "Investor removed from saved list",
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

  // Export to CSV function
  const exportToCSV = async () => {
    if (investorDetails.length === 0) {
      toast({
        title: "No data to export",
        description: "You don't have any saved investors to export.",
        variant: "destructive",
      });
      return;
    }

    // Check if user can perform action and consume 1 credit for export
    if (!canPerformAction('export')) {
      toast({
        title: "Action Limit Reached",
        description: `You need at least 1 action to export data. You have ${getRemainingActions()} actions remaining.`,
        variant: "destructive",
      });
      return;
    }

    const actionConsumed = await consumeAction('export');
    if (!actionConsumed) {
      return; // Action consumption failed, error already shown
    }

    // Define CSV headers
    const headers = [
      "Name",
      "Company",
      "Location",
      "Funding Type",
      "Funding Stage",
      "Industries",
      "Check Sizes",
      "Bio",
      "Contact",
      "Contact Type",
      "Company URL",
      "Verified"
    ];

    // Convert data to CSV format
    const csvData = investorDetails.map(investor => [
      investor.name || "",
      investor.company || "",
      investor.location?.join(', ') || "",
      investor.funding_type || "",
      investor.funding_stage?.join(', ') || "",
      (investor.funding_industries || []).join("; "),
      investor.check_sizes || "",
      investor.bio || "",
      revealedContacts.includes(investor.id) ? investor.contact : "***HIDDEN***",
      investor.contact_type || "",
      investor.company_url || "",
      investor.verified ? "Yes" : "No"
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => 
        row.map(field => 
          // Escape commas and quotes in field values
          `"${String(field).replace(/"/g, '""')}"`
        ).join(",")
      )
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `saved_investors_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `Exported ${investorDetails.length} investors to CSV (1 action consumed)`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Saved Lists
          </h1>
          <p className="text-muted-foreground">
            Manage your saved investors and export data
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={exportToCSV}
            disabled={investorDetails.length === 0}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold px-6 py-2.5 shadow-lg hover:shadow-red-500/25 transition-all duration-200 backdrop-blur-sm border border-red-400/30"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-xl border border-red-500/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
            <FileText className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Saved Investors Summary</h3>
            <p className="text-sm text-muted-foreground">Overview of your saved investor list</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {investorDetails.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Saved
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {investorDetails.filter(inv => revealedContacts.includes(inv.id)).length}
            </div>
            <div className="text-sm text-muted-foreground">
              Contacts Revealed
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {investorDetails.filter(inv => inv.verified).length}
            </div>
            <div className="text-sm text-muted-foreground">
              Verified Investors
            </div>
          </div>
        </div>
      </div>

      {/* Investor List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Loading saved investors...</div>
          </div>
        ) : investorDetails.length === 0 ? (
          <Card className="border border-border bg-card">
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-card-foreground mb-2">
                No saved investors yet
              </h3>
              <p className="text-muted-foreground">
                Start exploring the investor database and save interesting profiles.
              </p>
            </CardContent>
          </Card>
        ) : (
          <InvestorList
            investors={investorDetails}
            savedInvestors={savedInvestors}
            onToggleSave={(investorId) => removeSavedMutation.mutate(investorId)}
            canSave={true}
            revealedContacts={revealedContacts}
            onRevealContact={() => {}}
            canRevealContact={false}
          />
        )}
      </div>
    </div>
  );
};

export default SavedLists;