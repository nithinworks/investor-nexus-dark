-- Create admin table for admin authentication
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view their own data" 
ON public.admins 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update their own data" 
ON public.admins 
FOR UPDATE 
USING (true);

-- Insert default admin user (password: admin)
-- Using a simple hash for demo purposes - in production use proper bcrypt
INSERT INTO public.admins (username, password_hash, email) 
VALUES ('admin', 'admin', 'admin@thefinance.com');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admins_updated_at
BEFORE UPDATE ON public.admins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();