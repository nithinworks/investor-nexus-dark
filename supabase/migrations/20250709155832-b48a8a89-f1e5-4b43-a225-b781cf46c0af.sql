-- Create tables for AI-generated content tracking
CREATE TABLE public.pitch_decks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  problem TEXT,
  solution TEXT,
  target_market TEXT,
  business_model TEXT,
  funding_amount TEXT,
  use_of_funds TEXT,
  generated_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.investor_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  investor_name TEXT,
  company_name TEXT NOT NULL,
  pitch_summary TEXT,
  funding_amount TEXT,
  use_of_funds TEXT,
  contact_info TEXT,
  generated_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pitch_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own pitch decks" 
ON public.pitch_decks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pitch decks" 
ON public.pitch_decks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitch decks" 
ON public.pitch_decks 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pitch decks" 
ON public.pitch_decks 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own investor emails" 
ON public.investor_emails 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investor emails" 
ON public.investor_emails 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investor emails" 
ON public.investor_emails 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investor emails" 
ON public.investor_emails 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_pitch_decks_updated_at
BEFORE UPDATE ON public.pitch_decks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investor_emails_updated_at
BEFORE UPDATE ON public.investor_emails
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();