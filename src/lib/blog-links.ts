/**
 * Internal-link maps transcribed from the "Internal links used in this post"
 * notes at the bottom of each source file. Kept as code rather than parsed at
 * runtime so the mapping is reviewable and deterministic.
 *
 * Rules applied by blog.ts: first case-insensitive occurrence in body text,
 * never inside a heading, never nested in an existing link. CTA URLs that the
 * posts already carry as authored bold links (/contact etc.) are not repeated
 * here. Longer anchors are listed before shorter ones that they contain, so
 * "custom exhibition stall design" wins before "fabrication" is looked up.
 *
 * Cross-links between the four posts use the anchors each file's notes
 * specify. Where a note names a cross-link but gives no anchor phrase, the
 * post's Related block (rendered by the page) carries that link instead —
 * inventing anchor text in body copy is off-limits.
 */
export type InternalLink = { anchor: string; href: string }

export const INTERNAL_LINKS: Record<string, InternalLink[]> = {
  'exhibition-stall-design-cost-india': [
    { anchor: 'Custom exhibition stall design', href: '/services/exhibition-stall-design' },
    { anchor: 'fabrication',                    href: '/services/custom-booth-fabrication' },
    { anchor: 'turnkey project management',     href: '/services/turnkey-project-management' },
    { anchor: 'AV and technology',              href: '/services/av-technology-integration' },
    { anchor: "we've built both",               href: '/portfolio' },
    { anchor: 'your show',                      href: '/tradeshow-calendar' },
  ],
  'double-decker-stall-rules-india': [
    { anchor: 'turnkey project management',     href: '/services/turnkey-project-management' },
    { anchor: '9 sqm inline stands to 300 sqm double-decker pavilions', href: '/portfolio' },
    { anchor: 'your show',                      href: '/tradeshow-calendar' },
    // cross-link, anchor specified in the notes:
    { anchor: 'most expensive stall type',      href: '/blog/exhibition-stall-design-cost-india' },
  ],
  'custom-vs-modular-exhibition-stands-india': [
    { anchor: 'mock-up tested in our 30,000 sq ft workshop', href: '/services/custom-booth-fabrication' },
    { anchor: 'custom stall design',            href: '/services/exhibition-stall-design' },
    // the long portfolio phrase must be linked before the bare "double-decker"
    // it contains, or the short anchor would match inside it first
    { anchor: '9 sqm inline stands to 300 sqm double-decker pavilions', href: '/portfolio' },
    { anchor: 'double-decker',                  href: '/services/double-decker-mezzanine-stands' },
    // cross-link on the price range, per the notes:
    { anchor: '₹7,000–₹25,000 per square metre', href: '/blog/exhibition-stall-design-cost-india' },
  ],
  'exhibition-stand-cost-dubai-indian-exhibitors': [
    { anchor: 'turnkey project management',     href: '/services/turnkey-project-management' },
    { anchor: 'designed by the team that knows your brand', href: '/services/exhibition-stall-design' },
    { anchor: 'International shows',            href: '/expos' },
  ],
}

/** The Related block every post ends with: the other three posts plus the
 *  Ahmedabad landing page, per the publishing spec. */
export const RELATED_EXTRA = {
  anchor: 'Exhibition stand builders in Ahmedabad',
  href: '/exhibition-stand-builders-in-ahmedabad',
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

/**
 * Hero images. Hard rule from the publishing spec: real Approach Media
 * project photos only — never stock, never generated, never implied.
 *
 * These three files are verified real project photos, confirmed by the
 * owner's own captions on the services pages where they already render:
 * gallery-1 (custom F&B stall), gallery-4 ("Renewable Energy Expo · 144 sqm ·
 * Double-Decker"), gallery-5 ("Property Expo · 72 sqm · Custom Build").
 * gallery-2 is still a stock placeholder and must not be used.
 *
 * The Dubai post has no verified UAE project photo, so it gets the
 * typographic header fallback (no entry here) — flagged in the build report.
 */
export const POST_IMAGES: Record<string, { src: string; alt: string }> = {
  'exhibition-stall-design-cost-india': {
    src: `${CDN}/stall-gallery-1.jpg`,
    alt: 'Custom exhibition stall designed and fabricated by Approach Media, showing the finish level that moves cost within the per-sqm range',
  },
  'double-decker-stall-rules-india': {
    src: `${CDN}/stall-gallery-4.jpg`,
    alt: 'Double-decker exhibition stall of 144 sqm designed and built by Approach Media at a renewable energy expo',
  },
  'custom-vs-modular-exhibition-stands-india': {
    src: `${CDN}/stall-gallery-5.jpg`,
    alt: 'Custom-built exhibition stall with an illuminated glass front, fabricated by Approach Media for a property expo',
  },
}
