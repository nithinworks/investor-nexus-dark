-- Update the default access limit for new users to 5 (free plan)
-- and update the handle_new_user function to give 5 credits to new signups
UPDATE public.profiles 
SET access_limit = 5 
WHERE subscription_tier = 'basic' AND access_limit = 20;

-- Update the handle_new_user function to set access limit to 5 for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, access_limit, access_used)
  VALUES (
    NEW.id,
    NEW.email,
    5, -- Free tier gets 5 contact reveals per month
    0
  );
  RETURN NEW;
END;
$$;