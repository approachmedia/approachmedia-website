'use client'

/**
 * The two scroll-driven sections on /services/exhibition-stall-design, built
 * on the scrollcraft engine (public/about-flow/scrollcraft.js). Everything
 * else on the page is untouched.
 *
 * WhyChooseFlow: the six reasons dock one at a time down the left while a
 * framed proof panel on the right crossfades between six clips of real
 * builds, one project per reason. The docking and the crossfade are both
 * driven per-element from the act's --sc-p in CSS; the only JS is play/pause
 * of whichever clip is active. The copy is the page's existing copy,
 * verbatim, and all six cards are always in the served HTML.
 *
 * ProcessFlow: the six steps land in pairs over a full-bleed clip of a
 * finished build scrubbing under the wheel, the same device as the About
 * hero. All six steps are in the served HTML.
 *
 * Both components feature-detect H.264 and fall back to the VP9 twins, which
 * also makes the verification browser (no H.264 decoder) exercise the real
 * behaviour rather than a frozen poster.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { canH264, useScrollcraft } from './ServiceFlow'
import {
  ArrowRight, Award, Compass, Hammer, PenTool, Ruler, ShieldCheck, Truck,
  type LucideIcon,
} from 'lucide-react'

const FLOW = '/services-flow'

// The page's existing copy, verbatim (em dashes replaced per site motion
// convention), now owned here because the icons cannot cross the
// server-to-client prop boundary.

type Reason = { icon: LucideIcon; title: string; copy: string; clip: string }

const REASONS: Reason[] = [
  { icon: PenTool, title: 'Concept-first design', copy: 'Every stall starts with a brand truth and a visitor journey, not a template. 3D walkthroughs before a single panel is cut.', clip: 'award-winning-stall-design-and-fabrication-agency-03' },
  { icon: Hammer, title: 'Owned 30,000 sq ft workshop', copy: 'Carpentry, metal, print, electricals and finishing all under one roof. No third-party guesswork, no last-minute compromises.', clip: 'exhibition-stall-design-and-fabrication-01' },
  { icon: ShieldCheck, title: 'Full-scale mock-up testing', copy: 'Your stall is fully built and inspected in our warehouse before it ships. What you approve is what shows up on the floor.', clip: 'exhibition-stall-design-company-ahmedabad-01' },
  { icon: Truck, title: 'End-to-end execution', copy: 'Design, fabrication, logistics, on-site installation and dismantling. One team, one point of accountability, zero finger-pointing.', clip: 'custom-trade-show-booth-design-india-04' },
  { icon: Compass, title: 'Industry-aware design', copy: 'Pharma, real estate, FMCG, textiles, manufacturing, automotive: we shape stalls around how your buyers actually behave.', clip: 'indusfood-exhibition-stall-design-01' },
  { icon: Award, title: 'International build standards', copy: 'Stalls built to perform in Frankfurt, Dubai, Paris and Mumbai. Premium materials, safe loadings, clean finishes.', clip: 'real-estate-exhibition-stall-design-01' },
]

type Step = { step: string; icon: LucideIcon; title: string; copy: string }

const STEPS: Step[] = [
  { step: '01', icon: Compass, title: 'Brief & Discovery', copy: 'We map your goals, audience, footprint and KPIs in a focused 30-minute session.' },
  { step: '02', icon: PenTool, title: 'Concept & 3D Design', copy: 'Mood, layout and 3D walkthrough renders, refined until you can already feel the stall.' },
  { step: '03', icon: Ruler, title: 'Engineering & Costing', copy: 'Working drawings, material specs and a transparent line-item budget. No surprises.' },
  { step: '04', icon: Hammer, title: 'Fabrication', copy: 'Built in our 30,000 sq ft warehouse by in-house carpenters, metal and finishing teams.' },
  { step: '05', icon: ShieldCheck, title: 'Mock-Up & QC', copy: 'Stall is fully erected and inspected end-to-end before it leaves the workshop.' },
  { step: '06', icon: Truck, title: 'On-Site Execution', copy: 'Logistics, install, AV calibration and standby team for the full show duration.' },
]

// The engine loader and mount hook come from ServiceFlow (imported above), so
// a page mixing these sections with ProseReveal never injects the engine
// script twice.

// ── section 1: why choose ───────────────────────────────────

/** Per-card plateau window centre in act progress. */
const DOCK_STEP = 0.155
const DOCK_START = 0.08

