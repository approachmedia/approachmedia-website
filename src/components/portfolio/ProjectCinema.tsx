'use client'

/**
 * ProjectCinema — full-screen scroll-driven opening experience for a single
 * project case study (Agentura-style).
 *
 * The project's own photo set becomes the scenes: a tall scroll container pins
 * the viewport, and scroll progress crossfades through the images while the
 * client name holds center stage. Geometric outline shapes (triangle-led — the
 * brand mark — then circle, square, rounded) morph, rotate and parallax between
 * scenes, each with its own accent color.
 *
 * Respects prefers-reduced-motion with a static single-image hero fallback.
 */

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export type CinemaScene = {
  src:     string
  alt:     string
  caption: string | null
}

export type CinemaProps = {
  title:    string           // big centered name (client or short project name)
  meta:     string           // "FITAG Tech Expo · Gandhinagar · 2025 · 24 sqm"
  category: string | null    // industry label
  scenes:   CinemaScene[]
}

const SHAPES = ['triangle', 'circle', 'square', 'rounded'] as const
type Shape = (typeof SHAPES)[number]

const SHAPE_STYLE: Record<Shape, { clipPath: string; borderRadius: string }> = {
  triangle: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',          borderRadius: '0%' },
  circle:   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '50%' },
  square:   { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '4%' },
  rounded:  { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '28%' },
}

const ACCENTS = ['#38bdf8', '#4ade80', '#f59e0b', '#e879f9']

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

// ── Static fallback ──────────────────────────────────────────────────────────

function StaticCinema({ title, meta, category, scenes }: CinemaProps) {
  const first = scenes[0]
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black">
      <img src={first.src} alt={first.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-6 text-center">
        {category && <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-sky-400">{category}</p>}
        <h1 className="font-display text-4xl font-black uppercase leading-none text-white md:text-7xl">{title}</h1>
        {meta && <p className="mt-4 text-sm tracking-widest text-slate-300">{meta}</p>}
      </div>
    </section>
  )
}

// ── Animated cinema ──────────────────────────────────────────────────────────

export default function ProjectCinema(props: CinemaProps) {
  const { title, meta, category, scenes } = props
  const prefersReduced = useReducedMotion()
  const containerRef   = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const shapeRotate   = useTransform(scrollYProgress, [0, 1], [0, 300])
  const shapeRotateCC = useTransform(scrollYProgress, [0, 1], [30, -270])
  const shapeY        = useTransform(scrollYProgress, [0, 1], ['6%', '-12%'])
  const shapeScale    = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.06, 0.95])
  const bgZoom        = useTransform(scrollYProgress, [0, 1], [1.04, 1.12])
  const titleScale    = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  useMotionValueEvent(scrollYProgress, 'change', v => {
    const idx = Math.min(scenes.length - 1, Math.floor(v * scenes.length))
    if (idx !== active) setActive(idx)
  })

  if (scenes.length === 0) return null
  if (prefersReduced || scenes.length === 1) return <StaticCinema {...props} />

  const scene  = scenes[active]
  const shape  = SHAPES[active % SHAPES.length]
  const accent = ACCENTS[active % ACCENTS.length]

  return (
    <div ref={containerRef} style={{ height: `${scenes.length * 100}vh` }} className="relative">
      {/* Preload all scene images */}
      <div className="hidden" aria-hidden>
        {scenes.map((s, i) => <img key={i} src={s.src} alt="" />)}
      </div>

      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* Background image — crossfade + slow zoom */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={scene.src}
              alt={scene.alt}
              style={{ scale: bgZoom }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlay + vignette */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />

        {/* Morphing outline shape */}
        <motion.div
          style={{ rotate: shapeRotate, y: shapeY, scale: shapeScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -ml-[17rem] -mt-[17rem] h-[34rem] w-[34rem] will-change-transform md:-ml-[22rem] md:-mt-[22rem] md:h-[44rem] md:w-[44rem]"
        >
          <motion.div
            animate={{
              clipPath:     SHAPE_STYLE[shape].clipPath,
              borderRadius: SHAPE_STYLE[shape].borderRadius,
              borderColor:  accent,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full border-2 opacity-35"
          />
        </motion.div>

        {/* Satellite brand triangle + circle */}
        <motion.div
          style={{ rotate: shapeRotateCC }}
          className="pointer-events-none absolute right-[10%] top-[16%] h-20 w-20 will-change-transform md:h-32 md:w-32"
        >
          <motion.div
            animate={{ borderColor: accent }}
            transition={{ duration: 1 }}
            className="h-full w-full opacity-50"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', border: `2px solid ${accent}` }}
          />
        </motion.div>
        <motion.div
          style={{ rotate: shapeRotate }}
          className="pointer-events-none absolute bottom-[14%] left-[8%] h-14 w-14 will-change-transform md:h-20 md:w-20"
        >
          <div className="h-full w-full rounded-full border-2 opacity-35" style={{ borderColor: accent }} />
        </motion.div>

        {/* Centered content — title constant, caption/counter swap per scene */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {category && (
            <motion.p
              animate={{ color: accent }}
              transition={{ duration: 0.8 }}
              className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] md:text-xs"
            >
              {category}
            </motion.p>
          )}

          <motion.h1
            style={{ scale: titleScale }}
            className="mx-auto max-w-5xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white will-change-transform md:text-8xl"
          >
            {title}
          </motion.h1>

          {meta && (
            <p className="mt-6 text-[11px] tracking-[0.25em] text-slate-300 md:text-sm">{meta}</p>
          )}

          {/* Scene caption + counter */}
          <div className="mt-10 h-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="flex items-center justify-center gap-4"
              >
                <span className="font-display text-sm font-bold" style={{ color: accent }}>
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-10 bg-white/30" />
                <span className="max-w-xs truncate text-xs uppercase tracking-[0.2em] text-white/70 md:max-w-md">
                  {scene.caption ?? `Scene ${active + 1} of ${scenes.length}`}
                </span>
                <span className="h-px w-10 bg-white/30" />
                <span className="font-display text-sm font-bold text-white/40">
                  {String(scenes.length).padStart(2, '0')}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scene progress rail */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
          {scenes.map((_, i) => (
            <motion.span
              key={i}
              animate={{
                width:           i === active ? 28 : 8,
                backgroundColor: i === active ? accent : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.4 }}
              className="h-1 rounded-full"
            />
          ))}
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {active === 0 && (
            <motion.p
              exit={{ opacity: 0 }}
              className="absolute bottom-8 right-8 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-white/50 md:block"
            >
              Scroll
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
