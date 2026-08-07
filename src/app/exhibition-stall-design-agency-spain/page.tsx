import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Spain | Booth Design & Fabrication',
  description:
    'Approach Media is an exhibition stall design agency in Spain — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for MWC Barcelona, FITUR Madrid, Alimentaria, Smart City Expo and major Spanish trade fairs.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-spain` },
}

const data: CountryPageData = {
  country: 'Spain',
  wordmark: 'SPAIN',
  slug: 'exhibition-stall-design-agency-spain',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/spain-hero.jpg',
  areaServed: ['Spain', 'Barcelona', 'Madrid', 'Valencia', 'Bilbao'],
  meta: {
    title: 'Exhibition Stall Design Agency in Spain | Booth Design & Fabrication',
    description:
      'Approach Media is an exhibition stall design agency in Spain — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for MWC Barcelona, FITUR Madrid, Alimentaria, Smart City Expo and major Spanish trade fairs.',
  },
  hero: {
    regionBadge: 'Spain · Europe',
    greetingLine: 'Hola, Barcelona, Madrid, Valencia',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Spanish trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Spain. From 3D stand concepts and fabrication to branding, installation and dismantling — at Fira Barcelona, IFEMA Madrid, Feria Valencia and Bilbao Exhibition Centre.',
    statLabel: 'Across Spain',
    citiesCount: '4',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Barcelona · Madrid · Valencia · Bilbao',
      'Support for Indian companies at Spanish trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Spanish Exhibition',
  },
  standOut: {
    body1:
      "Spain hosts some of Europe's most internationally attended trade fairs — Mobile World Congress (the world's largest mobile tech event), FITUR (top 3 global tourism fair), Alimentaria, Smart City Expo and Rebuild. Indian companies exhibit in Barcelona and Madrid to meet European buyers, telecoms operators and enterprise clients.",
    body2:
      'We help Indian exhibitors arrive at Spanish shows with stands engineered for Fira Barcelona and IFEMA Madrid specs, Spanish audience expectations and the competitive visual standards of major European trade fairs.',
    cards: [
      {
        t: 'Fira & IFEMA Compliant Builds',
        d: 'Structures built to Fira Barcelona Gran Via and IFEMA Madrid regulations — rigging permissions, electrical specs and move-in schedules planned in advance.',
      },
      {
        t: 'MWC-Grade Brand Presentation',
        d: "Mobile World Congress is the world's most competitive exhibition floor. We design stands that command attention and communicate product value in seconds.",
      },
      {
        t: 'Product Demo & Interactive Zones',
        d: 'Spanish B2B audiences respond to live demonstration and interactive engagement. We design demo-first booth layouts for tech, food and industrial products.',
      },
      {
        t: 'Meeting & Hospitality Areas',
        d: 'Semi-private meeting spaces, hospitality counters and conversation zones designed for the relationship-driven style of Spanish and European B2B shows.',
      },
      {
        t: 'Spanish & English Branding',
        d: 'Bilingual fascia, panels and signage for Spanish domestic visitors and the large international visitor base at Barcelona and Madrid trade fairs.',
      },
      {
        t: 'Remote Design Coordination',
        d: 'Full design approval, 3D review and scope finalisation managed remotely — with on-site execution at Fira Barcelona or IFEMA Madrid.',
      },
    ],
  },
  venues: [
    {
      city: 'Barcelona',
      name: 'Fira Barcelona (Gran Via & Montjuïc)',
      blurb:
        "Europe's most technologically advanced exhibition centre — home to Mobile World Congress, Alimentaria, Smart City Expo World Congress, Gastech and BizBarcelona. The venue for Spain's most internationally attended trade fairs.",
      shows: ['Mobile World Congress', 'Alimentaria', 'Smart City Expo', 'Gastech', 'BizBarcelona'],
    },
    {
      city: 'Madrid',
      name: 'IFEMA Madrid',
      blurb:
        "Spain's flagship exhibition institution hosting FITUR (international tourism, top 3 globally), SIMO Network, Rebuild Madrid, ARCO contemporary art fair and Madrid Fusión — across tourism, IT, construction and gastronomy.",
      shows: ['FITUR', 'SIMO Network', 'Rebuild Madrid', 'ARCO', 'Madrid Fusión'],
    },
    {
      city: 'Valencia',
      name: 'Feria Valencia',
      blurb:
        "Valencia's exhibition venue hosts Cevisama (international ceramics and bathroom fair), Espacio Cocina, Maderalia (wood and furniture) and Expojove — serving ceramics, interiors and furniture sectors.",
      shows: ['Cevisama', 'Espacio Cocina', 'Maderalia', 'Expojove', 'Equip Hotel Valencia'],
    },
    {
      city: 'Bilbao',
      name: 'Bilbao Exhibition Centre (BEC)',
      blurb:
        "Northern Spain's exhibition hub serving the Basque Country's industrial and tech sectors — hosting Enlit Europe (energy), Graphispag (graphics), S-Moving (connected mobility) and regional B2B events.",
      shows: ['Enlit Europe', 'S-Moving', 'Graphispag', 'Basque industry events'],
    },
    {
      city: 'Seville / Málaga',
      name: 'Southern Spain Venues',
      blurb:
        'FIBES Seville and Málaga Exhibition Centre serve the southern Spanish market — hosting Andalucía Sabor (gastronomy), Agroexpo and tourism and food trade events for the Mediterranean region.',
      shows: ['Andalucía Sabor', 'Agroexpo', 'Tourism events', 'Mediterranean food fairs'],
    },
  ],
  exhibitions: [
    { m: 'Jan', y: '26', name: 'FITUR Madrid', cat: 'International Tourism', venue: 'IFEMA Madrid' },
    { m: 'Feb', y: '26', name: 'Mobile World Congress Barcelona', cat: 'Mobile Technology & Telecoms', venue: 'Fira Barcelona Gran Via' },
    { m: 'Feb', y: '26', name: 'Cevisama Valencia', cat: 'Ceramics & Bathroom Design', venue: 'Feria Valencia' },
    { m: 'Mar', y: '26', name: 'Rebuild Madrid', cat: 'Construction Technology & PropTech', venue: 'IFEMA Madrid' },
    { m: 'Apr', y: '26', name: 'Alimentaria Barcelona', cat: 'Food & Beverage Industry', venue: 'Fira Barcelona Gran Via' },
    { m: 'Apr', y: '26', name: 'Espacio Cocina Valencia', cat: 'Kitchen Equipment & Design', venue: 'Feria Valencia' },
    { m: 'Jun', y: '26', name: 'BizBarcelona', cat: 'Entrepreneurship & Business', venue: 'Fira Barcelona Gran Via' },
    { m: 'Sep', y: '26', name: 'SIMO Network Madrid', cat: 'IT & Digital Technologies', venue: 'IFEMA Madrid' },
    { m: 'Oct', y: '26', name: 'ARCO Madrid', cat: 'Contemporary Art & Design', venue: 'IFEMA Madrid' },
    { m: 'Oct', y: '26', name: 'Agrofood & Pack Expo Barcelona', cat: 'Food Packaging & Processing', venue: 'Fira Barcelona Montjuïc' },
    { m: 'Nov', y: '26', name: 'Smart City Expo World Congress', cat: 'Smart Cities & Urban Tech', venue: 'Fira Barcelona Gran Via' },
    { m: 'Nov', y: '26', name: 'Enlit Europe Bilbao', cat: 'Energy & Power Industry', venue: 'Bilbao Exhibition Centre' },
    { m: 'Dec', y: '26', name: 'Madrid Fusión', cat: 'Gastronomy & Food Innovation', venue: 'IFEMA Madrid' },
  ],
  industries: [
    {
      t: 'Mobile Technology & Telecoms',
      d: 'Innovation-forward stands for mobile tech, telecoms operators and connected device manufacturers at Mobile World Congress Barcelona.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Tourism & Travel',
      d: 'Branded stands for tourism boards, hotels, airlines and travel technology companies at FITUR Madrid.',
    },
    {
      t: 'Food & Beverage',
      d: 'Exhibition stands for food manufacturers, exporters and agritech brands at Alimentaria Barcelona and Madrid Fusión.',
    },
    {
      t: 'Construction & PropTech',
      d: 'Booth designs for construction material, modular building and property technology companies at Rebuild Madrid.',
    },
    {
      t: 'Ceramics & Building Materials',
      d: 'Technical product-display stands for ceramic tile, stone and bathroom brands at Cevisama Valencia.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Smart Cities & Urban Technology',
      d: 'Forward-looking booths for IoT, mobility and urban data companies at Smart City Expo World Congress Barcelona.',
    },
    {
      t: 'Energy & Power Industry',
      d: 'Specification-grade stands for renewable energy and grid technology companies at Enlit Europe Bilbao.',
    },
    {
      t: 'Kitchen & Hospitality Equipment',
      d: 'Functional product-display booths for kitchen, catering and hospitality equipment brands at Espacio Cocina Valencia.',
    },
  ],
  faqs: [
    {
      q: 'What does an exhibition stall design agency in Spain do?',
      a: 'An exhibition stall design agency in Spain creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Spanish trade fairs — Mobile World Congress, FITUR, Alimentaria, Smart City Expo, Cevisama and more.',
    },
    {
      q: 'Which cities in Spain are most important for trade fairs?',
      a: "Barcelona and Madrid are Spain's two main trade fair cities. Barcelona hosts Mobile World Congress, Alimentaria and Smart City Expo at Fira Barcelona. Madrid hosts FITUR, Rebuild and SIMO at IFEMA. Valencia hosts Cevisama for ceramics.",
    },
    {
      q: 'Can Approach Media support Indian companies at Spanish trade shows?',
      a: 'Yes. We support Indian companies exhibiting at Spanish trade fairs — coordinating booth design, 3D concepts, fabrication, branding, logistics and on-site installation at Fira Barcelona, IFEMA Madrid and Feria Valencia.',
    },
    {
      q: 'What is Mobile World Congress Barcelona?',
      a: 'Mobile World Congress is the world\'s largest mobile technology and telecoms trade show, held annually in February at Fira Barcelona Gran Via. Indian IT companies, telecom equipment manufacturers, app developers and tech brands exhibit here to meet global operators, enterprise buyers and media.',
    },
    {
      q: 'Do you provide booth design for Fira Barcelona?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at Fira Barcelona — including Mobile World Congress, Alimentaria, Smart City Expo World Congress, Gastech and BizBarcelona.',
    },
    {
      q: 'What is FITUR Madrid?',
      a: "FITUR is one of the world's top three international tourism trade fairs, held annually in January at IFEMA Madrid. Indian tourism boards, travel agencies, hotel chains and destination management companies exhibit here to attract European tour operators and travel buyers.",
    },
    {
      q: 'How early should we plan for a Spanish trade fair?',
      a: 'For Spanish trade shows we recommend starting 60 to 90 days before the event. Mobile World Congress requires 90 to 120 days lead time due to extremely high demand for stand space and logistics.',
    },
    {
      q: 'What types of stands do you build for Spanish trade fairs?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits, double-decker structures and branded experience zones — built to Fira Barcelona and IFEMA Madrid specifications.',
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
    heading1: 'Planning to exhibit in Spain?',
    heading2gradient: "Let's design a stand built for the Spanish trade floor.",
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Barcelona to Madrid.',
  },
}

export default function SpainPage() {
  return <CountryPageTemplate data={data} />
}
