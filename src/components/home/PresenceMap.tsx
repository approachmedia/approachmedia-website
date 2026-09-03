'use client'

/**
 * "Where we deliver" — the animated dot-map section from the owner's design
 * handoff (design_handoff_where_we_deliver). An animated dotted world map
 * (13 countries, green) and dotted India map (15 cities, blue): locations
 * ripple in one by one, are hoverable (tooltip) and clickable (the city and
 * country landing pages). The link lists below mirror every location and are
 * server-rendered, so crawlers and keyboards get real anchors either way.
 *
 * The canvas engine is the handoff's, ported near-verbatim per its README;
 * d3-geo + topojson-client at the pinned versions, geometry bundled locally
 * (public/where-we-deliver/countries-110m.json, world-atlas 2.0.2) so the
 * section has no third-party runtime dependency. Location URLs are the
 * site's existing pages from data/cities and data/countries — the handoff's
 * /locations/* placeholders mapped per its must-do list — and the two
 * Explore links keep their existing destinations (/portfolio, /about).
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { geoNaturalEarth1, geoMercator, geoPath, type GeoProjection } from 'd3-geo'
import { feature, merge } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { INDIAN_CITIES } from '@/data/cities'
import { INTERNATIONAL_COUNTRIES } from '@/data/countries'

/** Handoff coordinates, keyed by the site's own labels. */
const COORDS: Record<string, [number, number]> = {
  Mumbai: [19.08, 72.88], Delhi: [28.61, 77.21], Bangalore: [12.97, 77.59],
  Hyderabad: [17.39, 78.49], Chennai: [13.08, 80.27], Pune: [18.52, 73.86],
  Ahmedabad: [23.02, 72.57], Surat: [21.17, 72.83], Jaipur: [26.91, 75.79],
  Kolkata: [22.57, 88.36], Noida: [28.54, 77.39], Ludhiana: [30.9, 75.86],
  Chandigarh: [30.73, 76.78], Kochi: [9.93, 76.27], Goa: [15.3, 74.12],
  USA: [39.5, -98.4], Germany: [51.1, 10.4], France: [46.6, 2.2],
  Netherlands: [52.3, 5.3], Italy: [42.5, 12.5], 'UAE / Dubai': [24.3, 54.4],
  Spain: [40.2, -3.7], Nepal: [28.2, 84.1], Bangladesh: [23.7, 90.3],
  Singapore: [1.35, 103.8], China: [35.0, 104.0], Malaysia: [4.0, 102.0],
  'Kenya / Africa': [0.2, 37.9],
}

type Node = { name: string; url: string; lat: number; lon: number; x: number; y: number }

const toNodes = (items: { label: string; href: string | null }[]): Node[] =>
  items
    .filter(it => it.href && COORDS[it.label])
    .map(it => ({ name: it.label, url: it.href as string, lat: COORDS[it.label][0], lon: COORDS[it.label][1], x: 0, y: 0 }))

const CITY_NODES = toNodes(INDIAN_CITIES)
const COUNTRY_NODES = toNodes(INTERNATIONAL_COUNTRIES)
const BLUE: [number, number, number] = [91, 140, 255]
const GREEN: [number, number, number] = [52, 211, 153]

