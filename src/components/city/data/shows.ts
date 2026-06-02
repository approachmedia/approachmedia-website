import type { ExhibitionShow } from '../types'
import eventsData from '@/data/tradeshow-events.json'

type CsvEvent = {
  title: string
  link: string
  dateRaw: string
  startDate: string | null
  endDate?: string | null
  city: string
  categories: string[]
}

/** A manually-curated show with a sortable start date (ISO yyyy-mm-dd). */
export type CuratedShow = ExhibitionShow & { startDate: string }

/** Internal: an entry in the pool we rank by date. */
type Dated = { show: ExhibitionShow; startDate: string | null }

const fromCsv = (e: CsvEvent): Dated => ({
  startDate: e.startDate,
  show: { title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null },
})

/**
 * Build the carousel's show list dynamically, relative to today.
 *
 * - If there are upcoming shows (start date today or later), show them in
 *   chronological order so this month and the coming months appear first.
 *   Past expos are never shown when upcoming ones exist — stale events do not
 *   drive enquiries.
 * - If there are no upcoming shows at all, fall back to the last 6 past shows
 *   (most recent first) so the section is never empty.
 *
 * Curated highlights (passed via `curated`) are merged into the same pool so
 * they also drop out of the carousel once their date has passed.
 */
export function buildCityShows(
  cityPattern: RegExp,
  opts: { limit?: number; exclude?: (e: CsvEvent) => boolean; curated?: CuratedShow[] } = {},
): ExhibitionShow[] {
  const { limit = 9, exclude, curated } = opts

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const parse = (s: string | null) => (s ? new Date(s) : null)

  const pool: Dated[] = [
    ...(curated ?? []).map(c => ({ startDate: c.startDate, show: c })),
    ...(eventsData as CsvEvent[])
      .filter(e => cityPattern.test(e.city) && (!exclude || !exclude(e)))
      .map(fromCsv),
  ]

  const upcoming = pool
    .filter(p => {
      const d = parse(p.startDate)
      return d != null && d >= today
    })
    .sort((a, b) => parse(a.startDate)!.getTime() - parse(b.startDate)!.getTime())

  if (upcoming.length > 0) return upcoming.slice(0, limit).map(p => p.show)

  return pool
    .filter(p => {
      const d = parse(p.startDate)
      return d != null && d < today
    })
    .sort((a, b) => parse(b.startDate)!.getTime() - parse(a.startDate)!.getTime())
    .slice(0, 6)
    .map(p => p.show)
}
