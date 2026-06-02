#!/usr/bin/env python3
"""
Bulk-import portfolio projects from project_import_template.csv into the
Approach Media PostgreSQL database via Prisma.

Usage:
    pip install psycopg2-binary python-dotenv
    python import_projects.py --csv project_import_template.csv --env ../.env

The script is idempotent: rows whose slug already exists are skipped (no update).
To update an existing record, delete it from the DB first or add --update flag.
"""

import argparse
import csv
import json
import os
import re
import sys

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    sys.exit("Missing dependency: pip install psycopg2-binary")

try:
    from dotenv import load_dotenv
except ImportError:
    sys.exit("Missing dependency: pip install python-dotenv")


# ── helpers ────────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")


def parse_pipe_list(cell: str) -> list[str]:
    """'Aluminium|Glass|LED' → ['Aluminium', 'Glass', 'LED']"""
    if not cell or not cell.strip():
        return []
    return [s.strip() for s in cell.split("|") if s.strip()]


def parse_gallery(cell: str) -> list[dict]:
    """
    'url1|alt1|cap1;;url2|alt2|cap2' → list of dicts with url/alt/caption.
    Caption is optional — leave the third pipe-section blank to omit it.
    """
    items = []
    if not cell or not cell.strip():
        return items
    for part in cell.split(";;"):
        parts = [p.strip() for p in part.split("|")]
        if len(parts) < 2 or not parts[0]:
            continue
        items.append({
            "url":     parts[0],
            "alt":     parts[1] if len(parts) > 1 else "",
            "caption": parts[2] if len(parts) > 2 else None,
        })
    return items


def parse_bool(cell: str) -> bool:
    return cell.strip().lower() in ("1", "true", "yes", "y")


def to_decimal_or_none(cell: str):
    cell = cell.strip()
    if not cell:
        return None
    try:
        return float(cell)
    except ValueError:
        return None


def to_int_or_none(cell: str):
    cell = cell.strip()
    if not cell:
        return None
    try:
        return int(cell)
    except ValueError:
        return None


# ── DB helpers ─────────────────────────────────────────────────────────────────

