import { cache } from 'react'
import { prisma } from './prisma'
import { getCdnBaseUrl, buildMediaUrl } from './config'
import type { ProjectWithRelations } from '@/lib/seo/schema-generator'
import type { ProjectInput } from '@/lib/validations/portfolio'

function resolveMediaUrls<T extends { media: { url: string; cdnUrl: string | null; thumbnailUrl: string | null }[] }>(
  project: T,
  cdnBase: string,
): T {
  return {
    ...project,
    media: project.media.map(m => ({
      ...m,
      url:          buildMediaUrl(m.url, cdnBase),
      cdnUrl:       m.cdnUrl       ? buildMediaUrl(m.cdnUrl, cdnBase)       : m.cdnUrl,
      thumbnailUrl: m.thumbnailUrl ? buildMediaUrl(m.thumbnailUrl, cdnBase) : m.thumbnailUrl,
    })),
  }
}

// ─── Lookups (used to populate form dropdowns) ───────────────

export async function getLookups() {
  const [industries, stallTypes, exhibitions, clients] = await Promise.all([
    prisma.industry.findMany({ orderBy: { name: 'asc' } }),
    prisma.stallType.findMany({ orderBy: { name: 'asc' } }),
    prisma.exhibition.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.client.findMany({ orderBy: { name: 'asc' } }),
  ])
  return { industries, stallTypes, exhibitions, clients }
}

// ─── Single project (public + admin) ─────────────────────────

// cache() deduplicates calls within the same request — generateMetadata and the page
// component both call this, so without cache() it would hit the DB twice per page load.
export const getProjectBySlug = cache(async function getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
  const [project, cdnBase] = await Promise.all([
    prisma.project.findUnique({
      where: { slug },
      include: {
        client:      { include: { industry: true } },
        exhibition:  true,
        media:       { orderBy: { displayOrder: 'asc' } },
        seoMetadata: true,
        industries:  { include: { industry: true } },
        stallTypes:  { include: { stallType: true } },
      },
    }),
    getCdnBaseUrl(),
  ])
  if (!project) return null
  return resolveMediaUrls(project, cdnBase)
})

export async function getProjectById(id: number): Promise<ProjectWithRelations | null> {
  const [project, cdnBase] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        client:      { include: { industry: true } },
        exhibition:  true,
        media:       { orderBy: { displayOrder: 'asc' } },
        seoMetadata: true,
        industries:  { include: { industry: true } },
        stallTypes:  { include: { stallType: true } },
      },
    }),
    getCdnBaseUrl(),
  ])
  if (!project) return null
  return resolveMediaUrls(project, cdnBase)
}

// ─── Portfolio index (public ISR page) ───────────────────────

export async function getPublishedProjects(opts?: { industrySlug?: string; stallTypeSlug?: string; city?: string; limit?: number; featured?: boolean }) {
  const cdnBase = await getCdnBaseUrl()
  const rows = await prisma.project.findMany({
    where: {
      status: 'published',
      ...(opts?.featured && { isFeatured: true }),
      ...(opts?.industrySlug && {
        industries: { some: { industry: { slug: opts.industrySlug } } },
      }),
      ...(opts?.stallTypeSlug && {
        stallTypes: { some: { stallType: { slug: opts.stallTypeSlug } } },
      }),
      ...(opts?.city && {
        OR: [
          { city: { contains: opts.city, mode: 'insensitive' as const } },
          { exhibition: { city: { contains: opts.city, mode: 'insensitive' as const } } },
        ],
      }),
    },
    include: {
      client:     true,
      exhibition: true,
      media:      { where: { isHero: true }, take: 1 },
      industries: { where: { isPrimary: true }, include: { industry: true } },
      stallTypes: { where: { isPrimary: true }, include: { stallType: true } },
    },
    // Newest year first. Postgres sorts NULLs first on DESC, which floated
    // undated projects above the latest work — nulls: 'last' keeps them at
    // the end. Featured/displayOrder still rank within a year, and id is a
    // stable tiebreak so the grid does not reshuffle between requests.
    orderBy: [
      { buildYear: { sort: 'desc', nulls: 'last' } },
      { isFeatured: 'desc' },
      { displayOrder: 'asc' },
      { id: 'desc' },
    ],
    take: opts?.limit,
  })
  return rows.map(p => resolveMediaUrls(p, cdnBase))
}

/**
 * Clients we have built a large stall for, biggest first.
 *
 * Used by the homepage clientele marquee. Names are tidied for display —
 * legal suffixes ("Pvt. Ltd."), parenthetical sub-brands and everything
 * after a dash are dropped, so "Tatsav (Patidar Exports Pvt. Ltd.)" shows
 * as "Tatsav". Variants that collapse onto the same (or a longer form of
 * the same) name are shown once.
 */
