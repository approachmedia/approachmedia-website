import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'
import { SITE_URL } from '@/lib/site-url'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in Germany | Booth Design & Fabrication',
  description: 'Approach Media is an exhibition stall design agency in Germany — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Frankfurt, Hannover, Munich, Düsseldorf, Cologne and Berlin.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-germany` },
}

const data: CountryPageData = {
  country: 'Germany',
  wordmark: 'GERMANY',
  slug: 'exhibition-stall-design-agency-germany',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/germany-hero.jpg',
  areaServed: ['Germany', 'Frankfurt', 'Hannover', 'Munich', 'Düsseldorf', 'Cologne', 'Berlin'],

  meta: {
    title: 'Exhibition Stall Design Agency in Germany | Booth Design & Fabrication',
    description: 'Approach Media is an exhibition stall design agency in Germany — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Frankfurt, Hannover, Munich, Düsseldorf, Cologne and Berlin.',
  },

  hero: {
    regionBadge: 'Germany · Europe',
    greetingLine: 'Guten Tag, Frankfurt, Munich, Hannover',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'German trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Germany. From 3D stand concepts and fabrication to branding, installation and dismantling — at Messe Frankfurt, Hannover Messe, Messe München, Messe Düsseldorf, Koelnmesse and Messe Berlin.',
    statLabel: 'Across Germany',
    citiesCount: '8',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Frankfurt · Hannover · Munich · Düsseldorf',
      'Support for Indian companies at German trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your German Exhibition',
  },

  standOut: {
    body1: 'Germany hosts more international trade fairs than any other country — over two-thirds of the world\'s leading fairs take place here. Indian companies exhibit in Frankfurt, Hannover, Munich and Düsseldorf to meet European buyers, distributors, OEM partners and procurement teams.',
    body2: 'We help you arrive ready — with a booth built to DIN-standard venue specs, German organiser requirements and the visual standards expected at premier European trade fairs.',
    cards: [
      {
        t: 'DIN & Venue Compliant Builds',
        d: 'Structures designed to German venue guidelines, Octanorm-compatible systems and DIN safety standards across all Messe venues.',
      },
      {
        t: 'Premium Brand Positioning',
        d: 'Germany is a market where build quality is read as brand quality. We match the fit and finish expected at Germany\'s leading trade fairs.',
      },
      {
        t: 'Product Display & Demo Zones',
        d: 'Engineered display areas for machinery, equipment and industrial products — planned for the visitor flow and demonstration needs of German B2B shows.',
      },
      {
        t: 'B2B Meeting & Negotiation Spaces',
        d: 'German trade shows are appointment-driven. Private and semi-private meeting areas are planned into every stand layout.',
      },
      {
        t: 'Multi-Language Branding',
        d: 'Fascia, panels and signage designed for English, German or bilingual — serving both domestic German audiences and international visitors.',
      },
      {
        t: 'Remote Coordination from India',
        d: 'Full design approvals, 3D review and scope finalisation managed remotely before on-site fabrication and installation in Germany.',
      },
    ],
  },

  venues: [
    {
      city: 'Frankfurt',
      name: 'Messe Frankfurt',
      blurb: 'One of the world\'s largest trade fair venues — home to Automechanika, Ambiente, Formnext, ISH, Frankfurt Book Fair, ACHEMA, Light + Building and Hypermotion. A critical destination for Indian exporters in automotive, consumer goods and engineering.',
      shows: ['Automechanika', 'Ambiente', 'Formnext', 'ISH', 'ACHEMA', 'Light + Building'],
    },
    {
      city: 'Hannover',
      name: 'Hannover Messe',
      blurb: 'The world\'s most important industrial technology fair. India regularly features as a partner country. Hannover Messe, EMO Hannover, LIGNA and AGRITECHNICA draw decision-makers from manufacturing, engineering and agricultural sectors.',
      shows: ['Hannover Messe', 'EMO Hannover', 'LIGNA', 'AGRITECHNICA'],
    },
    {
      city: 'Munich',
      name: 'Messe München',
      blurb: 'Home to Bauma (world\'s largest construction fair), Electronica, Intersolar Europe, ISPO and IAA Mobility — serving construction, electronics, renewable energy, sports and automotive sectors.',
      shows: ['Bauma', 'Electronica', 'Intersolar Europe', 'ISPO', 'IAA Mobility'],
    },
    {
      city: 'Düsseldorf',
      name: 'Messe Düsseldorf',
      blurb: 'Hosts MEDICA (world\'s largest medical trade fair), drupa (print), interpack (packaging), K (plastics & rubber), ProWein and boot Düsseldorf — spanning healthcare, processing and industrial sectors.',
      shows: ['MEDICA', 'drupa', 'interpack', 'K – Plastics & Rubber', 'ProWein'],
    },
    {
      city: 'Cologne',
      name: 'Koelnmesse',
      blurb: 'Cologne\'s exhibition venue hosts Anuga (world\'s largest food trade fair), ISM (confectionery), imm cologne (furniture), gamescom (gaming) and INTERMOT (motorcycles) — across food, lifestyle and technology.',
      shows: ['Anuga', 'ISM', 'imm cologne', 'gamescom', 'INTERMOT'],
    },
    {
      city: 'Berlin',
      name: 'Messe Berlin',
      blurb: 'Home to InnoTrans (transport technology), IFA Berlin (consumer electronics), ITB Berlin (world\'s largest travel fair) and FRUIT LOGISTICA — serving tech, travel and logistics sectors.',
      shows: ['InnoTrans', 'IFA Berlin', 'ITB Berlin', 'FRUIT LOGISTICA'],
    },
  ],

  exhibitions: [
    { m: 'Jan', y: '26', name: 'boot Düsseldorf',            cat: 'Marine & Water Sports',          venue: 'Messe Düsseldorf' },
    { m: 'Jan', y: '26', name: 'ISM Cologne',                cat: 'Confectionery & Snacks',         venue: 'Koelnmesse' },
    { m: 'Feb', y: '26', name: 'FRUIT LOGISTICA Berlin',     cat: 'Fresh Produce & Logistics',      venue: 'Messe Berlin' },
    { m: 'Feb', y: '26', name: 'Ambiente Frankfurt',          cat: 'Consumer Goods & Tableware',     venue: 'Messe Frankfurt' },
    { m: 'Mar', y: '26', name: 'ITB Berlin',                  cat: 'Travel & Tourism',               venue: 'Messe Berlin' },
    { m: 'Mar', y: '26', name: 'ProWein Düsseldorf',         cat: 'Wine & Spirits',                 venue: 'Messe Düsseldorf' },
    { m: 'Apr', y: '26', name: 'Hannover Messe',              cat: 'Industrial Technology',           venue: 'Hannover Messe' },
    { m: 'May', y: '26', name: 'LIGNA Hannover',              cat: 'Wood & Timber Industry',         venue: 'Hannover Messe' },
    { m: 'Jun', y: '26', name: 'Intersolar Europe Munich',   cat: 'Solar & Renewable Energy',       venue: 'Messe München' },
    { m: 'Aug', y: '26', name: 'gamescom Cologne',           cat: 'Gaming & Entertainment',         venue: 'Koelnmesse' },
    { m: 'Sep', y: '26', name: 'IFA Berlin',                  cat: 'Consumer Electronics & Home',    venue: 'Messe Berlin' },
    { m: 'Sep', y: '26', name: 'Automechanika Frankfurt',    cat: 'Automotive Trade',               venue: 'Messe Frankfurt' },
    { m: 'Nov', y: '26', name: 'MEDICA Düsseldorf',          cat: 'Medical Technology & Healthcare', venue: 'Messe Düsseldorf' },
  ],

  industries: [
    {
      t: 'Automotive & Mobility Engineering',
      d: 'Stands for auto-parts manufacturers, Tier-1 suppliers and EV brands at Automechanika Frankfurt and IAA Mobility.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Industrial Machinery & Manufacturing',
      d: 'Display booths for industrial equipment and production technology at Hannover Messe, EMO and LIGNA.',
    },
    {
      t: 'Food & Beverage Trade',
      d: 'Exhibition stands for food processors, exporters and FMCG brands at Anuga Cologne and Ambiente Frankfurt.',
    },
    {
      t: 'Medical Technology & Healthcare',
      d: 'Clean, professional-grade stands for medical device and pharma companies at MEDICA Düsseldorf.',
    },
    {
      t: 'Consumer Electronics & Technology',
      d: 'Engineered product display stands for electronics and tech brands at IFA Berlin and Electronica Munich.',
    },
    {
      t: 'Plastics, Chemicals & Packaging',
      d: 'Industrial display stands for materials, chemicals and packaging companies at K Düsseldorf and interpack.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Renewable Energy & Environment',
      d: 'Forward-looking booth designs for solar, wind and cleantech brands at Intersolar Europe Munich.',
    },
    {
      t: 'Travel, Tourism & Hospitality',
      d: 'Country pavilion elements and branded stands for travel and hospitality brands at ITB Berlin.',
    },
  ],

  faqs: [
    {
      q: 'What does an exhibition stall design agency in Germany do?',
      a: 'An exhibition stall design agency in Germany creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at German trade fairs in Frankfurt, Hannover, Munich, Düsseldorf, Cologne and Berlin.',
    },
    {
      q: 'Which cities in Germany are most important for trade fairs?',
      a: 'Frankfurt, Hannover, Munich, Düsseldorf and Cologne are the five most important German trade fair cities. Frankfurt hosts Automechanika, Ambiente and Formnext; Hannover hosts the world\'s largest industrial fair; Munich hosts Bauma and Electronica; Düsseldorf hosts MEDICA and drupa; Cologne hosts Anuga.',
    },
    {
      q: 'What are the most important trade fairs in Germany for Indian companies?',
      a: 'Hannover Messe, Automechanika Frankfurt, MEDICA Düsseldorf, Anuga Cologne, Formnext Frankfurt, ACHEMA Frankfurt and ISH Frankfurt are among the most attended by Indian exhibitors — spanning engineering, automotive, healthcare, food, manufacturing and energy sectors.',
    },
    {
      q: 'Can Approach Media support Indian companies at German trade shows?',
      a: 'Yes. We specifically support Indian companies exhibiting at German trade fairs — coordinating booth design, 3D concepts, fabrication, branding, logistics and installation remotely and on-site.',
    },
    {
      q: 'What is Hannover Messe and how do Indian companies exhibit there?',
      a: 'Hannover Messe is the world\'s largest industrial technology fair held annually in April. India regularly participates as a partner country. Indian manufacturers, engineering firms and tech companies exhibit here to meet European buyers, OEMs and enterprise clients.',
    },
    {
      q: 'Do you provide booth design for Messe Frankfurt?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication coordination for events at Messe Frankfurt — including Automechanika, Ambiente, ISH, Formnext, ACHEMA and the Frankfurt Book Fair.',
    },
    {
      q: 'How early should we book exhibition stand design for Germany?',
      a: 'For German trade fairs we recommend beginning at least 60 to 90 days before the event. Hannover Messe, Automechanika, MEDICA and other peak-period shows may require 120+ days lead time for larger custom structures.',
    },
    {
      q: 'Do you create 3D booth designs before fabrication?',
      a: 'Yes. A detailed 3D booth concept is created before any production begins so your team can review and approve the layout, branding, display, lighting and visitor flow in advance.',
    },
    {
      q: 'What types of exhibition stands do you build for Germany?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island stands, double-decker structures, product display booths, country pavilion elements and branded corporate experience zones — all to German venue specifications.',
    },
    {
      q: 'What information does Approach Media need to begin?',
      a: 'Exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and timeline.',
    },
  ],

  cta: {
    heading1: 'Planning to exhibit in Germany?',
    heading2gradient: 'Let\'s design a stand worthy of the German trade floor.',
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Frankfurt to Hannover.',
  },
}

export default function GermanyPage() {
  return <CountryPageTemplate data={data} />
}
