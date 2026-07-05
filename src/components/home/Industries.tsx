'use client'

/**
 * Industries we serve — pinned full-screen cross-fade stack.
 *
 * Faithful to the reference `component--contentscrollcenter`:
 *  • the section is `count * PER_CARD` tall; inside sits a `sticky; h-screen`
 *    wrapper, and every card is `absolute; inset-0` — full-screen layers
 *    stacked on top of each other.
 *  • scroll cross-fades between cards. The leaving card fades out while its
 *    image lifts (y 0→-20%) and its info lifts+fades (y 0→-30%); the entering
 *    card fades in while its image settles (y 10%→0) and info rises (y 20%→0).
 *  • an anchor nav lists the industries; the active one is highlighted.
 *
 * Images:  /industries/exhibition-stall-design-<slug>.jpg
 * Reduced-motion → simple stacked grid.
 */

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Button } from '@/components/ui/button'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/industries'

const industries = [
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

const N = industries.length
const PER_CARD_VH = 90        // scroll length per card (reference uses 100vh)

// ── Rotating brand shape (the svgApp / rotate_g overlay) ──────────
// A thin-outline interlocked circle + triangle that rotates and scales in
// sync with scroll, drawn on top of the cross-fading cards — the "scroll
// rotate" effect from the reference.
function RotatingShape({ rotate, scale }: { rotate: MotionValue<number>; scale: MotionValue<number> }) {
  const s = 'rgba(255,255,255,0.85)'
  return (
    <motion.div
      style={{ rotate, scale }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-70 will-change-transform"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden="true">
        <g fill="none" stroke={s} strokeWidth="0.9">
          <circle cx="100" cy="100" r="94" />
          <circle cx="100" cy="100" r="60" />
          <polygon points="100,14 174,158 26,158" />
          <polygon points="100,186 26,42 174,42" strokeOpacity="0.6" />
          {/* corner registration ticks */}
          <g strokeWidth="1.2">
            <line x1="100" y1="0" x2="100" y2="12" /><line x1="100" y1="188" x2="100" y2="200" />
            <line x1="0" y1="100" x2="12" y2="100" /><line x1="188" y1="100" x2="200" y2="100" />
          </g>
        </g>
      </svg>
    </motion.div>
  )
}

// ── One full-screen card ──────────────────────────────────────────
function CardLayer({ progress, index, item }: {
  progress: MotionValue<number>
  index:    number
  item:     { label: string; img: string }
}) {
  const t   = N > 1 ? index / (N - 1) : 0
  const seg = N > 1 ? 1 / (N - 1) : 1

  // d = -1 at the previous card's centre, 0 here, +1 at the next card's centre.
  const d = (p: number) => (p - t) / seg

  const opacity = useTransform(progress, p => Math.max(0, 1 - Math.abs(d(p)) * 1.7))
  const imgY    = useTransform(progress, p => { const x = d(p); return `${x <= 0 ? -x * 10 : -x * 20}%` })
  const imgSc   = useTransform(progress, p => 1.05 + Math.abs(d(p)) * 0.05)
  const infoY   = useTransform(progress, p => { const x = d(p); return `${x <= 0 ? -x * 16 : -x * 30}%` })
  const zIndex  = useTransform(progress, p => Math.round(Math.max(0, 1 - Math.abs(d(p))) * 10))

  return (
    <motion.div style={{ opacity, zIndex }} className="absolute inset-0 will-change-[opacity]">
      {/* full-bleed image with the "space" parallax lift */}
      <motion.div style={{ y: imgY, scale: imgSc }} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CDN}/${item.img}`} alt={`${item.label} exhibition stall design`} loading={index < 2 ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)]" />

      {/* info: kicker + giant title, lifts + fades with scroll */}
      <motion.div style={{ y: infoY }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-brand-green md:text-xs">Exhibition Stall Design</p>
        <h3 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-8xl">
          {item.label}
        </h3>
      </motion.div>
    </motion.div>
  )
}

// ── Static fallback ───────────────────────────────────────────────
function StaticIndustries() {
  return (
    <section className="bg-surface/40 py-20 md:py-28">
      <div className="container-narrow text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Industries we serve</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Designed for the way <span className="text-gradient-brand">your industry</span> communicates.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map(i => (
            <div key={i.label} className="relative overflow-hidden rounded-xl border border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${CDN}/${i.img}`} alt={`${i.label} exhibition stall design`} loading="lazy" className="h-36 w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-white">{i.label}</p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild variant="hero" size="lg" className="mt-10">
          <Link href="/portfolio">Explore by Industry</Link>
        </Button>
      </div>
    </section>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export function Industries() {
  const prefersReduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 })

  // The rotate_g effect: the brand shape rotates ~1 full turn across the whole
  // section and scales gently — in sync with scroll, over the cards.
  const shapeRotate = useTransform(progress, [0, 1], [0, 330])
  const shapeScale  = useTransform(progress, [0, 0.5, 1], [0.85, 1.08, 0.9])

  useMotionValueEvent(progress, 'change', v => {
    const idx = Math.round(v * (N - 1))
    if (idx !== active) setActive(idx)
  })

  if (prefersReduced) return <StaticIndustries />

  return (
    <div ref={wrapRef} style={{ height: `${N * PER_CARD_VH}vh` }} className="relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Cross-fading full-screen cards */}
        {industries.map((item, i) => (
          <CardLayer key={i} progress={progress} index={i} item={item} />
        ))}

        {/* Rotating brand shape overlay — the scroll-rotate effect */}
        <RotatingShape rotate={shapeRotate} scale={shapeScale} />

        {/* Persistent section kicker (top) */}
        <div className="pointer-events-none absolute inset-x-0 top-[8vh] z-30 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Industries we serve</p>
        </div>

        {/* Anchor nav — lists industries, active highlighted (desktop) */}
        <ul className="absolute left-[4vw] top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
          {industries.map((item, i) => (
            <li key={i}>
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  i === active ? 'text-brand-green' : 'text-white/35'
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Progress rail (bottom) + CTA */}
        <div className="absolute inset-x-0 bottom-[7vh] z-30 flex flex-col items-center gap-6">
          <div className="flex items-center gap-1.5">
            {industries.map((_, i) => (
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
