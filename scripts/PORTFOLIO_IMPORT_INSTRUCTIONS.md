# Approach Media — Portfolio Import Instructions (for Claude Cowork)

## Goal

Turn the photo library at

```
/Users/admin/Documents/Approach Processed/Sorted Photographs
```

into an import-ready file for `/admin/import` on the Approach Media website
(`approachmedia-website-production.up.railway.app`), plus a set of
SEO-renamed photo copies ready to upload to Cloudflare R2. **Do not upload
anything automatically** — prepare the files and stop for review.

A ready-made script already does the mechanical parts of this. Run it first,
read the report it prints, then use this document only to fix anything the
report flags (bad Hero filenames, unmatched industries, etc.) and to
understand exactly what it produced and why.

---

## Step 0 — Run the script

The repo root for this project (already on this Mac, or clone it if not)
contains:

```
scripts/build_portfolio_import.py
```

Run it with Python 3 (already on macOS — no other setup needed for the CSV;
see the optional Excel note below):

```bash
cd <path to the website repo>/scripts
python3 build_portfolio_import.py
```

It defaults to exactly the folder in this document. If your library is
somewhere else, pass `--root "/full/path/to/Sorted Photographs"`.

**What it does, automatically, in one pass:**

1. Walks `Sorted Photographs/<year>/<exhibition (city)>/<company>/`.
2. Skips any folder with `(Don't Use This)` in its name, and any `Duplicate`
   folder, at any depth — completely, no photos from those folders are used.
3. Finds the file starting with `Hero` in each company folder and parses
   `Hero-<size>-<sides>` (e.g. `Hero-18-2.webp` → 18 sqm, 2 open sides).
4. Copies (never moves — **your originals are never touched**) the Hero
   photo + every other real gallery photo in that company folder into a
   fresh folder:
   ```
   Sorted Photographs - SEO Ready/<year>/<exhibition-slug>/<company-slug>/
   ```
   with SEO filenames in the exact convention already live on the site:
   ```
   <company>-<exhibition>-<city>-<size>-sqm-<sides>-side-open-stall-
   exhibition-stall-design-fabrication-approach-media-<NN>.<ext>
   ```
   (`-01` is always the hero photo; `-02`, `-03`, … are the gallery, in
   filename order.)
5. Writes `portfolio-import-from-sorted-photographs.csv` (always) and
   `.xlsx` (if `openpyxl` is installed — `pip3 install openpyxl` if you want
   it; the CSV alone works fine on `/admin/import`, which accepts either).
6. Prints a full report: projects created, `(Don't Use This)` folders
   skipped, `Duplicate` folders skipped, folders with no images, folders
   with no Hero file (**these are skipped — no row is created for them**),
   and every row flagged for manual review (unparsable Hero filename,
   un-inferrable industry, unusual open-sides count).

Read that report before doing anything else. If it lists projects you
expected to see under "no Hero image" or "no usable images", that folder
needs a look before re-running.

---

## Step 1 — Fix anything the report flags

The report is the actual source of truth for what needs manual attention.
Common fixes:

- **"Folders missing a Hero image"** — no file in that company folder
  starts with `Hero`. Rename the correct photo to `Hero-<size>-<sides>.ext`
  (or just `Hero-<something>` if size/sides are genuinely unknown — the row
  will still be created, just flagged) and re-run.
- **"hero file doesn't match Hero-<size>-<sides>"** — the Hero file exists
  but its name doesn't parse (e.g. plain `Hero.jpg`, or `Hero-final.jpg`).
  The row is still created using that photo as the hero; just the stall
  size/type columns are left blank. Fill `stall_area_sqm` and `stall_types`
  in manually in the CSV/Excel if you know them, or rename the source file
  to the correct pattern and re-run.
- **"industry could not be inferred"** — the script only guesses industry
  from lightweight keyword matching against the site's own 34 canonical
  industries (listed at the top of the script). It will never invent one.
  Fill in the `industries` column by hand for these rows using one of the
  exact names from that list (case doesn't matter — the importer
  matches case-insensitively and creates the industry if truly new, but
  reusing an existing name avoids creating a near-duplicate).

