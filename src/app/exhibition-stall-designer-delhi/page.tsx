import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { delhiData } from '@/components/city/data/delhi'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: delhiData.metaTitle },
  description: delhiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${delhiData.canonicalPath}` },
}

export default async function DelhiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Delhi', limit: 6 })
  return <CityPageTemplate data={delhiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
