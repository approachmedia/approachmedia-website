import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { bangaloreData } from '@/components/city/data/bangalore'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: bangaloreData.metaTitle,
  description: bangaloreData.metaDescription,
  alternates: { canonical: `${SITE_URL}${bangaloreData.canonicalPath}` },
}

export default async function BangaloreCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Bangalore', limit: 6 })
  return <CityPageTemplate data={bangaloreData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
