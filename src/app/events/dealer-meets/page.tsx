import type { Metadata } from 'next'
import Link from 'next/link'

import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { socialImage } from '@/lib/seo/social-image'
import DealerMeetsFlow from '@/components/events/DealerMeetsFlow'

import '@/styles/scrollcraft-engine.css'
import './dealer-meets.css'

const TITLE = 'Dealer Meet Design & Event Setup in India'
const DESC =
  'Approach Media designs and builds dealer meets end to end: concept, fabrication, installation and dismantling. See GJAKS Unveil 2026, the dealer meet launching MLUE Premium Lighting.'

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
 * Every answer below is drawn from what this site already publishes or from
 * what Approach Media actually built at GJAKS Unveil 2026. Nothing about
 * lead times, pricing, team size or capacity appears here, because none of
 * that is established anywhere and inventing it would put a claim on the
 * site that nobody can stand behind.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: 'What does Approach Media handle at a dealer meet?',
    a: 'The whole build. At GJAKS Unveil 2026 that meant the product experience zone, the MLUE arch and lantern alcove, the product niche wall, the pendant-light wall, the MLUE Café, the display tables, the lit GJAKS panel wall and the GJAKS × MLUE photo-op installation, from first concept through fabrication, on-site installation and dismantling after the event.',
  },
  {
    q: 'Do you design and fabricate in-house, or subcontract it?',
    a: 'In-house. Fabrication happens in our own 30,000 sq ft workshop, and the structure is assembled and tested there as a full-scale mock-up before anything is packed for site, so problems are found in the workshop rather than on the floor the night before.',
  },
  {
    q: 'Is this the same team that builds your exhibition stalls?',
    a: 'Yes. Approach Media has been designing and building exhibition stalls since 2002, more than 6000 of them, across India and 14+ countries, and around 500 exhibitions a year. Full-scale event setup is a newer service line, run by the same design and production teams and out of the same workshop.',
  },
  {
    q: 'What does the process look like from our side?',
    a: 'Seven stages: consultation and brief planning; concept and spatial design; engineering and technical detailing; fabrication and build; full-scale mock-up testing; logistics, installation and on-site execution; then dismantling and post-event wrap-up.',
  },
  {
    q: 'Where do you work?',
    a: 'We are based in Ahmedabad and work across India, and have delivered in 14+ countries.',
  },
  {
    q: 'How do we start a conversation?',
    a: 'Tell us the event, the venue, the date and roughly what you want the room to do. Use the contact form, or WhatsApp +91 94269 12602.',
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
          serviceType: 'Dealer meet design, fabrication and event setup',
          provider: { '@id': `${SITE_URL}#organization` },
          areaServed: ['India', 'UAE', 'Singapore'],
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

      <div className="gjaks">
        <section className="close" aria-label="Dealer meet services, questions and answers">
          <div className="gj-wrap">
            <h2 className="gj-h faq-title">Dealer meets, answered</h2>

            <dl className="faq">
              {FAQ.map(item => (
                <div className="faq-item" key={item.q}>
                  <dt className="faq-q">{item.q}</dt>
                  <dd className="faq-a">{item.a}</dd>
                </div>
              ))}
            </dl>

            <p className="faq-cta">
              <Link className="cta" href="/contact">Plan your next event</Link>
            </p>

            <p className="gj-mono gj-mono--sm faq-credit">
              GJAKS Unveil 2026 · MLUE Premium Lighting by GJAKS · Exhibition &amp; event build by Approach Media
            </p>

            <p className="seo">
              Approach Media designed and executed the complete event experience for GJAKS Unveil 2026,
              the dealer meet launching MLUE Premium Lighting by GJAKS: the product experience zone, MLUE
              arch and lantern alcove, product niche wall, pendant-light wall, MLUE Café, display tables,
              the lit GJAKS panel wall and the GJAKS × MLUE photo-op installation, from concept and
              fabrication to on-site installation and dismantling. Exhibition stall design and
              fabrication, Ahmedabad, since 2002.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
