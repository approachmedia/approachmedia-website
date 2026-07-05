'use client'

/**
 * Industries we serve — reference-video scroll effect.
 *
 * A pinned section: as the user scrolls, the headline wipes from muted into
 * the brand gradient (left→right), and one tilted photo card per industry
 * fans out from a tight cluster into a rotated arc, each labelled, then
 * drifts upward. Reduced-motion users get a static labelled grid.
 *
 * Images live on R2:  /images/industries/<slug>.jpg
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

const industries = [
  { label: 'Real Estate',        img: 'real-estate.jpg' },
  { label: 'Pharma',             img: 'pharma.jpg' },
  { label: 'Manufacturing',      img: 'manufacturing.jpg' },
  { label: 'FMCG',               img: 'fmcg.jpg' },
  { label: 'Textile',            img: 'textile.jpg' },
  { label: 'Technology',         img: 'technology.jpg' },
  { label: 'Automotive',         img: 'automotive.jpg' },
  { label: 'Healthcare',         img: 'healthcare.jpg' },
  { label: 'Architecture',       img: 'architecture.jpg' },
  { label: 'Construction',       img: 'construction.jpg' },
]

const N = industries.length

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ── One fanning card ──────────────────────────────────────────────
function Card({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const t = N > 1 ? index / (N - 1) : 0.5           // 0..1 across the arc
  const xTarget   = -42 + t * 84                    // vw spread
  const arcY      = -Math.sin(t * Math.PI) * 90 + 30 // px — centre highest
  const rotTarget = -16 + t * 32                     // deg tilt

  const x = useTransform(progress, v => {
    const spread = smoothstep(0.05, 0.55, v)
    return `${xTarget * spread}vw`
  })
  const y = useTransform(progress, v => {
    const spread = smoothstep(0.05, 0.55, v)
    const drift  = smoothstep(0.55, 1, v)
    return 90 + (arcY - 90) * spread - drift * 170
  })
  const rotate  = useTransform(progress, v => rotTarget * smoothstep(0.05, 0.55, v))
  const scale   = useTransform(progress, v => 0.55 + 0.45 * smoothstep(0.05, 0.55, v))
  const opacity = useTransform(progress, v => {
    const spread = smoothstep(0.02, 0.5, v)
    const drift  = smoothstep(0.7, 1, v)
    return Math.min(1, spread * 1.3) * (1 - drift * 0.5)
  })

  const item = industries[index]

  return (
    <motion.figure
      style={{ x, y, rotate, scale, opacity, zIndex: index === Math.floor(N / 2) ? 5 : 1 }}
      className="absolute left-1/2 top-1/2 m-0 -ml-[7rem] -mt-[7rem] h-56 w-56 will-change-transform md:-ml-[8rem] md:-mt-[8rem] md:h-64 md:w-64"
    >
      <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/50 backdrop-blur-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${CDN}/${item.img}`}
          alt={`${item.label} exhibition stall design`}
          loading="lazy"
          className="h-40 w-full rounded-md object-cover md:h-48"
        />
      </div>
      <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
        {item.label}
      </figcaption>
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
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map(i => (
            <div key={i.label} className="overflow-hidden rounded-xl border border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${CDN}/${i.img}`} alt={`${i.label} exhibition stall`} loading="lazy" className="h-32 w-full object-cover" />
              <p className="py-2 text-xs font-semibold uppercase tracking-wider text-foreground">{i.label}</p>
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
    <div ref={wrapRef} style={{ height: '240vh' }} className="relative bg-surface/40">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-[12vh]">

        {/* Headline with scroll colour-fill */}
        <div className="container-narrow relative z-10 text-center">
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
        <div className="pointer-events-none relative mt-4 h-[52vh] w-full">
          {industries.map((_, i) => (
            <Card key={i} progress={progress} index={i} />
          ))}
        </div>

        <div className="relative z-10">
          <Button asChild variant="hero" size="lg">
            <Link href="/portfolio">Explore by Industry</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
