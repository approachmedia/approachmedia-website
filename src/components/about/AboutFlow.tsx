'use client'

/**
 * The About page as a scroll-driven walk-in, built with the scrollcraft
 * engine (public/about-flow/scrollcraft.js). The engine reads data-sc-*
 * attributes off this markup and drives it; it generates no DOM, so
 * everything a crawler needs is in the served HTML.
 *
 * The story: approach a real stall from the aisle (clip 1, scrubbed by the
 * wheel), the stakes, walk inside (clip 2), the method, then the peak: the
 * install wall, where ten of the owner's own project photos fly in and
 * mortar into a grid like panels being installed while the tally runs to
 * 6,000. The close sits down in the stall's client lounge.
 *
 * All figures are the site's existing claims. The wall photos are the ten
 * images the owner uploaded to R2 for the services and process sections,
 * so nothing in the wall implies a project that is not theirs.
 *
 * The engine mounts once per visit to this route. It has no unmount API;
 * a second visit after client-side navigation mounts a fresh instance on
 * the fresh DOM, and the old one idles against detached nodes until the
 * next full load. Cheap, and invisible, but worth knowing it is there.
 */

import { useEffect, useRef } from 'react'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images'

/** Threshold + fly-from vector per tile; the CSS does the rest from --sc-p. */
const WALL: { src: string; t: number; fx: string; fy: string }[] = [
  { src: `${CDN}/services/exhibition-stall-design.jpg`,        t: -0.1, fx: '-40vw', fy: '0vh' },
  { src: `${CDN}/services/custom-booth-fabrication.jpg`,       t: 0.06, fx: '0vw',   fy: '-40vh' },
  { src: `${CDN}/services/turnkey-project-management.jpg`,     t: 0.12, fx: '40vw',  fy: '0vh' },
  { src: `${CDN}/services/av-technology-integration.jpg`,      t: 0.18, fx: '0vw',   fy: '40vh' },
  { src: `${CDN}/services/double-decker-mezzanine-stands.jpg`, t: 0.24, fx: '-40vw', fy: '10vh' },
  { src: `${CDN}/services/immersive-brand-experience.jpg`,     t: 0.30, fx: '40vw',  fy: '-10vh' },
  { src: `${CDN}/process/01-understand-plan.jpg`,              t: 0.36, fx: '0vw',   fy: '-40vh' },
  { src: `${CDN}/process/02-design-detail.jpg`,                t: 0.42, fx: '-40vw', fy: '0vh' },
  { src: `${CDN}/process/03-build-test.jpg`,                   t: 0.48, fx: '0vw',   fy: '40vh' },
  { src: `${CDN}/process/04-execute-close.jpg`,                t: 0.54, fx: '40vw',  fy: '0vh' },
]

const PROCESS: [string, string][] = [
  ['Consultation and brief planning', 'Brand, audience, objectives, space, budget, timelines.'],
  ['Concept and spatial design', 'A customised concept that guides visitor flow.'],
  ['Engineering and technical detailing', 'Drawings and specifications for structural integrity.'],
  ['Fabrication and build', 'Produced in-house under controlled conditions.'],
  ['Full-scale mock-up testing', 'The complete stall assembled and tested in our warehouse first.'],
  ['Logistics, installation and on-site execution', 'Packing, transport, install: ready ahead of the event.'],
  ['Dismantling and post-event wrap-up', 'Careful teardown, materials handled for reuse or storage.'],
]

