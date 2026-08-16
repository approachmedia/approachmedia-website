import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { goaData } from '@/components/city/data/goa'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: goaData.metaTitle },
  description: goaData.metaDescription,
  alternates: { canonical: `${SITE_URL}${goaData.canonicalPath}` },
}

export default async function GoaCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Goa', limit: 20 })
  return <CityPageTemplate data={goaData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
