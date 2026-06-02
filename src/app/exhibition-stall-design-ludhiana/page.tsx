import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { ludhianaData } from '@/components/city/data/ludhiana'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: ludhianaData.metaTitle,
  description: ludhianaData.metaDescription,
  alternates: { canonical: `${SITE_URL}${ludhianaData.canonicalPath}` },
}

export default async function LudhianaCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Ludhiana', limit: 6 })
  return <CityPageTemplate data={ludhianaData} cityProjects={cityProjects} siteUrl={SITE_URL} />
}
