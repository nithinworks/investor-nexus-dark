-- Remove the existing restrictive check constraint
ALTER TABLE public.investors DROP CONSTRAINT IF EXISTS investors_investment_type_check;

-- Create a new more inclusive check constraint that supports all funding types
ALTER TABLE public.investors ADD CONSTRAINT investors_funding_type_check 
CHECK (funding_type IS NULL OR funding_type IN (
  'Angel',
  'Venture Capital', 
  'Private Equity',
  'Corporate Venture',
  'Government Grant',
  'Crowdfunding',
  'Debt Financing',
  'Revenue-Based Financing',
  'Convertible Note',
  'SAFE',
  'Family Office',
  'Accelerator',
  'Incubator',
  'Strategic Investment',
  'Impact Investment',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D+',
  'Growth',
  'Late Stage',
  'Pre-IPO',
  'Other'
));