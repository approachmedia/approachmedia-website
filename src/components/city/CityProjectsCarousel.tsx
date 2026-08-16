'use client'

/**
 * City portfolio carousel — a 3D row of project planes that glides and
 * ripples as the section passes through the viewport.
 *
 * ── Why this does not hijack the wheel ────────────────────────────────
 * The reference component calls preventDefault() on wheel inside a
 * full-height section, so the page stops scrolling once you reach it and the
 * wheel drives the carousel instead. Mid-page that is a trap: a visitor
 * scrolling down the city page arrives here and cannot continue with the
 * wheel, and on touch the `touch-none` in that component blocks scrolling
 * outright. It would also do the opposite of what the section is for, since
 * a visitor who cannot get past it leaves rather than reads.
 *
 * Motion's own "scroll velocity linked offset" example works the other way
 * round, and that is what is built here: the page scrolls normally, the row's
 * offset is driven by the section's progress through the viewport, and the
 * velocity of that scroll drives the wave. Scrolling faster ripples the row
 * harder; stopping settles it. Dragging sideways still works for anyone who
 * wants to browse without scrolling, and touch-action keeps vertical swipes
 * with the page.
 *
 * Each plane is a real link to its project with the same caption the grid
 * carried, so the internal linking and the alt text survive the change.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'

/**
 * Plane size and spacing are chosen per breakpoint rather than fixed.
 * The transforms are in pixels, so this cannot be done in CSS: at the
 * desktop size a 390px phone showed barely one plane, and at the phone size
 * a 1440px screen wasted most of the row. The section's own height follows
 * the plane height so there is no dead space under the row either.
 */
type Layout = { planeW: number; planeH: number; spacing: number }

const DESKTOP: Layout = { planeW: 320, planeH: 420, spacing: 360 }
const MOBILE:  Layout = { planeW: 210, planeH: 280, spacing: 240 }

/** Breathing room above and below the row, plus space for the hint line. */
const SECTION_PADDING = 130

function useLayout(): Layout {
  const [layout, setLayout] = useState<Layout>(DESKTOP)
  useEffect(() => {
    const apply = () => setLayout(window.innerWidth < 768 ? MOBILE : DESKTOP)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  return layout
}

/**
 * How far the row slides, in px, either side of centre over one pass of the
 * section. Deliberately an absolute distance rather than a fraction of the
 * loop: expressed as a fraction, a city with 20 projects would scroll its row
 * two and a half times faster than a city with 8, and the busiest pages would
 * be the least readable. Measured at 1200 the row drifts at roughly 1.5x the
 * page scroll — about eight projects pass the centre on the way through,
 * slow enough to actually look at, with drag there for the rest.
 */
const TRAVEL_PX = 1200

/** Ripple ceiling. Beyond this the row buckles rather than waves. */
const MAX_WAVE = 70

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Plane({
  project,
  index,
  total,
  offset,
  velocity,
  layout,
}: {
  project: ProjectCardData
  index: number
  total: number
  offset: MotionValue<number>
  velocity: MotionValue<number>
  layout: Layout
}) {
  const { planeW, planeH, spacing } = layout
  const loop = total * spacing
  const hero = project.media[0]
  const industry = project.industries.find(i => i.isPrimary)?.industry

  const position = useTransform(offset, o => wrap(-loop / 2, loop / 2, index * spacing + o))
  const z = useTransform([position, velocity], ([p, v]: number[]) => {
    const arc = -Math.abs(p) * 0.35
    const intensity = Math.max(-MAX_WAVE, Math.min(MAX_WAVE, v * 0.045))
    return arc + Math.sin(p / 130) * intensity
  })
  const rotateY = useTransform(position, p => -p * 0.045)
  // Fade at the wrap points so the jump from one end of the loop to the
  // other happens while the plane is invisible.
  const opacity = useTransform(
    position,
    [-loop / 2, -loop / 2 + spacing, 0, loop / 2 - spacing, loop / 2],
    [0, 1, 1, 1, 0],
  )

  return (
    <motion.div
      style={{
        x: position, z, rotateY, opacity,
        width: planeW, height: planeH,
        left: `calc(50% - ${planeW / 2}px)`,
        top: `calc(50% - ${planeH / 2}px)`,
        transformStyle: 'preserve-3d',
      }}
      className="absolute"
    >
      <motion.div
        whileHover={{ z: 90, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        <Link
          href={`/portfolio/${project.slug}`}
          className="group relative block h-full w-full overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl"
        >
          {hero ? (
            /* next/image, not a raw <img>. The city pages were requesting the
               full-size R2 original for every photo — fine-ish at six, but
               this row shows twenty, and a 320px plane does not need a
               multi-megapixel file. The optimiser was already configured for
               this host and already used on /portfolio; it just was not used
               here. sizes matches the two plane widths so the served file
               tracks the breakpoint. */
            <Image
              src={hero.cdnUrl ?? hero.url}
              alt={hero.altText}
              fill
              sizes="(max-width: 768px) 210px, 320px"
              draggable={false}
              className="pointer-events-none select-none object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}

          {/* Same caption the grid carried — kept visible rather than shown
              on hover, because touch devices have no hover and the point of
              the section is that people can read what they are looking at. */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/20 to-transparent p-4">
            <div className="text-[0.7rem] font-semibold text-brand-green-glow">
              {industry?.name ?? 'Exhibition Stall'}
            </div>
            <div className="mt-0.5 text-sm font-bold leading-tight text-white">
              {project.client?.name ?? project.title}
            </div>
            <div className="mt-1 flex gap-2.5 text-[0.7rem] text-muted-foreground">
              {project.stallAreaSqm != null && <span>{Number(project.stallAreaSqm)} sqm</span>}
              {project.buildYear && <span>{project.buildYear}</span>}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function CityProjectsCarousel({ projects }: { projects: ProjectCardData[] }) {
  const section = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const prefersReduced = useReducedMotion()

  const layout = useLayout()
  const total = projects.length

  // Progress across the whole time the section is on screen, so the row is
  // already moving as it enters rather than only once it is centred.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })

  const drag = useMotionValue(0)
  // Reduced-motion users still get the row tracking scroll, but with the
  // velocity input flattened the ripple never fires.
  const zeroVelocity = useMotionValue(0)
  const fromScroll = useTransform(scrollYProgress, [0, 1], [TRAVEL_PX, -TRAVEL_PX])
  const raw = useTransform([fromScroll, drag], ([s, d]: number[]) => s + d)
  const offset = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.6 })
  const velocity = useVelocity(offset)

  return (
    <motion.div
      ref={section}
      onPanStart={() => setDragging(true)}
      onPan={(_, info) => drag.set(drag.get() + info.delta.x)}
      onPanEnd={() => setDragging(false)}
      // pan-y leaves vertical swipes to the page and takes only sideways
      // ones, so a phone can still scroll through this section.
      style={{
        touchAction: 'pan-y',
        perspective: 1200,
        height: layout.planeH + SECTION_PADDING,
      }}
      className={`relative w-full select-none overflow-hidden ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {projects.map((p, i) => (
          <Plane
            key={p.id}
            project={p}
            index={i}
            total={total}
            offset={offset}
            velocity={prefersReduced ? zeroVelocity : velocity}
            layout={layout}
          />
        ))}
      </div>

      {/* Edge fades so planes dissolve into the page instead of being cut
          off by the section boundary. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
        Scroll or drag to explore
      </p>
    </motion.div>
  )
}