---

## Column reference (so you can hand-edit the CSV/Excel confidently)

This mirrors `scripts/portfolio-import-template.csv` in the repo exactly —
that file is the source of truth if this document and the file ever
disagree.

| Column | Meaning | Notes |
|---|---|---|
| `title` | Project title shown on the portfolio page | Auto-generated as `<Company> <size> sqm <sides>-side open Exhibition Stall Design at <Exhibition>, <City> <Year>` |
| `slug` | URL slug (`/portfolio/<slug>`) | Auto-generated, deduplicated automatically if two folders would collide |
| `client_name` | Client/company name | From the company folder name |
| `exhibition_name` | Exhibition/trade show name | From the exhibition folder name, with `(City)` stripped |
| `venue_name` | Venue | Not knowable from folders — left blank, fill in if known |
| `city` | City | Parsed from `(City)` in the exhibition folder name |
| `country` | Country | Always `India` |
| `stall_area_sqm` / `stall_area_sqft` | Stall size | From the Hero filename |
| `stall_height_m`, `floors` | Not derivable from folders — left blank |
| `build_year` | Year | From the year folder |
| `design_style`, `materials_used`, `special_features`, `awards` | Left blank — **never fabricated**. Fill in by hand only if you actually know these facts for a project. |
| `industries` | One of the site's 34 canonical industries | Best-effort keyword guess; blank rows need a manual pick |
| `stall_types` | `1 Side Open` … `4 Side Open` | Mapped directly from the Hero filename's `<sides>` number |
| `status` | Always `final` | Imports as "published" |
| `is_featured`, `display_order` | Left blank (defaults to not-featured, order 0) | Use the admin's bulk "★ Featured Projects" button after import instead of setting this here |
| `01 The Challenge` | Design Brief | Short factual sentence from company/exhibition/size/sides only |
| `02 What We Designed` | Full Description | Same — factual only |
| `03 Why It Worked` | AI Summary | Same — factual only |
| `hero_image_url` | Relative path to the hero photo | Points at the **SEO Ready** export folder |
| `hero_image_alt`, `hero_image_caption` | Alt text / caption | Auto-generated from company/exhibition/city/year |
| `gallery_images` | Pipe-separated relative paths | Same SEO Ready convention |
| `meta_title`, `meta_description`, `og_title`, `og_description` | SEO metadata | Auto-generated, truncated to Google's length limits (70 / 165 chars) |

**Do not rename or reorder any column header** — the importer matches on
these exact header strings.

---

## Step 2 — Upload the photos to R2

Upload the **entire contents** of:

```
Sorted Photographs - SEO Ready/
```

to the Cloudflare R2 bucket, preserving the folder structure exactly as it
is on disk (`<year>/<exhibition-slug>/<company-slug>/<file>`). The website
resolves `hero_image_url` / `gallery_images` as *relative* paths against the
CDN base URL — if the folder structure on R2 doesn't match what's in the
CSV byte-for-byte, images will 404 even though the project imports fine.

---

## Step 3 — Import

1. Go to `/admin/import` on the site.
2. Upload `portfolio-import-from-sorted-photographs.csv` (or the `.xlsx`).
3. Check the preview counts (new vs. existing) look right, then click
   **Import**.
4. Check the results list for any `error` rows and fix + re-upload just
   those if needed (re-uploading an existing slug only updates its images,
   so it's always safe to re-run).

---

## Why photos are renamed the way they are

The naming pattern isn't arbitrary — it matches a proven, already-live
convention on the production site (see the "Next View" project inside
`src/app/api/admin/seed/route.ts` for a real example:
`next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-
exhibition-stall-design-fabrication-approach-media-01.webp`). Every segment
is a real, factual keyword (client, exhibition, city, stall size, stall
type) plus the "exhibition stall design fabrication approach media"
keyword phrase the business wants to rank for — no generic `IMG_1234.jpg`
survives into production, and nothing is invented that isn't in the folder
name itself.
