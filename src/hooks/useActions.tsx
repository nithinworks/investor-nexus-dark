import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";
import { useSubscription } from "./useSubscription";

type ActionType = "contact_reveal" | "ai_tool" | "export";

export const useActions = () => {
  const { user } = useAuth();
  const { subscriptionTier, accessUsed, accessLimit, refreshSubscription } =
    useSubscription();

  const getRemainingActions = useCallback(() => {
    if (subscriptionTier === "pro" || subscriptionTier === "enterprise")
      return Infinity;
    return Math.max(0, accessLimit - accessUsed);
  }, [subscriptionTier, accessLimit, accessUsed]);

  const canPerformAction = useCallback(
    (_actionType: ActionType, count = 1) => {
      return getRemainingActions() >= count;
    },
    [getRemainingActions]
  );

  const consumeAction = async (actionType: ActionType, count = 1) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to perform actions.",
        variant: "destructive",
      });
      return false;
    }

    if (!canPerformAction(actionType, count)) {
      toast({
        title: "Action Limit Reached",
        description: `You don't have enough actions. Required: ${count}, Remaining: ${getRemainingActions()}. Please upgrade.`,
        variant: "destructive",
      });
      return false;
    }

    try {
      const newActionsUsed = accessUsed + count;

      const { error } = await supabase
        .from("profiles")
        .update({ access_used: newActionsUsed })
        .eq("id", user.id);

      if (error) throw error;

      await refreshSubscription(true);

      return true;
    } catch (error: any) {
      toast({
        title: "Error Consuming Action",
        description:
          error.message || "There was an issue updating your action count.",
        variant: "destructive",
      });
      await refreshSubscription(true);
      return false;
    }
  };

  return {
    canPerformAction,
    getRemainingActions,
    consumeAction,
  };
};
