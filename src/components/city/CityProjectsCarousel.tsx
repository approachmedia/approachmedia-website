'use client'

/**
 * City portfolio wall — Motion's "scroll velocity linked offset" example,
 * rebuilt against real projects.
 *
 * The transform maths is the example's, unchanged: planes are laid out on a
 * single axis, wrapped into an endless loop, then thrown into depth with
 * translate3d(x, x * -0.35, x * -1.2) and a fixed rotateY(-50deg), viewed
 * through a 2000px perspective whose origin sits up in the top-left corner.
 * That combination is what produces the diagonal receding wall — it is the
 * look, and it is why a centred arc did not resemble the example.
 *
 * Four things had to change to put a full-page demo inside a page:
 *
 *  1. The demo sets `body { overflow: hidden }`. Pasted in, that would make
 *     the entire site unscrollable.
 *  2. It calls preventDefault() on wheel and sets touch-action: none across a
 *     100vw/100vh container. Mid-page that traps the visitor: they reach the
 *     gallery and neither wheel nor swipe moves the page again. Here the row
 *     is driven by the section's own progress through the viewport, so
 *     scrolling both moves the page and surfs the wall, and the velocity of
 *     that scroll still drives the wave exactly as in the example. Sideways
 *     drag works too, at the example's 2.5x multiplier.
 *  3. ScrambleText comes from `motion-plus/react`, which is the paid package.
 *     The same effect is reproduced below from the site's existing
 *     ScrambleLink, with the example's glyph set.
 *  4. Images are project photos through next/image, and every plane is a
 *     link to its project, so the section keeps the internal linking the
 *     grid it replaced was providing.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from 'framer-motion'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'

// ── the example's constants ──────────────────────────────────

const PLANE_WIDTH = 320
const PLANE_HEIGHT = 384
/** Negative on purpose — the planes overlap, which is what tightens the wall. */
const PLANE_GAP = -80
const STEP = PLANE_WIDTH + PLANE_GAP

/** Phone sizes. The transforms are in px, so this cannot be done in CSS. */
const MOBILE_WIDTH = 210
const MOBILE_HEIGHT = 252
const MOBILE_GAP = -55

/**
 * How far the wall travels either side of centre over one pass of the
 * section. The example gets unbounded travel from the wheel it captures;
 * driven by page scroll there is a fixed budget, and 1400 spends it at about
 * twelve planes per pass — enough to feel endless, slow enough to look at.
 */
const TRAVEL_PX = 1400

const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡'

/** The example's ScrambleText, minus the paid dependency. */
function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(text); return }

    let frame = 0
    timer.current = setInterval(() => {
      frame++
      const resolved = Math.floor(frame / 1.6)
      setDisplay(
        text
          .split('')
          .map((c, i) =>
            i < resolved || c === ' '
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
          )
          .join(''),
      )
      if (resolved >= text.length && timer.current) clearInterval(timer.current)
    }, 30)

    return () => { if (timer.current) clearInterval(timer.current) }
  }, [active, text])

  return <span>{display}</span>
}

// ── plane ────────────────────────────────────────────────────

type Size = { width: number; height: number; step: number }

