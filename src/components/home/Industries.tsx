import Link from 'next/link'
import { Button } from '@/components/ui/button'

const industries = [
  'Real Estate', 'Pharma', 'Manufacturing', 'FMCG', 'Textile',
  'Technology', 'Automotive', 'Healthcare', 'Architecture', 'Construction & Building Materials',
]

export function Industries() {
  return (
    <section className="bg-surface/40 py-20 md:py-28">
      <div className="container-narrow text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Industries we serve</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Designed for the way <span className="text-gradient-brand">your industry</span> communicates.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Every industry tells its story differently. We translate technical, sensory and emotional cues into spaces that perform.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {industries.map(i => (
            <Link
              key={i}
              href="/portfolio"
              className="rounded-full border border-border/70 bg-surface px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-green-glow/60 hover:text-foreground"
            >
              {i}
            </Link>
          ))}
        </div>

        <Button asChild variant="hero" size="lg" className="mt-10">
          <Link href="/portfolio">Explore by Industry</Link>
        </Button>
      </div>
    </section>
  )
}
