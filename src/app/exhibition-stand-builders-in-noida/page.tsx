import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { noidaData } from '@/components/city/data/noida'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: noidaData.metaTitle,
  description: noidaData.metaDescription,
  alternates: { canonical: `${SITE_URL}${noidaData.canonicalPath}` },
}

export default async function NoidaCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Noida', limit: 6 })
  return <CityPageTemplate data={noidaData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
