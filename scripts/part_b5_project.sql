-- Run STEP 6: Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at 
INSERT INTO projects
  (title,slug,stall_area_sqm,stall_area_sqft,stall_height_m,floors,build_year,city,
   exhibition_id,client_id,description,design_brief,ai_summary,design_style,
   materials_used,special_features,awards,status,is_featured,display_order)
SELECT
  'Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025','securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
  18,193.75,4,
  1,2025,'Gandhinagar',
  (SELECT id FROM exhibitions WHERE slug='fitag-tech-expo-it-show'),
  (SELECT id FROM clients WHERE slug='securus'),
  'Approach Media designed and fabricated an 18 SQM 2 side open stall exhibition stall for Securus at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a security and surveillance stall with red-white fascia branding, camera and solution display panels, open visitor edges, and a compact product consultation layout. The stall was planned for strong brand recall, clear product visibility, easy visitor movement, and search-friendly portfolio discovery for security devises, it, hardware, television exhibition projects in Gandhinagar, India.','Create an 18 SQM 2 side open stall custom exhibition stall for Securus that communicates technology, product credibility, and visitor engagement at FITAG Tech Expo - IT Show. The design needed visible branding, product-led storytelling, practical discussion areas, and a premium finish suitable for a busy expo environment.','Securus exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 18 SQM 2 side open stall booth with professional security solutions booth with strong red-white visual identity, designed for product display, lead generation, visitor interaction, and high search relevance around custom exhibition stall design and fabrication in Gujarat.','Professional security solutions booth with strong red-white visual identity',
  '["Wooden exhibition structure", "laminate finish", "printed vinyl panels", "acrylic logo", "LED lighting", "carpet flooring"]','["Two-side open access", "security product display panels", "red-white fascia", "demo wall", "compact meeting and inquiry area"]',NULL,
  'published',true,50
ON CONFLICT (slug) DO NOTHING;
INSERT INTO seo_metadata
  (project_id,meta_title,meta_description,og_title,og_description,og_image_url)
SELECT id,'Securus 18 SQM Stall Design | FITAG Tech Expo - IT Show','Explore Securus''s 18 SQM 2 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media for impactful',
  'Securus Custom Exhibition Stall at FITAG Tech Expo - IT Show','18 SQM 2 side open stall exhibition stall design and fabrication for Securus by Approach Media at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar.','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp'
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT (project_id) DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,caption,display_order,is_hero,is_thumbnail)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp','Securus 18 SQM 2 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media','Securus 18 SQM 2 Side Open Stall exhibition stall at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar, designed and fabricated by Approach Media.',0,true,true
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 1',1
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 2',2
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 3',3
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 4',4
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 5',5
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp','Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 6',6
FROM projects WHERE slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,true
FROM projects p, industries i
WHERE p.slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='security-devises'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='it'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='hardware'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='television'
ON CONFLICT DO NOTHING;
INSERT INTO project_stall_types (project_id,stall_type_id,is_primary)
SELECT p.id,s.id,true
FROM projects p, stall_types s
WHERE p.slug='securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND s.slug='2-side-open-stall'
ON CONFLICT DO NOTHING;
