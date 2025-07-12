import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "./use-toast";

interface SubscriptionState {
  subscriptionTier: string;
  accessLimit: number;
  accessUsed: number;
  billingCycle: string;
  subscriptionEnd: string | null;
}

interface SubscriptionContextType extends SubscriptionState {
  loading: boolean;
  refreshSubscription: (silent?: boolean) => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [state, setState] = useState<SubscriptionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  const refreshSubscription = useCallback(
    async (silent = false) => {
      if (!user) {
        if (!silent) setLoading(false);
        return;
      }

      // Only show loading on the very first load
      if (!silent && !hasInitiallyLoaded) {
        setLoading(true);
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select(
            "subscription_tier, access_limit, access_used, billing_cycle, subscription_end"
          )
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (profile) {
          const newState: SubscriptionState = {
            subscriptionTier: profile.subscription_tier || "free",
            accessLimit: profile.access_limit || 10,
            accessUsed: profile.access_used || 0,
            billingCycle: profile.billing_cycle || "monthly",
            subscriptionEnd: profile.subscription_end,
          };
          setState(newState);
        }
      } catch (error) {
        console.error("Error refreshing subscription:", error);
        toast({
          title: "Error",
          description: "Could not fetch your subscription details.",
          variant: "destructive",
        });
      } finally {
        if (!hasInitiallyLoaded) {
          setHasInitiallyLoaded(true);
          setLoading(false);
        }
      }
    },
    [user, hasInitiallyLoaded]
  );

  const openCustomerPortal = async () => {
    if (!user) {
      console.log("No user found for customer portal");
      return;
    }

    console.log("Opening customer portal for user:", user.id);

    try {
      const { data, error } = await supabase.functions.invoke(
        "customer-portal"
      );

      console.log("Customer portal response:", { data, error });

      if (error) throw error;

      if (data?.url) {
        console.log("Opening customer portal URL:", data.url);
        window.open(data.url, "_blank");
      } else {
        console.log("No URL returned from customer portal");
        toast({
          title: "Portal Error",
          description: "No portal URL was returned. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Portal Error",
        description:
          "Could not open the customer portal. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      // First load shows loading, subsequent refreshes are silent
      refreshSubscription(hasInitiallyLoaded);
    } else {
      setState(null);
      setLoading(false);
    }
  }, [user, refreshSubscription, hasInitiallyLoaded]);

  const value = {
    ...(state || {
      subscriptionTier: "free",
      accessLimit: 10,
      accessUsed: 0,
      billingCycle: "monthly",
      subscriptionEnd: null,
    }),
    loading,
    refreshSubscription,
    openCustomerPortal,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};
