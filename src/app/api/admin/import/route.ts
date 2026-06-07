import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db/prisma'

async function isAuthenticated() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

function slugify(text: string) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 220)
}

function splitPipe(val: unknown): string[] {
  if (!val) return []
  return String(val).split('|').map(s => s.trim()).filter(Boolean)
}

function str(val: unknown): string { return val ? String(val).trim() : '' }
function num(val: unknown): number | null {
  const n = parseFloat(String(val ?? ''))
  return isNaN(n) ? null : n
}
function int(val: unknown): number | null {
  const n = parseInt(String(val ?? ''))
  return isNaN(n) ? null : n
}

async function findOrCreateIndustry(name: string) {
  const existing = await prisma.industry.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
  if (existing) return existing.id
  let base = slugify(name), slug = base
  for (let i = 2; await prisma.industry.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`
  return (await prisma.industry.create({ data: { name, slug } })).id
}

async function findOrCreateStallType(name: string) {
  const existing = await prisma.stallType.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
  if (existing) return existing.id
  let base = slugify(name), slug = base
  for (let i = 2; await prisma.stallType.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`
  return (await prisma.stallType.create({ data: { name, slug } })).id
}

async function findOrCreateClient(name: string) {
  const existing = await prisma.client.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
  if (existing) return existing.id
  let base = slugify(name), slug = base
  for (let i = 2; await prisma.client.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`
  return (await prisma.client.create({ data: { name, slug } })).id
}

async function findOrCreateExhibition(name: string, venueName: string, city: string, country: string) {
  const existing = await prisma.exhibition.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
  if (existing) return existing.id
  let base = slugify(name), slug = base
  for (let i = 2; await prisma.exhibition.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`
  return (await prisma.exhibition.create({ data: { name, slug, venueName: venueName || null, city: city || null, country: country || 'India' } })).id
}

// ── GET: preview existing slugs ───────────────────────────────────────────────
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const slugsParam = request.nextUrl.searchParams.get('slugs') ?? ''
  const slugs = slugsParam.split(',').map(s => s.trim()).filter(Boolean)
  const existing = await prisma.project.findMany({ where: { slug: { in: slugs } }, select: { slug: true } })
  return NextResponse.json({ existing: existing.map(p => p.slug) })
}

// ── POST: import rows ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { rows } = await request.json() as { rows: Record<string, unknown>[] }
  const results: { slug: string; status: 'created' | 'skipped' | 'error'; message?: string }[] = []

  for (const row of rows) {
    const slug = str(row.slug)
    if (!slug) continue

    try {
      // Skip if slug already exists
      const exists = await prisma.project.findUnique({ where: { slug }, select: { id: true } })
      if (exists) { results.push({ slug, status: 'skipped' }); continue }

      // Related entities
      const clientId     = str(row.client_name)     ? await findOrCreateClient(str(row.client_name))                                                                             : null
      const exhibitionId = str(row.exhibition_name) ? await findOrCreateExhibition(str(row.exhibition_name), str(row.venue_name), str(row.city), str(row.country) || 'India') : null
      const industryIds  = (await Promise.all(splitPipe(row.industries).map(findOrCreateIndustry))).filter((id): id is number => id !== null)
      const stallTypeIds = (await Promise.all(splitPipe(row.stall_types).map(findOrCreateStallType))).filter((id): id is number => id !== null)

      // Content — 3-section columns override legacy technical fields
      const description  = str(row['02 What We Designed']) || str(row.description)
      const designBrief  = str(row['01 The Challenge'])     || str(row.design_brief)  || null
      const aiSummary    = str(row['03 Why It Worked'])      || str(row.ai_summary)    || null

      // Status: "final" → "published"
      const rawStatus = str(row.status).toLowerCase()
      const status    = (rawStatus === 'final' || rawStatus === 'published') ? 'published' : 'draft'

      // Images — prefer SEO-renamed paths; relative paths are stored as-is (CDN base prepended at render)
      const heroPath    = str(row.hero_image_new_path_SEO) || str(row.hero_image_url)
      const galleryRaw  = str(row.gallery_new_paths_SEO)   || str(row.gallery_images)
      const galleryPaths = splitPipe(galleryRaw)

      // SEO keywords
      const primaryKw    = str(row.primary_keyword)
      const secondaryKws = splitPipe(row.secondary_keywords)

      await prisma.project.create({
        data: {
          title:           str(row.title),
          slug,
          city:            str(row.city)     || null,
          stallAreaSqm:    num(row.stall_area_sqm),
          stallAreaSqft:   num(row.stall_area_sqft),
          stallHeightM:    num(row.stall_height_m),
          floors:          int(row.floors)   ?? 1,
          buildYear:       int(row.build_year),
          description,
          designBrief,
          aiSummary,
          designStyle:     str(row.design_style) || null,
          materialsUsed:   splitPipe(row.materials_used),
          specialFeatures: splitPipe(row.special_features),
          awards:          splitPipe(row.awards),
          status,
          isFeatured:      row.is_featured === true || str(row.is_featured).toLowerCase() === 'true',
          displayOrder:    int(row.display_order) ?? 0,
          clientId,
          exhibitionId,
          industries: industryIds.length > 0 ? { create: industryIds.map((id, i) => ({ industryId: id, isPrimary: i === 0 })) } : undefined,
          stallTypes:  stallTypeIds.length > 0 ? { create: stallTypeIds.map((id, i) => ({ stallTypeId: id, isPrimary: i === 0 })) } : undefined,
          media: {
            create: [
              ...(heroPath ? [{
                mediaType:    'image' as const,
                url:          heroPath,
                altText:      str(row.hero_image_alt) || str(row.title),
                caption:      str(row.hero_image_caption) || null,
                isHero:       true,
                displayOrder: 0,
              }] : []),
              ...galleryPaths.map((path, i) => ({
                mediaType:    'image' as const,
                url:          path,
                altText:      `${str(row.title)} — photo ${i + 2}`,
                isHero:       false,
                displayOrder: i + 1,
              })),
            ],
          },
          ...((str(row.meta_title) || primaryKw) ? {
            seoMetadata: {
              create: {
                metaTitle:        str(row.meta_title).slice(0, 70)   || null,
                metaDescription:  str(row.meta_description).slice(0, 165) || null,
                ogTitle:          str(row.og_title)       || null,
                ogDescription:    str(row.og_description) || null,
                primaryKeywords:  primaryKw ? [primaryKw] : [],
                secondaryKeywords: secondaryKws,
              },
            },
          } : {}),
        },
      })

      results.push({ slug, status: 'created' })
    } catch (e) {
      results.push({ slug, status: 'error', message: String(e).slice(0, 200) })
    }
  }

  return NextResponse.json({
    results,
    summary: {
      created: results.filter(r => r.status === 'created').length,
      skipped: results.filter(r => r.status === 'skipped').length,
      errors:  results.filter(r => r.status === 'error').length,
    },
  })
}
