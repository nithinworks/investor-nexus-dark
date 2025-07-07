-- Add back check_sizes column since it's in the requirements
ALTER TABLE public.investors 
ADD COLUMN check_sizes TEXT;