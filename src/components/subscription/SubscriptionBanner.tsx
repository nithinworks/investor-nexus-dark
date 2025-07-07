
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
      <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl p-5 mb-6 border border-red-500/20 shadow-lg shadow-red-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/20 p-2.5 rounded-xl backdrop-blur-sm border border-red-500/30">
              <Crown className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base font-satoshi">Pro Member</h3>
              <p className="text-gray-300 text-sm font-satoshi">
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
      className={`backdrop-blur-xl rounded-2xl p-5 mb-6 border shadow-lg transition-all duration-300 ${
        isAtLimit
          ? "bg-red-500/10 border-red-500/20 shadow-red-500/10"
          : isNearLimit
          ? "bg-yellow-500/10 border-yellow-500/20 shadow-yellow-500/10"
          : "bg-white/5 border-white/10 shadow-black/20"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-base text-white font-satoshi mb-1">
            {isAtLimit ? "Access Limit Reached" : "Free Tier Usage"}
          </h3>
          <p
            className={`text-sm font-satoshi ${
              isAtLimit
                ? "text-red-300"
                : isNearLimit
                ? "text-yellow-300"
                : "text-gray-300"
            }`}
          >
            You have used <span className="font-medium">{accessUsed}</span> of <span className="font-medium">{accessLimit}</span> contact reveals this month.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold font-satoshi px-6 py-2.5 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-200 border border-red-400/30 backdrop-blur-sm">
          <Zap className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
      </div>

      <Progress
        value={progressPercentage}
        className={`w-full h-2 rounded-full overflow-hidden ${
          isAtLimit
            ? "bg-red-900/30"
            : isNearLimit
            ? "bg-yellow-900/30"
            : "bg-gray-700/30"
        }`}
        indicatorClassName={`transition-all duration-500 ${
          isAtLimit
            ? "bg-gradient-to-r from-red-500 to-red-600"
            : isNearLimit
            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
            : "bg-gradient-to-r from-red-500 to-pink-500"
        }`}
      />
    </div>
  );
};

export default SubscriptionBanner;
