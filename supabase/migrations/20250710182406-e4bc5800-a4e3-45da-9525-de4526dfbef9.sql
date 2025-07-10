
-- Allow authenticated users to insert into investors table (for admin approval workflow)
CREATE POLICY "Authenticated users can insert approved investors" 
ON public.investors 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update investors (for admin management)
CREATE POLICY "Authenticated users can update investors" 
ON public.investors 
FOR UPDATE 
TO authenticated
USING (true);
