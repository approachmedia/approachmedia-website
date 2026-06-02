import type { CityPageData } from '../types'
import { buildCityShows, type CuratedShow } from './shows'

const KEY_SHOWS: CuratedShow[] = [
  { startDate: '2026-03-18', title: 'Kolkata Footwear Fair',                    dateRaw: '18–20 Mar 2026',  categories: ['Tradeshow', 'Apparel & Clothing', 'Fashion & Beauty'],       venue: 'Kolkata',                            link: null },
  { startDate: '2026-03-31', title: 'DITEX',                                    dateRaw: '31 Mar 2026',     categories: ['Tradeshow', 'Textile, Fabrics & Yarns'],                       venue: 'Kolkata',                            link: null },
  { startDate: '2026-04-03', title: 'Sutraa — The Indian Fashion Exhibition',   dateRaw: '3–5 Apr 2026',   categories: ['Tradeshow', 'Fashion & Beauty', 'Apparel & Clothing'],         venue: 'Kolkata',                            link: null },
  { startDate: '2026-04-10', title: 'Quest Asia — Gifts and Stationery Expo',  dateRaw: '10–12 Apr 2026',  categories: ['Tradeshow', 'Arts & Crafts', 'Business Services'],             venue: 'Kolkata',                            link: null },
  { startDate: '2026-04-24', title: 'INDUS-Tech Expo',                          dateRaw: '24–26 Apr 2026',  categories: ['Tradeshow', 'Industrial Engineering', 'Automation'],           venue: 'Biswa Bangla Mela Prangan, Kolkata', link: null },
  { startDate: '2026-05-08', title: 'Kolkata Machine Tools Show',               dateRaw: '8–10 May 2026',   categories: ['Tradeshow', 'Industrial Engineering', 'Automation & Robotics'],venue: 'Kolkata',                            link: null },
  { startDate: '2026-05-15', title: 'PACK-O-PRINTEX Expo',                      dateRaw: '15–17 May 2026',  categories: ['Tradeshow', 'Packing & Packaging', 'Printing'],               venue: 'Biswa Bangla Mela Prangan, Kolkata', link: null },
  { startDate: '2026-07-01', title: 'Travel & Tourism Fair Kolkata',            dateRaw: 'Jul 2026',        categories: ['Tradeshow', 'Tourism & Hospitality'],                          venue: 'Kolkata',                            link: null },
  { startDate: '2026-09-01', title: 'CLI — Coal Logistics India',               dateRaw: 'Sep 2026',        categories: ['Tradeshow', 'Industrial Engineering', 'Power & Energy'],       venue: 'Kolkata',                            link: null },
]

const shows = buildCityShows(/kolkata|calcutta/i, {
  curated: KEY_SHOWS,
  exclude: e => KEY_SHOWS.some(k => e.title.toLowerCase().startsWith(k.title.toLowerCase().slice(0, 18))),
})

