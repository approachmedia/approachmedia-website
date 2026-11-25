import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ParticleFigure from './motion/ParticleFigure'
import ScrollLit from '@/components/portfolio/ScrollLit'

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
          {/* Lights up word by word as it scrolls through the screen. */}
          <ScrollLit
            className="text-lg leading-relaxed text-foreground md:text-2xl md:leading-snug"
            text="Approach Media is an exhibition stall design-and-build company delivering projects in India and internationally across diverse industries. We handle everything from concept and spatial design to fabrication and on-site execution — so your team does not have to manage multiple vendors under tight timelines."
          />
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
      {/* Style 14: the site's own figure drawn in particles that scatter
          under the cursor or a finger, with what it counts written beneath. */}
      <figure className="container-wide mt-12 md:mt-16">
        <ParticleFigure text="6000+" />
        <figcaption className="mt-2 text-center">
          <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-foreground md:text-base">
            Exhibition stalls executed
          </span>
          <span className="mt-1.5 block text-sm text-muted-foreground">Since 2002, across 14+ countries</span>
        </figcaption>
      </figure>
    </section>
  )
}
