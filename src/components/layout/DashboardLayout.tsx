import { Outlet, Link } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { accessUsed, accessLimit, subscriptionTier } = useSubscription();

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
              <SidebarTrigger className="text-white hover:bg-white/10 transition-all duration-200 rounded-lg p-2 font-satoshi" />
              <div className="flex-1" />
            </div>
          </header>

          {/* Main content with enhanced spacing */}
          <main className="flex-1 p-4 md:p-6">
            {/* Subscription Banner */}
            <div className="mb-6">
              <SubscriptionBanner
                accessUsed={accessUsed}
                accessLimit={accessLimit}
                subscriptionTier={subscriptionTier}
              />
            </div>

            {/* Page content */}
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
