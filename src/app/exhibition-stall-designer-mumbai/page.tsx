import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { mumbaiData } from '@/components/city/data/mumbai'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: mumbaiData.metaTitle,
  description: mumbaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${mumbaiData.canonicalPath}` },
}

export default async function MumbaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Mumbai', limit: 6 })
  return <CityPageTemplate data={mumbaiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
