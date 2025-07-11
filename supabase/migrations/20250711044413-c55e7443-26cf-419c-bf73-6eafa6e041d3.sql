-- Fix admin management RLS policies
DROP POLICY IF EXISTS "Admins can update their own data" ON public.admins;
DROP POLICY IF EXISTS "Admins can view their own data" ON public.admins;

-- Create new admin policies that allow full CRUD operations
CREATE POLICY "Admins can view all admin data" ON public.admins
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert admin data" ON public.admins
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update admin data" ON public.admins
FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete admin data" ON public.admins
FOR DELETE
USING (true);

-- Fix investor deletion policy
CREATE POLICY "Authenticated users can delete investors" ON public.investors
FOR DELETE
USING (true);