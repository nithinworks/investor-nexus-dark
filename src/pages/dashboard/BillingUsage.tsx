import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Zap
} from "lucide-react";

const BillingUsage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    subscriptionTier, 
    accessLimit, 
    accessUsed, 
    billingCycle, 
    subscriptionEnd,
    openCustomerPortal,
    refreshSubscription 
  } = useSubscription();

  // Fetch user profile for additional data if needed
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("subscription_price")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded"></div>
        <div className="h-64 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  const usagePercentage = accessLimit 
    ? Math.round((accessUsed / accessLimit) * 100)
    : 0;

  const isNearLimit = usagePercentage >= 80;
  const hasExceededLimit = usagePercentage >= 100;

  const resetDate = subscriptionEnd 
    ? new Date(subscriptionEnd).toLocaleDateString()
    : "N/A";

  const getMonthlyPrice = () => {
    if (!profile?.subscription_price) return 0;
    return billingCycle === 'yearly' 
      ? Math.round(profile.subscription_price / 12) 
      : profile.subscription_price;
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-satoshi">
          Billing & Usage
        </h1>
        <p className="text-gray-400 font-satoshi text-sm md:text-base">
          Monitor your subscription and usage details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-satoshi">
                <CreditCard className="h-5 w-5 text-red-400" />
                Current Plan
              </CardTitle>
              <CardDescription className="text-gray-400 font-satoshi">
                Your subscription details and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white capitalize font-satoshi">
                      {subscriptionTier} Plan
                    </h3>
                    <p className="text-gray-300 font-satoshi">
                      {subscriptionTier === "basic" 
                        ? "Basic access to investor contacts"
                        : subscriptionTier === "pro"
                        ? "Enhanced features with export capabilities"
                        : "Full access to all enterprise features"
                      }
                    </p>
                    {profile?.subscription_price > 0 && (
                      <p className="text-sm text-gray-400 mt-1 font-satoshi">
                        ${(getMonthlyPrice() / 100).toFixed(2)}/month ({billingCycle} billing)
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`capitalize font-satoshi ${
                        subscriptionTier === "basic" 
                          ? "bg-white/10 text-gray-300 border-white/20" 
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {subscriptionTier}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/dashboard/pricing')}
                      className="border-white/20 text-white hover:bg-white/10 font-satoshi"
                    >
                      Manage Plans
                    </Button>
                  </div>
                </div>

                {subscriptionTier === "basic" && (
                  <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-red-400" />
                      <div>
                        <h4 className="font-medium text-white font-satoshi">Upgrade to Pro</h4>
                        <p className="text-sm text-gray-300 font-satoshi">
                          Get unlimited access to investor contacts and advanced features
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="mt-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-satoshi"
                      onClick={() => navigate('/dashboard/pricing')}
                    >
                      View Plans
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-satoshi">
                <TrendingUp className="h-5 w-5 text-red-400" />
                Usage Statistics
              </CardTitle>
              <CardDescription className="text-gray-400 font-satoshi">
                Your monthly usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-red-400" />
                      <span className="text-sm font-medium text-white font-satoshi">
                        Contact Reveals
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 font-satoshi">
                      {accessUsed} / {accessLimit}
                    </span>
                  </div>
                  <Progress 
                    value={usagePercentage} 
                    className="h-2"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    {hasExceededLimit ? (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    ) : isNearLimit ? (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-xs text-gray-400 font-satoshi">
                      {hasExceededLimit 
                        ? "Limit reached - upgrade to continue"
                        : isNearLimit 
                          ? "Approaching your monthly limit"
                          : "Good usage - plenty of reveals left"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white font-satoshi">Quick Stats</CardTitle>
              <CardDescription className="text-gray-400 font-satoshi">At a glance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-satoshi">Reveals Used</span>
                <span className="font-medium text-white font-satoshi">
                  {accessUsed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-satoshi">Reveals Remaining</span>
                <span className="font-medium text-white font-satoshi">
                  {Math.max(0, accessLimit - accessUsed)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-satoshi">Billing Cycle</span>
                <span className="font-medium text-white font-satoshi capitalize">
                  {billingCycle}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-satoshi">Usage Percentage</span>
                <span className="font-medium text-white font-satoshi">
                  {usagePercentage}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-satoshi">
                <Calendar className="h-4 w-4 text-red-400" />
                Billing Cycle
              </CardTitle>
              <CardDescription className="text-gray-400 font-satoshi">Your subscription timing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 font-satoshi">Next Reset</div>
                <div className="font-medium text-white font-satoshi">{resetDate}</div>
              </div>
              {subscriptionEnd && (
                <div>
                  <div className="text-sm text-gray-400 font-satoshi">Subscription Ends</div>
                  <div className="font-medium text-white font-satoshi">
                    {new Date(subscriptionEnd).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingUsage;