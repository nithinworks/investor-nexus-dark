-- Create table for investor submissions pending approval
CREATE TABLE public.investor_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  company TEXT,
  company_url TEXT,
  contact TEXT NOT NULL,
  contact_type TEXT DEFAULT 'email',
  location TEXT,
  funding_type TEXT,
  funding_stage TEXT,
  funding_industries TEXT[],
  funding_description TEXT,
  check_sizes TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.investor_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for investor submissions
CREATE POLICY "Anyone can submit investor applications" 
ON public.investor_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their own submissions" 
ON public.investor_submissions 
FOR SELECT 
USING (true);

-- Admin users can view and update all submissions (we'll refine this later with proper roles)
CREATE POLICY "Authenticated users can view all submissions" 
ON public.investor_submissions 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update submissions" 
ON public.investor_submissions 
FOR UPDATE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_investor_submissions_updated_at
BEFORE UPDATE ON public.investor_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();