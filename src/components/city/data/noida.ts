import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

// Noida + Greater Noida shows are pulled live from the tradeshow dataset.
const shows = buildCityShows(/noida/i)

export const noidaData: CityPageData = {
  citySlug: 'noida',
  metaTitle: 'Exhibition Stand Builders in Noida | Stall Design & Fabrication',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stand design, 3D stall design, fabrication, branding, installation and turnkey exhibition support for Noida and Greater Noida trade shows.',
  canonicalPath: '/exhibition-stand-builders-in-noida',

  eyebrow: 'Noida & Greater Noida · Uttar Pradesh · India',
  h1Line1: 'Exhibition Stand Builders in Noida That Help Your Brand',
  h1Highlight: 'Stand Out at Trade Shows',
  subtitle: 'Approach Media Pvt Ltd designs and executes custom exhibition stalls for brands participating in Noida and Greater Noida trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on visitors, leads and business conversations.',
  trustPills: ['Custom exhibition stand design', '3D stall visualization', 'Stall fabrication and branding', 'India Expo Centre & Mart execution', 'Expocentre Noida support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Noida Trade Shows',
  introP1: 'Noida and Greater Noida are among North India\'s most active exhibition destinations. With large-format trade fairs at India Expo Centre & Mart, Greater Noida and focused business events at Expocentre Noida, the region attracts national and international exhibitors across renewable energy, EV technology, hospitality, food processing, pharmaceuticals, printing, packaging, textiles, handicrafts, gifts, education and consumer technology.',
  introP2: 'Approach Media Pvt Ltd works with brands that need a dependable exhibition stand builder in Noida for design, fabrication, branding, logistics, installation and dismantling. Whether you need a 9 sqm shell scheme upgrade, a modular booth, a product display stall or a large custom island stand, we plan the space around your brand, budget, venue rules and exhibition objective.',

  standOutHeading: 'Build a Booth That Performs in a High-Footfall Exhibition Market',
  standOut: [
    { title: 'Front-facing brand visibility', body: 'Strong aisle-facing branding so thousands of trade visitors notice your booth quickly.' },
    { title: 'Product display & demo zones',   body: 'Clear areas for product display and demonstration, planned for easy visitor access.' },
    { title: 'Meeting areas built in',         body: 'Dedicated spaces for buyers, dealers and channel partners to sit and discuss business.' },
    { title: 'Smart storage & working space',  body: 'Practical back-of-stall areas keep your exhibition team organised through the show day.' },
    { title: 'Lighting, graphics & finishes',  body: 'Materials, lighting and graphics chosen to suit your category and look premium under show lights.' },
    { title: 'Lead capture points',            body: 'Visitor movement and enquiry points planned for better post-show follow-up.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stand Design',  body: 'We design exhibition stands around your booth size, open sides, brand identity, product range and business objective — planned for visibility, product display, visitor movement and practical team use.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production starts, we create a 3D view of the proposed stall so your team can review the final look, structure, branding, lighting, counters, furniture and product zones before approving.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme branding, wooden structures, counters, partitions, display walls, product showcases, backlit panels and premium booth elements with clean finishing.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Exhibition-ready graphics such as fascia branding, product panels, backdrops, standees, wall graphics, counter graphics, directional signage and LED-ready visual content.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, quality checks and post-show removal.' },
    { num: '06', title: 'Rental & Modular Booth Solutions',body: 'Cost-conscious or repeat-use modular and rental-style stand solutions that deliver brand impact while keeping turnaround, storage and budget practical.' },
    { num: '07', title: 'Product Display & Demo Booths',   body: 'Display-led booths for EV, battery, machinery, food processing, packaging, pharma and electronics so visitors understand technical products clearly.' },
  ],

  venueIntro: 'Noida and Greater Noida have two important exhibition venue clusters. Large international trade fairs are commonly hosted at India Expo Centre & Mart in Knowledge Park II, Greater Noida. Mid-scale B2B events, conferences and product-focused exhibitions are also hosted at Expocentre Noida in Sector 62.',
  venueIntro2: 'Venue familiarity matters because stall execution depends on floor plans, hall access, utility points, build-up schedules, material movement, electrical work, height permissions, safety requirements and dismantling timelines. Approach Media Pvt Ltd plans exhibition stalls with these practical details in mind so the booth is not only visually strong, but also executable within the venue environment.',
  venues: [
    {
      name: 'India Expo Centre & Mart, Greater Noida',
      imageUrl: '/images/venues/india-expo-centre-greater-noida.jpg',
      description: 'India Expo Centre & Mart is one of India\'s major integrated exhibition and convention venues. Located in Greater Noida, it is known for large trade fairs, export shows, industry exhibitions, international conventions and large-format business events.',
      bestFor: [
        'Renewable energy and solar exhibitions',
        'EV, battery and mobility shows',
        'Hospitality and food service expos',
        'Printing and packaging exhibitions',
        'Pharma and healthcare trade shows',
        'Textile, apparel and machinery exhibitions',
        'Handicrafts, gifts and lifestyle shows',
        'Education, startup and business expos',
      ],
      ctaLabel: 'Plan My Stall at India Expo Centre',
    },
    {
      name: 'Expocentre Noida, Sector 62',
      imageUrl: '/images/venues/expocentre-noida.jpg',
      description: 'Expocentre Noida is a useful venue for B2B exhibitions, conferences, product launches, business meets and mid-scale trade events. Its Sector 62 location makes it accessible for exhibitors and visitors from Noida, Ghaziabad, Delhi and the wider NCR region.',
      bestFor: [
        'Battery and power technology events',
        'Furniture and interiors exhibitions',
        'Apparel and garment shows',
        'Fitness and wellness expos',
        'IT, consumer technology and product launches',
        'Dealer meets and business conferences',
      ],
      ctaLabel: 'Plan My Stall at Expocentre Noida',
    },
  ],

  shows,

  industries: [
    { title: 'Renewable Energy, Solar & Clean Tech',     body: 'Stalls for solar, wind, renewable energy, battery storage and clean technology brands supporting product demos, technical communication, meeting zones and institutional buyer engagement.' },
    { title: 'Electric Vehicles, Batteries & Storage',   body: 'Booths for batteries, chargers, BMS solutions, EV components, mobility products and energy storage systems with structured display and demonstration areas.' },
    { title: 'Hospitality, HoReCa & Food Service',       body: 'Engaging stalls with counters, storage and working zones for food service, kitchen equipment, hotel supplies and hospitality brands — built for product display, sampling and demos.' },
    { title: 'Food Processing, Bakery & Packaging',      body: 'Organized layouts for samples, equipment, demo counters and visitor interaction that make machines, ingredients and packaging easy to understand.' },
    { title: 'Pharmaceuticals & Healthcare',             body: 'Professional, clean and trust-building booth environments with product displays, meeting spaces, brochure counters and branded information zones for serious B2B conversations.' },
    { title: 'Printing, Packaging & Signage',            body: 'Structured booths with space for machinery, sample walls, material display and finish-quality presentation so visitors can compare capabilities quickly.' },
    { title: 'Textiles, Apparel & Fashion Accessories',  body: 'Sample-friendly displays, buyer meeting areas and clear category communication for textile machinery, apparel, garment, accessories and fashion jewellery brands.' },
    { title: 'Handicrafts, Gifts & Lifestyle Products',  body: 'Warm, organized and collection-led stalls that present handicrafts, giftware, home decor and lifestyle products attractively and support buyer discovery.' },
    { title: 'Consumer Technology & Electronics',        body: 'Interactive, demo-friendly stalls with product counters, digital screens, presentation points and clean visitor movement for better engagement.' },
  ],

  whyUs: [
    { title: 'Brand-Led Stall Planning', body: 'We begin with your exhibition objective, target visitor, booth size, product range, brand guidelines and budget so the stall supports your business goal, not just the visual brief.' },
    { title: 'Practical 3D Design',      body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, display zones, meeting areas, team movement, storage and electrical requirements.' },
    { title: 'Complete Coordination',    body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, reducing coordination gaps and keeping the project easier to manage.' },
    { title: 'Clear Scope & Budget',     body: 'We define what is included before production — structure, materials, branding, lighting, furniture, graphics, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',    body: 'Noida exhibitions often run on strict build-up and handover schedules. We plan the stall around organizer guidelines, venue access and practical installation requirements.' },
    { title: 'Visitor-Focused Layouts',  body: 'Every booth is planned to support visitor entry, product explanation, lead capture and sales conversations so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',          body: 'We collect your exhibition name, booth size, floor plan, open sides, brand guidelines, product details, budget range, venue and timeline.' },
    { step: '02', title: 'Space Planning',            body: 'We define the booth zones: reception, product display, demo, meeting area, branding walls, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',          body: 'You receive a 3D visual showing the proposed structure, branding, counters, displays, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',          body: 'Once the concept is approved, we prepare the quotation and scope of work so you know what is included before production starts.' },
    { step: '05', title: 'Fabrication & Branding',    body: 'The booth elements and graphics are produced according to the approved design, material plan and timeline.' },
    { step: '06', title: 'Logistics & Installation',  body: 'The stall is transported to the Noida or Greater Noida exhibition venue and installed by the execution team. Final checks are completed before handover.' },
    { step: '07', title: 'Dismantling & Exit',        body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which is the best exhibition stand builder in Noida?', a: 'The best exhibition stand builder for your Noida project is the one that understands your brand, booth size, product category, venue rules, budget and show timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Noida and Greater Noida trade shows.' },
    { q: 'Do you provide exhibition stall design for India Expo Centre & Mart, Greater Noida?', a: 'Yes. We support exhibition stall planning and execution for events at India Expo Centre & Mart, Greater Noida, including custom stalls, modular booths, product display stalls and larger exhibition stands.' },
    { q: 'Do you work at Expocentre Noida, Sector 62?', a: 'Yes. We can support exhibition stall design, fabrication, branding and installation for shows, conferences and B2B events at Expocentre Noida in Sector 62.' },
    { q: 'Can you create a 3D stall design before production?', a: 'Yes. We can prepare a 3D stall design so your team can review the booth layout, branding, counters, product display, lighting and visitor movement before fabrication begins.' },
    { q: 'What is the cost of an exhibition stall in Noida?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning our Noida exhibition stand?', a: 'For most custom stalls, planning should begin at least 30 to 60 days before the exhibition. Larger structures, premium finishes, machinery displays or special approvals may require more time.' },
    { q: 'Do you offer turnkey exhibition stand services?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Can you handle small booths and large custom stands?', a: 'Yes. We can support small shell scheme booths, modular stalls, custom-built stands, product display booths, inline stalls and large island-style exhibition stands.' },
    { q: 'Do you work with exhibitors from outside Noida?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Noida and Greater Noida exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stand Builders in Noida',
  schemaAreaServed: 'Noida',
}
