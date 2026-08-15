import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { noidaData } from '@/components/city/data/noida'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: noidaData.metaTitle },
  description: noidaData.metaDescription,
  alternates: { canonical: `${SITE_URL}${noidaData.canonicalPath}` },
}

export default async function NoidaCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Noida', limit: 6 })
  return (
    <CityPageTemplate
      data={noidaData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      // Every show in these guides runs at India Expo Mart, Greater Noida.
      // Publish dates run 21 Sep, 18 Sep, 16 Sep and 29 Aug; each card
      // appears on its own date.
      fromTheBlog={blogLinksFor([
        'india-expo-mart-greater-noida-exhibitor-guide',
        'india-itme-2026-exhibitor-guide',
        'cphi-pmec-india-2026-split-venue-guide',
        'rei-expo-battery-show-india-2026-guide',
        'exhibition-stall-design-cost-india',
      ])}
    />
  )
}
