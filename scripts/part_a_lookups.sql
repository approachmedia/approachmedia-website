-- Run FIRST: CDN config + all lookup rows

INSERT INTO app_config (key,value,description,updated_at) VALUES ('media_cdn_base_url','https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev','Cloudflare R2 CDN. Change this one row to switch CDN for all images.',now()) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value,updated_at=now();
INSERT INTO industries (name,slug) VALUES ('Security Devises','security-devises') ON CONFLICT (slug) DO NOTHING;
INSERT INTO industries (name,slug) VALUES ('IT','it') ON CONFLICT (slug) DO NOTHING;
INSERT INTO industries (name,slug) VALUES ('Hardware','hardware') ON CONFLICT (slug) DO NOTHING;
INSERT INTO industries (name,slug) VALUES ('Television','television') ON CONFLICT (slug) DO NOTHING;
INSERT INTO stall_types (name,slug) VALUES ('3 Side Open Stall','3-side-open-stall') ON CONFLICT (slug) DO NOTHING;
INSERT INTO stall_types (name,slug) VALUES ('1 Side Open Stall','1-side-open-stall') ON CONFLICT (slug) DO NOTHING;
INSERT INTO stall_types (name,slug) VALUES ('2 Side Open Stall','2-side-open-stall') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Next View','next-view') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Acrrynics','acrrynics') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Digisol','digisol') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Lenovo - Metrobit Networks Pvt Ltd','lenovo-metrobit-networks-pvt-ltd') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Securus','securus') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Voltaic','voltaic') ON CONFLICT (slug) DO NOTHING;
INSERT INTO clients (name,slug) VALUES ('Wian','wian') ON CONFLICT (slug) DO NOTHING;
INSERT INTO exhibitions (name,slug,venue_name,city,country) VALUES ('FITAG Tech Expo - IT Show','fitag-tech-expo-it-show','Helipad Ground','Gandhinagar','India') ON CONFLICT (slug) DO NOTHING;
