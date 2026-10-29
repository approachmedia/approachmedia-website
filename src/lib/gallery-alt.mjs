/**
 * Alt text for a project's gallery photographs.
 *
 * The hero carries alt the owner wrote by hand. The rest never did: both
 * importers built `${title} — photo ${n}`, so thirty photographs of one stall
 * shared a sentence that differed only by its number.
 *
 * This builds the sentence from the row's own facts instead, so the two
 * attributes buyers actually search on, floor area and how many sides are
 * open, are in the text. Everything here is a field the owner supplied. It
 * describes the project, not the individual frame, because what a given
 * frame shows is not in the data and guessing would put invented claims in
 * front of a screen reader.
 *
 * NOT derived from the filename, deliberately. The keyword naming scheme runs
 * best_, premium_, No_1_, top_ and, past twenty photographs, trusted_ and
 * leading_. Those are marketing words rather than descriptions, two of them
 * are on the banned list, and alt text stuffed with superlatives is the thing
 * search engines discount.
 *
 * Shared by scripts/import-portfolio.mjs, the admin importer and
 * scripts/backfill-gallery-alt.mjs so all three cannot drift apart.
 */

/** Matches what both importers wrote before this existed. */
export const LEGACY_GALLERY_ALT = /^(.*) — photo (\d+)$/

/** Alt is read aloud; past roughly this length screen readers and search
 *  engines both stop caring. The owner's own spec caps hero alt at 125. */
const MAX = 125

const clean = v => (v == null ? '' : String(v).trim())

/**
 * @param {{client_name?: string, title?: string, stall_area_sqm?: string|number,
 *          stall_types?: string, exhibition_name?: string, city?: string}} row
 * @param {number} position 1-based position among the gallery images.
 */
export function galleryAlt(row, position) {
  const client = clean(row.client_name)
  const area = parseFloat(String(row.stall_area_sqm ?? ''))
  const sides = clean(row.stall_types).split('|')[0].trim()
  const show = clean(row.exhibition_name)
  const city = clean(row.city)

  const subject = [
    client,
    Number.isFinite(area) ? `${area % 1 === 0 ? area : area.toFixed(1)} sqm` : '',
    sides,
    'exhibition stall',
  ].filter(Boolean).join(' ')

  const suffix = `, photo ${position + 1}`

  // Tried longest first. If the sentence runs over, the city goes, then the
  // show. The client and the stall itself are never dropped.
  const forms = [
    show && city ? `${subject} at ${show}, ${city}` : '',
    show ? `${subject} at ${show}` : '',
    city ? `${subject}, ${city}` : '',
    subject,
  ].filter(Boolean)

  for (const f of forms) {
    if ((f + suffix).length <= MAX) return f + suffix
  }
  // A client name long enough to blow the cap on its own: keep the start.
  return (subject + suffix).slice(0, MAX)
}

/**
 * True when this alt is one the importers generated and so is safe to
 * replace. Anything the owner typed in the admin does not match and is left
 * exactly as it is.
 */
export function isGeneratedGalleryAlt(alt, projectTitle) {
  const m = LEGACY_GALLERY_ALT.exec(clean(alt))
  return !!m && m[1] === clean(projectTitle)
}
