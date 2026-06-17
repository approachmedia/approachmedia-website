import type { CityPageData, ExhibitionShow } from '../types'

// Curated trade fair list for France — ordered roughly chronologically through 2026.
// Photo placeholders (imageUrl paths below) use /images/venues/... — upload actual
// venue photos to public/images/venues/ to replace the auto-generated placeholder.
const shows: ExhibitionShow[] = [
  { title: 'Maison & Objet Paris',          dateRaw: 'Jan 2026',  categories: ['Interior Design & Lifestyle'],  venue: 'Paris Nord Villepinte',              link: null },
  { title: 'Sirha Lyon — Food Service',     dateRaw: 'Jan 2026',  categories: ['Tourism & Hospitality'],        venue: 'Eurexpo, Lyon',                      link: null },
  { title: 'Who\'s Next Paris — Fashion',   dateRaw: 'Jan 2026',  categories: ['Fashion & Beauty'],             venue: 'Paris Expo Porte de Versailles',     link: null },
  { title: 'Première Vision Paris',         dateRaw: 'Feb 2026',  categories: ['Textile, Fabrics & Yarns'],    venue: 'Paris Nord Villepinte',              link: null },
  { title: 'JEC World — Composites',        dateRaw: 'Mar 2026',  categories: ['Industrial Engineering'],       venue: 'Paris Expo Porte de Versailles',     link: null },
  { title: 'MIPIM Cannes — Real Estate',    dateRaw: 'Mar 2026',  categories: ['Business Services'],            venue: 'Palais des Festivals, Cannes',       link: null },
  { title: 'Global Industrie Lyon',         dateRaw: 'Mar 2026',  categories: ['Industrial Engineering'],       venue: 'Eurexpo, Lyon',                      link: null },
  { title: 'VivaTech Paris',                dateRaw: 'Jun 2026',  categories: ['IT & Technology'],              venue: 'Paris Expo Porte de Versailles',     link: null },
  { title: 'Cannes Lions',                  dateRaw: 'Jun 2026',  categories: ['Business Services'],            venue: 'Palais des Festivals, Cannes',       link: null },
  { title: 'Cannes Yachting Festival',      dateRaw: 'Sep 2026',  categories: ['Tourism & Hospitality'],        venue: 'Cannes Old Port & Lérins Islands',   link: null },
  { title: 'SIAL Paris — Food Industry',    dateRaw: 'Oct 2026',  categories: ['Food & Beverage'],              venue: 'Paris Nord Villepinte',              link: null },
  { title: 'MIPCOM — Entertainment',        dateRaw: 'Oct 2026',  categories: ['Business Services'],            venue: 'Palais des Festivals, Cannes',       link: null },
  { title: 'Batimat — Construction',        dateRaw: 'Nov 2026',  categories: ['Building & Construction'],      venue: 'Paris Expo Porte de Versailles',     link: null },
  { title: 'EquipHotel Paris',              dateRaw: 'Nov 2026',  categories: ['Tourism & Hospitality'],        venue: 'Paris Expo Porte de Versailles',     link: null },
  { title: 'Milipol Paris — Security',      dateRaw: 'Nov 2026',  categories: ['Business Services'],            venue: 'Paris Nord Villepinte',              link: null },
  { title: 'Pollutec Lyon',                 dateRaw: 'Dec 2026',  categories: ['Power & Energy'],               venue: 'Eurexpo, Lyon',                      link: null },
]

