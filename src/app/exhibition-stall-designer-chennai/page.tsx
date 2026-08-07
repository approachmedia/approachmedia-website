import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { chennaiData } from '@/components/city/data/chennai'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: chennaiData.metaTitle,
  description: chennaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${chennaiData.canonicalPath}` },
}

export default async function ChennaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Chennai', limit: 6 })
  return <CityPageTemplate data={chennaiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
