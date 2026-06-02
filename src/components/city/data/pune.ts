import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

const shows = buildCityShows(/pune/i)

export const puneData: CityPageData = {
  citySlug: 'pune',
  metaTitle: 'Exhibition Stall Design in Pune | Stall Fabrication & 3D Booth Design',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Pune trade shows.',
  canonicalPath: '/exhibition-stall-design-pune',

  eyebrow: 'Pune Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Pune for',
  h1Highlight: 'Better Visibility and Better Leads',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Pune trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on demos, meetings, enquiries and business growth.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Auto Cluster and PIECC execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Pune Trade Shows',
  introP1: 'Pune is one of India\'s strongest industrial and business exhibition markets, supported by automotive, engineering, manufacturing, IT, pharmaceuticals, agriculture, food processing, education, real estate and infrastructure sectors. The city hosts important trade shows at Auto Cluster Exhibition Centre in Chinchwad, Pune International Exhibition and Convention Centre (PIECC) in Moshi, MCCIA Trade Tower and other business venues across Pune and Pimpri-Chinchwad.',
  introP2: 'Approach Media Pvt Ltd works with companies that need dependable exhibition stall design in Pune. We support design, 3D visualization, fabrication, branding, logistics, installation and dismantling for compact booths, shell scheme upgrades, modular stalls, product display stands and large custom island booths.',

  standOutHeading: 'Build a Stall That Works for Industrial, Automotive and B2B Exhibitions',
  standOut: [
    { title: 'Strong aisle-facing visibility',    body: 'Brand presence that stands out to automotive buyers, machine tool engineers, distributors and institutional decision-makers.' },
    { title: 'Product display & demo zones',       body: 'Clearly planned areas for live demonstrations, machinery display, sample zones and technical product explanation.' },
    { title: 'Meeting areas built in',             body: 'Dedicated spaces for buyers, dealers and institutional visitors to discuss business.' },
    { title: 'Machinery & equipment planning',     body: 'Booth zones planned for safe machinery display, equipment access, utility connections and lead capture.' },
    { title: 'Storage & team working space',       body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Visitor flow for lead capture',      body: 'Visitor movement and enquiry points planned for stronger post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls based on your booth size, open sides, product category, visitor profile, brand guidelines and exhibition objective. Each layout is planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication starts.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing and stable construction.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that convert your brand message into exhibition-ready communication.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Booths planned for machine tools, automotive components, welding systems, factory equipment, fasteners, food processing machines, agriculture products and technology demos with suitable counters, equipment zones and screen placement.' },
  ],

  venueIntro: 'Pune has multiple exhibition venues, each serving a different type of trade show. Stall planning must consider floor plans, hall access, utility points, build-up schedules, material movement, electrical requirements, safety rules, height permissions and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Auto Cluster Exhibition Centre, Chinchwad',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/auto-cluster-pune.jpg',
      description: 'Auto Cluster Exhibition Centre in Chinchwad is a key Pune venue for engineering, manufacturing, automotive, metalworking, automation and industrial trade exhibitions. It is especially relevant for companies from Pimpri-Chinchwad, Chakan, Talegaon, Bhosari and the wider automotive manufacturing belt.',
      bestFor: [
        'Automotive and EV exhibitions',
        'Machine tools and precision engineering shows',
        'Welding, cutting and joining technology events',
        'Factory automation and process automation expos',
        'Fasteners, die mould and tooling exhibitions',
        'Rubber, metals and industrial product shows',
        'Bioenergy and renewable energy events',
      ],
      ctaLabel: 'Plan My Stall at Auto Cluster',
    },
    {
      name: 'Pune International Exhibition and Convention Centre (PIECC), Moshi',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/piecc-pune.jpg',
      description: 'PIECC in Moshi is a major venue for large-format national trade shows, multi-sector industrial exhibitions and conference-linked events. It is well suited for large booths, machinery displays, industrial expos and trade events that attract buyers from across Maharashtra and India.',
      bestFor: [
        'Machine tool and manufacturing exhibitions',
        'Construction and infrastructure expos',
        'Agriculture and food processing shows',
        'Packaging, corrugated and paperboard exhibitions',
        'Mobility and automotive technology events',
        'Industrial equipment and factory technology expos',
        'Large B2B trade fairs',
      ],
      ctaLabel: 'Plan My Stall at PIECC',
    },
    {
      name: 'MCCIA Trade Tower, Senapati Bapat Road',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/mccia-pune.jpg',
      description: 'MCCIA Trade Tower is useful for B2B conferences, association-led exhibitions, product launches, industry meets, trade delegations and professional events. It is suitable for compact stalls, branded display zones and networking-led exhibition formats.',
      bestFor: [
        'Industry association events',
        'Product launches and dealer meets',
        'Education and skilling events',
        'IT, electronics and professional services',
        'Agribusiness, biotech and chemicals sector events',
        'Business conclaves and networking exhibitions',
      ],
      ctaLabel: 'Plan My Stall at MCCIA Trade Tower',
    },
  ],

  shows,

  industries: [
    { title: 'Automotive & EV',                         body: 'Pune is one of India\'s most important automotive hubs. We design booths for automotive, EV, mobility and component brands with product display areas, demo zones and dealer meeting spaces.' },
    { title: 'Manufacturing, Machine Tools & Engineering', body: 'Pune\'s manufacturing exhibitions attract serious buyers and technical decision-makers. We create durable, product-led stalls for machine tools, precision engineering, automation, welding, fasteners, tooling and industrial equipment brands.' },
    { title: 'IT, Electronics & Technology',             body: 'Pune\'s IT ecosystem across Hinjewadi, Baner, Kharadi and Magarpatta supports technology events. We design demo-friendly booths with screens, consultation counters and clear product communication.' },
    { title: 'Pharmaceuticals, Biotech & Healthcare',    body: 'Pune has a strong pharma, biotech and healthcare base. We plan clean, professional and information-rich booths for pharma companies, medical devices, diagnostics, biotech firms and healthcare suppliers.' },
    { title: 'Agriculture & Food Processing',            body: 'Pune is closely connected with Maharashtra\'s agriculture and food processing sectors. We design practical stalls for agri-tech, farm equipment, food manufacturing, grains, processing machines and packaged food brands.' },
    { title: 'Real Estate & Infrastructure',             body: 'Pune\'s residential, commercial and infrastructure market creates regular exhibition opportunities. We create project-focused booths with model displays, digital screens, enquiry counters and meeting areas.' },
    { title: 'Education, Skilling & EdTech',             body: 'Pune is known as an education hub. We design approachable booths for universities, institutes, training providers, EdTech companies and skilling organizations with counselling counters and clear information panels.' },
    { title: 'Interior Design, Architecture & Building Products', body: 'Interior, architecture and building product exhibitions in Pune attract architects, designers, builders and homeowners. We design refined display-led stalls for surfaces, furniture, lighting, hardware, decor and material brands.' },
    { title: 'Renewable Energy & Sustainability',        body: 'Bioenergy, EV, clean energy and sustainability shows in Pune need clear product explanation and technical credibility. We plan booths with demo counters, specification panels and structured visitor flow.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',    body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines to design a stall that supports your business goal.' },
    { title: 'Practical 3D Design',     body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',   body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',    body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',   body: 'Pune venues have specific build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Demo-Friendly Layouts',   body: 'Many Pune exhibitions involve technical demos, machinery display and industrial product explanation. We plan booths that support equipment placement, screen visibility, safe movement and lead capture.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Pune venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Pune?', a: 'The best exhibition stall designer for your Pune project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Pune trade shows.' },
    { q: 'Do you provide exhibition stall design for Auto Cluster Exhibition Centre, Chinchwad?', a: 'Yes. We support exhibition stall planning and execution for events at Auto Cluster Exhibition Centre in Chinchwad, including custom booths, modular stalls, product display stands and industrial exhibition structures.' },
    { q: 'Do you work at Pune International Exhibition and Convention Centre (PIECC), Moshi?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows at PIECC, Moshi.' },
    { q: 'Do you provide stall services for MCCIA Trade Tower?', a: 'Yes. We support exhibition stall planning and execution for B2B events, product launches, association events and business exhibitions at MCCIA Trade Tower.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Pune?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Pune exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, machinery displays, special structures or peak-season industrial events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle automotive and machine tool exhibition stalls?', a: 'Yes. We can plan product-led and demo-friendly booths for automotive, EV, machine tools, factory automation, welding, fasteners, tooling and engineering exhibitors.' },
    { q: 'Do you work with exhibitors from outside Pune or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Pune exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Design in Pune',
  schemaAreaServed: 'Pune',
}
