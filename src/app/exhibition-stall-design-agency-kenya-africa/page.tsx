import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Kenya & Africa | Booth Design Nairobi',
  description:
    'Approach Media is an exhibition stall design agency in Kenya and Africa — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Nairobi, Johannesburg, Lagos, Cape Town and major African trade shows.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-kenya-africa` },
}

const data: CountryPageData = {
  country: 'Kenya & Africa',
  wordmark: 'AFRICA',
  slug: 'exhibition-stall-design-agency-kenya-africa',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/kenya-africa-hero.jpg',
  areaServed: ['Kenya', 'Nairobi', 'Johannesburg', 'Lagos', 'Cape Town', 'Accra', 'Africa'],

  meta: {
    title: 'Exhibition Stall Design Agency in Kenya & Africa | Booth Design Nairobi',
    description:
      'Approach Media is an exhibition stall design agency in Kenya and Africa — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Nairobi, Johannesburg, Lagos, Cape Town and major African trade shows.',
  },

  hero: {
    regionBadge: 'Kenya & Africa · East & Southern Africa',
    greetingLine: 'Karibu, Nairobi, Johannesburg, Lagos',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'African trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Kenya and Africa. From 3D stand concepts and fabrication to branding, installation and dismantling — at KICC Nairobi, Gallagher Convention Centre Johannesburg, Eko Convention Centre Lagos and major African exhibition venues.',
    statLabel: 'Across Africa',
    citiesCount: '5+',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Nairobi · Johannesburg · Lagos · Cape Town',
      'Support for Indian companies at African trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Africa Exhibition',
  },

  standOut: {
    body1:
      "Africa is the world's fastest-growing trade fair market — with 1.4 billion consumers, 54 countries and a rapidly expanding middle class. Indian companies exhibit across Kenya, Nigeria, South Africa and Ghana to access African buyers, distribution networks and government procurement opportunities in agriculture, healthcare, construction and FMCG.",
    body2:
      'We help Indian exhibitors build stands that meet African venue standards, project brand authority to African buyers and communicate product value in markets where quality and trust are the primary purchase drivers.',
    cards: [
      {
        t: 'African Venue Compliant Builds',
        d: 'Structures built to KICC, Gallagher and local venue regulations — electrical standards, fire codes and move-in schedules planned country by country.',
      },
      {
        t: 'Indian Brand Trust Projection',
        d: 'Indian brands are well regarded across Africa in pharmaceuticals, FMCG, textiles and infrastructure. We build stands that reinforce that trust with professional brand presentation.',
      },
      {
        t: 'Multi-Country African Positioning',
        d: "Africa's 54 countries require localised approaches. We design branding that positions your brand as an international quality supplier accessible to African buyers.",
      },
      {
        t: 'Agricultural & Infrastructure Display',
        d: "Africa's high-growth sectors need stands designed for agricultural machinery, infrastructure equipment and construction materials — with space for demonstration.",
      },
      {
        t: 'English, French & Swahili Branding',
        d: 'Branding designed for English-speaking East and Southern Africa, French-speaking West and Central Africa, and Swahili-speaking East African markets.',
      },
      {
        t: 'Multi-Country Logistics',
        d: 'We coordinate exhibition material logistics for multi-country Africa exhibitions — with customs, clearing agent and cross-border transport coordination.',
      },
    ],
  },

  venues: [
    {
      city: 'Nairobi',
      name: 'Kenyatta International Convention Centre (KICC)',
      blurb:
        "East Africa's premier convention and exhibition venue — hosting BuildExpo Africa, East Africa Com, Agritech Expo Africa, Africa Health and major government and bilateral trade exhibitions in the heart of Nairobi.",
      shows: ['BuildExpo Africa', 'East Africa Com', 'Agritech Expo Africa', 'Africa Health', 'East African trade events'],
    },
    {
      city: 'Johannesburg',
      name: 'Gallagher Convention Centre',
      blurb:
        "South Africa's largest and most established exhibition venue — hosting SAITEX (Southern Africa International Trade Exhibition), Africa Health (biennial), Decorex, Africa Aerospace & Defence (biennial) and major South African industry shows.",
      shows: ['SAITEX', 'Africa Health', 'Decorex', 'Africa Aerospace & Defence', 'Industry shows'],
    },
    {
      city: 'Cape Town',
      name: 'Cape Town International Convention Centre (CTICC)',
      blurb:
        "South Africa's premium conference and exhibition venue — hosting Africa Oil Week, Design Indaba, SATB Meetings Africa and major Western Cape B2B events in one of Africa's most connected cities.",
      shows: ['Africa Oil Week', 'Design Indaba', 'Meetings Africa', 'Western Cape B2B events'],
    },
    {
      city: 'Lagos',
      name: 'Eko Convention Centre',
      blurb:
        "West Africa's largest event venue — hosting Propak West Africa, Agrofood & Plastprintpack Nigeria, Consumer Goods West Africa and major Lagos trade exhibitions for Nigeria's 220 million-person market.",
      shows: ['Propak West Africa', 'Agrofood Nigeria', 'Consumer Goods West Africa', 'Lagos trade events'],
    },
    {
      city: 'Accra',
      name: 'Ghana International Trade Fair Centre',
      blurb:
        "Ghana's main exhibition venue hosting the Ghana International Trade Fair, West Africa's growing consumer and manufacturing events — serving Accra's expanding business community and the Ghana-India trade relationship.",
      shows: ['Ghana International Trade Fair', 'Consumer events', 'West Africa business events', 'Ghana-India trade'],
    },
  ],

  exhibitions: [
    { m: 'Feb', y: '26', name: 'Africa Agri Expo Nairobi',                cat: 'Agriculture & Agritech',    venue: 'KICC Nairobi' },
    { m: 'Mar', y: '26', name: 'BuildExpo Africa Nairobi',                 cat: 'Construction & Building',   venue: 'KICC Nairobi' },
    { m: 'Apr', y: '26', name: 'East Africa Com Nairobi',                  cat: 'Telecoms & ICT',            venue: 'KICC Nairobi' },
    { m: 'Apr', y: '26', name: 'Agrofood & Plastprintpack Nigeria',        cat: 'Food & Packaging',          venue: 'Eko Centre, Lagos' },
    { m: 'May', y: '26', name: 'Africa Health Johannesburg',               cat: 'Healthcare & Medical',      venue: 'Gallagher, Johannesburg' },
    { m: 'Jun', y: '26', name: 'Propak West Africa Lagos',                 cat: 'Processing & Packaging',    venue: 'Eko Centre, Lagos' },
    { m: 'Aug', y: '26', name: 'SAITEX Johannesburg',                      cat: 'Southern Africa Trade',     venue: 'Gallagher, Johannesburg' },
    { m: 'Sep', y: '26', name: 'Africa Oil Week Cape Town',                cat: 'Oil, Gas & Energy',         venue: 'CTICC Cape Town' },
    { m: 'Sep', y: '26', name: 'Agritech Expo Africa Nairobi',             cat: 'Agricultural Technology',   venue: 'KICC Nairobi' },
    { m: 'Oct', y: '26', name: 'Africa IT & Telecom Expo Nairobi',         cat: 'Technology & Innovation',   venue: 'KICC Nairobi' },
    { m: 'Nov', y: '26', name: 'MEDEXPO Africa Nairobi',                   cat: 'Medical & Healthcare',      venue: 'KICC Nairobi' },
    { m: 'Nov', y: '26', name: 'Africa Aerospace & Defence Cape Town',     cat: 'Aerospace & Defence',       venue: 'CTICC Cape Town' },
  ],

  industries: [
    {
      t: 'Agriculture & Agritech',
      d: "Exhibition stands for Indian agricultural machinery, seed, fertiliser and agritech companies reaching Africa's vast agricultural sector at BuildExpo and Agritech Expo.",
      span: 'lg:col-span-2',
    },
    {
      t: 'Construction & Infrastructure',
      d: 'Display stands for Indian construction material, steel, cement and infrastructure companies at BuildExpo Africa Nairobi.',
    },
    {
      t: 'Healthcare & Pharmaceuticals',
      d: "Professional stands for Indian pharma companies and medical device brands at MEDEXPO Africa and Africa Health — the continent's healthcare trade events.",
    },
    {
      t: 'Technology & Telecoms',
      d: 'Forward-looking stands for Indian IT companies, software exporters and telecoms equipment brands at East Africa Com and Africa IT Expo.',
    },
    {
      t: 'Food Processing & Consumer Goods',
      d: 'Trade display stands for Indian FMCG brands, packaged food exporters and food processing equipment at Agrofood Nigeria and East Africa consumer events.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Textiles & Apparel',
      d: 'Display stands for Indian textile mills, fabric exporters and garment manufacturers reaching African clothing manufacturers and retailers.',
    },
    {
      t: 'Energy & Oil and Gas',
      d: 'Specification-grade stands for Indian energy companies and equipment manufacturers at Africa Oil Week Cape Town.',
    },
    {
      t: 'Packaging & Processing',
      d: 'Product-display stands for Indian packaging material and processing equipment companies at Propak West Africa Lagos.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Kenya and Africa do?',
      a: 'An exhibition stall design agency in Kenya and Africa creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at BuildExpo Africa, SAITEX, MEDEXPO, East Africa Com, Agritech Expo and other African trade shows.',
    },
    {
      q: 'Why do Indian companies exhibit in Africa?',
      a: "Africa is one of the world's fastest-growing consumer markets with 1.4 billion people and rapidly expanding purchasing power. Indian companies exhibit across Kenya, Nigeria, South Africa and Ghana to access African buyers, government procurement opportunities and distribution networks in agriculture, healthcare, FMCG and construction.",
    },
    {
      q: 'Can Approach Media support Indian companies at African trade shows?',
      a: 'Yes. We support Indian companies exhibiting at African trade fairs — coordinating booth design, 3D concepts, fabrication, branding and on-site installation in Nairobi, Johannesburg, Lagos and Cape Town.',
    },
    {
      q: 'Which African cities are most important for trade fairs?',
      a: "Nairobi (East Africa), Johannesburg and Cape Town (South Africa) and Lagos (West Africa) are Africa's four key trade fair cities. Nairobi hosts BuildExpo, East Africa Com and MEDEXPO; Johannesburg hosts SAITEX and Africa Health; Lagos hosts Propak and Agrofood Nigeria; Cape Town hosts Africa Oil Week.",
    },
    {
      q: 'What is SAITEX Johannesburg?',
      a: 'SAITEX (Southern Africa International Trade Exhibition) is one of Africa\'s largest trade fairs, held at Gallagher Convention Centre in Johannesburg. Indian manufacturers across multiple sectors exhibit here to meet South African buyers, distributors and enterprise clients.',
    },
    {
      q: 'Do you provide booth design for KICC Nairobi?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at KICC Nairobi — including BuildExpo Africa, East Africa Com, Agritech Expo, MEDEXPO Africa and other Nairobi trade events.',
    },
    {
      q: 'How does exhibition logistics work from India to Africa?',
      a: 'Exhibition materials from India to East Africa travel by sea freight to Mombasa or Dar es Salaam, then road to Nairobi. South Africa receives freight at Durban or Johannesburg port. We coordinate air and sea freight, clearing agents and customs documentation as part of our service.',
    },
    {
      q: 'How early should we plan for an African trade fair?',
      a: 'For African trade shows we recommend starting 75 to 120 days before the event to allow for fabrication, sea freight transit (typically 20-30 days from India) and customs clearance in the destination country.',
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
    heading1: 'Planning to exhibit in Africa?',
    heading2gradient: "Let's build a booth that opens the African market.",
    body: 'Share your booth size, exhibition name, country, brand details and timeline. Our team will help you plan a custom exhibition stand with full logistics coordination and on-site execution.',
  },
}

export default function KenyaAfricaPage() {
  return <CountryPageTemplate data={data} />
}
