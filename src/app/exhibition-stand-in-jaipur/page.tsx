import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { jaipurData } from '@/components/city/data/jaipur'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: jaipurData.metaTitle },
  description: jaipurData.metaDescription,
  alternates: { canonical: `${SITE_URL}${jaipurData.canonicalPath}` },
}

export default async function JaipurCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Jaipur', limit: 6 })
  return <CityPageTemplate data={jaipurData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
