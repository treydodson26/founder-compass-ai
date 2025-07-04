-- First, let's see what policies currently exist and then make sure we have the right ones
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('founders', 'milestones', 'resources');

-- Drop any conflicting policies that might be blocking access
DROP POLICY IF EXISTS "Allow all operations on founders" ON public.founders;

-- Recreate the public read policy to ensure it's active
DROP POLICY IF EXISTS "Allow public read access to founders" ON public.founders;
CREATE POLICY "Allow public read access to founders" 
ON public.founders 
FOR SELECT 
USING (true);

-- Ensure milestones policy exists
DROP POLICY IF EXISTS "Allow public read access to milestones" ON public.milestones;
CREATE POLICY "Allow public read access to milestones" 
ON public.milestones 
FOR SELECT 
USING (true);