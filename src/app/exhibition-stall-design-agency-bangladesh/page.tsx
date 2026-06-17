import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Bangladesh | Booth Design Dhaka',
  description:
    'Approach Media is an exhibition stall design agency in Bangladesh — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Dhaka International Trade Fair, Bangladesh Denim Expo, BGAPE and major Dhaka trade shows.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-bangladesh` },
}

const data: CountryPageData = {
  country: 'Bangladesh',
  wordmark: 'BANGLADESH',
  slug: 'exhibition-stall-design-agency-bangladesh',
  areaServed: ['Bangladesh', 'Dhaka', 'Chittagong', 'Sylhet'],

  meta: {
    title: 'Exhibition Stall Design Agency in Bangladesh | Booth Design Dhaka',
    description:
      'Approach Media is an exhibition stall design agency in Bangladesh — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Dhaka International Trade Fair, Bangladesh Denim Expo, BGAPE and major Dhaka trade shows.',
  },

  hero: {
    regionBadge: 'Bangladesh · South Asia',
    greetingLine: 'Assalamu Alaikum, Dhaka, Chittagong',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Bangladesh trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Bangladesh. From 3D stand concepts and fabrication to branding, installation and dismantling — at Bashundhara International Convention City, ICCB and exhibition venues across Dhaka.',
    statLabel: 'Across Bangladesh',
    citiesCount: '3',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Dhaka · Chittagong · Sylhet',
      'Support for Indian companies at Bangladesh trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Bangladesh Exhibition',
  },

  standOut: {
    body1:
      "Bangladesh is one of South Asia's fastest-growing economies — the world's second-largest garment exporter with a booming consumer market of 170 million people. Indian companies exhibit in Dhaka to supply raw materials, machinery, chemicals and consumer goods to Bangladesh's manufacturing and retail sectors.",
    body2:
      "We help Indian exhibitors build stands that meet Dhaka venue standards, communicate product value to Bangladeshi buyers and reflect the professional brand presentation needed in a competitive South Asian marketplace.",
    cards: [
      {
        t: 'Dhaka Venue Compliant Builds',
        d: 'Structures built to Bashundhara International Convention City and BICC regulations — electrical specs, safety codes and organiser move-in schedules planned from the start.',
      },
      {
        t: 'RMG & Textile Supply Chain Positioning',
        d: "Bangladesh's RMG sector sources heavily from India. We build stands that clearly communicate raw material quality, compliance certifications and supply chain reliability.",
      },
      {
        t: 'Consumer Market Entry Presence',
        d: "Bangladesh's rising middle class drives demand for branded consumer goods. We design product-display stands that introduce Indian consumer brands to Bangladeshi retail buyers.",
      },
      {
        t: 'B2B Procurement Focus',
        d: 'Bangladesh trade fairs attract procurement managers from garment factories, textile mills and manufacturing units. We design stands that facilitate B2B conversations and sampling.',
      },
      {
        t: 'Hindi, Bengali & English Branding',
        d: 'Bilingual or trilingual branding for Bengali-speaking buyers, Hindi-reading trade visitors and English-speaking business professionals.',
      },
      {
        t: 'Cross-Border Logistics Support',
        d: "India-Bangladesh trade involves specific customs and border logistics. We coordinate fabrication, shipping and installation within Dhaka's exhibition schedule.",
      },
    ],
  },

  venues: [
    {
      city: 'Dhaka',
      name: 'Bashundhara International Convention City (BICC)',
      blurb:
        "Bangladesh's largest and most modern convention and exhibition complex — hosting the Dhaka International Trade Fair, Bangladesh Denim Expo, BGAPE and major government-sponsored national and international trade exhibitions.",
      shows: ['Dhaka International Trade Fair', 'Bangladesh Denim Expo', 'BGAPE', 'National trade exhibitions'],
    },
    {
      city: 'Dhaka',
      name: 'International Convention City Bashundhara',
      blurb:
        'A major Dhaka venue hosting garment and textile B2B events, Bangladesh Textile Summit and sourcing exhibitions for the RMG supply chain industry.',
      shows: ['Bangladesh Textile Summit', 'Garment B2B events', 'RMG sourcing exhibitions'],
    },
    {
      city: 'Dhaka',
      name: 'Hotel and Corporate Exhibition Venues',
      blurb:
        "Dhaka's major hotels — Intercontinental, Westin, Radisson — host pharma product launches, technology exhibitions, FMCG dealer meets and sector-specific B2B events for companies entering the Bangladesh market.",
      shows: ['Pharma launches', 'Technology events', 'FMCG dealer meets', 'B2B sector events'],
    },
    {
      city: 'Chittagong',
      name: 'Chittagong Trade Fair Complex',
      blurb:
        "Chittagong's port city venue hosts industrial trade events, machinery exhibitions and B2B shows for Bangladesh's second-largest commercial hub — home to the country's major port and manufacturing clusters.",
      shows: ['Industrial trade events', 'Machinery exhibitions', 'Port industry B2B', 'Manufacturing shows'],
    },
  ],

  exhibitions: [
    { m: 'Jan', y: '26', name: 'Dhaka International Trade Fair (DITF)',              cat: 'General Trade & Export',       venue: 'Bangabandhu Exhibition Centre, Dhaka' },
    { m: 'Feb', y: '26', name: 'Bangladesh Plastic, Printing & Packaging Exhibition', cat: 'Plastics & Packaging',         venue: 'BICC Dhaka' },
    { m: 'Mar', y: '26', name: 'Bangladesh Textile Summit',                           cat: 'Textile & Yarn Trade',         venue: 'BICC Dhaka' },
    { m: 'Apr', y: '26', name: 'BGMEA Sourcing Show',                                cat: 'Garment & Apparel Sourcing',   venue: 'Dhaka' },
    { m: 'May', y: '26', name: 'Bangladesh Chemical & Dye Expo',                     cat: 'Chemical & Dyestuff',          venue: 'BICC Dhaka' },
    { m: 'Jul', y: '26', name: 'Bangladesh Denim Expo',                              cat: 'Denim & Wash Technology',      venue: 'BICC Dhaka' },
    { m: 'Sep', y: '26', name: 'Bangladesh Garment Accessories & Packaging Expo (BGAPE)', cat: 'Garment Accessories',    venue: 'BICC Dhaka' },
    { m: 'Oct', y: '26', name: 'Bangladesh International Food & Agro',               cat: 'Food & Agriculture',           venue: 'BICC Dhaka' },
    { m: 'Nov', y: '26', name: 'Bangladesh ICT Expo',                                cat: 'Technology & ICT',             venue: 'BICC Dhaka' },
    { m: 'Dec', y: '26', name: 'Dhaka International Leather & Footwear Sourcing',    cat: 'Leather & Footwear',           venue: 'BICC Dhaka' },
  ],

  industries: [
    {
      t: 'Textile, Yarn & Fabric',
      d: "Trade display stands for Indian textile mills, yarn producers and fabric exporters supplying Bangladesh's world-leading garment manufacturing industry.",
      span: 'lg:col-span-2',
    },
    {
      t: 'Garment Accessories & Trims',
      d: "Display stands for buttons, zippers, labels and garment accessories manufacturers at BGAPE — Bangladesh's major accessories fair.",
    },
    {
      t: 'Chemicals, Dyes & Processing',
      d: "Technical product stands for Indian chemical, dyestuff and textile processing companies supplying Bangladesh's RMG factories.",
    },
    {
      t: 'Packaging & Plastics',
      d: "Product-display stands for packaging material, plastic products and processing machinery companies at Bangladesh exhibitions.",
    },
    {
      t: 'Machinery & Equipment',
      d: "Industrial display stands for Indian machinery manufacturers supplying Bangladesh's garment, textile and manufacturing sectors.",
      span: 'lg:col-span-2',
    },
    {
      t: 'Pharmaceutical & Healthcare',
      d: "Professional exhibition stands for Indian pharma companies and healthcare brands entering Bangladesh's large generic medicine and healthcare market.",
    },
    {
      t: 'Consumer Goods & Food',
      d: "Trade display stands for FMCG brands, packaged food exporters and consumer goods companies accessing Bangladesh's growing consumer market.",
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Bangladesh do?',
      a: 'An exhibition stall design agency in Bangladesh creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Dhaka International Trade Fair, Bangladesh Denim Expo, BGAPE, Bangladesh Textile Summit and other Dhaka trade shows.',
    },
    {
      q: 'Why do Indian companies exhibit in Bangladesh?',
      a: "Bangladesh is India's largest export destination in South Asia. Indian textile mills, chemical companies, machinery manufacturers and FMCG brands exhibit in Dhaka to supply Bangladesh's RMG sector, reach Bangladeshi consumers and recruit local distributors.",
    },
    {
      q: 'Can Approach Media support Indian companies at Bangladesh trade shows?',
      a: 'Yes. We support Indian companies exhibiting at Bangladesh trade fairs — coordinating booth design, fabrication, branding, cross-border logistics and on-site installation in Dhaka.',
    },
    {
      q: 'What is the Dhaka International Trade Fair?',
      a: 'The Dhaka International Trade Fair (DITF) is Bangladesh\'s largest annual trade exhibition, held at Bangabandhu Exhibition Centre in Dhaka. It runs for a full month in January and attracts millions of visitors — both consumer and B2B. Indian manufacturers and exporters participate here to reach Bangladeshi buyers at scale.',
    },
    {
      q: 'What is BGAPE Bangladesh?',
      a: "BGAPE (Bangladesh Garment Accessories & Packaging Expo) is Bangladesh's major trade fair for garment accessories, trimmings, packaging materials and production inputs — held at BICC Dhaka. Indian button, zipper, label and accessory manufacturers exhibit here to meet Bangladesh's 4,000+ garment factories.",
    },
    {
      q: 'What is Bangladesh Denim Expo?',
      a: "Bangladesh Denim Expo is the world's only dedicated denim and wash technology trade fair, held in Dhaka. Indian denim fabric mills, denim chemical suppliers and wash technology companies exhibit here to reach Bangladesh's denim export industry.",
    },
    {
      q: 'How do I get exhibition materials from India to Bangladesh?',
      a: 'Exhibition materials from India to Bangladesh can cross via the Petrapole-Benapole or Gede-Darsana border checkpoints. We coordinate cross-border logistics, customs documentation and carnet procedures as part of our turnkey exhibition service.',
    },
    {
      q: 'How early should we plan for a Bangladesh trade fair?',
      a: 'For Bangladesh trade shows we recommend starting 45 to 60 days before the event. Cross-border logistics and customs coordination add lead time to the planning process.',
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
    heading1: 'Planning to exhibit in Bangladesh?',
    heading2gradient: "Let's build a booth that connects with Dhaka's buyers.",
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with cross-border logistics support and full execution in Dhaka.',
  },
}

export default function BangladeshPage() {
  return <CountryPageTemplate data={data} />
}