function Plane({
  project, index, total, size, scrollX, scrollVelocity, isHovered, onHoverStart, onHoverEnd,
}: {
  project: ProjectCardData
  index: number
  total: number
  size: Size
  scrollX: MotionValue<number>
  scrollVelocity: MotionValue<number>
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const totalWidth = size.step * total
  const startPosition = index * size.step

  const hoverOffset = useSpring(0, { stiffness: 400, damping: 25 })
  const waveOffset = useSpring(0, { stiffness: 300, damping: 20, mass: 0.3 })

  useMotionValueEvent(scrollVelocity, 'change', velocity => {
    const pos = startPosition + scrollX.get()
    const centered = wrap(-totalWidth / 2, totalWidth / 2, pos)
    const normalized = centered / (totalWidth / 2)
    waveOffset.set((velocity / 50) * Math.sin(normalized * Math.PI * 2) * 5)
  })

  useEffect(() => { hoverOffset.set(isHovered ? -30 : 0) }, [isHovered, hoverOffset])

  const transform = useTransform(() => {
    const pos = startPosition + scrollX.get()
    const centered = wrap(-totalWidth / 2, totalWidth / 2, pos)
    const y = centered * -0.35 + waveOffset.get() + hoverOffset.get()
    const z = centered * -1.2
    return `translate3d(${centered}px, ${y}px, ${z}px) rotateY(-50deg)`
  })

  const hero = project.media[0]
  const industry = project.industries.find(i => i.isPrimary)?.industry
  const label = project.client?.name ?? project.title
  const meta = [
    industry?.name,
    project.stallAreaSqm != null ? `${Number(project.stallAreaSqm)} sqm` : null,
    project.buildYear ? String(project.buildYear) : null,
  ].filter(Boolean).join(' · ')

  return (
    <motion.div
      className="absolute flex items-center justify-center shadow-2xl"
      style={{
        transform,
        width: size.width,
        height: size.height,
        transformStyle: 'preserve-3d',
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
        transition: 'filter 0.2s ease',
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <Link href={`/portfolio/${project.slug}`} aria-label={`${label} — ${meta}`} className="absolute inset-0 overflow-hidden">
        {hero ? (
          <Image
            src={hero.cdnUrl ?? hero.url}
            alt={hero.altText || label}
            fill
            sizes="(max-width: 768px) 210px, 320px"
            draggable={false}
            className="select-none object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="pointer-events-none absolute -top-6 left-0 font-mono text-[10px] tracking-[0.05em] text-white/70">
        {String(index).padStart(2, '0')}
      </div>

      {/* Hover label. On touch there is no hover, so the label is shown
          permanently there instead — the project name and size are the point
          of a portfolio wall, not decoration. */}
      <div
        className={`pointer-events-none absolute left-full top-1/2 ml-3 flex items-center transition-opacity duration-150 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } [@media(hover:none)]:hidden`}
      >
        <div
          className="h-px origin-left bg-white transition-transform duration-300 ease-out"
          style={{ width: 120, transform: `scaleX(${isHovered ? 1 : 0})` }}
        />
        <div className="whitespace-nowrap px-2 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-white">
          <ScrambleText text={label} active={isHovered} />
          <span className="ml-2 text-white/50">{meta}</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-background/95 to-transparent p-3 [@media(hover:none)]:block">
        <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-white">{label}</div>
        <div className="mt-0.5 font-mono text-[9px] text-white/55">{meta}</div>
      </div>
    </motion.div>
  )
}

// ── section ──────────────────────────────────────────────────

export default function CityProjectsCarousel({ projects }: { projects: ProjectCardData[] }) {
  const container = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [size, setSize] = useState<Size>({ width: PLANE_WIDTH, height: PLANE_HEIGHT, step: STEP })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const apply = () => setSize(
      window.innerWidth < 768
        ? { width: MOBILE_WIDTH, height: MOBILE_HEIGHT, step: MOBILE_WIDTH + MOBILE_GAP }
        : { width: PLANE_WIDTH, height: PLANE_HEIGHT, step: STEP },
    )
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  // The example's rawScrollX, fed by the page instead of by a captured wheel.
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] })
  const drag = useMotionValue(0)
  const fromScroll = useTransform(scrollYProgress, [0, 1], [TRAVEL_PX, -TRAVEL_PX])
  const rawScrollX = useTransform([fromScroll, drag], ([s, d]: number[]) => s + d)

  const scrollX = useSpring(rawScrollX, { stiffness: 100, damping: 30, mass: 0.5 })
  const liveVelocity = useVelocity(scrollX)
  const stillVelocity = useMotionValue(0)
  const scrollVelocity = prefersReduced ? stillVelocity : liveVelocity

  return (
    <motion.div
      ref={container}
      onPan={(_, info) => drag.set(drag.get() + info.delta.x * 2.5)}
      // pan-y, not none: sideways drags surf the wall, vertical swipes stay
      // with the page.
      style={{ touchAction: 'pan-y' }}
      className="relative h-[560px] w-full cursor-grab select-none overflow-hidden active:cursor-grabbing md:h-[680px]"
    >
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: 2000, perspectiveOrigin: '10% 10%' }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: 'translateY(100px)' }}
        >
          {projects.map((p, i) => (
            <Plane
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              size={size}
              scrollX={scrollX}
              scrollVelocity={scrollVelocity}
              isHovered={hovered === i}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-[0.05em] text-white/60">
        scroll to surf
      </div>
    </motion.div>
  )
}
