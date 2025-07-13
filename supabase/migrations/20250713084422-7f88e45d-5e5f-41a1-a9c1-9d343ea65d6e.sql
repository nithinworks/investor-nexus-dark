-- Convert funding_stage and location columns to arrays in investors table
ALTER TABLE public.investors 
  ALTER COLUMN funding_stage TYPE text[] USING 
    CASE 
      WHEN funding_stage IS NOT NULL THEN ARRAY[funding_stage]
      ELSE NULL 
    END;

ALTER TABLE public.investors 
  ALTER COLUMN location TYPE text[] USING 
    CASE 
      WHEN location IS NOT NULL THEN ARRAY[location]
      ELSE NULL 
    END;

-- Set default values for the array columns
ALTER TABLE public.investors 
  ALTER COLUMN funding_stage SET DEFAULT '{}';

ALTER TABLE public.investors 
  ALTER COLUMN location SET DEFAULT '{}';

-- Also update investor_submissions table to match
ALTER TABLE public.investor_submissions 
  ALTER COLUMN funding_stage TYPE text[] USING 
    CASE 
      WHEN funding_stage IS NOT NULL THEN ARRAY[funding_stage]
      ELSE NULL 
    END;

ALTER TABLE public.investor_submissions 
  ALTER COLUMN location TYPE text[] USING 
    CASE 
      WHEN location IS NOT NULL THEN ARRAY[location]
      ELSE NULL 
    END;

-- Set default values for the array columns in submissions
ALTER TABLE public.investor_submissions 
  ALTER COLUMN funding_stage SET DEFAULT '{}';

ALTER TABLE public.investor_submissions 
  ALTER COLUMN location SET DEFAULT '{}';