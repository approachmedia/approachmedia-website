import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Agency in USA | Booth Builders" },
  description: 'Approach Media is an exhibition stall design agency in the USA — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Las Vegas, Chicago, Orlando, New York, Houston and Atlanta.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-usa` },
}

const data: CountryPageData = {
  country: 'USA',
  wordmark: 'USA',
  slug: 'exhibition-stall-design-agency-usa',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/usa-hero.jpg',
  areaServed: ['USA', 'Las Vegas', 'Chicago', 'Orlando', 'New York', 'Houston', 'Atlanta'],

  meta: {
    title: "Exhibition Stall Design Agency in USA | Booth Builders",
    description: 'Approach Media is an exhibition stall design agency in the USA — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Las Vegas, Chicago, Orlando, New York, Houston and Atlanta.',
  },

  hero: {
    regionBadge: 'USA · North America',
    greetingLine: 'Hello, Las Vegas, Chicago, Orlando',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'American trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across the United States. From 3D stand concepts and fabrication to branding, installation and dismantling — at Las Vegas Convention Center, McCormick Place, OCCC, Javits Center and more.',
    statLabel: 'Across the USA',
    citiesCount: '6+',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Las Vegas · Chicago · Orlando · New York',
      'Support for Indian companies at US trade shows',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your US Exhibition',
  },

  standOut: {
    body1: 'The United States is the world\'s largest economy and home to some of the highest-volume trade shows — CES, SEMA, PACK Expo, FABTECH and more. Indian companies exhibit here to launch products, meet US buyers, distributors, retail chains and enterprise clients.',
    body2: 'We help Indian exhibitors build stands that match American market expectations — engineered for the visitor volumes, competitive halls and visual standards of major US convention centres.',
    cards: [
      {
        t: 'IAEE & Venue Standard Builds',
        d: 'Structures built to US convention centre guidelines, freeman-compatible systems and OSHA safety standards across major US venues.',
      },
      {
        t: 'High-Visitor-Volume Design',
        d: 'American trade shows see thousands of visitors per day. We engineer booth flows, product zones and branding for high-traffic exhibition environments.',
      },
      {
        t: 'Product Display & Demo Staging',
        d: 'Structured areas for live product demonstrations, sample viewing and brand storytelling — for consumer, tech and industrial US audiences.',
      },
      {
        t: 'Meeting Rooms & Sales Areas',
        d: 'Semi-private meeting spaces and sales counters designed for retailer conversations, distributor pitches and enterprise client meetings.',
      },
      {
        t: 'English-First Brand Presentation',
        d: 'All copy, panels and digital content designed for US market communication — clear, direct and product-first.',
      },
      {
        t: 'Time-Zone Aware Coordination',
        d: 'Design, approval and production managed across India-US time zones — on-site execution by our US-coordinate team at the show venue.',
      },
    ],
  },

  venues: [
    {
      city: 'Las Vegas',
      name: 'Las Vegas Convention Center',
      blurb: 'The anchor for CES (world\'s largest consumer tech show), SEMA Automotive, ASD Market Week and SHOT Show. Las Vegas hosts more trade show visitors than any other US city.',
      shows: ['CES', 'SEMA', 'ASD Market Week', 'SHOT Show', 'IRCE'],
    },
    {
      city: 'Chicago',
      name: 'McCormick Place',
      blurb: 'America\'s largest convention centre — home to PACK Expo, FABTECH, National Restaurant Association Show, International Manufacturing Technology Show and Radiological Society gatherings.',
      shows: ['PACK Expo', 'FABTECH', 'IMTS', 'NRA Show', 'RSNA'],
    },
    {
      city: 'Orlando',
      name: 'Orange County Convention Center',
      blurb: 'Florida\'s primary convention hub hosting NPE (plastics), IAAPA (attractions & entertainment), HIMSS (healthcare IT) and leading medical and technology summits.',
      shows: ['NPE', 'IAAPA', 'HIMSS', 'Orlando tech summits'],
    },
    {
      city: 'New York',
      name: 'Javits Center',
      blurb: 'New York\'s flagship convention centre — home to the New York Auto Show, NY NOW (gift & home), comic conventions, and major finance and fashion industry events.',
      shows: ['NY Auto Show', 'NY NOW', 'Comic Con', 'Major finance events'],
    },
    {
      city: 'Houston',
      name: 'George R. Brown Convention Center',
      blurb: 'Energy capital venue for Offshore Technology Conference, OTC (the world\'s largest oil and gas exhibition) and major industrial and energy sector shows.',
      shows: ['OTC', 'Offshore Technology Conference', 'Energy events', 'Industrial shows'],
    },
    {
      city: 'Atlanta',
      name: 'Georgia World Congress Center',
      blurb: 'Southeast US hub for MODEX (supply chain), AmericasMart (gift & home), Dragon Con and healthcare and manufacturing events serving the US South and Mid-West.',
      shows: ['MODEX', 'AmericasMart', 'Supply chain events', 'Healthcare summits'],
    },
  ],

  exhibitions: [
    { m: 'Jan', y: '26', name: 'CES Las Vegas',               cat: 'Consumer Electronics & Technology', venue: 'Las Vegas Convention Center' },
    { m: 'Jan', y: '26', name: 'SHOT Show Las Vegas',         cat: 'Shooting, Hunting & Outdoor',       venue: 'Sands Expo, Las Vegas' },
    { m: 'Feb', y: '26', name: 'MD&M West Anaheim',           cat: 'Medical Design & Manufacturing',    venue: 'Anaheim Convention Center' },
    { m: 'Feb', y: '26', name: 'International Builders Show', cat: 'Construction & Home Building',      venue: 'Las Vegas Convention Center' },
    { m: 'Mar', y: '26', name: 'ASD Market Week Las Vegas',   cat: 'Wholesale Consumer Goods',          venue: 'Las Vegas Convention Center' },
    { m: 'Mar', y: '26', name: 'Natural Products Expo West',  cat: 'Natural & Organic Products',        venue: 'Anaheim Convention Center' },
    { m: 'Jun', y: '26', name: 'InfoComm Las Vegas',          cat: 'AV & Pro-Tech',                     venue: 'Las Vegas Convention Center' },
    { m: 'Sep', y: '26', name: 'IMTS Chicago',                cat: 'Manufacturing Technology',           venue: 'McCormick Place, Chicago' },
    { m: 'Oct', y: '26', name: 'PACK Expo Chicago',           cat: 'Packaging & Processing',            venue: 'McCormick Place, Chicago' },
    { m: 'Nov', y: '26', name: 'FABTECH Chicago',             cat: 'Metal Forming & Fabrication',       venue: 'McCormick Place, Chicago' },
    { m: 'Nov', y: '26', name: 'SEMA Las Vegas',              cat: 'Automotive Aftermarket',            venue: 'Las Vegas Convention Center' },
    { m: 'Nov', y: '26', name: 'OTC Houston',                 cat: 'Offshore Technology',               venue: 'NRG Center, Houston' },
  ],

  industries: [
    {
      t: 'Consumer Electronics & Technology',
      d: 'Booths for electronics brands, tech startups and connected device manufacturers at CES Las Vegas.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Automotive & Transportation',
      d: 'Display stands for auto-parts, accessories and EV components at SEMA Las Vegas and NY Auto Show.',
    },
    {
      t: 'Healthcare & Medical Devices',
      d: 'Clean, regulatory-compliant stands for medical device and pharma companies at MD&M West and HIMSS.',
    },
    {
      t: 'Food & Restaurant Industry',
      d: 'Exhibition stands for food manufacturers, exporters and equipment brands at NRA Show Chicago.',
    },
    {
      t: 'Manufacturing & Industrial',
      d: 'Product-focused booths for machinery and processing equipment at FABTECH, IMTS and PACK Expo.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Construction & Real Estate',
      d: 'Brand-forward stands for construction material, tools and proptech companies at IBS Las Vegas.',
    },
    {
      t: 'Oil, Gas & Energy',
      d: 'Specification-grade exhibition stands for energy sector companies at OTC Houston.',
    },
    {
      t: 'Consumer & Wholesale Goods',
      d: 'High-impact retail display stands for consumer brands exhibiting at ASD Market Week Las Vegas.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in the USA do?',
      a: 'An exhibition stall design agency in the USA creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at US trade shows in Las Vegas, Chicago, Orlando, New York, Houston and Atlanta.',
    },
    {
      q: 'Which US cities are most important for trade shows?',
      a: 'Las Vegas, Chicago and Orlando are the top three US trade show cities by volume. Las Vegas hosts CES and SEMA; Chicago hosts PACK Expo, FABTECH and IMTS; Orlando hosts NPE and IAAPA. New York, Houston and Atlanta are significant for specific sectors.',
    },
    {
      q: 'Can Approach Media support Indian companies at US trade shows?',
      a: 'Yes. We specifically support Indian companies exhibiting at US trade fairs — coordinating design, 3D booth concepts, fabrication, branding, logistics and on-site installation.',
    },
    {
      q: 'What is CES and how do Indian companies exhibit there?',
      a: 'CES is the world\'s largest consumer electronics and technology trade show, held annually in Las Vegas in January. Indian tech startups, electronics manufacturers and IT companies exhibit here to meet US retailers, investors and enterprise buyers.',
    },
    {
      q: 'Do you provide booth design for McCormick Place Chicago?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at McCormick Place — including PACK Expo, FABTECH, IMTS, NRA Show and RSNA.',
    },
    {
      q: 'How early should we plan a booth for a US trade show?',
      a: 'For US trade shows we recommend starting 60 to 120 days before the event. CES, SEMA and PACK Expo require earlier planning due to higher demand and move-in complexities.',
    },
    {
      q: 'What US venue standards does Approach Media comply with?',
      a: 'We design and build to IAEE guidelines, individual convention centre regulations, and OSHA standards applicable to exhibition construction at each US venue.',
    },
    {
      q: 'Do you create 3D booth designs before fabrication?',
      a: 'Yes. A detailed 3D booth concept is created before any production begins so your team can review and approve the layout, branding, display, lighting and visitor flow in advance.',
    },
    {
      q: 'What types of exhibition stands do you build for US shows?',
      a: 'Shell-scheme upgrades, custom-built booths, modular inline stands, island exhibits, double-decker structures, product demo zones and branded experience installations — to US venue specifications.',
    },
    {
      q: 'What information does Approach Media need to begin?',
      a: 'Exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and timeline.',
    },
  ],

  cta: {
    heading1: 'Planning to exhibit in the USA?',
    heading2gradient: 'Let\'s build a booth that wins on the American floor.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Las Vegas to Chicago.',
  },
}

export default function USAPage() {
  return (
    <CountryPageTemplate
      data={data}
      fromTheBlog={blogLinksFor([
        're-plus-2026-indian-exhibitors-guide',
        'exhibition-stand-cost-dubai-indian-exhibitors',
      ])}
    />
  )
}
