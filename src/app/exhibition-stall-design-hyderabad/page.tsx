import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { hyderabadData } from '@/components/city/data/hyderabad'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: hyderabadData.metaTitle,
  description: hyderabadData.metaDescription,
  alternates: { canonical: `${SITE_URL}${hyderabadData.canonicalPath}` },
}

export default async function HyderabadCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Hyderabad', limit: 6 })
  return <CityPageTemplate data={hyderabadData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
