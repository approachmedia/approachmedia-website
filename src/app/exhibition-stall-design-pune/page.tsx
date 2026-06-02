import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { puneData } from '@/components/city/data/pune'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: puneData.metaTitle,
  description: puneData.metaDescription,
  alternates: { canonical: `${SITE_URL}${puneData.canonicalPath}` },
}

export default async function PuneCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Pune', limit: 6 })
  return <CityPageTemplate data={puneData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
