import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Nepal | Booth Design Kathmandu',
  description:
    'Approach Media is an exhibition stall design agency in Nepal — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Nepal International Trade Fair, NITE, Nepal Build and major Kathmandu trade shows.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-nepal` },
}

const data: CountryPageData = {
  country: 'Nepal',
  wordmark: 'NEPAL',
  slug: 'exhibition-stall-design-agency-nepal',
  areaServed: ['Nepal', 'Kathmandu', 'Pokhara', 'Biratnagar'],

  meta: {
    title: 'Exhibition Stall Design Agency in Nepal | Booth Design Kathmandu',
    description:
      'Approach Media is an exhibition stall design agency in Nepal — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Nepal International Trade Fair, NITE, Nepal Build and major Kathmandu trade shows.',
  },

  hero: {
    regionBadge: 'Nepal · South Asia',
    greetingLine: 'Namaste, Kathmandu, Pokhara',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Nepal trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Nepal. From 3D stand concepts and fabrication to branding, installation and dismantling — at Bhrikuti Mandap, BICC and exhibition venues across Kathmandu.',
    statLabel: 'Across Nepal',
    citiesCount: '3',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Kathmandu · Pokhara · Biratnagar',
      'Support for Indian companies at Nepal trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Nepal Exhibition',
  },

  standOut: {
    body1:
      "Nepal is India's closest South Asian trade partner — sharing an open border, complementary economies and deep cultural ties. Indian companies exhibit in Kathmandu to access Nepal's growing consumer market, connect with distribution partners and establish brand presence across Himalayan South Asia.",
    body2:
      'We help Indian exhibitors build stands that reflect brand quality, meet Nepal venue requirements and communicate product value to Nepali buyers and regional trade visitors.',
    cards: [
      {
        t: 'Nepal Venue Compliant Builds',
        d: "Structures built to Bhrikuti Mandap and Kathmandu venue regulations — designed for Nepal's electrical standards, floor load requirements and organiser specifications.",
      },
      {
        t: 'Indian Brand South Asia Positioning',
        d: 'Nepal is often the first international market for Indian brands. We build stands that project professional brand identity to Nepali importers and consumers.',
      },
      {
        t: 'Consumer & Trade Dual Audience',
        d: 'Nepal trade fairs attract both retail consumers and business buyers. We design stands that serve both audiences — product display, pricing and brand communication.',
      },
      {
        t: 'Cross-Border Logistics Planning',
        d: "India-Nepal trade involves specific customs, border crossing and logistics planning. We coordinate material movement and installation within Nepal's exhibition schedule.",
      },
      {
        t: 'Nepali & Hindi Communication',
        d: 'Branding designed for Nepali and Hindi-reading audiences — with clear product communication for the cross-cultural India-Nepal trade fair environment.',
      },
      {
        t: 'Compact, High-Impact Displays',
        d: 'Nepal exhibition spaces are often smaller than Indian or European venues. We maximise display density and brand impact within compact footprints.',
      },
    ],
  },

  venues: [
    {
      city: 'Kathmandu',
      name: 'Bhrikuti Mandap Exhibition Hall',
      blurb:
        "Kathmandu's largest and most central exhibition venue — home to the Nepal International Trade Fair (NITF), Nepal Expo and major government-supported trade and cultural exhibitions. Located near Tundikhel in the city centre.",
      shows: ['Nepal International Trade Fair', 'Nepal Expo', 'Government trade events', 'Cultural exhibitions'],
    },
    {
      city: 'Kathmandu',
      name: 'Bangabandhu International Convention Centre (BICC)',
      blurb:
        "A large multipurpose venue near Kathmandu hosting national conferences, B2B events and select trade exhibitions for Nepal's growing MICE sector.",
      shows: ['National B2B events', 'Industry conferences', 'Trade exhibitions'],
    },
    {
      city: 'Kathmandu',
      name: 'Hotel Exhibition Venues (Hyatt, Marriott, Radisson)',
      blurb:
        'Major Kathmandu hotels host boutique industry trade events, product launches, dealer meets and sector-specific exhibitions — particularly for pharma, FMCG and technology brands entering the Nepal market.',
      shows: ['Pharma launches', 'FMCG dealer meets', 'Technology showcases', 'Brand launch events'],
    },
    {
      city: 'Biratnagar / Pokhara',
      name: 'Regional Exhibition Venues',
      blurb:
        "Biratnagar (eastern Nepal) and Pokhara serve regional trade fairs for Nepal's commercial and tourism markets — reaching buyers and distributors outside Kathmandu's metropolitan area.",
      shows: ['Regional trade fairs', 'Tourism events', 'Agricultural exhibitions', 'Consumer shows'],
    },
  ],

  exhibitions: [
    { m: 'Jan', y: '26', name: 'Nepal International Trade Fair (NITF)', cat: 'General Trade & Export',           venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Mar', y: '26', name: 'Nepal Build',                            cat: 'Construction & Building Materials', venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Apr', y: '26', name: 'Nepal Auto Show',                        cat: 'Automotive & Two-Wheelers',         venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'May', y: '26', name: 'Nepal Agriculture Expo',                 cat: 'Agriculture & Agritech',            venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Jun', y: '26', name: 'Nepal Food & Hospitality Expo',          cat: 'Food, Beverage & Hospitality',      venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Jul', y: '26', name: 'Nepal Tourism Year Events',              cat: 'Tourism & Travel',                  venue: 'Kathmandu venues' },
    { m: 'Aug', y: '26', name: 'Nepal Pharma & Healthcare Expo',         cat: 'Pharmaceutical & Healthcare',       venue: 'Hotel venues, Kathmandu' },
    { m: 'Sep', y: '26', name: 'NITE (Nepal International Trade Expo)',  cat: 'Technology & Electronics',          venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Oct', y: '26', name: 'Nepal Handicraft & Craft Fair',          cat: 'Handicrafts & Artisanal Products',  venue: 'Bhrikuti Mandap, Kathmandu' },
    { m: 'Nov', y: '26', name: 'Nepal Energy & Infrastructure Expo',     cat: 'Energy & Infrastructure',           venue: 'Bhrikuti Mandap, Kathmandu' },
  ],

  industries: [
    {
      t: 'Consumer Goods & FMCG',
      d: 'Trade display stands for FMCG brands, consumer goods exporters and packaged food companies entering the Nepal retail market.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Construction & Building Materials',
      d: 'Product display booths for cement, tiles, sanitary ware and building material companies at Nepal Build.',
    },
    {
      t: 'Pharmaceutical & Healthcare',
      d: 'Professional-grade stands for Indian pharma companies, medical device brands and health supplement manufacturers.',
    },
    {
      t: 'Automotive & Two-Wheelers',
      d: 'Display stands for Indian automotive brands, two-wheeler manufacturers and vehicle component companies at Nepal Auto Show.',
    },
    {
      t: 'Agriculture & Agritech',
      d: "Practical exhibition stands for Indian agricultural machinery, seed companies and input suppliers at Nepal Agriculture Expo.",
      span: 'lg:col-span-2',
    },
    {
      t: 'Technology & Electronics',
      d: "Product display stands for Indian IT companies, electronics brands and digital service providers entering Nepal's growing tech market.",
    },
    {
      t: 'Tourism, Hospitality & Food',
      d: "Branded stands for hospitality brands, food exporters and tourism operators reaching Nepal's large tourism and service sector.",
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Nepal do?',
      a: "An exhibition stall design agency in Nepal creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Nepal's trade fairs — Nepal International Trade Fair, Nepal Build, NITE, Nepal Auto Show and more.",
    },
    {
      q: 'Why do Indian companies exhibit in Nepal?',
      a: "Nepal is India's closest South Asian trading partner with an open border and zero duty on most Indian goods. Indian companies exhibit in Kathmandu to access Nepal's 30 million consumers, establish brand presence and recruit local distributors and retail partners.",
    },
    {
      q: 'Can Approach Media support Indian companies at Nepal trade shows?',
      a: "Yes. We support Indian companies exhibiting at Nepal's trade fairs — coordinating booth design, fabrication, branding and on-site installation at Bhrikuti Mandap and Kathmandu venues.",
    },
    {
      q: 'What is the Nepal International Trade Fair?',
      a: 'The Nepal International Trade Fair (NITF) is Nepal\'s largest annual trade exhibition, held at Bhrikuti Mandap in Kathmandu. Indian manufacturers, consumer goods brands and exporters participate here to meet Nepali distributors, retailers and consumers.',
    },
    {
      q: 'How do I get exhibition materials from India to Nepal?',
      a: 'Exhibition materials from India to Nepal cross the Raxaul-Birgunj or Jogbani-Biratnagar border checkpoints. We coordinate cross-border logistics, documentation and customs clearance as part of our turnkey exhibition service.',
    },
    {
      q: 'What is Nepal Build?',
      a: "Nepal Build is Nepal's major trade fair for construction materials, building products and real estate — held at Bhrikuti Mandap, Kathmandu. Indian construction material manufacturers, tile companies and sanitary brands exhibit here to meet Nepali builders, contractors and project developers.",
    },
    {
      q: 'How early should we plan for a Nepal trade fair?',
      a: 'For Nepal trade shows we recommend starting 45 to 60 days before the event. Cross-border logistics add complexity and earlier planning ensures smooth materials movement.',
    },
    {
      q: 'What types of stands do you build for Nepal?',
      a: 'Custom-built booths, modular stands, shell-scheme upgrades, product display counters and branded backdrops — designed to Bhrikuti Mandap and Kathmandu venue specifications.',
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
    heading1: 'Planning to exhibit in Nepal?',
    heading2gradient: "Let's build a booth that wins Nepali buyers.",
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with cross-border logistics support and full execution in Kathmandu.',
  },
}

export default function NepalPage() {
  return <CountryPageTemplate data={data} />
}
