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
  'helipad-exhibition-centre-gandhinagar-guide': [
    // The post's notes asked to deep-link show names in the calendar table to
    // matching /expos pages "if pages exist". Checked at build: PharmaTech and
    // Agri Asia have pages; Global Solar Expo, Aluminium Bharat and Khadhya
    // Khurak do not, so those stay plain text rather than becoming 404s.
    { anchor: 'PharmaTech Expo & LabTech Expo 2026', href: '/expos/exhibition-stall-design-pharmatech-and-labtech-expo-2026-gandhinagar' },
    { anchor: 'Agri Asia 2026',                      href: '/expos/exhibition-stall-design-agri-asia-2026-gandhinagar' },
    { anchor: 'stall design and fabrication team',   href: '/exhibition-stand-builders-in-ahmedabad' },
    { anchor: '30,000 sq ft',                        href: '/services/custom-booth-fabrication' },
    { anchor: 'custom stall',                        href: '/services/exhibition-stall-design' },
  ],

  // ── Batch 2: the three scheduled expo guides ──────────────
  // Each file's notes end with "Check at build: /expos landing page for
  // <show> — deep-link if present." All four shows have pages, verified
  // against src/data/expo-pages.json, so all four are linked.

  'bauma-conexpo-india-2026-exhibitor-guide': [
    { anchor: 'bauma CONEXPO INDIA', href: '/expos/exhibition-stall-design-bauma-conexpo-india-2026-greater-noida' },
    // Sits before the authored [double-decker rules guide] link on the same
    // line, so it takes the plain "double-deck structures" mention.
    { anchor: 'double-deck',         href: '/services/double-decker-mezzanine-stands' },
    { anchor: 'mock-up tested in our 30,000 sq ft workshop', href: '/services/custom-booth-fabrication' },
  ],

  'semicon-india-2026-exhibitor-guide': [
    { anchor: 'SEMICON India',                 href: '/expos/exhibition-stall-design-semicon-india-2026-new-delhi' },
    { anchor: 'mock-up test 100% of builds',   href: '/services/custom-booth-fabrication' },
  ],

  'rei-expo-battery-show-india-2026-guide': [
    { anchor: 'Renewable Energy India (REI) Expo', href: '/expos/exhibition-stall-design-renewable-energy-india-expo-2026-greater-noida' },
    { anchor: 'The Battery Show India',            href: '/expos/exhibition-stall-design-the-battery-show-india-2026-greater-noida' },
    { anchor: '30,000 sq ft workshop with 100% mock-up testing', href: '/services/custom-booth-fabrication' },
    { anchor: 'concept and costing',               href: '/services/exhibition-stall-design' },
  ],

  // ── Batch 3 ───────────────────────────────────────────────
  // Aluminium Bharat and Beautyworld have no /expos landing page (checked
  // against expo-pages.json), so their show names stay plain text rather
  // than becoming 404s — the same rule the earlier batches followed.

  'aluminium-bharat-2026-exhibitor-guide': [
    { anchor: 'mock-up tested before it ever reaches the venue', href: '/services/custom-booth-fabrication' },
    { anchor: 'concept and costing',                             href: '/services/exhibition-stall-design' },
  ],

  'anuga-foodtec-india-2026-exhibitor-guide': [
    { anchor: 'Anuga FoodTec India', href: '/expos/exhibition-stall-design-anuga-foodtec-india-2026-mumbai' },
    { anchor: 'mock-up tested in our 30,000 sq ft workshop', href: '/services/custom-booth-fabrication' },
  ],

  'beautyworld-dubai-2026-indian-exhibitors-guide': [
    // Both anchors sit on the same sentence; the injector balances brackets,
    // so whichever runs first the other still resolves outside the new link.
    { anchor: 'design in India',        href: '/services/exhibition-stall-design' },
    { anchor: 'turnkey delivery abroad', href: '/services/turnkey-project-management' },
  ],

  // ── Batch 4 ───────────────────────────────────────────────
  // Two of these carry a link the pack asks to "hold as plain text until the
  // split-venue guide deploys on 16 Sep". Registering the anchor now needs no
  // follow-up: a blog href whose target is unpublished is skipped by the
  // injector and starts resolving by itself the day that post goes live.

  'cphi-milan-2026-indian-exhibitors-guide': [
    { anchor: 'CPHI Milan',      href: '/expos/exhibition-stall-design-cphi-milan-2026' },
    { anchor: 'turnkey partner', href: '/services/turnkey-project-management' },
    { anchor: 'split-venue guide', href: '/blog/cphi-pmec-india-2026-split-venue-guide' },
  ],

  'windergy-india-2026-exhibitor-guide': [
    // No /expos landing page exists for Windergy, so the show name stays text.
    { anchor: '30,000 sq ft Ahmedabad workshop', href: '/services/custom-booth-fabrication' },
  ],

  'yashobhoomi-iicc-delhi-exhibitor-guide': [
    { anchor: '100% mock-up testing in the workshop', href: '/services/custom-booth-fabrication' },
    { anchor: 'Get it to your stall builder',         href: '/services/turnkey-project-management' },
    { anchor: 'split-venue guide',                    href: '/blog/cphi-pmec-india-2026-split-venue-guide' },
  ],
}

/**
 * Extra links appended to a post's Related block, where the source file's
 * notes call for a related-block link with no matching anchor phrase in the
 * body. Linking it there is honest; inventing body copy to carry the anchor
 * would not be.
 */
export const RELATED_EXTRAS_BY_SLUG: Record<string, { anchor: string; href: string }[]> = {
  'helipad-exhibition-centre-gandhinagar-guide': [
    { anchor: 'India trade show calendar — dates, venues and cities', href: '/tradeshow-calendar' },
  ],
  // Batch 2 — each file names a city landing page for its Related block.
  // Both pages were confirmed to exist before being linked.
  'bauma-conexpo-india-2026-exhibitor-guide': [
    { anchor: 'Exhibition stand builders in Noida', href: '/exhibition-stand-builders-in-noida' },
  ],
  'semicon-india-2026-exhibitor-guide': [
    { anchor: 'Exhibition stall designer in Delhi', href: '/exhibition-stall-designer-delhi' },
  ],
  'rei-expo-battery-show-india-2026-guide': [
    { anchor: 'Exhibition stand builders in Noida', href: '/exhibition-stand-builders-in-noida' },
  ],
  // Batch 3. Aluminium Bharat and Beautyworld name the Ahmedabad page, which
  // RELATED_EXTRA already appends to every post, so only Mumbai is new.
  'anuga-foodtec-india-2026-exhibitor-guide': [
    { anchor: 'Exhibition stall designer in Mumbai', href: '/exhibition-stall-designer-mumbai' },
  ],
  // Batch 4. The CPHI Milan notes also name an iPHEX guide for its Related
  // block, described as live — no such post exists in content/blog, so it is
  // deliberately not listed here rather than shipped as a dead link.
  'windergy-india-2026-exhibitor-guide': [
    { anchor: 'Exhibition stall designer in Chennai', href: '/exhibition-stall-designer-chennai' },
  ],
  'yashobhoomi-iicc-delhi-exhibitor-guide': [
    { anchor: 'Exhibition stall designer in Delhi', href: '/exhibition-stall-designer-delhi' },
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
 *
 * The three Batch-2 expo guides each ask for a sector photo — machinery,
 * technology, energy — and mark it [NEEDS CLIENT IMAGE]. None has been
 * supplied and cleared, so all three take the typographic fallback. Adding
 * one is a single entry here once the owner names a real project photo.
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
