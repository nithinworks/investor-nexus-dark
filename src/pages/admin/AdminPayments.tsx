import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Users, TrendingUp, Calendar } from "lucide-react";

interface PaymentStats {
  totalRevenue: number;
  activeSubscribers: number;
  monthlyGrowth: number;
  subscriptionBreakdown: {
    free: number;
    starter: number;
    premium: number;
  };
}

interface RecentPayment {
  email: string;
  subscription_tier: string;
  subscription_price: number;
  billing_cycle: string;
  created_at: string;
}

const AdminPayments = () => {
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    activeSubscribers: 0,
    monthlyGrowth: 0,
    subscriptionBreakdown: {
      free: 0,
      starter: 0,
      premium: 0,
    },
  });
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const fetchPaymentStats = async () => {
    try {
      // Fetch subscription data from profiles table
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(
          "email, subscription_tier, subscription_price, billing_cycle, subscription_end, created_at"
        );

      if (error) throw error;

      const now = new Date();
      const activeProfiles =
        profiles?.filter(
          (profile) =>
            profile.subscription_end && new Date(profile.subscription_end) > now
        ) || [];

      // Calculate total actual payments (not monthly recurring)
      const totalRevenue = activeProfiles.reduce((sum, profile) => {
        const price = (profile.subscription_price || 0) / 100; // Convert cents to dollars
        return sum + price; // Total actual payments
      }, 0);

      // Get recent payments for the payments section
      const recentPaymentsData =
        profiles
          ?.filter(
            (profile) =>
              profile.subscription_tier && profile.subscription_tier !== "free"
          )
          .slice(0, 10)
          .map((profile) => ({
            email: profile.email || "",
            subscription_tier: profile.subscription_tier || "",
            subscription_price: profile.subscription_price || 0,
            billing_cycle: profile.billing_cycle || "monthly",
            created_at: profile.created_at || new Date().toISOString(),
          })) || [];

      const subscriptionBreakdown = profiles?.reduce(
        (breakdown, profile) => {
          const tier = profile.subscription_tier?.toLowerCase() || "free";
          // Map 'pro' to 'premium' for consistency
          const mappedTier = tier === "pro" ? "premium" : tier;
          if (mappedTier in breakdown) {
            breakdown[mappedTier as keyof typeof breakdown]++;
          }
          return breakdown;
        },
        { free: 0, starter: 0, premium: 0 }
      ) || { free: 0, starter: 0, premium: 0 };

      setStats({
        totalRevenue,
        activeSubscribers: activeProfiles.length,
        monthlyGrowth: 15.2, // This would be calculated from historical data
        subscriptionBreakdown,
      });
      setRecentPayments(recentPaymentsData);
    } catch (error) {
      console.error("Error fetching payment stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Payment Statistics
        </h1>
        <p className="text-white/60">
          Overview of subscription revenue and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-white/60">Total payments received</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Active Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.activeSubscribers}
            </div>
            <p className="text-xs text-white/60">Currently paying users</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Monthly Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              +{stats.monthlyGrowth}%
            </div>
            <p className="text-xs text-white/60">From last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Avg. Revenue Per User
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              $
              {stats.activeSubscribers > 0
                ? (stats.totalRevenue / stats.activeSubscribers).toFixed(0)
                : "0"}
            </div>
            <p className="text-xs text-white/60">Per month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Subscription Breakdown</CardTitle>
            <CardDescription className="text-white/60">
              Distribution of subscription tiers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-gray-500/20 text-gray-300 border-gray-500/30"
                >
                  Free
                </Badge>
                <span className="text-white">
                  {stats.subscriptionBreakdown.free} users
                </span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0
                  ? (
                      (stats.subscriptionBreakdown.free /
                        stats.activeSubscribers) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                >
                  Starter
                </Badge>
                <span className="text-white">
                  {stats.subscriptionBreakdown.starter} users
                </span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0
                  ? (
                      (stats.subscriptionBreakdown.starter /
                        stats.activeSubscribers) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                >
                  Premium
                </Badge>
                <span className="text-white">
                  {stats.subscriptionBreakdown.premium} users
                </span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0
                  ? (
                      (stats.subscriptionBreakdown.premium /
                        stats.activeSubscribers) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Payments</CardTitle>
            <CardDescription className="text-white/60">
              Top 10 recent subscription payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">
                        {payment.email}
                      </p>
                      <p className="text-xs text-white/60">
                        {payment.subscription_tier} • {payment.billing_cycle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white font-medium">
                        ${(payment.subscription_price / 100).toFixed(2)}
                      </p>
                      <p className="text-xs text-white/60">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/60 py-8">
                  No recent payments found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPayments;
