'use client'

/**
 * Industries we serve — circular image wheel (client's final reference code).
 *
 * A large disc sits inside an overflow-hidden container that shows only its
 * top slice. Round industry photos + labels sit evenly on the rim, each
 * counter-rotated so it stays upright. Scroll progress rotates the whole
 * disc (lerp-smoothed rAF loop) while the section travels through the
 * viewport — the exact mechanic from the reference HTML.
 *
 * Images:  /industries/exhibition-stall-design-<slug>.jpg
 * Reduced-motion → wheel renders static (no rotation).
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/industries'

const ITEMS = [
  { label: 'Real Estate',          img: 'exhibition-stall-design-real-estate.jpg' },
  { label: 'Pharma',               img: 'exhibition-stall-design-pharma.jpg' },
  { label: 'Machinery',            img: 'exhibition-stall-design-machinery.jpg' },
  { label: 'FMCG',                 img: 'exhibition-stall-design-fmcg.jpg' },
  { label: 'Garment',              img: 'exhibition-stall-design-garment.jpg' },
  { label: 'Healthcare',           img: 'exhibition-stall-design-healthcare.jpg' },
  { label: 'Plastic',              img: 'exhibition-stall-design-plastic.jpg' },
  { label: 'Printing & Packaging', img: 'exhibition-stall-design-printing-packaging.jpg' },
  { label: 'Valves & Pumps',       img: 'exhibition-stall-design-valves-pumps-gears.jpg' },
  { label: 'Renewable Energy',     img: 'exhibition-stall-design-renewable-energy.jpg' },
  { label: 'Water',                img: 'exhibition-stall-design-water-industry.jpg' },
  { label: 'Cosmetics',            img: 'exhibition-stall-design-cosmetics.jpg' },
  { label: 'Doors & Windows',      img: 'exhibition-stall-design-doors-windows.jpg' },
  { label: 'Battery',              img: 'exhibition-stall-design-battery.jpg' },
  { label: 'Lighting',             img: 'exhibition-stall-design-lighting.jpg' },
  { label: 'Events',               img: 'exhibition-stall-design-events.jpg' },
]

// ── Tuning (from the reference) ───────────────────────────────────
const SPIN_DEGREES = 90   // total rotation across the scroll range
const EASE         = 0.08 // smoothing (lower = smoother/laggier)
const RADIUS_RATIO = 0.444 // rim radius as a fraction of disc width (= 40vw on a 90vw disc)

export function Industries() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wheel     = wheelRef.current
    if (!container || !wheel) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(wheel.children) as HTMLElement[]

    // Place each item evenly around the rim: rotate to its slot, push out by
    // the radius, counter-rotate so it stays upright.
    function placeItems() {
      const step = 360 / nodes.length
      const r = wheel!.offsetWidth * RADIUS_RATIO
      nodes.forEach((node, i) => {
        const angle = step * i
        node.style.transform = `rotate(${angle}deg) translate(${r}px) rotate(${-angle}deg)`
      })
    }

    // Scroll-driven rotation with lerp smoothing.
    let targetAngle = 0
    let currentAngle = 0
    let rafId = 0

    function updateTarget() {
      const rect = container!.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      let progress = (vh - rect.top) / total
      progress = Math.max(0, Math.min(1, progress))
      targetAngle = -SPIN_DEGREES * progress
    }

    function loop() {
      currentAngle += (targetAngle - currentAngle) * EASE
      wheel!.style.transform = `translate(-50%, 0) rotate(${currentAngle.toFixed(3)}deg)`
      rafId = requestAnimationFrame(loop)
    }

    function onResize() { placeItems(); updateTarget() }

    placeItems()
    updateTarget()

    if (reduced) {
      wheel.style.transform = 'translate(-50%, 0) rotate(0deg)'
    } else {
      window.addEventListener('scroll', updateTarget, { passive: true })
      rafId = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="bg-surface/40 py-16 md:py-20">
      {/* Heading */}
      <div className="container-narrow text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Industries we serve</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Designed for the way <span className="text-gradient-brand">your industry</span> communicates.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Every industry tells its story differently. We translate technical, sensory and emotional cues into spaces that perform.
        </p>
      </div>

      {/* ── The clipped viewport: crops the big wheel to its top slice ── */}
      <div
        ref={containerRef}
        className="relative mx-auto mt-4 w-full overflow-hidden"
        style={{ height: 'min(40vw, 560px)', paddingTop: 'min(12.5vw, 175px)' }}
      >
        {/* ── The rotating disc ── */}
        <div
          ref={wheelRef}
          className="relative left-1/2 will-change-transform"
          style={{ width: '90vw', height: '90vw', transform: 'translate(-50%, 0) rotate(0deg)' }}
        >
          {ITEMS.map(item => (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2 w-[25vw] md:w-[12vw]"
              style={{ transformOrigin: '0 0' }}
            >
              <div className="text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-full border border-white/15 bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${CDN}/${item.img}`}
                    alt={`${item.label} exhibition stall design`}
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                </div>
                <div className="mt-[1.2vw] whitespace-nowrap">
                  <div className="text-[2.6vw] font-bold text-foreground md:text-[1vw]">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Button asChild variant="hero" size="lg">
          <Link href="/portfolio">Explore by Industry</Link>
        </Button>
      </div>
    </section>
  )
}
