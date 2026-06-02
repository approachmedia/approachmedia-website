import type { CityPageData, ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = { title: string; link: string; dateRaw: string; startDate: string | null; city: string; categories: string[] }

const shows: ExhibitionShow[] = (eventsData as CsvEvent[])
  .filter(e => /chennai/i.test(e.city))
  .slice(0, 9)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

export const chennaiData: CityPageData = {
  citySlug: 'chennai',
  metaTitle: 'Exhibition Stall Designer in Chennai | Stand Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Chennai trade shows.',
  canonicalPath: '/exhibition-stall-designer-chennai',

  eyebrow: 'Chennai Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Designer in Chennai for',
  h1Highlight: 'Strong Trade Show Visibility',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Chennai trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on demos, buyer meetings, enquiries and business growth.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Chennai Trade Centre execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Chennai Trade Shows',
  introP1: 'Chennai is one of South India\'s strongest exhibition and industrial markets, supported by automotive, manufacturing, machine tools, plastics, printing, packaging, pharmaceuticals, healthcare, food processing, renewable energy, interiors and technology sectors. The city hosts major trade shows at Chennai Trade Centre in Nandambakkam and other business venues across Chennai.',
  introP2: 'Approach Media Pvt Ltd works with companies that need a dependable exhibition stall designer in Chennai. We support design, 3D visualization, fabrication, branding, logistics, installation and dismantling for compact booths, shell scheme upgrades, modular stalls, product display stands and large custom island booths.',

  standOutHeading: 'Build a Stall That Works for Industrial, Healthcare and Technology Exhibitions',
  standOut: [
    { title: 'Strong aisle-facing visibility',    body: 'Brand presence that stands out to automotive buyers, machine tool engineers, pharma professionals, distributors and institutional decision-makers.' },
    { title: 'Product display & demo zones',       body: 'Clearly planned areas for live product demonstration, machinery display and technical product explanation.' },
    { title: 'Meeting areas built in',             body: 'Dedicated spaces for buyers, dealers and institutional visitors to sit and discuss business.' },
    { title: 'Machinery & equipment planning',     body: 'Booth zones planned for safe equipment access, utility connections and product explanation.' },
    { title: 'Storage & team working space',       body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lead capture points',               body: 'Visitor movement and enquiry points planned for stronger post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls based on your booth size, open sides, product category, visitor profile, brand guidelines and exhibition objective. Each layout is planned for visibility, product explanation, visitor movement and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the final look, structure, branding, display zones, furniture, lighting and visitor flow before fabrication starts.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing and stable construction.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork that convert your brand message into exhibition-ready communication.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Booths planned for machine tools, automotive components, plastics, packaging, pharma products, food processing systems, renewable energy products and interior materials with suitable counters, equipment zones and screen placement.' },
  ],

  venueIntro: 'Chennai Trade Centre in Nandambakkam is the city\'s leading exhibition venue and a major destination for South Indian trade shows. Stall planning for Chennai venues must consider floor plans, hall access, utility points, build-up schedules, material movement, electrical requirements, safety rules, height permissions and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Chennai Trade Centre, Nandambakkam',
      imageUrl: '/images/venues/chennai-trade-centre.jpg',
      description: 'Chennai Trade Centre is one of the most important exhibition venues in South India. It hosts major B2B and consumer trade shows across manufacturing, machine tools, plastics, pharma, printing, packaging, renewable energy, food processing, architecture, interiors, jewellery and automotive sectors.',
      bestFor: [
        'Machine tools and manufacturing exhibitions',
        'Plastics, polymers and packaging shows',
        'Pharma, healthcare and nutraceutical events',
        'Renewable energy and EV exhibitions',
        'Food processing and food technology shows',
        'Printing, publishing and packaging expos',
        'Architecture, interiors and building product exhibitions',
        'Jewellery, gems and lifestyle exhibitions',
        'Automotive and auto component trade shows',
      ],
      ctaLabel: 'Plan My Stall at Chennai Trade Centre',
    },
    {
      name: 'Halls, Conferences & Business Venues Across Chennai',
      imageUrl: '/images/venues/chennai-business-venues.jpg',
      description: 'Along with Chennai Trade Centre, the city also hosts corporate events, conferences, product launches and buyer meets at hotels, convention spaces and business venues across Chennai. These events often need compact, polished and brand-led booth solutions.',
      bestFor: [
        'Corporate product launches',
        'Dealer meets and distributor conferences',
        'Healthcare and pharma conferences',
        'Education and professional events',
        'Technology and startup showcases',
      ],
      ctaLabel: 'Discuss My Chennai Event Stall',
    },
  ],

  shows,

  industries: [
    { title: 'Manufacturing & Machine Tools',           body: 'Chennai is a major manufacturing and engineering market. We design durable, product-led stalls for machine tools, industrial equipment, automation, welding, precision engineering and manufacturing brands.' },
    { title: 'Automotive & Auto Components',            body: 'Chennai is widely known for its automotive manufacturing ecosystem. We plan booths for automotive, EV, mobility, components, tyres, batteries and aftermarket brands with product displays, demo zones and dealer meeting spaces.' },
    { title: 'Plastics, Polymers & Packaging',          body: 'Plastic, polymer and packaging exhibitions require organized product display and technical explanation. We create booths with sample areas, specification panels, machine display zones and structured visitor movement.' },
    { title: 'Pharmaceuticals, Healthcare & Nutraceuticals', body: 'For pharma, healthcare, nutraceutical, medical device and diagnostics exhibitors, we design clean, professional and information-rich booths that build trust and support serious B2B conversations.' },
    { title: 'Renewable Energy & Electric Vehicles',    body: 'Renewable energy and EV events in Chennai need modern, technology-led booths. We plan spaces for solar products, energy storage, charging solutions, EV components, demo counters and digital presentations.' },
    { title: 'Food Processing & Food Technology',       body: 'Food processing exhibitions require practical booths for product display, machinery, sampling, storage and buyer discussions. We create clean, functional layouts for food technology, processing equipment, ingredients and packaged food brands.' },
    { title: 'Printing, Packaging & Publishing',        body: 'For print, packaging and publishing exhibitions, booths need to showcase machines, materials, samples and production capabilities clearly. We design display-led stalls that make comparison and explanation easier.' },
    { title: 'Interior Design, Architecture & Building Products', body: 'Interior and architecture exhibitions in Chennai attract architects, designers, builders and premium buyers. We create refined display-led booths for surfaces, furniture, lighting, hardware, decor, flooring and building product brands.' },
    { title: 'Jewellery, Gems & Lifestyle',             body: 'For jewellery and lifestyle events, the stall needs premium presentation, secure display planning and focused lighting. We plan showcases, counters, consultation zones and brand-led communication.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',    body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines to design a stall that supports your business goal.' },
    { title: 'Practical 3D Design',     body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product displays, meeting areas, demo points, storage and visitor interaction.' },
    { title: 'Complete Coordination',   body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',    body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, technology, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',   body: 'Chennai venues have specific build-up and technical requirements. We plan the stall around organizer guidelines, access conditions, utility points and installation timelines.' },
    { title: 'Demo-Friendly Layouts',   body: 'Many Chennai exhibitions involve technical demos, machinery display and product explanation. We plan booths that support equipment placement, screen visibility, safe movement and lead capture.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Chennai venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stall designer in Chennai?', a: 'The best exhibition stall designer for your Chennai project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Chennai trade shows.' },
    { q: 'Do you provide exhibition stall design for Chennai Trade Centre?', a: 'Yes. We support exhibition stall planning and execution for events at Chennai Trade Centre, Nandambakkam, including custom booths, modular stalls, product display stands and larger exhibition structures.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Chennai?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Chennai exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, machinery displays, special structures or peak-season industrial events may require more time.' },
    { q: 'Do you offer turnkey exhibition stall services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle automotive and machine tool exhibition stalls?', a: 'Yes. We can plan product-led and demo-friendly booths for automotive, EV, machine tools, manufacturing, factory automation, components and engineering exhibitors.' },
    { q: 'Can you handle pharma and healthcare exhibition booths?', a: 'Yes. We can plan clean, professional and information-led booths for pharma, healthcare, nutraceutical, medical device and diagnostics exhibitors.' },
    { q: 'Do you work with exhibitors from outside Chennai or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Chennai exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Designer in Chennai',
  schemaAreaServed: 'Chennai',
}
