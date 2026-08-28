import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { AboutFlow } from '@/components/about/AboutFlow'

import './scrollcraft-engine.css'
import './about-flow.css'

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Company in India Since 2002" },
  description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "Exhibition Stall Design Company in India Since 2002",
    description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
    url: `${SITE_URL}/about`,
  },
}

/**
 * The About page as a scroll-driven story: approach a real stall from the
 * aisle, the stakes, walk inside, the method, the install-wall scale reveal,
 * then sit down in the lounge. All markup and copy are served HTML; the
 * scrollcraft engine only animates what is already on the page, so a crawler
 * or a JS-less visitor reads the full story top to bottom.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd graph={[
        organizationNode(),
        {
          '@type': 'AboutPage',
          name: 'About Approach Media',
          description: 'Exhibition stall design and build company operating since 2002, with 6000+ stalls delivered across India and 14 countries.',
          url: `${SITE_URL}/about`,
          mainEntity: { '@id': `${SITE_URL}#organization` },
        },
        breadcrumb([{ name: 'About', path: '/about' }]),
      ]} />

      <AboutFlow />
    </>
  )
}
