import { useActions } from "@/hooks/useActions";
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Eye, Download, Zap } from "lucide-react";

export const ActionUsage = () => {
  const { getRemainingActions } = useActions();
  const { accessUsed, accessLimit, subscriptionTier } = useSubscription();

  const getActionUsagePercentage = () => {
    if (subscriptionTier === "premium" || subscriptionTier === "pro") {
      return 0; // Unlimited usage
    }
    return accessLimit > 0 ? (accessUsed / accessLimit) * 100 : 0;
  };

  const usagePercentage = getActionUsagePercentage();
  const remainingActions = getRemainingActions();

  const getUsageColor = () => {
    if (usagePercentage >= 90) return "text-red-500";
    if (usagePercentage >= 70) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return "bg-red-500";
    if (usagePercentage >= 70) return "bg-yellow-500";
    return "bg-primary";
  };

  const displayLimit =
    subscriptionTier === "premium" || subscriptionTier === "pro"
      ? "∞"
      : accessLimit;

  return (
    <Card className="bg-white/5 border border-white/10 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white font-satoshi">
          <Activity className="h-5 w-5 text-primary" />
          Action Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Usage Overview */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm font-satoshi">
              {accessUsed} of {displayLimit} actions used
            </span>
            <Badge
              variant="secondary"
              className={`${getUsageColor()} bg-white/10 border-white/20 font-satoshi text-xs`}
            >
              {remainingActions === Infinity ? "∞" : remainingActions} remaining
            </Badge>
          </div>
          {subscriptionTier !== "premium" && subscriptionTier !== "pro" && (
            <Progress value={usagePercentage} className="h-2 bg-white/10" />
          )}
        </div>

        {/* Action Types */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-white font-satoshi">
            Actions consume:
          </h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Eye className="h-4 w-4 text-blue-400" />
              <span className="font-satoshi">Contact reveals</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="font-satoshi">AI tool usage</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Download className="h-4 w-4 text-green-400" />
              <span className="font-satoshi">Data exports</span>
            </div>
          </div>
        </div>

        {/* Warning if close to limit */}
        {usagePercentage >= 80 &&
          subscriptionTier !== "premium" &&
          subscriptionTier !== "pro" && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs font-satoshi">
                {usagePercentage >= 100
                  ? "You've reached your action limit. Upgrade to continue using premium features."
                  : "You're running low on actions. Consider upgrading your plan."}
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
};
