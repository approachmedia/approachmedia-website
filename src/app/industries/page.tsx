import { INDUSTRY_PAGES } from '@/content/industries'
import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { socialImage } from '@/lib/seo/social-image'
import { INDUSTRY_COVER_CDN, INDUSTRY_COVER_FILE } from '@/content/industry-covers'
import { getProjectsForIndustries } from '@/lib/db/portfolio'
import { IndustriesVibe, type IndustryCard, type IndustryShot } from '@/components/industries/IndustriesVibe'
import './industries-vibe.css'

/**
 * The Industries hub.
 *
 * Editorial pages, deliberately separate from /portfolio/industry/<slug>,
 * which stays what it already is: a filtered, browsable project collection.
 * The brief's README asks for exactly that split, and each page here links
 * down into its filter page rather than replacing it.
 *
 * The page itself is IndustriesVibe, a motion-led layout. This file supplies
 * its photographs, all of them ones the site already publishes:
 *
 *  · a cover per industry from the sixteen industry photographs on R2, the
 *    set the home page's orbit wheel already shows. Two sectors have no
 *    photograph in that set (Automotive & Components, Industrial
 *    Automation) and take the hero of their newest published project
 *    instead; with none, the card renders typographically.
 *  · up to three real project heroes per sector, which the card cycles
 *    through on hover and the process filmstrip runs.
 *
 * The database is optional here: if it cannot be reached the page still
 * renders every word and every R2 cover, and only the project photographs
 * are missing until the next revalidation.
 */

export const revalidate = 3600

const COVERS = INDUSTRY_COVER_CDN
const COVER_FILE = INDUSTRY_COVER_FILE

async function loadCards(): Promise<{ cards: IndustryCard[]; strip: IndustryShot[] }> {
  const projects = await Promise.all(
    INDUSTRY_PAGES.map(i => getProjectsForIndustries(i.sourceSlugs, 3).catch(() => [])),
  )

  const cards = INDUSTRY_PAGES.map((i, n): IndustryCard => {
    const shots: IndustryShot[] = projects[n]
      .map(p => p.media[0])
      .filter(m => !!m?.url)
      .map(m => ({ src: m!.url, alt: m!.altText }))
    const file = COVER_FILE[i.slug]
    const cover = file
      ? { src: `${COVERS}/${file}`, alt: `${i.name} exhibition stall design` }
      : shots[0] ?? null
    return { name: i.name, slug: i.slug, tagline: i.tagline, cover, shots }
  })

  // One photograph per sector first, then the rest, so the filmstrip mixes
  // industries instead of running three of the same sector in a row.
  const seen = new Set<string>()
  const strip: IndustryShot[] = []
  for (let round = 0; round < 3; round++) {
    for (const c of cards) {
      const s = c.shots[round]
      if (s && !seen.has(s.src)) { seen.add(s.src); strip.push(s) }
    }
  }
  return { cards, strip: strip.slice(0, 14) }
}

export const metadata = {
  title: { absolute: 'Exhibition Stall Design by Industry | Approach Media' },
  description: 'Explore exhibition stall design for your industry. Browse relevant projects, discover exhibition opportunities and plan your next stand with Approach Media.',
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: {
    title: 'Exhibition Stall Design by Industry | Approach Media',
    description: 'Explore exhibition stall design for your industry. Browse relevant projects, discover exhibition opportunities and plan your next stand with Approach Media.',
    url: `${SITE_URL}/industries`,
    ...socialImage().openGraph,
  },
  twitter: socialImage().twitter,
}

export default async function IndustriesHub() {
  const { cards, strip } = await loadCards()
  return (
    <main>
      <JsonLd graph={[
        organizationNode(),
        breadcrumb([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }]),
      ]} />
      <IndustriesVibe cards={cards} strip={strip} />
    </main>
  )
}
