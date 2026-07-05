'use client'

/**
 * Industries we serve — reference-video scroll effect.
 *
 * A pinned section: as the user scrolls, the headline wipes from muted into
 * the brand gradient (left→right), and one tilted photo card per industry
 * fans out from a tight cluster into a rotated arc, each labelled, then
 * drifts upward. Reduced-motion users get a static labelled grid.
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
  { label: 'Valves, Pumps & Gears',img: 'exhibition-stall-design-valves-pumps-gears.jpg' },
  { label: 'Renewable Energy',     img: 'exhibition-stall-design-renewable-energy.jpg' },
  { label: 'Water',                img: 'exhibition-stall-design-water-industry.jpg' },
  { label: 'Cosmetics',            img: 'exhibition-stall-design-cosmetics.jpg' },
  { label: 'Doors & Windows',      img: 'exhibition-stall-design-doors-windows.jpg' },
  { label: 'Battery',              img: 'exhibition-stall-design-battery.jpg' },
  { label: 'Lighting',             img: 'exhibition-stall-design-lighting.jpg' },
  { label: 'Events',               img: 'exhibition-stall-design-events.jpg' },
]

const N = industries.length

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ── One fanning card ──────────────────────────────────────────────
function Card({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const t = N > 1 ? index / (N - 1) : 0.5            // 0..1 across the arc
  const xTarget   = -45 + t * 90                     // vw spread
  const arcY      = -Math.sin(t * Math.PI) * 80 + 20 // px — centre highest
  const rotTarget = -18 + t * 36                     // deg tilt
  const isCentre  = Math.abs(t - 0.5) < 0.5 / N

  const x = useTransform(progress, v => `${xTarget * smoothstep(0.05, 0.55, v)}vw`)
  const y = useTransform(progress, v => {
    const spread = smoothstep(0.05, 0.55, v)
    const drift  = smoothstep(0.55, 1, v)
    return 90 + (arcY - 90) * spread - drift * 170
  })
  const rotate  = useTransform(progress, v => rotTarget * smoothstep(0.05, 0.55, v))
  const scale   = useTransform(progress, v => 0.5 + 0.5 * smoothstep(0.05, 0.55, v))
  const opacity = useTransform(progress, v => {
    const spread = smoothstep(0.02, 0.5, v)
    const drift  = smoothstep(0.72, 1, v)
    return Math.min(1, spread * 1.35) * (1 - drift * 0.5)
  })

  const item = industries[index]

  return (
    <motion.figure
      style={{ x, y, rotate, scale, opacity, zIndex: isCentre ? 20 : 10 - Math.round(Math.abs(t - 0.5) * 12) }}
      className="absolute left-1/2 top-1/2 m-0 -ml-[5.5rem] -mt-[7rem] h-56 w-44 will-change-transform md:-ml-[6rem] md:-mt-[7.5rem] md:h-60 md:w-48"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${CDN}/${item.img}`}
          alt={`${item.label} exhibition stall design`}
          loading="lazy"
          className="h-52 w-full rounded-lg object-cover md:h-56"
        />
        {/* label overlaid on the card so 16 captions never collide */}
        <div className="absolute inset-x-1.5 bottom-1.5 rounded-b-lg bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2.5 pt-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white">{item.label}</p>
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

  // Headline wipe: muted → brand gradient, left to right
  const fillClip = useTransform(progress, v => `inset(0 ${100 - smoothstep(0, 0.5, v) * 100}% 0 0)`)

  if (prefersReduced) return <StaticIndustries />

  return (
    <div ref={wrapRef} style={{ height: '260vh' }} className="relative bg-surface/40">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-[11vh]">

        {/* Headline with scroll colour-fill */}
        <div className="container-narrow relative z-30 text-center">
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

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Every industry tells its story differently. We translate technical, sensory and emotional cues into spaces that perform.
          </p>
        </div>

        {/* Fanning cards layer */}
        <div className="pointer-events-none relative mt-2 h-[52vh] w-full">
          {industries.map((_, i) => (
            <Card key={i} progress={progress} index={i} />
          ))}
        </div>

        <div className="relative z-30">
          <Button asChild variant="hero" size="lg">
            <Link href="/portfolio">Explore by Industry</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
