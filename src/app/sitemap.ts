import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db/prisma'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, industries, stallTypes] = await Promise.all([
    prisma.project.findMany({
      where:  { status: 'published' },
      select: { slug: true, updatedAt: true, isFeatured: true },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.industry.findMany({ select: { slug: true } }),
    prisma.stallType.findMany({ select: { slug: true } }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/portfolio`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/services`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map(p => ({
    url:             `${SITE_URL}/portfolio/${p.slug}`,
    lastModified:    p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority:        p.isFeatured ? 0.9 : 0.8,
  }))

  const industryPages: MetadataRoute.Sitemap = industries.map(i => ({
    url:             `${SITE_URL}/portfolio/industry/${i.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'weekly' as const,
    priority:        0.7,
  }))

  const typePages: MetadataRoute.Sitemap = stallTypes.map(t => ({
    url:             `${SITE_URL}/portfolio/type/${t.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'weekly' as const,
    priority:        0.7,
  }))

  return [...staticPages, ...projectPages, ...industryPages, ...typePages]
}
