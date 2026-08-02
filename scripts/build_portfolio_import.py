#!/usr/bin/env python3
"""
build_portfolio_import.py — turn the "Sorted Photographs" folder library into
a portfolio-import Excel/CSV ready for /admin/import.

RUN THIS ON YOUR MAC (this script needs your local filesystem — it cannot be
run from the website's cloud dev session):

    cd ~/Documents                     # or wherever you saved this file
    python3 build_portfolio_import.py

Optional flags:
    --root "/Users/admin/Documents/Approach Processed/Sorted Photographs"
    --out-dir "/Users/admin/Desktop"
    --out-name "portfolio-import-from-sorted-photographs"

Requires only the Python 3 standard library for the CSV output (always
works). For the .xlsx file it uses openpyxl if installed; if not, it prints
a one-line install command and still writes the CSV (the /admin/import page
accepts CSV directly, so the .xlsx is a convenience, not a requirement).

────────────────────────────────────────────────────────────────────────────
RULES IMPLEMENTED (per the Approach Media brief)
────────────────────────────────────────────────────────────────────────────
  Sorted Photographs/
    <year>/                              4-digit year folders only
      <exhibition (city)>/               e.g. "Aahar 2023 (Delhi)"
        <company>/                       one project per company folder
          Hero-<size>-<sides>.ext        the hero image
          *.ext                          gallery images
          Duplicate/                     skipped entirely
    "<... (Don't Use This)>"             skipped entirely, any level

  - Company folders whose name contains "(Don't Use This)" are skipped.
  - Any "Duplicate" folder (case-insensitive) is skipped, at any depth
    inside a company folder.
  - The Hero file is matched by filename starting with "Hero" (case-
    insensitive). "Hero-18-2.ext" -> stall size 18 sqm, 2 open sides.
    If the size/sides can't be parsed, the file is still used as the hero
    image but the row is flagged for manual review.
  - Every other non-duplicate image in the company folder becomes a
    gallery image (pipe-separated), in the exact relative-path convention
    the site's importer already uses:  "<year>/<exhibition>/<company>/<file>"
    — this matches how buildMediaUrl() resolves paths against the R2 CDN
    (see src/lib/db/config.ts): each folder segment is percent-encoded
    automatically, so spaces and parentheses in folder names are fine AS
    LONG AS the same folder structure is mirrored on R2.
  - Industry is guessed ONLY from lightweight keyword matching against the
    site's real canonical industry list (below) — never invented. Rows
    with no confident match are left blank and flagged for manual review.
  - Copy (the 3 content columns + SEO fields) is generated from ONLY the
    facts we actually have: company name, exhibition name, city, year,
    stall size, open sides. No fabricated materials, features, or awards.
  - status is always "final" (-> imported as "published").
"""

import argparse
import csv
import os
import re
import sys
import unicodedata
from pathlib import Path

# ─── Canonical lookups (from the live site's own dropdown lists) ────────────

INDUSTRIES = [
    "Architecture, Building materials, Art and Design", "Automation Industry",
    "Automobile Industry", "Automotive", "Builder & Real Estate",
    "CCTV, TV, Wire and Cable Industry", "Chemicals", "Education",
    "Electrical Industry", "Elevator and Escalator Industry",
    "Exhibition Stall Design", "FMCG", "Food & Beverage", "Food Industry",
    "Foundry and Steel Industry", "Garment, Cloth, Fashion Industry",
    "Hardware, Kitchen and Bathroom Fittings Industry", "Healthcare",
    "IT / Technology", "Machine Manufacturers & Machine Tools",
    "Manufacturing", "Oil Chemical & Gas Industry", "Other",
    "Pharmaceutical Industry", "Pharmaceuticals", "Plastic Industry",
    "Printing and Packaging Industry", "Pump Valves and Gears Industry",
    "Real Estate", "Solar / Energy", "Solar Industry", "Textile Industry",
    "Textiles & Apparel", "Water & Water Purification Industry",
    "Wood Industry",
]

STALL_TYPES_BY_SIDES = {1: "1 Side Open", 2: "2 Side Open", 3: "3 Side Open", 4: "4 Side Open"}

