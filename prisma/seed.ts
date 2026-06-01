import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱  Seeding lookup tables...')

  // ─────────────────────────────────────────────
  // INDUSTRIES
  // ─────────────────────────────────────────────
  const industries = [
    { name: 'Pharmaceuticals',     slug: 'pharmaceuticals',    description: 'Pharma, Biotech, Medical Devices & Life Sciences' },
    { name: 'Manufacturing',       slug: 'manufacturing',      description: 'Industrial Manufacturing, Engineering & Heavy Industry' },
    { name: 'FMCG',                slug: 'fmcg',               description: 'Fast Moving Consumer Goods, Packaged Foods & Beverages' },
    { name: 'Real Estate',         slug: 'real-estate',        description: 'Real Estate, Property Development & Infrastructure' },
    { name: 'Solar / Energy',      slug: 'solar-energy',       description: 'Renewable Energy, Solar, Wind & Power' },
    { name: 'Automotive',          slug: 'automotive',         description: 'Automotive, EV, Mobility & Auto Components' },
    { name: 'IT / Technology',     slug: 'it-technology',      description: 'Information Technology, Software & SaaS' },
    { name: 'Food & Beverage',     slug: 'food-beverage',      description: 'Food Processing, Beverages & Hospitality' },
    { name: 'Textiles & Apparel',  slug: 'textiles-apparel',   description: 'Textile Manufacturing, Garments & Fashion' },
    { name: 'Chemicals',           slug: 'chemicals',          description: 'Specialty Chemicals, Agrochemicals & Plastics' },
    { name: 'Healthcare',          slug: 'healthcare',         description: 'Hospitals, Medical Equipment & Diagnostics' },
    { name: 'Education',           slug: 'education',          description: 'EdTech, Universities & Training Institutes' },
    { name: 'Other',               slug: 'other',              description: 'Miscellaneous Industries' },
  ]

  for (const row of industries) {
    await prisma.industry.upsert({ where: { slug: row.slug }, update: {}, create: row })
  }
  console.log(`   ✓ ${industries.length} industries`)

  // ─────────────────────────────────────────────
  // STALL TYPES
  // ─────────────────────────────────────────────
  const stallTypes = [
    { name: 'Custom Booth',               slug: 'custom-booth',               description: 'Fully bespoke fabricated exhibition booths, designed from scratch' },
    { name: 'Double Decker Mezzanine',    slug: 'double-decker-mezzanine',    description: 'Two-storey stands with a mezzanine level for VIP lounges or storage' },
    { name: 'Modular',                    slug: 'modular',                    description: 'System-based modular stands — reusable, reconfigurable' },
    { name: 'Minimalist',                 slug: 'minimalist',                 description: 'Clean, minimal aesthetic — German or Scandinavian design philosophy' },
    { name: 'Pavilion',                   slug: 'pavilion',                   description: 'Large open-format pavilion structures, often for government bodies or large brands' },
    { name: 'Island Stand',               slug: 'island-stand',               description: 'Four-sided open island configuration with 360° visitor access' },
    { name: 'Inline / Shell Scheme',      slug: 'inline-shell-scheme',        description: 'Linear inline or shell scheme stands with shared walls' },
    { name: 'Outdoor Stall',              slug: 'outdoor-stall',              description: 'Outdoor / open-air exhibition structures with weather proofing' },
    { name: 'Country Pavilion',           slug: 'country-pavilion',           description: 'National or state government pavilions aggregating multiple exhibitors' },
    { name: 'Retail Pop-Up',              slug: 'retail-pop-up',              description: 'Temporary retail activation and branded pop-up store builds' },
  ]

  for (const row of stallTypes) {
    await prisma.stallType.upsert({ where: { slug: row.slug }, update: {}, create: row })
  }
  console.log(`   ✓ ${stallTypes.length} stall types`)

  // ─────────────────────────────────────────────
  // EXHIBITIONS (sample set)
  // ─────────────────────────────────────────────
  const exhibitions = [
    {
      name: 'CPHI India 2024', slug: 'cphi-india-2024',
      venueName: 'Bombay Exhibition Centre', city: 'Mumbai', state: 'Maharashtra',
      startDate: new Date('2024-11-28'), endDate: new Date('2024-11-30'),
      organizer: 'Informa Markets',
    },
    {
      name: 'Renewable Energy India Expo 2024', slug: 'rei-expo-2024',
      venueName: 'India Expo Mart', city: 'Greater Noida', state: 'Uttar Pradesh',
      startDate: new Date('2024-09-04'), endDate: new Date('2024-09-06'),
      organizer: 'Reed Exhibitions',
    },
    {
      name: 'ACETECH Mumbai 2024', slug: 'acetech-mumbai-2024',
      venueName: 'Bombay Exhibition Centre', city: 'Mumbai', state: 'Maharashtra',
      startDate: new Date('2024-11-07'), endDate: new Date('2024-11-10'),
      organizer: 'UBM India',
    },
    {
      name: 'Auto Expo 2025', slug: 'auto-expo-2025',
      venueName: 'Bharat Mandapam', city: 'New Delhi', state: 'Delhi',
      startDate: new Date('2025-01-17'), endDate: new Date('2025-01-22'),
      organizer: 'SIAM / CII',
    },
  ]

  for (const row of exhibitions) {
    await prisma.exhibition.upsert({ where: { slug: row.slug }, update: {}, create: row })
  }
  console.log(`   ✓ ${exhibitions.length} exhibitions`)

  // ─────────────────────────────────────────────
  // DEMO PROJECT (with full SEO + media)
  // ─────────────────────────────────────────────
  const pharma    = await prisma.industry.findUniqueOrThrow({ where: { slug: 'pharmaceuticals' } })
  const dblDecker = await prisma.stallType.findUniqueOrThrow({ where: { slug: 'double-decker-mezzanine' } })
  const cphi      = await prisma.exhibition.findUniqueOrThrow({ where: { slug: 'cphi-india-2024' } })

  const client = await prisma.client.upsert({
    where: { slug: 'sun-pharma' },
    update: {},
    create: {
      name: 'Sun Pharma', slug: 'sun-pharma',
      industryId: pharma.id,
      websiteUrl: 'https://www.sunpharma.com',
      description: 'Sun Pharmaceutical Industries Ltd — India\'s largest pharma company by revenue (NSE: SUNPHARMA).',
    },
  })

  const project = await prisma.project.upsert({
    where: { slug: 'sun-pharma-cphi-india-2024-72sqm-double-decker' },
    update: {},
    create: {
      title:         'Sun Pharma — 72 sqm Double Decker Exhibition Stall, CPHI India 2024',
      slug:          'sun-pharma-cphi-india-2024-72sqm-double-decker',
      stallAreaSqm:  72,
      stallAreaSqft: 775,
      stallHeightM:  4.5,
      floors:        2,
      buildYear:     2024,
      exhibitionId:  cphi.id,
      clientId:      client.id,
      designStyle:   'German Minimalist Corporate',
      materialsUsed: [
        'MS structural frame',
        'tension fabric fascia panels',
        'tempered glass mezzanine balustrade',
        'vinyl-wrapped MDF counters',
        'LED video wall 4×2m',
        'backlit tension fabric walls',
        'laminated plywood flooring',
      ],
      specialFeatures: [
        'double decker mezzanine lounge 24 sqm',
        'enclosed VIP meeting room',
        'product demo counters ×3',
        '4×2m LED video wall',
        'backlit logo fascia',
        'ground floor storage room',
      ],
      aiSummary: `72 sqm double-decker exhibition stall designed and fabricated by Approach Media for Sun Pharma at CPHI India 2024, Bombay Exhibition Centre, Mumbai, 28–30 November 2024. Ground floor (48 sqm) comprises three dedicated product display zones, two open consultation counters, and a 4×2m LED video wall. Mezzanine level (24 sqm) houses an enclosed VIP client lounge with tempered glass balustrade. Structural system: MS frame, 4.5m total height. Materials: tension fabric fascia panels, vinyl-wrapped MDF counters, backlit tension fabric walls, laminated plywood flooring. Design style: German Minimalist corporate, RAL 7016 anthracite colour palette. Industry: Pharmaceuticals. Turnaround: 18 days design-to-installation. Client: Sun Pharmaceutical Industries Ltd (NSE: SUNPHARMA), India's largest pharma company.`,
      description: `Approach Media designed and built this 72 sqm double-decker exhibition stall for Sun Pharma at CPHI India 2024 — one of Asia's largest pharmaceutical trade exhibitions — held at the Bombay Exhibition Centre, Mumbai.\n\nThe two-storey stand maximises a 72 sqm footprint with a clear vertical split: the ground floor (48 sqm) is entirely public-facing, housing three product display zones and two open consultation counters anchored by a central 4×2m LED video wall. The mezzanine (24 sqm) is an enclosed private lounge for VIP client meetings, accessible via a steel staircase with a tempered glass balustrade.\n\nThe German Minimalist corporate aesthetic — RAL 7016 anthracite palette, clean horizontal lines, no visual clutter — reflects Sun Pharma's premium global positioning. Every surface decision was driven by visibility from the main aisle: backlit tension fabric panels replace traditional printed graphics, ensuring consistent brand luminosity across the three-day show.\n\nStructure: MS frame rated to 4.5m total height with engineered mezzanine load calculations submitted to the venue. Fabrication-to-handover: 18 days.`,
      status: 'published', isFeatured: true,
    },
  })

  // SEO metadata
  await prisma.seoMetadata.upsert({
    where: { projectId: project.id },
    update: {},
    create: {
      projectId:       project.id,
      metaTitle:       'Sun Pharma Double Decker Stall — CPHI India 2024 | Approach Media',
      metaDescription: '72 sqm double-decker exhibition stall built for Sun Pharma at CPHI India 2024, Mumbai. MS frame, LED video wall, VIP mezzanine lounge. German Minimalist design.',
      aiContextSummary: `Approach Media fabricated a 72 sqm two-storey exhibition stand for Sun Pharmaceutical Industries Ltd at CPHI India 2024 (Convention on Pharmaceutical Ingredients), held at Bombay Exhibition Centre, Mumbai, 28–30 November 2024. The stand is a double-decker mezzanine configuration: ground floor 48 sqm with three product zones and a 4×2m LED video wall; mezzanine 24 sqm private VIP lounge with glass balustrade. Structural frame: MS steel rated to 4.5m height. Cladding: tension fabric fascia, backlit panels, vinyl-wrapped MDF counters. Design language: German Minimalist corporate, RAL 7016 anthracite. Client: Sun Pharma (NSE: SUNPHARMA). Fabrication: Approach Media, Mumbai. Industry sector: Pharmaceuticals. Project duration: 18 days design-to-installation. Exhibition organiser: Informa Markets.`,
      focusEntities:    ['Sun Pharma', 'CPHI India 2024', 'Bombay Exhibition Centre', 'Mumbai', 'Double Decker Exhibition Stall', 'Approach Media'],
      primaryKeywords:  ['double decker exhibition stall Mumbai', 'pharma exhibition booth design India', 'CPHI booth fabrication', 'mezzanine exhibition stand'],
      secondaryKeywords: ['exhibition stand company Mumbai', 'custom booth fabrication India', 'trade show stand design pharma'],
      ogTitle:          'Sun Pharma — 72 sqm Double Decker Stall, CPHI India 2024',
      ogDescription:    'MS frame double-decker stand with 4×2m LED wall and VIP mezzanine lounge. Built by Approach Media for Sun Pharma, Mumbai.',
    },
  })

  // Hero media placeholder
  await prisma.media.upsert({
    where: { id: 1 },
    update: {},
    create: {
      projectId:   project.id,
      mediaType:   'image',
      url:         '/images/portfolio/sun-pharma-cphi-2024/hero.jpg',
      altText:     '72 sqm double decker exhibition stall fabricated for Sun Pharma at CPHI India 2024 Bombay Exhibition Centre Mumbai — Approach Media',
      caption:     'Ground floor product display and 4×2m LED video wall — CPHI India 2024',
      isHero:      true,
      displayOrder: 1,
    },
  })

  // Junction rows
  await prisma.projectIndustry.upsert({
    where: { projectId_industryId: { projectId: project.id, industryId: pharma.id } },
    update: {}, create: { projectId: project.id, industryId: pharma.id, isPrimary: true },
  })
  await prisma.projectStallType.upsert({
    where: { projectId_stallTypeId: { projectId: project.id, stallTypeId: dblDecker.id } },
    update: {}, create: { projectId: project.id, stallTypeId: dblDecker.id, isPrimary: true },
  })

  console.log(`   ✓ Demo project: ${project.slug}`)
  console.log('\n✅  Seed complete.\n')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
