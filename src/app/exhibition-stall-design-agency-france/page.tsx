import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { franceData } from '@/components/city/data/france'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: franceData.metaTitle,
  description: franceData.metaDescription,
  alternates: { canonical: `${SITE_URL}${franceData.canonicalPath}` },
}

export default async function FrancePage() {
  // Fetch featured projects — no city filter since France projects are international.
  // They will appear once tagged with the exhibition or country in the CMS.
  const projects = await getPublishedProjects({ limit: 6 })
  return <CityPageTemplate data={franceData} cityProjects={projects} siteUrl={SITE_URL} />
}
