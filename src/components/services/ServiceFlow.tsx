'use client'

/**
 * Shared scrollcraft building blocks for the service pages. Four pages get
 * the same two treatments one by one, so the mechanics live here once:
 *
 * FlowScrubSection: the full-screen video + text pattern the owner approved
 * on /services/exhibition-stall-design. A clip of a real build scrubs under
 * the wheel; the eyebrow, heading and optional CTA hold near the top of the
 * frame; the section's items land in pairs at the lower left. All copy is in
 * the served HTML.
 *
 * ProseReveal: wraps a server-rendered prose section (ProseSection) and
 * annotates it for the engine on the client: the intro paragraph assembles
 * line by line (kinetic), and every block's heading, paragraphs and bullets
 * rise in with a stagger as they enter. The served HTML is untouched, so a
 * crawler or a JS-less visitor reads plain, visible prose.
 *
 * Each page keeps its own thin data component, because Lucide icon
 * components cannot cross the server-to-client prop boundary.
 */

import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { ArrowRight, type LucideIcon } from 'lucide-react'

export const FLOW = '/services-flow'

declare global {
  interface Window { ScrollCraft?: { mount: (el: Element) => void } }
}

let enginePromise: Promise<void> | null = null

export function loadEngine(): Promise<void> {
  if (window.ScrollCraft) return Promise.resolve()
  if (!enginePromise) {
    enginePromise = new Promise(resolve => {
      const script = document.createElement('script')
      script.src = '/about-flow/scrollcraft.js'
      script.onload = () => resolve()
      document.body.appendChild(script)
    })
  }
  return enginePromise
}

export function canH264(): boolean {
  return document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') !== ''
}

/** Mount the engine on one root, swapping scrub sources to VP9 where H.264 is unavailable. */
export function useScrollcraft(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let cancelled = false
    loadEngine().then(() => {
      const root = rootRef.current
      if (cancelled || !root) return
      if (!canH264()) {
        root.querySelectorAll<HTMLVideoElement>('video[data-sc-src]').forEach(v => {
          v.dataset.scSrc = v.dataset.scSrc!.replace(/\.mp4$/, '.webm')
          if (v.dataset.scSrcMobile) v.dataset.scSrcMobile = v.dataset.scSrc
        })
      }
      window.ScrollCraft?.mount(root)
    })
    return () => { cancelled = true }
  }, [rootRef])
}

// ── the full-screen video + text section ────────────────────

export type FlowItem = { num?: string; icon: LucideIcon; title: string; copy: string }

/**
 * Cue windows for N sequential groups: ~15% overlap, and the last group
 * closes just before 1 with its own ramps, because a middle act may not hold
 * (the un-pin slide would carry a lit cue across the next section).
 */
function groupWindows(n: number): string[] {
  // ~0.085 of overlap, so the outgoing pair is still fading while the next
  // arrives. Abutting windows measured as a visible gap: both pairs near zero
  // at the crossover. Solved from the overlap so any group count keeps it
  // (n=3 lands on the verified 0.32-wide windows exactly).
  const windows: string[] = []
  const start = 0.18
  const end = 0.97
  const overlap = 0.085
  const step = (end - start - overlap) / Math.max(1, n)
  const width = step + overlap
  for (let i = 0; i < n; i++) {
    const from = start + i * step
    windows.push(i === n - 1 ? `${from.toFixed(2)} ${end} 0.2 0.1` : `${from.toFixed(2)} ${(from + width).toFixed(2)}`)
  }
  return windows
}

export function FlowScrubSection({
  ariaLabel, clip, eyebrow, title, cta, pairs, span = 3.6,
}: {
  ariaLabel: string
  /** Basename in public/services-flow, encoded for scrubbing. */
  clip: string
  eyebrow: string
  title: string
  cta?: { href: string; label: string }
  /** Items grouped as they should land together, usually in twos. */
  pairs: FlowItem[][]
  /** Scroll span in viewport-heights; raise it when there are more groups. */
  span?: number
}) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollcraft(rootRef)

  const windows = groupWindows(pairs.length)

  return (
    <section ref={rootRef} className="sc-scope svc-flow" aria-label={ariaLabel}>
      <div data-sc-act="scrub" data-sc-span={span} data-sc-dwell="0.3">
        <div data-sc-stage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-stage__poster" src={`${FLOW}/${clip}-poster.webp`} alt="" />
          <video data-sc-scrub data-sc-src={`${FLOW}/${clip}.mp4`}
                 data-sc-src-mobile={`${FLOW}/${clip}-m.mp4`} muted playsInline></video>
          <div className="pf-scrim" aria-hidden="true"></div>

          {/* Heading and CTA hold near the top for the whole act, so the one
              action is never a focusable link at opacity 0. Closes before 1:
              this is a middle act. */}
          <div className="sc-copy sc-copy--lead pf-copy pf-copy--head" data-sc-cue="0 0.96 0 0.08">
            <p className="sc-eyebrow">{eyebrow}</p>
            <h2 className="pf-title">{title}</h2>
            {cta && (
              <a className="pf-cta" href={cta.href}>
                {cta.label} <ArrowRight aria-hidden="true" />
              </a>
            )}
          </div>

          {pairs.map((group, i) => (
            <div key={i} className="sc-copy sc-copy--lead pf-copy" data-sc-cue={windows[i]}>
              {group.map(item => (
                <div key={item.title} className="pf-step">
                  {item.num
                    ? <span className="pf-num">{item.num}</span>
                    : <span className="pf-badge"><item.icon aria-hidden="true" /></span>}
                  <div>
                    <h3>{item.num ? <item.icon aria-hidden="true" /> : null} {item.title}</h3>
                    <p>{item.copy}</p>
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

// ── the prose text-animation wrapper ────────────────────────

/**
 * Progressive enhancement only: the annotations are added on the client just
 * before the engine mounts, so the served HTML stays plain visible prose.
 */
export function ProseReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return
    let cancelled = false

    loadEngine().then(() => {
      if (cancelled || !ref.current) return
      const root = ref.current
      const section = root.querySelector('section') ?? root
      section.setAttribute('data-sc-act', 'flow')

      const container = section.querySelector(':scope > div') ?? section

      // The intro assembles line by line under the scroll.
      const intro = container.querySelector(':scope > p + p')
      if (intro) {
        intro.setAttribute('data-sc-cue', '0.02 0.55 0.3 0.2')
        intro.setAttribute('data-sc-kinetic', 'lines')
      }

      // Everything else reveals element by element as it enters, so the
      // effect runs the full length of the section down to the closing plate.
      // One data-sc-in per heading, paragraph and bullet: a whole block
      // staggered from its top edge finishes animating (time-based) while its
      // lower half is still below the fold, which reads as the effect
      // stopping partway. data-sc-in is what the engine's observer watches.
      const annotate = (el: Element) => el.setAttribute('data-sc-in', '')
      Array.from(container.children).forEach(child => {
        if (child === intro) return
        if (child.tagName !== 'DIV') { annotate(child); return }
        Array.from(child.children).forEach(part => {
          if (part.tagName === 'UL' || part.tagName === 'OL') {
            Array.from(part.children).forEach(annotate)
          } else {
            annotate(part)
          }
        })
      })

      window.ScrollCraft?.mount(root)
    })
    return () => { cancelled = true }
  }, [])

  return <div ref={ref} className="sc-scope svc-prose">{children}</div>
}
