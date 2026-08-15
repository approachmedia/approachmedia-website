import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { delhiData } from '@/components/city/data/delhi'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: delhiData.metaTitle },
  description: delhiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${delhiData.canonicalPath}` },
}

export default async function DelhiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Delhi', limit: 6 })
  return (
    <CityPageTemplate
      data={delhiData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      // CPHI India is at Yashobhoomi in Dwarka; both guides are Delhi-venue
      // specific. They publish 16 Sep and 13 Sep, and blogLinksFor withholds
      // each until its date, so the block fills in as they land.
      fromTheBlog={blogLinksFor([
        'cphi-pmec-india-2026-split-venue-guide',
        'yashobhoomi-iicc-delhi-exhibitor-guide',
        'exhibition-stall-design-cost-india',
        'double-decker-stall-rules-india',
      ])}
    />
  )
}
