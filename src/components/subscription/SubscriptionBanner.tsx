
import { Button } from "@/components/ui/button";
import { Crown, Zap } from 'lucide-react';

interface SubscriptionBannerProps {
  accessUsed: number;
  accessLimit: number;
  subscriptionTier?: string;
}

const SubscriptionBanner = ({ accessUsed, accessLimit, subscriptionTier }: SubscriptionBannerProps) => {
  const isNearLimit = accessUsed >= accessLimit * 0.8;
  const isAtLimit = accessUsed >= accessLimit;

  if (subscriptionTier === 'pro') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-5 w-5 text-yellow-400" />
            <div>
              <h3 className="text-white font-semibold">Pro Member</h3>
              <p className="text-gray-200 text-sm">Unlimited access to all investors</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 mb-6 ${
      isAtLimit 
        ? 'bg-red-900 border border-red-700' 
        : isNearLimit 
          ? 'bg-yellow-900 border border-yellow-700'
          : 'bg-gray-900 border border-gray-700'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">
            {isAtLimit ? 'Access Limit Reached' : 'Free Tier'}
          </h3>
          <p className="text-gray-300 text-sm">
            {accessUsed} / {accessLimit} investor views used this month
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
      </div>
      
      {isAtLimit && (
        <div className="mt-3 p-3 bg-red-800 rounded text-sm text-red-100">
          You've reached your monthly limit. Upgrade to Pro for unlimited access!
        </div>
      )}
    </div>
  );
};

export default SubscriptionBanner;
