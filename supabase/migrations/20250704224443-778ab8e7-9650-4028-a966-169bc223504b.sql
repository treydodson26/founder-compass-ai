-- Add public read access policy for founders table
CREATE POLICY "Allow public read access to founders" 
ON public.founders 
FOR SELECT 
USING (true);

-- Also add policies for related tables that might be needed
CREATE POLICY "Allow public read access to milestones" 
ON public.milestones 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to resources" 
ON public.resources 
FOR SELECT 
USING (true);