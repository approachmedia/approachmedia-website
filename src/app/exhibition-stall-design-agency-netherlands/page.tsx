import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Agency in Netherlands | Amsterdam" },
  description:
    'Approach Media is an exhibition stall design agency in the Netherlands -- custom booth design, 3D concepts, fabrication, branding, installation and dismantling for ISE Amsterdam, Interclean, Aquatech and major Dutch trade fairs.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-netherlands` },
}

const data: CountryPageData = {
  country: 'Netherlands',
  wordmark: 'NETHERLANDS',
  slug: 'exhibition-stall-design-agency-netherlands',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/netherlands-hero.jpg',
  areaServed: ['Netherlands', 'Amsterdam', 'Utrecht', 'Rotterdam', 'Eindhoven'],
  meta: {
    title: "Exhibition Stall Design Agency in Netherlands | Amsterdam",
    description:
      'Approach Media is an exhibition stall design agency in the Netherlands -- custom booth design, 3D concepts, fabrication, branding, installation and dismantling for ISE Amsterdam, Interclean, Aquatech and major Dutch trade fairs.',
  },
  hero: {
    regionBadge: 'Netherlands · Europe',
    greetingLine: 'Goedendag, Amsterdam, Utrecht, Rotterdam',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Dutch trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across the Netherlands. From 3D stand concepts and fabrication to branding, installation and dismantling -- at RAI Amsterdam, Jaarbeurs Utrecht and Rotterdam Ahoy.',
    statLabel: 'Across Netherlands',
    citiesCount: '4',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Amsterdam · Utrecht · Rotterdam',
      'Support for Indian companies at Dutch trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Netherlands Exhibition',
  },
  standOut: {
    body1:
      "The Netherlands is Europe's gateway — positioned at the heart of the EU with Schiphol Airport connecting Amsterdam to 320+ global destinations. Indian companies exhibit here at ISE, Interclean, Aquatech and leading Dutch trade fairs to meet European buyers, distributors and technology partners.",
    body2:
      'We help Indian exhibitors build stands that meet Dutch venue standards, European safety codes and the precise, functional visual standards expected at Dutch and international trade fairs.',
    cards: [
      {
        t: 'RAI & Jaarbeurs Compliant Builds',
        d: 'Structures built to RAI Amsterdam and Jaarbeurs Utrecht regulations -- electrical specs, fire safety codes and move-in schedules planned from the start.',
      },
      {
        t: 'European Gateway Positioning',
        d: 'The Netherlands is a logistics and business hub for all of Europe. A well-designed stand here signals serious European market intent to Dutch and international buyers.',
      },
      {
        t: 'Technical Product Display',
        d: 'The Netherlands leads in water technology, agriculture, logistics and AV technology. We design stands that demonstrate technical products clearly and professionally.',
      },
      {
        t: 'Compact, Efficient Layouts',
        d: 'Dutch exhibition halls are competitive. We maximise every square metre -- product-dense, conversion-focused and clearly navigable for international visitors.',
      },
      {
        t: 'English-First Branding',
        d: "The Netherlands is one of Europe's most English-fluent business markets. We design all branding for English-speaking European and international audiences.",
      },
      {
        t: 'Remote Coordination',
        d: 'Design, approval and production managed from India -- on-site installation and execution by our Netherlands-coordinate team at the show venue.',
      },
    ],
  },
  venues: [
    {
      city: 'Amsterdam',
      name: 'RAI Amsterdam',
      blurb:
        'The Netherlands\' premier exhibition centre hosting ISE (Integrated Systems Europe -- world\'s largest AV show), Interclean (global cleaning industry fair), Aquatech Amsterdam and major medical and automotive congresses.',
      shows: [
        'ISE Amsterdam',
        'Interclean Amsterdam',
        'Aquatech Amsterdam',
        'European medical congresses',
      ],
    },
    {
      city: 'Utrecht',
      name: 'Jaarbeurs Utrecht',
      blurb:
        'Utrecht\'s trade fair venue hosting Vakbeurs Food (food industry), Infosecurity Netherlands, De Dag van de Kozijnen (windows & facades), Rail Tech Europe and regional manufacturing and technology shows.',
      shows: [
        'Vakbeurs Food',
        'Infosecurity Netherlands',
        'Rail Tech Europe',
        'Regional manufacturing shows',
      ],
    },
    {
      city: 'Rotterdam',
      name: 'Rotterdam Ahoy',
      blurb:
        'Rotterdam\'s primary event venue used for automotive shows, gaming events, consumer exhibitions and corporate B2B events -- serving the port city\'s diverse industrial and commercial audience.',
      shows: ['Automotive shows', 'Gaming events', 'Corporate B2B', 'Consumer exhibitions'],
    },
    {
      city: 'Eindhoven',
      name: 'Evoluon Eindhoven',
      blurb:
        'Eindhoven\'s distinctive exhibition and conference venue -- serving the Dutch tech and design corridor. Hosts Design Week Eindhoven and technology sector summits in the heart of Brainport.',
      shows: ['Dutch Design Week events', 'Tech sector summits', 'Innovation showcases'],
    },
    {
      city: 'Amsterdam',
      name: 'Amsterdam Arena & ArenA Area',
      blurb:
        'The Amsterdam ArenA area increasingly hosts large consumer and tech exhibitions alongside sports and entertainment events -- serving Amsterdam\'s broader business and consumer audience.',
      shows: ['Consumer exhibitions', 'Tech events', 'Large-format B2B shows'],
    },
  ],
  exhibitions: [
    { m: 'Feb', y: '26', name: 'ISE Amsterdam', cat: 'AV, Pro-Tech & Systems Integration', venue: 'RAI Amsterdam' },
    { m: 'Mar', y: '26', name: 'Vakbeurs Food Utrecht', cat: 'Food Industry & Retail', venue: 'Jaarbeurs Utrecht' },
    { m: 'Apr', y: '26', name: 'Aquatech Amsterdam', cat: 'Water Technology & Treatment', venue: 'RAI Amsterdam' },
    { m: 'Apr', y: '26', name: 'Infosecurity Netherlands', cat: 'Cybersecurity & IT', venue: 'Jaarbeurs Utrecht' },
    { m: 'May', y: '26', name: 'Interclean Amsterdam', cat: 'Cleaning & Hygiene Industry', venue: 'RAI Amsterdam' },
    { m: 'May', y: '26', name: 'Rail Tech Europe Utrecht', cat: 'Railway Technology', venue: 'Jaarbeurs Utrecht' },
    { m: 'Jun', y: '26', name: 'Dutch Design Week (build-up)', cat: 'Design & Architecture', venue: 'Eindhoven venues' },
    { m: 'Sep', y: '26', name: 'AutoRAI Amsterdam', cat: 'Automotive & Mobility', venue: 'RAI Amsterdam' },
    { m: 'Oct', y: '26', name: 'Euro Attractions Show', cat: 'Leisure & Attractions Industry', venue: 'RAI Amsterdam' },
    { m: 'Oct', y: '26', name: 'Provada Amsterdam', cat: 'Commercial Real Estate', venue: 'RAI Amsterdam' },
    { m: 'Nov', y: '26', name: 'European Utility Week', cat: 'Energy & Smart Utilities', venue: 'RAI Amsterdam' },
    { m: 'Nov', y: '26', name: 'Metstrade Amsterdam', cat: 'Marine Equipment & Technology', venue: 'RAI Amsterdam' },
  ],
  industries: [
    {
      t: 'AV, Pro-Tech & Systems Integration',
      d: 'Stands for AV manufacturers, systems integrators and technology brands at ISE Amsterdam -- the world\'s largest professional AV show.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Water Technology & Treatment',
      d: 'Technical product-display stands for water treatment, purification and infrastructure companies at Aquatech Amsterdam.',
    },
    {
      t: 'Cleaning & Hygiene',
      d: 'Exhibition stands for cleaning equipment, chemical and hygiene product companies at Interclean Amsterdam.',
    },
    {
      t: 'Food & Agriculture',
      d: 'Stands for food producers, agritech and food ingredient companies serving the Netherlands\' world-leading agri-food sector.',
    },
    {
      t: 'IT & Cybersecurity',
      d: 'Brand-forward stands for IT, cybersecurity and enterprise technology companies at Infosecurity Netherlands.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Logistics & Supply Chain',
      d: 'Functional display stands for logistics, transport and supply chain technology companies serving Europe\'s largest port hub.',
    },
    {
      t: 'Energy & Utilities',
      d: 'Forward-looking stands for renewable energy, smart grid and utilities technology companies at European Utility Week.',
    },
    {
      t: 'Maritime & Marine Industry',
      d: 'Specification-grade stands for marine equipment, shipbuilding and offshore technology companies at Metstrade Amsterdam.',
    },
  ],
  faqs: [
    {
      q: 'What does an exhibition stall design agency in the Netherlands do?',
      a: 'An exhibition stall design agency in the Netherlands creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Dutch trade fairs -- ISE Amsterdam, Interclean, Aquatech, Infosecurity Netherlands and more.',
    },
    {
      q: 'Why do Indian companies exhibit in the Netherlands?',
      a: 'The Netherlands is Europe\'s logistics and business gateway -- home to Europe\'s largest port (Rotterdam) and a hub for agri-food, technology, water treatment and AV industries. Indian companies exhibit here to meet European buyers, distributors and enterprise clients.',
    },
    {
      q: 'Can Approach Media support Indian companies at Dutch trade shows?',
      a: 'Yes. We support Indian companies exhibiting at Dutch trade fairs -- coordinating booth design, 3D concepts, fabrication, branding, logistics and on-site installation at RAI Amsterdam and Jaarbeurs Utrecht.',
    },
    {
      q: 'What is ISE Amsterdam?',
      a: 'ISE (Integrated Systems Europe) is the world\'s largest professional AV and systems integration trade show, held annually in February at RAI Amsterdam. Indian electronics manufacturers, AV technology companies and system integrators exhibit here to meet European installers, retailers and enterprise buyers.',
    },
    {
      q: 'Do you provide booth design for RAI Amsterdam?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at RAI Amsterdam -- including ISE, Interclean, Aquatech, AutoRAI and Metstrade.',
    },
    {
      q: 'What is Interclean Amsterdam?',
      a: 'Interclean Amsterdam is the world\'s leading professional cleaning and hygiene trade show, held biennially at RAI Amsterdam. Indian cleaning equipment manufacturers, chemical companies and hygiene product suppliers exhibit here to meet European and global distributors.',
    },
    {
      q: 'How early should we plan for a Dutch trade fair?',
      a: 'For Dutch trade shows we recommend starting 60 to 90 days before the event. ISE and Interclean require earlier planning due to high demand during their peak periods.',
    },
    {
      q: 'What types of stands do you build for Netherlands trade fairs?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits and branded experience zones -- built to RAI Amsterdam and Jaarbeurs Utrecht specifications.',
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
    heading1: 'Planning to exhibit in the Netherlands?',
    heading2gradient: 'Let\'s design a stand that opens European doors.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support -- from Amsterdam to Utrecht.',
  },
}

export default function NetherlandsPage() {
  return <CountryPageTemplate data={data} />
}
