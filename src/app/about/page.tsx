import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { AboutFlow } from '@/components/about/AboutFlow'
import { getClientReviewVideos } from '@/lib/client-reviews'

import '@/styles/scrollcraft-engine.css'
import './about-flow.css'
import { socialImage } from '@/lib/seo/social-image'
import PolaroidWall from '@/components/about/motion/PolaroidWall'
import { getPublishedProjects } from '@/lib/db/portfolio'

// Hourly, so the polaroids pick up projects (the database is not reachable
// while the image is built, which would otherwise freeze the page empty).
// force-dynamic, like the home page: these photographs come from the
// database, which the Docker build cannot reach, so a prerendered page was
// baked with them missing (blank cards) until it revalidated.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Company in India Since 2002" },
  description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "Exhibition Stall Design Company in India Since 2002",
    description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
    url: `${SITE_URL}/about`,
    ...socialImage().openGraph,
  },
  twitter: socialImage().twitter,
}

/**
 * The About page as a scroll-driven story: approach a real stall from the
 * aisle, the stakes, walk inside, the method, the install-wall scale reveal,
 * then sit down in the lounge. All markup and copy are served HTML; the
 * scrollcraft engine only animates what is already on the page, so a crawler
 * or a JS-less visitor reads the full story top to bottom.
 */
/** Recent stalls as polaroids: client, then show, city and year, from the records. */
async function polaroids() {
  try {
    const rows = await getPublishedProjects({ limit: 10 })
    return rows.filter(p => p.media[0]).map(p => ({
      image: p.media[0].cdnUrl ?? p.media[0].url,
      alt: p.media[0].altText,
      title: p.client?.name ?? p.title,
      caption: [p.exhibition?.name, p.exhibition?.city ?? p.city, p.buildYear].filter(Boolean).join(' · '),
    }))
  } catch {
    return []
  }
}

export default async function AboutPage() {
  /* All twenty-two client reviews. Resolved here because AboutFlow is a client
     component and the playlist read is server-only; the shape it receives is
     plain data. */
  const [reviews, slides] = await Promise.all([getClientReviewVideos(), polaroids()])

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

      <AboutFlow reviews={reviews} />

      {/* Style 3: recent stalls as polaroids on a line. */}
      <section aria-label="Stalls we have built" className="border-t border-white/10">
        <PolaroidWall slides={slides} />
      </section>
    </>
  )
}
