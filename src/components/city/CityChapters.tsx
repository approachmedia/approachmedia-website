'use client'

/**
 * The city pages as a chaptered editorial feature.
 *
 * The shared CityPageTemplate rendered five of its sections (Stand Out,
 * Services, Industries, Why Us, Process) as the same centred card grid on two
 * alternating grounds. These chapters replace that: each one lands on its own
 * ground with a hard cut and behaves differently from its neighbours. The
 * Portfolio chapter is the owner's and stays exactly as it was.
 *
 * Copy is never touched. Every heading, paragraph, list item and link is the
 * data the template already carried, rendered in a different shape.
 *
 * The engine (public/about-flow/scrollcraft.js) is mounted once on the root
 * and drives two things: the once-only entrance reveals (`data-sc-in`), and
 * `--sc-p` on the two pinned acts. Everything else is CSS reading `--sc-p`.
 * The engine's own stylesheet is deliberately NOT imported: city-chapters.css
 * carries the few rules the devices need, scoped under `.cty`, so nothing
 * leaks into the other 100-odd pages that share this layout.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { loadEngine, canH264 } from '@/components/services/ServiceFlow'
import VenueImage from './VenueImage'
import type { CityPageData } from './types'

const FLOW = '/city-flow'
const CLIP = 'exhibition-stall-design-show-floor-01'

// ── engine mount + folio tracking ────────────────────────────

/** Mount the engine on the chapters root, swapping to VP9 without H.264. */
function useChapters(rootRef: React.RefObject<HTMLElement | null>) {
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

/**
 * The folio. Chaptered editorial has no fixed bar of its own: the running
 * head is the chrome. It reports the chapter the reader is actually in,
 * which is the one thing a long reference page never tells you.
 */
function useFolio(rootRef: React.RefObject<HTMLElement | null>) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const marks = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'))
    if (marks.length === 0) return
    const io = new IntersectionObserver(
      () => {
        // The chapter whose top has most recently passed the reading line.
        const line = window.innerHeight * 0.28
        let idx = 0
        marks.forEach((m, i) => { if (m.getBoundingClientRect().top <= line) idx = i })
        setCurrent(idx)
      },
      { rootMargin: '-28% 0px -60% 0px', threshold: [0, 1] },
    )
    marks.forEach(m => io.observe(m))
    const onScroll = () => {
      const line = window.innerHeight * 0.28
      let idx = 0
      marks.forEach((m, i) => { if (m.getBoundingClientRect().top <= line) idx = i })
      setCurrent(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [rootRef])
  return current
}

// ── the signature move ───────────────────────────────────────

/**
 * The plan. Seven process steps, seven layers: an empty plot is measured,
 * zoned, walled, dimensioned, clad and fitted out, and on the seventh step
 * (Dismantling & Exit) everything but the plot outline goes away again.
 *
 * Driven entirely from the pinned act's --sc-p in CSS. No numbers appear on
 * the drawing: stall sizes differ per project and the page states none here,
 * so the dimension lines carry ticks and no figures.
 */
const STEP_CENTRES = [0.10, 0.225, 0.35, 0.475, 0.60, 0.725, 0.85]

/** Rise into view at `at`, and (unless it is the plot) leave again at the end. */
function layerStyle(at: number, persists = false): React.CSSProperties {
  const rise = `clamp(0, calc((var(--sc-p, 0) - ${at}) / 0.055), 1)`
  const fall = persists ? '1' : `clamp(0, calc((0.965 - var(--sc-p, 0)) / 0.055), 1)`
  return { ['--k' as string]: `min(${rise}, ${fall})` }
}

function PlanDrawing() {
  return (
    <div className="cty-plan" aria-hidden="true">
      <svg viewBox="0 0 400 300" fill="none">
        {/* 1 · Exhibition Brief — the booked plot, measured out */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[0], true)}>
          <rect x="70" y="60" width="260" height="180" stroke="hsl(220 10% 42%)" strokeWidth="1.5" strokeDasharray="7 6" />
        </g>
        {/* 2 · Space Planning — zones */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[1])}>
          <path d="M200 60 V240 M200 150 H330" stroke="hsl(220 10% 34%)" strokeWidth="1" strokeDasharray="5 5" />
        </g>
        {/* 3 · 3D Stall Concept — the closed sides rise */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[2])}>
          <path d="M70 240 V60 H330" stroke="hsl(0 0% 95%)" strokeWidth="4" strokeLinecap="square" />
        </g>
        {/* 4 · Scope & Estimate — the drawing gets dimensioned */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[3])}>
          <path d="M70 262 H330 M70 256 v12 M330 256 v12 M48 60 V240 M42 60 h12 M42 240 h12"
                stroke="hsl(110 55% 55%)" strokeWidth="1" />
        </g>
        {/* 5 · Fabrication & Branding — cladding and the fascia band */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[4])}>
          <rect x="70" y="60" width="260" height="180" fill="hsl(0 0% 100% / 0.045)" />
          <rect x="70" y="44" width="260" height="12" fill="hsl(110 55% 45% / 0.85)" />
        </g>
        {/* 6 · Logistics & Installation — lighting, counter, seating, display */}
        <g className="cty-plan__g" style={layerStyle(STEP_CENTRES[5])}>
          <g stroke="hsl(230 70% 65%)" strokeWidth="1.4">
            <circle cx="120" cy="100" r="7" /><circle cx="200" cy="100" r="7" />
            <circle cx="280" cy="100" r="7" /><circle cx="120" cy="196" r="7" />
          </g>
          <rect x="92" y="140" width="74" height="22" stroke="hsl(230 70% 65%)" strokeWidth="1.4" />
          <rect x="232" y="176" width="30" height="30" stroke="hsl(230 70% 65%)" strokeWidth="1.4" />
          <rect x="278" y="176" width="30" height="30" stroke="hsl(230 70% 65%)" strokeWidth="1.4" />
          <rect x="232" y="82" width="76" height="34" stroke="hsl(230 70% 65%)" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  )
}

