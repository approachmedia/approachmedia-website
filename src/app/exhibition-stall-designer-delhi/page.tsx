import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { delhiData } from '@/components/city/data/delhi'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: delhiData.metaTitle,
  description: delhiData.metaDescription,
  alternates: { canonical: `${SITE_URL}${delhiData.canonicalPath}` },
}

export default async function DelhiCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Delhi', limit: 6 })
  return <CityPageTemplate data={delhiData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
