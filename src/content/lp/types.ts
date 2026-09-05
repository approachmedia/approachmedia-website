/**
 * Landing page config. One template, one object per page.
 *
 * Copy lives here verbatim from the owner's spec (LP SPEC, 5 Sep 2026). The
 * components render it; they do not rewrite it.
 */

export type LpService = 'exhibition-stall-design' | 'stall-fabrication'

export type LpOfferCard = { title: string; body: string }
export type LpFaqItem = { q: string; a: string }
export type LpTestimonial = { quote: string; name: string; role?: string; company: string }

export type LandingPageConfig = {
  slug: string
  service: LpService
  /** <title> only. The page is noindex, so this is for the tab and Ads QA. */
  title: string

  eyebrow: string
  /** Default H1, used when no ?show= is present. */
  h1: string
  /** H1 when ?show= is present. `{show}` is replaced with the sanitised value. */
  h1WithShow: string
  subhead: string
  /** Proof chips under the sub-head. The first is the live Google rating. */
  proofChips: { rating: true } | { text: string }[]

  form: {
    title: string
    sub: string
    button: string
    consent: string
  }

  trustBar: { clients: string[]; caption: string }
  offer: LpOfferCard[]
  process: string[]
  portfolioCta: string
  testimonials: { hidden: boolean; items: LpTestimonial[] }
  pricing: {
    rows: { size: string; range: string }[]
    note: string
    linkLabel: string
    linkHref: string
  }
  faq: LpFaqItem[]
  finalCta: { h2: string; body: string; primary: string; whatsapp: string }
}

/** Venue line per ?city= value, swapped into the eyebrow and FAQ emphasis. */
export const CITY_VENUES: Record<string, string[]> = {
  ahmedabad:  ['Helipad', 'Mahatma Mandir', 'GUCEC'],
  gandhinagar: ['Helipad', 'Mahatma Mandir', 'GUCEC'],
  mumbai:     ['BEC', 'NESCO', 'JWCC'],
  delhi:      ['Bharat Mandapam', 'IEML', 'Yashobhoomi'],
  noida:      ['Bharat Mandapam', 'IEML', 'Yashobhoomi'],
  gurgaon:    ['Bharat Mandapam', 'IEML', 'Yashobhoomi'],
}

export const SHOW_SUGGESTIONS = [
  'REI Expo 2026',
  'ACETECH Mumbai 2026',
  'IITF 2026',
  'CPHI/PMEC India 2026',
  'India ITME 2026',
  'Vibrant Gujarat 2027',
  'Intersolar India 2027',
  'Ceramics India 2027',
  'Other',
]

export const STALL_SIZES = [
  'Up to 9 sqm',
  '10–18 sqm',
  '19–36 sqm',
  '37–100 sqm',
  '100+ sqm / pavilion',
  'Not sure yet',
]

/** The primary phone from /contact. Confirm it is WhatsApp-enabled before launch. */
export const LP_PHONE_E164 = '+919426912602'
export const LP_PHONE_DISPLAY = '+91 94269 12602'
export const LP_WA_NUMBER = '919426912602'

/** Hero photograph: a real build from the portfolio, served from R2. */
export const LP_HERO_IMAGE = {
  src: 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/2026/pharmatech-expo-2026-gandhinagar/r-r-clean-room/r_r_clean_room_exhibition_stall_design_at_Pharmatech_Expo_Gandhinagar.webp',
  alt: 'RR Clean Room exhibition stall design at Pharmatech Expo Gandhinagar, white cleanroom build under a backlit navy fascia',
}
