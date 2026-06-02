import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { ahmedabadData } from '@/components/city/data/ahmedabad'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: ahmedabadData.metaTitle,
  description: ahmedabadData.metaDescription,
  alternates: { canonical: `${SITE_URL}${ahmedabadData.canonicalPath}` },
}

export default async function AhmedabadCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Ahmedabad', limit: 6 })
  return <CityPageTemplate data={ahmedabadData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
