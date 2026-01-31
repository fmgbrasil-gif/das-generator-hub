-- Enable RLS on activity_log table
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all activity logs
CREATE POLICY "Admins view activity logs"
  ON activity_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- System can insert activity logs (for automated logging)
CREATE POLICY "System insert activity logs"
  ON activity_log FOR INSERT
  WITH CHECK (true);