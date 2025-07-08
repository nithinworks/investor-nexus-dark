-- Add more user profile fields for better user experience
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN company TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN avatar_url TEXT;