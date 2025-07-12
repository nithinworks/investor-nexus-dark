-- Fix subscription tier naming inconsistencies
-- Update the default subscription tier to 'free' instead of 'basic'
ALTER TABLE public.profiles 
ALTER COLUMN subscription_tier SET DEFAULT 'free';

-- Update any existing 'basic' tier users to 'free' to maintain consistency
UPDATE public.profiles 
SET subscription_tier = 'free' 
WHERE subscription_tier = 'basic';

-- Update access limits for the correct tier names
UPDATE public.profiles 
SET access_limit = CASE 
    WHEN subscription_tier = 'free' THEN 10
    WHEN subscription_tier = 'starter' THEN 100
    WHEN subscription_tier = 'premium' THEN 500
    ELSE 10
END;

-- Ensure all users have proper access_used value (default to 0 if null)
UPDATE public.profiles 
SET access_used = 0 
WHERE access_used IS NULL;

-- Add constraint to ensure valid subscription tiers
ALTER TABLE public.profiles 
ADD CONSTRAINT check_valid_subscription_tier 
CHECK (subscription_tier IN ('free', 'starter', 'premium'));
