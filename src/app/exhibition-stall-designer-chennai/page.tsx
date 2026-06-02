import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { chennaiData } from '@/components/city/data/chennai'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: chennaiData.metaTitle,
  description: chennaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${chennaiData.canonicalPath}` },
}

export default async function ChennaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Chennai', limit: 6 })
  return <CityPageTemplate data={chennaiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
