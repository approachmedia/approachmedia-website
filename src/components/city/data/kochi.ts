import type { CityPageData } from '../types'
import { buildCityShows } from './shows'

const shows = buildCityShows(/kochi|cochin/i)

export const kochiData: CityPageData = {
  citySlug: 'kochi',
  metaTitle: 'Exhibition Stall Design in Kochi | Stall Fabrication & 3D Booth Design',
  metaDescription: 'Approach Media Pvt Ltd provides exhibition stall design, 3D booth design, fabrication, branding, installation and turnkey exhibition services for Kochi trade shows, conferences and expos.',
  canonicalPath: '/exhibition-stall-design-kochi',

  eyebrow: 'Kochi Exhibition Stall Design & Fabrication',
  h1Line1: 'Exhibition Stall Design in Kochi for',
  h1Highlight: 'Industrial, Healthcare, Marine and Corporate Expos',
  subtitle: 'Approach Media Pvt Ltd helps exhibitors create custom exhibition stalls for Kochi trade shows, B2B expos, marine events, healthcare exhibitions, energy expos, hospitality shows, technology conferences and art-led showcases. From 3D stall concepts and fabrication to branding, venue coordination, installation and dismantling, we manage the complete exhibition workflow.',
  trustPills: ['Custom exhibition stall design', '3D booth visualization', 'Stall fabrication and branding', 'Adlux, KINFRA and Bolgatty execution support', 'Turnkey exhibition management'],

  introHeading: 'Exhibition Stall Design and Fabrication Support for Kochi Trade Shows',
  introP1: 'Kochi is one of Kerala\'s most important exhibition, business and cultural destinations. The city connects industrial buyers, healthcare professionals, marine businesses, hospitality brands, technology leaders, renewable energy companies, furniture manufacturers, artists and tourism audiences. With venues such as Adlux International Convention & Exhibition Centre, KINFRA International Exhibition Centre, Chakolas Pavilion, Grand Hyatt Kochi Bolgatty, Bolgatty Palace Event Centre and heritage locations across Fort Kochi and Mattancherry, the city supports both B2B exhibitions and high-profile cultural events.',
  introP2: 'Approach Media Pvt Ltd supports exhibitors with exhibition stall design in Kochi, including 3D booth design, fabrication, branding, logistics, installation and dismantling. Whether your company is participating in India International Industrial Expo, Hospex, FoodTech & HotelTech Kerala, KREEPA Green Power Expo, India Boat & Marine Show, FIFEX or a corporate conference at Bolgatty, we plan your booth around your brand, products, venue format, visitor profile and business objective.',

  standOutHeading: 'Build a Stall That Works for Healthcare, Marine, Industrial and Conference Exhibitions',
  standOut: [
    { title: 'Premium display finishes',          body: 'Polished, high-quality booth presentation for Bolgatty conferences, marine showcases and healthcare expos.' },
    { title: 'Healthcare-grade booth design',     body: 'Clean, professional and information-rich stalls for medical devices, diagnostics and hospital supply brands at Hospex.' },
    { title: 'Marine & luxury brand visuals',     body: 'Premium marine themes and high-quality finishing for India Boat & Marine Show and luxury product showcases.' },
    { title: 'Industrial machinery display',      body: 'Durable layouts with demo zones, technical panels and buyer counters for Adlux industrial exhibitions.' },
    { title: 'Hospitality & food tech booths',    body: 'Demo-friendly displays with equipment zones, sampling counters and hotel/restaurant buyer meeting spaces.' },
    { title: 'Renewable energy product display',  body: 'Solar, green energy and electrical equipment booths with specification panels and project graphics.' },
  ],

  services: [
    { num: '01', title: 'Custom Exhibition Stall Design',       body: 'We design exhibition stalls based on your booth size, open sides, product category, venue format, visitor profile, brand guidelines and exhibition objective.' },
    { num: '02', title: '3D Stall Design & Visualization',      body: 'Before production begins, we create a 3D stall design so your team can review the booth structure, branding, product display, demo areas, furniture, lighting and visitor flow.' },
    { num: '03', title: 'Exhibition Stall Fabrication',         body: 'Custom stalls, modular booths, shell scheme upgrades, counters, partitions, display walls, backlit graphics, product showcases and premium booth elements.' },
    { num: '04', title: 'Branding & Graphics Production',       body: 'Fascia branding, wall graphics, product panels, backdrops, standees, counter branding, directional signage and LED-ready artwork.' },
    { num: '05', title: 'Turnkey Exhibition Solutions',         body: 'One coordinated partner for concept, 3D design, estimation, fabrication, graphics, logistics, venue installation, final checks and post-show dismantling.' },
    { num: '06', title: 'Conference & Premium Display Booths',  body: 'For Bolgatty, Grand Hyatt and conference venues, we plan compact, polished and high-impact displays for senior business audiences and premium events.' },
  ],

  venueIntro: 'Kochi has a diverse mix of exhibition venues — from large convention centres and industrial halls to premium island properties and heritage heritage sites. Each venue has its own technical requirements, access conditions and audience profile.',
  venueIntro2: 'Approach Media Pvt Ltd plans exhibition stalls with these venue details in mind so your booth is visually strong, practical to install and ready before show opening.',
  venues: [
    {
      name: 'Adlux International Convention & Exhibition Centre',
      imageUrl: '/images/venues/adlux-kochi.jpg',
      description: 'Adlux International Convention & Exhibition Centre, located in Karukutty near Angamaly, is one of Kerala\'s largest exhibition and convention venues. It is suitable for major industrial, commercial, consumer and large-format expo setups including India International Industrial Expo.',
      bestFor: [
        'India International Industrial Expo',
        'Industrial and manufacturing exhibitions',
        'Engineering and machinery trade shows',
        'Renewable energy and electrical equipment expos',
        'Furniture, woodwork and consumer exhibitions',
        'Large-format public and B2B trade events',
      ],
      ctaLabel: 'Plan My Stall at Adlux Exhibition Centre',
    },
    {
      name: 'KINFRA International Exhibition Centre, Kalamassery',
      imageUrl: '/images/venues/kinfra-kochi.jpg',
      description: 'KINFRA International Exhibition Centre in Kalamassery is a key venue for specialized B2B trade shows, healthcare expos, hospitality exhibitions, food technology events and industry-focused gatherings including Hospex and FoodTech & HotelTech Kerala.',
      bestFor: [
        'Hospex — healthcare and medical innovation exhibition',
        'FoodTech & HotelTech Kerala',
        'Food processing and kitchen technology expos',
        'Hospitality and hotel supply exhibitions',
        'Specialized B2B trade shows',
      ],
      ctaLabel: 'Plan My Stall at KINFRA Exhibition Centre',
    },
    {
      name: 'Grand Hyatt Kochi Bolgatty & Bolgatty Palace',
      imageUrl: '/images/venues/bolgatty-kochi.jpg',
      description: 'Grand Hyatt Kochi Bolgatty and Bolgatty Palace Event Centre on Bolgatty Island are premium venues for high-profile conferences, luxury showcases, marine events, corporate symposiums, global meetings and premium brand activations including Gartner IT Symposium and India Boat & Marine Show.',
      bestFor: [
        'Gartner IT Symposium/Xpo — enterprise technology',
        'India Boat & Marine Show — boating and marine industry',
        'High-profile corporate conferences and luxury showcases',
        'Global technology and CIO events',
        'Marine, yacht and water sports industry events',
      ],
      ctaLabel: 'Plan My Stall at Bolgatty',
    },
    {
      name: 'Chakolas Pavilion Event Centre, Kalamassery',
      imageUrl: '/images/venues/chakolas-kochi.jpg',
      description: 'Chakolas Pavilion Event Centre is a mid-to-large Kochi venue suited for focused medical, technology, commercial and business exhibitions. It is suitable for compact and mid-scale stalls that need strong brand visibility and clear visitor flow.',
      bestFor: [
        'Medical and healthcare events',
        'Technology and commercial exhibitions',
        'Dealer and distributor meets',
        'Corporate product showcases',
        'Regional B2B trade events',
      ],
      ctaLabel: 'Plan My Stall at Chakolas Pavilion',
    },
    {
      name: 'Fort Kochi & Mattancherry Heritage Sites',
      imageUrl: '/images/venues/fort-kochi.jpg',
      description: 'Fort Kochi and Mattancherry are used as site-responsive heritage venues for Kochi-Muziris Biennale — India\'s leading international contemporary art exhibition. Display planning here must be sensitive to heritage context, footfall, curation and installation requirements.',
      bestFor: [
        'Kochi-Muziris Biennale support and sponsor activations',
        'Art-led installations and cultural showcases',
        'Site-responsive display environments',
        'Design-led brand presentations',
        'Temporary heritage-context displays',
      ],
      ctaLabel: 'Discuss Heritage-Site Exhibition Display',
    },
  ],

  shows,

  industries: [
    { title: 'Industrial, Manufacturing & Engineering',   body: 'We design durable, product-led stalls for machinery, tools, automation, engineering solutions and manufacturing brands participating in Kochi industrial expos at Adlux.' },
    { title: 'Healthcare & Medical Innovation',           body: 'For Hospex and healthcare events, we create clean, professional booths for medical devices, hospital equipment, diagnostics, healthcare technology and supplier brands.' },
    { title: 'IT, Enterprise Technology & Conferences',  body: 'For technology conferences and CIO events at Bolgatty, we plan premium display booths with screens, demo counters, consultation spaces and enterprise-friendly communication.' },
    { title: 'Marine, Boating & Water Sports',           body: 'For India Boat & Marine Show, we create premium visual environments for marine equipment, yachts, boating brands, water sports companies and luxury marine services.' },
    { title: 'Hospitality, Food Processing & Kitchen Technology', body: 'For FoodTech & HotelTech Kerala at KINFRA, we design practical booths for food processing machinery, kitchen technology, hotel supplies, appliances, ingredients and hospitality service providers.' },
    { title: 'Renewable Energy & Electrical Equipment',  body: 'For KREEPA Green Power Expo, we plan booths for solar, green energy, electrical equipment, batteries, energy storage and sustainability brands.' },
    { title: 'Furniture, Design & Woodwork',             body: 'For FIFEX, we design display-led booths for furniture, interiors, woodwork, decor, surfaces, materials and manufacturing suppliers.' },
    { title: 'Art, Culture & Experiential Displays',     body: 'For Kochi-Muziris Biennale and heritage-site events, we support display, sponsor activation and site-responsive exhibition requirements with sensitive and minimal design planning.' },
  ],

  whyUs: [
    { title: 'Diverse Exhibition Expertise',   body: 'Kochi covers industrial, healthcare, marine, IT, hospitality, energy, furniture and art exhibitions across very different venue formats. We plan each stall around the specific event and audience.' },
    { title: 'Practical 3D Design',           body: 'Our 3D concepts are planned for real exhibition use — visibility, walking space, display areas, demo points, meeting counters, storage and visitor interaction.' },
    { title: 'Complete Coordination',         body: 'One team for design, fabrication, graphics, logistics, installation and dismantling, keeping communication clearer and reducing last-minute confusion.' },
    { title: 'Clear Scope & Budget',          body: 'We define what is included before production — structure, materials, graphics, lighting, furniture, transport, installation and dismantling where applicable.' },
    { title: 'Premium Venue Execution',       body: 'For Bolgatty, Grand Hyatt and conference venues, we plan polished, compact and high-impact booths suited to senior decision-maker and international audiences.' },
    { title: 'Lead-Focused Layouts',          body: 'Every booth is planned to support visitor entry, product explanation, enquiry capture and sales discussions so your team works better during the exhibition.' },
  ],

  process: [
    { step: '01', title: 'Exhibition Brief',         body: 'We collect your exhibition name, booth size, floor plan, venue, open sides, brand guidelines, product details, design references, budget and timeline.' },
    { step: '02', title: 'Space Planning',           body: 'We define key booth zones such as reception, demo area, product display, meeting area, branding wall, storage and visitor movement.' },
    { step: '03', title: '3D Stall Concept',         body: 'You receive a 3D visual showing the proposed booth structure, counters, display areas, digital screens, lighting, graphics and furniture placement.' },
    { step: '04', title: 'Scope & Estimate',         body: 'Once the design direction is approved, we share a clear quotation and scope of work so you understand what is included.' },
    { step: '05', title: 'Fabrication & Branding',   body: 'The stall elements and graphics are produced according to the approved design, material plan and project schedule.' },
    { step: '06', title: 'Logistics & Installation', body: 'The booth is transported to the Kochi venue and installed by the execution team. Final checks are done before handover.' },
    { step: '07', title: 'Dismantling & Exit',       body: 'After the exhibition, we manage dismantling and removal as per venue and organizer instructions.' },
  ],

  faqs: [
    { q: 'Which are the major exhibition venues in Kochi?', a: 'Major Kochi exhibition venues include Adlux International Convention & Exhibition Centre, KINFRA International Exhibition Centre, Chakolas Pavilion Event Centre, Grand Hyatt Kochi Bolgatty, Bolgatty Palace Event Centre and heritage sites across Fort Kochi and Mattancherry.' },
    { q: 'Do you provide stall design for Hospex and FoodTech & HotelTech Kerala?', a: 'Yes. Approach Media Pvt Ltd can support healthcare, medical, hospitality, food processing and kitchen technology exhibitors with 3D stall design, fabrication, branding, installation and dismantling.' },
    { q: 'Can you design stalls for India Boat & Marine Show?', a: 'Yes. We can plan premium booth designs for marine, yacht, boating, water sports and marine equipment exhibitors.' },
    { q: 'Can you support Kochi-Muziris Biennale display requirements?', a: 'Yes. We can support site-responsive display planning, sponsor activations and temporary exhibition structures where permitted by event and venue guidelines.' },
    { q: 'Do you design conference booths for Gartner IT Symposium at Bolgatty?', a: 'Yes. We can plan premium conference-style display booths for technology, enterprise IT and corporate conference events at Bolgatty and Grand Hyatt Kochi.' },
    { q: 'What is the cost of an exhibition stall in Kochi?', a: 'The cost depends on booth size, venue, design complexity, materials, branding, lighting, furniture, technology, logistics and installation requirements. Share your details to receive a customized estimate.' },
    { q: 'Do you offer turnkey exhibition stall services in Kochi?', a: 'Yes. Approach Media Pvt Ltd can manage the full process from brief, 3D design, fabrication and branding to transport, venue installation and dismantling.' },
    { q: 'Do you work with exhibitors from outside Kochi or India?', a: 'Yes. We can coordinate remotely with companies from other Indian cities or overseas that are participating in Kochi exhibitions. Design approvals, scope finalization and planning can be handled before on-site execution.' },
    { q: 'What details do you need to begin the stall design?', a: 'We need your exhibition name, booth size, floor plan, open sides, venue, brand logo, product details, design references, budget range, required deliverables and timeline.' },
  ],

  schemaName: 'Exhibition Stall Design in Kochi',
  schemaAreaServed: 'Kochi',
}
