-- Update profiles table to support action-based system
ALTER TABLE public.profiles 
ALTER COLUMN access_limit SET DEFAULT 10,  -- Free plan gets 10 actions
ALTER COLUMN subscription_tier SET DEFAULT 'free';  -- Default to free plan

-- Update handle_new_user function to assign free plan with 10 actions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, access_limit, access_used, subscription_tier)
  VALUES (
    NEW.id,
    NEW.email,
    10, -- Free tier gets 10 actions per month
    0,
    'free' -- Default to free plan
  );
  RETURN NEW;
END;
$$;