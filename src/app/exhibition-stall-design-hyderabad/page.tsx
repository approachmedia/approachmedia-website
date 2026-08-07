import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { hyderabadData } from '@/components/city/data/hyderabad'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: hyderabadData.metaTitle },
  description: hyderabadData.metaDescription,
  alternates: { canonical: `${SITE_URL}${hyderabadData.canonicalPath}` },
}

export default async function HyderabadCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Hyderabad', limit: 6 })
  return <CityPageTemplate data={hyderabadData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
