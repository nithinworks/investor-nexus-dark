-- Update investors table with new fields
ALTER TABLE public.investors 
DROP COLUMN IF EXISTS email,
ADD COLUMN company TEXT,
ADD COLUMN funding_description TEXT,
ADD COLUMN check_sizes TEXT,
ADD COLUMN company_url TEXT,
ADD COLUMN contact TEXT NOT NULL DEFAULT '';

-- Rename existing columns to match new schema
ALTER TABLE public.investors 
RENAME COLUMN investment_type TO funding_type;
ALTER TABLE public.investors 
RENAME COLUMN investment_stage TO funding_stage;
ALTER TABLE public.investors 
RENAME COLUMN country TO location;
ALTER TABLE public.investors 
RENAME COLUMN tags TO funding_industries;

-- Update profiles table to change access limit from 100 to 10 for free users
UPDATE public.profiles 
SET access_limit = 10 
WHERE subscription_tier = 'free' AND access_limit = 100;

-- Update the handle_new_user function to set access limit to 10
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
    10, -- Free tier gets 10 contact reveals per month
    0
  );
  RETURN NEW;
END;
$$;

-- Create contact reveals tracking table
CREATE TABLE public.contact_reveals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES public.investors(id) ON DELETE CASCADE,
  revealed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, investor_id)
);

-- Enable RLS on contact reveals
ALTER TABLE public.contact_reveals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact reveals
CREATE POLICY "users_can_view_own_contact_reveals" ON public.contact_reveals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_contact_reveals" ON public.contact_reveals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for faster retrieval
CREATE INDEX idx_contact_reveals_user_id ON public.contact_reveals(user_id);
CREATE INDEX idx_contact_reveals_investor_id ON public.contact_reveals(investor_id);
CREATE INDEX idx_investors_funding_type ON public.investors(funding_type);
CREATE INDEX idx_investors_funding_stage ON public.investors(funding_stage);
CREATE INDEX idx_investors_location ON public.investors(location);
CREATE INDEX idx_investors_funding_industries ON public.investors USING GIN(funding_industries);

-- Update sample data to match new schema
UPDATE public.investors SET 
  company = CASE 
    WHEN name = 'Sarah Chen' THEN 'Alpha VC'
    WHEN name = 'Marcus Rodriguez' THEN 'Seed Fund'
    WHEN name = 'Dr. Aisha Patel' THEN 'HealthTech VC'
    WHEN name = 'James Liu' THEN 'Crescent Capital'
    WHEN name = 'Emma Thompson' THEN 'Angel Group'
    WHEN name = 'Raj Gupta' THEN 'Tech Fund India'
    WHEN name = 'Sophie Wagner' THEN 'European Growth'
    WHEN name = 'Alex Kim' THEN 'NextGen Ventures'
    WHEN name = 'Maria Santos' THEN 'Impact Capital'
    WHEN name = 'David Wilson' THEN 'Corporate Ventures'
    ELSE 'Investment Firm'
  END,
  contact = CASE 
    WHEN name = 'Sarah Chen' THEN 'sarah@alphavc.com'
    WHEN name = 'Marcus Rodriguez' THEN 'marcus@seedfund.io'
    WHEN name = 'Dr. Aisha Patel' THEN 'aisha@healthtech.vc'
    WHEN name = 'James Liu' THEN 'james@crescentcapital.com'
    WHEN name = 'Emma Thompson' THEN 'emma@angelgroup.net'
    WHEN name = 'Raj Gupta' THEN 'raj@techfund.in'
    WHEN name = 'Sophie Wagner' THEN 'sophie@europeangrowth.eu'
    WHEN name = 'Alex Kim' THEN 'alex@nextgen.vc'
    WHEN name = 'Maria Santos' THEN 'maria@impactcapital.com'
    WHEN name = 'David Wilson' THEN 'david@corporate.ventures'
    ELSE 'contact@example.com'
  END,
  funding_description = CASE 
    WHEN name = 'Sarah Chen' THEN 'Partner at Alpha VC focusing on early-stage fintech and SaaS startups with strong product-market fit.'
    WHEN name = 'Marcus Rodriguez' THEN 'Angel investor and former founder with expertise in B2B marketplaces and e-commerce platforms.'
    WHEN name = 'Dr. Aisha Patel' THEN 'Managing Director specializing in healthcare and biotech investments with deep medical expertise.'
    WHEN name = 'James Liu' THEN 'Growth equity investor focused on scaling tech companies across Asia-Pacific markets.'
    WHEN name = 'Emma Thompson' THEN 'Serial entrepreneur turned angel investor, active in climate tech and sustainability solutions.'
    WHEN name = 'Raj Gupta' THEN 'Principal at Tech Fund India, investing in consumer and fintech with focus on emerging markets.'
    WHEN name = 'Sophie Wagner' THEN 'Family office investor with focus on European startups and consumer brands.'
    WHEN name = 'Alex Kim' THEN 'Crypto and web3 focused investor at NextGen Ventures with technical background.'
    WHEN name = 'Maria Santos' THEN 'Impact investor focusing on social and environmental solutions in Latin America.'
    WHEN name = 'David Wilson' THEN 'Corporate venture capital arm investing in strategic partnerships and acquisitions.'
    ELSE 'Experienced investor with diverse portfolio'
  END,
  check_sizes = CASE 
    WHEN funding_stage = 'Pre-Seed' THEN '$50K - $250K'
    WHEN funding_stage = 'Seed' THEN '$250K - $2M'
    WHEN funding_stage = 'Series A' THEN '$2M - $15M'
    WHEN funding_stage = 'Series B' THEN '$10M - $50M'
    WHEN funding_stage = 'Series C+' THEN '$25M+'
    WHEN funding_stage = 'Growth' THEN '$50M+'
    ELSE '$100K - $5M'
  END,
  company_url = CASE 
    WHEN name = 'Sarah Chen' THEN 'https://alphavc.com'
    WHEN name = 'Marcus Rodriguez' THEN 'https://seedfund.io'
    WHEN name = 'Dr. Aisha Patel' THEN 'https://healthtech.vc'
    WHEN name = 'James Liu' THEN 'https://crescentcapital.com'
    WHEN name = 'Emma Thompson' THEN 'https://angelgroup.net'
    WHEN name = 'Raj Gupta' THEN 'https://techfund.in'
    WHEN name = 'Sophie Wagner' THEN 'https://europeangrowth.eu'
    WHEN name = 'Alex Kim' THEN 'https://nextgen.vc'
    WHEN name = 'Maria Santos' THEN 'https://impactcapital.com'
    WHEN name = 'David Wilson' THEN 'https://corporate.ventures'
    ELSE 'https://example.com'
  END;