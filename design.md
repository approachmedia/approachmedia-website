# Approach Media — Project Design Document

> **Purpose:** Instruction reference for AI platforms continuing development on this codebase.
> Covers architecture, data model, conventions, and critical constraints.

---

## 1. Project Overview

**Approach Media** is an exhibition stall design company based in India. This is their portfolio website — a dynamic CMS-driven Next.js 15 app that showcases completed exhibition booth projects.

**Business goals:**
- Display a portfolio of 500+ exhibition stall projects with images, specs, and case-study content
- Drive leads via SEO (city pages, service pages, portfolio detail pages)
- Allow non-technical staff to import and manage projects via an admin panel
- AI/LLM-optimised content fields for search engine visibility

**Repository:** `approachmedia/approachmedia-website`
**Branch for all development:** `claude/build-dynamic-cms-dqNrS`
**Deployment:** Railway (auto-deploys from the branch above)

---

## 2. Technology Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 15.3.2 |
| UI | React | 19 |
| Styling | Tailwind CSS | 3.4.17 |
| Database ORM | Prisma | 5.22.0 |
| Database | PostgreSQL | Railway-hosted |
| Media CDN | Cloudflare R2 | bucket: `ampl` |
| Validation | Zod + React Hook Form | 3.23.8 / 7.54.0 |
| Excel import | xlsx (SheetJS) | 0.18.5 |
| 2FA | otplib + qrcode | 13.4.1 / 1.5.4 |

---

## 3. Repository Layout

```
src/
  app/                        # Next.js App Router pages + API routes
    (public routes)/          # Home, /portfolio, /about, /contact, /services, etc.
    portfolio/[slug]/         # Individual project detail page
    portfolio/industry/[slug] # Industry filter page
    portfolio/type/[slug]     # Stall type filter page
    expos/[slug]/             # Exhibition detail page
    exhibition-*-{city}/      # 14 SEO city pages (exhibition designer/builder/design)
    admin/                    # Admin dashboard (auth-gated)
      page.tsx                # Dashboard with stats + project table
      login/                  # Cookie-based auth + TOTP 2FA
      portfolio/new/          # Create project form
      portfolio/[id]/edit/    # Edit project form
      import/                 # Excel bulk import UI
    api/admin/
      login/                  # POST auth + TOTP verify
      import/                 # GET preview + POST bulk import
      portfolio/route.ts      # GET list, POST create
      portfolio/[id]/         # GET, PATCH, DELETE single project
      portfolio/bulk-delete/  # POST bulk delete
      check-images/           # GET diagnostic — HTTP-tests all media URLs
      fix-image-urls/         # POST — idempotent re-encode all stored paths
  components/
    admin/                    # AdminProjectTable, PortfolioForm, MediaSection, etc.
    portfolio/                # ProjectCard, ProjectDetail, MasonryGallery, ScrollHero
    city/                     # CityPageTemplate + per-city data files
    site/                     # SiteChrome (layout shell), SiteHeader, SiteFooter
  lib/
    db/
      prisma.ts               # Singleton PrismaClient
      portfolio.ts            # getAdminProjectList(), getPortfolioPageData(), etc.
      config.ts               # getCdnBaseUrl(), buildMediaUrl()
    seo/
      schema-generator.ts     # JSON-LD schema.org generator for projects
    validations/
      portfolio.ts            # Zod schema for project create/edit form
prisma/
  schema.prisma               # Full database schema
portfolio-import-template.csv # 32-column CSV template for Excel import
```

---

## 4. Database Schema

### Core Models

```
Project                     # Central entity — one row per exhibition stall built
  ├── Client                # The company whose stall was built (findOrCreate on import)
  ├── Exhibition            # The trade show/expo where it was displayed (findOrCreate)
  ├── Media[]               # Images (hero + gallery). URLs stored as relative R2 paths
  ├── SeoMetadata           # 1:1 SEO fields including OG tags and keyword arrays
  ├── ProjectIndustry[]     # M:M junction to Industry (first = isPrimary)
  └── ProjectStallType[]    # M:M junction to StallType (first = isPrimary)

AppConfig                   # Key/value store — key 'media_cdn_base_url' drives all CDN URLs
```

### Key Project Fields