export function AboutFlow() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let cancelled = false
    const start = () => {
      if (cancelled || !rootRef.current) return
      const sc = (window as unknown as { ScrollCraft?: { mount: (el: Element) => void } }).ScrollCraft
      sc?.mount(rootRef.current)

      // The lounge loop plays only while in view, never under reduced motion.
      const loop = rootRef.current.querySelector<HTMLVideoElement>('.af-close__loop')
      if (loop && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) loop.play().catch(() => {})
            else loop.pause()
          })
        }, { threshold: 0.25 }).observe(loop)
      }
    }

    if ((window as unknown as { ScrollCraft?: unknown }).ScrollCraft) {
      start()
    } else {
      const script = document.createElement('script')
      script.src = '/about-flow/scrollcraft.js'
      script.onload = start
      document.body.appendChild(script)
    }
    return () => { cancelled = true }
  }, [])

  return (
    <div ref={rootRef} className="sc-scope about-flow">
      <span data-sc-progress></span>
      <div className="sc-grain" aria-hidden="true"></div>

      {/* 1 · RECOGNITION: the aisle, a stall ahead, moving under your hand */}
      <section data-sc-act="scrub" data-sc-span="2.4" data-sc-dwell="0.34" data-sc-drift="#0A0D14" aria-label="Arrival">
        <div data-sc-stage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-stage__poster" src="/about-flow/01-approach-poster.webp" alt="" />
          <video data-sc-scrub data-sc-src="/about-flow/01-approach.mp4"
                 data-sc-src-mobile="/about-flow/01-approach-m.mp4" muted playsInline></video>
          <div className="af-hero-scrim" aria-hidden="true"></div>
          <div className="sc-copy sc-copy--lead af-hero-copy" data-sc-cue="0 0.78 0">
            <p className="sc-eyebrow">About Approach Media</p>
            <h1 className="sc-display sc-display--xl" data-sc-kinetic="lines">Understood. Experienced. Remembered.</h1>
            <p className="sc-body">We design unique exhibition stalls so that your brand is all three. This is one of ours, at a live show.</p>
          </div>
        </div>
      </section>

      {/* 2 · TENSION: what a few seconds of attention costs */}
      <section data-sc-act="pin" data-sc-span="2.2" data-sc-drift="#0C1019" aria-label="The stakes">
        <div data-sc-stage className="af-argument">
          <p data-sc-cue="0 0.34 0">Exhibitions are high-investment environments.</p>
          <p data-sc-cue="0.28 0.62">A space has moments to communicate, engage, and be remembered.</p>
          <p data-sc-cue="0.56 1 0.3 0"><em>In an ocean of lookalikes, those who stand apart will survive.</em></p>
        </div>
      </section>

      {/* 3 · CURIOSITY: inside the build, the parts called out where they sit */}
      <section data-sc-act="scrub" data-sc-span="2.4" data-sc-dwell="0.3" data-sc-drift="#0E1219" aria-label="Inside the build">
        <div data-sc-stage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-stage__poster" src="/about-flow/02-inside-poster.webp" alt="" />
          <video data-sc-scrub data-sc-src="/about-flow/02-inside.mp4"
                 data-sc-src-mobile="/about-flow/02-inside-m.mp4" muted playsInline></video>
          <div className="af-hero-scrim" aria-hidden="true"></div>
          <div className="sc-copy sc-copy--lead af-inside-note" data-sc-cue="0 0.4 0">
            <p className="sc-eyebrow">Step inside</p>
            <h2 className="sc-display sc-display--lg">Everything here is built, not bought.</h2>
          </div>
          <div className="sc-copy sc-copy--lead af-inside-note" data-sc-cue="0.36 0.68">
            <p className="sc-body">Custom fabrication from our own workshop. Joinery, structure and finishes to exact specification.</p>
          </div>
          <div className="sc-copy sc-copy--lead af-inside-note" data-sc-cue="0.62 0.94">
            <p className="sc-body">Screens, lighting and sound planned inside the stall from day one, not bolted on at the venue.</p>
          </div>
        </div>
      </section>

      {/* 4 · CONFIDENCE: the method, compressed. The authored quiet before the peak. */}
      <section className="sc-section af-process" data-sc-act="flow" data-sc-drift="#0B0E15" aria-label="Process">
        <div className="sc-wrap">
          <div className="sc-stack" data-sc-in data-sc-stagger="60">
            <h2 className="sc-display sc-display--md">How a stall gets built.</h2>
            <p className="sc-body">One team, seven stages, no hand-offs. You stay informed at the decision points. We manage the rest.</p>
          </div>
          <ol data-sc-in data-sc-stagger="50">
            {PROCESS.map(([title, copy], i) => (
              <li key={title}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · AWE, the PEAK: the install wall. Tiles mortar in like panels on a
          build, the tally is wired to the same scroll. */}
      <section data-sc-act="pin" data-sc-span="3.4" data-sc-drift="#0A0D14" aria-label="Since 2002">
        <div data-sc-stage className="af-wall-stage">
          <div className="af-wall" aria-hidden="true">
            {WALL.map(tile => (
              <figure key={tile.src} style={{ '--t': tile.t, '--fx': tile.fx, '--fy': tile.fy } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tile.src} loading="lazy" alt="" />
              </figure>
            ))}
          </div>
          <div className="af-tally-scrim" aria-hidden="true"></div>
          <div className="af-tally">
            <p className="sc-eyebrow" data-sc-cue="0 0.96 0 0.12">Since 2002</p>
            <span className="af-tally__big">
              <span className="sc-nums" data-sc-count="0 6,000" data-sc-count-at="0.1 0.62">0</span>+
              <small>stalls designed and built</small>
            </span>
            <div className="af-tally__row" data-sc-cue="0.5 0.96 0.2 0.12">
              <div><span className="sc-nums" data-sc-count="0 23" data-sc-count-at="0.55 0.75">0</span>+<span className="af-lbl">years</span></div>
              <div><span className="sc-nums" data-sc-count="0 14" data-sc-count-at="0.6 0.8">0</span>+<span className="af-lbl">countries</span></div>
              <div><span className="sc-nums" data-sc-count="0 500" data-sc-count-at="0.65 0.85">0</span>+<span className="af-lbl">exhibitions a year</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · RESOLVE: the lounge. Sit down. One line, one action. Holds. */}
      <section className="sc-section af-close" data-sc-act="flow" data-sc-drift="#0A0D14" aria-label="Start yours">
        <div className="sc-wrap">
          <div className="af-close__grid">
            <figure className="af-close__media" data-sc-reveal="left" data-sc-reveal-at="0.05 0.45">
              <video className="af-close__loop" muted loop playsInline preload="none"
                     poster="/about-flow/03-lounge-poster.webp" src="/about-flow/03-lounge.mp4"></video>
              <figcaption>Inside the client lounge, on the show floor</figcaption>
            </figure>
            <div className="af-close__copy sc-stack" data-sc-in data-sc-stagger="70">
              <h2 className="sc-display sc-display--lg">Your stall is next.</h2>
              <p className="sc-body">Tell us about your show. A project lead reviews every brief within one business day.</p>
              <a className="af-close__cta" href="/contact">Book a Consultation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
