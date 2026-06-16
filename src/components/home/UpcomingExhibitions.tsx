import Link from 'next/link'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'

const events = [
  { slug: 'auto-expo-2026',      name: 'Auto Expo 2026', city: 'Greater Noida', country: 'India',   venue: 'India Expo Mart',  start: 'Jan 17, 2026', end: 'Jan 22, 2026', industry: 'Automotive' },
  { slug: 'cphi-frankfurt-2026', name: 'CPHI Frankfurt', city: 'Frankfurt',     country: 'Germany', venue: 'Messe Frankfurt',  start: 'Oct 13, 2026', end: 'Oct 15, 2026', industry: 'Pharma' },
  { slug: 'gulfood-2026',        name: 'Gulfood',        city: 'Dubai',         country: 'UAE',     venue: 'DWTC',             start: 'Feb 16, 2026', end: 'Feb 20, 2026', industry: 'FMCG' },
  { slug: 'bauma-2026',          name: 'Bauma',          city: 'Munich',        country: 'Germany', venue: 'Messe München',    start: 'Apr 6, 2026',  end: 'Apr 12, 2026', industry: 'Construction' },
]

export function UpcomingExhibitions() {
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
                    <div className="font-display text-xs uppercase tracking-wider text-brand-green-glow">{e.start.split(' ')[0]}</div>
                    <div className="font-display text-2xl font-semibold leading-none text-foreground">{e.start.split(' ')[1].replace(',', '')}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">{e.name}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground md:text-sm">
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.venue}, {e.city}, {e.country}</span>
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {e.start} – {e.end}</span>
                      <span className="rounded-full border border-border/70 px-2 py-0.5 text-[11px] uppercase tracking-wider">{e.industry}</span>
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
