'use client'

/**
 * Our Approach — reference-video list treatment.
 *
 * Left: heading + copy. Right: the "Our Approach" label sits on top of the
 * content, then plain hairline-divided rows (no cards, no rounded borders)
 * reveal one by one on scroll, each with a small brand-green square marker
 * blinking in beside the step number.
 */

import { motion, useReducedMotion } from 'framer-motion'

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

export function Process() {
  const prefersReduced = useReducedMotion()

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

          <div className="md:col-span-8">
            {/* Label sits on top of the content (per reference) */}
            <p className="pb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">Our Approach</p>

            <ol className="divide-y divide-white/10 border-y border-white/10">
              {steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="relative flex gap-6 py-6 pl-6 md:gap-8 md:py-7"
                >
                  {/* accent marker blinks in as the row arrives */}
                  <motion.span
                    initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 0.4 }}
                    className="absolute left-0 top-[2.1rem] h-1.5 w-1.5 bg-brand-green md:top-[2.35rem]"
                    aria-hidden
                  />
                  <div className="w-10 shrink-0 font-display text-2xl font-semibold text-brand-green-glow md:text-3xl">{s.n}</div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{s.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{s.d}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
