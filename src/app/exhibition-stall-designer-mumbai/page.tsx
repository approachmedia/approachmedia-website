import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { mumbaiData } from '@/components/city/data/mumbai'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: mumbaiData.metaTitle,
  description: mumbaiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${mumbaiData.canonicalPath}` },
}

export default async function MumbaiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Mumbai', limit: 6 })
  return <CityPageTemplate data={mumbaiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
