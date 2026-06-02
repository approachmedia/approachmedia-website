import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { jaipurData } from '@/components/city/data/jaipur'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: jaipurData.metaTitle,
  description: jaipurData.metaDescription,
  alternates: { canonical: `${SITE_URL}${jaipurData.canonicalPath}` },
}

export default async function JaipurCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Jaipur', limit: 6 })
  return <CityPageTemplate data={jaipurData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
