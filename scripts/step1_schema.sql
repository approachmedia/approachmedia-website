-- Run this FIRST — creates the app_config table
CREATE TABLE IF NOT EXISTS app_config (
  key         VARCHAR(100) PRIMARY KEY,
  value       TEXT         NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Verify it was created
SELECT 'app_config table ready' AS status;
