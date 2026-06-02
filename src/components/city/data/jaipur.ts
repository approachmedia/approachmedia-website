import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

// Jaipur shows are pulled live from the tradeshow dataset.
const shows = buildCityShows(/jaipur/i)

export const jaipurData: CityPageData = {
  citySlug: 'jaipur',
  metaTitle: 'Exhibition Stand in Jaipur | Stall Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stand design, 3D stall design, fabrication, branding, installation and turnkey exhibition services for Jaipur trade shows.',
  canonicalPath: '/exhibition-stand-in-jaipur',

  eyebrow: 'Jaipur · Rajasthan · India',
  h1Line1: 'Exhibition Stand in Jaipur Designed to Attract Visitors and',
  h1Highlight: 'Build Business Conversations',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stands for Jaipur trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition process so your brand is ready for the show floor.',
  trustPills: ['Custom exhibition stand design', '3D stall visualization', 'Stall fabrication and branding', 'JECC Sitapura execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Jaipur Trade Shows',
  introP1: 'Jaipur is one of India\'s most distinctive exhibition markets, known for gems and jewellery, natural stone, textiles, handicrafts, interiors, tourism, automotive, food, printing and renewable energy events. Trade shows in the city attract manufacturers, exporters, dealers, distributors, architects, buyers, government bodies and international visitors.',
  introP2: 'Approach Media Pvt Ltd works with brands that need a reliable exhibition stand partner in Jaipur for design, 3D visualization, fabrication, branding, logistics, installation and dismantling. Whether you need a compact booth, shell scheme upgrade, modular stall, product display stand or a large custom exhibition stand, we plan the space around your brand, budget, booth size, venue rules and show objective.',

  standOutHeading: 'Build a Stall That Works at High-Value Jaipur Exhibitions',
  standOut: [
    { title: 'Clear aisle brand visibility',     body: 'Branding planned so serious trade buyers and category specialists notice you from the aisle.' },
    { title: 'Product display zones',            body: 'Areas for samples, collections, catalogues or equipment, each placed for easy access.' },
    { title: 'Secure jewellery & gem display',   body: 'Premium, secure and well-lit display planning for jewellery, gems and precious stones.' },
    { title: 'Durable category layouts',         body: 'Strong, practical layouts for stone, machinery and automotive product categories.' },
    { title: 'Meeting areas built in',           body: 'Dedicated spaces for buyers, dealers and export clients to discuss business.' },
    { title: 'Storage & working space',          body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stand Design',  body: 'We design exhibition stands based on your booth size, open sides, product category, brand guidelines and commercial objective — planned for visibility, visitor movement, product display, team usability and buyer interaction.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D view of your proposed exhibition stand so your team can review structure, graphics, counters, lighting, product displays and visitor flow before approving fabrication.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, wooden structures, counters, partitions, display units, backlit panels, product showcases and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Exhibition-ready graphics such as fascia branding, product panels, backdrops, wall graphics, counter graphics, standees, directional signage and LED-ready artwork.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimate, fabrication, graphics, logistics, installation, final checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Options',  body: 'Faster, budget-conscious modular and rental-style booth formats that maintain brand impact while keeping execution practical.' },
    { num: '07', title: 'Product Display & Showcase Booths', body: 'Strong display systems for jewellery, stones, textiles, handicrafts, interiors, food products and machinery — booths that make product ranges easy to view, compare and discuss.' },
  ],

  venueIntro: 'Jaipur Exhibition and Convention Centre (JECC), located in the RIICO Industrial Area at Sitapura, is the city\'s leading exhibition venue. It hosts major trade shows across gems and jewellery, natural stone, interiors, automotive, food, printing, travel and business categories.',
  venueIntro2: 'Venue-aware execution matters because stall planning depends on floor plans, build-up schedules, material movement, electrical requirements, organizer guidelines, safety permissions, height restrictions and dismantling timelines. Approach Media Pvt Ltd plans exhibition stands with these practical details in mind so your booth is visually strong and ready for execution.',
  venues: [
    {
      name: 'Jaipur Exhibition and Convention Centre (JECC), Sitapura',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/jecc-jaipur.jpg',
      description: 'JECC is a major venue for large-format trade shows and national/international exhibitions in Jaipur. Its exhibition halls and convention facilities make it suitable for both product-heavy stalls and premium brand showcases.',
      bestFor: [
        'Gems and jewellery exhibitions',
        'Natural stone, marble and granite shows',
        'Textile, handloom and apparel exhibitions',
        'Interiors, decor and architecture expos',
        'Automotive, truck, trailer and tyre shows',
        'Food and beverage trade events',
        'Printing and packaging exhibitions',
        'Travel, tourism and business events',
      ],
      ctaLabel: 'Plan My Stall at JECC Jaipur',
    },
  ],

  shows,

  industries: [
    { title: 'Gems, Jewellery & Precious Stones',   body: 'Premium, secure and carefully lit stalls with display counters, showcase areas, discussion zones and brand communication that help buyers explore collections comfortably.' },
    { title: 'Natural Stone, Marble & Granite',     body: 'Strong, durable, product-led layouts for marble, granite, stone machinery, tools, mining equipment and surface brands with sample display, technical panels and meeting space.' },
    { title: 'Textiles, Handloom & Apparel',        body: 'Stalls with sample walls, catalogue counters, fabric display areas and buyer discussion zones for block printing, handloom, apparel and export-led sourcing.' },
    { title: 'Handicrafts, Decor & Lifestyle',      body: 'Warm, collection-led booths that help visitors understand product range, craft value and brand personality for handicrafts, home decor and lifestyle brands.' },
    { title: 'Interiors, Furniture & Architecture', body: 'Display walls, material boards, lighting, demo counters and meeting areas that communicate design quality and product specification for architects, designers and buyers.' },
    { title: 'Automotive & Transportation',         body: 'Practical, movement-friendly booths for truck, trailer, tyre, automobile and component exhibitions with product display, demonstration and dealer engagement.' },
    { title: 'Food, FMCG & Hospitality Supply',     body: 'Counters, working zones and branding walls that support sampling, product display, storage and visitor engagement for food and beverage exhibitors.' },
    { title: 'Print, Packaging & Signage',          body: 'Organized layouts with display areas for machines, samples, labels, print finishes and packaging materials that make comparison and explanation easy.' },
    { title: 'Real Estate & Infrastructure',        body: 'Spaces for models, project visuals, digital presentations and private conversations that help visitors understand project value clearly.' },
    { title: 'Renewable Energy & Green Technology', body: 'Modern stalls with demo zones, product panels, digital screens and structured visitor flow for solar, EV, sustainability and clean technology exhibitors.' },
  ],

  whyUs: [
    { title: 'Brand-First Planning',     body: 'We begin with your exhibition objective, target audience, product category, booth size, budget and brand guidelines so the stall supports your business goal.' },
    { title: 'Practical 3D Design',      body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, product display, meeting areas, lighting, storage and visitor interaction.' },
    { title: 'Complete Coordination',    body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',     body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',    body: 'Jaipur exhibitions, especially at JECC, involve specific build-up schedules and organizer guidelines. We plan the stall around practical installation and venue requirements.' },
    { title: 'Visitor-Focused Layouts',  body: 'Every stall is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define the booth zones: reception, product display, demo, meeting area, storage, branding wall and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D visual showing the proposed structure, counters, product displays, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the design direction is approved, we share a clear quotation and scope of work so you know what is included.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The booth elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The stall is transported to the Jaipur venue and installed by the execution team. Final checks are completed before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stand builder in Jaipur?', a: 'The best exhibition stand builder for your Jaipur project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Jaipur trade shows.' },
    { q: 'Do you provide exhibition stall design for JECC Jaipur?', a: 'Yes. We support exhibition stall planning and execution for events at Jaipur Exhibition and Convention Centre (JECC), Sitapura, including custom stands, modular booths, product display stalls and larger exhibition structures.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product display, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Jaipur?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Jaipur exhibition stand?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger stands, premium finishes, jewellery showcases, stone displays or special approvals may require more time.' },
    { q: 'Do you offer turnkey exhibition stand services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle jewellery and gemstone exhibition stalls?', a: 'Yes. We can plan premium display-led booths for jewellery, gems and precious stone brands, including showcases, lighting, consultation areas and brand communication.' },
    { q: 'Can you handle small booths and large custom stands?', a: 'Yes. We can support small shell scheme booths, modular stalls, custom-built stands, product display booths, inline stalls and large island-style exhibition stands.' },
    { q: 'Do you work with exhibitors from outside Jaipur?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Jaipur exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stand in Jaipur',
  schemaAreaServed: 'Jaipur',
}
