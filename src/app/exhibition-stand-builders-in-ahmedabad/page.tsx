import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { ahmedabadData } from '@/components/city/data/ahmedabad'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: ahmedabadData.metaTitle },
  description: ahmedabadData.metaDescription,
  alternates: { canonical: `${SITE_URL}${ahmedabadData.canonicalPath}` },
}

export default async function AhmedabadCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Ahmedabad', limit: 6 })
  return (
    <CityPageTemplate
      data={ahmedabadData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      fromTheBlog={[
        { title: 'How Much Does Exhibition Stall Design & Fabrication Cost in India? (2026 Rates)', href: '/blog/exhibition-stall-design-cost-india' },
        { title: 'Double-Decker & Mezzanine Stall Rules in India: What You Must Clear Before You Build', href: '/blog/double-decker-stall-rules-india' },
        { title: 'Custom vs Modular Exhibition Stands: Which Should Indian Exhibitors Choose?', href: '/blog/custom-vs-modular-exhibition-stands-india' },
        { title: 'What Drives Exhibition Stand Cost in Dubai? A Guide for Indian Exhibitors', href: '/blog/exhibition-stand-cost-dubai-indian-exhibitors' },
      ]}
    />
  )
}