export async function getMajorClients(minSqm = 70) {
  const rows = await prisma.project.findMany({
    where: { status: 'published', stallAreaSqm: { gt: minSqm }, client: { isNot: null } },
    select: { stallAreaSqm: true, client: { select: { name: true } } },
    orderBy: { stallAreaSqm: 'desc' },
  })

  const byName = new Map<string, { name: string; sqm: number }>()
  for (const r of rows) {
    const name = displayClientName(r.client!.name)
    if (!name) continue
    const sqm = Number(r.stallAreaSqm ?? 0)
    const seen = byName.get(name.toLowerCase())
    if (!seen || sqm > seen.sqm) byName.set(name.toLowerCase(), { name, sqm })
  }

  // Collapse "Zedtech Water Solution" into "Zedtech" when both are present.
  // Word-boundary prefixes only, so "Venus" never swallows "Venusgear".
  const kept = [...byName.values()]
  const names = kept
    .filter(a => !kept.some(b => b !== a && a.name.toLowerCase().startsWith(b.name.toLowerCase() + ' ')))
    .sort((a, b) => b.sqm - a.sqm)

  return names.map(n => n.name)
}

function displayClientName(raw: string) {
  return raw
    .replace(/\s*\([^)]*\)/g, '')                                   // "(Serenity Circles)"
    .replace(/\s+[-–—]\s+.*$/, '')                                  // "HXG - Tangshan Hexiang…"
    .replace(/[,\s]*\b(pvt|private)\.?\s*(ltd|limited)\.?$/i, '')   // "Pvt. Ltd."
    .replace(/[,\s]*\b(ltd|limited|llp|inc)\.?$/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export type AdjacentProject = {
  slug:  string
  title: string
  image: string | null
}

/**
 * The projects either side of `slug` in the portfolio index, for the
 * previous/next links on a project page.
 *
 * Ordered identically to getPublishedProjects, so "next" always means the
 * card that follows it in the grid. Selects only what the link needs — at
 * a few hundred projects that is a cheap query, and the page caches it.
 */
export async function getAdjacentProjects(slug: string) {
  const [rows, cdnBase] = await Promise.all([
    prisma.project.findMany({
      where:  { status: 'published' },
      select: {
        slug: true,
        title: true,
        media: { where: { isHero: true }, take: 1, select: { url: true, cdnUrl: true, thumbnailUrl: true } },
      },
      orderBy: [
        { buildYear: { sort: 'desc', nulls: 'last' } },
        { isFeatured: 'desc' },
        { displayOrder: 'asc' },
        { id: 'desc' },
      ],
    }),
    getCdnBaseUrl(),
  ])

  const i = rows.findIndex(r => r.slug === slug)
  if (i === -1) return { prev: null, next: null }

  const toLink = (r: (typeof rows)[number] | undefined): AdjacentProject | null => {
    if (!r) return null
    const hero = r.media[0]
    return {
      slug:  r.slug,
      title: r.title,
      image: hero ? buildMediaUrl(hero.cdnUrl ?? hero.url, cdnBase) : null,
    }
  }

  // Wrap around, so the first and last project are never dead ends.
  return {
    prev: toLink(rows[i - 1] ?? (rows.length > 1 ? rows[rows.length - 1] : undefined)),
    next: toLink(rows[i + 1] ?? (rows.length > 1 ? rows[0] : undefined)),
  }
}

export async function getAllPublishedSlugs() {
  const rows = await prisma.project.findMany({ where: { status: 'published' }, select: { slug: true } })
  return rows.map(r => r.slug)
}

/**
 * Slug, title and city for every published project — the corpus the legacy
 * /casestudy redirects are matched against. Title and city are included
 * because the migration regenerated slugs from titles, so an old WordPress
 * slug often shares wording with the title rather than with the new slug.
 */
export const getLegacyMatchCandidates = cache(async function getLegacyMatchCandidates() {
  return prisma.project.findMany({
    where: { status: 'published' },
    select: { slug: true, title: true, city: true },
  })
})

// ─── Create project ───────────────────────────────────────────

export async function createProject(data: ProjectInput) {
  const { industryIds, stallTypeIds, media, seoMetadata, ...core } = data

  return prisma.project.create({
    data: {
      ...core,
      stallAreaSqm:    core.stallAreaSqm  !== undefined ? core.stallAreaSqm  : undefined,
      stallAreaSqft:   core.stallAreaSqft !== undefined ? core.stallAreaSqft : undefined,
      stallHeightM:    core.stallHeightM  !== undefined ? core.stallHeightM  : undefined,
      materialsUsed:   core.materialsUsed   ?? [],
      specialFeatures: core.specialFeatures ?? [],
      awards:          core.awards          ?? [],
      industries: {
        create: industryIds.map((id, i) => ({ industryId: id, isPrimary: i === 0 })),
      },
      stallTypes: {
        create: stallTypeIds.map((id, i) => ({ stallTypeId: id, isPrimary: i === 0 })),
      },
      ...(media && media.length > 0 && {
        media: { create: media },
      }),
      ...(seoMetadata && {
        seoMetadata: { create: seoMetadata },
      }),
    },
  })
}

// ─── Update project ───────────────────────────────────────────

export async function updateProject(id: number, data: Partial<ProjectInput>) {
  const { industryIds, stallTypeIds, media, seoMetadata, ...core } = data

  return prisma.$transaction(async tx => {
    if (industryIds) {
      await tx.projectIndustry.deleteMany({ where: { projectId: id } })
      await tx.projectIndustry.createMany({
        data: industryIds.map((iid, i) => ({ projectId: id, industryId: iid, isPrimary: i === 0 })),
      })
    }
    if (stallTypeIds) {
      await tx.projectStallType.deleteMany({ where: { projectId: id } })
      await tx.projectStallType.createMany({
        data: stallTypeIds.map((sid, i) => ({ projectId: id, stallTypeId: sid, isPrimary: i === 0 })),
      })
    }
    // Replace media wholesale when the form sends a media array. Undefined means
    // "not editing media" (leave as-is); an empty array means "remove all media".
    if (media) {
      await tx.media.deleteMany({ where: { projectId: id } })
      if (media.length > 0) {
        await tx.media.createMany({
          data: media.map(m => ({
            projectId:    id,
            mediaType:    m.mediaType,
            url:          m.url,
            cdnUrl:       m.cdnUrl       || null,
            thumbnailUrl: m.thumbnailUrl || null,
            altText:      m.altText,
            caption:      m.caption      || null,
            titleAttr:    m.titleAttr    || null,
            displayOrder: m.displayOrder ?? 0,
            isHero:       m.isHero       ?? false,
            isThumbnail:  m.isThumbnail  ?? false,
            widthPx:      m.widthPx      ?? null,
            heightPx:     m.heightPx     ?? null,
            fileSizeKb:   m.fileSizeKb   ?? null,
            mimeType:     m.mimeType     || null,
          })),
        })
      }
    }
    if (seoMetadata) {
      await tx.seoMetadata.upsert({
        where:  { projectId: id },
        update: seoMetadata,
        create: { ...seoMetadata, projectId: id },
      })
    }
    return tx.project.update({ where: { id }, data: { ...core, updatedAt: new Date() } })
  })
}

// ─── Inline create: Client & Exhibition (used by combobox) ────

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 220)
}

