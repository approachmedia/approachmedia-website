import Link from 'next/link'

/**
 * Contextual links from a service page down to the city landing pages.
 *
 * Nothing linked to the city pages except global navigation, which is why
 * they behaved like orphans despite 1,700-2,000 words each. Anchor text is
 * the phrase each city page is trying to rank for, not "click here" or the
 * bare city name.
 */
const CITIES = [
  { path: '/exhibition-stand-builders-in-ahmedabad', anchor: 'exhibition stall designer in Ahmedabad', note: 'GUCEC, GMDC Ground, Helipad Exhibition Centre' },
  { path: '/exhibition-stall-designer-mumbai',       anchor: 'exhibition stall designer in Mumbai',    note: 'BEC, NESCO, Jio World Convention Centre' },
  { path: '/exhibition-stall-designer-delhi',        anchor: 'exhibition stall designer in Delhi',     note: 'Pragati Maidan, IEML, Yashobhoomi' },
  { path: '/exhibition-stall-designer-bangalore',    anchor: 'exhibition stall designer in Bangalore', note: 'BIEC, Palace Grounds' },
  { path: '/exhibition-stall-design-hyderabad',      anchor: 'exhibition stall design in Hyderabad',   note: 'HITEX, HICC' },
  { path: '/exhibition-stall-designer-chennai',      anchor: 'exhibition stall designer in Chennai',   note: 'Chennai Trade Centre' },
  { path: '/exhibition-stall-design-pune',           anchor: 'exhibition stall design in Pune',        note: 'Auto Cluster, Agriculture College Ground' },
]

export default function ServiceCityLinks({ heading = 'Where we build' }: { heading?: string }) {
  return (
    <section className="border-y border-white/15 bg-surface/30 py-16 md:py-20">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-green">{heading}</p>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold text-foreground md:text-4xl">
          Exhibition stall design and fabrication, city by city
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Every venue has its own rigging limits, build-up windows and access constraints. These pages
          cover what we know about each city&apos;s halls, and the stands we have delivered in them.
        </p>

        <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map(c => (
            <li key={c.path} className="border-t border-white/10 pt-4">
              <Link
                href={c.path}
                className="font-display text-base font-semibold text-foreground transition-colors hover:text-brand-green-glow md:text-lg"
              >
                {c.anchor}
              </Link>
              <p className="mt-1 text-xs text-slate-500">{c.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
