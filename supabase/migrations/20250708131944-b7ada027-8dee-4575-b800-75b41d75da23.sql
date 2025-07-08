-- Update profiles table to support new subscription tiers and pricing
ALTER TABLE public.profiles 
ALTER COLUMN subscription_tier SET DEFAULT 'basic';

-- Update existing free users to basic tier
UPDATE public.profiles 
SET subscription_tier = 'basic' 
WHERE subscription_tier = 'free' OR subscription_tier IS NULL;

-- Update access limits for different tiers
UPDATE public.profiles 
SET access_limit = CASE 
    WHEN subscription_tier = 'basic' THEN 20
    WHEN subscription_tier = 'pro' THEN 100
    WHEN subscription_tier = 'enterprise' THEN 500
    ELSE 20
END;

-- Add billing_cycle column to track monthly/yearly subscriptions
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS billing_cycle TEXT DEFAULT 'monthly';

-- Add subscription_price column to track the price paid
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_price INTEGER DEFAULT 0; -- in cents

-- Create index for better performance on subscription queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON public.profiles(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_profiles_billing_cycle ON public.profiles(billing_cycle);