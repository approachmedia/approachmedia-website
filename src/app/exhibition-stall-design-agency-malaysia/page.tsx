import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Malaysia | Booth Design Kuala Lumpur',
  description:
    'Approach Media is an exhibition stall design agency in Malaysia — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for MIHAS, IGEM, Malaysia Tech Week and major Kuala Lumpur trade fairs.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-malaysia` },
}

const data: CountryPageData = {
  country: 'Malaysia',
  wordmark: 'MALAYSIA',
  slug: 'exhibition-stall-design-agency-malaysia',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/malaysia-hero.jpg',
  areaServed: ['Malaysia', 'Kuala Lumpur', 'Penang', 'Johor Bahru'],

  meta: {
    title: 'Exhibition Stall Design Agency in Malaysia | Booth Design Kuala Lumpur',
    description:
      'Approach Media is an exhibition stall design agency in Malaysia — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for MIHAS, IGEM, Malaysia Tech Week and major Kuala Lumpur trade fairs.',
  },

  hero: {
    regionBadge: 'Malaysia · Southeast Asia',
    greetingLine: 'Selamat Datang, Kuala Lumpur, Penang',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Malaysian trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Malaysia. From 3D stand concepts and fabrication to branding, installation and dismantling — at MITEC, Kuala Lumpur Convention Centre, SPICE Penang and Putra World Trade Centre.',
    statLabel: 'Across Malaysia',
    citiesCount: '3',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Kuala Lumpur · Penang · Johor',
      'Support for Indian companies at Malaysian trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Malaysia Exhibition',
  },

  standOut: {
    body1:
      "Malaysia is Southeast Asia's third-largest economy and a significant trade partner for Indian businesses. Indian companies exhibit here at MIHAS, IGEM, MTE and Kuala Lumpur trade fairs to access Malaysian buyers, ASEAN distribution networks and the large halal industry market.",
    body2:
      "We help Indian exhibitors build stands that meet Malaysian venue standards, ASEAN buyer expectations and the competitive visual standards of Kuala Lumpur's growing trade fair calendar.",
    cards: [
      {
        t: 'MITEC & KLCC Compliant Builds',
        d: 'Structures built to Malaysia International Trade and Exhibition Centre and KLCC regulations — fire safety codes, electrical specs and organiser rules planned from the start.',
      },
      {
        t: 'Halal Industry Positioning',
        d: "Malaysia is the world's largest halal hub. We design stands that communicate halal compliance, product quality and brand values to Malaysian and Muslim-majority market buyers.",
      },
      {
        t: 'ASEAN Market Signalling',
        d: 'Exhibiting in Kuala Lumpur signals ASEAN market intent. We design stands that open conversations with buyers from Malaysia, Indonesia, Thailand and the Philippines.',
      },
      {
        t: 'Product Display & Demo Areas',
        d: 'Structured product display and demonstration areas planned for Malaysian buyer habits — product-first, specification-clear and brand-organised.',
      },
      {
        t: 'English & Malay Branding',
        d: "English-first branding that works for Malaysia's multilingual business environment — serving Malaysian, ASEAN and international visitors.",
      },
      {
        t: 'Indian Exhibitor Support',
        d: 'Strong India-Malaysia trade ties make Malaysia a natural first ASEAN destination for Indian brands. We understand that journey and coordinate the full exhibition process.',
      },
    ],
  },

  venues: [
    {
      city: 'Kuala Lumpur',
      name: 'Malaysia International Trade and Exhibition Centre (MITEC)',
      blurb:
        "Malaysia's newest and largest exhibition centre hosting MIHAS (Malaysia International Halal Showcase), Malaysia Tech Week and major government-supported trade events — designed to international MICE standards.",
      shows: ['MIHAS', 'Malaysia Tech Week', 'Government trade events', 'ASEAN industry shows'],
    },
    {
      city: 'Kuala Lumpur',
      name: 'Kuala Lumpur Convention Centre (KLCC)',
      blurb:
        "KL's premium convention and exhibition venue in the Petronas Twin Towers complex — hosting Finance Malaysia, Manufacturing conferences, Oil & Gas exhibitions and international corporate events.",
      shows: ['Finance Malaysia', 'Oil & Gas exhibitions', 'Manufacturing conferences', 'International corporate events'],
    },
    {
      city: 'Kuala Lumpur',
      name: 'Putra World Trade Centre (PWTC)',
      blurb:
        "One of Malaysia's longest-established exhibition venues — hosting MIFF (Malaysia International Furniture Fair), Malaysia Auto Show and regional trade events for furniture, automotive and consumer sectors.",
      shows: ['MIFF', 'Malaysia Auto Show', 'Regional trade events', 'Consumer shows'],
    },
    {
      city: 'Penang',
      name: 'SPICE Arena & Penang International Exhibition Centre',
      blurb:
        "Northern Malaysia's main MICE venue serving Penang's tech and manufacturing industry — hosting industrial exhibitions, Malaysia-China business events and tech sector shows.",
      shows: ['Industrial exhibitions', 'Malaysia-China business events', 'Tech sector shows', 'Manufacturing events'],
    },
    {
      city: 'Johor Bahru',
      name: 'Persada Johor International Convention Centre',
      blurb:
        "Southern Malaysia's convention venue serves the Iskandar Malaysia economic zone — hosting Johor business events and cross-border Singapore-Malaysia trade exhibitions.",
      shows: ['Iskandar Malaysia events', 'Cross-border trade shows', 'Johor business events'],
    },
  ],

  exhibitions: [
    { m: 'Feb', y: '26', name: 'MIFF Kuala Lumpur',                  cat: 'Furniture & Interior Design',    venue: 'PWTC Kuala Lumpur' },
    { m: 'Mar', y: '26', name: 'MTE Malaysia',                        cat: 'Manufacturing Technology',        venue: 'MITEC Kuala Lumpur' },
    { m: 'Apr', y: '26', name: 'MIHAS Kuala Lumpur',                  cat: 'Halal Products & Industry',      venue: 'MITEC Kuala Lumpur' },
    { m: 'May', y: '26', name: 'Malaysia Tech Week',                  cat: 'Technology & Innovation',        venue: 'MITEC Kuala Lumpur' },
    { m: 'Jun', y: '26', name: 'Malaysia Autoshow',                   cat: 'Automotive & Mobility',          venue: 'MITEC Kuala Lumpur' },
    { m: 'Jul', y: '26', name: 'Franchise & License Asia',            cat: 'Franchise & Business',           venue: 'KLCC Kuala Lumpur' },
    { m: 'Aug', y: '26', name: 'Foodex Malaysia',                     cat: 'Food & Beverage',                venue: 'MITEC Kuala Lumpur' },
    { m: 'Sep', y: '26', name: 'Malaysia Healthcare Travel Fair',     cat: 'Medical Tourism & Healthcare',   venue: 'KLCC Kuala Lumpur' },
    { m: 'Oct', y: '26', name: 'IGEM Kuala Lumpur',                   cat: 'Greentech & Eco Products',       venue: 'MITEC Kuala Lumpur' },
    { m: 'Nov', y: '26', name: 'MARIE Expo Kuala Lumpur',             cat: 'Automotive, Robotics & IoT',     venue: 'MITEC Kuala Lumpur' },
    { m: 'Nov', y: '26', name: 'Malaysia International Boat Show',    cat: 'Marine & Leisure',               venue: 'Kuala Lumpur' },
  ],

  industries: [
    {
      t: 'Halal Products & Food',
      d: 'Exhibition stands for halal food manufacturers, ingredient suppliers and certifying body partners at MIHAS — the world\'s largest halal trade show.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Furniture & Interior Design',
      d: 'Design-led stands for furniture brands and material suppliers at MIFF Kuala Lumpur.',
    },
    {
      t: 'Manufacturing & Industrial Technology',
      d: 'Product-focused stands for machinery and manufacturing technology companies at MTE Malaysia.',
    },
    {
      t: 'Technology & ICT',
      d: 'Forward-looking stands for IT, software and technology brands at Malaysia Tech Week.',
    },
    {
      t: 'Automotive & Mobility',
      d: 'Display stands for automotive brands, parts manufacturers and EV companies at Malaysia Autoshow.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Greentech & Sustainability',
      d: 'Eco-positioned stands for clean technology, renewable energy and sustainability companies at IGEM.',
    },
    {
      t: 'Healthcare & Medical Tourism',
      d: 'Professional-grade stands for healthcare brands and medical tourism operators at Malaysia healthcare events.',
    },
    {
      t: 'Food & Beverage Export',
      d: 'Trade display stands for food exporters, FMCG brands and beverage companies at Foodex Malaysia.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Malaysia do?',
      a: 'An exhibition stall design agency in Malaysia creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Malaysian trade fairs — MIHAS, IGEM, MTE, Malaysia Tech Week, MIFF and more.',
    },
    {
      q: 'Why do Indian companies exhibit in Malaysia?',
      a: "Malaysia is Southeast Asia's third-largest economy and a halal industry hub. Indian companies exhibit here to access Malaysian buyers, ASEAN distribution networks and the large halal consumer market — leveraging strong India-Malaysia trade ties.",
    },
    {
      q: 'Can Approach Media support Indian companies at Malaysian trade shows?',
      a: 'Yes. We support Indian companies exhibiting at Malaysian trade fairs — coordinating booth design, 3D concepts, fabrication, branding, logistics and on-site installation at MITEC, KLCC and other Malaysian venues.',
    },
    {
      q: 'What is MIHAS and why do Indian companies exhibit there?',
      a: 'MIHAS (Malaysia International Halal Showcase) is the world\'s largest halal trade show, held annually at MITEC Kuala Lumpur. Indian halal food manufacturers, ingredient suppliers and consumer goods brands exhibit here to meet halal buyers from Malaysia, Middle East, ASEAN and global Muslim-majority markets.',
    },
    {
      q: 'Do you provide booth design for MITEC Kuala Lumpur?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at MITEC — including MIHAS, Malaysia Tech Week, IGEM, MTE and MARIE Expo.',
    },
    {
      q: 'What is IGEM Malaysia?',
      a: "IGEM (International Greentech & Eco Products Exhibition and Conference) is Malaysia's largest green technology and sustainability trade show, held annually at MITEC Kuala Lumpur. Indian clean technology, renewable energy and environmental product companies exhibit here to meet Malaysian and ASEAN sustainability buyers.",
    },
    {
      q: 'How early should we plan for a Malaysian trade fair?',
      a: 'For Malaysian trade shows we recommend starting 45 to 75 days before the event. MIHAS and IGEM have higher demand and earlier planning is advised for larger custom stands.',
    },
    {
      q: 'What types of stands do you build for Malaysia trade fairs?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits and branded experience zones — built to MITEC and KLCC venue specifications.',
    },
    {
      q: 'Do you create 3D booth designs before fabrication?',
      a: 'Yes. A detailed 3D booth concept is created before any production begins so your team can review and approve the layout, branding, display, lighting and visitor flow in advance.',
    },
    {
      q: 'What information does Approach Media need to begin?',
      a: 'Exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and timeline.',
    },
  ],

  cta: {
    heading1: 'Planning to exhibit in Malaysia?',
    heading2gradient: "Let's build a booth that opens ASEAN doors.",
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support in Kuala Lumpur and across Malaysia.',
  },
}

export default function MalaysiaPage() {
  return <CountryPageTemplate data={data} />
}
