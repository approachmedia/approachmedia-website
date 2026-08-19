/**
 * The six services on the hub page, as expand cards.
 *
 * Every word here already existed on the site. Titles, numbers and summaries
 * are the six cards' own copy, moved out of the page's JSX so the grid can be
 * rendered from a list. The points behind each card are pulled live from the
 * service's own content — the same bullets its page renders — so the two can
 * never drift apart, and adding a bullet to a service page adds it here too.
 *
 * Nothing was written for this. The detail panel in Motion's section also
 * carries a headline metric per card ("12s", "Step 2", "1 line"); there is no
 * measured figure behind any of these six services, and inventing one for a
 * page that quotes real project numbers is not a trade worth making. The
 * panel shows the service's points and a link to its full page instead.
 */

import type { ProseBlock } from '@/components/seo/ProseSection'
import { BLOCKS as designBlocks } from './exhibition-stall-design'
import { BLOCKS as fabricationBlocks } from './custom-booth-fabrication'
import { BLOCKS as turnkeyBlocks } from './turnkey-project-management'
import { BLOCKS as doubleDeckerBlocks } from './double-decker-mezzanine-stands'
import { whyChoose as avPoints } from './av-technology-integration'
import { sensoryLayers as immersivePoints } from './immersive-brand-experience'

export interface ServicePoint {
  term: string
  copy: string
}

export interface ServiceCard {
  slug: string
  /** "Service 01" — the label the cards already carried. */
  number: string
  title: string
  summary: string
  /**
   * Filename in the R2 folder images/services — the same six photographs the
   * home page's service accordion already uses, deliberately not a second set.
   * They are named after the slug, but kept explicit here so a rename cannot
   * silently break a card.
   */
  image: string
  points: ServicePoint[]
}

/** The bucket folder the home accordion reads from. */
export const SERVICE_IMAGE_CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

/**
 * The first block with a bullet list. Which block that is differs by service
 * — double-decker leads with prose and puts its list in the second — so it is
 * found rather than indexed.
 */
function firstBullets(blocks: ProseBlock[]): ServicePoint[] {
  return blocks.find(block => block.bullets?.length)?.bullets ?? []
}

/** The inline pages store {title, copy}; the prose blocks store {term, copy}. */
function fromTitled(items: { title: string; copy: string }[]): ServicePoint[] {
  return items.map(({ title, copy }) => ({ term: title, copy }))
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    slug: 'exhibition-stall-design',
    number: 'Service 01',
    title: 'Exhibition Stall Design',
    summary:
      'Concept-led spatial design that translates your brand identity into a high-impact exhibition space — from brief to 3D visualisation.',
    image: 'exhibition-stall-design.jpg',
    points: firstBullets(designBlocks),
  },
  {
    slug: 'custom-booth-fabrication',
    number: 'Service 02',
    title: 'Custom Booth Fabrication',
    summary:
      'Precision-built structures from our own workshop — custom joinery, structural frames, surface finishes, to exact specifications.',
    image: 'custom-booth-fabrication.jpg',
    points: firstBullets(fabricationBlocks),
  },
  {
    slug: 'turnkey-project-management',
    number: 'Service 03',
    title: 'Turnkey Project Management',
    summary:
      'Single-team accountability from first brief to post-event dismantle. One point of contact, zero coordination gaps.',
    image: 'turnkey-project-management.jpg',
    points: firstBullets(turnkeyBlocks),
  },
  {
    slug: 'av-technology-integration',
    number: 'Service 04',
    title: 'Audio-Visual & Tech Integration',
    summary:
      'LED walls, interactive screens, immersive sound and lighting — all planned and integrated within your stall from day one.',
    image: 'av-technology-integration.jpg',
    points: fromTitled(avPoints),
  },
  {
    slug: 'double-decker-mezzanine-stands',
    number: 'Service 05',
    title: 'Double Decker / Mezzanine Stands',
    summary:
      'Engineered multi-level structures that maximise floor presence and create a landmark on any show floor.',
    image: 'double-decker-mezzanine-stands.jpg',
    points: firstBullets(doubleDeckerBlocks),
  },
  {
    slug: 'immersive-brand-experience',
    number: 'Service 06',
    title: 'Immersive Brand Experiences',
    summary:
      'Sensory-led brand environments — spatial narrative, lighting, sound, and interaction — designed to be remembered.',
    image: 'immersive-brand-experience.jpg',
    points: fromTitled(immersivePoints),
  },
]
