import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { chennaiData } from '@/components/city/data/chennai'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: chennaiData.metaTitle },
  description: chennaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${chennaiData.canonicalPath}` },
}

export default async function ChennaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Chennai', limit: 20 })
  return (
    <CityPageTemplate
      data={chennaiData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      // Windergy India is at Chennai Trade Centre; the batch pack asks for it
      // here. It publishes 10 Sep, so until then blogLinksFor drops it and
      // the block renders with the two general guides only.
      fromTheBlog={blogLinksFor([
        'windergy-india-2026-exhibitor-guide',
        'exhibition-stall-design-cost-india',
        'custom-vs-modular-exhibition-stands-india',
      ])}
    />
  )
}
