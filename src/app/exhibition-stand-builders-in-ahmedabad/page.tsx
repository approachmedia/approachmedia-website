import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/db/portfolio'
import CityPageTemplate from '@/components/city/CityPageTemplate'
import { ahmedabadData } from '@/components/city/data/ahmedabad'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: ahmedabadData.metaTitle },
  description: ahmedabadData.metaDescription,
  alternates: { canonical: `${SITE_URL}${ahmedabadData.canonicalPath}` },
}

export default async function AhmedabadCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Ahmedabad', limit: 20 })
  return (
    <CityPageTemplate
      data={ahmedabadData}
      cityProjects={cityProjects}
      siteUrl={SITE_URL}
      // Slugs, not titles: blogLinksFor pulls each title from the post's own
      // frontmatter and drops anything not yet published, so this list can
      // name a scheduled post without ever rendering a link to a 404.
      fromTheBlog={blogLinksFor([
        'helipad-exhibition-centre-gandhinagar-guide',
        'aluminium-bharat-2026-exhibitor-guide',
        'exhibition-stall-design-cost-india',
        'double-decker-stall-rules-india',
        'custom-vs-modular-exhibition-stands-india',
        'exhibition-stand-cost-dubai-indian-exhibitors',
      ])}
    />
  )
}
