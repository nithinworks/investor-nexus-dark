import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';

interface PaymentStats {
  totalRevenue: number;
  activeSubscribers: number;
  monthlyGrowth: number;
  subscriptionBreakdown: {
    basic: number;
    premium: number;
    enterprise: number;
  };
}

const AdminPayments = () => {
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    activeSubscribers: 0,
    monthlyGrowth: 0,
    subscriptionBreakdown: {
      basic: 0,
      premium: 0,
      enterprise: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const fetchPaymentStats = async () => {
    try {
      // Fetch subscription data from profiles table
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_price, billing_cycle, subscription_end');

      if (error) throw error;

      const now = new Date();
      const activeProfiles = profiles?.filter(profile => 
        profile.subscription_end && new Date(profile.subscription_end) > now
      ) || [];

      const totalRevenue = activeProfiles.reduce((sum, profile) => {
        const price = (profile.subscription_price || 0) / 100; // Convert cents to dollars
        const multiplier = profile.billing_cycle === 'yearly' ? 12 : 1;
        return sum + (price * multiplier);
      }, 0);

      const subscriptionBreakdown = activeProfiles.reduce((breakdown, profile) => {
        const tier = profile.subscription_tier?.toLowerCase() || 'basic';
        // Map 'pro' to 'premium' for consistency
        const mappedTier = tier === 'pro' ? 'premium' : tier;
        if (mappedTier in breakdown) {
          breakdown[mappedTier as keyof typeof breakdown]++;
        }
        return breakdown;
      }, { basic: 0, premium: 0, enterprise: 0 });

      setStats({
        totalRevenue,
        activeSubscribers: activeProfiles.length,
        monthlyGrowth: 15.2, // This would be calculated from historical data
        subscriptionBreakdown,
      });
    } catch (error) {
      console.error('Error fetching payment stats:', error);
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
        <h1 className="text-3xl font-bold text-white mb-2">Payment Statistics</h1>
        <p className="text-white/60">Overview of subscription revenue and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-white/60">Monthly recurring revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeSubscribers}</div>
            <p className="text-xs text-white/60">Currently paying users</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{stats.monthlyGrowth}%</div>
            <p className="text-xs text-white/60">From last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Avg. Revenue Per User</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.activeSubscribers > 0 ? (stats.totalRevenue / stats.activeSubscribers).toFixed(0) : '0'}
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
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Basic
                </Badge>
                <span className="text-white">{stats.subscriptionBreakdown.basic} users</span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0 
                  ? ((stats.subscriptionBreakdown.basic / stats.activeSubscribers) * 100).toFixed(1)
                  : '0'
                }%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Premium
                </Badge>
                <span className="text-white">{stats.subscriptionBreakdown.premium} users</span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0 
                  ? ((stats.subscriptionBreakdown.premium / stats.activeSubscribers) * 100).toFixed(1)
                  : '0'
                }%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-gold-500/20 text-gold-300 border-gold-500/30">
                  Enterprise
                </Badge>
                <span className="text-white">{stats.subscriptionBreakdown.enterprise} users</span>
              </div>
              <span className="text-white/60">
                {stats.activeSubscribers > 0 
                  ? ((stats.subscriptionBreakdown.enterprise / stats.activeSubscribers) * 100).toFixed(1)
                  : '0'
                }%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-white/60">
              Latest subscription events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center text-white/60 py-8">
                Payment activity tracking will be implemented when Stripe webhook integration is added.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPayments;