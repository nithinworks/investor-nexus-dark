import { Button } from "@/components/ui/button";
import { Crown, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SubscriptionBannerProps {
  accessUsed: number;
  accessLimit: number;
  subscriptionTier?: string;
}

const SubscriptionBanner = ({
  accessUsed,
  accessLimit,
  subscriptionTier,
}: SubscriptionBannerProps) => {
  const isNearLimit = accessUsed >= accessLimit * 0.8;
  const isAtLimit = accessUsed >= accessLimit;
  const progressPercentage = (accessUsed / accessLimit) * 100;

  if (subscriptionTier === "pro") {
    return (
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 mb-8 border border-pink-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-pink-500/20 p-3 rounded-full">
              <Crown className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Pro Member</h3>
              <p className="text-gray-300 text-sm">
                You have unlimited access to all features.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-6 mb-8 border ${
        isAtLimit
          ? "bg-red-500/10 border-red-500/20"
          : isNearLimit
          ? "bg-yellow-500/10 border-yellow-500/20"
          : "bg-black/30 border-gray-800/80"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-white">
            {isAtLimit ? "Access Limit Reached" : "Free Tier Usage"}
          </h3>
          <p
            className={`text-sm ${
              isAtLimit
                ? "text-red-300"
                : isNearLimit
                ? "text-yellow-300"
                : "text-gray-300"
            }`}
          >
            You have used {accessUsed} of {accessLimit} contact reveals this
            month.
          </p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold">
          <Zap className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
      </div>

      <Progress
        value={progressPercentage}
        className={`w-full h-2 mt-4 ${
          isAtLimit
            ? "bg-red-900"
            : isNearLimit
            ? "bg-yellow-900"
            : "bg-gray-700"
        }`}
        indicatorClassName={
          isAtLimit
            ? "bg-red-500"
            : isNearLimit
            ? "bg-yellow-500"
            : "bg-pink-500"
        }
      />
    </div>
  );
};

export default SubscriptionBanner;
