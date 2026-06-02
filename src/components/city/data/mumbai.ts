import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

// Mumbai shows are pulled live from the tradeshow dataset.
const shows = buildCityShows(/mumbai|navi mumbai|bombay/i)

export const mumbaiData: CityPageData = {
  citySlug: 'mumbai',
  metaTitle: 'Exhibition Stall Designer in Mumbai | Stand Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Mumbai trade shows.',
  canonicalPath: '/exhibition-stall-designer-mumbai',

  eyebrow: 'Mumbai · Maharashtra · India',
  h1Line1: 'Exhibition Stall Designer in Mumbai for',
  h1Highlight: 'High-Impact Trade Show Presence',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors design and execute custom exhibition stalls for Mumbai trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your brand is ready to engage visitors from day one.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'BEC, JWCC and BKC venue support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Mumbai Trade Shows',
  introP1: 'Mumbai is one of India\'s busiest exhibition and business destinations. The city hosts major trade shows across Bombay Exhibition Centre in Goregaon, Jio World Convention Centre in BKC, MMRDA Grounds, World Trade Centre Mumbai, Nehru Centre, CIDCO Exhibition Centre and hotel-based event venues. Exhibitors come to Mumbai to meet buyers, distributors, investors, architects, retailers, exporters, manufacturers and industry decision-makers.',
  introP2: 'Approach Media Pvt Ltd works with companies that need a dependable exhibition stall designer in Mumbai for design, 3D visualization, fabrication, branding, logistics, installation and dismantling. Whether you need a compact booth, modular stall, shell scheme upgrade, product demo stand or large custom island booth, we plan the stall around your brand, booth size, budget, venue rules and exhibition objective.',

  standOutHeading: 'Build a Stall That Performs in India\'s Commercial Capital',
  standOut: [
    { title: 'Strong front-facing visibility',   body: 'Aisle-facing branding that stands out to trade buyers, premium consumers and corporate decision-makers.' },
    { title: 'Product display & demo zones',     body: 'Clear areas for product display and demonstration, planned for easy visitor access.' },
    { title: 'Meeting areas built in',           body: 'Spaces for buyers, dealers and institutional visitors to sit and discuss business.' },
    { title: 'Secure high-value display',        body: 'Secure, well-lit display planning for jewellery, luxury and high-value products.' },
    { title: 'Storage & team working space',     body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lead capture points',              body: 'Visitor movement and enquiry points planned for stronger post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls around your booth size, open sides, product category, target visitors, brand guidelines and business objective — planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that make your offer easy to understand in a crowded hall.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Booths with suitable counters, display systems, screen placement, meeting spaces and visitor interaction points for jewellery showcases, pharma displays, chemicals, engineering products, textiles, interiors, FMCG sampling, financial services and technology demos.' },
  ],

  venueIntro: 'Mumbai has a wide mix of exhibition venues, from large indoor halls and premium convention centres to open grounds and hotel-based event spaces. Each venue has its own technical requirements, build-up schedules, access rules, electrical points, safety guidelines, material movement systems and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Bombay Exhibition Centre, Goregaon',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/bec-mumbai.jpg',
      description: 'Bombay Exhibition Centre, also known as BEC or NESCO, is one of Mumbai\'s most active venues for large B2B exhibitions. It is commonly used for jewellery, chemicals, coatings, engineering, construction, design, media, pharma, packaging and industrial trade shows.',
      bestFor: [
        'Gems and jewellery exhibitions',
        'Chemicals, coatings and specialty materials',
        'Engineering and manufacturing trade shows',
        'Architecture, interiors and construction expos',
        'Pharma and healthcare events',
        'Packaging, printing and media exhibitions',
        'Large B2B trade fairs',
      ],
      ctaLabel: 'Plan My Stall at Bombay Exhibition Centre',
    },
    {
      name: 'Jio World Convention Centre, BKC',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/jwcc-mumbai.jpg',
      description: 'Jio World Convention Centre in Bandra Kurla Complex is a premium exhibition and convention venue for corporate events, jewellery shows, luxury showcases, conferences, real estate events and business exhibitions.',
      bestFor: [
        'Premium jewellery and luxury exhibitions',
        'Corporate and financial services events',
        'Real estate and investment conferences',
        'Product launches and brand showcases',
        'High-end B2B and invitation-led exhibitions',
      ],
      ctaLabel: 'Plan My Stall at Jio World Convention Centre',
    },
    {
      name: 'MMRDA Grounds, BKC',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/mmrda-grounds-mumbai.jpg',
      description: 'MMRDA Grounds in BKC is suitable for large-format exhibitions, outdoor activations, auto showcases, consumer events and temporary pavilion-based setups. Stall execution here needs planning for open-ground layout, temporary structures, public footfall and weather-aware logistics.',
      bestFor: [
        'Auto and mobility showcases',
        'Large consumer exhibitions',
        'Outdoor brand activations',
        'Temporary pavilions and large installations',
        'Public-facing events and trade fairs',
      ],
      ctaLabel: 'Plan My Stall at MMRDA Grounds',
    },
    {
      name: 'World Trade Centre Mumbai',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/wtc-mumbai.jpg',
      description: 'World Trade Centre in Cuffe Parade is a business-focused venue for B2B trade shows, product launches, conferences and professional networking events. It is suitable for compact, premium and decision-maker-focused exhibition stalls.',
      bestFor: [
        'B2B product launches',
        'Export and trade events',
        'Finance and professional services',
        'Business conferences',
        'Industry networking exhibitions',
      ],
      ctaLabel: 'Plan My Stall at WTC Mumbai',
    },
    {
      name: 'Nehru Centre, Worli',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/nehru-centre-mumbai.jpg',
      description: 'Nehru Centre is used for art, design, lifestyle, specialty exhibitions, curated events and knowledge-led gatherings. Stall design here should feel polished, compact and well-organized.',
      bestFor: [
        'Design and lifestyle exhibitions',
        'Art and cultural events',
        'Specialty product showcases',
        'Education and knowledge-led events',
        'Boutique consumer exhibitions',
      ],
      ctaLabel: 'Plan My Stall at Nehru Centre',
    },
    {
      name: 'CIDCO Exhibition Centre & Navi Mumbai',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/cidco-navi-mumbai.jpg',
      description: 'CIDCO Exhibition Centre and Navi Mumbai event venues are useful for regional trade shows, industrial events, consumer exhibitions, real estate expos and business gatherings serving Navi Mumbai, Thane and nearby industrial belts.',
      bestFor: [
        'Industrial and manufacturing exhibitions',
        'Real estate and infrastructure expos',
        'Consumer and retail shows',
        'Regional business events',
        'Product launches and dealer meets',
      ],
      ctaLabel: 'Plan My Stall in Navi Mumbai',
    },
  ],

  shows,

  industries: [
    { title: 'Gems & Jewellery',                    body: 'Premium, secure and well-lit stalls for jewellery manufacturers, exporters, designers and retail brands at major shows across BEC and JWCC.' },
    { title: 'Pharmaceuticals & Healthcare',        body: 'Clean, professional booths for pharma companies, medical device brands, healthcare suppliers, diagnostics and life sciences businesses.' },
    { title: 'Textiles, Apparel & Fashion',         body: 'Sample-friendly stalls for fabric houses, apparel brands, accessories companies, exporters and lifestyle labels.' },
    { title: 'Engineering & Manufacturing',         body: 'Practical booths for machinery, tools, components, automation and industrial products across the Mumbai, Thane and Navi Mumbai belt.' },
    { title: 'Chemicals, Coatings & Plastics',      body: 'Organized layouts with product panels, sample displays, technical counters and meeting zones that present technical products clearly.' },
    { title: 'Real Estate & Infrastructure',        body: 'Stalls for developers, infrastructure brands and investment-led projects with model displays, digital screens and private discussion areas.' },
    { title: 'FMCG & Consumer Goods',               body: 'Display counters, storage, high-impact branding and movement-friendly layouts that support product visibility, sampling and visitor engagement.' },
    { title: 'Financial Services & Fintech',        body: 'Professional booths for banks, NBFCs, fintech platforms, insurance companies and technology-led financial services that communicate trust and authority.' },
    { title: 'Architecture, Interiors & Building',  body: 'Refined display-led booths for furniture, surfaces, hardware, lighting, doors, windows, sanitaryware and interior brands.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',   body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines so the stall supports your business goal.' },
    { title: 'Practical 3D Design',    body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',  body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',   body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',  body: 'Mumbai venues have specific build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Visitor-Focused Layouts',body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define key booth zones such as reception, display, demo area, meeting space, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The booth is transported to the Mumbai venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Mumbai?', a: 'The best exhibition stall designer for your Mumbai project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Mumbai trade shows.' },
    { q: 'Do you provide exhibition stall design for Bombay Exhibition Centre, Goregaon?', a: 'Yes. We support exhibition stall planning and execution for events at Bombay Exhibition Centre, Goregaon, including custom booths, modular stalls, product display stands and larger exhibition structures.' },
    { q: 'Do you work at Jio World Convention Centre, BKC?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for events at Jio World Convention Centre in BKC.' },
    { q: 'Do you provide stall services for MMRDA Grounds and WTC Mumbai?', a: 'Yes. We support exhibition stall planning and execution for MMRDA Grounds in BKC, World Trade Centre Mumbai, Nehru Centre, CIDCO Exhibition Centre and hotel-based events across Mumbai.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Mumbai?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Mumbai exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, special structures, premium jewellery showcases, product demos or peak-season events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can I get an exhibition stall on rent in Mumbai?', a: 'Yes. We can plan modular and rental-style exhibition stalls for faster turnaround, budget-conscious projects or multi-show participation while maintaining a professional brand presence.' },
    { q: 'Do you work with exhibitors from outside Mumbai or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Mumbai exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Designer in Mumbai',
  schemaAreaServed: 'Mumbai',
}
