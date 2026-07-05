'use client'

/**
 * Industries we serve — reference-video scroll effect.
 *
 * A pinned section. As the user scrolls, the headline wipes from muted into
 * the brand gradient (left→right), and the industry photo cards fan out from
 * a tight centre cluster into a wide ARCH that curves up and around the
 * centred heading + paragraph — the middle stays clear so the copy is always
 * readable, exactly like the reference. Each card tilts tangent to the arch
 * and carries a label. Reduced-motion users get a static labelled grid.
 *
 * Images live on R2:  /images/industries/exhibition-stall-design-<slug>.jpg
 */

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Button } from '@/components/ui/button'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/industries'

// SEO filenames — every image carries the "exhibition-stall-design" keyword.
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
const ARC = 2.95 // total sweep of the arch in radians (~169°)

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// Entry point — all cards start stacked at the bottom-LEFT, tilted, then get
// dealt into the arch one by one, left → right, like a clock hand sweeping.
const ENTRY_X = -50   // vw
const ENTRY_Y = 30    // vh (below centre-left)
const ENTRY_ROT = -95 // deg

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// ── One card riding the arch ──────────────────────────────────────
function Card({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const t = N > 1 ? index / (N - 1) : 0.5
  const a = (t - 0.5) * ARC              // angle along the arch (rad)

  // Final arch position: sin drives horizontal spread, -cos lifts the centre
  // cards up and lets the outer cards swing down the sides.
  const xTarget   = Math.sin(a) * 46      // vw
  const yTarget   = -Math.cos(a) * 34 + 4 // vh  (centre highest, ends near mid)
  const rotTarget = a * (180 / Math.PI)   // deg — tangent tilt

  // Per-card stagger: leftmost lands first, rightmost last → left→right sweep.
  const start = t * 0.62
  const win   = 0.3
  const local = (v: number) => smoothstep(start, start + win, v)

  const x = useTransform(progress, v => `${lerp(ENTRY_X, xTarget, local(v))}vw`)
  const y = useTransform(progress, v => `${lerp(ENTRY_Y, yTarget, local(v))}vh`)
  const rotate  = useTransform(progress, v => lerp(ENTRY_ROT, rotTarget, local(v)))
  const scale   = useTransform(progress, v => lerp(0.45, 1, local(v)))
  const opacity = useTransform(progress, v => smoothstep(start, start + 0.08, v))

  const item = industries[index]
  // later cards (further right) sit in front as they're dealt on top
  const depth = index

  return (
    <motion.figure
      style={{ x, y, rotate, scale, opacity, zIndex: depth }}
      className="absolute left-1/2 top-1/2 m-0 -ml-[4.75rem] -mt-[6rem] h-48 w-[9.5rem] will-change-transform"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/5 p-1 shadow-2xl shadow-black/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${CDN}/${item.img}`}
          alt={`${item.label} exhibition stall design`}
          loading="lazy"
          className="h-44 w-full rounded-lg object-cover"
        />
        <div className="absolute inset-x-1 bottom-1 rounded-b-lg bg-gradient-to-t from-black/90 via-black/40 to-transparent px-2 pb-2 pt-7">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-white">{item.label}</p>
        </div>
      </div>
    </motion.figure>
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

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 })

  const fillClip = useTransform(progress, v => `inset(0 ${100 - smoothstep(0, 0.5, v) * 100}% 0 0)`)

  if (prefersReduced) return <StaticIndustries />

  return (
    <div ref={wrapRef} style={{ height: '260vh' }} className="relative bg-surface/40">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Cards arch layer — behind the copy */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {industries.map((_, i) => (
            <Card key={i} progress={progress} index={i} />
          ))}
        </div>

        {/* Centred copy — always readable in the clear middle of the arch */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Industries we serve</p>

          <div className="relative mx-auto mt-3 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-muted-foreground/40 md:text-5xl">
              Designed for the way your industry communicates.
            </h2>
            <motion.h2
              style={{ clipPath: fillClip }}
              className="absolute inset-0 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl"
            >
              Designed for the way <span className="text-gradient-brand">your industry</span> communicates.
            </motion.h2>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Every industry tells its story differently. We translate technical, sensory and emotional cues into spaces that perform.
          </p>

          <Button asChild variant="hero" size="lg" className="mt-8">
            <Link href="/portfolio">Explore by Industry</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
