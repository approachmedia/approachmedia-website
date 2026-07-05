'use client'

/**
 * Industries we serve — centred orbit wheel, refined per client spec:
 *
 *  1. SQUARE cards (rounded-lg, aspect-square, object-cover),
 *     ~220px desktop / ~150px mobile; side cards scale down to ~0.72.
 *  2. ONE title, never rotated, rendered in a fixed centred slot directly
 *     below the active (centre) image: industries[activeIndex].label.
 *  3. Active image: scale 1.08, opacity 1, higher z, stronger ring.
 *     Others: opacity 0.45–0.65, smaller scale.
 *  4. activeIndex = Math.round(progress * (N - 1)) — the image closest to
 *     the viewport centre owns the title.
 *  5. LAYOUT: the heading group is the primary focus — absolutely centred
 *     at left 50% / top 30% (translate -50/-50), z above the images. The
 *     active card sits BELOW it at left 50% / top 66%; side cards arc down
 *     toward the left/right/bottom edges and never cover the heading.
 *  6. Cards tilt slightly (tangent to the arc); upright when at centre.
 *  7. Sticky: outer wrapper is tall (30vh per industry, min 300vh); the
 *     inner h-screen viewport stays pinned until the LAST industry has
 *     reached the centre, then the page continues.
 *  8. Left/right 18vw gradient overlays fade edge cards into the dark
 *     section background as they enter/exit the arc.
 *
 * Rotation is scroll-driven with the reference's lerp smoothing (EASE 0.08).
 * Images:  /industries/exhibition-stall-design-<slug>.jpg
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
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

const N    = ITEMS.length
const STEP = 360 / N          // angular gap between cards on the disc
const EASE = 0.08             // lerp smoothing from the reference

export function Industries() {
  const wrapRef  = useRef<HTMLDivElement>(null)   // tall scroll wrapper
  const wheelRef = useRef<HTMLDivElement>(null)   // rotating disc
  const [active, setActive] = useState(0)

  useEffect(() => {
    const wrap  = wrapRef.current
    const wheel = wheelRef.current
    if (!wrap || !wheel) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(wheel.children) as HTMLElement[]
    const cards = nodes.map(n => n.firstElementChild as HTMLElement)

    let radius = 600

    function placeItems() {
      const vw = window.innerWidth
      radius = Math.min(Math.max(vw * 0.46, 420), 940)
    }

    // Scroll progress through the tall wrapper: 0 → first card centred,
    // 1 → last card centred (section unpins only after the last one).
    let target = 0
    let current = -0.001
    let lastIdx = -1
    let rafId = 0

    function updateTarget() {
      const rect = wrap!.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      target = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0
    }

    function render(p: number) {
      const theta = -STEP * (N - 1) * p          // disc rotation (deg)

      // Direct trig: each card orbits a centre at (50%, 66% + R).
      // phi = card's current angle from the TOP slot (0 = centred).
      nodes.forEach((node, i) => {
        const phi = (STEP * i + theta) * (Math.PI / 180)
        const x = radius * Math.sin(phi)
        const y = radius * (1 - Math.cos(phi))
        const tiltDeg = STEP * i + theta          // tangent tilt; 0 when centred

        const dSteps = Math.abs(STEP * i + theta) / STEP
        const isActive = dSteps < 0.5
        const scale   = isActive ? 1.08 : Math.max(0.72, 1 - dSteps * 0.1)
        const opacity = isActive ? 1 : Math.max(0.45, 0.65 - (dSteps - 0.5) * 0.08)

        node.style.transform =
          `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) ` +
          `rotate(${tiltDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        node.style.opacity = opacity.toFixed(3)
        node.style.zIndex = String(isActive ? 30 : Math.max(1, 20 - Math.round(dSteps * 4)))

        const card = cards[i]
        card.style.boxShadow = isActive
          ? '0 0 0 2px rgba(255,255,255,0.45), 0 24px 60px rgba(0,0,0,0.6)'
          : '0 0 0 1px rgba(255,255,255,0.12), 0 12px 32px rgba(0,0,0,0.45)'
      })

      const idx = Math.max(0, Math.min(N - 1, Math.round(p * (N - 1))))
      if (idx !== lastIdx) { lastIdx = idx; setActive(idx) }
    }

    function loop() {
      current += (target - current) * EASE
      render(current)
      rafId = requestAnimationFrame(loop)
    }

    function onResize() { placeItems(); updateTarget() }

    placeItems()
    updateTarget()

    if (reduced) {
      render(0)
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
    // 7. Sticky scroll: 30vh of scroll per industry (min 300vh total).
    //    Solid dark background so nothing behind can ever bleed through.
    <div ref={wrapRef} style={{ height: `${Math.max(300, N * 30)}vh` }} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── The orbiting cards — active slot at 50% / 66% ── */}
        <div ref={wheelRef} className="pointer-events-none absolute inset-0">
          {ITEMS.map(item => (
            <div
              key={item.label}
              className="absolute left-1/2 top-[66%] will-change-transform"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              {/* square card */}
              <div className="h-[150px] w-[150px] overflow-hidden rounded-lg bg-surface md:h-[220px] md:w-[220px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${CDN}/${item.img}`}
                  alt={`${item.label} exhibition stall design`}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Edge fades — cards dissolve into the dark bg at both sides ── */}
        <div className="pointer-events-none absolute left-0 top-0 z-[35] h-full w-[18vw] bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-[35] h-full w-[18vw] bg-gradient-to-l from-background to-transparent" />

        {/* ── Heading — the primary focus, centred at upper-middle ── */}
        <div className="pointer-events-none absolute left-1/2 top-[30%] z-40 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Industries we serve</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Designed for the way <span className="text-gradient-brand">your industry</span> communicates.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every industry tells its story differently. We translate technical, sensory and emotional cues into spaces that perform.
          </p>
        </div>

        {/* ── ONE centred title, directly below the active image ── */}
        <div className="pointer-events-none absolute left-1/2 top-[66%] z-40 -translate-x-1/2 pt-[92px] text-center md:pt-[126px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="whitespace-nowrap font-display text-xl font-bold text-white md:text-2xl"
            >
              {ITEMS[active].label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress + CTA */}
        <div className="absolute inset-x-0 bottom-[3vh] z-40 flex flex-col items-center gap-4">
          <div className="flex items-center gap-1.5">
            {ITEMS.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-brand-green' : 'w-1.5 bg-white/25'}`} />
            ))}
          </div>
          <Button asChild variant="hero" size="lg" className="pointer-events-auto">
            <Link href="/portfolio">Explore by Industry</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
