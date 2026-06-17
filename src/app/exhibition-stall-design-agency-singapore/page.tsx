import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Singapore | Booth Design & Fabrication',
  description: 'Approach Media is an exhibition stall design agency in Singapore — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Singapore Airshow, Food & Hotel Asia, GITEX Asia, CommunicAsia and more.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-singapore` },
}

const data: CountryPageData = {
  country: 'Singapore',
  wordmark: 'SINGAPORE',
  slug: 'exhibition-stall-design-agency-singapore',
  areaServed: ['Singapore', 'Marina Bay', 'Changi', 'Suntec City'],

  meta: {
    title: 'Exhibition Stall Design Agency in Singapore | Booth Design & Fabrication',
    description: 'Approach Media is an exhibition stall design agency in Singapore — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Singapore Airshow, Food & Hotel Asia, GITEX Asia, CommunicAsia and more.',
  },

  hero: {
    regionBadge: 'Singapore · Southeast Asia',
    greetingLine: 'Selamat Datang, Singapore, Marina Bay',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Singapore trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Singapore. From 3D stand concepts and fabrication to branding, installation and dismantling — at Singapore EXPO, Suntec Singapore, Marina Bay Sands and Changi Exhibition Centre.',
    statLabel: 'Across Singapore',
    citiesCount: '1',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Singapore Expo · Suntec · Marina Bay Sands',
      'Support for Indian companies at Singapore shows',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Singapore Exhibition',
  },

  standOut: {
    body1: 'Singapore is Southeast Asia\'s premier MICE destination and a gateway to ASEAN markets of 680 million people. Indian companies exhibit here at Singapore Airshow, Food & Hotel Asia, GITEX Asia and CommunicAsia to connect with regional buyers, distributors and government procurement across ASEAN.',
    body2: 'We help Indian exhibitors build stands that meet Singapore\'s high venue standards, ASEAN audience expectations and the competitive visual standards of Asia-Pacific trade fairs.',
    cards: [
      {
        t: 'BCA & Venue Compliant Builds',
        d: 'Structures built to Singapore Building and Construction Authority guidelines, venue fire safety codes and organiser specifications.',
      },
      {
        t: 'Asia-Pacific Premium Presentation',
        d: 'Singapore draws elite buyers, government delegations and enterprise clients from across Asia. We build stands that reflect your brand\'s international standing.',
      },
      {
        t: 'Multi-Market Audience Branding',
        d: 'Singapore visitors come from across ASEAN, China, India and the Gulf. We design branding that works for English-speaking and multilingual audiences.',
      },
      {
        t: 'Compact, High-Impact Layouts',
        d: 'Singapore exhibition space is premium-priced. We design layouts that maximise every square metre — display-dense, conversion-focused and spatially efficient.',
      },
      {
        t: 'Indian Exhibitor Network',
        d: 'Singapore hosts a large Indian business community. We understand Indian brand positioning in the ASEAN market and help you connect with regional opportunities.',
      },
      {
        t: 'ASEAN Gateway Positioning',
        d: 'Exhibiting in Singapore signals regional intent to buyers from Malaysia, Indonesia, Thailand, Vietnam and the Philippines — we help your booth reflect that positioning.',
      },
    ],
  },

  venues: [
    {
      city: 'Changi / Tanah Merah',
      name: 'Singapore EXPO',
      blurb: 'Singapore\'s largest exhibition centre hosting Food & Hotel Asia, Singapore International Water Week, Milipol Asia, Gamescom Asia and major government and trade exhibitions.',
      shows: ['Food & Hotel Asia', 'SIWW', 'Milipol Asia', 'Gamescom Asia', 'Franchise Asia'],
    },
    {
      city: 'Suntec City',
      name: 'Suntec Singapore Convention & Exhibition Centre',
      blurb: 'Central Singapore\'s premier MICE venue hosting CommunicAsia, ConnecTechAsia, Milipol Asia side events, FinTech Festival exhibitions and regional corporate shows.',
      shows: ['CommunicAsia', 'ConnecTechAsia', 'FinTech Festival', 'Regional corporate events'],
    },
    {
      city: 'Marina Bay',
      name: 'Marina Bay Sands Expo & Convention Centre',
      blurb: 'Asia\'s most iconic convention venue — hosting luxury summits, private exhibitions, Asian Financial Forum side events and premium B2B showcases for global brands.',
      shows: ['Luxury summits', 'Private B2B exhibitions', 'Corporate launches', 'Premium brand showcases'],
    },
    {
      city: 'Changi',
      name: 'Changi Exhibition Centre',
      blurb: 'Singapore Airshow\'s dedicated venue — one of Asia\'s most important aerospace and defence events. Hosts static aircraft displays, defence technology and aerospace component exhibitions.',
      shows: ['Singapore Airshow', 'Aerospace & defence', 'Aviation MRO', 'Defence tech'],
    },
    {
      city: 'One-North / Fusionopolis',
      name: 'Fusionopolis & Science Park',
      blurb: 'Singapore\'s technology and biomedical innovation district hosting BioTechAsia, pharmaceutical summits and tech company showcases in Asia\'s leading R&D corridor.',
      shows: ['BioTechAsia', 'Pharma summits', 'R&D showcases', 'Tech company exhibitions'],
    },
  ],

  exhibitions: [
    { m: 'Feb', y: '26', name: 'Singapore Airshow',                   cat: 'Aerospace & Aviation',          venue: 'Changi Exhibition Centre' },
    { m: 'Mar', y: '26', name: 'International Seaport & Logistics',   cat: 'Maritime & Ports',              venue: 'Suntec Singapore' },
    { m: 'Apr', y: '26', name: 'Food & Hotel Asia (FHA)',             cat: 'Food & Hospitality',            venue: 'Singapore EXPO' },
    { m: 'Apr', y: '26', name: 'Milipol Asia-Pacific',                cat: 'Security & Defence',            venue: 'Singapore EXPO' },
    { m: 'May', y: '26', name: 'CommunicAsia Singapore',              cat: 'Telecoms & ICT',                venue: 'Suntec Singapore' },
    { m: 'May', y: '26', name: 'ConnecTechAsia',                      cat: 'Connectivity & Technology',     venue: 'Suntec Singapore' },
    { m: 'Jun', y: '26', name: 'BroadcastAsia Singapore',             cat: 'Broadcast & Media Technology',  venue: 'Suntec Singapore' },
    { m: 'Jul', y: '26', name: 'Singapore International Water Week',  cat: 'Water Technology',              venue: 'Singapore EXPO' },
    { m: 'Sep', y: '26', name: 'Asia Pharma Expo',                    cat: 'Pharmaceutical & Healthcare',   venue: 'Marina Bay Sands' },
    { m: 'Oct', y: '26', name: 'GITEX Asia Singapore',                cat: 'Technology & Innovation',       venue: 'Singapore EXPO' },
    { m: 'Nov', y: '26', name: 'Singapore FinTech Festival',          cat: 'Financial Technology',          venue: 'Singapore EXPO' },
    { m: 'Nov', y: '26', name: 'OSEA Singapore',                      cat: 'Oil & Gas / Offshore',          venue: 'Singapore EXPO' },
  ],

  industries: [
    {
      t: 'Aviation & Aerospace',
      d: 'High-specification stands for aviation, aerospace and MRO companies at Singapore Airshow — Asia\'s premier aerospace event.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Food & Hospitality',
      d: 'Display stands for food processors, hospitality equipment and beverage brands at Food & Hotel Asia Singapore.',
    },
    {
      t: 'Technology & Telecoms',
      d: 'Innovation-forward booths for IT, telecoms and connectivity brands at CommunicAsia and GITEX Asia.',
    },
    {
      t: 'Maritime & Shipping',
      d: 'Branded stands for maritime technology, port logistics and shipping companies at Singapore maritime events.',
    },
    {
      t: 'Energy & Oil and Gas',
      d: 'Specification-grade stands for energy and offshore companies at OSEA Singapore.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Healthcare & Life Sciences',
      d: 'Professional-grade stands for pharma, biotech and medical device companies at Asia Pharma Expo.',
    },
    {
      t: 'Defence & Security',
      d: 'High-specification stands for defence technology and security companies at Milipol Asia-Pacific.',
    },
    {
      t: 'Financial Technology',
      d: 'Modern, brand-forward stands for fintech and financial services companies at Singapore FinTech Festival.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Singapore do?',
      a: 'An exhibition stall design agency in Singapore creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Singapore Airshow, Food & Hotel Asia, CommunicAsia, GITEX Asia, Singapore FinTech Festival and other Singapore trade shows.',
    },
    {
      q: 'Why do Indian companies exhibit in Singapore?',
      a: 'Singapore is Southeast Asia\'s premier business hub and a gateway to ASEAN markets. Indian companies exhibit here to meet buyers, distributors and enterprise clients from Malaysia, Indonesia, Thailand, Philippines and across the Asia-Pacific region.',
    },
    {
      q: 'Can Approach Media support Indian companies at Singapore trade shows?',
      a: 'Yes. We specifically support Indian companies exhibiting in Singapore — coordinating booth design, 3D concepts, fabrication, branding, logistics and on-site installation.',
    },
    {
      q: 'What is Food & Hotel Asia (FHA) Singapore?',
      a: 'Food & Hotel Asia is one of Asia\'s largest food and hospitality trade events, held biennially at Singapore EXPO. Indian food manufacturers, restaurant equipment suppliers and hospitality brands exhibit here to connect with ASEAN buyers and hospitality operators.',
    },
    {
      q: 'Do you provide booth design for Singapore EXPO?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at Singapore EXPO — including Food & Hotel Asia, Milipol Asia, GITEX Asia, Singapore International Water Week and FinTech Festival.',
    },
    {
      q: 'What is Singapore Airshow and how do companies exhibit there?',
      a: 'Singapore Airshow is Asia\'s largest aerospace and defence exhibition, held biennially at Changi Exhibition Centre. Aerospace manufacturers, MRO companies, defence suppliers and aviation technology firms exhibit here to meet airline, military and government buyers from across Asia.',
    },
    {
      q: 'How early should we plan for a Singapore trade show?',
      a: 'For Singapore shows we recommend starting 60 to 90 days before the event. Singapore Airshow requires 90 to 120 days lead time for airside and static display components.',
    },
    {
      q: 'What types of stands do you build for Singapore shows?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits, double-decker structures and branded experience zones — built to Singapore EXPO, Suntec and MBS venue specifications.',
    },
    {
      q: 'Do you create 3D booth designs before fabrication?',
      a: 'Yes. A detailed 3D booth concept is created before any production begins so your team can review the layout, branding, display, lighting and visitor flow in advance.',
    },
    {
      q: 'What information does Approach Media need to begin?',
      a: 'Exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and timeline.',
    },
  ],

  cta: {
    heading1: 'Planning to exhibit in Singapore?',
    heading2gradient: 'Let\'s build a booth that opens doors across Southeast Asia.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support in Singapore.',
  },
}

export default function SingaporePage() {
  return <CountryPageTemplate data={data} />
}
