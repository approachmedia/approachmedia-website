import Link from 'next/link'
import { MapPin, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { INDIAN_CITIES } from '@/data/cities'
import { INTERNATIONAL_COUNTRIES } from '@/data/countries'

export function Presence() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Where we deliver</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Local execution. <span className="text-gradient-brand">Global standards.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="surface-card rounded-2xl p-7 md:p-9">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/20 ring-1 ring-brand-blue-glow/30">
                <MapPin className="h-5 w-5 text-brand-blue-glow" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Indian Presence</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              On-ground teams across India&apos;s largest exhibition cities and industrial hubs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {INDIAN_CITIES.map(c => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <Button asChild variant="outlineBrand" size="sm" className="mt-7">
              <Link href="/portfolio">Explore Indian cities</Link>
            </Button>
          </div>

          <div className="surface-card rounded-2xl p-7 md:p-9">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/20 ring-1 ring-brand-green-glow/30">
                <Globe2 className="h-5 w-5 text-brand-green-glow" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">International Presence</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Trade-show projects delivered across 14+ countries, to international build and safety standards.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {INTERNATIONAL_COUNTRIES.map(c => c.href ? (
                <Link
                  key={c.label}
                  href={c.href}
                  className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand-green-glow/50 hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span key={c.label} className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs text-muted-foreground">
                  {c.label}
                </span>
              ))}
            </div>
            <Button asChild variant="outlineBrand" size="sm" className="mt-7">
              <Link href="/about">Explore countries</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
