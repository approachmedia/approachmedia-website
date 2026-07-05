/**
 * GoogleReviews — live reviews from the Approach Media Google Business
 * Profile via the Places API (New). Renders nothing until both env vars
 * are configured on Railway:
 *
 *   GOOGLE_PLACES_API_KEY  — Google Cloud key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID        — the business's Place ID
 *
 * Reviews are cached for 6 hours; any API failure hides the block rather
 * than breaking the homepage. Google returns at most 5 reviews.
 */

import { Star } from 'lucide-react'

type GReview = {
  rating: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: { displayName?: string; photoUri?: string }
}

type PlaceDetails = {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: GReview[]
}

function Stars({ n, className = 'h-3.5 w-3.5' }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(n) ? 'fill-brand-green-glow text-brand-green-glow' : 'text-muted-foreground/40'}`}
        />
      ))}
    </span>
  )
}

export async function GoogleReviews() {
  const key     = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null

  let place: PlaceDetails | null = null
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key':    key,
        'X-Goog-FieldMask':  'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: 21600 }, // 6 h
    })
    if (!res.ok) return null
    place = await res.json() as PlaceDetails
  } catch {
    return null
  }

  const reviews = (place?.reviews ?? []).filter(r => r.text?.text)
  if (!place?.rating || reviews.length === 0) return null

  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`
  const allReviewsUrl  = `https://search.google.com/local/reviews?placeid=${placeId}`

  return (
    <div className="mt-14">
      {/* Summary row */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-surface/60 px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Google G */}
          <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold text-foreground">{place.rating.toFixed(1)}</span>
              <Stars n={place.rating} className="h-4 w-4" />
            </div>
            <a href={allReviewsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
              {place.userRatingCount ?? reviews.length} Google reviews
            </a>
          </div>
        </div>
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-brand-green/50 px-4 py-2 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green/10"
        >
          Write a review
        </a>
      </div>

      {/* Review cards */}
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((r, i) => (
          <figure key={i} className="surface-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              {r.authorAttribution?.photoUri ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.authorAttribution.photoUri}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 rounded-full bg-surface object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/30 text-sm font-semibold text-foreground">
                  {(r.authorAttribution?.displayName ?? '?').charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{r.authorAttribution?.displayName ?? 'Google user'}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <Stars n={r.rating} className="h-3 w-3" />
                  <span className="text-[11px] text-muted-foreground">{r.relativePublishTimeDescription}</span>
                </div>
              </div>
            </div>
            <blockquote className="mt-4 line-clamp-6 text-sm leading-relaxed text-foreground/85">
              {r.text!.text}
            </blockquote>
          </figure>
        ))}
      </div>
    </div>
  )
}
