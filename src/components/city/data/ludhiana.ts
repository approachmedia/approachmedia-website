import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

const shows = buildCityShows(/ludhiana/i)

export const ludhianaData: CityPageData = {
  citySlug: 'ludhiana',
  metaTitle: 'Exhibition Stall Design in Ludhiana | Stall Fabrication & 3D Booth Design',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D booth design, fabrication, branding, installation and turnkey exhibition services for Ludhiana trade shows including MachAuto Expo, India Agri Expo and PDFA Dairy Expo.',
  canonicalPath: '/exhibition-stall-design-ludhiana',

  eyebrow: 'Ludhiana Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Ludhiana for',
  h1Highlight: 'Industrial, Agriculture and Dairy Trade Shows',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Ludhiana trade shows. From 3D stall design and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow for machinery, automation, agriculture, dairy, interiors, rice milling and trade fair exhibitors.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Ludhiana Exhibition Centre execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Ludhiana Trade Shows',
  introP1: 'Ludhiana is one of North India\'s strongest industrial and agricultural business hubs. The city is known for machine tools, auto components, automation, bicycles, industrial manufacturing, agriculture machinery, dairy farming, rice and grain processing, building materials and trade fairs. Exhibitions in Ludhiana attract manufacturers, dealers, distributors, farmers, mill owners, architects, contractors, procurement teams and business buyers from Punjab, Haryana, Himachal Pradesh, Jammu, Rajasthan and nearby markets.',
  introP2: 'Approach Media Pvt Ltd supports companies that need exhibition stall design in Ludhiana for B2B and public trade shows. Whether you are participating in MachAuto Expo, India Agri Progress Expo, INTEXT Expo, Rice Grain Pro-Tech Expo, PDFA International Dairy & Agri Expo or another regional business event, we help plan and execute stalls that are practical, visible and built around lead generation.',

  standOutHeading: 'Build a Stall That Works for Industrial, Agri and B2B Exhibitions',
  standOut: [
    { title: 'Machinery display planning',        body: 'Safe, visible display zones for machines, tools and equipment with clear technical panels and buyer meeting counters.' },
    { title: 'Strong fascia visibility',           body: 'Long-aisle branding that stands out to manufacturers, dealers, distributors and farmer visitors.' },
    { title: 'Demo-friendly layouts',             body: 'Areas for live demonstrations of automation, agri equipment, dairy technology and processing solutions.' },
    { title: 'Meeting counters built in',          body: 'Dedicated spaces for dealer, distributor and institutional buyer conversations.' },
    { title: 'Storage & team working space',       body: 'Practical back-of-stall areas for tools, samples, brochures and exhibition team needs.' },
    { title: 'Lead capture points',               body: 'Visitor movement planned for stronger enquiry capture and post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',       body: 'We design exhibition stalls based on your booth size, open sides, product category, visitor profile, brand guidelines and exhibition objective — planned for visibility, product explanation and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization',      body: 'Before production begins, we create a 3D stall design so your team can review the booth structure, branding, display zones, demo areas, furniture, lighting and visitor flow before fabrication starts.' },
    { num: '03', title: 'Exhibition Stall Fabrication',         body: 'Custom stalls, modular booths, shell scheme upgrades, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing and stable construction.' },
    { num: '04', title: 'Branding & Graphics Production',       body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork for industrial, agri and trade fair environments.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',         body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Machinery & Product Display Booths',   body: 'Booths planned around equipment size, visitor movement, safe display, demo zones, product explanation and buyer meetings for industrial, agri and dairy exhibitions.' },
    { num: '07', title: 'Modular & Rental Booth Options',       body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
  ],

  venueIntro: 'Ludhiana and Punjab have distinct exhibition venues for different trade show formats. Stall planning must consider floor plans, machinery access, utility points, build-up schedules, open-ground conditions and organizer timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Ludhiana Exhibition Centre, Sahnewal',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/ludhiana-exhibition-centre.jpg',
      description: 'Ludhiana Exhibition Centre on G.T. Road, Sahnewal is the key venue for major industrial, agriculture, architecture and processing technology exhibitions in Ludhiana — including MachAuto Expo, India Agri Progress Expo, INTEXT Expo and Rice Grain Pro-Tech Expo.',
      bestFor: [
        'Machine tools and automation exhibitions',
        'Automotive technology and component expos',
        'Agriculture and farming machinery events',
        'Dairy technology and livestock trade shows',
        'Architecture, interiors and building material exhibitions',
        'Rice, wheat and pulses milling machinery expos',
        'Industrial manufacturing and engineering trade fairs',
      ],
      ctaLabel: 'Plan My Stall at Ludhiana Exhibition Centre',
    },
    {
      name: 'Cattle Fair Ground, Jagraon',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/cattle-fair-ground-jagraon.jpg',
      description: 'Cattle Fair Ground in Jagraon is closely linked with dairy and agriculture exhibitions, including PDFA International Dairy & Agri Expo. This venue needs practical stall planning for farmers, dairy professionals, equipment suppliers, feed companies and agri-business visitors.',
      bestFor: [
        'Dairy farming exhibitions',
        'Agriculture machinery expos',
        'Livestock and cattle-related events',
        'Feed, nutrition and veterinary product displays',
        'Milking equipment and farm technology booths',
      ],
      ctaLabel: 'Plan My Stall at PDFA Dairy Expo',
    },
    {
      name: 'Ranjit Avenue Grounds, Amritsar',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/ranjit-avenue-amritsar.jpg',
      description: 'Ranjit Avenue Grounds in Amritsar is associated with PITEX — Punjab International Trade Expo. Many Punjab-based businesses use PITEX as a regional trade and consumer fair platform. Approach Media Pvt Ltd can support exhibitors planning stalls for PITEX and similar Punjab trade fairs.',
      bestFor: [
        'International trade fair stalls',
        'Consumer product displays',
        'Lifestyle, home and retail brands',
        'Regional business promotion',
        'Multi-sector trade fair booths',
      ],
      ctaLabel: 'Discuss My PITEX Stall',
    },
  ],

  shows,

  industries: [
    { title: 'Machine Tools & Industrial Manufacturing', body: 'Ludhiana is deeply connected with industrial manufacturing, machine tools, engineering products and factory equipment. We design durable, product-led stalls that support machinery display, technical communication, live demos and buyer meetings.' },
    { title: 'Automation & Automotive Technology',       body: 'For automation, automotive technology and auto component exhibitors, booths need to explain capability quickly. We plan demo zones, component displays, digital screens and meeting spaces for OEMs, dealers and industrial buyers.' },
    { title: 'Agriculture & Farm Machinery',             body: 'Agriculture exhibitions in Ludhiana attract farmers, dealers, distributors and agri-business visitors. We create approachable stalls for tractors, implements, irrigation, farm equipment, seeds, fertilizers, agri-tech and allied brands.' },
    { title: 'Dairy Farming & Livestock Technology',     body: 'Dairy exhibitions need practical layouts that support equipment display, feed and nutrition product communication, veterinary products and farmer discussions. We plan booths for dairy technology, milking systems, cattle care and livestock solutions.' },
    { title: 'Architecture, Interiors & Building Materials', body: 'For INTEXT-style exhibitions, the stall must show product finish and design value clearly. We create display-led booths for interiors, furniture, lighting, surfaces, decor, doors, windows, hardware and building products.' },
    { title: 'Rice, Grain & Food Processing',            body: 'For rice, wheat, pulses and grain processing exhibitors, booths need to present machinery, process flow and technical advantages clearly. We design stalls for mill machinery, processing equipment, packaging systems and sorting machines.' },
    { title: 'Consumer & Trade Fair Brands',             body: 'For PITEX and regional trade fairs, we create stalls for retail, lifestyle, home, FMCG, consumer goods and regional business promotion with strong branding and public-friendly layouts.' },
  ],

  whyUs: [
    { title: 'Industrial & Agri-Focused Planning', body: 'Ludhiana exhibitions are often product-heavy and technical. The stall must support machinery display, product demos, farmer or buyer conversations and lead capture.' },
    { title: 'Practical 3D Design',               body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, equipment placement, display areas, demo points, meeting counters, storage and visitor interaction.' },
    { title: 'Complete Coordination',             body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, keeping communication clearer and reducing last-minute confusion.' },
    { title: 'Clear Scope & Budget',              body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',             body: 'Ludhiana and Punjab exhibition venues require practical planning for temporary structures, electricity, lighting, goods movement, open-ground conditions and organizer timelines.' },
    { title: 'Lead-Focused Layouts',              body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, demo zones, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Ludhiana or Punjab venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which are the major exhibition venues in Ludhiana?', a: 'The key Ludhiana venue for industrial, agriculture and architecture exhibitions is Ludhiana Exhibition Centre on G.T. Road, Sahnewal. Cattle Fair Ground in Jagraon is important for dairy and agriculture exhibitions such as PDFA International Dairy & Agri Expo.' },
    { q: 'Do you provide stall design for MachAuto Expo Ludhiana?', a: 'Yes. Approach Media Pvt Ltd can support MachAuto Expo exhibitors with 3D stall design, fabrication, branding, machinery display planning, installation and dismantling.' },
    { q: 'Can you design stalls for India Agri Progress Expo or India Agri Expo?', a: 'Yes. We can create practical and approachable stalls for agriculture machinery, dairy technology, agri inputs, irrigation, farm equipment, agri-tech and dealer-focused businesses.' },
    { q: 'Do you support INTEXT Expo exhibitors?', a: 'Yes. We can design display-led stalls for building materials, interiors, exterior products, furniture, decor, lighting, surfaces, hardware and architecture-related brands.' },
    { q: 'Can you design booths for Rice Grain Pro-Tech Expo?', a: 'Yes. We can plan product-led booths for rice, wheat and pulses milling machinery, processing systems, sorting technology, packaging machinery and grain storage solution providers.' },
    { q: 'Do you provide stall design for PDFA Dairy Expo in Jagraon?', a: 'Yes. We can support dairy and agriculture exhibitors at Cattle Fair Ground, Jagraon with durable, demo-friendly and farmer-focused exhibition stall designs.' },
    { q: 'What is the cost of an exhibition stall in Ludhiana?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, product display needs, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning for a Ludhiana exhibition stall?', a: 'For a custom stall, planning should ideally begin at least 30 to 60 days before the exhibition. Larger machinery displays, premium structures or special demo requirements may need more time.' },
    { q: 'Do you offer turnkey exhibition stall services in Ludhiana?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Design in Ludhiana',
  schemaAreaServed: 'Ludhiana',
}
