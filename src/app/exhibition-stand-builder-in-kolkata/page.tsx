import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { kolkataData } from '@/components/city/data/kolkata'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: kolkataData.metaTitle },
  description: kolkataData.metaDescription,
  alternates: { canonical: `${SITE_URL}${kolkataData.canonicalPath}` },
}

export default async function KolkataCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Kolkata', limit: 20 })
  return <CityPageTemplate data={kolkataData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
