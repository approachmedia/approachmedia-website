import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in UAE | Booth Design Dubai & Abu Dhabi',
  description: 'Approach Media is an exhibition stall design agency in the UAE — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for GITEX, Arab Health, Gulfood, Big 5 and all Dubai & Abu Dhabi trade shows.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-uae` },
}

const data: CountryPageData = {
  country: 'UAE',
  wordmark: 'UAE',
  slug: 'exhibition-stall-design-agency-uae',
  areaServed: ['UAE', 'Dubai', 'Abu Dhabi', 'Sharjah'],

  meta: {
    title: 'Exhibition Stall Design Agency in UAE | Booth Design Dubai & Abu Dhabi',
    description: 'Approach Media is an exhibition stall design agency in the UAE — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for GITEX, Arab Health, Gulfood, Big 5 and all Dubai & Abu Dhabi trade shows.',
  },

  hero: {
    regionBadge: 'UAE · Middle East',
    greetingLine: 'Marhaba, Dubai, Abu Dhabi, Sharjah',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Gulf trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across the UAE. From 3D stand concepts and fabrication to branding, installation and dismantling — at Dubai World Trade Centre, ADNEC Abu Dhabi, Expo City Dubai and Sharjah Expo Centre.',
    statLabel: 'Across the UAE',
    citiesCount: '3',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Dubai · Abu Dhabi · Sharjah',
      'Support for Indian companies at UAE trade shows',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your UAE Exhibition',
  },

  standOut: {
    body1: 'The UAE is the Gulf\'s premier exhibition destination and a gateway to the Middle East, Africa and South Asia markets. Over 500 trade shows are held in Dubai and Abu Dhabi every year — GITEX, Arab Health, Gulfood, Big 5, ADIPEC and more attract buyers from 150+ countries.',
    body2: 'India and the UAE share one of the largest bilateral trade relationships in the world. We help Indian companies build stands that reflect brand quality, communicate product value and convert floor conversations into Gulf market opportunities.',
    cards: [
      {
        t: 'DWTC & ADNEC Compliant Builds',
        d: 'Structures designed to Dubai World Trade Centre, ADNEC and Expo City regulations — rigging permissions, electrical specs and move-in schedules planned from the start.',
      },
      {
        t: 'Premium Gulf Market Presentation',
        d: 'UAE buyers and decision-makers expect a high standard of booth presentation. We deliver the fit, finish and brand presence the Gulf market demands.',
      },
      {
        t: 'Arabic & English Branding',
        d: 'Fascia, panels and signage designed for both English and Arabic audiences — serving UAE nationals, Gulf buyers and the international visitor base at Dubai shows.',
      },
      {
        t: 'Indoor Climate Planning',
        d: 'Dubai venues are fully air-conditioned but require planning for lighting heat loads, material selection and build quality for the UAE environment.',
      },
      {
        t: 'Indian Exhibitor Expertise',
        d: 'India is the UAE\'s largest trade partner. We understand Indian brand positioning in the Gulf and help your company make the right impression.',
      },
      {
        t: 'Rapid Execution Turnaround',
        d: 'UAE show calendars are dense. We plan fabrication, logistics and install timelines to meet the tight move-in windows at major Dubai exhibitions.',
      },
    ],
  },

  venues: [
    {
      city: 'Dubai',
      name: 'Dubai World Trade Centre (DWTC)',
      blurb: 'Dubai\'s flagship exhibition venue and home to its most important shows — GITEX Global, Arab Health, Gulfood, Big 5, INDEX, Beauty World Middle East, CABSAT and Automechanika Dubai.',
      shows: ['GITEX Global', 'Arab Health', 'Gulfood', 'Big 5', 'INDEX', 'Beauty World ME'],
    },
    {
      city: 'Abu Dhabi',
      name: 'ADNEC Abu Dhabi',
      blurb: 'Abu Dhabi National Exhibition Centre hosts ADIPEC (world\'s largest energy event), IDEX (international defence exhibition), Abu Dhabi International Book Fair and UMEX — major platforms for energy, defence and industrial sectors.',
      shows: ['ADIPEC', 'IDEX', 'Abu Dhabi Book Fair', 'UMEX', 'DSEI Arabia'],
    },
    {
      city: 'Dubai',
      name: 'Expo City Dubai',
      blurb: 'The repurposed Expo 2020 site now hosts major conferences, summits and B2B exhibitions — a world-class multi-venue campus with state-of-the-art infrastructure and transport links.',
      shows: ['World Government Summit side events', 'Tech summits', 'Corporate exhibitions', 'GITEX overflow'],
    },
    {
      city: 'Dubai',
      name: 'Dubai International Boat Show Venue',
      blurb: 'Dubai International Marine Club and surrounding venues host the Dubai International Boat Show — one of the world\'s leading marine industry exhibitions attracting 25,000+ visitors.',
      shows: ['Dubai Boat Show', 'Marine industry events', 'Leisure & super-yacht shows'],
    },
    {
      city: 'Sharjah',
      name: 'Sharjah Expo Centre',
      blurb: 'Sharjah\'s main exhibition venue hosts the Sharjah International Book Fair (world\'s third largest), Al-Johara jewellery show and regional manufacturing and trade exhibitions.',
      shows: ['Sharjah Book Fair', 'Al-Johara', 'Regional manufacturing', 'Trade exhibitions'],
    },
  ],

  exhibitions: [
    { m: 'Jan', y: '26', name: 'Arab Health Dubai',         cat: 'Healthcare & Medical',           venue: 'Dubai World Trade Centre' },
    { m: 'Feb', y: '26', name: 'Gulfood Dubai',             cat: 'Food & Beverage',                venue: 'Dubai World Trade Centre' },
    { m: 'Feb', y: '26', name: 'INDEX Dubai',               cat: 'Interior Design & Furniture',    venue: 'Dubai World Trade Centre' },
    { m: 'Mar', y: '26', name: 'Arab Lab Dubai',            cat: 'Laboratory & Analytical Science', venue: 'Dubai World Trade Centre' },
    { m: 'Apr', y: '26', name: 'Beauty World Middle East',  cat: 'Beauty & Personal Care',         venue: 'Dubai World Trade Centre' },
    { m: 'Apr', y: '26', name: 'WETEX Dubai',               cat: 'Water, Energy & Environment',    venue: 'Dubai World Trade Centre' },
    { m: 'Apr', y: '26', name: 'IDEX Abu Dhabi',            cat: 'Defence & Security',             venue: 'ADNEC Abu Dhabi' },
    { m: 'Jun', y: '26', name: 'Automechanika Dubai',       cat: 'Automotive Trade',               venue: 'Dubai World Trade Centre' },
    { m: 'Sep', y: '26', name: 'Cityscape Global Dubai',    cat: 'Real Estate & Property',         venue: 'Dubai World Trade Centre' },
    { m: 'Oct', y: '26', name: 'GITEX Global Dubai',        cat: 'Technology & Innovation',        venue: 'Dubai World Trade Centre' },
    { m: 'Nov', y: '26', name: 'Big 5 Dubai',               cat: 'Construction & Building',        venue: 'Dubai World Trade Centre' },
    { m: 'Nov', y: '26', name: 'ADIPEC Abu Dhabi',          cat: 'Oil, Gas & Energy',              venue: 'ADNEC Abu Dhabi' },
    { m: 'Nov', y: '26', name: 'The Hotel Show Dubai',      cat: 'Hospitality & F&B Equipment',    venue: 'Dubai World Trade Centre' },
  ],

  industries: [
    {
      t: 'Healthcare & Medical Devices',
      d: 'Exhibition stands for pharma, medical device and hospital supply companies at Arab Health — the world\'s second-largest healthcare trade show.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Food & Beverage',
      d: 'Display stands for food exporters, FMCG brands and processing equipment at Gulfood Dubai — the world\'s largest annual food event.',
    },
    {
      t: 'Technology & Telecoms',
      d: 'Innovation-forward booths for IT, SaaS, telecoms and digital transformation companies at GITEX Global.',
    },
    {
      t: 'Construction & Real Estate',
      d: 'Branded stands for construction material, fitout and proptech companies at Big 5 Dubai and Cityscape.',
    },
    {
      t: 'Oil, Gas & Energy',
      d: 'Specification-grade stands for energy sector companies at ADIPEC Abu Dhabi — the world\'s largest energy event.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Interior Design & Hospitality',
      d: 'Design-led stands for furniture, interiors and hospitality brands at INDEX Dubai and The Hotel Show.',
    },
    {
      t: 'Beauty & Personal Care',
      d: 'Premium-finish stands for cosmetics, wellness and personal care brands at Beauty World Middle East.',
    },
    {
      t: 'Defence & Security',
      d: 'High-specification stands for defence equipment and security technology companies at IDEX Abu Dhabi.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in the UAE do?',
      a: 'An exhibition stall design agency in the UAE creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at trade fairs in Dubai and Abu Dhabi — including GITEX, Arab Health, Gulfood, Big 5 and ADIPEC.',
    },
    {
      q: 'Which UAE cities are most important for trade shows?',
      a: 'Dubai hosts the majority of UAE trade fairs — GITEX, Arab Health, Gulfood, Big 5, Automechanika Dubai and more — at Dubai World Trade Centre. Abu Dhabi hosts ADIPEC and IDEX at ADNEC. Sharjah hosts the International Book Fair.',
    },
    {
      q: 'Can Approach Media support Indian companies at UAE trade shows?',
      a: 'Yes. India is the UAE\'s largest trade partner, and we specifically support Indian companies exhibiting at UAE trade fairs — coordinating booth design, fabrication, branding, logistics and installation.',
    },
    {
      q: 'What is GITEX and how do Indian companies exhibit there?',
      a: 'GITEX Global is the world\'s largest tech trade show, held annually in October at Dubai World Trade Centre. Indian IT companies, startups, SaaS firms and tech manufacturers exhibit here to meet Gulf buyers, government clients and enterprise decision-makers from 170+ countries.',
    },
    {
      q: 'Do you provide booth design for Dubai World Trade Centre?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at Dubai World Trade Centre — including GITEX, Arab Health, Gulfood, Big 5, INDEX, Beauty World Middle East and Automechanika Dubai.',
    },
    {
      q: 'Do you design booths for Arab Health Dubai?',
      a: 'Yes. Arab Health is the world\'s second-largest healthcare and medical trade show. We design and build booths for pharmaceutical companies, medical device manufacturers and hospital supply brands exhibiting at Arab Health at Dubai World Trade Centre.',
    },
    {
      q: 'How early should we plan a UAE exhibition stand?',
      a: 'For UAE trade shows we recommend starting 60 to 90 days before the event. GITEX, Arab Health and Gulfood attract very high demand and earlier planning is advised for larger custom stands.',
    },
    {
      q: 'What types of stands do you build for UAE shows?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits, double-decker stands, branded experience zones and country pavilion elements — designed to DWTC and ADNEC specifications.',
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
    heading1: 'Planning to exhibit in the UAE?',
    heading2gradient: 'Let\'s build a booth that stands out on the Gulf trade floor.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Dubai to Abu Dhabi.',
  },
}

export default function UAEPage() {
  return <CountryPageTemplate data={data} />
}
