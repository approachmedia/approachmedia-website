import type { Metadata } from 'next'
import { CountryPageTemplate, type CountryPageData } from '@/components/country/CountryPageTemplate'
import { blogLinksFor } from '@/lib/blog'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Agency in Italy | Milan" },
  description:
    'Approach Media is an exhibition stall design agency in Italy — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Salone del Mobile, HOST, Cosmoprof, Vinitaly, SIGEP and major Italian trade fairs.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-italy` },
}

const data: CountryPageData = {
  country: 'Italy',
  wordmark: 'ITALY',
  slug: 'exhibition-stall-design-agency-italy',
  heroImageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/italy-hero.jpg',
  areaServed: ['Italy', 'Milan', 'Bologna', 'Rimini', 'Verona', 'Florence'],
  meta: {
    title: "Exhibition Stall Design Agency in Italy | Milan",
    description:
      'Approach Media is an exhibition stall design agency in Italy — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Salone del Mobile, HOST, Cosmoprof, Vinitaly, SIGEP and major Italian trade fairs.',
  },
  hero: {
    regionBadge: 'Italy · Europe',
    greetingLine: 'Ciao, Milan, Bologna, Rimini',
    h1Line1: 'Custom booths,',
    h1Gradient: 'built for the',
    h1Line3: 'Italian trade floor.',
    body: 'Approach Media is a professional exhibition stall design agency helping Indian brands exhibit at trade fairs across Italy. From 3D stand concepts and fabrication to branding, installation and dismantling — at Fiera Milano, BolognaFiere, Rimini Expo Centre, Verona Expo and Fiera di Parma.',
    statLabel: 'Across Italy',
    citiesCount: '5',
    bullets: [
      'Custom booth design & 3D concepts',
      'Stand fabrication coordination',
      'Milan · Bologna · Rimini · Verona',
      'Support for Indian companies at Italian trade fairs',
      'Turnkey exhibition management',
    ],
    ctaSecondary: 'Discuss Your Italian Exhibition',
  },
  standOut: {
    body1:
      "Italy is Europe's design capital and home to some of the world's most prestigious trade fairs — Salone del Mobile, Cosmoprof, HOST, Vinitaly and EICMA. Indian companies exhibit here to position their brands in fashion, furniture, food, hospitality and manufacturing markets across Europe.",
    body2:
      'We help Indian exhibitors arrive at Italian shows with stands that reflect design sensibility, Italian venue standards and the premium visual expectations of European buyers.',
    cards: [
      {
        t: 'Italian Venue Compliant Builds',
        d: 'Structures built to Fiera Milano, BolognaFiere and Rimini Expo Centre regulations — electrical specs, rigging permissions and move-in schedules planned from the start.',
      },
      {
        t: 'Design-Led Brand Presentation',
        d: 'Italy is where design is evaluated as culture. We build stands with a design rigour that matches the Italian trade fair aesthetic — clean lines, brand clarity and material quality.',
      },
      {
        t: 'Product Display Excellence',
        d: 'Structured, refined display areas for furniture, textiles, food products, machinery and consumer goods — planned for the browsing habits of Italian and European buyers.',
      },
      {
        t: 'Meeting & Hospitality Zones',
        d: 'Italian B2B culture values relationship-building. We design meeting areas, hospitality counters and conversation spaces that support buyer relationship development.',
      },
      {
        t: 'Multi-Language Branding',
        d: 'Italian and English — or bilingual — fascia, panels and signage to serve both Italian domestic buyers and international visitors at major fairs.',
      },
      {
        t: 'Remote Coordination from India',
        d: 'Design approvals, 3D concepts and production coordination managed remotely until on-site installation by our Italy execution team.',
      },
    ],
  },
  venues: [
    {
      city: 'Milan (Rho)',
      name: 'Fiera Milano',
      blurb:
        "Italy's — and one of Europe's — largest exhibition centres, hosting Salone del Mobile (world's largest furniture fair), HOST, EICMA, LINEAPELLE, Tuttofood and BIT. The global address for Italian design, hospitality and manufacturing.",
      shows: ['Salone del Mobile', 'HOST', 'EICMA', 'LINEAPELLE', 'Tuttofood', 'BIT'],
    },
    {
      city: 'Bologna',
      name: 'BolognaFiere',
      blurb:
        "One of Italy's most important regional venues — hosting Cosmoprof (world's largest beauty fair), Cersaie (ceramics & tile), SANA (organic products), Children's Book Fair and MOTOR SHOW.",
      shows: ['Cosmoprof Bologna', 'Cersaie', 'SANA', "Children's Book Fair", 'MOTOR SHOW'],
    },
    {
      city: 'Rimini',
      name: 'Italian Exhibition Group (IEG) — Rimini',
      blurb:
        "Italy's second-largest exhibition group hosts SIGEP (gelato, bakery, coffee), TTG Rimini (tourism), Rimini Wellness and Macfrut — important for food service, hospitality and agricultural sectors.",
      shows: ['SIGEP', 'TTG Rimini', 'Rimini Wellness', 'Macfrut', 'FIERAVICOLA'],
    },
    {
      city: 'Verona',
      name: 'Veronafiere',
      blurb:
        "Verona's exhibition venue hosts Vinitaly (world's largest wine fair), Fieragricola (agriculture), Marmomacc (marble & natural stone) and Enolitech — significant for wine, agriculture and materials sectors.",
      shows: ['Vinitaly', 'Fieragricola', 'Marmomacc', 'Enolitech', 'Sol & Agrifood'],
    },
    {
      city: 'Parma',
      name: 'Fiere di Parma',
      blurb:
        "Parma hosts Cibus (Italy's largest food fair, biennial) and Cibus Tec (food processing technology) — the key address for food manufacturers, processors and packagers meeting Italian and European food buyers.",
      shows: ['Cibus', 'Cibus Tec', 'Food processing events'],
    },
    {
      city: 'Bari',
      name: 'Nuova Fiera del Levante',
      blurb:
        "Southern Italy's main exhibition centre hosts Agrilevante (agricultural machinery), Levante Prof (beauty) and the Fiera del Levante international trade fair — serving southern European and Mediterranean markets.",
      shows: ['Agrilevante', 'Levante Prof', 'Fiera del Levante', 'Mediterranean trade events'],
    },
  ],
  exhibitions: [
    { m: 'Jan', y: '26', name: 'SIGEP Rimini', cat: 'Gelato, Bakery & Coffee', venue: 'IEG Rimini' },
    { m: 'Feb', y: '26', name: 'LINEAPELLE Milan', cat: 'Leather, Accessories & Materials', venue: 'Fiera Milano' },
    { m: 'Mar', y: '26', name: 'Cosmoprof Bologna', cat: 'Beauty & Personal Care', venue: 'BolognaFiere' },
    { m: 'Apr', y: '26', name: 'Salone del Mobile Milan', cat: 'Furniture & Interior Design', venue: 'Fiera Milano' },
    { m: 'Apr', y: '26', name: 'Vinitaly Verona', cat: 'Wine & Spirits', venue: 'Veronafiere' },
    { m: 'May', y: '26', name: 'Tuttofood Milan', cat: 'Food & Beverage Industry', venue: 'Fiera Milano' },
    { m: 'May', y: '26', name: 'Cibus Parma', cat: 'Italian Food Industry', venue: 'Fiere di Parma' },
    { m: 'Jun', y: '26', name: 'TTG Rimini', cat: 'Travel, Tourism & Hospitality', venue: 'IEG Rimini' },
    { m: 'Sep', y: '26', name: 'Cersaie Bologna', cat: 'Ceramics & Bathroom Design', venue: 'BolognaFiere' },
    { m: 'Sep', y: '26', name: 'EICMA Milan', cat: 'Motorcycle & Bicycle Industry', venue: 'Fiera Milano' },
    { m: 'Oct', y: '26', name: 'HOST Milan', cat: 'Hospitality & Catering Equipment', venue: 'Fiera Milano' },
    { m: 'Oct', y: '26', name: 'Marmomacc Verona', cat: 'Stone, Marble & Materials', venue: 'Veronafiere' },
    { m: 'Nov', y: '26', name: 'Agrilevante Bari', cat: 'Agricultural Machinery', venue: 'Nuova Fiera del Levante' },
  ],
  industries: [
    {
      t: 'Furniture & Interior Design',
      d: "Design-led stands for furniture brands, material suppliers and interior design companies at Salone del Mobile Milan — the world's benchmark design fair.",
      span: 'lg:col-span-2',
    },
    {
      t: 'Fashion, Leather & Accessories',
      d: 'Premium display stands for leather goods, fabric houses and fashion accessories brands at LINEAPELLE Milan.',
    },
    {
      t: 'Food, Beverage & Wine',
      d: 'Showcasing Indian food exports, wine alternatives and beverage brands at Vinitaly, Cibus, Tuttofood and SIGEP.',
    },
    {
      t: 'Cosmetics & Beauty',
      d: "Refined stands for cosmetics, personal care and wellness brands at Cosmoprof Bologna — the world's largest beauty trade fair.",
    },
    {
      t: 'Hospitality & Catering Equipment',
      d: 'Display-focused stands for hotel equipment, kitchen technology and F&B brands at HOST Milan and TTG Rimini.',
      span: 'lg:col-span-2',
    },
    {
      t: 'Ceramics & Building Materials',
      d: 'Technical product-display booths for ceramic tile, stone and building material companies at Cersaie and Marmomacc.',
    },
    {
      t: 'Motorcycles & Two-Wheelers',
      d: 'High-impact brand stands for motorcycle, electric bike and component manufacturers at EICMA Milan.',
    },
    {
      t: 'Agriculture & Food Processing',
      d: 'Practical exhibition stands for agricultural machinery and food processing equipment at Cibus Tec and Agrilevante.',
    },
  ],
  faqs: [
    {
      q: 'What does an exhibition stall design agency in Italy do?',
      a: 'An exhibition stall design agency in Italy creates booth layouts, 3D stand concepts, branding, fabrication plans and installation support for companies exhibiting at Italian trade fairs — Salone del Mobile, Cosmoprof, HOST, Vinitaly, Cibus, SIGEP, EICMA and more.',
    },
    {
      q: 'Which Italian cities are most important for trade fairs?',
      a: "Milan is Italy's most important trade fair city, home to Fiera Milano (Rho) which hosts Salone del Mobile, HOST, EICMA and Tuttofood. Bologna hosts Cosmoprof and Cersaie. Rimini hosts SIGEP and TTG. Verona hosts Vinitaly. Parma hosts Cibus.",
    },
    {
      q: 'Can Approach Media support Indian companies at Italian trade shows?',
      a: 'Yes. We specifically support Indian companies exhibiting at Italian trade fairs — coordinating booth design, 3D concepts, fabrication, branding, logistics and on-site installation.',
    },
    {
      q: 'What is Salone del Mobile and how do Indian companies exhibit there?',
      a: 'Salone del Mobile Milan is the world\'s largest furniture and design trade fair, held annually in April at Fiera Milano. Indian furniture brands, textile companies and interior material suppliers exhibit here to meet European buyers, interior designers and retail chains.',
    },
    {
      q: 'Do you provide booth design for Fiera Milano?',
      a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events at Fiera Milano — including Salone del Mobile, HOST, EICMA, LINEAPELLE and Tuttofood.',
    },
    {
      q: 'What is Cosmoprof Bologna?',
      a: "Cosmoprof Bologna is the world's largest professional beauty trade show, held annually in March at BolognaFiere. Indian cosmetics, personal care and wellness brands exhibit here to connect with European distributors, retailers and beauty professionals.",
    },
    {
      q: 'How early should we plan for an Italian trade fair?',
      a: 'For Italian trade shows we recommend starting 60 to 90 days before the event. Salone del Mobile, Cosmoprof and HOST require earlier planning as they attract very high exhibitor volumes.',
    },
    {
      q: 'What types of stands do you build for Italian trade fairs?',
      a: 'Shell-scheme upgrades, custom-built booths, modular stands, island exhibits, double-decker structures and branded experience zones — all to Fiera Milano, BolognaFiere and Italian organiser specifications.',
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
    heading1: 'Planning to exhibit in Italy?',
    heading2gradient: "Let's design a stand worthy of the Italian trade floor.",
    body: 'Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support — from Milan to Bologna.',
  },
}

export default function ItalyPage() {
  return (
    <CountryPageTemplate
      data={data}
      // Batch 4 asked for this and it was deferred: country pages had no
      // From-the-blog block. Batch 6 asked for the same on the USA page, so
      // the block now exists on CountryPageTemplate and both are wired.
      fromTheBlog={blogLinksFor([
        'cphi-milan-2026-indian-exhibitors-guide',
        'exhibition-stall-design-cost-india',
      ])}
    />
  )
}
