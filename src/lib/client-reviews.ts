/**
 * The Client Testimonials playlist, resolved once for the two places it
 * appears: a six-video row on the home page and the full set on /about.
 *
 * Same two-source arrangement as the industry pages. The owner's export in
 * src/content/sector-videos.ts is what renders with nothing configured; when
 * YOUTUBE_API_KEY is set the playlist is read live and wins, so a review
 * added to the channel appears without another export.
 */

import { getVideosForPlaylists } from './youtube'
import { TESTIMONIAL_PLAYLIST_ID, TESTIMONIAL_VIDEOS } from '@/content/sector-videos'

export type ReviewVideo = { id: string; title: string; thumb: string }

/** Derivable from the id, so the export does not have to carry it. */
const thumbFor = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

export async function getClientReviewVideos(): Promise<ReviewVideo[]> {
  const live = await getVideosForPlaylists([TESTIMONIAL_PLAYLIST_ID], 50)
  if (live.length > 0) return live
  return TESTIMONIAL_VIDEOS.map(v => ({ ...v, thumb: thumbFor(v.id) }))
}

/**
 * The six for the home page, chosen for spread rather than order: six
 * different clients across six different shows, so the row does not read as
 * one event. Taking the first six off the playlist would have given five
 * WAPTAG reviews in a line.
 *
 * Nice Industries (WAPTAG) · Girivar Group (ABA Property Show) ·
 * Vishwakarma (Pharma Tech) · Federal Engineers · ACI Automation (IFEX) ·
 * Citizen Solar (Inter Solar).
 */
const HOME_PICKS = [
  '3DLofk-gNws',
  'RtJpmy9Rl6M',
  '9mJRZ3DbQkA',
  'A1gav8bsT6w',
  '6jxMRz3RDuI',
  'Iai7oeQFPLY',
]

/**
 * Keeps HOME_PICKS order. Falls back to the head of the playlist for any pick
 * the source no longer carries, which is what happens if the owner removes a
 * review from the channel while a key is set: the row stays six long instead
 * of silently shrinking.
 */
export function pickHomeReviews(videos: ReviewVideo[], count = 6): ReviewVideo[] {
  const byId = new Map(videos.map(v => [v.id, v]))
  const picked = HOME_PICKS.map(id => byId.get(id)).filter((v): v is ReviewVideo => !!v)
  if (picked.length >= count) return picked.slice(0, count)

  const have = new Set(picked.map(v => v.id))
  return [...picked, ...videos.filter(v => !have.has(v.id))].slice(0, count)
}
