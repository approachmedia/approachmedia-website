import type { CityPageData, ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = { title: string; link: string; dateRaw: string; startDate: string | null; city: string; categories: string[] }

// Ahmedabad shows are pulled live from the tradeshow dataset (no hard-coded
// key shows — the MD lists categories rather than dated editions).
const shows: ExhibitionShow[] = (eventsData as CsvEvent[])
  .filter(e => /ahmedabad/i.test(e.city))
  .slice(0, 9)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

export const ahmedabadData: CityPageData = {
  citySlug: 'ahmedabad',
  metaTitle: 'Exhibition Stand Builders in Ahmedabad | Stall Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stand design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Ahmedabad trade shows.',
  canonicalPath: '/exhibition-stand-builders-in-ahmedabad',

  eyebrow: 'Ahmedabad · Gujarat · India',
  h1Line1: 'Exhibition Stand Builders in Ahmedabad That Create',
  h1Highlight: 'Brand-Led Trade Show Stalls',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors design and execute custom exhibition stalls for Ahmedabad trade shows. From 3D stall concepts and fabrication to graphics, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your brand is ready before the show opens.',
  trustPills: ['Custom exhibition stand design', '3D stall visualization', 'Stall fabrication and branding', 'GUCEC and GMDC Ground execution', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Ahmedabad Trade Shows',
  introP1: 'Ahmedabad is one of India\'s most commercially active exhibition markets, supported by Gujarat\'s strength in pharmaceuticals, textiles, engineering, chemicals, EV, energy, real estate, interiors and consumer products. Trade shows in the city attract manufacturers, dealers, distributors, institutional buyers, architects, healthcare professionals, investors and business owners from across Gujarat and western India.',
  introP2: 'Approach Media Pvt Ltd works with companies that need an exhibition stand builder in Ahmedabad for design, 3D visualization, fabrication, branding, logistics, installation and dismantling. Whether you are planning a compact booth, a modular stall, a product display stand or a large custom island booth, we shape the stall around your brand, budget, venue rules and exhibition objective.',

  standOutHeading: 'Build a Stall That Works on a Busy Ahmedabad Show Floor',
  standOut: [
    { title: 'Strong branding visibility',     body: 'Aisle-facing branding so your brand gets noticed quickly in competitive Ahmedabad halls.' },
    { title: 'Product display & demo zones',   body: 'Dedicated areas for product display and demonstration, planned for easy visitor access.' },
    { title: 'Meeting areas built in',         body: 'Comfortable spaces for buyers, dealers and partners to sit and discuss business.' },
    { title: 'Storage & team working space',   body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Clean graphic communication',    body: 'Easy-to-read product messaging, signage and lighting suited to your category.' },
    { title: 'Lead capture points',            body: 'Visitor movement and enquiry points planned for better post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stand Design',  body: 'We design exhibition stands around your booth size, open sides, product category, target visitors and brand identity — planned for visibility, movement, display, meeting space and practical team use.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before fabrication begins, we prepare a 3D view of the stall so your team can review structure, branding, product areas, lighting, furniture and visitor flow before approving.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, wooden structures, shell scheme upgrades, counters, partitions, display walls, backlit graphics and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter graphics, directional signage and LED-ready visual content that explains your brand quickly.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, print, logistics, installation, final checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, cost-conscious modular and rental-style formats that keep brand impact strong while keeping execution practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Display-led booths for machinery, medical equipment, EV products, electrical goods, interiors, textiles or beauty products so visitors understand your range clearly.' },
  ],

  venueIntro: 'Ahmedabad has multiple active exhibition venues, each with different technical, logistics and setup requirements. Stall planning must consider booth dimensions, floor access, utility points, build-up timing, material movement, electrical work, safety rules and dismantling schedules.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is not only attractive, but also practical to build and operate during the show.',
  venues: [
    {
      name: 'Gujarat University Convention & Exhibition Centre (GUCEC)',
      imageUrl: '/images/venues/gucec-ahmedabad.jpg',
      description: 'GUCEC in Memnagar is a key Ahmedabad venue for healthcare, EV, textile, home decor, interiors and B2B trade exhibitions. It is suitable for indoor exhibition stalls, product displays, conference-linked expos and brand-led business events.',
      bestFor: [
        'Medical and healthcare exhibitions',
        'EV and automobile expos',
        'Home textile and decor exhibitions',
        'Interior, furniture and building product shows',
        'Battery and power-related events',
      ],
      ctaLabel: 'Plan My Stall at GUCEC',
    },
    {
      name: 'GMDC Ground, Vastrapur',
      imageUrl: '/images/venues/gmdc-ground-ahmedabad.jpg',
      description: 'GMDC Ground is widely used for large-format exhibitions and open-ground trade fairs. It is suitable for industrial machinery, engineering, real estate, infrastructure, construction and large product-display exhibitions.',
      bestFor: [
        'Engineering and manufacturing exhibitions',
        'Industrial machinery expos',
        'Real estate and infrastructure shows',
        'Construction, interiors and exterior product events',
        'Large outdoor or temporary exhibition setups',
      ],
      ctaLabel: 'Plan My Stall at GMDC Ground',
    },
    {
      name: 'Eka Club / EKA Arena',
      imageUrl: '/images/venues/eka-club-ahmedabad.jpg',
      description: 'Eka Club near Kankaria is useful for mid-scale B2B and consumer exhibitions, especially for electrical, energy, smart home, optics, lifestyle and technology events. Indoor arena-style execution requires careful planning for access, height, lighting and load requirements.',
      bestFor: [
        'Electric and energy expos',
        'Smart home and automation shows',
        'Optics and lifestyle exhibitions',
        'Technology, retail and consumer-facing events',
      ],
      ctaLabel: 'Plan My Stall at Eka Club',
    },
    {
      name: 'Vigyan Bhawan, Gujarat Science City',
      imageUrl: '/images/venues/vigyan-bhawan-ahmedabad.jpg',
      description: 'Vigyan Bhawan at Gujarat Science City is used for government, technology, medical, science, drone, geospatial and innovation-led events. Stalls here should feel professional, clean and information-led.',
      bestFor: [
        'Medical and healthcare technology',
        'Science, innovation and technology events',
        'Drone and geospatial exhibitions',
        'Government and institutional expos',
      ],
      ctaLabel: 'Plan My Stall at Vigyan Bhawan',
    },
  ],

  shows,

  industries: [
    { title: 'Pharmaceuticals & Healthcare',          body: 'Clean, professional stalls for pharmaceutical companies, medical equipment brands, hospital suppliers, diagnostics, healthcare technology and wellness businesses.' },
    { title: 'Engineering & Manufacturing',           body: 'Booths that explain technical capability clearly — space for machinery, components, process displays, catalogues, demos and buyer meetings.' },
    { title: 'Electric Vehicles & Automotive',        body: 'Modern, demonstration-friendly layouts for vehicle display, charging products, components, batteries, mobility solutions and interactive product explanation.' },
    { title: 'Energy, Electrical & Smart Technology', body: 'Stalls for solar, electrical, power, smart home and automation brands with product displays, live demos and specification panels.' },
    { title: 'Textiles, Home Furnishings & Decor',    body: 'Display-led booths for fabrics, home textiles, decor products, hotelware, furnishings and sourcing-focused exhibitions.' },
    { title: 'Real Estate & Infrastructure',          body: 'Stalls with models, digital walkthroughs, project graphics, enquiry counters and focused buyer discussions.' },
    { title: 'Interiors & Furniture',                 body: 'Strong visual presentation supporting material display, product comparison, catalogue discussions and designer/buyer engagement.' },
    { title: 'Beauty, Wellness & Lifestyle',          body: 'Polished stalls that attract footfall, support product sampling and help the team engage visitors quickly.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',      body: 'We begin with your exhibition goal, audience, booth size, products, budget and brand guidelines so the stall supports your business objective.' },
    { title: 'Practical 3D Design',       body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product zones, storage, lighting, team movement and visitor interaction.' },
    { title: 'Complete Coordination',     body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and last-minute confusion.' },
    { title: 'Clear Scope & Budget',      body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',     body: 'Ahmedabad venues have different build-up and technical requirements. We plan the stall around organizer guidelines, access conditions and installation timelines.' },
    { title: 'Visitor-Focused Layouts',   body: 'Every stall is planned to support visitor entry, product explanation, lead capture and sales discussions — not just visual decoration.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, product details, brand guidelines, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define key zones such as reception, display, demo, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D design showing the proposed booth structure, graphics, counters, display areas, lighting and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The booth is transported to the Ahmedabad venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stand builder in Ahmedabad?', a: 'The best exhibition stand builder for your Ahmedabad project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Ahmedabad trade shows.' },
    { q: 'Do you provide exhibition stall design for GUCEC Ahmedabad?', a: 'Yes. We support exhibition stall planning and execution for events at Gujarat University Convention & Exhibition Centre (GUCEC), including custom stalls, modular booths and product display stands.' },
    { q: 'Do you work at GMDC Ground, Eka Club and Vigyan Bhawan?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows at GMDC Ground, Eka Club / EKA Arena and Vigyan Bhawan at Gujarat Science City.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product displays, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Ahmedabad?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Ahmedabad exhibition stand?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stalls, premium finishes, machinery displays or special approvals may require more time.' },
    { q: 'Do you offer turnkey exhibition stand services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle small booths and large custom stands?', a: 'Yes. We can support small shell scheme booths, modular stalls, custom-built stands, product display booths, inline stalls and large island-style exhibition stands.' },
    { q: 'Do you work with exhibitors from outside Ahmedabad?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Ahmedabad exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stand Builders in Ahmedabad',
  schemaAreaServed: 'Ahmedabad',
}
