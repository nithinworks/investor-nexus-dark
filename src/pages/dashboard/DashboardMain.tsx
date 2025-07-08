import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Bookmark, Eye } from "lucide-react";

const DashboardMain = () => {
  const { user } = useAuth();

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
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Saved Investors",
      value: savedCount.toString(),
      description: "In your saved lists",
      icon: Bookmark,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Contacts Revealed",
      value: revealedCount.toString(),
      description: "This month",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Usage",
      value: `${profile?.access_used || 0}/${profile?.access_limit || 0}`,
      description: "Monthly limit",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your investor connections today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with investors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {revealedCount > 0 ? (
                <p>You've revealed {revealedCount} investor contacts this month.</p>
              ) : (
                <p>No recent activity. Start exploring investors!</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Account Status</CardTitle>
            <CardDescription>Your subscription and usage details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium text-card-foreground capitalize">
                  {profile?.subscription_tier || "Free"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Usage:</span>
                <span className="font-medium text-card-foreground">
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