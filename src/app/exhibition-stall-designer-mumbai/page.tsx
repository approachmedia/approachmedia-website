import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { mumbaiData } from '@/components/city/data/mumbai'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: mumbaiData.metaTitle },
  description: mumbaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${mumbaiData.canonicalPath}` },
}

export default async function MumbaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Mumbai', limit: 20 })
  return (
    <CityPageTemplate
      data={mumbaiData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      // All three run at NESCO, Mumbai. They publish 23 Sep, 3 Sep and now;
      // each card appears on its own date.
      fromTheBlog={blogLinksFor([
        'metec-wire-tube-india-2026-exhibitor-guide',
        'anuga-foodtec-india-2026-exhibitor-guide',
        'exhibition-stall-design-cost-india',
      ])}
    />
  )
}
