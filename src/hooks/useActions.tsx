import { useState } from "react";
import { useAuth } from "./useAuth";
import { useSubscription } from "./useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useActions = () => {
  const { user } = useAuth();
  const { accessUsed, accessLimit, refreshSubscription } = useSubscription();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const canPerformAction = () => {
    return accessUsed < accessLimit;
  };

  const getRemainingActions = () => {
    return Math.max(0, accessLimit - accessUsed);
  };

  const consumeAction = async (actionType: 'contact_reveal' | 'ai_tool' | 'export') => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    if (!canPerformAction()) {
      toast({
        title: "Action Limit Reached",
        description: `You've used all ${accessLimit} actions for this month. Upgrade your plan for more actions.`,
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Update access_used in the database
      const { error } = await supabase
        .from("profiles")
        .update({ access_used: accessUsed + 1 })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      // Refresh subscription data to update the UI
      await refreshSubscription();
      
      return true;
    } catch (error) {
      console.error("Error consuming action:", error);
      toast({
        title: "Error",
        description: "Failed to consume action. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getActionUsagePercentage = () => {
    if (accessLimit === 0) return 0;
    return Math.min(100, (accessUsed / accessLimit) * 100);
  };

  return {
    canPerformAction,
    getRemainingActions,
    consumeAction,
    getActionUsagePercentage,
    actionsUsed: accessUsed,
    actionsLimit: accessLimit,
    loading,
  };
};