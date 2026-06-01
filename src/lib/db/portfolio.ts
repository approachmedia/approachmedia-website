import { prisma } from './prisma'
import type { ProjectWithRelations } from '@/lib/seo/schema-generator'
import type { ProjectInput } from '@/lib/validations/portfolio'

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

export async function getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      client:      { include: { industry: true } },
      exhibition:  true,
      media:       { orderBy: { displayOrder: 'asc' } },
      seoMetadata: true,
      industries:  { include: { industry: true } },
      stallTypes:  { include: { stallType: true } },
    },
  })
}

export async function getProjectById(id: number): Promise<ProjectWithRelations | null> {
  return prisma.project.findUnique({
    where: { id },
    include: {
      client:      { include: { industry: true } },
      exhibition:  true,
      media:       { orderBy: { displayOrder: 'asc' } },
      seoMetadata: true,
      industries:  { include: { industry: true } },
      stallTypes:  { include: { stallType: true } },
    },
  })
}

// ─── Portfolio index (public ISR page) ───────────────────────

export async function getPublishedProjects(opts?: { industrySlug?: string; stallTypeSlug?: string; limit?: number }) {
  return prisma.project.findMany({
    where: {
      status: 'published',
      ...(opts?.industrySlug && {
        industries: { some: { industry: { slug: opts.industrySlug } } },
      }),
      ...(opts?.stallTypeSlug && {
        stallTypes: { some: { stallType: { slug: opts.stallTypeSlug } } },
      }),
    },
    include: {
      client:     true,
      exhibition: true,
      media:      { where: { isHero: true }, take: 1 },
      industries: { where: { isPrimary: true }, include: { industry: true } },
      stallTypes: { where: { isPrimary: true }, include: { stallType: true } },
    },
    orderBy: [{ isFeatured: 'desc' }, { displayOrder: 'asc' }, { buildYear: 'desc' }],
    take: opts?.limit,
  })
}

export async function getAllPublishedSlugs() {
  const rows = await prisma.project.findMany({ where: { status: 'published' }, select: { slug: true } })
  return rows.map(r => r.slug)
}

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
  return prisma.project.findMany({
    select: {
      id: true, title: true, slug: true, status: true,
      isFeatured: true, buildYear: true, updatedAt: true,
      client:     { select: { name: true } },
      industries: { where: { isPrimary: true }, include: { industry: { select: { name: true } } } },
    },
    orderBy: { updatedAt: 'desc' },
  })
}
