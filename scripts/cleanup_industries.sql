-- ═══════════════════════════════════════════════════════════════════
-- INDUSTRY CLEANUP — reduce hundreds of messy imported industries to
-- the 24 canonical industries from the old approachmedia.in website.
-- Every project ends up with EXACTLY ONE industry (is_primary = true).
--
-- Run:
--   psql "$DATABASE_URL" -f scripts/cleanup_industries.sql
--
-- The whole script runs in ONE transaction — if anything fails,
-- nothing is changed.
-- ═══════════════════════════════════════════════════════════════════

BEGIN;

-- ─────────────────────────────────────────────
-- 1. Canonical industry list (old website)
-- ─────────────────────────────────────────────
CREATE TEMP TABLE canonical (name varchar(100) PRIMARY KEY, slug varchar(120));
INSERT INTO canonical (name, slug) VALUES
  ('Architecture, Building materials, Art and Design',  'architecture-building-materials-art-design'),
  ('Automation Industry',                               'automation-industry'),
  ('Automobile Industry',                               'automobile-industry'),
  ('Builder & Real Estate',                             'builder-real-estate'),
  ('CCTV, TV, Wire and Cable Industry',                 'cctv-tv-wire-cable-industry'),
  ('Electrical Industry',                               'electrical-industry'),
  ('Elevator and Escalator Industry',                   'elevator-escalator-industry'),
  ('Exhibition Stall Design',                           'exhibition-stall-design'),
  ('Food Industry',                                     'food-industry'),
  ('Foundry and Steel Industry',                        'foundry-steel-industry'),
  ('Garment, Cloth, Fashion Industry',                  'garment-cloth-fashion-industry'),
  ('Hardware, Kitchen and Bathroom Fittings Industry',  'hardware-kitchen-bathroom-fittings-industry'),
  ('Healthcare',                                        'healthcare'),
  ('Machine Manufacturers & Machine Tools',             'machine-manufacturers-machine-tools'),
  ('Oil Chemical & Gas Industry',                       'oil-chemical-gas-industry'),
  ('Other',                                             'other'),
  ('Pharmaceutical Industry',                           'pharmaceutical-industry'),
  ('Plastic Industry',                                  'plastic-industry'),
  ('Printing and Packaging Industry',                   'printing-packaging-industry'),
  ('Pump Valves and Gears Industry',                    'pump-valves-gears-industry'),
  ('Solar Industry',                                    'solar-industry'),
  ('Textile Industry',                                  'textile-industry'),
  ('Water & Water Purification Industry',               'water-water-purification-industry'),
  ('Wood Industry',                                     'wood-industry');

-- Free up canonical slugs held by soon-to-be-deleted rows
UPDATE industries
SET slug = slug || '-legacy-' || id
WHERE slug IN (SELECT slug FROM canonical)
  AND name NOT IN (SELECT name FROM canonical);

-- Insert canonical industries that don't exist yet
INSERT INTO industries (name, slug)
SELECT c.name, c.slug FROM canonical c
WHERE NOT EXISTS (SELECT 1 FROM industries i WHERE i.name = c.name);

-- Make sure existing canonical rows carry the canonical slug
UPDATE industries i
SET slug = c.slug
FROM canonical c
WHERE i.name = c.name AND i.slug <> c.slug;

