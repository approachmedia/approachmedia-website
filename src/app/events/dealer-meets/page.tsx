import type { Metadata } from 'next'
import Link from 'next/link'

import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { socialImage } from '@/lib/seo/social-image'
import DealerMeetsFlow from '@/components/events/DealerMeetsFlow'
import { Faq, type FaqItem } from '@/components/home/Faq'

import '@/styles/scrollcraft-engine.css'
import './dealer-meets.css'

const TITLE = 'Dealer Meet Planning & Event Setup in India'
const DESC =
  'Approach Media plans and sets up dealer meets end to end: theme, crowd flow, staging, activities and awards. See GJAKS Unveil 2026, the dealer meet launching MLUE Premium Lighting.'

/* The event's own poster frame, from R2, so the share card is a real
   photograph of the build rather than the site default. */
const OG = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/Event/clips/gjaks-unveil-2026-approach-media-v2-1-01-poster.jpg'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/events/dealer-meets` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}/events/dealer-meets`,
    type: 'article',
    ...socialImage(OG, 'GJAKS Unveil 2026 dealer meet, built by Approach Media').openGraph,
  },
  twitter: socialImage(OG, 'GJAKS Unveil 2026 dealer meet, built by Approach Media').twitter,
}

/**
 * Event work only: management, crowd flow, theme, setup, activities and
 * awards. Nothing here frames this as exhibition or expo work.
 *
 * The answers describe how the work is approached and point at what was
 * actually delivered at GJAKS Unveil 2026. No lead times, headcounts,
 * guest capacities or prices appear, because none of those are established
 * anywhere and inventing them would put a claim on the site that nobody
 * can stand behind.
 */
const FAQ: FaqItem[] = [
  {
    q: 'Do you run the event, or only build the set?',
    a: 'Both. GJAKS Unveil 2026 came to us as a dealer meet that had to land a product launch, and we took it from the first concept through to dismantling: the theme, the layout of the evening, everything built into the room, the install, and the floor on the night.',
  },
  {
    q: 'How do you plan the way guests move through the evening?',
    a: 'Flow is decided before anything is built. At GJAKS the arch and welcome standee set the entrance, the product experience zone carried people through in one direction, and the MLUE Café and the photo-op installation gave the room places to stop, so guests spread out instead of collecting in one spot.',
  },
  {
    q: 'Who decides the theme?',
    a: 'You bring the occasion and the brand; we build the theme around it and carry it through every surface in the room. For GJAKS the evening existed to put MLUE Premium Lighting in front of dealers, so the theme was the product itself: lit panel walls, a lantern alcove, niche walls and display tables, all lighting.',
  },
  {
    q: 'How do you make sure the room is ready in time?',
    a: 'The set is built and assembled in our own 30,000 sq ft workshop first, and tested there at full scale before anything is packed. On-site work is then assembly rather than problem-solving, which is what keeps a tight venue window realistic.',
  },
  {
    q: 'Can you build in activities and engagement zones?',
    a: 'Yes, and they are planned into the layout rather than added at the end. At GJAKS that meant the GJAKS × MLUE photo-op installation, the product experience zone where dealers could handle the fixtures themselves, and the MLUE Café as somewhere to sit and talk.',
  },
  {
    q: 'Do you handle award ceremonies and on-stage moments?',
    a: 'Yes. Stage, backdrop, lighting, reveal moments and the order of the evening are all part of the setup we take on.',
  },
  {
    q: 'What kinds of events do you take on?',
    a: 'Dealer meets, product launches, award nights, conferences and brand evenings: events where the room itself has to do some of the work. Dealer meets is the first of our event services to go live here, with more to follow.',
  },
  {
    q: 'How do we start a conversation?',
    a: 'Tell us the date, the venue, roughly how many people, and what the evening is meant to achieve. Use the contact form, or WhatsApp +91 94269 12602.',
  },
]

export default function DealerMeetsPage() {
  return (
    <>
      <JsonLd graph={[
        organizationNode(),
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/events/dealer-meets#service`,
          name: 'Dealer Meet Design and Event Setup',
          serviceType: 'Dealer meet planning, event setup and management',
          provider: { '@id': `${SITE_URL}#organization` },
          areaServed: 'India',
          url: `${SITE_URL}/events/dealer-meets`,
          description: DESC,
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/events/dealer-meets#faq`,
          mainEntity: FAQ.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
        breadcrumb([
          { name: 'Events', path: '/events/dealer-meets' },
          { name: 'Dealer Meets', path: '/events/dealer-meets' },
        ]),
      ]} />

      <DealerMeetsFlow />

      <Faq
        items={FAQ}
        id="dealer-meet-faq"
        heading="Dealer meets, answered."
        intro="Still have questions about the evening? Our team will walk you through it."
      />

      <div className="gjaks">
        <section className="close" aria-label="Dealer meet services, questions and answers">
          <div className="gj-wrap">
            <p className="faq-cta">
              <Link className="cta" href="/contact">Plan your next event</Link>
            </p>

            <p className="gj-mono gj-mono--sm faq-credit">
              GJAKS Unveil 2026 · MLUE Premium Lighting by GJAKS · Event setup by Approach Media
            </p>

            <p className="seo">
              Approach Media planned and set up the complete event experience for GJAKS Unveil 2026, the
              dealer meet launching MLUE Premium Lighting by GJAKS: the theme, the product experience
              zone, the MLUE arch and lantern alcove, the product niche wall, the pendant-light wall, the
              MLUE Café, the display tables, the lit GJAKS panel wall and the GJAKS × MLUE photo-op
              installation, from concept and build through on-site installation, the running of the
              evening and dismantling. Event setup and management, Ahmedabad.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
