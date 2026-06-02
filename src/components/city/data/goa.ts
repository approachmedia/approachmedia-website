import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

const shows = buildCityShows(/goa/i)

export const goaData: CityPageData = {
  citySlug: 'goa',
  metaTitle: 'Exhibition Stall Design in Goa | Stall Fabrication & 3D Booth Design',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D booth design, fabrication, branding, installation and turnkey exhibition services for Goa trade shows, hospitality expos, pharma expos and energy exhibitions.',
  canonicalPath: '/exhibition-stall-design-goa',

  eyebrow: 'Goa Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Goa for',
  h1Highlight: 'Hospitality, Pharma, Energy and Tourism Trade Shows',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Goa trade shows, hospitality fairs, pharma and lab expos, renewable energy events, travel marts and corporate conferences. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Panaji, Bambolim and Dona Paula venue support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Goa Trade Shows',
  introP1: 'Goa is a high-value exhibition and conference destination for hospitality, interiors, tourism, renewable energy, pharma, laboratory technology, energy, lifestyle and corporate sectors. With venues such as Dr. Shyama Prasad Mukherjee Indoor Stadium in Panaji, Goa Convention & Exhibition Centre in Bambolim and International Centre Goa in Dona Paula, the state attracts exhibitors, buyers, hoteliers, architects, tourism professionals, pharma suppliers, energy companies and government-industry audiences.',
  introP2: 'Approach Media Pvt Ltd supports exhibitors with exhibition stall design in Goa, including 3D booth design, fabrication, branding, logistics, installation and dismantling. Whether you are participating in HIDE, Restart Energy India Expo, Goa Pharma and Lab Expo, India Travel Mart Goa, India Energy Week or a specialized conference, we plan your booth around your brand, products, venue format and visitor objective.',

  standOutHeading: 'Build a Stall That Works for Hospitality, Pharma, Energy and Tourism Exhibitions',
  standOut: [
    { title: 'Premium hospitality-led design',     body: 'Warm, display-rich booths for furniture, lighting, surfaces and hotel interior brands at HIDE.' },
    { title: 'Clean pharma & lab booths',          body: 'Technical, compliance-focused layouts for pharma packaging, lab equipment and chemical brands.' },
    { title: 'Renewable energy product display',   body: 'Solar and clean energy booths with technical panels, demo counters and institutional buyer meeting spaces.' },
    { title: 'Destination-led tourism stands',     body: 'Visitor-friendly travel and tourism booths with brochure displays, itinerary screens and meeting tables.' },
    { title: 'Corporate & conference displays',    body: 'Professional, compact display booths for India Energy Week and senior decision-maker audiences.' },
    { title: 'Lead-focused visitor flow',          body: 'Every booth is designed to support product explanation, enquiry capture and buyer conversations.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',       body: 'We design exhibition stalls based on your booth size, open sides, product category, venue format, visitor profile, brand guidelines and exhibition objective.' },
    { num: '02', title: '3D Stall Design & Visualization',      body: 'Before production begins, we create a 3D stall design so your team can review structure, branding, display zones, furniture, lighting and visitor flow.' },
    { num: '03', title: 'Exhibition Stall Fabrication',         body: 'Custom stalls, modular booths, shell scheme upgrades, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements.' },
    { num: '04', title: 'Branding & Graphics Production',       body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',         body: 'One coordinated partner for concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, final checks and post-show dismantling.' },
    { num: '06', title: 'Premium Conference & MICE Booths',     body: 'For Goa\'s conference and MICE venues, we create compact, professional and premium display booths suited for business networking and high-level decision-maker audiences.' },
  ],

  venueIntro: 'Goa\'s exhibition venues serve very different audience types — from large indoor trade halls and dedicated MICE centres to boutique conference venues. Stall planning must consider venue format, visitor profile, weather conditions and organizer guidelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Dr. Shyama Prasad Mukherjee Indoor Stadium, Panaji',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/spm-stadium-goa.jpg',
      description: 'Dr. Shyama Prasad Mukherjee Indoor Stadium is Goa\'s premier multipurpose indoor arena and is used for large-scale exhibitions, hospitality design fairs, pharma and lab expos, public events and major indoor trade shows including HIDE and Goa Pharma and Lab Expo.',
      bestFor: [
        'Hospitality Interior & Design Expo (HIDE)',
        'Goa Pharma and Lab Expo',
        'Furniture, lighting and surfacing exhibitions',
        'Pharma packaging and laboratory supply displays',
        'Large indoor trade shows and consumer expos',
      ],
      ctaLabel: 'Plan My Stall at Dr. SPM Indoor Stadium',
    },
    {
      name: 'Goa Convention & Exhibition Centre, Bambolim',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/gcc-bambolim-goa.jpg',
      description: 'Goa Convention & Exhibition Centre near Goa University is a dedicated MICE facility suited for expos, conferences, seminars, energy events and business exhibitions including Restart Energy India Expo.',
      bestFor: [
        'Restart Energy India Expo — renewable energy and solar',
        'Environmental technology expos',
        'Corporate conferences and business exhibitions',
        'Government-industry MICE events',
        'Trade events and professional gatherings',
      ],
      ctaLabel: 'Plan My Stall at Goa Convention & Exhibition Centre',
    },
    {
      name: 'International Centre Goa, Dona Paula',
      imageUrl: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/venues/icg-dona-paula-goa.jpg',
      description: 'International Centre Goa is a hub for specialized conferences, seminars and focused trade events. It is suitable for compact, polished and information-led booth formats for education, policy, business forums and boutique trade exhibitions.',
      bestFor: [
        'Specialized conferences and seminars',
        'Education, policy and business forums',
        'Boutique trade exhibitions',
        'Professional and institutional gatherings',
        'Corporate product launches',
      ],
      ctaLabel: 'Plan My Stall at International Centre Goa',
    },
  ],

  shows,

  industries: [
    { title: 'Hospitality, Interiors & Design',             body: 'Goa\'s hospitality sector makes it a strong market for furniture, lighting, surfacing, decor, furnishings, hotel supplies and design-led exhibitions. We create premium display booths for hospitality and interior brands.' },
    { title: 'Renewable Energy & Environmental Technology', body: 'For Restart Energy India Expo and energy-focused events, we design booths for solar, clean energy, environmental technology, electrical equipment and sustainability brands.' },
    { title: 'Pharma, Laboratory & Chemical Analysis',      body: 'For Goa Pharma and Lab Expo, we create clean, technical booths for pharma packaging machinery, lab supplies, analytical instruments, chemicals and healthcare-related businesses.' },
    { title: 'Travel, Tourism & Destination Marketing',     body: 'For India Travel Mart Goa, we design visitor-friendly booths for tourism boards, hotels, resorts, tour operators, travel products and destination marketing companies.' },
    { title: 'Energy, Oil, Gas & Government-Industry',      body: 'For India Energy Week and similar conferences, we plan corporate, professional and high-impact display spaces for energy, petroleum, gas, infrastructure and innovation brands.' },
    { title: 'Lifestyle & Consumer Products',              body: 'Goa\'s event market also supports lifestyle, retail, wellness, food, beverage and leisure-focused exhibitions. We create attractive, browsing-friendly stalls for consumer audiences.' },
  ],

  whyUs: [
    { title: 'Multi-Sector Goa Expertise',  body: 'Goa exhibitions range from premium hospitality and pharma trade fairs to energy conferences and travel marts. We plan each stall around the specific event format, audience and venue.' },
    { title: 'Practical 3D Design',        body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, display areas, demo points, meeting counters, storage and visitor interaction.' },
    { title: 'Complete Coordination',      body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, keeping communication clearer and reducing last-minute confusion.' },
    { title: 'Clear Scope & Budget',       body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',      body: 'Goa exhibition grounds require practical planning for indoor or open-format venues, weather conditions, electrical setup, goods movement and organizer timelines.' },
    { title: 'Lead-Focused Layouts',       body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Goa venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which are the major exhibition venues in Goa?', a: 'Major Goa exhibition venues include Dr. Shyama Prasad Mukherjee Indoor Stadium in Panaji, Goa Convention & Exhibition Centre in Bambolim and International Centre Goa in Dona Paula.' },
    { q: 'Do you provide stall design for Hospitality Interior & Design Expo?', a: 'Yes. Approach Media Pvt Ltd can support furniture, furnishings, lighting, surfacing, decor and hospitality brands with 3D stall design, fabrication, branding and installation.' },
    { q: 'Can you design stalls for Goa Pharma and Lab Expo?', a: 'Yes. We can design clean and technical booths for pharma packaging machinery, laboratory supplies, analytical instruments, chemicals and related businesses.' },
    { q: 'Do you support Restart Energy India Expo and India Energy Week?', a: 'Yes. We can create professional exhibition stalls for renewable energy, solar, environmental technology, petroleum, gas, infrastructure and energy innovation brands.' },
    { q: 'Can you create travel and tourism booths for India Travel Mart Goa?', a: 'Yes. We design destination-led and visitor-friendly booths for travel, tourism, hospitality, resort, hotel and tour operator brands.' },
    { q: 'What is the cost of an exhibition stall in Goa?', a: 'The cost depends on booth size, venue, design complexity, materials, branding, lighting, furniture, technology, logistics and installation requirements. Share your details to receive a customized estimate.' },
    { q: 'Do you offer turnkey exhibition stall services in Goa?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Do you support exhibitors from outside Goa or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Goa exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Design in Goa',
  schemaAreaServed: 'Goa',
}
