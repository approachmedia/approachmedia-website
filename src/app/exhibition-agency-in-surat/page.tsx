import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { suratData } from '@/components/city/data/surat'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: suratData.metaTitle },
  description: suratData.metaDescription,
  alternates: { canonical: `${SITE_URL}${suratData.canonicalPath}` },
}

export default async function SuratCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Surat', limit: 6 })
  return <CityPageTemplate data={suratData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
