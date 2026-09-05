import type { LandingPageConfig } from './types'
import { exhibitionStallDesign as base } from './exhibition-stall-design'

/**
 * /lp/stall-fabrication — same template, fabrication copy. Spec §10:
 * "Everything else identical", so this spreads the design page's config and
 * overrides only what the spec names.
 */
export const stallFabrication: LandingPageConfig = {
  ...base,
  slug: 'stall-fabrication',
  service: 'stall-fabrication',
  title: 'Exhibition Stall Fabrication | Fixed Quote in 48 Hours | Approach Media',

  eyebrow: 'Exhibition Stall Fabrication · In-house · Ahmedabad · Mumbai · Delhi NCR',
  h1: 'Exhibition stall fabrication built to the millimetre — in our own 30,000 sq ft workshop.',
  h1WithShow: 'Need your {show} stall fabricated on time? Fixed quote in 48 hours.',
  subhead: 'From your drawings or ours: fabrication, finishing, graphics, electricals and on-site installation — one team, one contract, handover guaranteed in writing.',

  form: {
    ...base.form,
    title: 'Get a fixed fabrication quote',
    button: 'Get my quote →',
  },

  // The spec gives titles only for these four. Bodies are assembled from
  // sentences that already appear verbatim elsewhere in the spec, so nothing
  // here is authored copy; card 2's is the loosest fit and is flagged in the
  // build report for the owner to replace if they want a tighter line.
  offer: [
    { title: 'Own workshop, no subcontracting', body: 'Designed, fabricated and mock-up tested under one roof in Ahmedabad. No subcontracting surprises.' },
    { title: 'Mock-up tested before dispatch', body: 'From your drawings or ours: fabrication, finishing, graphics, electricals and on-site installation — one team, one contract, handover guaranteed in writing.' },
    { title: '3–5 week build, rush in 3', body: 'Standard 3–5 weeks after drawing approval; rush builds in as little as 3 weeks. We guarantee the handover date in writing.' },
    { title: 'Fixed quote, no on-site extras', body: 'Custom stalls from ₹7,000 to ₹25,000 per sqm depending on size, height and finish. Fixed quote before we start.' },
  ],

  faq: base.faq.map((item, i) =>
    i === 2
      ? { q: 'Can you fabricate a stall designed by another agency?', a: 'Yes; send the drawings and we quote in 48 hours.' }
      : item,
  ),

  finalCta: {
    ...base.finalCta,
    primary: 'Get my quote',
  },
}
