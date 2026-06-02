import type { CityPageData, ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = { title: string; link: string; dateRaw: string; startDate: string | null; city: string; categories: string[] }

// Delhi NCR shows are pulled live from the tradeshow dataset.
const shows: ExhibitionShow[] = (eventsData as CsvEvent[])
  .filter(e => /delhi|new delhi/i.test(e.city))
  .slice(0, 9)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

export const delhiData: CityPageData = {
  citySlug: 'delhi',
  metaTitle: 'Exhibition Stall Designer in Delhi | Stand Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Delhi and NCR trade shows.',
  canonicalPath: '/exhibition-stall-designer-delhi',

  eyebrow: 'Delhi · NCR · India',
  h1Line1: 'Exhibition Stall Designer in Delhi for Brands That Want',
  h1Highlight: 'Strong Trade Show Visibility',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors design and execute custom exhibition stalls for Delhi and NCR trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on visitors, meetings and lead generation.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Bharat Mandapam and Yashobhoomi support', 'India Expo Centre & Mart execution', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Delhi NCR Trade Shows',
  introP1: 'Delhi NCR is one of India\'s largest and most competitive exhibition markets. The region hosts national and international trade shows across Bharat Mandapam at Pragati Maidan, Yashobhoomi in Dwarka, India Expo Centre & Mart in Greater Noida and other major business venues. Exhibitors come here to meet buyers, distributors, government bodies, institutional decision-makers, architects, retailers, exporters, manufacturers and industry professionals.',
  introP2: 'Approach Media Pvt Ltd works with companies that need a dependable exhibition stall designer in Delhi for design, 3D visualization, fabrication, branding, logistics, installation and dismantling. Whether you need a compact booth, modular stand, shell scheme upgrade, product demo stall or large custom island booth, we plan the stall around your brand, booth size, budget, venue rules and exhibition objective.',

  standOutHeading: 'Build a Stall That Performs in a High-Competition Exhibition Market',
  standOut: [
    { title: 'Strong front-facing visibility',   body: 'Aisle-facing branding so your booth is noticed quickly in crowded, high-footfall Delhi halls.' },
    { title: 'Product display & live demo zones', body: 'Clear areas for product display and demonstration, planned for easy visitor access.' },
    { title: 'Meeting areas built in',           body: 'Spaces for buyers, dealers and institutional visitors to sit and discuss business.' },
    { title: 'Screens & enquiry desks',          body: 'Digital screens, presentation counters and enquiry desks placed for visibility and flow.' },
    { title: 'Storage & team working space',     body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lead capture points',              body: 'Visitor movement and enquiry points planned for better post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls around your booth size, open sides, product category, target visitors, brand guidelines and business objective — planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that make your offer easy to understand in a crowded hall.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Booths with suitable display counters, screens, sample zones, meeting spaces and visitor interaction points for product launches, food sampling, machinery, textiles, jewellery, interiors, mobility and technology demos.' },
  ],

  venueIntro: 'Delhi NCR has some of India\'s most important exhibition venues. Each venue has its own technical requirements, build-up schedules, access rules, electrical points, safety guidelines, material movement systems and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Bharat Mandapam, Pragati Maidan',
      imageUrl: '/images/venues/bharat-mandapam-delhi.jpg',
      description: 'Bharat Mandapam at Pragati Maidan is one of Delhi\'s most important exhibition and convention venues. It hosts major food, publishing, trade, consumer, jewellery, textile, rubber, environment, hardware and multi-sector exhibitions.',
      bestFor: [
        'Food and hospitality exhibitions',
        'Apparel and textile machinery shows',
        'Jewellery and gem exhibitions',
        'Trade fairs and consumer exhibitions',
        'Publishing, books and education events',
        'Hardware, tools and building product shows',
        'Environment, rubber and industrial exhibitions',
      ],
      ctaLabel: 'Plan My Stall at Bharat Mandapam',
    },
    {
      name: 'Yashobhoomi, Dwarka',
      imageUrl: '/images/venues/yashobhoomi-delhi.jpg',
      description: 'Yashobhoomi, also known as India International Convention & Expo Centre, is a modern exhibition and convention venue in Dwarka. It is well suited for large-format B2B exhibitions, mobility shows, garment fairs, telecom, industrial events and international conventions.',
      bestFor: [
        'Mobility and automotive exhibitions',
        'Garment and apparel trade shows',
        'Telecom and technology exhibitions',
        'Industrial and institutional events',
        'Large conference-linked expos',
        'Outdoor and heavy product displays',
      ],
      ctaLabel: 'Plan My Stall at Yashobhoomi',
    },
    {
      name: 'India Expo Centre & Mart, Greater Noida',
      imageUrl: '/images/venues/india-expo-centre-greater-noida.jpg',
      description: 'India Expo Centre & Mart is a major NCR venue for export-oriented and large-scale trade shows. It is especially relevant for handicrafts, home, lifestyle, furniture, garments, food, packaging, mobility, printing and industrial exhibitions.',
      bestFor: [
        'Home, lifestyle and handicrafts fairs',
        'Furniture and decor exhibitions',
        'Apparel and fashion accessories',
        'Food and beverage trade shows',
        'Mobility components and industrial expos',
        'Print, packaging and machinery events',
        'Export-focused buyer-seller exhibitions',
      ],
      ctaLabel: 'Plan My Stall at India Expo Centre',
    },
  ],

  shows,

  industries: [
    { title: 'Food Processing & Hospitality',          body: 'Practical booths with product display, sampling counters, storage and high visitor engagement for food brands, kitchen equipment, hotel suppliers, beverage companies and HoReCa businesses.' },
    { title: 'Apparel, Garments & Textiles',           body: 'Stalls for garment exporters, fabric brands, textile machinery companies, fashion accessories and sourcing-led exhibitions with collection displays and buyer meeting areas.' },
    { title: 'Handicrafts, Home & Lifestyle',          body: 'Display-led booths that help product collections feel organized, attractive and easy to evaluate for domestic and international buyers.' },
    { title: 'IT, Technology & Telecom',               body: 'Demo-friendly booths with screens, presentation counters, consultation areas and clear solution messaging for technology, telecom, AI, IoT, software and digital services.' },
    { title: 'Engineering & Manufacturing',            body: 'Durable booths for technical displays, product demos and B2B meetings supporting manufacturing, tools, machinery, hardware and engineering exhibitions.' },
    { title: 'Automotive & Mobility',                  body: 'Stalls that support vehicle or component display, product explanation, digital presentations and dealer conversations for mobility, EV and automotive events.' },
    { title: 'Interiors, Architecture & Building',     body: 'Refined booth layouts for furniture, surfaces, hardware, lighting, sanitaryware, doors, windows and building product brands for architects, designers and project buyers.' },
    { title: 'Jewellery & Gems',                       body: 'Premium, secure and well-lit stalls with display counters, showcases, consultation areas and brand communication suited for serious buyers.' },
    { title: 'Real Estate & Infrastructure',           body: 'Spaces for project models, digital walkthroughs, investment discussions and buyer enquiries that help visitors understand project value clearly.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',   body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines so the stall supports your business goal.' },
    { title: 'Practical 3D Design',    body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',  body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',   body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',  body: 'Delhi venues have specific build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Visitor-Focused Layouts',body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define key booth zones such as reception, display, demo area, meeting space, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The booth is transported to the Delhi NCR venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Delhi?', a: 'The best exhibition stall designer for your Delhi project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Delhi NCR trade shows.' },
    { q: 'Do you provide exhibition stall design for Bharat Mandapam, Pragati Maidan?', a: 'Yes. We support exhibition stall planning and execution for events at Bharat Mandapam, Pragati Maidan, including custom booths, modular stalls, product display stands and larger exhibition structures.' },
    { q: 'Do you work at Yashobhoomi, Dwarka?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows at Yashobhoomi, Dwarka.' },
    { q: 'Do you provide stall services for India Expo Centre & Mart, Greater Noida?', a: 'Yes. We support exhibitors at India Expo Centre & Mart for home, lifestyle, handicrafts, garments, furniture, food, packaging, mobility and industrial trade shows.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Delhi?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Delhi exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, special structures, product demos, technology integrations or peak-season events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Do you work with exhibitors from outside Delhi or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Delhi NCR exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Designer in Delhi',
  schemaAreaServed: 'Delhi',
}
