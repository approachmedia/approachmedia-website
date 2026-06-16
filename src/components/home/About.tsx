import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">About Approach Media</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Your trusted exhibition <span className="text-gradient-brand">stall designers.</span>
          </h2>
        </div>
        <div className="md:col-span-7">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Approach Media is an exhibition stall design-and-build company delivering projects in
            India and internationally across diverse industries. We handle everything from concept
            and spatial design to fabrication and on-site execution — so your team does not have to
            manage multiple vendors under tight timelines.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Since <span className="font-medium text-foreground">2002</span>, we combine design
            thinking, industry insight, and execution precision to create spaces that perform in
            high-competition environments.
          </p>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand-green-glow"
          >
            More about our story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