export const kolkataData: CityPageData = {
  citySlug: 'kolkata',
  metaTitle: 'Exhibition Stand Builder in Kolkata | Stall Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stand design, 3D stall design, fabrication, branding, installation and turnkey exhibition support for trade shows in Kolkata.',
  canonicalPath: '/exhibition-stand-builder-in-kolkata',

  eyebrow: 'Kolkata · West Bengal · India',
  h1Line1: 'Exhibition Stand Builder in Kolkata That Helps Your Brand',
  h1Highlight: 'Own the Show Floor',
  subtitle: 'Approach Media Pvt Ltd designs and executes exhibition stalls for brands participating in Kolkata trade shows. From 3D stall concepts and fabrication to branding, logistics, installation and dismantling, we manage the complete exhibition process so your team can focus on visitors, meetings and business enquiries.',
  trustPills: ['Custom exhibition stand design', '3D stall visualization', 'Fabrication & branding support', 'Biswa Bangla Mela Prangan execution', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Kolkata Trade Shows',
  introP1: 'Kolkata is one of eastern India\'s most important exhibition destinations. The city attracts B2B visitors, distributors, manufacturers, institutional buyers and business owners from West Bengal, Odisha, Bihar, Jharkhand, the Northeast and neighbouring markets. For exhibitors, this makes every trade show in Kolkata a serious opportunity to build visibility and generate qualified leads.',
  introP2: 'Approach Media Pvt Ltd helps brands create exhibition stalls that are clear, functional and built around their business objective. Whether you need a compact booth, shell scheme upgrade, modular display, product-focused stall or a large custom exhibition stand, our team can support the complete journey from brief to final dismantling.',

  standOutHeading: 'Build a Stall That Works in a Competitive B2B Environment',
  standOut: [
    { title: 'Front-facing brand visibility',        body: 'Aisle-facing branding designed to stop visitors before they pass your stand.' },
    { title: 'Product displays & demo counters',     body: 'Dedicated zones for samples, demos and catalogue discussion, each placed for easy visitor access.' },
    { title: 'Meeting areas for buyers & partners',  body: 'Comfortable, private or semi-private spaces for distributors, dealers and channel partners.' },
    { title: 'Storage & team working space',         body: 'Practical back-of-stall areas keep your team organised without disrupting the visitor experience.' },
    { title: 'Clean graphic communication',          body: 'Clear product messaging, directional signage and lighting that guide visitors and build confidence.' },
    { title: 'Lead capture & engagement points',     body: 'Stall zones planned specifically to start conversations, record enquiries and convert footfall.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stand Design',  body: 'We design exhibition stands based on your booth size, open sides, brand identity, product category and event objective — planned for visibility, movement, display and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so you can see the final booth, review structure, graphics, branding and visitor flow before approving the build.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'We support fabrication for custom stalls, modular booths, wooden stalls, display structures, shell scheme branding, counters, partitions and graphic panels.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Exhibition-ready graphics including fascia branding, backlit panels, product communication, wall graphics, standees, counters and display boards.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'We manage the entire project flow — design, estimate, fabrication, graphics, logistics, venue coordination, installation, handover and dismantling.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Cost-effective and reusable booth formats that maintain brand impact while keeping turnaround and budget practical.' },
  ],

  venueIntro: 'All major B2B trade exhibitions in Kolkata are held at one primary venue: Biswa Bangla Mela Prangan on the Eastern Metropolitan Bypass. Our team has built and installed exhibition stalls here across multiple shows and editions, and we are fully familiar with the venue\'s floor plans, goods entry specifications, power infrastructure, and exhibitor guidelines.',
  featuredVenue: {
    name: 'Biswa Bangla Mela Prangan (BBMP)',
    address: 'Eastern Metropolitan Bypass, opposite Science City, Kolkata 700046',
    imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/bbmp-kolkata.jpg',
    ctaLabel: 'Plan My Stall at Biswa Bangla Mela Prangan',
    specs: [
      { label: 'Total Exhibition Space', value: '31,894 sq. metres' },
      { label: 'Exhibition Halls',       value: 'Hall A & Hall B · Air-conditioned, column-free' },
      { label: 'Hall Dimensions',        value: '120m × 75m per hall · ~80,000 sq.ft carpet area each' },
      { label: 'Stall Capacity',         value: '700+ stalls across both halls' },
      { label: 'Goods Entry Gate',       value: '4,300mm (freight) · 2,700mm (standard)' },
      { label: 'Business Block',         value: '3-storey · seminar rooms & workstation areas on each floor' },
      { label: 'Parking',                value: 'Multi-level · 1,100+ vehicles' },
      { label: 'Managed By',             value: 'WBTPO · Government of West Bengal' },
    ],
    notableShows: 'INDPLAS — Eastern India\'s largest international plastics exhibition (tri-annual, Indian Plastics Federation) · Kolkata Machine Tools Show — machine tools, engineering & factory automation (annual) · Medicall Kolkata — B2B medical equipment exhibition (annual)',
  },

  shows,

  industries: [
    { title: 'Plastics, Packaging & Polymers',        body: 'Stalls supporting machinery display, raw material communication, live demos and structured buyer discussions at Kolkata\'s major plastics and packaging expos.' },
    { title: 'Machine Tools, Engineering & Automation',body: 'Durable, demonstration-ready stalls with equipment placement, safety movement, technical product panels and meeting spaces for industrial buyers.' },
    { title: 'Healthcare & Medical Equipment',         body: 'Clean, precise booth layouts supporting product demos, catalogue discussions, consultation zones and clear product communication.' },
    { title: 'Printing, Packaging & Signage',          body: 'Practical display walls, sample counters, lighted graphics and conversation areas that help visitors compare products quickly.' },
    { title: 'Building Materials & Architecture',      body: 'Display-led stalls for laminates, tiles, hardware, doors, windows, surfaces, sanitaryware, furniture and allied categories.' },
    { title: 'Education, Tourism & Consumer Events',   body: 'Welcoming, easy-to-navigate stalls with branded counters, information walls, consultation desks and visitor-friendly layouts.' },
    { title: 'Real Estate & Infrastructure',           body: 'Stalls with model display, project visuals, digital presentations, enquiry counters and buyer discussion zones.' },
  ],

  whyUs: [
    { title: 'Strategy Before Structure', body: 'We begin by understanding your exhibition goal, audience, product, booth size and budget — this creates a stall that supports your sales plan, not just a decorative structure.' },
    { title: 'Practical 3D Design',       body: 'Our 3D designs are planned for real show-floor use. We consider aisle visibility, team movement, product display, lighting and visitor interaction before finalising.' },
    { title: 'Complete Coordination',     body: 'One team for design, fabrication, graphics, logistics, installation and dismantling. Clearer communication, fewer last-minute gaps.' },
    { title: 'Transparent Scope',         body: 'We define included items before production — structure, branding, lighting, furniture, graphics, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',     body: 'Kolkata exhibitions involve tight setup schedules and clear venue guidelines. We plan the stall around organizer requirements and practical installation conditions.' },
    { title: 'Lead-Focused Layouts',      body: 'A strong exhibition stand helps your team start better conversations. We plan booth spaces around visitor entry, product explanation and enquiry capture.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, open sides, brand guidelines, product details, budget range and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We decide key stall zones: reception, display, demo, meeting, storage, branding and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D design showing proposed structure, branding, graphics, lighting, counters and display areas.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the concept is approved, we prepare the project scope and quotation so you know exactly what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'Stall elements and graphics are produced according to approved design, material plan and delivery schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The booth is transported to the Kolkata exhibition venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the event, we handle dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stand builder in Kolkata?', a: 'The best stand builder for your project is one that understands your brand, booth size, product category, budget, venue rules and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Kolkata trade shows.' },
    { q: 'Do you provide exhibition stall design for Biswa Bangla Mela Prangan?', a: 'Yes. We support exhibition stall planning and execution for shows at Biswa Bangla Mela Prangan, Kolkata, along with other exhibition and convention venues in the city.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We prepare a 3D stall design so your team can review the booth layout, branding, product display, lighting and visitor flow before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Kolkata?', a: 'The cost depends on booth size, design complexity, material selection, branding requirements, lighting, furniture, technology, logistics and installation scope. Share your exhibition details to get a customised estimate.' },
    { q: 'How early should we start planning our Kolkata exhibition stall?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stalls, premium finishes, complex structures or machinery displays may need more time.' },
    { q: 'Do you offer turnkey exhibition stand services?', a: 'Yes. Approach Media Pvt Ltd can manage the complete exhibition stall process — brief, 3D design, fabrication, branding, transport, installation and dismantling.' },
    { q: 'Can you handle small booths and large custom stands?', a: 'Yes. We support small shell scheme booths, modular stalls, custom-built stalls, product display booths, inline stalls and larger island-style exhibition stands.' },
    { q: 'Do you work with exhibitors from outside Kolkata?', a: 'Yes. We can coordinate with companies from other Indian cities or overseas participating in Kolkata exhibitions. Design approval and planning can be handled remotely before on-site execution.' },
    { q: 'What information is needed to start the stall design?', a: 'We need the exhibition name, booth size, floor plan, open sides, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stand Builder in Kolkata',
  schemaAreaServed: 'Kolkata',
}
