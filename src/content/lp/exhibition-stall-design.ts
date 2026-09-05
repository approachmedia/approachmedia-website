import type { LandingPageConfig } from './types'

/**
 * /lp/exhibition-stall-design — Google Ads landing page for the "Stall
 * Design", "Stand Builders" and "Booth/Trade Show" ad groups.
 *
 * Copy is verbatim from the owner's spec. Two deliberate departures, both
 * recorded in the build report:
 *  · the Google rating chip is the LIVE figure from the Places API rather
 *    than the literal "4.8 · 54", so it cannot go stale or be wrong;
 *  · the testimonials are the site's own published client quotes (real,
 *    named, attributed) because Google reviews could not be fetched at
 *    build time and the spec forbids fabricated text. Flip `hidden` to
 *    true to ship without them.
 */
export const exhibitionStallDesign: LandingPageConfig = {
  slug: 'exhibition-stall-design',
  service: 'exhibition-stall-design',
  title: 'Exhibition Stall Design | Free 3D Concept in 48 Hours | Approach Media',

  eyebrow: 'Exhibition Stall Design & Fabrication · Ahmedabad · Mumbai · Delhi NCR',
  h1: 'Exhibition stall design that wins the aisle — built in-house, delivered on time. Guaranteed.',
  h1WithShow: 'Exhibiting at {show}? Get a free 3D stall concept in 48 hours.',
  subhead: '23 years, 6,000+ stalls, our own 30,000 sq ft workshop in Ahmedabad. Tell us your show, stall size and open sides — you get a 3D design and costing within 48 hours.',
  proofChips: [
    { text: 'Free 3D concept in 48 hrs' },
    { text: 'On-time delivery, in writing' },
  ],

  form: {
    title: 'Get your free 3D concept',
    sub: 'Takes 30 seconds. We reply within one business day — usually faster.',
    button: 'Get my free 3D concept →',
    consent: 'By submitting you agree to be contacted by Approach Media about your enquiry.',
  },

  trustBar: {
    clients: ['Boston Scientific', 'L&T', 'Lenovo', 'Meril', 'Valeo', 'Rayzon Solar'],
    caption: 'Trusted by exhibitors at Pharmatech, ACETECH, REI Expo, IITF, CPHI and Vibrant Gujarat.',
  },

  offer: [
    { title: 'Free 3D concept in 48 hours', body: 'Send your brief today; see your stall in 3D within two working days. No charge, no obligation.' },
    { title: 'Own 30,000 sq ft workshop', body: 'Designed, fabricated and mock-up tested under one roof in Ahmedabad. No subcontracting surprises.' },
    { title: 'On-time delivery — guaranteed in writing', body: "Your stall is handed over before the organiser's deadline. We put it in the contract." },
    { title: 'Transparent pricing', body: 'Custom stalls from ₹7,000 to ₹25,000 per sqm depending on size, height and finish. Fixed quote before we start.' },
  ],

  process: [
    'Brief (today)',
    '3D concept + costing (48 hrs)',
    'Design freeze & drawings',
    'Fabrication & mock-up (3–5 weeks)',
    'On-site install & handover before deadline',
  ],

  portfolioCta: 'See 6,000+ stalls →',

  testimonials: {
    hidden: false,
    items: [
      {
        quote: 'Team AMPL’s unwavering commitment to delivering high-quality output has truly impressed us. Approach Media Pvt. Ltd. has consistently demonstrated their expertise and professionalism in handling all aspects of our exhibition projects.',
        name: 'Chirag Nakarani',
        role: 'Director',
        company: 'Rayzon Solar',
      },
      {
        quote: "These guys are highly creative, respectful of deadlines (oftentimes delivering early) and always professional. It's a pleasure working with them!",
        name: 'Haresh Panchal',
        role: 'Director',
        company: 'Rabatex Group',
      },
    ],
  },

  pricing: {
    rows: [
      { size: '9 sqm (3×3)', range: '₹63,000 – ₹2.25 L' },
      { size: '18 sqm',      range: '₹1.26 L – ₹4.5 L' },
      { size: '36 sqm',      range: '₹2.52 L – ₹9 L' },
      { size: '100 sqm',     range: '₹7 L – ₹25 L' },
    ],
    note: 'Ranges from our published stall-cost guide. Rush builds (≤3 weeks) and double-decker stands quoted separately.',
    linkLabel: 'Read the full cost guide →',
    linkHref: '/blog/exhibition-stall-design-cost-india',
  },

  faq: [
    { q: 'How fast can you deliver a stall?', a: 'Standard 3–5 weeks after drawing approval; rush builds in as little as 3 weeks. We guarantee the handover date in writing.' },
    { q: 'Do you handle organiser approvals and venue rules?', a: 'Yes — drawings, structural sign-off, height/double-decker permissions at Helipad, Mahatma Mandir, BEC, Bharat Mandapam, IEML and Yashobhoomi.' },
    { q: 'What does the free 3D concept include?', a: 'Two views of your stall in 3D, a layout plan and an indicative cost, within 48 hours of your brief.' },
    { q: 'Which cities do you build in?', a: 'Own workshop in Ahmedabad; on-ground teams in 15 cities including Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai and Pune; 14 countries.' },
    { q: 'Custom or modular?', a: 'Both. We advise based on your show calendar — reusable modular systems for frequent exhibitors, fully custom builds for flagship shows.' },
    { q: 'What information do you need to start?', a: "Show name, venue, stall number/size, open sides, and any brand guidelines. A floor plan helps but isn't required." },
  ],

  finalCta: {
    h2: "Your show date is fixed. Your stall shouldn't be a risk.",
    body: 'Brief us today and see your stall in 3D within 48 hours.',
    primary: 'Get my free 3D concept',
    whatsapp: 'WhatsApp us now',
  },
}