def get_or_create_client(cur, name: str) -> int | None:
    if not name.strip():
        return None
    cur.execute("SELECT id FROM clients WHERE name = %s", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    slug = slugify(name)
    cur.execute(
        "INSERT INTO clients (name, slug) VALUES (%s, %s) RETURNING id",
        (name, slug),
    )
    return cur.fetchone()[0]


def get_or_create_exhibition(cur, name: str, venue: str, city: str, country: str) -> int | None:
    if not name.strip():
        return None
    cur.execute("SELECT id FROM exhibitions WHERE slug = %s", (slugify(name),))
    row = cur.fetchone()
    if row:
        return row[0]
    slug = slugify(name)
    cur.execute(
        """INSERT INTO exhibitions (name, slug, venue_name, city, country)
           VALUES (%s, %s, %s, %s, %s) RETURNING id""",
        (name, slug, venue or None, city or None, country or "India"),
    )
    return cur.fetchone()[0]


def get_or_create_industry(cur, name: str) -> int | None:
    if not name.strip():
        return None
    cur.execute("SELECT id FROM industries WHERE name = %s", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    slug = slugify(name)
    cur.execute(
        "INSERT INTO industries (name, slug) VALUES (%s, %s) RETURNING id",
        (name, slug),
    )
    return cur.fetchone()[0]


def get_or_create_stall_type(cur, name: str) -> int | None:
    if not name.strip():
        return None
    cur.execute("SELECT id FROM stall_types WHERE name = %s", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    slug = slugify(name)
    cur.execute(
        "INSERT INTO stall_types (name, slug) VALUES (%s, %s) RETURNING id",
        (name, slug),
    )
    return cur.fetchone()[0]


# ── main import logic ──────────────────────────────────────────────────────────

def import_row(cur, row: dict, update: bool) -> str:
    slug = row["slug"].strip()
    if not slug:
        slug = slugify(row["title"])

    # Check existing
    cur.execute("SELECT id FROM projects WHERE slug = %s", (slug,))
    existing = cur.fetchone()
    if existing and not update:
        return f"SKIP  {slug} (already exists)"

    # FK lookups / creates
    client_id     = get_or_create_client(cur, row["client_name"])
    exhibition_id = get_or_create_exhibition(
        cur, row["exhibition_name"], row["venue_name"], row["city"], row["country"]
    )

    materials = parse_pipe_list(row["materials_used"])
    features  = parse_pipe_list(row["special_features"])
    awards    = parse_pipe_list(row["awards"])

    data = {
        "title":          row["title"],
        "slug":           slug,
        "stall_area_sqm": to_decimal_or_none(row["stall_area_sqm"]),
        "stall_area_sqft":to_decimal_or_none(row["stall_area_sqft"]),
        "stall_height_m": to_decimal_or_none(row["stall_height_m"]),
        "floors":         to_int_or_none(row["floors"]) or 1,
        "build_year":     to_int_or_none(row["build_year"]),
        "city":           row["city"] or None,
        "exhibition_id":  exhibition_id,
        "client_id":      client_id,
        "description":    row["description"],
        "design_brief":   row["design_brief"] or None,
        "ai_summary":     row["ai_summary"] or None,
        "design_style":   row["design_style"] or None,
        "materials_used": json.dumps(materials) if materials else None,
        "special_features": json.dumps(features) if features else None,
        "awards":         json.dumps(awards) if awards else None,
        "status":         row["status"] or "published",
        "is_featured":    parse_bool(row["is_featured"]),
        "display_order":  to_int_or_none(row["display_order"]) or 0,
    }

    if existing:
        project_id = existing[0]
        set_clause = ", ".join(f"{k} = %({k})s" for k in data if k != "slug")
        cur.execute(f"UPDATE projects SET {set_clause} WHERE id = %(id)s",
                    {**data, "id": project_id})
        action = "UPDATE"
    else:
        cols   = ", ".join(data.keys())
        params = ", ".join(f"%({k})s" for k in data.keys())
        cur.execute(
            f"INSERT INTO projects ({cols}) VALUES ({params}) RETURNING id",
            data,
        )
        project_id = cur.fetchone()[0]
        action = "INSERT"

    # SEO metadata
    seo = {
        "project_id":      project_id,
        "meta_title":      row["meta_title"] or None,
        "meta_description":row["meta_description"] or None,
        "og_title":        row["og_title"] or None,
        "og_description":  row["og_description"] or None,
        "og_image_url":    row["og_image_url"] if "og_image_url" in row else None,
    }
    if any(v for k, v in seo.items() if k != "project_id"):
        cur.execute("""
            INSERT INTO seo_metadata (project_id, meta_title, meta_description,
                                      og_title, og_description, og_image_url)
            VALUES (%(project_id)s, %(meta_title)s, %(meta_description)s,
                    %(og_title)s, %(og_description)s, %(og_image_url)s)
            ON CONFLICT (project_id) DO UPDATE SET
                meta_title       = EXCLUDED.meta_title,
                meta_description = EXCLUDED.meta_description,
                og_title         = EXCLUDED.og_title,
                og_description   = EXCLUDED.og_description,
                og_image_url     = EXCLUDED.og_image_url,
                updated_at       = now()
        """, seo)

    # Media — wipe and re-insert on update
    if action == "UPDATE":
        cur.execute("DELETE FROM media WHERE project_id = %s", (project_id,))

    order = 0

    # Hero image
    hero_url = row.get("hero_image_url", "").strip()
    if hero_url:
        cur.execute("""
            INSERT INTO media (project_id, media_type, url, alt_text, caption,
                               display_order, is_hero, is_thumbnail)
            VALUES (%s, 'image', %s, %s, %s, %s, true, true)
        """, (project_id, hero_url,
              row.get("hero_image_alt", "") or "Hero image",
              row.get("hero_image_caption", "") or None,
              order))
        order += 1

    # Gallery images
    gallery = parse_gallery(row.get("gallery_images", ""))
    for img in gallery:
        media_type = "render_3d" if "render" in img["url"].lower() else "image"
        cur.execute("""
            INSERT INTO media (project_id, media_type, url, alt_text, caption, display_order)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (project_id, media_type, img["url"], img["alt"], img["caption"], order))
        order += 1

    # Industries
    cur.execute("DELETE FROM project_industries WHERE project_id = %s", (project_id,))
    for i, ind_name in enumerate(parse_pipe_list(row.get("industries", ""))):
        ind_id = get_or_create_industry(cur, ind_name)
        if ind_id:
            cur.execute("""
                INSERT INTO project_industries (project_id, industry_id, is_primary)
                VALUES (%s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (project_id, ind_id, i == 0))

    # Stall types
    cur.execute("DELETE FROM project_stall_types WHERE project_id = %s", (project_id,))
    for i, st_name in enumerate(parse_pipe_list(row.get("stall_types", ""))):
        st_id = get_or_create_stall_type(cur, st_name)
        if st_id:
            cur.execute("""
                INSERT INTO project_stall_types (project_id, stall_type_id, is_primary)
                VALUES (%s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (project_id, st_id, i == 0))

    return f"{action} {slug}"


def main():
    parser = argparse.ArgumentParser(description="Bulk-import portfolio projects from CSV")
    parser.add_argument("--csv",    default="project_import_template.csv", help="CSV file path")
    parser.add_argument("--env",    default="../.env",                      help=".env file path")
    parser.add_argument("--update", action="store_true",                    help="Overwrite existing slugs")
    parser.add_argument("--dry-run",action="store_true",                    help="Parse CSV but do not write to DB")
    args = parser.parse_args()

    load_dotenv(args.env)
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        sys.exit("DATABASE_URL not found in environment / .env file")

    with open(args.csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Loaded {len(rows)} row(s) from {args.csv}")

    if args.dry_run:
        for row in rows:
            print(f"  DRY-RUN: would import '{row['title']}' → slug '{row['slug']}'")
        return

    conn = psycopg2.connect(db_url)
    conn.autocommit = False
    cur  = conn.cursor()

    ok = err = skip = 0
    for row in rows:
        try:
            result = import_row(cur, row, args.update)
            print(f"  {result}")
            if result.startswith("SKIP"):
                skip += 1
            else:
                ok += 1
        except Exception as e:
            conn.rollback()
            print(f"  ERROR '{row.get('title', '?')}': {e}")
            err += 1
            continue
        conn.commit()

    cur.close()
    conn.close()
    print(f"\nDone — {ok} imported, {skip} skipped, {err} errors")


if __name__ == "__main__":
    main()
