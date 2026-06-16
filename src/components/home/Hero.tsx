'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const taglines = [
  'In an ocean of lookalikes, those who stand apart will survive.',
  'Custom Exhibition and Trade Show Booth Builders & Designers.',
  'Innovative Designs. Engaging Experiences. Lasting Impact.',
]

const metrics = [
  { v: '23+', l: 'Years of Experience' },
  { v: '6000+', l: 'Stalls Executed' },
  { v: '9+', l: 'Industries Served' },
  { v: '14+', l: 'Countries Delivered In' },
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % taglines.length), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" style={{ background: 'var(--gradient-hero)' }}>
      {/* Hero visual — video-ready container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/home/hero-stall.jpg"
          alt="Premium custom exhibition stall built by Approach Media"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--brand-blue-glow)/0.15),transparent_55%)]" />
      </div>

      <div className="container-wide">
        {/* Rotating eyebrow */}
        <div className="flex items-center gap-2 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-glow" />
          <p key={idx} className="animate-fade-up text-xs uppercase tracking-[0.22em] text-muted-foreground md:text-sm">
            {taglines[idx]}
          </p>
        </div>

        <h1 className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Exhibition Spaces That Make Your Brand{' '}
          <span className="text-gradient-brand">Impossible to Ignore.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Your exhibition stall is more than a display. It is a space where your brand is
          experienced, understood, and remembered. We design and build exhibition spaces that
          attract the right audience, guide walk-in interactions, and turn attention into
          lasting impact.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <Link href="/contact">
              Book a Consultation <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/portfolio">
              <Play className="h-4 w-4" /> View Portfolio
            </Link>
          </Button>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/30 bg-border/30 sm:grid-cols-4">
          {metrics.map(m => (
            <div key={m.l} className="bg-surface/80 px-5 py-6 backdrop-blur md:px-7 md:py-8">
              <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">{m.v}</div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
