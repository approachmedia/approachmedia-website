/**
 * One-shot portfolio importer, run from the container CMD after `prisma db
 * push` and before `next start`. It exists because the admin importer at
 * /admin/import cannot be driven from the development container (the live
 * site is unreachable from there), so batches prepared in the established
 * import-sheet format are committed under data/portfolio-import/ and loaded
 * here, on the deploy, where DATABASE_URL points at the real database.
 *
 * Row handling mirrors /api/admin/import exactly, with two deliberate
 * differences for unattended runs:
 *  - create-only: a slug that already exists is skipped, never touched;
 *  - each batch file runs once, ever. A marker row in app_config
 *    (portfolio_import:<file name>) records completion, so a project the
 *    owner later deletes stays deleted on every future deploy. That is the
 *    failure mode that got seeding removed from this CMD once before.
 *
 * Never exits non-zero: the site must start (and pass its healthcheck)
 * whatever happens here.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import prismaPkg from '@prisma/client'

const { PrismaClient } = prismaPkg
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'portfolio-import')

const slugify = t => t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 220)
const splitPipe = v => v ? String(v).split('|').map(s => s.trim()).filter(Boolean) : []
const str = v => v ? String(v).trim() : ''
const num = v => { const n = parseFloat(String(v ?? '')); return isNaN(n) ? null : n }
const int = v => { const n = parseInt(String(v ?? '')); return isNaN(n) ? null : n }

async function findOrCreate(model, name, extra = {}) {
  const existing = await model.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
  if (existing) return existing.id
  const base = slugify(name)
  let slug = base
  for (let i = 2; await model.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`
  return (await model.create({ data: { name, slug, ...extra } })).id
}

async function importRow(prisma, row) {
  const slug = str(row.slug)
  if (!slug) return 'skipped (no slug)'
  if (await prisma.project.findUnique({ where: { slug }, select: { id: true } })) return 'skipped (exists)'

  const heroPath = str(row.hero_image_url) || str(row.hero_image_new_path_SEO)
  const galleryPaths = splitPipe(str(row.gallery_images) || str(row.gallery_new_paths_SEO))

  const clientId = str(row.client_name) ? await findOrCreate(prisma.client, str(row.client_name)) : null
  const exhibitionId = str(row.exhibition_name)
    ? await findOrCreate(prisma.exhibition, str(row.exhibition_name), {
        venueName: str(row.venue_name) || null, city: str(row.city) || null, country: str(row.country) || 'India',
      })
    : null
  const industryIds = []
  for (const name of splitPipe(row.industries)) industryIds.push(await findOrCreate(prisma.industry, name))
  const stallTypeIds = []
  for (const name of splitPipe(row.stall_types)) stallTypeIds.push(await findOrCreate(prisma.stallType, name))

  const rawStatus = str(row.status).toLowerCase()
  const primaryKws = splitPipe(row.primary_keywords)
  const legacyKw = str(row.primary_keyword)
  const primaryKwList = primaryKws.length > 0 ? primaryKws : (legacyKw ? [legacyKw] : [])

  await prisma.project.create({
    data: {
      title: str(row.title),
      slug,
      city: str(row.city) || null,
      stallAreaSqm: num(row.stall_area_sqm),
      stallAreaSqft: num(row.stall_area_sqft),
      stallHeightM: num(row.stall_height_m),
      floors: int(row.floors) ?? 1,
      buildYear: int(row.build_year),
      description: str(row['02 What We Designed']) || str(row.description),
      designBrief: str(row['01 The Challenge']) || str(row.design_brief) || null,
      aiSummary: str(row['03 Why It Worked']) || str(row.ai_summary) || null,
      designStyle: str(row.design_style) || null,
      materialsUsed: splitPipe(row.materials_used),
      specialFeatures: splitPipe(row.special_features),
      awards: splitPipe(row.awards),
      status: (rawStatus === 'final' || rawStatus === 'published') ? 'published' : 'draft',
      isFeatured: row.is_featured === true || str(row.is_featured).toLowerCase() === 'true',
      displayOrder: int(row.display_order) ?? 0,
      clientId,
      exhibitionId,
      industries: industryIds.length > 0 ? { create: industryIds.map((id, i) => ({ industryId: id, isPrimary: i === 0 })) } : undefined,
      stallTypes: stallTypeIds.length > 0 ? { create: stallTypeIds.map((id, i) => ({ stallTypeId: id, isPrimary: i === 0 })) } : undefined,
      media: {
        create: [
          ...(heroPath ? [{
            mediaType: 'image', url: heroPath,
            altText: str(row.hero_image_alt) || str(row.title),
            caption: str(row.hero_image_caption) || null,
            isHero: true, displayOrder: 0,
          }] : []),
          ...galleryPaths.map((path, i) => ({
            mediaType: 'image', url: path,
            altText: `${str(row.title)} — photo ${i + 2}`,
            isHero: false, displayOrder: i + 1,
          })),
        ],
      },
      ...((str(row.meta_title) || primaryKwList.length > 0) ? {
        seoMetadata: {
          create: {
            metaTitle: str(row.meta_title).slice(0, 70) || null,
            metaDescription: str(row.meta_description).slice(0, 165) || null,
            ogTitle: str(row.og_title).slice(0, 100) || null,
            ogDescription: str(row.og_description).slice(0, 200) || null,
            aiContextSummary: str(row.ai_context_summary) || null,
            focusEntities: splitPipe(row.focus_entities),
            primaryKeywords: primaryKwList,
            secondaryKeywords: splitPipe(row.secondary_keywords),
          },
        },
      } : {}),
    },
  })
  return 'created'
}

async function main() {
  const prisma = new PrismaClient()
  try {
    let files = []
    try { files = readdirSync(DATA_DIR).filter(f => f.endsWith('.json')).sort() } catch { /* no batches */ }
    for (const file of files) {
      const markerKey = `portfolio_import:${file}`
      if (await prisma.appConfig.findUnique({ where: { key: markerKey } })) {
        console.log(`[import-portfolio] ${file}: already imported, skipping`)
        continue
      }
      const rows = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf8'))
      console.log(`[import-portfolio] ${file}: ${rows.length} rows`)
      let created = 0
      for (const row of rows) {
        try {
          const result = await importRow(prisma, row)
          if (result === 'created') created++
          console.log(`[import-portfolio]   ${str(row.slug) || '(no slug)'}: ${result}`)
        } catch (e) {
          console.log(`[import-portfolio]   ${str(row.slug)}: ERROR ${String(e).slice(0, 200)}`)
        }
      }
      await prisma.appConfig.upsert({
        where: { key: markerKey },
        create: { key: markerKey, value: `imported ${created}/${rows.length} on ${new Date().toISOString()}`, description: 'One-shot portfolio batch import marker. Delete this row to allow the batch to import again on the next deploy.' },
        update: { value: `imported ${created}/${rows.length} on ${new Date().toISOString()}` },
      })
      console.log(`[import-portfolio] ${file}: done, ${created} created`)
    }
  } catch (e) {
    console.log(`[import-portfolio] fatal (site will still start): ${String(e).slice(0, 300)}`)
  } finally {
    await prisma.$disconnect().catch(() => {})
  }
}

main()