export const franceData: CityPageData = {
  citySlug: 'France',
  metaTitle: 'Exhibition Stall Design Agency in France | Booth Design & Fabrication',
  metaDescription: 'Approach Media offers exhibition stall design, custom booth design, stand fabrication and installation support for trade fairs in France — Paris, Lyon, Cannes, Marseille, Nice and Bordeaux.',
  canonicalPath: '/exhibition-stall-design-agency-france',

  eyebrow: 'France · Europe · International',
  h1Line1: 'Exhibition Stall Design Agency in France —',
  h1Highlight: 'Custom Booths Built for French Trade Fairs',
  subtitle: 'Approach Media is a professional exhibition stall design agency helping brands exhibit at trade fairs across France. We provide custom booth design, 3D stand concepts, fabrication coordination, branding, installation and dismantling support for exhibitions in Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille.',
  trustPills: [
    'Custom booth design & 3D concepts',
    'Stand fabrication coordination',
    'Paris · Lyon · Cannes · Marseille',
    'Support for Indian & international exhibitors',
    'Turnkey exhibition management',
  ],

  introHeading: 'Exhibition Booth Fabrication and Installation Support Across France',
  introP1: 'France is one of Europe\'s most active trade fair destinations. Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille host major international exhibitions across fashion, food, agriculture, construction, interiors, technology, aerospace, pharma, cosmetics, defence, hospitality and lifestyle. Each year, thousands of brands from India and around the world participate in French trade shows to meet buyers, distributors and decision-makers from across Europe and globally.',
  introP2: 'Approach Media supports exhibitors with custom exhibition stall design, booth fabrication coordination, branding, graphics, furniture, lighting, AV, on-site installation support and dismantling. Whether you are exhibiting at a large international trade show, a product launch event, an industry expo or a corporate exhibition in France, our team helps you plan and execute a booth that communicates your brand clearly and attracts the right visitors.',

  standOutHeading: 'Build an Exhibition Stand That Works in the French Market',
  standOut: [
    { title: 'European-standard booth quality',     body: 'Booth design and fabrication that meets French venue guidelines, organiser specifications and European build standards for professional presentation.' },
    { title: 'Clear brand communication',           body: 'Layouts and graphics designed for visitors who are evaluating multiple exhibitors — your offer must be clear, professional and easy to understand within seconds.' },
    { title: 'Product display and demo zones',      body: 'Structured areas to present products, demonstrate solutions and explain technical details, planned for the visitor flow patterns of major French exhibitions.' },
    { title: 'Meeting and discussion areas',        body: 'Private or semi-private meeting spaces for conversations with buyers, distributors, partners and enterprise clients that are common at European trade shows.' },
    { title: 'Multi-language branding support',     body: 'Graphics, fascia and signage designed to communicate in English, French or both, supporting your team with European and international visitor audiences.' },
    { title: 'Remote management for international exhibitors', body: 'Designed for Indian and international companies participating in France — design approvals, scope finalisation and production can be coordinated remotely before on-site execution.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',          body: 'We design exhibition booths around your booth size, open sides, product category, target visitors, brand guidelines and exhibition goals. Each layout is planned for visibility, visitor flow, product display and business conversations.' },
    { num: '02', title: '3D Booth Design & Visualisation',         body: 'Before fabrication, we create a detailed 3D booth visual so your team can review the structure, branding, display areas, furniture, lighting and visitor movement before any production begins.' },
    { num: '03', title: 'Exhibition Stand Fabrication',            body: 'Custom-built booths, modular stands, shell scheme upgrades, product display walls, reception counters, meeting rooms, branded panels, backlit graphics and premium booth elements.' },
    { num: '04', title: 'Branding & Graphics Production',         body: 'Fascia branding, wall graphics, product panels, backdrops, directional signage and LED-ready artwork that make your offer clear and visually strong in a competitive exhibition hall.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',           body: 'One coordinated team from brief to dismantling — concept, 3D design, estimation, fabrication, branding, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Modular & Rental Booth Options',        body: 'Faster, budget-efficient modular and rental exhibition booths that maintain strong brand presentation while keeping execution practical for first-time or multi-show participation.' },
    { num: '07', title: 'International Exhibitor Support',        body: 'Full coordination support for Indian and international companies exhibiting in France — remote design approvals, scope management, local fabrication coordination, on-site setup support and dismantling.' },
  ],

  venueIntro: 'France hosts major exhibition venues across Paris, Lyon, Cannes, Marseille, Bordeaux and Lille. Each venue has its own build-up schedules, technical specifications, access rules, electrical provisions, rigging permissions, safety standards and dismantling timelines. Understanding these venue-specific requirements is essential for efficient booth execution.',
  venueIntro2: 'Approach Media plans exhibition booths with French venue requirements in mind so your stand is professionally executed, compliant with organiser guidelines and ready before show opening.',

  venues: [
    {
      name: 'Paris Expo Porte de Versailles',
      imageUrl: '/images/venues/paris-expo-porte-de-versailles.jpg',
      description: 'Paris Expo Porte de Versailles is the largest exhibition venue in France, hosting some of Europe\'s most important trade fairs including Batimat, EquipHotel, JEC World, VivaTech, Paris Air Show (Le Bourget) and more. It is a high-footfall, competitive exhibition environment where strong booth design and branding are essential.',
      bestFor: [
        'Construction, interiors and building materials (Batimat)',
        'Hospitality, hotel and catering industry (EquipHotel)',
        'Composites and advanced materials (JEC World)',
        'Technology, startups and innovation (VivaTech)',
        'Aerospace and defence (Paris Air Show / Le Bourget)',
        'Home defence and security (Milipol Paris)',
        'Fashion and apparel (Who\'s Next)',
      ],
      ctaLabel: 'Plan My Stand at Paris Expo Porte de Versailles',
    },
    {
      name: 'Paris Nord Villepinte',
      imageUrl: '/images/venues/paris-nord-villepinte.jpg',
      description: 'Paris Nord Villepinte is one of Europe\'s largest exhibition centres, hosting international trade fairs including SIAL Paris, Maison & Objet, Première Vision, Milipol and more. It draws international buyers, distributors and industry professionals from across Europe and globally.',
      bestFor: [
        'Food, beverage and food processing (SIAL Paris)',
        'Interior design, home decor and furniture (Maison & Objet)',
        'Textiles, fabrics and fashion sourcing (Première Vision)',
        'Homeland security and safety (Milipol)',
        'Consumer products and lifestyle exhibitions',
        'Large-scale B2B and international trade shows',
      ],
      ctaLabel: 'Plan My Stand at Paris Nord Villepinte',
    },
    {
      name: 'Eurexpo Lyon',
      imageUrl: '/images/venues/eurexpo-lyon.jpg',
      description: 'Eurexpo Lyon is one of France\'s most important regional exhibition venues, hosting Sirha Lyon, Pollutec, Global Industrie, Solutrans and more. Lyon\'s events attract strong European trade audiences in food service, industrial technology, environment and transport sectors.',
      bestFor: [
        'Food service, hospitality and catering (Sirha)',
        'Environment, energy and sustainability (Pollutec)',
        'Industrial technology and manufacturing (Global Industrie)',
        'Transport, logistics and commercial vehicles (Solutrans)',
        'Regional B2B and pan-European exhibitions',
      ],
      ctaLabel: 'Plan My Stand at Eurexpo Lyon',
    },
    {
      name: 'Palais des Festivals, Cannes',
      imageUrl: '/images/venues/palais-des-festivals-cannes.jpg',
      description: 'Cannes hosts some of Europe\'s most prestigious business events at the Palais des Festivals et des Congrès, including MIPIM (real estate), Cannes Lions (creative communications), MIPCOM (entertainment) and ILTM (luxury travel). These events bring together senior decision-makers and high-value buyers who expect polished, professional booth presentation.',
      bestFor: [
        'Real estate and property investment (MIPIM)',
        'Creative communications and advertising (Cannes Lions)',
        'Entertainment, television and content (MIPCOM)',
        'Luxury travel and tourism (ILTM)',
        'Premium brand showcases and invitation-led events',
      ],
      ctaLabel: 'Plan My Stand in Cannes',
    },
    {
      name: 'Parc Chanot, Marseille',
      imageUrl: '/images/venues/parc-chanot-marseille.jpg',
      description: 'Parc Chanot in Marseille is the main exhibition venue for the Foire Internationale de Marseille and other regional trade events. It serves the Mediterranean business corridor including France, Italy, Spain and North Africa, making it relevant for brands targeting southern European and regional markets.',
      bestFor: [
        'Consumer products, lifestyle and regional B2B',
        'Mediterranean and southern European trade events',
        'Food, agriculture and beverage industry',
        'Maritime, shipping and port-related industries',
        'Regional industrial and commercial exhibitions',
      ],
      ctaLabel: 'Plan My Stand at Parc Chanot, Marseille',
    },
    {
      name: 'Bordeaux & Lille Exhibition Venues',
      imageUrl: '/images/venues/bordeaux-lille-exhibition.jpg',
      description: 'Bordeaux Exhibition Centre hosts regional trade events including Vinexpo, Foire Internationale de Bordeaux and Exp\'Hotel Bordeaux, making it a key venue for wine, food service and hospitality sectors. Lille Grand Palais in northern France is important for retail, food, railway technology and regional business events, with strong connections to Belgium and the UK market.',
      bestFor: [
        'Wine, spirits and premium food and beverage (Bordeaux)',
        'Hospitality and catering industry (Bordeaux)',
        'Railway and transport technology (Lille — SIFER)',
        'Fashion sourcing and manufacturing (Lille)',
        'Northern European trade connections via Lille',
      ],
      ctaLabel: 'Plan My Stand in Bordeaux or Lille',
    },
  ],

  shows,

  industries: [
    { title: 'Food, Beverage & Food Technology',    body: 'Custom booths for food manufacturers, beverage brands, food processing equipment companies and agricultural exporters at shows like SIAL Paris, Sirha Lyon, Vinexpo and Foire de Bordeaux.' },
    { title: 'Fashion, Textiles & Luxury Goods',    body: 'Branded, refined booths for fashion labels, fabric houses, accessories companies and luxury brands exhibiting at Première Vision, Who\'s Next and French Riviera events.' },
    { title: 'Construction & Building Materials',   body: 'Strong, product-focused booths for construction companies, building material brands, architecture firms and interior product businesses exhibiting at Batimat and similar shows.' },
    { title: 'Industrial Machinery & Engineering',  body: 'Practical, product-display-focused booths for machinery manufacturers, engineering companies and industrial solution providers at Global Industrie and similar European industrial expos.' },
    { title: 'Technology & Digital Innovation',     body: 'Forward-looking booth designs for technology startups, SaaS companies, digital brands and enterprise software firms exhibiting at VivaTech and related events.' },
    { title: 'Pharma, Medical & Life Sciences',     body: 'Clean, professional booth layouts for pharmaceutical companies, medical device manufacturers, healthcare technology brands and life science businesses at European health and pharma shows.' },
    { title: 'Hospitality, Travel & F&B Equipment', body: 'Visitor-friendly, product-showcase booths for hotel brands, catering equipment companies, food service businesses and travel industry brands at EquipHotel and Sirha.' },
    { title: 'Real Estate & Investment',            body: 'Premium presentation booths for real estate developers, investment brands and urban planning companies at MIPIM Cannes and related European property events.' },
    { title: 'Aerospace, Defence & Security',       body: 'High-specification, professional exhibition stands for aerospace, defence technology and security solution providers at Paris Air Show, Eurosatory and Milipol Paris.' },
  ],

  whyUs: [
    { title: 'Experience with International Exhibitors', body: 'We have helped Indian and international companies exhibit at trade shows in Germany, Spain, Netherlands, Italy, UAE and France. We understand the challenges of exhibiting abroad and plan accordingly.' },
    { title: 'Brand-First Design Approach',              body: 'Every booth is designed around your exhibition objective, target audience, product range, European brand positioning and the visual standards expected at major French trade shows.' },
    { title: 'Remote Coordination for Overseas Teams',   body: 'Design approvals, 3D concepts, scope clarification and production planning can all be managed remotely, so your team does not need to be on-site until the exhibition itself.' },
    { title: 'Practical Booth Layouts',                  body: 'We design for real exhibition use — visitor flow, product access, meeting areas, branding visibility and staff functionality — not just for visual impact in renders.' },
    { title: 'Clear Scope & Transparent Budgeting',      body: 'We define what is included in the project before production: structure, materials, graphics, lighting, furniture, logistics, installation and dismantling where applicable.' },
    { title: 'Multi-Market Execution Capability',        body: 'We support exhibitors across India and 14+ countries. Our team coordinates across time zones, languages and venue-specific requirements to keep projects on track.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',           body: 'We collect your exhibition name, venue, booth size, floor plan, open sides, brand guidelines, product range, target audience, design references, budget and timeline.' },
    { step: '02', title: 'Space & Zone Planning',      body: 'We define the key zones within your booth: reception, product display, meeting areas, demo points, branding walls, storage and visitor movement corridors.' },
    { step: '03', title: '3D Booth Concept',           body: 'You receive a 3D visual showing the complete booth structure, counters, display areas, lighting, branding, graphics placement, furniture and visitor flow.' },
    { step: '04', title: 'Scope & Estimate',           body: 'Once the design direction is approved, we share a clear scope of work and cost estimate so your team understands exactly what is included in the project.' },
    { step: '05', title: 'Fabrication & Branding',     body: 'Booth elements and graphics are produced according to the approved design, material plan and project schedule, with progress updates shared remotely.' },
    { step: '06', title: 'Logistics & Installation',   body: 'The booth is shipped to the French exhibition venue and installed by the execution team. Final checks are completed before handover for show opening.' },
    { step: '07', title: 'Dismantling & Exit',         body: 'After the exhibition closes, we manage dismantling and removal as per the venue and organiser\'s instructions, completing the full turnkey service.' },
  ],

  faqs: [
    { q: 'What does an exhibition stall design agency in France do?', a: 'An exhibition stall design agency in France creates booth layouts, 3D booth designs, branding concepts, fabrication plans and installation support for companies participating in trade fairs, expos and business exhibitions across Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille.' },
    { q: 'Does Approach Media provide booth design in Paris?', a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events in Paris, including at Paris Expo Porte de Versailles, Paris Nord Villepinte and Le Bourget.' },
    { q: 'What is a standiste in France?', a: 'In France, "standiste" commonly refers to an exhibition stand designer, stand builder or booth contractor who designs and builds stands for trade fairs and business events. Approach Media functions as an international standiste supporting exhibitors at French trade shows.' },
    { q: 'Which cities in France are most important for exhibitions?', a: 'The major French exhibition cities are Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille. Paris hosts the most international events, while Lyon is significant for food, industry and environment sectors, and Cannes for luxury, real estate and media events.' },
    { q: 'Can Approach Media support international exhibitors in France?', a: 'Yes. Approach Media specifically supports Indian and international companies exhibiting in France. We coordinate remotely for design approvals, scope management and production planning, and provide on-site installation support at the French venue.' },
    { q: 'Do you create 3D booth designs before fabrication?', a: 'Yes. We create a detailed 3D booth concept before any production begins, so your team can review and approve the layout, branding, display areas, furniture, lighting and visitor flow in advance.' },
    { q: 'Which major trade fairs in France do you support?', a: 'We support exhibitors at events including Maison & Objet, SIAL Paris, VivaTech, Paris Air Show, JEC World, Batimat, EquipHotel, Milipol Paris, Sirha Lyon, Pollutec Lyon, Global Industrie, MIPIM Cannes, Cannes Lions, MIPCOM, Première Vision, Who\'s Next and many more French trade fairs.' },
    { q: 'What types of exhibition stands do you build for France events?', a: 'We design and build shell scheme upgrades, custom-built booths, modular stands, island stands, double-decker stands, product display booths, country pavilion elements and branded corporate experience zones for French and European trade shows.' },
    { q: 'How early should we start planning for a French trade fair?', a: 'For international exhibitions in France, we recommend beginning booth planning at least 60 to 90 days before the event. Larger stands, custom structures, first-time international participation or peak-season French shows may require more lead time.' },
    { q: 'What information does Approach Media need to begin the booth design?', a: 'We need your exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and your timeline.' },
  ],

  schemaName: 'Exhibition Stall Design Agency in France',
  schemaAreaServed: 'France',
}
