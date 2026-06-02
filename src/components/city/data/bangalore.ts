import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

// Bangalore shows are pulled live from the tradeshow dataset.
const shows = buildCityShows(/bangalore|bengaluru/i)

export const bangaloreData: CityPageData = {
  citySlug: 'bangalore',
  metaTitle: 'Exhibition Stall Designer in Bangalore | Stand Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Bangalore trade shows.',
  canonicalPath: '/exhibition-stall-designer-bangalore',

  eyebrow: 'Bangalore · Karnataka · India',
  h1Line1: 'Exhibition Stall Designer in Bangalore for Brands That Want a',
  h1Highlight: 'Strong Show-Floor Presence',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors design and execute custom exhibition stalls for Bangalore trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on visitors, demos, meetings and lead generation.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'BIEC, KTPO and Palace Grounds support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Bangalore Trade Shows',
  introP1: 'Bangalore is one of India\'s most important exhibition markets, driven by technology, aerospace, machine tools, engineering, architecture, interiors, electronics, education, FMCG and startup-led business events. The city hosts major B2B trade shows at Bangalore International Exhibition Centre (BIEC), KTPO Trade Centre, Bangalore Palace Grounds and other event venues across Bengaluru.',
  introP2: 'Approach Media Pvt Ltd works with brands that need a dependable exhibition stall designer in Bangalore for design, 3D visualization, fabrication, branding, logistics, installation and dismantling. Whether you are planning a compact booth, modular stand, shell scheme upgrade, demo-led stall or large custom island booth, we shape the stall around your brand, booth size, budget, venue rules and exhibition objective.',

  standOutHeading: 'Build a Stall That Works for Technical, B2B and High-Footfall Events',
  standOut: [
    { title: 'Clear aisle brand visibility',     body: 'Branding planned so specialized visitors notice your booth among technical competitors.' },
    { title: 'Product display & live demo zones', body: 'Demonstration areas that make complex products and technologies easier to understand.' },
    { title: 'Meeting areas for enterprise visitors', body: 'Spaces for buyers, dealers and enterprise decision-makers to sit and discuss business.' },
    { title: 'Screens & demo stations',          body: 'Digital screens, presentation counters and demo stations placed for visibility and flow.' },
    { title: 'Storage & team working space',     body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lead capture points',              body: 'Visitor movement and enquiry points planned for stronger post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls around your booth size, open sides, product category, visitor profile, brand guidelines and show objective — planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that turn your message into exhibition-ready communication.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Demo & Technology Booths',        body: 'Booths with practical demo counters, screen placement, seating and visitor interaction zones for product demos, software screens, machine displays and technical presentations.' },
  ],

  venueIntro: 'Bangalore has multiple active exhibition venues, each with different technical and logistics requirements. Stall planning must consider floor plans, hall access, utility points, build-up schedules, goods movement, electrical requirements, safety rules, height permissions and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is not only visually strong, but also practical to install and operate during the show.',
  venues: [
    {
      name: 'Bangalore International Exhibition Centre (BIEC)',
      imageUrl: '/images/venues/biec-bangalore.jpg',
      description: 'BIEC on Tumkur Road is one of India\'s leading venues for large B2B trade fairs, engineering exhibitions, technology events, architecture expos and manufacturing shows. It is suitable for both compact booths and large custom-built exhibition stands.',
      bestFor: [
        'Machine tools and manufacturing exhibitions',
        'Technology and startup events',
        'Architecture, interiors and construction expos',
        'Packaging and printing exhibitions',
        'Electronics and industrial automation shows',
        'Food processing and agri-technology events',
        'Large international trade fairs',
      ],
      ctaLabel: 'Plan My Stall at BIEC',
    },
    {
      name: 'KTPO Trade Centre, Whitefield',
      imageUrl: '/images/venues/ktpo-bangalore.jpg',
      description: 'KTPO Trade Centre in Whitefield is a useful venue for mid-scale B2B events, product exhibitions, industrial displays, apparel, electronics, agriculture, food technology and business trade shows. Its location in the eastern business corridor makes it relevant for technology and professional audiences.',
      bestFor: [
        'Electronics and technology exhibitions',
        'Garments, textiles and apparel shows',
        'Agriculture and food technology events',
        'Automotive and component exhibitions',
        'Mid-scale B2B trade events',
        'Product launches and business meets',
      ],
      ctaLabel: 'Plan My Stall at KTPO',
    },
    {
      name: 'Bangalore Palace Grounds',
      imageUrl: '/images/venues/palace-grounds-bangalore.jpg',
      description: 'Bangalore Palace Grounds is commonly used for large-footfall consumer exhibitions, public fairs, temporary pavilions, lifestyle events and open-ground trade setups. Stall design here needs to consider public visibility, temporary structures, outdoor movement and crowd engagement.',
      bestFor: [
        'Consumer exhibitions and lifestyle fairs',
        'FMCG and retail activations',
        'Food, home and family events',
        'Large public-facing brand showcases',
        'Outdoor and pavilion-based exhibitions',
      ],
      ctaLabel: 'Plan My Stall at Palace Grounds',
    },
    {
      name: 'Yelahanka & Aerospace Event Support',
      imageUrl: '/images/venues/yelahanka-aerospace-bangalore.jpg',
      description: 'Bangalore is closely linked with aerospace and defence events, especially around Yelahanka. For aerospace, defence and advanced engineering exhibitors, stall design must communicate credibility, technical strength and precision.',
      bestFor: [
        'Aerospace and defence exhibitions',
        'Advanced engineering displays',
        'Component and technology showcases',
        'Government and institutional buyer meetings',
      ],
      ctaLabel: 'Discuss Aerospace Exhibition Stall',
    },
  ],

  shows,

  industries: [
    { title: 'IT, Software & Technology',           body: 'Demo-friendly booths with digital screens, product counters, meeting zones and clean communication panels that simplify enterprise software, cloud, cybersecurity, AI, hardware and SaaS offerings.' },
    { title: 'Aerospace & Defence',                 body: 'Precise, credible and secure booth layouts for components, models, technology displays, institutional meetings and technical presentations.' },
    { title: 'Machine Tools & Manufacturing',       body: 'Durable, product-led stalls for machinery display, automation demos, technical panels, buyer discussions and distributor meetings.' },
    { title: 'Architecture, Interiors & Construction', body: 'Display walls, material boards, lighting-led spaces and meeting zones for architects, designers and contractors.' },
    { title: 'Electronics & Semiconductors',        body: 'Clean, technical booths that support product explanation, live demos and professional buyer conversations.' },
    { title: 'FMCG & Consumer Goods',               body: 'Engaging stalls with sampling zones, display counters and high-visibility branding for FMCG, retail, lifestyle and food brands.' },
    { title: 'Education, Skilling & EdTech',        body: 'Informative, approachable booths with consultation counters, information panels, digital screens and visitor-friendly layouts.' },
    { title: 'Real Estate & Infrastructure',        body: 'Spaces for project visuals, digital walkthroughs, model displays and private discussions that communicate project value clearly.' },
    { title: 'Packaging, Printing & Food Tech',     body: 'Booths that support product samples, machine displays, demos and clear comparison of solutions for packaging, printing, food processing and agri-tech events.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',   body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines so the stall supports your business goal.' },
    { title: 'Practical 3D Design',    body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',  body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',   body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',  body: 'Bangalore venues have different build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Demo-Friendly Layouts',  body: 'Many Bangalore exhibitions involve live demos and technical presentations. We plan booths that support visitor explanation, screen visibility, equipment placement and lead capture.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The booth is transported to the Bangalore venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Bangalore?', a: 'The best exhibition stall designer for your Bangalore project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Bangalore trade shows.' },
    { q: 'Do you provide exhibition stall design for BIEC Bangalore?', a: 'Yes. We support exhibition stall planning and execution for events at Bangalore International Exhibition Centre (BIEC), including custom booths, modular stalls, product demo stands and large exhibition structures.' },
    { q: 'Do you work at KTPO Trade Centre and Bangalore Palace Grounds?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows at KTPO Trade Centre, Whitefield and Bangalore Palace Grounds.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Bangalore?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Bangalore exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, special structures, machinery displays, technology integrations or peak-season events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle technology and demo-based booths?', a: 'Yes. We can plan booths with screens, product counters, demo areas, presentation zones, seating and lead capture points for technology, software, electronics and engineering exhibitors.' },
    { q: 'Do you work with exhibitors from outside Bangalore?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Bangalore exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Designer in Bangalore',
  schemaAreaServed: 'Bangalore',
}