# keyword -> industry name. Checked against company name first, then
# exhibition name. First match wins. Extend this list freely.
INDUSTRY_KEYWORDS = [
    (r"pharma|medicine|drug|generic", "Pharmaceuticals"),
    (r"health|hospital|clinic|diagnostic|medical\b", "Healthcare"),
    (r"solar|photovoltaic|\bpv\b", "Solar Industry"),
    (r"renewable|green energy|power\b", "Solar / Energy"),
    (r"auto(mobile)?\b|vehicle|motor(s)?\b|ev\b", "Automotive"),
    (r"textile|garment|apparel|fashion|fabric", "Garment, Cloth, Fashion Industry"),
    (r"cable|wire|cctv|surveillance", "CCTV, TV, Wire and Cable Industry"),
    (r"real ?estate|realty|builder|developer|housing|property", "Builder & Real Estate"),
    (r"machine|engineering|tool(s)?\b", "Machine Manufacturers & Machine Tools"),
    (r"chemical", "Chemicals"),
    (r"plastic|polymer", "Plastic Industry"),
    (r"water|purif", "Water & Water Purification Industry"),
    (r"print|packaging|packag", "Printing and Packaging Industry"),
    (r"\bit\b|software|technology|tech\b", "IT / Technology"),
    (r"food|beverage|f&b|aahar", "Food & Beverage"),
    (r"fmcg|consumer good", "FMCG"),
    (r"education|school|university|edtech", "Education"),
    (r"wood|furniture|timber", "Wood Industry"),
    (r"valve|pump|gear", "Pump Valves and Gears Industry"),
    (r"electrical|electronic", "Electrical Industry"),
    (r"steel|foundry|metal cast", "Foundry and Steel Industry"),
    (r"elevator|escalator|lift\b", "Elevator and Escalator Industry"),
    (r"hardware|kitchen|bathroom|sanitary", "Hardware, Kitchen and Bathroom Fittings Industry"),
    (r"oil\b|\bgas\b|petro", "Oil Chemical & Gas Industry"),
    (r"manufactur", "Manufacturing"),
    (r"architect|building material", "Architecture, Building materials, Art and Design"),
]

SKIP_NAME_PATTERNS = [
    re.compile(r"don'?t use this", re.I),
]
SKIP_DUP_DIR = re.compile(r"^duplicate$", re.I)
SKIP_HIDDEN  = re.compile(r"^\.")  # .DS_Store, ._*, etc.
IMAGE_EXTS   = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff", ".bmp"}
YEAR_DIR_RE  = re.compile(r"^\d{4}$")
EXHIBITION_CITY_RE = re.compile(r"^(.*?)\s*\(([^)]+)\)\s*$")
HERO_PATTERN = re.compile(r"^hero[-_]?(\d+)[-_](\d+)", re.I)
HERO_PREFIX  = re.compile(r"^hero", re.I)


def slugify(text: str) -> str:
    """Mirrors src/app/api/admin/import/route.ts slugify() exactly."""
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text[:220]


def guess_industry(*names: str) -> str:
    haystack = " ".join(n.lower() for n in names if n)
    for pattern, industry in INDUSTRY_KEYWORDS:
        if re.search(pattern, haystack):
            return industry
    return ""


def is_skippable_dir(name: str) -> bool:
    if SKIP_DUP_DIR.match(name):
        return True
    return any(p.search(name) for p in SKIP_NAME_PATTERNS)


def collect_images(company_dir: Path):
    """All non-duplicate, non-hidden image files under a company folder,
    recursing into subfolders EXCEPT ones matching the skip rules."""
    found = []
    for dirpath, dirnames, filenames in os.walk(company_dir):
        # prune skippable subdirectories in-place so os.walk doesn't descend
        dirnames[:] = [d for d in dirnames if not is_skippable_dir(d) and not SKIP_HIDDEN.match(d)]
        for fn in filenames:
            if SKIP_HIDDEN.match(fn):
                continue
            if Path(fn).suffix.lower() not in IMAGE_EXTS:
                continue
            found.append(Path(dirpath) / fn)
    return sorted(found, key=lambda p: p.name.lower())


def rel_path(root: Path, file: Path) -> str:
    """Relative path in the site's own convention: <year>/<exhibition>/<company>/<file>"""
    return "/".join(file.relative_to(root).parts)


