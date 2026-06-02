import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { kochiData } from '@/components/city/data/kochi'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: kochiData.metaTitle,
  description: kochiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${kochiData.canonicalPath}` },
}

export default async function KochiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Kochi', limit: 6 })
  return <CityPageTemplate data={kochiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
