export interface ExhibitionShow {
  title: string
  dateRaw: string
  categories: string[]
  venue: string
  link: string | null
}

export interface CityPageData {
  // ── SEO ────────────────────────────────────────────────
  citySlug: string          // 'surat' | 'kolkata' | 'mumbai'  (used for portfolio filter)
  metaTitle: string
  metaDescription: string
  canonicalPath: string     // e.g. '/exhibition-agency-in-surat'

  // ── Hero ───────────────────────────────────────────────
  eyebrow: string           // 'Surat · Gujarat · India'
  h1Line1: string           // 'Exhibition Agency in Surat That Builds Stalls'
  h1Highlight: string       // 'Designed to Win Attention'
  subtitle: string
  trustPills: string[]

  // ── Intro ──────────────────────────────────────────────
  introHeading: string
  introP1: string
  introP2: string

  // ── Stand Out ──────────────────────────────────────────
  standOutHeading: string
  standOut: { title: string; body: string }[]

  // ── Services ───────────────────────────────────────────
  services: { num: string; title: string; body: string }[]

  // ── Venue ──────────────────────────────────────────────
  venueP1: string           // full-width intro paragraph
  venueP2?: string          // optional second paragraph
  venueCtaLabel: string     // CTA button text
  venueCardTitle: string    // full venue name (image overlay + specs heading)
  venueAddress: string      // shown at bottom of image overlay
  venueImageUrl?: string    // /images/venues/siecc-surat.jpg or CDN URL
  venueSpecs: { label: string; value: string }[]  // 2-col specs grid in card
  venueNotableShows: string // "Notable shows: [text]" in card

  // ── Exhibitions ────────────────────────────────────────
  shows: ExhibitionShow[]

  // ── Industries ─────────────────────────────────────────
  industries: { title: string; body: string }[]

  // ── Why Us ─────────────────────────────────────────────
  whyUs: { title: string; body: string }[]

  // ── Process ────────────────────────────────────────────
  process: { step: string; title: string; body: string }[]

  // ── FAQ ────────────────────────────────────────────────
  faqs: { q: string; a: string }[]

  // ── Schema.org ─────────────────────────────────────────
  schemaName: string
  schemaAreaServed: string
}
