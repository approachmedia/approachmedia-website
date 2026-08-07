import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db/prisma'
import expoData from '@/data/expo-pages.json'
import type { ExpoPageData } from '@/components/expo/types'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects:    { slug: string; updatedAt: Date; isFeatured: boolean }[] = []
  let industries:  { slug: string }[] = []
  let stallTypes:  { slug: string }[] = []

  try {
    ;[projects, industries, stallTypes] = await Promise.all([
      prisma.project.findMany({
        where:  { status: 'published' },
        select: { slug: true, updatedAt: true, isFeatured: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.industry.findMany({ select: { slug: true } }),
      prisma.stallType.findMany({ select: { slug: true } }),
    ])
  } catch {
    // DB not reachable — return static pages only
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/portfolio`,         lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/services`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/work-with-us`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/expos`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/tradeshow-calendar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Commercial landing pages. These are hand-built routes rather than dynamic
  // segments, so they have to be listed — they were absent from the sitemap
  // entirely, which left every service, city and country page undiscoverable
  // through the one mechanism robots.txt points at.
  const servicePages: MetadataRoute.Sitemap = [
    'exhibition-stall-design',
    'custom-booth-fabrication',
    'double-decker-mezzanine-stands',
    'turnkey-project-management',
    'av-technology-integration',
    'immersive-brand-experience',
  ].map(slug => ({
    url:             `${SITE_URL}/services/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }))

  const cityPages: MetadataRoute.Sitemap = [
    'exhibition-stand-builders-in-ahmedabad',
    'exhibition-stall-designer-mumbai',
    'exhibition-stall-designer-delhi',
    'exhibition-stall-designer-bangalore',
    'exhibition-stall-design-hyderabad',
    'exhibition-stall-designer-chennai',
    'exhibition-stall-design-pune',
    'exhibition-stall-design-chandigarh',
    'exhibition-stall-design-goa',
    'exhibition-stall-design-kochi',
    'exhibition-stall-design-ludhiana',
    'exhibition-stand-builder-in-kolkata',
    'exhibition-stand-builders-in-noida',
    'exhibition-stand-in-jaipur',
    'exhibition-agency-in-surat',
  ].map(slug => ({
    url:             `${SITE_URL}/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }))

  const countryPages: MetadataRoute.Sitemap = [
    'uae', 'singapore', 'malaysia', 'china', 'bangladesh', 'nepal',
    'germany', 'france', 'italy', 'spain', 'netherlands', 'usa', 'kenya-africa',
  ].map(slug => ({
    url:             `${SITE_URL}/exhibition-stall-design-agency-${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  const expoPages: MetadataRoute.Sitemap = (expoData as ExpoPageData[]).map(e => ({
    url:             `${SITE_URL}/expos/${e.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

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

  return [
    ...staticPages, ...servicePages, ...cityPages, ...countryPages,
    ...expoPages, ...projectPages, ...industryPages, ...typePages,
  ]
}
