import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ServicesImageAccordion } from '@/components/ui/interactive-image-accordion'

export function ServicesGrid() {
  return (
    <section className="bg-surface/40 py-20 md:py-28" id="services">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">What we do</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Services built for <span className="text-gradient-brand">high-stakes</span> exhibitions.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            All services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Interactive image accordion — hover a strip to expand; each links
            to its service page */}
        <div className="mt-12">
          <ServicesImageAccordion />
        </div>
      </div>
    </section>
  )
}
