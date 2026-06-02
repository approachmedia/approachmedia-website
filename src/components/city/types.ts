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
  venueIntro: string          // full-width intro paragraph under the heading
  venueIntro2?: string        // optional second paragraph
  // Mode A — one featured venue with photo + specs grid (Surat, Kolkata)
  featuredVenue?: {
    name: string              // full venue name
    address: string           // shown on the photo overlay
    imageUrl?: string         // /images/venues/siecc-surat.jpg or a CDN URL
    specs: { label: string; value: string }[]  // 2-col specs grid
    notableShows?: string     // "Notable shows: …"
    ctaLabel: string          // CTA button text
  }
  // Mode B — multiple venues with photo + "best suited for" lists (Ahmedabad)
  venues?: {
    name: string
    imageUrl?: string         // /images/venues/biec-bangalore.jpg or a CDN URL
    description: string
    bestFor: string[]
    ctaLabel: string
  }[]

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
