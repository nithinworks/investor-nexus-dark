import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users, Bookmark, Activity } from "lucide-react";
import { ActionUsage } from "@/components/dashboard/ActionUsage";
import { toast } from "@/hooks/use-toast";

const DashboardMain = () => {
  const { user } = useAuth();
  const { refreshSubscription } = useSubscription();
  const [searchParams, setSearchParams] = useSearchParams();
  const processedSessionRef = useRef<string | null>(null);

  // Handle successful Stripe checkout
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId && user && processedSessionRef.current !== sessionId) {
      console.log(
        "Detected Stripe session_id, refreshing subscription:",
        sessionId
      );

      // Mark this session as being processed
      processedSessionRef.current = sessionId;

      // Call check-subscription to sync the latest subscription status
      const syncSubscription = async () => {
        try {
          const { data, error } = await supabase.functions.invoke(
            "check-subscription"
          );

          if (error) {
            console.error("Error checking subscription:", error);
            throw error;
          }

          console.log("Subscription sync result:", data);

          // Refresh the frontend subscription state
          await refreshSubscription(false);

          // Show success message
          toast({
            title: "Payment Successful!",
            description: "Your subscription has been updated successfully.",
            variant: "default",
          });

          // Clean up the URL by removing session_id
          searchParams.delete("session_id");
          setSearchParams(searchParams, { replace: true });
        } catch (error) {
          console.error("Failed to sync subscription:", error);
          toast({
            title: "Subscription Sync Error",
            description:
              "Payment was successful, but there was an issue updating your account. Please refresh the page.",
            variant: "destructive",
          });
        }
      };

      // Small delay to ensure user is properly authenticated
      setTimeout(syncSubscription, 1000);
    }
  }, [searchParams, setSearchParams, user, refreshSubscription]);

  // Fetch user profile for usage stats
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

  // Fetch total investors count
  const { data: investorsCount = 0 } = useQuery({
    queryKey: ["investors-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("investors")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  // Fetch saved investors count
  const { data: savedCount = 0 } = useQuery({
    queryKey: ["saved-count", user?.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("saved_investors")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  // Fetch revealed contacts count
  const { data: revealedCount = 0 } = useQuery({
    queryKey: ["revealed-count", user?.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("contact_reveals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  const stats = [
    {
      title: "Total Investors",
      value: investorsCount.toLocaleString(),
      description: "Available in database",
      icon: Users,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      title: "Saved Investors",
      value: savedCount.toString(),
      description: "In your saved lists",
      icon: Bookmark,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      title: "Actions Used",
      value: `${profile?.access_used || 0}/${profile?.access_limit || 0}`,
      description: "This month",
      icon: Activity,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  ];

  return (
    <div className="space-y-6 font-satoshi">
      {/* Welcome Section */}
      <div className="space-y-3 backdrop-blur-xl bg-gradient-to-r from-red-500/10 via-transparent to-transparent rounded-2xl border border-white/10 p-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Welcome back!
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Here's what's happening with your investor connections today.
        </p>
      </div>

      {/* Enhanced Stats Grid - Better Mobile Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={`backdrop-blur-xl bg-white/5 border ${stat.borderColor} hover:bg-white/10 transition-all duration-200 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 md:px-6 pt-3 md:pt-6">
              <div className="space-y-1">
                <CardTitle className="text-xs md:text-sm font-medium text-gray-300 truncate">
                  {stat.title}
                </CardTitle>
                <div className="text-lg md:text-2xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
              <div
                className={`p-2 md:p-2.5 rounded-lg ${stat.bgColor} border ${stat.borderColor} backdrop-blur-sm`}
              >
                <stat.icon className={`h-3 w-3 md:h-4 md:w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
              <p className="text-xs text-gray-400 leading-tight">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Usage and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActionUsage />

        {/* Recent Activity */}
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-satoshi">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your latest interactions with investors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(profile?.access_used || 0) > 0 ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <p className="text-sm text-gray-300 font-satoshi">
                    You've used {profile?.access_used || 0} actions this month
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <p className="text-sm text-gray-400 font-satoshi">
                    No actions used yet. Start exploring!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-satoshi">
              Account Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your subscription and usage details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm text-gray-400 font-satoshi">Plan</span>
                <span className="font-medium text-white capitalize font-satoshi">
                  {profile?.subscription_tier || "Free"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm text-gray-400 font-satoshi">
                  Actions
                </span>
                <span className="font-medium text-white font-satoshi">
                  {profile?.access_used || 0} / {profile?.access_limit || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMain;