| Field | Type | Notes |
|---|---|---|
| `title` | VarChar(300) | Full display title |
| `slug` | VarChar(320) | URL slug — unique, used as import key |
| `description` | Text | **Required, non-nullable** — maps to "02 What We Designed" in Excel |
| `designBrief` | Text? | "01 The Challenge" in Excel |
| `aiSummary` | Text? | "03 Why It Worked" — ≤150 dense factual words, LLM-optimised |
| `stallAreaSqm` | Decimal(8,2) | Square metres |
| `stallAreaSqft` | Decimal(8,2) | Square feet |
| `stallHeightM` | Decimal(5,2) | Height in metres |
| `floors` | Int | Default 1 |
| `buildYear` | Int? | Year built |
| `city` | VarChar(100) | City where the show was held |
| `designStyle` | VarChar(150) | e.g. "Modern Energy Tech" |
| `materialsUsed` | Json | string[] — pipe-separated on import |
| `specialFeatures` | Json | string[] — pipe-separated on import |
| `awards` | Json | string[] — pipe-separated on import |
| `status` | String | "published" or "draft" ("final" in Excel → "published") |
| `isFeatured` | Boolean | Shown prominently on homepage |
| `displayOrder` | Int | Manual sort order |

### SeoMetadata VarChar Limits (ENFORCED at DB level)
| Field | Limit |
|---|---|
| `metaTitle` | 70 chars |
| `metaDescription` | 165 chars |
| `ogTitle` | 100 chars |
| `ogDescription` | 200 chars |

> The import route slices all four fields to these limits before insert.

---

## 5. Media / CDN Architecture

### How Images Are Stored

- **R2 bucket:** `ampl` at `https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev`
- **Stored in DB as:** relative paths, e.g. `2025/FITAG Tech Expo/Lenovo/hero.webp`
- **Full URLs built at render time** by `buildMediaUrl(path, cdnBase)` in `src/lib/db/config.ts`

### CDN Base URL Resolution Order

```
1. app_config table  (key = 'media_cdn_base_url')  — changeable without redeployment
2. MEDIA_CDN_BASE_URL env var
3. Hardcoded fallback: https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev
```

Uses `||` (not `??`) so empty strings fall through to the next level.
Result is cached with `unstable_cache` for 1 hour, cache key `media_cdn_base_url_v2`.

### `buildMediaUrl` — Idempotent URL Encoding

```typescript
// src/lib/db/config.ts
export function buildMediaUrl(path: string | null | undefined, cdnBase: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  // Recursively decode (handles double/triple encoding), then encode once
  const encoded = path.replace(/^\//, '').split('/').map(seg => {
    let s = seg
    try { while (s !== decodeURIComponent(s)) s = decodeURIComponent(s) } catch {}
    return encodeURIComponent(s)
  }).join('/')
  return `${base}/${encoded}`
}
```

**Critical:** Never single-pass encode paths from DB. They may have been encoded multiple times (e.g., `%2520` = double-encoded space). Always use `buildMediaUrl`.

### Folder Naming Convention in R2

```
{year}/{Exhibition Name}/{Client Name}/{filename}.webp
```

Example: `2025/FITAG Tech Expo/Lenovo/Lenovo-fitag-tech-expo-2025-stall-design.webp`

Folder names often contain spaces, ampersands, and mixed case — `buildMediaUrl` handles encoding.

---

## 6. Import System (Excel → Database)

### Flow

1. User uploads `.xlsx` file at `/admin/import`
2. Browser parses it client-side with `xlsx` (SheetJS)
3. GET `/api/admin/import?slugs=...` → returns which slugs already exist (shown as "Update images" in preview)
4. User clicks Import → POST `/api/admin/import` with all rows as JSON
5. Server iterates rows:
   - **Existing slug** → replace media only (delete old Media rows, insert new ones from Excel)
   - **New slug** → full project create with all related entities

### The 32-Column Schema (exact header names matter)

```
title | slug | client_name | exhibition_name | venue_name | city | country |
stall_area_sqm | stall_area_sqft | stall_height_m | floors | build_year |
design_style | materials_used | special_features | awards |
industries | stall_types | status | is_featured | display_order |
01 The Challenge | 02 What We Designed | 03 Why It Worked |
hero_image_url | hero_image_alt | hero_image_caption | gallery_images |
meta_title | meta_description | og_title | og_description
```

### Column Mapping Rules

| Column | Rule |
|---|---|
| `materials_used`, `special_features`, `awards`, `industries`, `stall_types`, `gallery_images` | Pipe-separated `\|` values |
| `status` | `"published"` or `"final"` → published; anything else → draft |
| `is_featured` | `"true"` (string) or `true` (boolean) |
| `hero_image_url` | Relative R2 path — primary hero image |
| `gallery_images` | Pipe-separated relative R2 paths |
| `country` | Stored on Exhibition only — no country field on Project |
| `01 The Challenge` | → `designBrief` |
| `02 What We Designed` | → `description` (required — must not be empty) |
| `03 Why It Worked` | → `aiSummary` |

### FindOrCreate Pattern

`client_name`, `exhibition_name`, `industries`, `stall_types` all use `findOrCreate`:
- Case-insensitive match first
- If not found: auto-generate slug via `slugify()`, create new record
- Slug collision handled with `-2`, `-3` suffix loop

---

## 7. Admin Authentication

