-- Convert funding_stage and location columns to arrays in investors table
-- First, add temporary columns
ALTER TABLE public.investors 
  ADD COLUMN funding_stage_temp text[],
  ADD COLUMN location_temp text[];

-- Copy data to temporary columns, converting single values to arrays
UPDATE public.investors 
SET 
  funding_stage_temp = CASE 
    WHEN funding_stage IS NOT NULL AND funding_stage != '' THEN ARRAY[funding_stage]
    ELSE '{}'::text[]
  END,
  location_temp = CASE 
    WHEN location IS NOT NULL AND location != '' THEN ARRAY[location]
    ELSE '{}'::text[]
  END;

-- Drop old columns
ALTER TABLE public.investors 
  DROP COLUMN funding_stage,
  DROP COLUMN location;

-- Rename temporary columns
ALTER TABLE public.investors 
  RENAME COLUMN funding_stage_temp TO funding_stage;
ALTER TABLE public.investors 
  RENAME COLUMN location_temp TO location;

-- Set defaults for new array columns
ALTER TABLE public.investors 
  ALTER COLUMN funding_stage SET DEFAULT '{}',
  ALTER COLUMN location SET DEFAULT '{}';

-- Do the same for investor_submissions table
ALTER TABLE public.investor_submissions 
  ADD COLUMN funding_stage_temp text[],
  ADD COLUMN location_temp text[];

UPDATE public.investor_submissions 
SET 
  funding_stage_temp = CASE 
    WHEN funding_stage IS NOT NULL AND funding_stage != '' THEN ARRAY[funding_stage]
    ELSE '{}'::text[]
  END,
  location_temp = CASE 
    WHEN location IS NOT NULL AND location != '' THEN ARRAY[location]
    ELSE '{}'::text[]
  END;

ALTER TABLE public.investor_submissions 
  DROP COLUMN funding_stage,
  DROP COLUMN location;

ALTER TABLE public.investor_submissions 
  RENAME COLUMN funding_stage_temp TO funding_stage;
ALTER TABLE public.investor_submissions 
  RENAME COLUMN location_temp TO location;

ALTER TABLE public.investor_submissions 
  ALTER COLUMN funding_stage SET DEFAULT '{}',
  ALTER COLUMN location SET DEFAULT '{}';