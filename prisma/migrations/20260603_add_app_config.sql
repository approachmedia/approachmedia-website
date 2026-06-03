-- Migration: add app_config table for site-wide key/value settings
-- Run once against your Railway PostgreSQL instance:
--   psql $DATABASE_URL -f prisma/migrations/20260603_add_app_config.sql

CREATE TABLE IF NOT EXISTS app_config (
  key         VARCHAR(100) PRIMARY KEY,
  value       TEXT         NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Seed the CDN base URL.
-- To switch CDN later: UPDATE app_config SET value = 'https://new-url.com' WHERE key = 'media_cdn_base_url';
INSERT INTO app_config (key, value, description)
VALUES (
  'media_cdn_base_url',
  'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev',
  'Base URL for all Cloudflare R2 media assets. Change this single row to redirect every project image to a new CDN without updating any project records.'
)
ON CONFLICT (key) DO NOTHING;