def build_row(year, exhibition_raw, company, hero_file, gallery_files, root, seen_slugs, warnings):
    m = EXHIBITION_CITY_RE.match(exhibition_raw)
    exhibition_name, city = (m.group(1).strip(), m.group(2).strip()) if m else (exhibition_raw, "")

    size = sides = None
    hero_match = HERO_PATTERN.match(hero_file.stem)
    if hero_match:
        size, sides = int(hero_match.group(1)), int(hero_match.group(2))
    else:
        warnings.append(f"[manual review] {company} ({exhibition_raw}, {year}): "
                         f"hero file \"{hero_file.name}\" doesn't match Hero-<size>-<sides> — "
                         f"stall size/type left blank")

    stall_type = STALL_TYPES_BY_SIDES.get(sides, "")
    if sides is not None and not stall_type:
        warnings.append(f"[manual review] {company} ({exhibition_raw}, {year}): "
                         f"open-sides value {sides} has no matching stall type (expected 1-4)")

    size_label  = f"{size} sqm " if size else ""
    sides_label = f"{sides}-side open " if sides else ""
    city_label  = f", {city}" if city else ""

    industry = guess_industry(company, exhibition_name)
    if not industry:
        warnings.append(f"[manual review] {company} ({exhibition_raw}, {year}): "
                         f"industry could not be inferred — leave blank or set manually")

    title = f"{company} {size_label}{sides_label}Exhibition Stall Design at {exhibition_name}{city_label} {year}".strip()
    title = re.sub(r"\s+", " ", title)

    base_slug = slugify(f"{company}-{exhibition_name}-{city}-{year}")
    slug = base_slug
    n = 2
    while slug in seen_slugs:
        slug = f"{base_slug}-{n}"
        n += 1
    seen_slugs.add(slug)

    challenge = (f"{company} needed a {size_label}{sides_label}exhibition stall at "
                 f"{exhibition_name}{city_label} that gave the brand strong visibility and "
                 f"a smooth visitor flow.").replace("  ", " ")
    designed  = (f"Approach Media designed and fabricated this {size_label}{sides_label}"
                 f"exhibition stall for {company} at {exhibition_name}{city_label} in "
                 f"{year}.").replace("  ", " ")
    worked    = (f"{company} exhibition stall by Approach Media at {exhibition_name}"
                 f"{city_label}, {year}: {size_label}{sides_label}stall design.").replace("  ", " ")

    meta_title = f"{company} {size_label}Stall Design | {exhibition_name} {year} | Approach Media".strip()
    meta_title = re.sub(r"\s+", " ", meta_title)[:70]
    meta_desc  = (f"{size_label}{sides_label}exhibition stall for {company} at "
                  f"{exhibition_name}{city_label} {year}, designed and fabricated by "
                  f"Approach Media.").strip()
    meta_desc  = re.sub(r"\s+", " ", meta_desc)[:165]

    hero_rel    = rel_path(root, hero_file)
    gallery_rel = "|".join(rel_path(root, f) for f in gallery_files if f != hero_file)

    return {
        "title": title,
        "slug": slug,
        "client_name": company,
        "exhibition_name": exhibition_name,
        "venue_name": "",
        "city": city,
        "country": "India",
        "stall_area_sqm": size or "",
        "stall_area_sqft": round(size * 10.7639, 1) if size else "",
        "stall_height_m": "",
        "floors": "",
        "build_year": year,
        "design_style": "",
        "materials_used": "",
        "special_features": "",
        "awards": "",
        "industries": industry,
        "stall_types": stall_type,
        "status": "final",
        "is_featured": "",
        "display_order": "",
        "01 The Challenge": challenge,
        "02 What We Designed": designed,
        "03 Why It Worked": worked,
        "hero_image_url": hero_rel,
        "hero_image_alt": f"{company} exhibition stall at {exhibition_name}{city_label} {year}",
        "hero_image_caption": f"{company} at {exhibition_name}{city_label}, {year}",
        "gallery_images": gallery_rel,
        "meta_title": meta_title,
        "meta_description": meta_desc,
        "og_title": meta_title,
        "og_description": meta_desc,
    }


COLUMNS = [
    "title", "slug", "client_name", "exhibition_name", "venue_name", "city", "country",
    "stall_area_sqm", "stall_area_sqft", "stall_height_m", "floors", "build_year",
    "design_style", "materials_used", "special_features", "awards",
    "industries", "stall_types", "status", "is_featured", "display_order",
    "01 The Challenge", "02 What We Designed", "03 Why It Worked",
    "hero_image_url", "hero_image_alt", "hero_image_caption", "gallery_images",
    "meta_title", "meta_description", "og_title", "og_description",
]


