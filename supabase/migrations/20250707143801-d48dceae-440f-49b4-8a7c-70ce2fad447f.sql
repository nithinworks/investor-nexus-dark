-- Remove check_sizes column from investors table
ALTER TABLE public.investors 
DROP COLUMN check_sizes;

-- Add verified field for profile verification badges
ALTER TABLE public.investors 
ADD COLUMN verified BOOLEAN DEFAULT false;

-- Update some sample investors to be verified
UPDATE public.investors 
SET verified = true 
WHERE name IN ('Sarah Chen', 'Marcus Rodriguez', 'David Kim');