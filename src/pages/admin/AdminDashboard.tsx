import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Database, UserCheck, CreditCard, TrendingUp, Activity } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalInvestors: number;
  pendingApplications: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeSubscriptions: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInvestors: 0,
    pendingApplications: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch total investors
      const { count: investorsCount } = await supabase
        .from('investors')
        .select('*', { count: 'exact', head: true });

      // Fetch pending applications
      const { count: applicationsCount } = await supabase
        .from('investor_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch subscription data
      const { data: profiles } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_price, access_used, access_limit');

      let totalRevenue = 0;
      let activeSubscriptions = 0;
      
      if (profiles) {
        profiles.forEach(profile => {
          if (profile.subscription_tier && profile.subscription_tier !== 'basic') {
            activeSubscriptions++;
            totalRevenue += profile.subscription_price || 0;
          }
        });
      }

      // Calculate mock monthly growth (in real app, this would be based on historical data)
      const monthlyGrowth = Math.floor(Math.random() * 20) + 5; // Mock 5-25% growth

      setStats({
        totalUsers: usersCount || 0,
        totalInvestors: investorsCount || 0,
        pendingApplications: applicationsCount || 0,
        totalRevenue: totalRevenue / 100, // Convert from cents to dollars
        monthlyGrowth,
        activeSubscriptions,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      description: 'Registered users',
      icon: Users,
      color: 'bg-blue-600',
    },
    {
      title: 'Total Investors',
      value: stats.totalInvestors,
      description: 'Verified investors',
      icon: Database,
      color: 'bg-green-600',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      description: 'Awaiting review',
      icon: UserCheck,
      color: 'bg-yellow-600',
    },
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions,
      description: 'Paying customers',
      icon: Activity,
      color: 'bg-purple-600',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      description: 'Monthly recurring',
      icon: CreditCard,
      color: 'bg-red-600',
    },
    {
      title: 'Monthly Growth',
      value: `${stats.monthlyGrowth}%`,
      description: 'User growth rate',
      icon: TrendingUp,
      color: 'bg-indigo-600',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-white/10 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Overview of your platform's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">
                {card.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded ${card.color} flex items-center justify-center`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <p className="text-xs text-white/60 mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-white/60">
              Latest platform activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">New investor application submitted</p>
                  <p className="text-xs text-white/60">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">User upgraded to premium</p>
                  <p className="text-xs text-white/60">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Investor contact revealed</p>
                  <p className="text-xs text-white/60">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-white/60">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <UserCheck className="h-6 w-6 text-white mb-2" />
                <p className="text-sm text-white font-medium">Review Applications</p>
              </button>
              <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Database className="h-6 w-6 text-white mb-2" />
                <p className="text-sm text-white font-medium">Add Investor</p>
              </button>
              <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Users className="h-6 w-6 text-white mb-2" />
                <p className="text-sm text-white font-medium">View Users</p>
              </button>
              <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <CreditCard className="h-6 w-6 text-white mb-2" />
                <p className="text-sm text-white font-medium">Payment Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;