/**
 * The business's live Google rating, for places that quote it as a figure.
 *
 * Same Places API call the homepage reviews block makes, reduced to the two
 * numbers. Cached six hours. Returns null when the keys are absent or the
 * call fails, and callers must hide the figure in that case rather than fall
 * back to a hard-coded one: a rating that is printed on the page but no
 * longer matches Google is a claim we cannot stand behind.
 */
export type GoogleRating = { rating: number; count: number }

export async function getGoogleRating(): Promise<GoogleRating | null> {
  const key     = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount' },
      next: { revalidate: 21600 },
    })
    if (!res.ok) return null
    const j = await res.json() as { rating?: number; userRatingCount?: number }
    if (!j.rating) return null
    return { rating: j.rating, count: j.userRatingCount ?? 0 }
  } catch {
    return null
  }
}