export function PresenceMap() {
  const sectionRef = useRef<HTMLElement>(null)
  const worldStageRef = useRef<HTMLDivElement>(null)
  const worldCanvasRef = useRef<HTMLCanvasElement>(null)
  const worldTipRef = useRef<HTMLDivElement>(null)
  const indiaStageRef = useRef<HTMLDivElement>(null)
  const indiaCanvasRef = useRef<HTMLCanvasElement>(null)
  const indiaTipRef = useRef<HTMLDivElement>(null)
  const cityListRef = useRef<HTMLUListElement>(null)
  const countryListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Ripple = { i: number; t0: number }
    type MapState = ReturnType<typeof makeMap>
    const cleanups: (() => void)[] = []

    function makeMap(opts: {
      stage: HTMLDivElement; cv: HTMLCanvasElement; tip: HTMLDivElement
      nodes: Node[]; color: [number, number, number]; links: HTMLAnchorElement[]
      kind: 'world' | 'india'
    }) {
      const { stage, cv, tip, nodes, color, links, kind } = opts
      const ctx = cv.getContext('2d')!
      const m = {
        stage, cv, ctx, tip, nodes, color, links, kind,
        dots: [] as { x: number; y: number; p: number }[],
        ripples: [] as Ripple[],
        lit: new Set<number>(), hover: -1, touched: -1,
        w: 0, h: 0, alpha: 0, ready: false, step: 8,
        feature: null as GeoJSON.GeoJSON | null,
        layout: () => {}, build: () => {}, activate: (_i: number) => {}, draw: (_now: number, _t: number) => {},
      }

      m.layout = () => {
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        m.w = stage.clientWidth; m.h = stage.clientHeight
        if (!m.w || !m.h) return
        cv.width = m.w * dpr; cv.height = m.h * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        if (m.feature) m.build()
      }
      m.build = () => {
        const { w, h } = m
        const proj: GeoProjection = kind === 'world' ? geoNaturalEarth1() : geoMercator()
        proj.fitExtent([[w * 0.02, h * 0.02], [w * 0.98, h * 0.98]], m.feature as never)
        // Rasterise land once, then sample a pixel grid → dots
        const off = document.createElement('canvas'); off.width = w; off.height = h
        const octx = off.getContext('2d')!
        octx.fillStyle = '#fff'; octx.beginPath(); geoPath(proj, octx)(m.feature as never); octx.fill()
        const img = octx.getImageData(0, 0, w, h).data
        const step = m.step = kind === 'world' ? Math.max(4.5, w / 190) : Math.max(5, w / 60)
        const dots: { x: number; y: number; p: number }[] = []
        for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
          const i = ((y | 0) * w + (x | 0)) * 4 + 3
          if (img[i] > 127) dots.push({ x, y, p: Math.random() * 6.283 })
        }
        m.dots = dots
        nodes.forEach(n => { const pt = proj([n.lon, n.lat]); if (pt) { n.x = pt[0]; n.y = pt[1] } })
        m.ready = true
      }
      m.activate = (i: number) => {
        m.lit.add(i)
        if (!REDUCED) m.ripples.push({ i, t0: performance.now() })
      }
      m.draw = (now: number, t: number) => {
        if (!m.ready) return
        const { w, h, dots, step, color: c } = m
        ctx.clearRect(0, 0, w, h)
        ctx.globalAlpha = m.alpha
        // one long, slow ocean swell: wavelength ≈ the map width, sharp crest,
        // slight lift; colour rides it too — blue trough → green crest
        const wave = REDUCED ? 0 : 1
        const rMin = Math.max(0.6, step * 0.08), rMax = Math.max(1.8, step * 0.36)
        const L = 6.283 / (w * 1.15), lift = step * 0.35
        const trough = [91, 140, 255], crest = [52, 211, 153]
        const grad: string[] = []
        for (let i = 0; i <= 16; i++) {
          const f = i / 16
          grad.push(`rgba(${Math.round(trough[0] + (crest[0] - trough[0]) * f)},${Math.round(trough[1] + (crest[1] - trough[1]) * f)},${Math.round(trough[2] + (crest[2] - trough[2]) * f)},${(0.28 + 0.5 * f).toFixed(2)})`)
        }
        for (const d of dots) {
          const ph = L * (d.x * 0.9 + d.y * 0.3) - t * 0.42
          const s = wave ? 0.5 + 0.5 * Math.sin(ph) : 0.5
          const e = s * s * s * (0.92 + 0.08 * Math.sin(d.p + t * 0.3))
          ctx.fillStyle = grad[Math.round(e * 16)]
          ctx.beginPath(); ctx.arc(d.x, d.y - e * lift * wave, rMin + (rMax - rMin) * e, 0, 6.283); ctx.fill()
        }
        m.ripples = m.ripples.filter(rp => now - rp.t0 < 2600)
        for (const rp of m.ripples) {
          const n = nodes[rp.i], e = (now - rp.t0) / 2600
          for (let ring = 0; ring < 3; ring++) {
            const re = e - ring * 0.14; if (re < 0) continue
            const rad = re * Math.max(40, w * 0.07), fade = (1 - re) * (1 - re)
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.5 * fade})`; ctx.lineWidth = 1.4 - ring * 0.3
            ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, 6.283); ctx.stroke()
          }
        }
        nodes.forEach((n, i) => {
          if (!m.lit.has(i)) return
          const hot = i === m.hover || i === m.touched
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i)
          const halo = hot ? 22 : 11 + pulse * 3
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, halo)
          g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${hot ? 0.55 : 0.22 + pulse * 0.1})`)
          g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, halo, 0, 6.283); ctx.fill()
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},1)`; ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 4.2 : 3, 0, 6.283); ctx.fill()
          ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 1.6 : 1.1, 0, 6.283); ctx.fill()
        })
        ctx.globalAlpha = 1
      }

      // ── interaction ──
      const hit = (px: number, py: number, radius: number) => {
        let best = -1, bd = radius * radius
        nodes.forEach((n, i) => {
          if (!m.lit.has(i)) return
          const d = (n.x - px) ** 2 + (n.y - py) ** 2
          if (d < bd) { bd = d; best = i }
        })
        return best
      }
      const pos = (e: PointerEvent | MouseEvent): [number, number] => {
        const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]
      }
      const showTip = (i: number, touch: boolean) => {
        const n = nodes[i]
        tip.innerHTML = `<i style="background:rgb(${m.color})"></i><span>${n.name}</span>` + (touch ? `<a href="${n.url}">Open →</a>` : '')
        tip.style.left = n.x + 'px'; tip.style.top = n.y + 'px'
        tip.classList.add('show'); tip.classList.toggle('touch', touch)
        links.forEach((a, j) => a.classList.toggle('active', j === i))
      }
      const hideTip = () => { tip.classList.remove('show', 'touch'); links.forEach(a => a.classList.remove('active')) }

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return
        const [x, y] = pos(e); const i = hit(x, y, 16)
        if (i !== m.hover) {
          m.hover = i; stage.classList.toggle('has-hit', i >= 0)
          if (i >= 0) showTip(i, false); else if (m.touched < 0) hideTip()
        }
      }
      const onLeave = () => { m.hover = -1; stage.classList.remove('has-hit'); if (m.touched < 0) hideTip() }
      const onClick = (e: MouseEvent) => {
        const [x, y] = pos(e)
        const src = e as MouseEvent & { pointerType?: string; sourceCapabilities?: { firesTouchEvents?: boolean } }
        const touch = src.pointerType === 'touch' || !!src.sourceCapabilities?.firesTouchEvents
        const i = hit(x, y, touch ? 26 : 16)
        if (i < 0) { m.touched = -1; hideTip(); return }
        if (!touch || m.touched === i) { window.location.assign(nodes[i].url); return }
        m.touched = i; showTip(i, true)
      }
      const onDocDown = (e: PointerEvent) => {
        if (!stage.contains(e.target as globalThis.Node)) { m.touched = -1; hideTip() }
      }
      cv.addEventListener('pointermove', onMove)
      cv.addEventListener('pointerleave', onLeave)
      cv.addEventListener('click', onClick)
      document.addEventListener('pointerdown', onDocDown)
      const linkHandlers = links.map((a, i) => {
        const enter = () => { if (m.lit.has(i)) { m.hover = i; showTip(i, false) } }
        const leave = () => { m.hover = -1; if (m.touched < 0) hideTip() }
        a.addEventListener('mouseenter', enter); a.addEventListener('mouseleave', leave)
        return { a, enter, leave }
      })
      cleanups.push(() => {
        cv.removeEventListener('pointermove', onMove)
        cv.removeEventListener('pointerleave', onLeave)
        cv.removeEventListener('click', onClick)
        document.removeEventListener('pointerdown', onDocDown)
        linkHandlers.forEach(({ a, enter, leave }) => { a.removeEventListener('mouseenter', enter); a.removeEventListener('mouseleave', leave) })
      })
      return m
    }

    const cityLinks = Array.from(cityListRef.current?.querySelectorAll('a') ?? []) as HTMLAnchorElement[]
    const countryLinks = Array.from(countryListRef.current?.querySelectorAll('a') ?? []) as HTMLAnchorElement[]

    const world = makeMap({
      stage: worldStageRef.current!, cv: worldCanvasRef.current!, tip: worldTipRef.current!,
      nodes: COUNTRY_NODES, color: GREEN, links: countryLinks, kind: 'world',
    })
    const india = makeMap({
      stage: indiaStageRef.current!, cv: indiaCanvasRef.current!, tip: indiaTipRef.current!,
      nodes: CITY_NODES, color: BLUE, links: cityLinks, kind: 'india',
    })

    // ── geometry (bundled locally; world-atlas 2.0.2) ──
    let dead = false
    fetch('/where-we-deliver/countries-110m.json')
      .then(r => r.json())
      .then((topo: Topology<{ countries: GeometryCollection }>) => {
        if (dead) return
        const geoms = topo.objects.countries.geometries
        world.feature = merge(topo, geoms.filter(g => g.id !== '010') as never)
        const ind = geoms.find(g => g.id === '356')
        if (ind) india.feature = feature(topo, ind) as GeoJSON.GeoJSON
        world.layout(); india.layout()
      })
      .catch(err => console.warn('Map geometry unavailable', err))

    let resizeT: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => { world.layout(); india.layout() }, 120)
    })
    ro.observe(world.stage); ro.observe(india.stage)

    // ── sequence ──
    let started = false, visible = false, raf = 0, t0 = 0
    let idleTimer: ReturnType<typeof setInterval> | undefined
    const timers: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))
    const activateAll = (m: MapState) => m.nodes.forEach((_, i) => m.activate(i))
    function start() {
      started = true; section!.classList.add('is-live'); t0 = performance.now()
      if (REDUCED) {
        world.alpha = india.alpha = 1
        activateAll(world); activateAll(india)
        section!.classList.add('india-on')
        return
      }
      COUNTRY_NODES.forEach((_, i) => schedule(() => world.activate(i), 3400 + i * 850))
      const tIndia = 3400 + COUNTRY_NODES.length * 850 - 1400
      schedule(() => section!.classList.add('india-on'), tIndia)
      CITY_NODES.forEach((_, i) => schedule(() => india.activate(i), tIndia + 1600 + i * 620))
      schedule(() => {
        idleTimer = setInterval(() => {
          if (!visible) return
          const m = Math.random() < 0.5 ? india : world
          m.ripples.push({ i: (Math.random() * m.nodes.length) | 0, t0: performance.now() })
        }, 2800)
      }, tIndia + 1600 + CITY_NODES.length * 620 + 1500)
    }
    function frame(now: number) {
      if (!visible) return
      const t = (now - t0) / 1000
      if (!REDUCED) {
        world.alpha = Math.min(1, Math.max(0, (t - 1.0) / 1.8))
        india.alpha = section!.classList.contains('india-on') ? Math.min(1, india.alpha + 0.012) : 0
      }
      world.draw(now, t); india.draw(now, t)
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) { if (!started) start(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame) }
      else cancelAnimationFrame(raf)
    }, { threshold: 0.12 })
    io.observe(section)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      if (idleTimer) clearInterval(idleTimer)
      clearTimeout(resizeT)
      ro.disconnect(); io.disconnect()
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <section ref={sectionRef} className="wwd" id="where-we-deliver" aria-labelledby="wwd-title">
      <div className="wwd__bg" aria-hidden="true"></div>
      <div className="wwd__inner">
        <header className="wwd__head">
          <div className="eyebrow">WHERE WE DELIVER</div>
          <h2 id="wwd-title">
            <span className="w"><span style={{ transitionDelay: '.5s' }}>Local</span></span>{' '}
            <span className="w"><span style={{ transitionDelay: '.68s' }}>execution.</span></span>{' '}
            <span className="w g"><span style={{ transitionDelay: '.9s' }}>Global</span></span>{' '}
            <span className="w g"><span style={{ transitionDelay: '1.1s' }}>standards.</span></span>
          </h2>
          <p className="sub">On-ground teams across India&apos;s largest exhibition cities and industrial hubs, and trade-show projects delivered across 14+ countries to international build and safety standards.</p>
        </header>

        <div className="maps">
          <div className="panel panel--world">
            <div className="panel__head">
              <div className="panel__icon panel__icon--green" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
              </div>
              <div><h3>International Presence</h3><p>Trade-show projects delivered across 14+ countries.</p></div>
            </div>
            <div className="stage stage--world" ref={worldStageRef}>
              <canvas ref={worldCanvasRef} aria-hidden="true"></canvas>
              <div className="tip" ref={worldTipRef} role="status"></div>
            </div>
            <div className="legend" aria-hidden="true">
              <span><i style={{ color: '#34d399', background: '#34d399' }}></i>International countries</span>
              <span><i style={{ color: '#5b8cff', background: '#5b8cff' }}></i>India</span>
            </div>
          </div>

          <div className="panel panel--india">
            <div className="panel__head">
              <div className="panel__icon panel__icon--blue" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5b8cff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              </div>
              <div><h3>Indian Presence</h3><p>On-ground teams in 15 cities.</p></div>
            </div>
            <div className="stage stage--india" ref={indiaStageRef}>
              <canvas ref={indiaCanvasRef} aria-hidden="true"></canvas>
              <div className="tip" ref={indiaTipRef} role="status"></div>
            </div>
            <div className="legend" aria-hidden="true">
              <span><i style={{ color: '#5b8cff', background: '#5b8cff' }}></i>Service cities</span>
            </div>
          </div>
        </div>

        {/* Crawlable, keyboard-reachable links; the canvases mirror these */}
        <div className="lists">
          <nav className="list list--in" aria-label="Indian cities">
            <div className="list__title"><i style={{ background: '#5b8cff' }}></i>Indian cities</div>
            <ul ref={cityListRef}>
              {CITY_NODES.map(n => (
                <li key={n.url}><Link href={n.url}>{n.name}</Link></li>
              ))}
            </ul>
            <Link className="more" href="/portfolio">Explore Indian cities <span aria-hidden="true">→</span></Link>
          </nav>
          <nav className="list list--intl" aria-label="International countries">
            <div className="list__title"><i style={{ background: '#34d399' }}></i>International countries</div>
            <ul ref={countryListRef}>
              {COUNTRY_NODES.map(n => (
                <li key={n.url}><Link href={n.url}>{n.name}</Link></li>
              ))}
            </ul>
            <Link className="more" href="/about">Explore countries <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      </div>
    </section>
  )
}
