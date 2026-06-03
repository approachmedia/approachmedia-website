-- Run STEP 5: Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition
INSERT INTO projects
  (title,slug,stall_area_sqm,stall_area_sqft,stall_height_m,floors,build_year,city,
   exhibition_id,client_id,description,design_brief,ai_summary,design_style,
   materials_used,special_features,awards,status,is_featured,display_order)
SELECT
  'Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025','lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
  48,516.67,4,
  1,2025,'Gandhinagar',
  (SELECT id FROM exhibitions WHERE slug='fitag-tech-expo-it-show'),
  (SELECT id FROM clients WHERE slug='lenovo-metrobit-networks-pvt-ltd'),
  'Approach Media designed and fabricated a 48 SQM 3 side open stall exhibition stall for Lenovo Metrobit Networks at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a large Lenovo business technology stall with red-white brand architecture, multiple open visitor sides, demo counters, product panels, and a strong island-style presence. The stall was planned for strong brand recall, clear product visibility, easy visitor movement, and search-friendly portfolio discovery for security devises, it, hardware, television exhibition projects in Gandhinagar, India.','Create a 48 SQM 3 side open stall custom exhibition stall for Lenovo Metrobit Networks that communicates technology, product credibility, and visitor engagement at FITAG Tech Expo - IT Show. The design needed visible branding, product-led storytelling, practical discussion areas, and a premium finish suitable for a busy expo environment.','Lenovo Metrobit Networks exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 48 SQM 3 side open stall booth with corporate technology pavilion with bold red-white lenovo branding, designed for product display, lead generation, visitor interaction, and high search relevance around custom exhibition stall design and fabrication in Gujarat.','Corporate technology pavilion with bold red-white Lenovo branding',
  '["Custom wooden structure", "laminate finish", "acrylic lettering", "vinyl graphics", "LED fascia lighting", "carpet flooring"]','["Three-side open layout", "large Lenovo fascia", "demo zones", "product display counters", "visitor meeting area", "high brand visibility"]',NULL,
  'published',true,40
ON CONFLICT (slug) DO NOTHING;
INSERT INTO seo_metadata
  (project_id,meta_title,meta_description,og_title,og_description,og_image_url)
SELECT id,'Lenovo Metrobit Networks 48 SQM Stall Design | FITAG Tech Expo','Explore Lenovo Metrobit Networks''s 48 SQM 3 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach',
  'Lenovo Metrobit Networks Custom Exhibition Stall at FITAG Tech Expo - IT Show','48 SQM 3 side open stall exhibition stall design and fabrication for Lenovo Metrobit Networks by Approach Media at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar.','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp'
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT (project_id) DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,caption,display_order,is_hero,is_thumbnail)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp','Lenovo Metrobit Networks 48 SQM 3 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall exhibition stall at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar, designed and fabricated by Approach Media.',0,true,true
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 1',1
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 2',2
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 3',3
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 4',4
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 5',5
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO media (project_id,media_type,url,alt_text,display_order)
SELECT id,'image','2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp','Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025 photo 6',6
FROM projects WHERE slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,true
FROM projects p, industries i
WHERE p.slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='security-devises'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='it'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='hardware'
ON CONFLICT DO NOTHING;
INSERT INTO project_industries (project_id,industry_id,is_primary)
SELECT p.id,i.id,false
FROM projects p, industries i
WHERE p.slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND i.slug='television'
ON CONFLICT DO NOTHING;
INSERT INTO project_stall_types (project_id,stall_type_id,is_primary)
SELECT p.id,s.id,true
FROM projects p, stall_types s
WHERE p.slug='lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025' AND s.slug='3-side-open-stall'
ON CONFLICT DO NOTHING;