- Cookie-based: `admin_auth=authenticated`
- TOTP 2FA enforced at login (otplib, 30-second TOTP)
- All `/api/admin/*` routes check cookie with `isAuthenticated()`
- All `/admin/*` pages check cookie server-side and redirect to `/admin/login`

---

## 8. Caching Strategy

| Cache | Key | TTL | Invalidated By |
|---|---|---|---|
| Portfolio page data | `portfolio-page-data-v2` | 5 min | `revalidateTag('projects')` |
| CDN base URL | `media_cdn_base_url_v2` | 1 hour | Manual (bump key) |
| All project pages | tag: `projects` | — | Import, fix-image-urls, bulk-delete |

`revalidateTag('projects')` is called at the end of every mutating API route.

All public pages use `export const dynamic = 'force-dynamic'` or `unstable_cache`.

---

## 9. SEO Architecture

### Public URL Structure
```
/portfolio                          # Full portfolio grid
/portfolio/{slug}                   # Project detail (dynamic OG image, schema.org)
/portfolio/industry/{slug}          # Filter by industry
/portfolio/type/{slug}              # Filter by stall type
/expos/{slug}                       # Exhibition page
/exhibition-stall-design-{city}     # City landing page (14 cities)
/exhibition-stall-designer-{city}   # City variant
/exhibition-stall-builder-{city}    # City variant
```

### Schema.org JSON-LD
Generated per project in `src/lib/seo/schema-generator.ts`. Includes:
- `Product` schema with physical specs
- `BreadcrumbList`
- `ImageObject` for hero image

---

## 10. Key Patterns and Conventions

### Server Components vs Client Components
- All data-fetching pages are **server components** (no `'use client'`)
- Interactive UI (forms, checkboxes, modals) are **client components** with `'use client'`
- `AdminProjectTable` is a client component for multi-select + bulk delete

### Tailwind Design System
- Dark admin UI: `bg-slate-900`, `border-slate-700`, `text-slate-400`
- Brand accent: `blue-600` / `blue-500` for primary actions
- Status badges: green = published, yellow = draft
- Featured projects: `★` yellow star prefix in tables

### API Route Conventions
```typescript
// All admin API routes follow this pattern:
async function isAuthenticated() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  // ... handler body
  revalidateTag('projects')
  return NextResponse.json({ ... })
}
```

### Prisma Singleton
```typescript
// src/lib/db/prisma.ts — always import from here
import { prisma } from '@/lib/db/prisma'
```

### Form Validation
All admin forms use **Zod schema + React Hook Form**:
- Schema defined in `src/lib/validations/portfolio.ts`
- `PortfolioForm` component handles both create and edit via `mode` prop

---

## 11. Diagnostic Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/admin/check-images` | GET | Lists all projects with `storedUrl`, `builtUrl`, and HTTP status code for each hero image |
| `/api/admin/fix-image-urls` | POST | Re-encodes all Media.url values idempotently (fixes double-encoding) |

Use `check-images` first to diagnose 404s before running `fix-image-urls`.

---

## 12. Deployment Notes

- **Platform:** Railway
- **Build command:** `npm run build` (Next.js standard)
- **Environment variables required:**
  - `DATABASE_URL` — PostgreSQL connection string
  - `MEDIA_CDN_BASE_URL` — R2 public URL (fallback if app_config row is missing)
  - `ADMIN_TOTP_SECRET` — Base32 TOTP secret for admin 2FA
- **DB migrations:** `npx prisma db push` (schema-push, not migrate — no migration files)

---

## 13. What NOT to Do

1. **Never double-encode image paths** — always use `buildMediaUrl()`, never manually concatenate CDN base + path
2. **Never use `??` to check CDN base URL** — empty string `''` passes `??` but is invalid; use `||`
3. **Never commit secrets** — DATABASE_URL, ADMIN_TOTP_SECRET, GitHub PAT must stay in env only
4. **Never push to `main`** — all development goes to `claude/build-dynamic-cms-dqNrS`
5. **Never skip `revalidateTag('projects')`** after any mutation — stale cache will serve old data
6. **Never use `prisma.project.update` for image re-import** — the update path in import only touches Media rows, not project fields
7. **`description` is non-nullable** — the import must always supply a non-empty value from "02 What We Designed"

---

## 14. Active Data Import Process

The user imports exhibition stall projects in batches via Excel:

- **File format:** `.xlsx`, 32 columns per the template `portfolio-import-template.csv`
- **Batch size:** ~137–200 rows per upload
- **Image hosting:** All images are pre-uploaded to R2 by the user; the Excel contains the relative paths
- **Re-import:** Uploading the same slug again updates only the media (hero + gallery), not text fields
- **After import:** Images should be verified via `/api/admin/check-images` — all should return HTTP 200

---

*Last updated: 2026-06-08. Based on session `session_01WbyU2oRikRoB1qZwX6KiNf`.*
