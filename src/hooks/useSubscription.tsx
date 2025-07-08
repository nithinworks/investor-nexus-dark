import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionContextType {
  subscriptionTier: string;
  accessLimit: number;
  accessUsed: number;
  billingCycle: string;
  subscriptionEnd: string | null;
  loading: boolean;
  refreshSubscription: () => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState("basic");
  const [accessLimit, setAccessLimit] = useState(20);
  const [accessUsed, setAccessUsed] = useState(0);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSubscription = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // First check the database for current info
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setSubscriptionTier(profile.subscription_tier || "basic");
        setAccessLimit(profile.access_limit || 20);
        setAccessUsed(profile.access_used || 0);
        setBillingCycle(profile.billing_cycle || "monthly");
        setSubscriptionEnd(profile.subscription_end);
      }

      // Then refresh from Stripe
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) throw error;

      if (data) {
        setSubscriptionTier(data.subscription_tier || "basic");
        setAccessLimit(data.access_limit || 20);
        setBillingCycle(data.billing_cycle || "monthly");
        setSubscriptionEnd(data.subscription_end);
      }
    } catch (error) {
      console.error("Error refreshing subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
    }
  };

  useEffect(() => {
    if (user) {
      refreshSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionTier,
        accessLimit,
        accessUsed,
        billingCycle,
        subscriptionEnd,
        loading,
        refreshSubscription,
        openCustomerPortal,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};