def walk_library(root: Path):
    rows = []
    report = {
        "dont_use_this_skipped": [],
        "duplicate_dirs_skipped": [],
        "missing_hero": [],
        "no_images": [],
        "created": [],
    }
    warnings = []
    seen_slugs = set()

    if not root.is_dir():
        print(f"ERROR: root folder not found:\n  {root}", file=sys.stderr)
        sys.exit(1)

    for year_dir in sorted(root.iterdir()):
        if not year_dir.is_dir() or not YEAR_DIR_RE.match(year_dir.name):
            continue
        year = year_dir.name

        for exh_dir in sorted(year_dir.iterdir()):
            if not exh_dir.is_dir():
                continue
            if is_skippable_dir(exh_dir.name):
                report["dont_use_this_skipped"].append(str(exh_dir.relative_to(root)))
                continue

            for company_dir in sorted(exh_dir.iterdir()):
                if not company_dir.is_dir():
                    continue
                if is_skippable_dir(company_dir.name):
                    tag = "duplicate_dirs_skipped" if SKIP_DUP_DIR.match(company_dir.name) else "dont_use_this_skipped"
                    report[tag].append(str(company_dir.relative_to(root)))
                    continue

                images = collect_images(company_dir)
                if not images:
                    report["no_images"].append(str(company_dir.relative_to(root)))
                    continue

                hero_candidates = [f for f in images if HERO_PREFIX.match(f.name)]
                if not hero_candidates:
                    report["missing_hero"].append(str(company_dir.relative_to(root)))
                    continue
                hero_file = hero_candidates[0]
                if len(hero_candidates) > 1:
                    warnings.append(f"[note] {company_dir.name} ({exh_dir.name}, {year}): "
                                     f"{len(hero_candidates)} files start with \"Hero\" — used "
                                     f"\"{hero_file.name}\" as the hero, the rest went to the gallery")

                row = build_row(year, exh_dir.name, company_dir.name, hero_file, images, root, seen_slugs, warnings)
                rows.append(row)
                report["created"].append(row["slug"])

    return rows, report, warnings


def write_csv(rows, path: Path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=COLUMNS)
        w.writeheader()
        for r in rows:
            w.writerow(r)


def write_xlsx(rows, path: Path):
    try:
        from openpyxl import Workbook
    except ImportError:
        print("\n(openpyxl not installed — skipping .xlsx output. Run `pip3 install openpyxl`\n"
              " and re-run this script if you want the Excel file too. The CSV works fine\n"
              " with /admin/import as-is.)\n")
        return False
    wb = Workbook()
    ws = wb.active
    ws.title = "Portfolio Import"
    ws.append(COLUMNS)
    for r in rows:
        ws.append([r[c] for c in COLUMNS])
    wb.save(path)
    return True


def print_report(report, warnings, rows):
    print("\n" + "=" * 70)
    print("IMPORT BUILD REPORT")
    print("=" * 70)
    print(f"Projects created:            {len(report['created'])}")
    print(f"'(Don't Use This)' skipped:  {len(report['dont_use_this_skipped'])}")
    print(f"'Duplicate' folders skipped: {len(report['duplicate_dirs_skipped'])}")
    print(f"Folders with no Hero image:  {len(report['missing_hero'])}")
    print(f"Folders with no images:      {len(report['no_images'])}")
    print(f"Rows flagged for review:     {len(warnings)}")

    def _list(title, items, limit=25):
        if not items:
            return
        print(f"\n-- {title} ({len(items)}) --")
        for item in items[:limit]:
            print(f"  {item}")
        if len(items) > limit:
            print(f"  … and {len(items) - limit} more")

    _list("(Don't Use This) folders skipped", report["dont_use_this_skipped"])
    _list("Duplicate folders skipped", report["duplicate_dirs_skipped"])
    _list("Folders missing a Hero image (SKIPPED — no row created)", report["missing_hero"])
    _list("Folders with no usable images (SKIPPED)", report["no_images"])
    _list("Rows needing manual review", warnings, limit=100)
    print("\n" + "=" * 70)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", default="/Users/admin/Documents/Approach Processed/Sorted Photographs",
                    help="Path to the Sorted Photographs folder")
    ap.add_argument("--out-dir", default=None,
                    help="Where to write the output files (default: the folder above --root)")
    ap.add_argument("--out-name", default="portfolio-import-from-sorted-photographs",
                    help="Output filename without extension")
    args = ap.parse_args()

    root = Path(args.root).expanduser()
    out_dir = Path(args.out_dir).expanduser() if args.out_dir else root.parent
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"Scanning: {root}")
    rows, report, warnings = walk_library(root)

    csv_path  = out_dir / f"{args.out_name}.csv"
    xlsx_path = out_dir / f"{args.out_name}.xlsx"

    write_csv(rows, csv_path)
    print(f"\nWrote CSV:  {csv_path}")
    if write_xlsx(rows, xlsx_path):
        print(f"Wrote XLSX: {xlsx_path}")

    print_report(report, warnings, rows)

    print(f"\nNext step: upload {csv_path.name} (or the .xlsx) at "
          f"/admin/import — but first make sure the same folder structure is "
          f"uploaded to your R2 bucket, since the image paths are relative "
          f"(e.g. \"2023/Aahar 2023 (Delhi)/TALOD/Hero-18-2.webp\").")


if __name__ == "__main__":
    main()
