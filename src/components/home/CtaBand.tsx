import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagneticCta } from '@/components/motion/MagneticCta'
import CtaGallery from './motion/CtaGallery'
import type { GalleryImage } from '@/components/ui/3d-gallery-photography'

export function CtaBand({ images = [] }: { images?: GalleryImage[] }) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-20" style={{ background: 'var(--gradient-hero)' }} />
      {/* Style 1: project photographs flying toward the viewer as the page
          scrolls into the close. A veil keeps the copy readable over it. */}
      <div className="absolute inset-0 -z-10">
        <CtaGallery images={images} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(222_30%_6%/0.78)_20%,hsl(222_30%_6%/0.35)_70%)]" />
      </div>
      <div className="container-narrow relative text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Start building your <span className="text-gradient-brand">exhibition experience</span> today.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Whether you are showcasing, launching, or expanding — your space defines how your brand
          is experienced and how your clients remember you.
        </p>
        {/* The primary action carries the magnetic pull and the rolling
            label; the secondary stays a plain button. Both on one row would
            be two things competing for the same attention, and this is the
            page's single most important click. */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticCta
            href="/contact"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Request a Proposal
          </MagneticCta>
          <Button asChild variant="glass" size="xl">
            <Link href="/portfolio">View Our Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
