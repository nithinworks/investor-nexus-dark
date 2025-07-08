import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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

  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded"></div>
        <div className="h-64 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  const usagePercentage = profile?.access_limit 
    ? Math.round(((profile.access_used || 0) / profile.access_limit) * 100)
    : 0;

  const isNearLimit = usagePercentage >= 80;
  const hasExceededLimit = usagePercentage >= 100;

  const resetDate = profile?.access_reset_date 
    ? new Date(profile.access_reset_date).toLocaleDateString()
    : "N/A";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Billing & Usage
        </h1>
        <p className="text-muted-foreground">
          Monitor your subscription and usage details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Your subscription details and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground capitalize">
                      {profile?.subscription_tier || "Free"} Plan
                    </h3>
                    <p className="text-muted-foreground">
                      {profile?.subscription_tier === "free" 
                        ? "Limited access to investor contacts"
                        : "Full access to all features"
                      }
                    </p>
                  </div>
                  <Badge 
                    variant={profile?.subscription_tier === "free" ? "secondary" : "default"}
                    className="capitalize"
                  >
                    {profile?.subscription_tier || "Free"}
                  </Badge>
                </div>

                {profile?.subscription_tier === "free" && (
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-card-foreground">Upgrade to Pro</h4>
                        <p className="text-sm text-muted-foreground">
                          Get unlimited access to investor contacts and advanced features
                        </p>
                      </div>
                    </div>
                    <Button className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Upgrade Now
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <TrendingUp className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
              <CardDescription>
                Your monthly usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-card-foreground">
                        Contact Reveals
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {profile?.access_used || 0} / {profile?.access_limit || 0}
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
                    <span className="text-xs text-muted-foreground">
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
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Stats</CardTitle>
              <CardDescription>At a glance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reveals Used</span>
                <span className="font-medium text-card-foreground">
                  {profile?.access_used || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reveals Remaining</span>
                <span className="font-medium text-card-foreground">
                  {Math.max(0, (profile?.access_limit || 0) - (profile?.access_used || 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Usage Percentage</span>
                <span className="font-medium text-card-foreground">
                  {usagePercentage}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Calendar className="h-4 w-4" />
                Billing Cycle
              </CardTitle>
              <CardDescription>Your subscription timing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Next Reset</div>
                <div className="font-medium text-card-foreground">{resetDate}</div>
              </div>
              {profile?.subscription_end && (
                <div>
                  <div className="text-sm text-muted-foreground">Subscription Ends</div>
                  <div className="font-medium text-card-foreground">
                    {new Date(profile.subscription_end).toLocaleDateString()}
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