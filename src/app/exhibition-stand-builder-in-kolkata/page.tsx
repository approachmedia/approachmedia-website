import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { kolkataData } from '@/components/city/data/kolkata'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: kolkataData.metaTitle,
  description: kolkataData.metaDescription,
  alternates: { canonical: `${SITE_URL}${kolkataData.canonicalPath}` },
}

export default async function KolkataCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Kolkata', limit: 6 })
  return <CityPageTemplate data={kolkataData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
