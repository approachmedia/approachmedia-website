'use client'

/**
 * Our Approach — reference-video treatment.
 *
 * One brand-green square starts at the "Our Approach" label and travels down
 * the left rail with scroll — rotating as it moves — and fades out at the
 * bottom. As the square passes each row, the row eases inward (right) and
 * settles back to left alignment once the square has moved on.
 */

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const steps = [
  { n: '01', t: 'Understanding goals',            d: 'We map your exhibition objectives, audience, and competitive context.' },
  { n: '02', t: 'Spatial design & 3D rendering',  d: 'Concept design and photoreal renders for stakeholder alignment.' },
  { n: '03', t: 'Engineering & detailing',        d: 'Build drawings, materials, AV and structural detailing.' },
  { n: '04', t: 'Fabrication & build',            d: 'In-house fabrication with quality checks at each milestone.' },
  { n: '05', t: 'Full-scale mock-up testing',     d: 'We replicate the booth in our warehouse to eliminate on-site surprises.' },
  { n: '06', t: 'On-site execution & handover',   d: 'Installation, AV commissioning and a ready-to-show handover.' },
  { n: '07', t: 'Post-event dismantle & wrap-up', d: 'Clean dismantle, asset storage, and a debrief for the next show.' },
]

const EASE = [0.22, 1, 0.36, 1] as const
const PUSH_PX = 22 // how far a row eases inward while the square passes it

function StepRow({
  progress, index, count, prefersReduced, n, t, d,
}: {
  progress: MotionValue<number>
  index: number
  count: number
  prefersReduced: boolean | null
  n: string
  t: string
  d: string
}) {
  const center = (index + 0.5) / count
  // Proximity wave: full push when the marker is at this row, easing to zero
  // roughly one row away on either side.
  const x = useTransform(progress, v => {
    const influence = Math.max(0, 1 - Math.abs(v - center) * count * 1.4)
    return prefersReduced ? 0 : influence * PUSH_PX
  })

  return (
    <motion.li
      style={{ x }}
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="flex gap-6 py-6 pl-6 will-change-transform md:gap-8 md:py-7"
    >
      <div className="w-10 shrink-0 font-display text-2xl font-semibold text-brand-blue-glow md:text-3xl">{n}</div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground">{t}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{d}</p>
      </div>
    </motion.li>
  )
}

export function Process() {
  const prefersReduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)

  // Marker rides scroll progress through the list: falls from the label,
  // rotates on the way down, vanishes at the bottom.
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 0.7', 'end 0.55'] })
  const progress      = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })
  const markerTop     = useTransform(progress, v => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const markerRot     = useTransform(progress, [0, 1], [0, 315])
  const markerOpacity = useTransform(scrollYProgress, [0, 0.02, 0.93, 1], [0, 1, 1, 0])

  return (
    <section className="bg-surface/40 py-20 md:py-28" id="process">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              A clear process so your team can <span className="text-gradient-brand">focus on the event.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Seven defined stages, one accountable team — from first brief to post-event wrap-up.
            </p>
          </div>

          <div ref={railRef} className="relative md:col-span-8">
            {/* Label on top of the content — the marker begins its fall here */}
            <p className="pb-4 pl-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">Our Approach</p>

            {/* The traveling square — starts level with the label */}
            <div className="absolute inset-0 pointer-events-none">
              {!prefersReduced && (
                <motion.span
                  style={{ top: markerTop, rotate: markerRot, opacity: markerOpacity }}
                  className="absolute left-0 z-10 -mt-1 h-2 w-2 bg-brand-green will-change-transform"
                  aria-hidden
                />
              )}
            </div>

              <ol className="divide-y divide-white/10 border-y border-white/10">
                {steps.map((s, i) => (
                  <StepRow
                    key={s.n}
                    progress={progress}
                    index={i}
                    count={steps.length}
                    prefersReduced={prefersReduced}
                    n={s.n}
                    t={s.t}
                    d={s.d}
                  />
                ))}
              </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
