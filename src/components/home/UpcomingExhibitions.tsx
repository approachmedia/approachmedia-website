import Link from 'next/link'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import expoData from '@/data/expo-pages.json'
import type { ExpoPageData } from '@/components/expo/types'

const MONTH_ABBR: Record<number, string> = {
  1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN',
  7: 'JUL', 8: 'AUG', 9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DEC',
}

function getUpcomingExpos(limit = 15) {
  const now = new Date()
  const curMonth = MONTH_ABBR[now.getMonth() + 1]
  const curYear  = String(now.getFullYear())

  const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const nxtMonth = MONTH_ABBR[nextDate.getMonth() + 1]
  const nxtYear  = String(nextDate.getFullYear())

  const expos = expoData as ExpoPageData[]

  const current = expos.filter(e => e.month === curMonth && e.year === curYear)
  const next    = expos.filter(e => e.month === nxtMonth && e.year === nxtYear)

  return [...current, ...next].slice(0, limit)
}

export function UpcomingExhibitions() {
  const events = getUpcomingExpos(15)

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Plan ahead</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Upcoming Exhibitions & <span className="text-gradient-brand">Events Timeline.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Planning to exhibit in 2026? Start early to secure design and execution timelines.
            </p>
          </div>
          <Link href="/expos" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            View all events <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="mt-12 space-y-3">
          {events.map(e => (
            <li key={e.slug} className="surface-card group rounded-2xl p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="rounded-xl border border-brand-blue-glow/30 bg-brand-blue/15 px-3.5 py-2.5 text-center">
                    <div className="font-display text-xs uppercase tracking-wider text-brand-green-glow">{e.monthName.slice(0, 3)}</div>
                    {/* Two digits — the badge is a compact date chip, and the
                        full year is already spelled out in the meta row below. */}
                    <div className="font-display text-2xl font-semibold leading-none text-foreground">{String(e.year).slice(-2)}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">{e.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground md:text-sm">
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.venue}</span>
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {e.monthName} {e.year}</span>
                      <span className="rounded-full border border-border/70 px-2 py-0.5 text-[11px] uppercase tracking-wider">
                        {e.industryLabel.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-green-glow/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-green-glow hover:bg-brand-green-glow/10"
                >
                  Plan Your Stall <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
