-- Drop the permissive INSERT policy
DROP POLICY IF EXISTS "System insert activity logs" ON activity_log;

-- Create a more restrictive INSERT policy that requires authentication
-- and ensures actor_user_id matches the authenticated user
CREATE POLICY "Authenticated users insert activity logs"
  ON activity_log FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND (actor_user_id IS NULL OR actor_user_id = auth.uid())
  );