import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { chandigarhData } from '@/components/city/data/chandigarh'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: chandigarhData.metaTitle,
  description: chandigarhData.metaDescription,
  alternates: { canonical: `${SITE_URL}${chandigarhData.canonicalPath}` },
}

export default async function ChandigarhCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Chandigarh', limit: 6 })
  return <CityPageTemplate data={chandigarhData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
