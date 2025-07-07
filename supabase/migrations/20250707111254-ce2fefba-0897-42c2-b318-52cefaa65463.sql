
-- Create investors table to store investor information
CREATE TABLE public.investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  bio TEXT,
  tags TEXT[] DEFAULT '{}',
  country TEXT,
  investment_type TEXT CHECK (investment_type IN ('VC', 'Angel', 'Family Office', 'Corporate')),
  investment_stage TEXT CHECK (investment_stage IN ('Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user profiles table to extend auth.users with subscription data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  access_limit INTEGER DEFAULT 0,
  access_used INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  access_reset_date TIMESTAMPTZ DEFAULT (date_trunc('month', now()) + interval '1 month'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create saved investors table for bookmarking
CREATE TABLE public.saved_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES public.investors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, investor_id)
);

-- Enable Row Level Security
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_investors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investors (all authenticated users can view)
CREATE POLICY "authenticated_users_can_view_investors" ON public.investors
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for profiles (users can only view/update their own profile)
CREATE POLICY "users_can_view_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for saved investors
CREATE POLICY "users_can_view_own_saved_investors" ON public.saved_investors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_saved_investors" ON public.saved_investors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_saved_investors" ON public.saved_investors
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user registration
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
    100, -- Free tier gets 100 views per month
    0
  );
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to reset monthly access
CREATE OR REPLACE FUNCTION public.reset_monthly_access()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    access_used = 0,
    access_reset_date = date_trunc('month', now()) + interval '1 month'
  WHERE access_reset_date <= now();
END;
$$;

-- Insert sample investor data
INSERT INTO public.investors (name, email, bio, tags, country, investment_type, investment_stage) VALUES
('Sarah Chen', 'sarah@alphavc.com', 'Partner at Alpha VC focusing on early-stage fintech and SaaS startups.', ARRAY['FinTech', 'SaaS', 'Early Stage'], 'United States', 'VC', 'Seed'),
('Marcus Rodriguez', 'marcus@seedfund.io', 'Angel investor and former founder with expertise in B2B marketplaces.', ARRAY['B2B', 'Marketplace', 'E-commerce'], 'Spain', 'Angel', 'Pre-Seed'),
('Dr. Aisha Patel', 'aisha@healthtech.vc', 'Managing Director specializing in healthcare and biotech investments.', ARRAY['HealthTech', 'BioTech', 'AI'], 'United Kingdom', 'VC', 'Series A'),
('James Liu', 'james@crescentcapital.com', 'Growth equity investor focused on scaling tech companies.', ARRAY['Growth', 'Enterprise', 'AI'], 'Singapore', 'VC', 'Series B'),
('Emma Thompson', 'emma@angelgroup.net', 'Serial entrepreneur turned angel investor, active in climate tech.', ARRAY['ClimaTech', 'Sustainability', 'Energy'], 'Canada', 'Angel', 'Seed'),
('Raj Gupta', 'raj@techfund.in', 'Principal at Tech Fund India, investing in consumer and fintech.', ARRAY['FinTech', 'Consumer', 'Mobile'], 'India', 'VC', 'Series A'),
('Sophie Wagner', 'sophie@europeangrowth.eu', 'Family office investor with focus on European startups.', ARRAY['Consumer', 'Fashion', 'Retail'], 'Germany', 'Family Office', 'Growth'),
('Alex Kim', 'alex@nextgen.vc', 'Crypto and web3 focused investor at NextGen Ventures.', ARRAY['Crypto', 'Web3', 'DeFi'], 'South Korea', 'VC', 'Seed'),
('Maria Santos', 'maria@impactcapital.com', 'Impact investor focusing on social and environmental solutions.', ARRAY['Impact', 'Education', 'Social'], 'Brazil', 'VC', 'Series A'),
('David Wilson', 'david@corporate.ventures', 'Corporate venture capital arm investing in strategic partnerships.', ARRAY['Enterprise', 'B2B', 'Integration'], 'United States', 'Corporate', 'Series B');
