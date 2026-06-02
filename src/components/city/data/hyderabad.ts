import type { CityPageData, ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = { title: string; link: string; dateRaw: string; startDate: string | null; city: string; categories: string[] }

const shows: ExhibitionShow[] = (eventsData as CsvEvent[])
  .filter(e => /hyderabad/i.test(e.city))
  .slice(0, 9)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

export const hyderabadData: CityPageData = {
  citySlug: 'hyderabad',
  metaTitle: 'Exhibition Stall Design in Hyderabad | Stall Fabrication & 3D Booth Design',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Hyderabad trade shows.',
  canonicalPath: '/exhibition-stall-design-hyderabad',

  eyebrow: 'Hyderabad Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Hyderabad for',
  h1Highlight: 'Brands That Want Strong Show-Floor Impact',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Hyderabad trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on visitors, meetings, demos and lead generation.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'HITEX and HICC execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Hyderabad Trade Shows',
  introP1: 'Hyderabad is one of South India\'s most active exhibition destinations, supported by strong growth in pharmaceuticals, healthcare, IT, biotech, engineering, plastics, real estate, FMCG, packaging, interiors and consumer trade events. The city hosts major exhibitions at HITEX Exhibition Centre, Hyderabad International Convention Centre (HICC), Nampally Exhibition Grounds and other business venues across Hyderabad.',
  introP2: 'Approach Media Pvt Ltd works with companies that need a dependable partner for exhibition stall design in Hyderabad. We support design, 3D visualization, fabrication, branding, logistics, installation and dismantling for compact booths, shell scheme upgrades, modular stalls, product display stands and large custom island booths.',

  standOutHeading: 'Build a Stall That Works for Technical, Healthcare and B2B Exhibitions',
  standOut: [
    { title: 'Strong front-facing brand visibility',  body: 'Aisle-facing branding that stands out to doctors, engineers, distributors, procurement teams and institutional buyers.' },
    { title: 'Product display & demo zones',          body: 'Clearly planned areas for live product demonstration, sample display and technical explanation.' },
    { title: 'Meeting areas built in',                body: 'Dedicated spaces for buyers, dealers and institutional visitors to sit and discuss business.' },
    { title: 'Digital screens & counters',            body: 'Presentation counters, LED screens and enquiry desks that support product explanation and lead capture.' },
    { title: 'Storage & team working space',          body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lead capture points',                   body: 'Visitor movement planned for stronger enquiry capture and post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls based on your booth size, open sides, product category, visitor profile, brand guidelines and exhibition objective. Each layout is planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication starts.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing and stable construction.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that convert your brand message into exhibition-ready communication.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Booths planned with suitable counters, displays, screen placement, meeting areas and visitor interaction points for medical equipment, pharma, machinery, plastics, packaging, interiors, smart home solutions and technology demos.' },
  ],

  venueIntro: 'Hyderabad has multiple exhibition venues, each with different technical and logistics requirements. Stall planning must consider floor plans, hall access, utility points, build-up schedules, material movement, electrical requirements, safety rules, height permissions and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'HITEX Exhibition Centre, Madhapur',
      imageUrl: '/images/venues/hitex-hyderabad.jpg',
      description: 'HITEX Exhibition Centre is one of Hyderabad\'s most active venues for national trade fairs, industry expos and large B2B exhibitions. Its location near Hi-Tech City and Madhapur makes it especially relevant for professional, technology and industrial audiences.',
      bestFor: [
        'Healthcare and medical equipment exhibitions',
        'Pharma and life sciences events',
        'Machine tools, robotics and automation expos',
        'Plastics, petrochemicals and engineering exhibitions',
        'Paper, print and packaging trade shows',
        'Jewellery, pearl and gem exhibitions',
        'Real estate, interiors and smart home expos',
        'Agriculture and food processing events',
      ],
      ctaLabel: 'Plan My Stall at HITEX',
    },
    {
      name: 'Hyderabad International Convention Centre (HICC)',
      imageUrl: '/images/venues/hicc-hyderabad.jpg',
      description: 'HICC in the Novotel complex is a strong venue for conventions, conference-linked exhibitions, corporate events and premium B2B gatherings. It is suitable for professional booths, product showcases, healthcare conferences, technology events and institutional buyer meetings.',
      bestFor: [
        'Corporate and conference-linked exhibitions',
        'Pharma, healthcare and medical events',
        'IT, technology and innovation summits',
        'Education, professional and institutional events',
        'Premium business showcases',
      ],
      ctaLabel: 'Plan My Stall at HICC',
    },
    {
      name: 'Nampally Exhibition Grounds',
      imageUrl: '/images/venues/nampally-hyderabad.jpg',
      description: 'Nampally Exhibition Grounds is well known for large consumer and industrial exhibitions, including public-facing events with high footfall. Stall design here should consider crowd movement, visibility, durability and practical product display.',
      bestFor: [
        'Consumer goods exhibitions',
        'Industrial and retail trade events',
        'FMCG and product sampling stalls',
        'Lifestyle and homeware displays',
        'Public-facing brand activations',
      ],
      ctaLabel: 'Plan My Stall at Nampally Exhibition Grounds',
    },
  ],

  shows,

  industries: [
    { title: 'Pharmaceuticals, Biotech & Healthcare', body: 'Hyderabad is a major pharma, biotech and life sciences hub. We design clean, professional and information-rich stalls for pharmaceutical companies, medical device brands, diagnostics, healthcare suppliers and biotech businesses.' },
    { title: 'IT, Technology & Innovation',           body: 'Hyderabad\'s IT ecosystem includes global technology companies, startups, SaaS platforms and innovation-led businesses. We plan demo-friendly stalls with screens, presentation counters, consultation spaces and clear solution messaging.' },
    { title: 'Manufacturing, Machine Tools & Engineering', body: 'For industrial and engineering exhibitions, stalls need to communicate technical capability clearly. We create durable layouts for machinery, automation, robotics, components, industrial tools and buyer discussions.' },
    { title: 'Plastics, Petrochemicals & Materials',  body: 'Plastic and materials exhibitions require organized product display and technical communication. We plan booths with sample areas, specification panels, discussion counters and structured visitor movement.' },
    { title: 'Real Estate, Infrastructure & Smart Homes', body: 'Hyderabad\'s real estate and infrastructure market creates strong exhibition opportunities. We design stalls for developers, builders, smart home brands and infrastructure companies with model displays, digital screens and meeting areas.' },
    { title: 'FMCG, Retail & Consumer Goods',         body: 'For FMCG and retail exhibitions, the stall must handle high footfall and support product interaction. We plan sampling counters, display shelves, storage, branding walls and movement-friendly layouts.' },
    { title: 'Paper, Print & Packaging',              body: 'For paper, printing and packaging exhibitors, booths need to display machinery, samples, materials and technical benefits clearly. We create practical layouts that help visitors compare product ranges quickly.' },
    { title: 'Interior Design, Architecture & Decor', body: 'Hyderabad\'s interior and architecture events attract designers, architects, builders and premium buyers. We design refined display-led booths for furniture, surfaces, lighting, decor, flooring and building product brands.' },
    { title: 'Jewellery, Pearls & Gems',              body: 'For jewellery, pearl and gem exhibitions, the stall needs premium finishing, secure display planning and focused lighting. We plan showcases, counters, consultation zones and brand-led communication.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',    body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines to design a stall that supports your business goal.' },
    { title: 'Practical 3D Design',     body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',   body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',    body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',   body: 'Hyderabad venues have specific build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Demo-Friendly Layouts',   body: 'Many Hyderabad exhibitions involve technical demos, product explanation and healthcare or industrial displays. We plan booths that support screen visibility, equipment placement and lead capture.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Hyderabad venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Hyderabad?', a: 'The best exhibition stall designer for your Hyderabad project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Hyderabad trade shows.' },
    { q: 'Do you provide exhibition stall design for HITEX Hyderabad?', a: 'Yes. We support exhibition stall planning and execution for events at HITEX Exhibition Centre, including custom booths, modular stalls, product display stands and larger exhibition structures.' },
    { q: 'Do you work at Hyderabad International Convention Centre (HICC)?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows, conventions and business events at HICC.' },
    { q: 'Do you provide stall services for Nampally Exhibition Grounds?', a: 'Yes. We support exhibition stall planning and execution for consumer, industrial and public-facing events at Nampally Exhibition Grounds.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Hyderabad?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Hyderabad exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, special structures, product demos, technology integrations or peak-season events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle pharma and medical exhibition stalls?', a: 'Yes. We can plan clean, professional and information-led booths for pharma, healthcare, diagnostics, medical devices and biotech exhibitors.' },
    { q: 'Do you work with exhibitors from outside Hyderabad or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Hyderabad exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Design in Hyderabad',
  schemaAreaServed: 'Hyderabad',
}
