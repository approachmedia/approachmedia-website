'use client'

/**
 * PortfolioShowcase — cinematic sticky-scroll project experience.
 *
 * A tall scroll container pins a full-screen viewport. Scroll progress maps to
 * an active project index: the background image, centered client title and the
 * floating geometric shape (triangle → circle → square → rounded rect, echoing
 * the triangle-based Approach Media logo) all change scene by scene.
 *
 * Respects prefers-reduced-motion with a static stacked fallback.
 */

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export type ShowcaseItem = {
  slug:       string
  clientName: string
  eventName:  string | null
  location:   string | null
  year:       number | null
  boothSize:  string | null
  heroImage:  string
  heroAlt:    string
  category:   string | null
}

// Shape cycle — triangle leads (brand), then circle, square, rounded square.
const SHAPES = ['triangle', 'circle', 'square', 'rounded'] as const
type Shape = (typeof SHAPES)[number]

const SHAPE_STYLE: Record<Shape, { clipPath: string; borderRadius: string }> = {
  triangle: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',                 borderRadius: '0%' },
  circle:   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',        borderRadius: '50%' },
  square:   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',        borderRadius: '4%' },
  rounded:  { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',        borderRadius: '28%' },
}

const ACCENTS = ['#38bdf8', '#4ade80', '#f59e0b', '#e879f9']

// Subtle film grain as an inline SVG — no network request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

function sceneMeta(item: ShowcaseItem) {
  return [item.eventName, item.location, item.year ? String(item.year) : null, item.boothSize]
    .filter(Boolean)
    .join('  ·  ')
}

// ── Static fallback (reduced motion / no-JS-feel) ────────────────────────────

function StaticShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <section key={item.slug} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
          <img src={item.heroImage} alt={item.heroAlt} className="absolute inset-0 h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 px-6 text-center">
            {item.category && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: ACCENTS[i % ACCENTS.length] }}>{item.category}</p>
            )}
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-7xl">{item.clientName}</h2>
            <p className="mt-4 text-sm tracking-widest text-slate-300">{sceneMeta(item)}</p>
            <Link href={`/portfolio/${item.slug}`} className="mt-8 inline-block border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
              View Project
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

// ── Animated showcase ────────────────────────────────────────────────────────

export default function PortfolioShowcase({ items }: { items: ShowcaseItem[] }) {
  const prefersReduced = useReducedMotion()
  const containerRef   = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  // Continuous motion values — GPU-friendly transforms only.
  const shapeRotate   = useTransform(scrollYProgress, [0, 1], [0, 360])
  const shapeRotateCC = useTransform(scrollYProgress, [0, 1], [45, -315])
  const shapeY        = useTransform(scrollYProgress, [0, 1], ['8%', '-14%'])
  const shapeScale    = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.08, 0.94])
  const bgZoom        = useTransform(scrollYProgress, [0, 1], [1.05, 1.14])

  useMotionValueEvent(scrollYProgress, 'change', v => {
    const idx = Math.min(items.length - 1, Math.floor(v * items.length))
    if (idx !== active) setActive(idx)
  })

  const item   = items[active]
  const shape  = SHAPES[active % SHAPES.length]
  const accent = ACCENTS[active % ACCENTS.length]
  const meta   = useMemo(() => sceneMeta(item), [item])

  if (items.length === 0) return null
  if (prefersReduced) return <StaticShowcase items={items} />

  return (
    <div ref={containerRef} style={{ height: `${items.length * 100}vh` }} className="relative">
      {/* Preload every scene image so swaps are instant */}
      <div className="hidden" aria-hidden>
        {items.map(it => <img key={it.slug} src={it.heroImage} alt="" />)}
      </div>

      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* Background image — crossfade + slow zoom */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={item.heroImage}
              alt={item.heroAlt}
              style={{ scale: bgZoom }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic dark overlay + vignette */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />

        {/* Morphing shape — behind text, above image. Parallax: moves faster than bg. */}
        <motion.div
          style={{ rotate: shapeRotate, y: shapeY, scale: shapeScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -ml-[19rem] -mt-[19rem] h-[38rem] w-[38rem] will-change-transform md:-ml-[24rem] md:-mt-[24rem] md:h-[48rem] md:w-[48rem]"
        >
          <motion.div
            animate={{
              clipPath:     SHAPE_STYLE[shape].clipPath,
              borderRadius: SHAPE_STYLE[shape].borderRadius,
              borderColor:  accent,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full border-2 opacity-40"
            style={{ borderWidth: 2 }}
          />
        </motion.div>

        {/* Secondary small counter-rotating triangle — always a triangle (brand mark) */}
        <motion.div
          style={{ rotate: shapeRotateCC }}
          className="pointer-events-none absolute right-[12%] top-[18%] h-24 w-24 will-change-transform md:h-36 md:w-36"
        >
          <motion.div
            animate={{ borderColor: accent }}
            transition={{ duration: 1 }}
            className="h-full w-full opacity-60"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', backgroundColor: 'transparent', border: `2px solid ${accent}` }}
          />
        </motion.div>
        <motion.div
          style={{ rotate: shapeRotate }}
          className="pointer-events-none absolute bottom-[16%] left-[10%] h-16 w-16 will-change-transform md:h-24 md:w-24"
        >
          <div className="h-full w-full rounded-full border-2 opacity-40" style={{ borderColor: accent }} />
        </motion.div>

        {/* Centered content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.slug}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show:   { transition: { staggerChildren: 0.09 } },
                exit:   { opacity: 0, y: -24, transition: { duration: 0.35 } },
              }}
            >
              {item.category && (
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] md:text-xs"
                  style={{ color: accent }}
                >
                  {item.category}
                </motion.p>
              )}

              <motion.h2
                variants={{ hidden: { opacity: 0, y: 40, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                className="mx-auto max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-8xl"
              >
                {item.clientName}
              </motion.h2>

              {meta && (
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.05 } } }}
                  className="mt-6 text-xs tracking-[0.25em] text-slate-300 md:text-sm"
                >
                  {meta}
                </motion.p>
              )}

              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } } }}
                className="mt-10"
              >
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="border border-white/40 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                >
                  View Project
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scene progress rail */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
          {items.map((it, i) => (
            <motion.span
              key={it.slug}
              animate={{
                width:           i === active ? 28 : 8,
                backgroundColor: i === active ? accent : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.4 }}
              className="h-1 rounded-full"
            />
          ))}
        </div>

        {/* Scroll hint — first scene only */}
        <AnimatePresence>
          {active === 0 && (
            <motion.p
              exit={{ opacity: 0 }}
              className="absolute bottom-8 right-8 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-white/50 md:block"
            >
              Scroll to explore
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="ml-2 inline-block">↓</motion.span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>
    </div>
  )
}
