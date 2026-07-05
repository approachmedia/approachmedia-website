'use client'

/**
 * Our Approach — steps reveal one by one on scroll (reference-video style):
 * each row fades up in sequence and a small brand-green square marker
 * blinks in beside the step number as its row arrives.
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
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Our Approach</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              A clear process so your team can <span className="text-gradient-brand">focus on the event.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Seven defined stages, one accountable team — from first brief to post-event wrap-up.
            </p>
          </div>
          <ol className="space-y-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 md:col-span-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                className="relative flex gap-6 bg-surface p-6 transition-colors hover:bg-surface-elevated md:p-7"
              >
                {/* accent marker blinks in as the row arrives */}
                <motion.span
                  initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.35 }}
                  className="absolute left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-brand-green md:left-3"
                  aria-hidden
                />
                <div className="font-display text-2xl font-semibold text-brand-green-glow md:text-3xl">{s.n}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{s.d}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