export function WhyChooseFlow() {
  const rootRef = useRef<HTMLElement>(null)
  useScrollcraft(rootRef)

  // The proof panel: clips are fetched only when the section approaches, and
  // only the active reason's clip plays. Active index comes from the same
  // --sc-p the CSS docking reads, so the two can never disagree.
  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>('.wf-panel video'))
    const act = root.querySelector<HTMLElement>('[data-sc-act]')
    if (!act || videos.length === 0) return

    const mp4ok = canH264()
    let armed = false
    const arm = () => {
      if (armed) return
      armed = true
      videos.forEach(v => {
        const base = v.dataset.clip!
        v.src = `${FLOW}/${base}.${mp4ok ? 'mp4' : 'webm'}`
        v.load()
      })
    }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { arm(); io.disconnect() }
    }, { rootMargin: '100% 0px' })
    io.observe(root)

    let current = -1
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!armed) return
      const p = parseFloat(getComputedStyle(act).getPropertyValue('--sc-p')) || 0
      const idx = Math.max(0, Math.min(videos.length - 1, Math.round((p - DOCK_START) / DOCK_STEP)))
      if (idx !== current) {
        if (videos[current]) videos[current].pause()
        videos[idx]?.play().catch(() => {})
        current = idx
      }
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  return (
    <section ref={rootRef} className="sc-scope svc-flow" aria-label="Why choose Approach Media">
      <div data-sc-act="pin" data-sc-span="4.6">
        <div data-sc-stage className="wf-stage">
          <div className="wf-head" data-sc-cue="0 0.96 0 0.1">
            <p className="sc-eyebrow">Why choose Approach Media</p>
            <h2 className="wf-title">Six reasons marketing heads sleep better with us on the project.</h2>
            <Link href="/portfolio" className="wf-more">
              See recent stalls <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="wf-grid">
            <ol className="wf-list">
              {REASONS.map((r, i) => (
                <li key={r.title} style={{ '--w': DOCK_START + i * DOCK_STEP, '--last': i === REASONS.length - 1 ? 1 : 0 } as React.CSSProperties}>
                  <span className="wf-icon"><r.icon aria-hidden="true" /></span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <figure className="wf-panel" aria-hidden="true">
              {REASONS.map((r, i) => (
                <video
                  key={r.clip}
                  data-clip={r.clip}
                  style={{ '--w': DOCK_START + i * DOCK_STEP, '--last': i === REASONS.length - 1 ? 1 : 0 } as React.CSSProperties}
                  poster={`${FLOW}/${r.clip}-poster.webp`}
                  muted loop playsInline preload="none"
                />
              ))}
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── section 2: the process ──────────────────────────────────

export function ProcessFlow() {
  const rootRef = useRef<HTMLElement>(null)
  useScrollcraft(rootRef)

  const pairs: [Step, Step][] = [[STEPS[0], STEPS[1]], [STEPS[2], STEPS[3]], [STEPS[4], STEPS[5]]]
  const windows = ['0.24 0.5', '0.46 0.72', '0.66 0.97 0.2 0.1']

  return (
    <section ref={rootRef} className="sc-scope svc-flow esd-flow" aria-label="Our six step process">
      <div data-sc-act="scrub" data-sc-span="3.6" data-sc-dwell="0.3">
        <div data-sc-stage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-stage__poster" src={`${FLOW}/custom-exhibition-stand-design-india-01-poster.webp`} alt="" />
          <video data-sc-scrub data-sc-src={`${FLOW}/custom-exhibition-stand-design-india-01.mp4`}
                 data-sc-src-mobile={`${FLOW}/custom-exhibition-stand-design-india-01-m.mp4`} muted playsInline></video>
          <div className="pf-scrim" aria-hidden="true"></div>

          <div className="sc-copy sc-copy--lead pf-copy" data-sc-cue="0 0.3 0">
            <p className="sc-eyebrow">From brief to dismantling</p>
            <h2 className="pf-title">A 6-step process built around your peace of mind.</h2>
          </div>

          {pairs.map(([a, b], i) => (
            <div key={a.step} className="sc-copy sc-copy--lead pf-copy" data-sc-cue={windows[i]}>
              {[a, b].map(s => (
                <div key={s.step} className="pf-step">
                  <span className="pf-num">{s.step}</span>
                  <div>
                    <h3><s.icon aria-hidden="true" /> {s.title}</h3>
                    <p>{s.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
