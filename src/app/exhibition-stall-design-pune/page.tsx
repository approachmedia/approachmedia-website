import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { puneData } from '@/components/city/data/pune'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: puneData.metaTitle },
  description: puneData.metaDescription,
  alternates: { canonical: `${SITE_URL}${puneData.canonicalPath}` },
}

export default async function PuneCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Pune', limit: 6 })
  return <CityPageTemplate data={puneData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
