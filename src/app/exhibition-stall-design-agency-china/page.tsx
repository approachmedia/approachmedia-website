import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in China | Booth Design & Fabrication',
  description:
    'Approach Media is an exhibition stall design agency in China — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Canton Fair, CIIE Shanghai, CHINAPLAS, Auto China and major Chinese trade fairs.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-china` },
}

const data: CountryPageData = {
  country: 'China',
  wordmark: 'CHINA',
  slug: 'exhibition-stall-design-agency-china',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/china-hero.jpg',
  areaServed: ['China', 'Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  meta: {
    title: 'Exhibition Stall Design Agency in China | Booth Design & Fabrication',
    description:
      'Approach Media is an exhibition stall design agency in China — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Canton Fair, CIIE Shanghai, CHINAPLAS, Auto China and major Chinese trade fairs.',
  },
  hero: {
    regionBadge: 'China · Asia',
    greetingLine: 'Nǐ hǎo, Shanghai, Beijing, Guangzhou',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'China trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across China. From 3D stand concepts and fabrication to branding, installation and dismantling — at the China Import and Export Fair Complex, NECC Shanghai, SNIEC and major Chinese exhibition venues.',
    statLabel: 'Across China',
    citiesCount: '5',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Shanghai · Beijing · Guangzhou · Shenzhen',
      'Support for Indian companies at Chinese trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your China Exhibition',
  },
  standOut: {
    body1:
      'China is the world\'s largest trade fair market and a critical destination for Indian companies seeking to access Chinese buyers, manufacturing partners and Asian distribution channels. The Canton Fair alone attracts 200,000+ buyers per session — a scale that demands a booth designed to compete.',
    body2:
      'We help Indian exhibitors navigate Chinese trade fair complexity — building stands that meet Chinese venue regulations, communicate clearly to Chinese buyers and reflect the international brand standards needed to stand out on the Chinese trade floor.',
    cards: [
      {
        t: 'Chinese Venue Regulation Compliance',
        d: 'Structures built to NECC, SNIEC, Canton Fair Complex and Chinese venue regulations — including fire codes, electrical specs and organiser-specific rules.',
      },
      {
        t: 'Chinese Market Brand Positioning',
        d: 'Chinese buyers evaluate booth quality as a proxy for company credibility. We build stands with the fit and finish needed to project brand authority in China.',
      },
      {
        t: 'Bilingual Communication Design',
        d: 'Chinese and English fascia, panels and branding — designed for Chinese domestic buyers and the international visitor base at major Chinese fairs.',
      },
      {
        t: 'High-Traffic Display Engineering',
        d: 'Canton Fair attracts tens of thousands of buyers daily. We engineer product display, visitor flow and brand visibility for high-density exhibition environments.',
      },
      {
        t: 'Product Demo & Sample Zones',
        d: 'Chinese buyers prefer to see, touch and test. We design product demonstration areas, sample display zones and test counters into booth layouts.',
      },
      {
        t: 'Logistics & Customs Coordination',
        d: 'We plan fabrication, logistics and customs clearance timelines for India-to-China exhibition shipments and material import requirements.',
      },
    ],
  },
  venues: [
    {
      city: 'Guangzhou',
      name: 'China Import and Export Fair Complex (Canton Fair)',
      blurb:
        'The world\'s oldest and largest trade fair — Canton Fair attracts over 200,000 buyers per session from 220 countries. Held twice yearly (April and October), it covers consumer goods, electronics, machinery, building materials and more.',
      shows: [
        'Canton Fair Spring',
        'Canton Fair Autumn',
        'Consumer goods',
        'Electronics',
        'Machinery',
        'Building materials',
      ],
    },
    {
      city: 'Shanghai',
      name: 'National Exhibition and Convention Center (NECC)',
      blurb:
        'China\'s largest single-building exhibition venue — hosting CIIE (China International Import Expo), CHINAPLAS, China International Import Expo and major Shanghai trade fairs. Connected directly to the Hongqiao transport hub.',
      shows: ['CIIE', 'CHINAPLAS', 'China Beauty Expo', 'Paperworld China'],
    },
    {
      city: 'Shanghai',
      name: 'Shanghai New International Expo Centre (SNIEC)',
      blurb:
        'Shanghai\'s second major venue hosting Auto Shanghai (alternating), CPhI China (pharma), China Coat (coatings), Propak China, Foodtech China and machinery and chemical industry events.',
      shows: ['Auto Shanghai', 'CPhI China', 'China Coat', 'Propak China', 'Foodtech China'],
    },
    {
      city: 'Beijing',
      name: 'China National Convention Center (CNCC)',
      blurb:
        'Beijing\'s premier exhibition and congress venue — hosting the China International Fair for Trade in Services (CIFTIS), Forum on China-Africa Cooperation events and government-aligned trade exhibitions.',
      shows: [
        'CIFTIS',
        'Forum on China-Africa Cooperation',
        'Government trade exhibitions',
        'Tech summits',
      ],
    },
    {
      city: 'Shenzhen',
      name: 'Shenzhen World Exhibition Centre',
      blurb:
        'One of the world\'s largest single-site exhibition venues — hosting the China Hi-Tech Fair (CHTF), Shenzhen International Furniture Exhibition and major tech and manufacturing industry shows.',
      shows: [
        'China Hi-Tech Fair',
        'Shenzhen Furniture Fair',
        'Tech industry shows',
        'Manufacturing events',
      ],
    },
    {
      city: 'Chengdu',
      name: 'Chengdu Century City New International Convention Centre',
      blurb:
        'Western China\'s gateway exhibition venue — hosting Chengdu International Auto Show, West China International Fair and events serving the fast-growing consumer and manufacturing markets of Sichuan province.',
      shows: [
        'Chengdu Auto Show',
        'West China International Fair',
        'Consumer events',
        'Manufacturing shows',
      ],
    },
  ],
  exhibitions: [
    { m: 'Mar', y: '26', name: 'CHINAPLAS Shanghai', cat: 'Plastics & Rubber Industry', venue: 'NECC Shanghai' },
    { m: 'Apr', y: '26', name: 'Canton Fair Spring Guangzhou', cat: 'Import & Export Trade', venue: 'Canton Fair Complex' },
    { m: 'Apr', y: '26', name: 'Auto Shanghai', cat: 'Automotive & Electric Vehicles', venue: 'SNIEC Shanghai' },
    { m: 'Apr', y: '26', name: 'China Beauty Expo Shanghai', cat: 'Beauty & Personal Care', venue: 'NECC Shanghai' },
    { m: 'May', y: '26', name: 'CPhI China Shanghai', cat: 'Pharmaceutical Ingredients', venue: 'SNIEC Shanghai' },
    { m: 'May', y: '26', name: 'Propak China Shanghai', cat: 'Food Packaging & Processing', venue: 'SNIEC Shanghai' },
    { m: 'Jun', y: '26', name: 'CIFTIS Beijing', cat: 'Trade in Services', venue: 'CNCC Beijing' },
    { m: 'Sep', y: '26', name: 'China Hi-Tech Fair Shenzhen', cat: 'Technology & Innovation', venue: 'Shenzhen World Centre' },
    { m: 'Sep', y: '26', name: 'Chengdu Auto Show', cat: 'Automotive', venue: 'Chengdu Century City' },
    { m: 'Oct', y: '26', name: 'Canton Fair Autumn Guangzhou', cat: 'Import & Export Trade', venue: 'Canton Fair Complex' },
    { m: 'Nov', y: '26', name: 'CIIE Shanghai', cat: 'International Import Expo', venue: 'NECC Shanghai' },
    { m: 'Nov', y: '26', name: 'Foodtech China Shanghai', cat: 'Food Technology & Processing', venue: 'SNIEC Shanghai' },
    { m: 'Nov', y: '26', name: 'China Coat Shanghai', cat: 'Coatings & Surface Technology', venue: 'SNIEC Shanghai' },
  ],
  industries: [
    {
      t: 'Import & Export Trade',
      d: 'Wide-appeal trade display stands for consumer goods, electronics and manufacturing exporters at Canton Fair — the world\'s largest trade event.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Automotive & Electric Vehicles',
      d: 'Brand-forward stands for auto-parts manufacturers, EV component suppliers and automotive technology companies at Auto Shanghai.',
    },
    {
      t: 'Plastics, Rubber & Chemicals',
      d: 'Product-display stands for plastics, rubber and chemical companies at CHINAPLAS — Asia\'s largest plastics trade fair.',
    },
    {
      t: 'Pharmaceutical & Healthcare',
      d: 'Professional stands for API manufacturers, drug companies and healthcare brands at CPhI China Shanghai.',
    },
    {
      t: 'Technology & Electronics',
      d: 'Innovation-forward booths for IT, electronics and hardware brands at China Hi-Tech Fair and tech industry events.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Food Processing & Packaging',
      d: 'Functional product-display stands for food machinery, packaging technology and ingredient companies at Propak China.',
    },
    {
      t: 'Beauty & Personal Care',
      d: 'Premium-finish stands for cosmetics, skincare and personal care brands at China Beauty Expo Shanghai.',
    },
    {
      t: 'Coatings & Surface Technology',
      d: 'Technical exhibition stands for coatings, paint and surface treatment companies at China Coat Shanghai.',
    },
  ],
  faqs: [
    {
      q: 'What does an exhibition stall design agency in China do?',
      a: 'An exhibition stall design agency in China creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Chinese trade fairs — Canton Fair, CIIE Shanghai, CHINAPLAS, China Hi-Tech Fair and more.',
    },
    {
      q: 'Which cities in China are most important for trade fairs?',
      a: 'Shanghai, Guangzhou, Beijing and Shenzhen are China\'s four most important trade fair cities. Guangzhou hosts the Canton Fair; Shanghai hosts CIIE, CHINAPLAS and Auto Shanghai; Beijing hosts CIFTIS; Shenzhen hosts China Hi-Tech Fair. Chengdu is growing rapidly for western China markets.',
    },
    {
      q: 'Can Approach Media support Indian companies at Chinese trade shows?',
      a: 'Yes. We support Indian companies exhibiting at Chinese trade fairs — coordinating booth design, 3D concepts, fabrication, branding and on-site installation.',
    },
    {
      q: 'What is the Canton Fair and how do Indian companies exhibit there?',
      a: 'The Canton Fair (China Import and Export Fair) is the world\'s largest trade fair, held twice yearly in Guangzhou in April and October. Indian manufacturers, exporters and trading companies exhibit here to sell products directly to Chinese and international buyers from 220 countries.',
    },
    {
      q: 'What is CIIE Shanghai?',
      a: 'CIIE (China International Import Expo) is the world\'s first national-level expo dedicated to imports — held annually in November at NECC Shanghai. Indian companies exhibit at CIIE to introduce products to Chinese consumers and business buyers, supported by Chinese government promotion.',
    },
    {
      q: 'Do you provide booth design for the Canton Fair Complex?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for Canton Fair exhibitors — both Spring (April) and Autumn (October) sessions.',
    },
    {
      q: 'How early should we plan for a Chinese trade fair?',
      a: 'For Chinese trade shows we recommend starting 75 to 120 days before the event to allow for design, fabrication, logistics planning and customs coordination for India-to-China material shipments.',
    },
    {
      q: 'What types of stands do you build for China trade fairs?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits, double-decker structures and product display booths — built to Chinese venue specifications and organiser regulations.',
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
    heading1: 'Planning to exhibit in China?',
    heading2gradient: 'Let\'s build a booth that speaks to Chinese buyers.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Guangzhou to Shanghai.',
  },
}

export default function ChinaPage() {
  return <CountryPageTemplate data={data} />
}