// ── chapters ─────────────────────────────────────────────────

const CH = ['The city', 'On the floor', 'The venues', 'The calendar', 'What we do', 'The sectors', 'The work', 'Why us', 'The build', 'Questions']

function Chapter({ n, title, ground, children }: { n: number; title: string; ground: 'ink' | 'slate' | 'raised'; children: ReactNode }) {
  return (
    <section className={`cty-ch cty-ch--${ground}`} data-chapter={n} aria-label={title}>
      <div className="cty__wrap">{children}</div>
    </section>
  )
}

export function CityChapters({ data, cap, calendar, portfolio, faq, colophon }: {
  data: CityPageData
  /** Caption for the one media plate on the page. */
  cap: string
  /** The upcoming-shows carousel, when this city has shows. */
  calendar: ReactNode
  /** The owner's Portfolio section, rendered by the template and left untouched. */
  portfolio: ReactNode
  faq: ReactNode
  colophon: ReactNode
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  useChapters(rootRef)
  const current = useFolio(rootRef)
  const City = data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)

  return (
    <div className="cty" ref={rootRef}>

      {/* ── TITLE PAGE. Type on the ground, no media above the fold.
             The subtitle assembles line by line (kinetic). The h1 is NOT
             kinetic on purpose: the engine's splitter rebuilds the element
             from its textContent, which would destroy the highlight span. ── */}
      <section className="cty-title" data-chapter={0} aria-label={`Exhibition stall design in ${City}`}>
        <div data-sc-act="flow">
        <div className="cty__wrap">
          <div data-sc-in data-sc-stagger="90">
            <p className="cty-title__city">{data.eyebrow}</p>
            <h1>{data.h1Line1} <span className="hl">{data.h1Highlight}</span></h1>
          </div>
          <p className="cty-title__sub" data-sc-cue="0.02 0.62 0.28 0.2" data-sc-kinetic="lines">{data.subtitle}</p>
          <div data-sc-in data-sc-stagger="90">
            <div className="cty-title__acts">
              <Link href="/contact" className="btn btn-primary">Get Exhibition Stall Quote</Link>
              <Link href="/contact" className="btn btn-outline">Discuss Your Exhibition Plan</Link>
            </div>
            <ul className="cty-title__pills">
              {data.trustPills.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
        </div>
      </section>

      {/* The running head. Sticky, reports the chapter actually being read. */}
      <div className="cty__wrap cty-folio" aria-hidden="true">
        <b>{String(Math.max(1, current)).padStart(2, '0')}</b>
        <span>{CH[Math.max(1, current) - 1] ?? CH[0]}</span>
      </div>

      {/* ── 01 · THE CITY. Asymmetric spread, wiped in at the chapter
             boundary by the engine's own act-driven reveal. ── */}
      <section className="cty-ch cty-ch--slate" data-chapter={1} aria-label="The city">
        <div data-sc-act="flow">
          <div className="cty__wrap">
            <div className="cty-spread" data-sc-reveal="up" data-sc-reveal-at="0.02 0.4">
              <div className="cty-spread__rule" />
              <h2 className="cty-h2">{data.introHeading}</h2>
              <div>
                <p className="cty-lede">{data.introP1}</p>
                <p className="cty-lede">{data.introP2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · ON THE FLOOR. The one moving image on the page: a real
             stand on a real show floor, scrubbing under the reader's hand.
             It sits in its own column, captioned. Type never crosses it. ── */}
      <section className="cty-ch cty-ch--ink" data-chapter={2} aria-label="On the floor">
        <div data-sc-act="scrub" data-sc-span="2.6" data-sc-dwell="0.28">
          <div data-sc-stage className="sc-stage">
            <div className="cty__wrap" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(20px,3vw,36px)' }}>
              <div>
                <p className="cty-eyebrow">Make your brand easier to notice</p>
                <h2 className="cty-h2" style={{ maxWidth: '22ch' }}>{data.standOutHeading}</h2>
              </div>
              <div className="cty-plate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="sc-stage__poster" src={`${FLOW}/${CLIP}-poster.webp`} alt="" />
                <video data-sc-scrub data-sc-src={`${FLOW}/${CLIP}.mp4`}
                       data-sc-src-mobile={`${FLOW}/${CLIP}-m.mp4`} muted playsInline />
              </div>
              <p className="cty-plate__cap"><b>Plate one</b> {cap}</p>
            </div>
          </div>
        </div>
        <div className="cty__wrap">
          <div className="cty-notes" data-sc-in data-sc-stagger="70">
            {data.standOut.map((p, i) => (
              <div key={p.title} className="cty-note">
                <span className="cty-note__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · THE VENUES. Media in its own column with a caption, the
             editorial rule; alternating sides so the eye keeps moving, and
             the photographs drift inside their frames at opposing rates.
             Parallax inside a media column is what this grammar leans on. ── */}
      <section className="cty-ch cty-ch--raised" data-chapter={3} aria-label="The venues">
       <div data-sc-act="flow">
        <div className="cty__wrap">
        <div data-sc-in>
          <h2 className="cty-h2" style={{ maxWidth: '18ch' }}>Exhibition venues we serve <span style={{ color: 'hsl(110 55% 55%)' }}>in {City}</span></h2>
          <p className="cty-lede" style={{ marginTop: '18px', maxWidth: 'var(--measure)' }}>{data.venueIntro}</p>
          {data.venueIntro2 && <p className="cty-lede" style={{ marginTop: '12px', maxWidth: 'var(--measure)' }}>{data.venueIntro2}</p>}
        </div>

        <div style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
          {data.featuredVenue && (
            <div className="cty-venue" data-sc-in>
              <div className="cty-venue__media">
                <span className="cty-venue__badge">Premier Venue</span>
                <div className="cty-venue__par" data-sc-parallax="0.55">
                  <VenueImage src={data.featuredVenue.imageUrl} alt={`${data.featuredVenue.name} — exhibition venue`} />
                </div>
              </div>
              <div>
                <h3>{data.featuredVenue.name}</h3>
                <p className="cty-venue__addr">{data.featuredVenue.address}</p>
                {data.featuredVenue.specs.length > 0 && (
                  <dl className="cty-venue__specs">
                    {data.featuredVenue.specs.map(s => (
                      <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
                    ))}
                  </dl>
                )}
                {data.featuredVenue.notableShows && (
                  <p><strong style={{ color: 'hsl(220 10% 68%)' }}>Notable shows: </strong>{data.featuredVenue.notableShows}</p>
                )}
                <Link href="/contact" className="btn btn-outline btn-xs">{data.featuredVenue.ctaLabel} →</Link>
              </div>
            </div>
          )}

          {data.venues?.map((v, i) => (
            <div key={v.name} className={`cty-venue${i % 2 ? ' cty-venue--flip' : ''}`} data-sc-in>
              <div className="cty-venue__media">
                <span className="cty-venue__badge">Venue</span>
                <div className="cty-venue__par" data-sc-parallax={i % 2 ? '-0.5' : '0.55'}>
                  <VenueImage src={v.imageUrl} alt={`${v.name} — exhibition venue`} />
                </div>
              </div>
              <div>
                <h3>{v.name}</h3>
                <p>{v.description}</p>
                <p className="cty-venue__lbl">Best suited for</p>
                <ul>{v.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                <Link href="/contact" className="btn btn-outline btn-xs">{v.ctaLabel} →</Link>
              </div>
            </div>
          ))}
        </div>
        </div>
       </div>
      </section>

      {/* ── 04 · THE CALENDAR. The shows at those venues; the carousel is
             the page's own component and keeps its behaviour. ── */}
      {calendar && (
        <Chapter n={4} title="The calendar" ground="slate">{calendar}</Chapter>
      )}

      {/* ── 05 · WHAT WE DO. A running numbered list, not cards. ── */}
      <Chapter n={5} title="What we do" ground="ink">
        <div data-sc-in>
          <p className="cty-eyebrow">What we do</p>
          <h2 className="cty-h2">Our exhibition services in {City}</h2>
        </div>
        <div className="cty-run" style={{ marginTop: 'clamp(26px,3.5vw,42px)' }} data-sc-in data-sc-stagger="60">
          {data.services.map(s => (
            <div key={s.num} className="cty-run__row">
              <span className="cty-run__n">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── 06 · THE SECTORS. A rail. Lateral travel reads as breadth where
             vertical reads as argument, and a list of sectors served is
             breadth. Span scales with the count so every city's rail runs
             the same speed; under reduced motion the engine hands the travel
             back as an ordinary scroll region. ── */}
      <section className="cty-ch cty-ch--raised" data-chapter={6} aria-label="The sectors" style={{ padding: 0 }}>
        <div data-sc-act="pan" data-sc-span={(1.4 + data.industries.length * 0.22).toFixed(2)}>
          <div data-sc-stage className="sc-stage" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="cty__wrap cty-pan__head">
              <p className="cty-eyebrow">Sectors we serve</p>
              <h2 className="cty-h2">Industries we serve in {City}</h2>
            </div>
            <div className="cty-rail" data-sc-pan="0.05">
              {data.industries.map(ind => (
                <div key={ind.title} className="cty-rail__item">
                  <h3>{ind.title}</h3>
                  <p>{ind.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · THE WORK. The owner's Portfolio chapter, untouched. ── */}
      <div data-chapter={7}>{portfolio}</div>

      {/* ── 08 · WHY US. Alternating asymmetric pairs. ── */}
      <Chapter n={8} title="Why us" ground="slate">
        <div data-sc-in>
          <p className="cty-eyebrow">Why work with us</p>
          <h2 className="cty-h2">Why choose Approach Media for exhibition stands in {City}?</h2>
        </div>
        <div className="cty-pairs" style={{ marginTop: 'clamp(26px,3.5vw,42px)' }} data-sc-in data-sc-stagger="60">
          {data.whyUs.map(w => (
            <div key={w.title} className="cty-pair">
              <h3 className="cty-pair__t">{w.title}</h3>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── 09 · THE BUILD. The peak. Seven steps, seven layers: the plot
             is measured, zoned, walled, dimensioned, clad and fitted out,
             and on Dismantling & Exit it returns to an empty plot. ── */}
      <section className="cty-ch cty-ch--ink" data-chapter={9} aria-label="The build" style={{ padding: 0 }}>
        <div data-sc-act="pin" data-sc-span="3.6">
          <div data-sc-stage className="sc-stage">
            <div className="cty__wrap" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(18px,2.5vw,30px)' }}>
              <div>
                <p className="cty-eyebrow">How we work</p>
                <h2 className="cty-h2">Our exhibition stand process</h2>
              </div>
              <div className="cty-build__stage">
                <PlanDrawing />
                <ol className="cty-steps">
                  {data.process.map((p, i) => (
                    <li key={p.step} className="cty-step" style={layerStyle(STEP_CENTRES[i] - 0.045, true)}>
                      <span className="cty-step__n">{p.step}</span>
                      <div>
                        <h3>{p.title}</h3>
                        <p>{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 · QUESTIONS. Quiet. The accordion's own markup and script. ── */}
      <Chapter n={10} title="Questions" ground="slate">
        <div className="cty-faq" data-sc-in>{faq}</div>
      </Chapter>

      {/* ── COLOPHON. The close: a masthead plate, small type, held. The
             wipe comes in from the left, the one direction used nowhere
             else, so the last chapter reads as arriving rather than as one
             more section fading up. ── */}
      <section className="cty-ch cty-ch--raised" aria-label="Start your project">
        <div data-sc-act="flow">
          <div className="cty__wrap">
            <div className="cty-colo" data-sc-reveal="left" data-sc-reveal-at="0.04 0.42">{colophon}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
