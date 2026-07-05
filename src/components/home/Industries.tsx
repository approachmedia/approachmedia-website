'use client'

/**
 * Industries we serve — rotating-dial scroll effect (client's rotate_g mechanic).
 *
 * All cards are fixed on the rim of ONE wheel whose pivot sits far below the
 * section. Scroll rotates the whole wheel (like the reference's rotate_g), so
 * the cards ride a circular arc — sweeping in from the left and settling into a
 * centred rainbow arch, like a clock hand. The heading + paragraph stay still
 * in the clear middle; the headline wipes into the brand gradient.
 * Reduced-motion → static grid.
 *
 * Images:  /industries/exhibition-stall-design-<slug>.jpg
 */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
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
const R = 98          // wheel radius (vh)
const SPAN = 88       // total angular spread of the rim cards (deg)
const START = -56     // wheel rotation at scroll 0 (cards parked to the left)
const END = 0         // wheel rotation when the arch is centred

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

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

  // One transform drives the whole wheel — the rotate_g rotation.
  const wheelRotate = useTransform(progress, v => lerp(START, END, smoothstep(0, 0.82, v)))
  const fillClip    = useTransform(progress, v => `inset(0 ${100 - smoothstep(0, 0.5, v) * 100}% 0 0)`)

  if (prefersReduced) return <StaticIndustries />

  return (
    <div ref={wrapRef} style={{ height: '260vh' }} className="relative bg-surface/40">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* The rotating dial — cards fixed on the rim, pivot far below */}
        <motion.div
          style={{ rotate: wheelRotate }}
          className="pointer-events-none absolute left-1/2 top-full z-10 h-0 w-0"
        >
          {industries.map((item, i) => {
            const angle = -SPAN / 2 + (i / (N - 1)) * SPAN
            return (
              <div
                key={i}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${angle}deg) translateY(-${R}vh)` }}
              >
                <figure className="absolute m-0 -ml-[4.5rem] -mt-[6rem] h-48 w-36">
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
                </figure>
              </div>
            )
          })}
        </motion.div>

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
