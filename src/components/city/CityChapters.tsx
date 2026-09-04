'use client'

/**
 * The city pages as chapters.
 *
 * Each chapter lands on its own ground and behaves differently from its
 * neighbours (kinetic, reveal, scrub, zoom, pan, stagger, pin), but the
 * visual vocabulary is the site's own: the card surface, radii, type scale
 * and section rhythm in city-chapters.css are the values the city template
 * already used. Copy is never touched; the Portfolio chapter is the owner's
 * and is passed through untouched.
 *
 * The engine (public/about-flow/scrollcraft.js) is mounted once on the root
 * and drives the entrance reveals, the act-driven wipes, the scrub, the rail
 * and `--sc-p` on the pinned peak. Its stylesheet is deliberately NOT
 * imported; the few device rules it needs are carried, scoped to `.cty`.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { loadEngine, canH264 } from '@/components/services/ServiceFlow'
import VenueImage from './VenueImage'
import { ProcessStand } from './ProcessStand'
import type { CityPageData } from './types'

const FLOW = '/city-flow'
const CLIP = 'exhibition-stall-design-show-floor-01'

export type SectorShot = { src: string; alt: string; label: string } | null

// ── engine mount, folio, and the zoom ────────────────────────

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
 * The venue photographs zoom rather than translate.
 *
 * `data-sc-parallax` moves a layer by rate*100px across a whole act, which
 * inside a framed photo is about 55px and reads as the picture simply
 * sitting there while the page scrolls past it. Scale is the effect that is
 * actually legible at this size: each photograph enters slightly enlarged
 * and settles back to true size on its own travel through the viewport, so
 * every frame animates independently rather than all of them together.
 *
 * rAF runs only while at least one frame is on screen.
 */
function useZoom(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layers = Array.from(root.querySelectorAll<HTMLElement>('.cty-zoom'))
    if (layers.length === 0) return

    const onScreen = new Set<Element>()
    let raf = 0

    /** 0 as the frame's top reaches the bottom of the viewport, 1 as its
     *  bottom clears the top: the frame's own life, not the act's. */
    const apply = (frame: Element) => {
      const layer = frame.querySelector<HTMLElement>('.cty-zoom')
      if (!layer) return
      const r = frame.getBoundingClientRect()
      const k = Math.min(1, Math.max(0, 1 - (r.top + r.height) / (window.innerHeight + r.height)))
      layer.style.setProperty('--z', (1.14 - 0.14 * k).toFixed(4))
    }

    const tick = () => {
      onScreen.forEach(apply)
      raf = onScreen.size > 0 ? requestAnimationFrame(tick) : 0
    }

    // Settle every frame once up front, including those already scrolled
    // past, so nothing jumps the first time it is observed.
    layers.forEach(l => { if (l.parentElement) apply(l.parentElement) })

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) onScreen.add(e.target); else onScreen.delete(e.target) })
      if (onScreen.size > 0 && !raf) raf = requestAnimationFrame(tick)
    }, { rootMargin: '15% 0px' })

    layers.forEach(l => { if (l.parentElement) io.observe(l.parentElement) })
    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect() }
  }, [rootRef])
}

/** The running head: the chapter the reader is actually in. */
function useFolio(rootRef: React.RefObject<HTMLElement | null>) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const marks = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'))
    if (marks.length === 0) return
    const onScroll = () => {
      const line = window.innerHeight * 0.28
      let idx = 0
      marks.forEach((m, i) => { if (m.getBoundingClientRect().top <= line) idx = i })
      setCurrent(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [rootRef])
  return current
}

// ── chapters ─────────────────────────────────────────────────

const CH = ['The city', 'On the floor', 'The venues', 'The calendar', 'What we do', 'The sectors', 'The work', 'Why us', 'The build', 'Questions']

function Chapter({ n, title, ground, children }: { n: number; title: string; ground: 'a' | 'b' | 'c'; children: ReactNode }) {
  return (
    <section className={`cty-ch cty-ch--${ground}`} data-chapter={n} aria-label={title}>
      <div className="cty__wrap">{children}</div>
    </section>
  )
}