export async function createClient(data: { name: string; industryId?: number; websiteUrl?: string }) {
  let base = slugify(data.name)
  let slug = base
  // ensure unique slug
  for (let i = 2; await prisma.client.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`
  }
  return prisma.client.create({
    data: {
      name:       data.name.trim(),
      slug,
      industryId: data.industryId,
      websiteUrl: data.websiteUrl || null,
    },
  })
}

export async function createExhibition(data: { name: string; city?: string; venueName?: string; startDate?: Date }) {
  let base = slugify(data.name)
  let slug = base
  for (let i = 2; await prisma.exhibition.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`
  }
  return prisma.exhibition.create({
    data: {
      name:      data.name.trim(),
      slug,
      city:      data.city || null,
      venueName: data.venueName || null,
      startDate: data.startDate,
    },
  })
}

// ─── Admin list ───────────────────────────────────────────────

export async function getAdminProjectList() {
  const [rows, cdnBase] = await Promise.all([
    prisma.project.findMany({
      select: {
        id: true, title: true, slug: true, status: true,
        isFeatured: true, buildYear: true, updatedAt: true,
        client:     { select: { name: true } },
        exhibition: { select: { name: true } },
        industries: { where: { isPrimary: true }, select: { industryId: true } },
        stallTypes: { where: { isPrimary: true }, select: { stallTypeId: true } },
        media: {
          take: 1,
          orderBy: [{ isHero: 'desc' }, { displayOrder: 'asc' }],
          select: { url: true, cdnUrl: true, thumbnailUrl: true, altText: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    getCdnBaseUrl(),
  ])

  return rows.map(p => {
    const m = p.media[0]
    const thumbnail = m
      ? buildMediaUrl(m.thumbnailUrl || m.cdnUrl || m.url, cdnBase)
      : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      isFeatured: p.isFeatured,
      buildYear: p.buildYear,
      client: p.client,
      exhibition: p.exhibition,
      industryId:  p.industries[0]?.industryId  ?? null,
      stallTypeId: p.stallTypes[0]?.stallTypeId ?? null,
      thumbnail,
      thumbnailAlt: m?.altText ?? p.title,
    }
  })
}
