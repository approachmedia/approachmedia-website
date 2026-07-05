-- ─────────────────────────────────────────────────────────────
-- Merge duplicate stall types.
--
--   • "<X> Stall" merges into "<X>" when both exist
--     (1 Side Open Stall → 1 Side Open, 2 Side Open Stall → 2 Side Open, …)
--   • "i Land" / "i Land Stall" (typo of Island) merge into "Island Stand"
--
-- Project links are remapped to the surviving type; the primary flag is
-- preserved; duplicate types are then deleted. Safe to re-run.
--
-- Run from your Mac:
--   psql "postgresql://postgres:<password>@thomas.proxy.rlwy.net:24905/railway" -f cleanup_stall_types.sql
-- ─────────────────────────────────────────────────────────────

BEGIN;

-- Build the merge map: dup_id → base_id
CREATE TEMP TABLE stall_type_merge (dup_id INT PRIMARY KEY, base_id INT NOT NULL) ON COMMIT DROP;

-- 1) The i-Land family → Island Stand (must run first so "i Land Stall"
--    doesn't merge into "i Land" and get orphaned)
INSERT INTO stall_type_merge (dup_id, base_id)
SELECT dup.id, base.id
FROM stall_types dup
JOIN stall_types base ON lower(base.name) = 'island stand'
WHERE lower(dup.name) IN ('i land', 'i land stall', 'island', 'island stall')
  AND dup.id <> base.id;

-- 2) Generic rule: "<X> Stall" → "<X>" when the base name exists
INSERT INTO stall_type_merge (dup_id, base_id)
SELECT dup.id, base.id
FROM stall_types dup
JOIN stall_types base
  ON lower(base.name) = lower(regexp_replace(dup.name, '\s+stall$', '', 'i'))
 AND base.id <> dup.id
WHERE dup.name ~* '\sstall$'
  AND dup.id NOT IN (SELECT dup_id FROM stall_type_merge)
  AND base.id NOT IN (SELECT dup_id FROM stall_type_merge);

-- Show what will be merged
SELECT d.name AS duplicate, b.name AS merged_into
FROM stall_type_merge m
JOIN stall_types d ON d.id = m.dup_id
JOIN stall_types b ON b.id = m.base_id
ORDER BY b.name;

-- 3) If a project links to BOTH the duplicate and the base, and the
--    duplicate link was primary, carry the primary flag to the base link.
UPDATE project_stall_types base
SET is_primary = true
FROM project_stall_types dup
JOIN stall_type_merge m ON dup.stall_type_id = m.dup_id
WHERE dup.is_primary
  AND base.project_id   = dup.project_id
  AND base.stall_type_id = m.base_id;

-- 4) Remap project links from duplicate → base (skip where the base link
--    already exists, to avoid primary-key conflicts).
UPDATE project_stall_types pst
SET stall_type_id = m.base_id
FROM stall_type_merge m
WHERE pst.stall_type_id = m.dup_id
  AND NOT EXISTS (
    SELECT 1 FROM project_stall_types x
    WHERE x.project_id = pst.project_id AND x.stall_type_id = m.base_id
  );

-- 5) Drop any leftover duplicate links (projects that had both)
DELETE FROM project_stall_types pst
USING stall_type_merge m
WHERE pst.stall_type_id = m.dup_id;

-- 6) Delete the duplicate stall types themselves
DELETE FROM stall_types st
USING stall_type_merge m
WHERE st.id = m.dup_id;

-- Final state
SELECT st.name, count(pst.project_id) AS projects
FROM stall_types st
LEFT JOIN project_stall_types pst ON pst.stall_type_id = st.id
GROUP BY st.name
ORDER BY st.name;

COMMIT;
