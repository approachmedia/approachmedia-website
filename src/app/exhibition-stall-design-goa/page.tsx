import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { goaData } from '@/components/city/data/goa'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: goaData.metaTitle,
  description: goaData.metaDescription,
  alternates: { canonical: `${SITE_URL}${goaData.canonicalPath}` },
}

export default async function GoaCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Goa', limit: 6 })
  return <CityPageTemplate data={goaData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
