/**
 * Each industry page's photograph in the R2 industries set (the same sixteen
 * photographs the home page and the /industries hub use). Two sectors have
 * none in the set and fall back to their own project photographs.
 */

export const INDUSTRY_COVER_CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/industries'

export const INDUSTRY_COVER_FILE: Record<string, string> = {
  'real-estate':                     'exhibition-stall-design-real-estate.jpg',
  'pharmaceuticals':                 'exhibition-stall-design-pharma.jpg',
  'healthcare-medical-devices':      'exhibition-stall-design-healthcare.jpg',
  'machinery-engineering':           'exhibition-stall-design-machinery.jpg',
  'food-beverage-fmcg':              'exhibition-stall-design-fmcg.jpg',
  'textiles-apparel':                'exhibition-stall-design-garment.jpg',
  'solar-renewable-energy':          'exhibition-stall-design-renewable-energy.jpg',
  'water-treatment':                 'exhibition-stall-design-water-industry.jpg',
  'plastics':                        'exhibition-stall-design-plastic.jpg',
  'printing-packaging':              'exhibition-stall-design-printing-packaging.jpg',
  'architecture-building-materials': 'exhibition-stall-design-doors-windows.jpg',
  'cosmetics-personal-care':         'exhibition-stall-design-cosmetics.jpg',
  'electrical-lighting':             'exhibition-stall-design-lighting.jpg',
  'pumps-valves-gears':              'exhibition-stall-design-valves-pumps-gears.jpg',
}

export function industryCover(slug: string, name: string): { src: string; alt: string } | null {
  const file = INDUSTRY_COVER_FILE[slug]
  return file ? { src: `${INDUSTRY_COVER_CDN}/${file}`, alt: `${name} exhibition stall design` } : null
}
