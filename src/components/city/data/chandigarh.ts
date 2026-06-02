import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

const shows = buildCityShows(/chandigarh/i)

export const chandigarhData: CityPageData = {
  citySlug: 'chandigarh',
  metaTitle: 'Exhibition Stall Design in Chandigarh | PharmaTech Expo Stall Builder',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D booth design, fabrication, branding, installation and turnkey exhibition support for PharmaTech Expo, CII AgroTech, MACHMA Expo and other trade shows in Chandigarh.',
  canonicalPath: '/exhibition-stall-design-chandigarh',

  eyebrow: 'Chandigarh Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Chandigarh for',
  h1Highlight: 'PharmaTech, AgroTech, MACHMA and North India Trade Shows',
  subtitle: 'Approach Media Pvt Ltd helps pharma, lab, agriculture, industrial machinery, interiors, EV, hydroponics, coatings and lifestyle brands design and execute custom exhibition stalls for Chandigarh trade shows. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow so your team can focus on visitors, demos, meetings and qualified enquiries.',
  trustPills: ['PharmaTech, AgroTech and MACHMA stall design', '3D booth visualization', 'Stall fabrication and branding', 'Parade Ground Sector 17 execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Chandigarh Trade Shows',
  introP1: 'Chandigarh is an important exhibition location for brands targeting North India, especially Punjab, Haryana, Himachal Pradesh, Jammu & Kashmir, Uttarakhand and the wider industrial, agriculture and pharma-manufacturing belt around Baddi, Panchkula, Mohali and nearby business markets. For pharma, lab technology, agriculture, machinery, hydroponics, EV, coatings, architecture, interiors and lifestyle companies, Chandigarh provides a practical meeting point for buyers, distributors, manufacturers, farmers, consultants, retailers and decision-makers.',
  introP2: 'Approach Media Pvt Ltd supports exhibitors with complete exhibition stall design in Chandigarh, including 3D stall design, fabrication, branding, logistics, venue installation and dismantling. Whether your company is participating in PharmaTech & LabTech Expo, CII AgroTech India, MACHMA Expo, Ins/Outs, India International Hydroponics Tech Expo, Electric Vehicle Expo, Surface Engineering and Coating Tech Expo or a lifestyle exhibition at Kisan Bhawan, we plan the booth around your product category, visitor profile, budget and exhibition objective.',

  standOutHeading: 'Build a Stall That Works for Pharma, Agri, Industrial and Lifestyle Exhibitions',
  standOut: [
    { title: 'PharmaTech-ready booth design',     body: 'Clean, professional stalls for pharma machinery, lab equipment, analytical instruments, packaging and API businesses.' },
    { title: 'Agri & machinery display zones',    body: 'Practical layouts for CII AgroTech, MACHMA and industrial trade shows with demo zones and buyer counters.' },
    { title: 'Technical feature panels',          body: 'Clear product communication for specifications, certifications, process flow and buyer-ready information.' },
    { title: 'Premium conference displays',       body: 'Compact, polished booths for hotel and conference venue formats across Chandigarh.' },
    { title: 'Storage & team working space',      body: 'Practical back-of-stall areas for catalogues, samples and exhibition team needs.' },
    { title: 'Lead-focused visitor flow',         body: 'Booth layouts that support enquiry capture, product explanation and dealer or institutional buyer conversations.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',  body: 'We design exhibition stalls based on your booth size, open sides, product category, visitor profile, brand guidelines and exhibition objective — planned for visibility, product explanation and team usability.' },
    { num: '02', title: '3D Stall Design & Visualization', body: 'Before production begins, we create a 3D stall design so your team can review the booth structure, branding, display zones, demo areas, furniture, lighting and visitor flow before fabrication starts.' },
    { num: '03', title: 'Exhibition Stall Fabrication',    body: 'Custom stalls, modular booths, shell scheme upgrades, display walls, counters, partitions, product showcases, backlit graphics and premium booth elements with clean finishing and stable construction.' },
    { num: '04', title: 'Branding & Graphics Production',  body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',    body: 'One coordinated partner from brief to dismantling — concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, final checks and post-show removal.' },
    { num: '06', title: 'Modular & Rental Booth Options',  body: 'Faster, budget-conscious modular and rental-style exhibition booths that maintain brand impact while keeping execution practical.' },
  ],

  venueIntro: 'Chandigarh has distinct exhibition grounds suited to different trade show formats. Stall planning must account for open-ground conditions, temporary structure requirements, organizer rules, electrical planning and dismantling timelines.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Parade Ground, Sector 17',
      imageUrl: '/images/venues/parade-ground-chandigarh.jpg',
      description: 'Parade Ground, Sector 17 is one of Chandigarh\'s most important exhibition venues for large B2B and public trade events. It is centrally located near ISBT, accessible for exhibitors from Chandigarh, Panchkula, Mohali and surrounding North Indian markets. Key events include PharmaTech & LabTech Expo, CII AgroTech India, MACHMA Expo and Ins/Outs Architecture & Interiors Show.',
      bestFor: [
        'PharmaTech & LabTech Expo — pharma and lab technology',
        'CII AgroTech India — agriculture technology and farm innovation',
        'MACHMA Expo — industrial machinery and manufacturing',
        'Ins/Outs — architecture, building materials and interiors',
        'Large B2B and public-facing exhibitions',
      ],
      ctaLabel: 'Plan My Stall at Parade Ground Sector 17',
    },
    {
      name: 'Exhibition Ground, Sector 34',
      imageUrl: '/images/venues/sector34-chandigarh.jpg',
      description: 'Exhibition Ground, Sector 34 is suited for technology, mobility, agriculture innovation, surface engineering and public exhibition formats. It hosts India International Hydroponics Tech Expo, Electric Vehicle Expo and Surface Engineering and Coating Tech Expo.',
      bestFor: [
        'India International Hydroponics Tech Expo',
        'Electric Vehicle Expo — EV and green mobility',
        'Surface Engineering and Coating Tech Expo',
        'Auto, renewable energy and clean technology showcases',
        'Regional business and technology expos',
      ],
      ctaLabel: 'Plan My Stall at Sector 34 Exhibition Ground',
    },
    {
      name: 'Kisan Bhawan',
      imageUrl: '/images/venues/kisan-bhawan-chandigarh.jpg',
      description: 'Kisan Bhawan is relevant for lifestyle, shopping and festive exhibitions in Chandigarh. These events are consumer-facing and often include designer clothing, festive collections, lifestyle products, home products, decor, gifting, accessories and retail brands.',
      bestFor: [
        'Lifestyle and festive shopping expos',
        'Designer clothing and fashion exhibitions',
        'Home, decor and gifting showcases',
        'Jewellery, accessories and festive collections',
        'Retail and consumer product stalls',
      ],
      ctaLabel: 'Plan My Stall at Kisan Bhawan',
    },
    {
      name: 'Conference Hotels & Business Venues, Chandigarh',
      imageUrl: '/images/venues/chandigarh-conference-venues.jpg',
      description: 'Along with exhibition grounds, Chandigarh also hosts business conferences, dealer meets, healthcare events and product launches at hotels, auditoriums and convention venues. These events often require compact, polished and brand-led display booths.',
      bestFor: [
        'Pharma conferences and medical product launches',
        'Dealer and distributor meetings',
        'Lab equipment showcases',
        'Corporate exhibitions and buyer-seller meets',
        'Association-led professional events',
      ],
      ctaLabel: 'Discuss My Chandigarh Conference Booth',
    },
  ],

  shows,

  industries: [
    { title: 'Pharmaceuticals & Pharma Machinery',           body: 'Chandigarh\'s proximity to Baddi, Panchkula, Mohali and North India\'s pharma manufacturing belt makes it important for pharma machinery and technology exhibitors. We design stalls that present machines, process capabilities and compliance-focused communication clearly.' },
    { title: 'Laboratory, Analytical & Research Equipment',  body: 'For lab equipment, testing instruments, consumables, microbiology, biotechnology and research solution providers, we create clean, technical booth layouts that support product demos and professional buyer conversations.' },
    { title: 'Packaging & Processing Technology',            body: 'Packaging exhibitors need stalls that help visitors understand machinery, materials, samples and production capabilities. We plan booth layouts for packaging displays, machine demos, sample walls and process graphics.' },
    { title: 'APIs, Chemicals & Nutraceuticals',             body: 'For API, chemical, fragrance, nutraceutical and formulation businesses, we design professional B2B booths with product category communication, certifications, meeting counters and clear enquiry flow.' },
    { title: 'Architecture, Building Products & Interiors',  body: 'Chandigarh\'s Ins/Outs show creates demand for display-led stalls for building materials, interiors, surfaces, hardware, doors, windows, lighting and decor brands.' },
    { title: 'Agriculture Technology & Farm Innovation',     body: 'CII AgroTech India and hydroponics exhibitions make Chandigarh relevant for agri-tech, farm machinery, controlled-environment agriculture, irrigation, dairy-linked farming and farm innovation brands.' },
    { title: 'Industrial Machinery & Automation',            body: 'MACHMA Expo creates strong demand for machine tools, industrial machinery, manufacturing technology, automation, cutting, welding, fabrication and engineering product stalls.' },
    { title: 'Auto, EV & Renewable Energy',                  body: 'Sector 34 exhibitions attract EV, renewable energy and auto product brands. We create modern, demo-friendly booths for vehicles, charging products, solar solutions and energy technologies.' },
    { title: 'Surface Engineering, Coatings & Anti-Corrosion', body: 'For surface preparation, coatings, industrial finishing and anti-corrosion technology companies, we design technical booths with sample displays, application panels and meeting counters.' },
    { title: 'Lifestyle, Fashion & Festive Retail',          body: 'Kisan Bhawan lifestyle and festive shopping expos are useful for designer clothing, accessories, home decor, gifting, festive products and retail brands. We create attractive, browsing-friendly stalls for walk-in shoppers.' },
  ],

  whyUs: [
    { title: 'B2B & Consumer Exhibition Planning', body: 'Chandigarh exhibitions cover pharma, lab, agriculture, machinery, interiors, EV, hydroponics, coatings and lifestyle retail. The stall supports technical explanation, product display, buyer meetings, public interaction and lead capture depending on the event format.' },
    { title: 'Practical 3D Design',               body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, display areas, demo points, meeting counters, storage and visitor interaction.' },
    { title: 'Complete Coordination',             body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, keeping communication clearer and reducing last-minute confusion.' },
    { title: 'Clear Scope & Budget',              body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Venue-Aware Execution',             body: 'Chandigarh exhibition grounds require practical planning for temporary structures, weather conditions, electricity, lighting, goods movement and organizer timelines.' },
    { title: 'Lead-Focused Layouts',              body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Chandigarh venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Where is PharmaTech Expo Chandigarh held?', a: 'PharmaTech & LabTech Expo Chandigarh is listed for Parade Ground, Sector 17, Chandigarh, near ISBT. The 2026 edition was listed for 9 to 11 April 2026.' },
    { q: 'Do you provide stall design for PharmaTech Expo Chandigarh?', a: 'Yes. Approach Media Pvt Ltd can support PharmaTech exhibitors with 3D stall design, fabrication, branding, display planning, installation and dismantling support.' },
    { q: 'Which exhibitions are held at Parade Ground, Sector 17?', a: 'Parade Ground, Sector 17 is associated with PharmaTech & LabTech Expo, CII AgroTech India, MACHMA Expo and Ins/Outs Architecture & Interiors Show.' },
    { q: 'Which exhibitions are held at Exhibition Ground, Sector 34?', a: 'Exhibition Ground, Sector 34 is useful for India International Hydroponics Tech Expo, Electric Vehicle Expo and Surface Engineering and Coating Tech Expo.' },
    { q: 'Do you design stalls for Kisan Bhawan lifestyle and festive shopping expos?', a: 'Yes. We can design retail-friendly stalls for lifestyle, festive shopping, designer clothing, accessories, home products, decor, gifting and consumer brands.' },
    { q: 'Can you design stalls for pharma machinery and lab equipment companies?', a: 'Yes. We can plan product-led and demo-friendly booths for pharma machinery, lab equipment, analytical instruments, packaging machinery, APIs, chemicals, nutraceuticals and contract manufacturing brands.' },
    { q: 'What is the cost of an exhibition stall in Chandigarh?', a: 'The cost depends on booth size, design complexity, materials, branding quantity, lighting, furniture, technology, logistics and installation requirements. Share your exhibition details to receive a customized estimate.' },
    { q: 'How early should we start planning for PharmaTech Expo Chandigarh?', a: 'For a custom stall, planning should ideally begin at least 30 to 60 days before the exhibition. Larger machinery displays, premium structures or special demo requirements may need more time.' },
    { q: 'Do you offer turnkey exhibition stall services in Chandigarh?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Do you support exhibitors from outside Chandigarh?', a: 'Yes. We can coordinate remotely with companies from other Indian cities that are participating in Chandigarh exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
  ],

  schemaName: 'Exhibition Stall Design in Chandigarh',
  schemaAreaServed: 'Chandigarh',
}