-- ─────────────────────────────────────────────
-- 2. Map every existing industry → one canonical
--    (keyword rules, most specific first)
-- ─────────────────────────────────────────────
CREATE TEMP TABLE industry_map AS
SELECT
  i.id   AS old_id,
  i.name AS old_name,
  CASE
    -- already canonical → keep as-is
    WHEN i.name IN (SELECT name FROM canonical)                                   THEN i.name
    WHEN i.name ~* 'exhibition|stall|pavilion|expo'                               THEN 'Exhibition Stall Design'
    WHEN i.name ~* 'elevator|escalator|\mlift'                                    THEN 'Elevator and Escalator Industry'
    WHEN i.name ~* 'solar|photovoltaic|renewable|clean energy'                    THEN 'Solar Industry'
    WHEN i.name ~* 'pharma|nutraceutical|medicine|drug|\mapis?\M'                 THEN 'Pharmaceutical Industry'
    WHEN i.name ~* 'health|medical|hospital|dental|diagnostic|surgical|implant|steriliz|lab equipment' THEN 'Healthcare'
    WHEN i.name ~* 'water|\mro\M|effluent|drainage|filtration|filter|purif|membrane' THEN 'Water & Water Purification Industry'
    WHEN i.name ~* 'cctv|camera|televis|\mtv\M|wire|cable|security|surveillance|networking|conductor' THEN 'CCTV, TV, Wire and Cable Industry'
    WHEN i.name ~* 'automobile|automotive|auto compo|vehicle|tyre|tire'           THEN 'Automobile Industry'
    WHEN i.name ~* 'automation|robot|motion control|process control|instrument|sensor|\mplc\M' THEN 'Automation Industry'
    WHEN i.name ~* 'pump|valve|gear|bearing|compressor|dosing|flow system'        THEN 'Pump Valves and Gears Industry'
    WHEN i.name ~* 'food|dairy|snack|namkeen|spice|frozen|beverage|ice cream|ready-to-eat|hospitality|ingredient|cold chain|commercial kitchen|agarbatti|fragrance' THEN 'Food Industry'
    WHEN i.name ~* 'plastic|polymer|pigment|masterbatch|\mpvc\M'                  THEN 'Plastic Industry'
    WHEN i.name ~* 'print|packag|carton|\mbox|crate|paper|label|\mink'            THEN 'Printing and Packaging Industry'
    WHEN i.name ~* 'garment|cloth|fashion|apparel|denim'                          THEN 'Garment, Cloth, Fashion Industry'
    WHEN i.name ~* 'textile|fabric|yarn|spinning|weav'                            THEN 'Textile Industry'
    WHEN i.name ~* 'foundry|steel|casting|forg|metallurg|alloy|\miron\M'          THEN 'Foundry and Steel Industry'
    WHEN i.name ~* 'wood|plywood|timber|furniture|laminate|\mmdf\M'               THEN 'Wood Industry'
    WHEN i.name ~* 'hardware|kitchen|bath|sanitary|faucet|fitting|screw|fastener|lock|brass|cookware' THEN 'Hardware, Kitchen and Bathroom Fittings Industry'
    WHEN i.name ~* 'machine|machining|\mcnc\M|lathe|tooling'                      THEN 'Machine Manufacturers & Machine Tools'
    WHEN i.name ~* 'electric|electronic|switchgear|transformer|light|\mled\M|power|energy|battery|semiconductor|smart' THEN 'Electrical Industry'
    WHEN i.name ~* 'oil|chemical|\mgas\M|petro|lubricant|adhesive|coating|paint'  THEN 'Oil Chemical & Gas Industry'
    WHEN i.name ~* 'builder|real estate|property|proptech|infrastructure'         THEN 'Builder & Real Estate'
    WHEN i.name ~* 'architect|building|construction|cement|tile|ceramic|granito|vitrified|brick|cladding|\macp\M|aluminium|interior|decor|design|\mart\M|facade|glass' THEN 'Architecture, Building materials, Art and Design'
    ELSE 'Other'
  END AS new_name
FROM industries i;

-- attach canonical id
ALTER TABLE industry_map ADD COLUMN new_id int;
UPDATE industry_map m
SET new_id = i.id
FROM industries i
WHERE i.name = m.new_name;

-- ─────────────────────────────────────────────
-- 3. REVIEW REPORT — how every old tag is mapped
-- ─────────────────────────────────────────────
\echo ''
\echo '════════ MAPPING REPORT (old → new) ════════'
SELECT old_name AS "Old industry", new_name AS "New industry"
FROM industry_map
WHERE old_name <> new_name
ORDER BY new_name, old_name;

-- ─────────────────────────────────────────────
-- 4. Rebuild project_industries: ONE row per project
--    Preference: non-'Other' > primary link > canonical id
-- ─────────────────────────────────────────────
CREATE TEMP TABLE new_links AS
SELECT DISTINCT ON (pi.project_id)
  pi.project_id,
  m.new_id AS industry_id
FROM project_industries pi
JOIN industry_map m ON m.old_id = pi.industry_id
ORDER BY pi.project_id,
         (m.new_name = 'Other'),      -- prefer a real industry over 'Other'
         pi.is_primary DESC,
         m.new_id;

-- projects with no industry at all → 'Other'
INSERT INTO new_links (project_id, industry_id)
SELECT p.id, (SELECT id FROM industries WHERE name = 'Other')
FROM projects p
WHERE NOT EXISTS (SELECT 1 FROM new_links nl WHERE nl.project_id = p.id);

DELETE FROM project_industries;
INSERT INTO project_industries (project_id, industry_id, is_primary)
SELECT project_id, industry_id, true FROM new_links;

-- ─────────────────────────────────────────────
-- 5. Remap clients.industry_id, then delete stale industries
-- ─────────────────────────────────────────────
UPDATE clients c
SET industry_id = m.new_id
FROM industry_map m
WHERE c.industry_id = m.old_id AND m.old_id <> m.new_id;

DELETE FROM industries
WHERE name NOT IN (SELECT name FROM canonical);

-- ─────────────────────────────────────────────
-- 6. FINAL REPORT — projects per canonical industry
-- ─────────────────────────────────────────────
\echo ''
\echo '════════ FINAL COUNTS (projects per industry) ════════'
SELECT i.name AS "Industry", count(pi.project_id) AS "Projects"
FROM industries i
LEFT JOIN project_industries pi ON pi.industry_id = i.id
GROUP BY i.name
ORDER BY count(pi.project_id) DESC, i.name;

\echo ''
\echo '════════ SANITY CHECK (every project has exactly 1 industry) ════════'
SELECT
  (SELECT count(*) FROM projects)                                  AS total_projects,
  (SELECT count(*) FROM project_industries)                        AS total_links,
  (SELECT count(*) FROM industries)                                AS total_industries;

COMMIT;
