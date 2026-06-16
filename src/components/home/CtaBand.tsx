import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--brand-blue-glow)/0.18),transparent_55%)]" />
      <div className="container-narrow text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Start building your <span className="text-gradient-brand">exhibition experience</span> today.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Whether you are showcasing, launching, or expanding — your space defines how your brand
          is experienced and how your clients remember you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <Link href="/contact">Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/portfolio">View Our Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
