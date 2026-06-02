import type { CityPageData, ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = { title: string; link: string; dateRaw: string; startDate: string | null; city: string; categories: string[] }

const KEY_SHOWS: ExhibitionShow[] = [
  { title: 'SITEX — Surat International Textile Expo 2026', dateRaw: '21–23 Feb 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Surat International Auto Expo 2026',            dateRaw: '13–16 Mar 2026', categories: ['Tradeshow', 'Auto & Automotive', 'Auto Shows'],              venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Sparkle International Gems & Jewellery Exhibition', dateRaw: '19–21 Mar 2026', categories: ['Tradeshow', 'Gems & Jewelry', 'Fashion & Beauty'],       venue: 'Surat (Venue TBA)',     link: null },
  { title: 'Garfab — TX Surat',                             dateRaw: '27–29 Mar 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns'],                       venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Wealth Expo 2026',                        dateRaw: '8–10 May 2026',  categories: ['Tradeshow', 'Banking & Finance', 'Business Services'],        venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Textile Exhibition',                      dateRaw: '26–28 Jun 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Hi Life Exhibition',                            dateRaw: '26–28 Mar 2026', categories: ['Tradeshow', 'Fashion & Beauty'],                               venue: 'Surat',                 link: null },
  { title: 'Spring India Expo',                             dateRaw: '2–4 Apr 2026',   categories: ['Tradeshow', 'IT & Technology'],                               venue: 'Surat',                 link: null },
  { title: '21by72 Startup Summit',                        dateRaw: '13 Jun 2026',    categories: ['Tradeshow', 'Business Services'],                             venue: 'Surat',                 link: null },
]

const csvExtra = (eventsData as CsvEvent[])
  .filter(e => e.city.toLowerCase().includes('surat') && !KEY_SHOWS.some(k => e.title.toLowerCase().startsWith(k.title.toLowerCase().slice(0, 18))))
  .slice(0, 3)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

export const suratData: CityPageData = {
  citySlug: 'surat',
  metaTitle: 'Exhibition Agency in Surat | Exhibition Stall Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd helps brands plan, design, fabricate and install custom exhibition stalls in Surat for SIECC trade shows, textile expos, jewellery events, auto expos and B2B exhibitions.',
  canonicalPath: '/exhibition-agency-in-surat',

  eyebrow: 'Surat · Gujarat · India',
  h1Line1: 'Exhibition Agency in Surat That Builds Stalls',
  h1Highlight: 'Designed to Win Attention',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create practical, brand-led and visitor-friendly exhibition stalls for trade shows in Surat. From 3D concepts and fabrication to venue coordination, installation and dismantling — we run the complete exhibition workflow so your team can focus on meetings and conversions.',
  trustPills: ['Custom 3D stall design', 'Fabrication & branding support', 'SIECC & Surat trade show execution', 'End-to-end project coordination'],

  introHeading: 'Exhibition Stall Design & Fabrication for Surat Trade Shows',
  introP1: 'Surat is one of Gujarat\'s most active exhibition markets — especially for textiles, diamonds & jewellery, manufacturing, automobiles, food, finance and real estate. For brands participating at Surat International Exhibition and Convention Centre (SIECC) Sarsana or other local venues, the stall must do more than look attractive.',
  introP2: 'It needs to communicate your offer clearly, support product display, manage visitor movement and help your sales team start better conversations. We work with brands that need a dependable exhibition agency in Surat for planning, design, fabrication, branding, installation and post-show dismantling.',

  standOutHeading: 'Built for Crowded Surat Aisles',
  standOut: [
    { title: 'Clear front-facing branding',  body: 'Better visibility from crowded aisles so visitors notice you before they reach a competitor.' },
    { title: 'Smart product display zones',  body: 'Dedicated areas for samples, catalogues, machines or demos — each placed for easy access.' },
    { title: 'Meeting areas built in',       body: 'Private and semi-private spaces for buyers, dealers, distributors and trade visitors.' },
    { title: 'Lighting, graphics & finishes',body: 'Every element supports your brand identity and looks premium under exhibition lighting.' },
    { title: 'Storage & working space',      body: 'Practical back-of-stall areas keep your team organised throughout the show day.' },
    { title: 'Venue-ready execution',        body: 'We plan for organiser timelines, height permissions, electrical needs and SIECC safety rules.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',   body: 'Concepts built around your brand, product category, exhibition goal and booth size — planned for visibility, visitor flow and practical team use.' },
    { num: '02', title: '3D Stall Design & Visualization',  body: 'Review a 3D view of the proposed stall before fabrication begins. Make changes early and approve with confidence.' },
    { num: '03', title: 'Exhibition Stall Fabrication',     body: 'Custom stalls, modular stalls, shell-scheme upgrades, display areas, counters, backlit panels, partitions and storage.' },
    { num: '04', title: 'Branding, Graphics & Print',       body: 'Fascia branding, product panels, backdrop walls, standees, brochure counters, signage and LED-ready artwork.' },
    { num: '05', title: 'Turnkey Exhibition Management',    body: 'Design, production, logistics, venue installation, quality checks and post-show removal — under one coordinated team.' },
    { num: '06', title: 'Rental & Reusable Options',        body: 'Modular and reusable booth formats that keep brand presence strong while controlling cost across multiple shows.' },
  ],

  venueIntro: 'Surat\'s exhibition infrastructure is anchored by the Surat International Exhibition and Convention Centre (SIECC) at Sarsana — the city\'s principal facility for large-format trade shows, industrial exhibitions, and national-level B2B events. Built and operated under the Southern Gujarat Chamber of Commerce and Industry (SGCCI), SIECC hosts the city\'s most commercially significant shows across textiles, automobiles, gems and jewellery, food and beverages, and manufacturing. Our team has built and installed 3D exhibition stands at SIECC across multiple show editions, and our familiarity with the venue\'s floor plans, logistics access, and technical requirements ensures smooth, reliable execution every time.',
  featuredVenue: {
    name: 'Surat International Exhibition and Convention Centre (SIECC)',
    address: '146/B, Bhatar-Althan Road, Near Khajod Chowkdi, Sarsana, Surat, Gujarat 395017',
    imageUrl: '/images/venues/siecc-surat.jpg',
    ctaLabel: 'Plan My Stand at SIECC',
    specs: [
      { label: 'Total Land Area',   value: '1,30,000 sq. metres' },
      { label: 'Exhibition Hall',   value: 'Pillarless, air-conditioned · 10,600 sq. metres' },
      { label: 'Ceiling Height',    value: '17 m at centre, sloping to 6.5 m at sides' },
      { label: 'Conference Rooms',  value: '14 rooms · 10 to 250 persons capacity' },
      { label: 'Convention Centre', value: 'Platinum Hall multi-purpose banquet, stage with lighting' },
      { label: 'Parking',           value: '750 dedicated on-site spaces' },
      { label: 'Airport Distance',  value: '~7 km from Surat Airport' },
      { label: 'Organizer',         value: 'SGCCI · Est. 1940 · ISO 9001:2015 certified' },
    ],
    notableShows: 'SITEX (Surat International Textile Expo), Surat International Auto Expo, Sparkle International Gems & Jewellery Exhibition, UDYOG Industrial Exhibition, Food & Beverage Expo, Wealth Expo, SGCCI Global Village, Textile Utsav, ROOTZ Jewellery Exhibition, WeaveKniTT, Women Entrepreneur Exhibition (WEE)',
  },

  shows: [...KEY_SHOWS, ...csvExtra],

  industries: [
    { title: 'Textiles, Apparel & Machinery',              body: 'Stalls that display fabric ranges, highlight processing and create focused buyer discussion areas.' },
    { title: 'Diamonds, Gems & Jewellery',                 body: 'Refined layouts with premium finishes, secure counters and focused lighting for trade visitors.' },
    { title: 'Manufacturing & Engineering',                body: 'Durable, easy-to-navigate stalls supporting machinery, components and buyer conversations.' },
    { title: 'Automobile, EV & Components',                body: 'Spaces designed for strong product visibility, vehicle display and clean visitor movement.' },
    { title: 'Food, FMCG & Hospitality Supply',            body: 'Display counters, storage and hygiene-friendly working areas built for high footfall.' },
    { title: 'Finance, Investment & Professional Services', body: 'Professional booths that communicate trust, clarity and easy consultation.' },
    { title: 'Real Estate & Infrastructure',               body: 'Stalls with model display, project visuals, enquiry counters and private discussion zones.' },
  ],

  whyUs: [
    { title: 'Brand-First Stall Planning',    body: 'We start with your objective, audience, products, booth size, budget and outcome — not a stock template.' },
    { title: 'Practical 3D Design',           body: 'Concepts planned to look good and work well on the actual floor, with real attention to walking space and storage.' },
    { title: 'One Coordinated Team',          body: 'Design, fabrication, graphics, logistics, installation and dismantling — fewer gaps, faster movement.' },
    { title: 'Transparent Scope & Budgeting', body: 'What\'s included is defined before production — design, materials, branding, lighting, furniture, transport, install, dismantle.' },
    { title: 'Local Execution Awareness',     body: 'Surat exhibitions run on tight timelines. We plan with SIECC venue rules and organiser schedules in mind.' },
    { title: 'Lead-Focused Booth Layouts',    body: 'Designed to support visitor conversations, product explanation and enquiry capture — not just decoration.' },
  ],

  process: [
    { step: '01', title: 'Brief & Requirement Study',         body: 'Exhibition name, booth size, open sides, product category, brand guidelines, budget, visitor profile and sales goals.' },
    { step: '02', title: 'Concept & Layout Planning',         body: 'Stall direction, zoning plan and customer-flow logic so every part of the booth has a purpose.' },
    { step: '03', title: '3D Stall Design',                   body: 'Visual design showing structure, branding, counters, display areas, lighting and key design elements.' },
    { step: '04', title: 'Estimate & Scope Confirmation',     body: 'Clear quotation and scope of work so you understand what\'s included before production.' },
    { step: '05', title: 'Fabrication & Branding Production', body: 'Stall elements, graphics and display materials produced as per approved design and timeline.' },
    { step: '06', title: 'Logistics & Venue Installation',    body: 'Stall transported to the venue and installed by our execution team, with final checks before handover.' },
    { step: '07', title: 'Dismantling After the Show',        body: 'We manage dismantling and removal as per venue instructions, post-event.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition agency in Surat for stall design and fabrication?', a: 'The best agency is the one that understands your booth size, exhibition objective, brand guidelines, venue rules and execution timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Surat trade shows.' },
    { q: 'Do you provide exhibition stall design for SIECC Surat?', a: 'Yes. We support exhibition stall planning and execution for events at Surat International Exhibition and Convention Centre (SIECC), Sarsana, along with other trade show venues in and around Surat.' },
    { q: 'Can you create a 3D stall design before fabrication?', a: 'Yes. We prepare a 3D stall design so your team can review the booth layout, branding, product display, lighting and visitor movement before production begins.' },
    { q: 'How much does an exhibition stall cost in Surat?', a: 'It depends on booth size, design complexity, materials, open sides, branding, lighting, furniture, technology and installation requirements. Share your exhibition details to receive a customised estimate.' },
    { q: 'How early should we start planning our Surat exhibition stall?', a: 'For a custom stall, start at least 30–60 days before the exhibition. Larger stalls or premium finishes may need more time for design approvals and production planning.' },
    { q: 'Do you provide turnkey exhibition stall services?', a: 'Yes. We manage the complete process — brief, concept, 3D design, fabrication, branding, logistics, installation and dismantling.' },
    { q: 'Can you handle small booths as well as large custom stalls?', a: 'Yes. We support compact booths, shell scheme upgrades, modular stalls, custom-built stalls and larger island-style stands.' },
    { q: 'What details do you need to prepare a stall design?', a: 'Exhibition name, booth size, open sides, floor plan if available, brand logo, product details, design references, budget range and project timeline.' },
  ],

  schemaName: 'Exhibition Agency in Surat',
  schemaAreaServed: 'Surat',
}