export function CityChapters({ data, cap, sectorShots, calendar, portfolio, faq, colophon }: {
  data: CityPageData
  cap: string
  /** One entry per industry, aligned by index; null where no project matches. */
  sectorShots: SectorShot[]
  calendar: ReactNode
  portfolio: ReactNode
  faq: ReactNode
  colophon: ReactNode
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  useChapters(rootRef)
  useZoom(rootRef)
  const current = useFolio(rootRef)
  const City = data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)

  return (
    <div className="cty" ref={rootRef}>

      {/* ── TITLE PAGE. The subtitle assembles line by line. The h1 is NOT
             kinetic on purpose: the engine's splitter rebuilds an element
             from its textContent, which would destroy the highlight span. ── */}
      <section className="cty-title" data-chapter={0} aria-label={`Exhibition stall design in ${City}`}>
        <div data-sc-act="flow">
          <div className="cty__wrap">
            <div data-sc-in data-sc-stagger="90">
              <span className="cty-title__city">{data.eyebrow}</span>
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

      <div className="cty__wrap cty-folio" aria-hidden="true">
        <b>{String(Math.max(1, current)).padStart(2, '0')}</b>
        <span>{CH[Math.max(1, current) - 1] ?? CH[0]}</span>
      </div>

      {/* ── 01 · THE CITY. Asymmetric spread, wiped in by the engine's
             act-driven reveal at the chapter boundary. ── */}
      <section className="cty-ch cty-ch--b" data-chapter={1} aria-label="The city">
        <div data-sc-act="flow">
          <div className="cty__wrap">
            <div className="cty-spread" data-sc-reveal="up" data-sc-reveal-at="0.02 0.4">
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
             stand on a real show floor, scrubbing under the reader's hand,
             in its own plate with a caption. Type never crosses it. ── */}
      <section className="cty-ch cty-ch--c" data-chapter={2} aria-label="On the floor" style={{ paddingTop: 0 }}>
        <div data-sc-act="scrub" data-sc-span="2.6" data-sc-dwell="0.28">
          <div data-sc-stage className="sc-stage">
            <div className="cty__wrap" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(20px,3vw,32px)' }}>
              <div>
                <span className="cty-eyebrow">Make your brand easier to notice</span>
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
              <div key={p.title} className="cty-card">
                <span className="cty-note__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · THE VENUES. Media beside the copy, alternating sides, each
             photograph zooming out to true size on its own travel. ── */}
      <Chapter n={3} title="The venues" ground="b">
        <div className="cty-head" data-sc-in>
          <h2 className="cty-h2" style={{ maxWidth: '20ch' }}>
            Exhibition venues we serve <span style={{ color: 'hsl(110 55% 55%)' }}>in {City}</span>
          </h2>
          <p className="cty-lede" style={{ marginTop: '18px', maxWidth: '68ch' }}>{data.venueIntro}</p>
          {data.venueIntro2 && <p className="cty-lede" style={{ marginTop: '12px', maxWidth: '68ch' }}>{data.venueIntro2}</p>}
        </div>

        {data.featuredVenue && (
          <div className="cty-venue" data-sc-in>
            <div className="cty-venue__media">
              <span className="cty-venue__badge">Premier Venue</span>
              <div className="cty-zoom">
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
              <div className="cty-zoom">
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
      </Chapter>

      {/* ── 04 · THE CALENDAR. The shows at those venues. ── */}
      {calendar && <Chapter n={4} title="The calendar" ground="a">{calendar}</Chapter>}

      {/* ── 05 · WHAT WE DO. A running numbered list, not a card grid. ── */}
      <Chapter n={5} title="What we do" ground="c">
        <div className="cty-head" data-sc-in>
          <span className="cty-eyebrow">What we do</span>
          <h2 className="cty-h2">Our exhibition services in {City}</h2>
        </div>
        <div className="cty-run" data-sc-in data-sc-stagger="60">
          {data.services.map(s => (
            <div key={s.num} className="cty-run__row">
              <span className="cty-run__n">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── 06 · THE SECTORS. A rail: lateral travel reads as breadth where
             vertical reads as argument. Each card carries a photograph of
             this city's own work in that sector where one exists, captioned
             with the real client, so the picture is never a stand-in. ── */}
      <section className="cty-ch cty-ch--b" data-chapter={6} aria-label="The sectors" style={{ padding: 0 }}>
        <div data-sc-act="pan" data-sc-span={(1.6 + data.industries.length * 0.24).toFixed(2)}>
          <div data-sc-stage className="sc-stage" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="cty__wrap cty-head">
              <span className="cty-eyebrow">Sectors we serve</span>
              <h2 className="cty-h2">Industries we serve in {City}</h2>
            </div>
            <div className="cty-rail" data-sc-pan="0.05">
              {data.industries.map((ind, i) => {
                const shot = sectorShots[i]
                return (
                  <div key={ind.title} className="cty-rail__item">
                    {shot && (
                      <div className="cty-rail__shot">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                        <span className="cty-rail__tag">{shot.label}</span>
                      </div>
                    )}
                    <div className="cty-rail__body">
                      <h3>{ind.title}</h3>
                      <p>{ind.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · THE WORK. The owner's Portfolio chapter, untouched. ── */}
      <div data-chapter={7}>{portfolio}</div>

      {/* ── 08 · WHY US. Alternating asymmetric pairs. ── */}
      <Chapter n={8} title="Why us" ground="a">
        <div className="cty-head" data-sc-in>
          <span className="cty-eyebrow">Why work with us</span>
          <h2 className="cty-h2">Why choose Approach Media for exhibition stands in {City}?</h2>
        </div>
        <div className="cty-pairs" data-sc-in data-sc-stagger="60">
          {data.whyUs.map(w => (
            <div key={w.title} className="cty-pair">
              <h3 className="cty-pair__t">{w.title}</h3>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── 09 · THE PROCESS. The owner's design-handoff animation: an
             isometric stand that is briefed, zoned, folded into 3D, costed,
             branded, installed and struck across the page's own seven
             stages. Scroll drives the stage, hover previews one, a click
             pins it. Every stage's copy stays in the DOM. ── */}
      <Chapter n={9} title="The build" ground="c">
        <div className="cty-head" data-sc-in>
          <span className="cty-eyebrow">How we work</span>
          <h2 className="cty-h2">Our exhibition stand process</h2>
        </div>
        <ProcessStand steps={data.process} />
      </Chapter>

      {/* ── 10 · QUESTIONS. The accordion's own markup and script. ── */}
      <Chapter n={10} title="Questions" ground="a">
        <div className="cty-faq" data-sc-in>{faq}</div>
      </Chapter>

      {/* ── COLOPHON. The close, wiped in from the left. ── */}
      <section className="cty-ch cty-ch--b" aria-label="Start your project">
        <div data-sc-act="flow">
          <div className="cty__wrap">
            <div className="cty-colo" data-sc-reveal="left" data-sc-reveal-at="0.04 0.42">{colophon}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
