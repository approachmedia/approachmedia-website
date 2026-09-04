'use client'

/**
 * "Our exhibition stand process" — the isometric stand that builds itself.
 *
 * Ported from the owner's design handoff (design_handoff_exhibition_process).
 * The geometry, colours, easing and stage choreography are the handoff's and
 * are reproduced as specified; the projection is 1 m = 80 units, a 6 x 4 m
 * booth as 480 x 320 plan units, iso mapped X = 0.866(x - y),
 * Y = 0.5(x + y) - height, with the iso layer at translate(331,200).
 *
 * Two deliberate departures from the reference file:
 *  · the stage copy is the PAGE'S OWN `process` data, not the handoff's
 *    hard-coded list, because that list names Mumbai in stage 06 while these
 *    pages are per-city and each already carries the right wording;
 *  · the eyebrow and heading use the site's existing chapter styles rather
 *    than the handoff's own, so this section matches its neighbours.
 *
 * The stand's internal palette is the handoff's brand set (#172F9D blue,
 * #53B618 green) since it is one self-contained illustration.
 *
 * Stage text is always in the DOM; collapsed descriptions are height-
 * collapsed with grid-template-rows, never removed, so the copy stays
 * crawlable. Reduced motion drops every transition and shows each stage's
 * settled state.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

const E = 'cubic-bezier(.22,1,.36,1)'
const BL = 'color-mix(in oklab, #172F9D 55%, #F8F9FA)'
const DISPLAY = "var(--font-display), 'Space Grotesk', Inter, sans-serif"

export type ProcessStep = { step: string; title: string; body: string }

const CARD_SHELL: CSSProperties = {
  background: 'rgba(15,18,25,.88)', border: '1px solid rgba(255,255,255,.08)',
  borderRadius: '1.4cqw', padding: '2.2cqw 2.4cqw', backdropFilter: 'blur(10px)',
  boxShadow: '0 2cqw 5cqw rgba(0,0,0,.45)', fontSize: '1.9cqw', color: '#F8F9FA',
}
const CARD_LABEL: CSSProperties = {
  color: '#53B618', fontSize: '1.4cqw', letterSpacing: '.18em',
  textTransform: 'uppercase', fontWeight: 600,
}
const ROW: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '1cqw' }

export function ProcessStand({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [reduced, setReduced] = useState(false)
  const [stacked, setStacked] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const visRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const compute = useCallback(() => {
    const r = root.current, vis = visRef.current
    if (!r || !vis) return
    const items = Array.from(r.querySelectorAll<HTMLElement>('[data-stage-item]'))
    if (items.length === 0) return
    const vr = vis.getBoundingClientRect()
    const isStacked = vr.width > r.clientWidth * 0.8
    const line = isStacked ? vr.bottom + window.innerHeight * 0.10 : window.innerHeight * 0.55
    let a = 0
    items.forEach((el, i) => { if (el.getBoundingClientRect().top < line) a = i })
    setActive(prev => (prev === a ? prev : a))
    setStacked(prev => (prev === isStacked ? prev : isStacked))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => setReduced(mq.matches)
    onMq(); mq.addEventListener('change', onMq)
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => { rafRef.current = 0; compute() })
    }
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(compute, 80)
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onScroll)
      mq.removeEventListener('change', onMq)
      clearTimeout(t)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [compute])

  const d = hover ?? active
  const tr = (dl = 0) => reduced ? 'none'
    : `opacity .8s ${E} ${dl}s, transform 1.3s ${E} ${dl}s, fill 1.2s ${E} ${dl}s, stroke .9s ${E} ${dl}s`
  const v = (c: boolean, hid = 'translateY(16px)', dl = 0, x: CSSProperties = {}): CSSProperties =>
    ({ opacity: c ? 1 : 0, transform: c ? 'translate(0px,0px)' : hid, transition: tr(dl), pointerEvents: 'none', ...x })
  const rise = (c: boolean, dl = 0): CSSProperties =>
    d === 6 ? { opacity: 0, transform: 'translateY(46px)', transition: tr(dl * 0.5) } : v(c, 'translateY(70px)', dl)
  const card = (c: boolean, pos: CSSProperties, dl: number): CSSProperties =>
    v(c, 'translateY(14px) scale(.98)', dl, { position: 'absolute', ...pos })
  const built = d >= 2 && d < 6

  const s = {
    venue: { fill: 'url(#psGrid)', opacity: d >= 5 ? 1 : 0, transition: tr() } as CSSProperties,
    plan: {
      transform: d >= 2 ? 'matrix(.866,.5,-.866,.5,331,200)' : 'matrix(1,0,0,1,160,170)',
      transition: reduced ? 'none' : `transform 1.6s ${E}`,
    } as CSSProperties,
    floor: { fill: 'url(#psFloor)', opacity: built ? 1 : 0, transition: tr() } as CSSProperties,
    outline: { fill: 'none', stroke: '#8B93A5', strokeWidth: 1.5, strokeDasharray: '10 8', opacity: d <= 1 ? .9 : (built ? .2 : 0), transition: tr() } as CSSProperties,
    wallsPlan: { ...v(d === 1, 'translate(0px,0px)'), fill: 'none', stroke: '#F8F9FA', strokeWidth: 6, strokeLinejoin: 'miter' } as CSSProperties,
    dims: v(d <= 1, 'translateY(8px)'),
    zones: v(d === 1, 'translateY(10px)', .15),
    flow: { ...v(d === 1, 'translate(0px,0px)', .5), fill: 'none', stroke: BL, strokeWidth: 1.6, strokeDasharray: '8 8', markerEnd: 'url(#psArwB)', animation: reduced ? 'none' : 'psDash 2.6s linear infinite' } as CSSProperties,
    guides: { ...v(d === 5, 'translate(0px,0px)', .2), fill: 'none', stroke: '#53B618', strokeWidth: 1.2, strokeDasharray: '12 10', animation: reduced ? 'none' : 'psDash 3s linear infinite' } as CSSProperties,
    team: v(d === 5, 'translate(0px,0px)', .5),
    exit: { ...v(d === 6, 'translateX(-30px)', .7), fill: 'none', stroke: '#53B618', strokeWidth: 2, strokeDasharray: '10 8', markerEnd: 'url(#psArw)', animation: reduced ? 'none' : 'psDash 2.2s linear infinite' } as CSSProperties,
    walls: d === 6
      ? { opacity: 0, transform: 'scaleY(.04)', transition: tr(), transformBox: 'fill-box', transformOrigin: '50% 100%' } as CSSProperties
      : { ...v(d >= 2, 'translateY(80px)', .05), transformBox: 'fill-box', transformOrigin: '50% 100%' } as CSSProperties,
    refl: { fill: 'url(#psRefl)', opacity: d >= 4 && d < 6 ? 1 : 0, transition: tr(.5) } as CSSProperties,
    brand: v(d >= 4, 'translate(0px,0px)', .1),
    screenOn: v(d >= 4, 'translate(0px,0px)', .4),
    logo: v(d >= 4, 'translateY(6px)', .7),
    lights: d === 6 ? { opacity: 0, transform: 'translateY(-40px)', transition: tr() } as CSSProperties : v(built, 'translateY(-50px)', .5),
    cones: { opacity: d >= 4 ? .55 : .18, transition: tr(.5), animation: d === 5 && !reduced ? 'psFlick 2.4s ease-out .3s forwards' : 'none' } as CSSProperties,
    truck: (d === 5
      ? { opacity: 1, transform: 'translate(0px,0px)', transition: reduced ? 'none' : `transform 2.6s ${E}, opacity 1.2s ${E}` }
      : d === 6
        ? { opacity: 0, transform: 'translate(606px,350px)', transition: reduced ? 'none' : `transform 2.6s ${E}, opacity 1.4s ${E} 1.2s` }
        : { opacity: 0, transform: 'translate(-606px,-350px)', transition: 'none' }) as CSSProperties,
    crates: v(d >= 5, 'translateX(-40px)', .25),
    crates2: v(d === 6, 'translateY(30px)', .5),
    chips: v(d === 5, 'translateY(8px)', .6),
    done: v(d === 6, 'translateY(8px)', 1),
    f0: rise(built, .15), f1: rise(built, .3), f2: rise(built, .4), f3: rise(built, .5), f4: rise(built, .6),
  }
  const pan = (i: number): CSSProperties => ({ ...v(d >= 4, 'translateY(-16px)', .15 + i * .14), fill: i % 2 ? '#172F9D' : '#0F1F63' })
  const tag = (i: number) => v(d === 3, 'translateY(10px)', .35 + i * .12)
  const tick = (i: number): CSSProperties => ({
    width: '1.9cqw', height: '1.9cqw', borderRadius: '50%', flex: 'none', boxSizing: 'border-box',
    border: '1px solid rgba(83,182,24,.6)', background: d === 3 ? '#53B618' : 'transparent',
    boxShadow: d === 3 ? 'inset 0 0 0 .35cqw #0F1219' : 'none',
    transition: reduced ? 'none' : `background .4s ${E} ${.5 + i * .15}s, box-shadow .4s ${E} ${.5 + i * .15}s`,
  })

  const cur = steps[d] ?? steps[0]

  return (
    <div ref={root} className="ps">
      <div className="ps__grid">
        <div ref={visRef} className="ps__sticky" style={stacked
          ? { position: 'sticky', top: 'var(--hdr, 97px)', zIndex: 2, alignSelf: 'start', background: 'var(--ground, #0B0D12)', padding: '10px 0 14px', boxShadow: '0 24px 24px -8px var(--ground, #0B0D12)', boxSizing: 'border-box' }
          : { position: 'sticky', top: 'calc(var(--hdr, 97px) + clamp(12px,3vh,40px))', alignSelf: 'start' }}>
          <div style={{ position: 'relative', width: stacked ? 'min(100%, calc(30vh * 1.11))' : 'min(100%, calc(52vh * 1.11))', aspectRatio: '800 / 720', margin: '0 auto', containerType: 'inline-size' }}>
            <svg viewBox="0 0 800 720" width="100%" height="100%" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
              <defs>
                <radialGradient id="psVig" cx="50%" cy="55%" r="60%"><stop offset="0" stopColor="#172F9D" stopOpacity=".22" /><stop offset="1" stopColor="#172F9D" stopOpacity="0" /></radialGradient>
                <linearGradient id="psBrand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0F1F63" /><stop offset=".55" stopColor="#172F9D" /><stop offset="1" stopColor="#53B618" /></linearGradient>
                <linearGradient id="psScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0F1F63" /><stop offset=".6" stopColor="#172F9D" /><stop offset="1" stopColor="#53B618" /></linearGradient>
                <linearGradient id="psCone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F8F9FA" stopOpacity=".5" /><stop offset="1" stopColor="#F8F9FA" stopOpacity="0" /></linearGradient>
                <radialGradient id="psPool"><stop offset="0" stopColor="#F8F9FA" stopOpacity=".32" /><stop offset="1" stopColor="#F8F9FA" stopOpacity="0" /></radialGradient>
                <linearGradient id="psRefl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#53B618" stopOpacity=".28" /><stop offset=".5" stopColor="#172F9D" stopOpacity=".14" /><stop offset="1" stopColor="#172F9D" stopOpacity="0" /></linearGradient>
                <linearGradient id="psFloor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1A2030" /><stop offset="1" stopColor="#10141C" /></linearGradient>
                <linearGradient id="psGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F8F9FA" stopOpacity=".22" /><stop offset="1" stopColor="#F8F9FA" stopOpacity=".05" /></linearGradient>
                <filter id="psBlur" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="12" /></filter>
                <filter id="psSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" /></filter>
                <pattern id="psGrid" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="matrix(.866,.5,-.866,.5,331,200)"><path d="M80,0 L0,0 L0,80" style={{ fill: 'none', stroke: 'rgba(255,255,255,.07)', strokeWidth: 1 }} /></pattern>
                <marker id="psArw" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" style={{ fill: '#53B618' }} /></marker>
                <marker id="psArwB" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" style={{ fill: BL }} /></marker>
              </defs>

              <rect x="0" y="0" width="800" height="720" style={{ fill: 'url(#psVig)' }} />
              <rect x="0" y="0" width="800" height="720" style={s.venue} />

              {/* PLAN LAYER: plan coords 480x320, top view folding to isometric */}
              <g style={s.plan}>
                <rect x="0" y="0" width="480" height="320" style={s.floor} />
                <rect x="0" y="0" width="480" height="320" style={s.outline} />
                <path d="M0,320 L0,0 L480,0" style={s.wallsPlan} />
                <g style={s.dims}>
                  <path d="M0,372 L480,372 M0,362 L0,382 M480,362 L480,382" style={{ fill: 'none', stroke: '#53B618', strokeWidth: 1.5 }} />
                  <text x="240" y="398" style={{ fill: '#53B618', fontSize: '12px', fontWeight: 600, letterSpacing: '.12em', textAnchor: 'middle' }}>6.0 M</text>
                  <path d="M-36,0 L-36,320 M-46,0 L-26,0 M-46,320 L-26,320" style={{ fill: 'none', stroke: '#53B618', strokeWidth: 1.5 }} />
                  <text x="-52" y="160" transform="rotate(-90 -52 160)" style={{ fill: '#53B618', fontSize: '12px', fontWeight: 600, letterSpacing: '.12em', textAnchor: 'middle' }}>4.0 M</text>
                  <text x="240" y="342" style={{ fill: '#8B93A5', fontSize: '10px', letterSpacing: '.2em', textAnchor: 'middle' }}>OPEN SIDE</text>
                  <text x="500" y="160" transform="rotate(90 500 160)" style={{ fill: '#8B93A5', fontSize: '10px', letterSpacing: '.2em', textAnchor: 'middle' }}>OPEN SIDE</text>
                  <path d="M-8,-8 L-8,-24 M-8,-8 L-24,-8 M488,-8 L488,-24 M488,-8 L504,-8 M-8,328 L-8,344 M-8,328 L-24,328 M488,328 L488,344 M488,328 L504,328" style={{ fill: 'none', stroke: '#8B93A5', strokeWidth: 1 }} />
                </g>
                <g style={s.zones}>
                  <rect x="100" y="0" width="380" height="14" style={{ fill: '#53B618', opacity: .85 }} />
                  <text x="290" y="-10" style={{ fill: '#53B618', fontSize: '11px', letterSpacing: '.16em', textAnchor: 'middle' }}>BRANDING WALL</text>
                  <rect x="0" y="0" width="90" height="80" style={{ fill: 'rgba(23,47,157,.22)', stroke: BL, strokeWidth: 1.2 }} />
                  <text x="45" y="46" style={{ fill: '#B9C0D0', fontSize: '11px', letterSpacing: '.14em', textAnchor: 'middle' }}>STORAGE</text>
                  <rect x="190" y="30" width="100" height="120" style={{ fill: 'rgba(23,47,157,.28)', stroke: BL, strokeWidth: 1.2 }} />
                  <text x="240" y="95" style={{ fill: '#B9C0D0', fontSize: '11px', letterSpacing: '.14em', textAnchor: 'middle' }}>DEMO</text>
                  <rect x="340" y="60" width="120" height="110" style={{ fill: 'rgba(23,47,157,.28)', stroke: BL, strokeWidth: 1.2 }} />
                  <text x="400" y="119" style={{ fill: '#B9C0D0', fontSize: '11px', letterSpacing: '.14em', textAnchor: 'middle' }}>MEETING</text>
                  <rect x="40" y="100" width="120" height="190" style={{ fill: 'rgba(23,47,157,.28)', stroke: BL, strokeWidth: 1.2 }} />
                  <text x="100" y="199" style={{ fill: '#B9C0D0', fontSize: '11px', letterSpacing: '.14em', textAnchor: 'middle' }}>DISPLAY</text>
                  <rect x="280" y="180" width="160" height="100" style={{ fill: 'rgba(23,47,157,.28)', stroke: BL, strokeWidth: 1.2 }} />
                  <text x="360" y="234" style={{ fill: '#B9C0D0', fontSize: '11px', letterSpacing: '.14em', textAnchor: 'middle' }}>RECEPTION</text>
                </g>
                <path d="M240,318 L240,270 L300,270 L330,232 L300,200 L170,200 L170,110 L200,90 L300,90 L338,116" style={s.flow} />
                <rect x="-14" y="-14" width="508" height="348" style={s.guides} />
                <g style={s.team}>
                  <circle cx="120" cy="300" r="6" style={{ fill: '#53B618', animation: reduced ? 'none' : 'psPulse 1.6s ease-in-out infinite' }} />
                  <circle cx="400" cy="296" r="6" style={{ fill: '#53B618', animation: reduced ? 'none' : 'psPulse 1.6s ease-in-out infinite .5s' }} />
                  <circle cx="250" cy="60" r="6" style={{ fill: '#53B618', animation: reduced ? 'none' : 'psPulse 1.6s ease-in-out infinite 1s' }} />
                </g>
                <path d="M240,180 L240,420 L-60,420" style={s.exit} />
              </g>

              {/* ISO LAYER: origin = plan (0,0) */}
              <g transform="translate(331,200)">
                <g transform="matrix(.866,.5,-.866,.5,0,0)"><rect x="130" y="0" width="240" height="90" style={s.refl} /></g>

                <g style={s.walls}>
                  {/* side wall (x=0), non-mirrored so its text reads correctly */}
                  <g transform="matrix(.866,-.5,0,1,-277,-40)">
                    <rect x="0" y="0" width="320" height="200" style={{ fill: '#161B25', stroke: '#232A37', strokeWidth: 1 }} />
                    <path d="M80,0 L80,200 M160,0 L160,200 M240,0 L240,200" style={{ fill: 'none', stroke: '#20262F', strokeWidth: 1 }} />
                    <g style={s.brand}>
                      <rect x="60" y="34" width="200" height="120" style={{ fill: 'url(#psBrand)' }} />
                      <rect x="60" y="154" width="200" height="4" style={{ fill: '#53B618' }} />
                      <text x="160" y="100" style={{ fill: '#F8F9FA', fontFamily: DISPLAY, fontWeight: 800, fontSize: '15px', letterSpacing: '.2em', textAnchor: 'middle' }}>IMAGINE · CREATE · DELIVER</text>
                    </g>
                  </g>
                  {/* back wall (y=0) */}
                  <g transform="matrix(.866,.5,0,1,0,-200)">
                    <rect x="0" y="0" width="480" height="200" style={{ fill: '#1A1F2A', stroke: '#2A3140', strokeWidth: 1 }} />
                    <path d="M120,0 L120,200 M240,0 L240,200 M360,0 L360,200" style={{ fill: 'none', stroke: '#242B38', strokeWidth: 1 }} />
                    <g style={s.brand}>
                      <rect x="0" y="0" width="120" height="200" style={pan(0)} />
                      <rect x="120" y="0" width="120" height="200" style={pan(1)} />
                      <rect x="240" y="0" width="120" height="200" style={pan(2)} />
                      <rect x="360" y="0" width="120" height="200" style={pan(3)} />
                      <rect x="0" y="0" width="480" height="200" style={{ fill: 'url(#psBrand)', opacity: .55, mixBlendMode: 'multiply' }} />
                    </g>
                    <rect x="130" y="36" width="240" height="140" style={{ fill: '#05070B', stroke: '#343B48', strokeWidth: 2 }} />
                    <g style={s.screenOn}>
                      <rect x="132" y="38" width="236" height="136" style={{ fill: 'url(#psScreen)' }} />
                      <rect x="150" y="60" width="120" height="8" style={{ fill: '#F8F9FA', opacity: .9 }} />
                      <rect x="150" y="76" width="80" height="6" style={{ fill: '#F8F9FA', opacity: .55 }} />
                      <rect x="150" y="130" width="60" height="18" style={{ fill: '#53B618' }} />
                    </g>
                    <rect x="0" y="-38" width="480" height="38" style={{ fill: '#53B618', opacity: d >= 4 ? .35 : 0, filter: 'url(#psBlur)', transition: tr(.6) }} />
                    <rect x="0" y="-38" width="480" height="38" style={{ fill: '#0F1219', stroke: '#2A3140', strokeWidth: 1 }} />
                    <g style={s.logo}>
                      <rect x="0" y="-38" width="480" height="38" style={{ fill: '#F8F9FA', opacity: .06 }} />
                      <path d="M300,-11 L312,-31 L324,-11 L318,-11 L312,-21 L306,-11 Z" style={{ fill: '#53B618' }} />
                      <text x="332" y="-13" style={{ fill: '#F8F9FA', fontFamily: DISPLAY, fontWeight: 800, fontSize: '20px', letterSpacing: '.08em' }}>APPROACH</text>
                    </g>
                  </g>
                </g>

                {/* storage room */}
                <g style={s.f0}>
                  <g transform="matrix(.866,.5,0,1,-69.3,-160)"><rect x="0" y="0" width="90" height="200" style={{ fill: '#12161E', stroke: '#232A37' }} /><rect x="30" y="60" width="30" height="140" style={{ fill: 'none', stroke: '#2A3140' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,77.9,-155)"><rect x="0" y="0" width="80" height="200" style={{ fill: '#181D27', stroke: '#232A37' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-200)"><rect x="0" y="0" width="90" height="80" style={{ fill: '#1E2431', stroke: '#2A3140' }} /></g>
                </g>

                {/* display plinths */}
                <g style={s.f1}>
                  <g transform="matrix(.866,.5,0,1,-155.9,20)"><rect x="60" y="0" width="80" height="70" style={{ fill: '#C9CCD3' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,121.2,0)"><rect x="120" y="0" width="60" height="70" style={{ fill: '#A9AEB8' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-70)"><rect x="60" y="120" width="80" height="60" style={{ fill: '#E5E7EB' }} /><rect x="85" y="135" width="30" height="30" style={{ fill: '#172F9D', opacity: .9 }} /></g>
                  <g transform="matrix(.866,.5,0,1,-233.8,65)"><rect x="60" y="0" width="80" height="70" style={{ fill: '#C9CCD3' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,121.2,0)"><rect x="210" y="0" width="60" height="70" style={{ fill: '#A9AEB8' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-70)"><rect x="60" y="210" width="80" height="60" style={{ fill: '#E5E7EB' }} /><rect x="85" y="225" width="30" height="30" style={{ fill: '#53B618', opacity: .9 }} /></g>
                </g>

                {/* demo kiosk */}
                <g style={s.f2}>
                  <g transform="matrix(.866,.5,0,1,-60.6,-95)"><rect x="230" y="0" width="20" height="130" style={{ fill: '#1A1F2A', stroke: '#2A3140' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,216.5,-5)"><rect x="60" y="0" width="10" height="130" style={{ fill: '#0F1219' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-130)"><rect x="230" y="60" width="20" height="10" style={{ fill: '#2D2D2D' }} /></g>
                  <g transform="matrix(.866,.5,0,1,-60.6,-95)"><rect x="232" y="6" width="16" height="70" style={{ fill: 'url(#psScreen)', opacity: .9 }} /></g>
                </g>

                {/* reception counter */}
                <g style={s.f3}>
                  <g transform="matrix(.866,.5,0,1,-216.5,35)"><rect x="300" y="0" width="120" height="90" style={{ fill: 'url(#psGlass)', stroke: 'rgba(248,249,250,.4)', strokeWidth: 1 }} /><rect x="300" y="84" width="120" height="3" style={{ fill: '#53B618' }} /><path d="M318,-6 L318,96 L330,96 L330,-6 Z" style={{ fill: '#F8F9FA', opacity: .06 }} /></g>
                  <g transform="matrix(-.866,.5,0,1,363.7,120)"><rect x="200" y="0" width="50" height="90" style={{ fill: 'rgba(248,249,250,.06)', stroke: 'rgba(248,249,250,.3)', strokeWidth: 1 }} /><rect x="200" y="84" width="50" height="3" style={{ fill: '#53B618' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-90)"><rect x="300" y="200" width="120" height="50" style={{ fill: '#F8F9FA' }} /></g>
                </g>

                {/* meeting lounge */}
                <g style={s.f4}>
                  <path d="M247,183 L247,255" style={{ stroke: '#6B7280', strokeWidth: 6 }} />
                  <ellipse cx="247" cy="256" rx="16" ry="9" style={{ fill: '#4B5262' }} />
                  <ellipse cx="247" cy="183" rx="44" ry="25" style={{ fill: '#E5E7EB' }} />
                  <ellipse cx="242" cy="175" rx="15" ry="9" style={{ fill: '#2D2D2D', stroke: '#6B7280' }} />
                  <ellipse cx="312" cy="215" rx="15" ry="9" style={{ fill: '#2D2D2D', stroke: '#6B7280' }} />
                  <ellipse cx="208" cy="235" rx="15" ry="9" style={{ fill: '#2D2D2D', stroke: '#6B7280' }} />
                </g>

                {/* lighting rig */}
                <g style={s.lights}>
                  <path d="M-277,-80 L139,160" style={{ stroke: '#2A3140', strokeWidth: 6 }} />
                  <path d="M-277,-84 L139,156" style={{ stroke: '#3A4150', strokeWidth: 1 }} />
                  <g style={s.cones}>
                    <polygon points="-173,-20 -150,150 -24,150" style={{ fill: 'url(#psCone)' }} />
                    <polygon points="-69,40 44,180 164,180" style={{ fill: 'url(#psCone)' }} />
                    <polygon points="35,100 61,310 181,310" style={{ fill: 'url(#psCone)' }} />
                    <ellipse cx="-87" cy="150" rx="66" ry="34" style={{ fill: 'url(#psPool)' }} />
                    <ellipse cx="104" cy="180" rx="66" ry="34" style={{ fill: 'url(#psPool)' }} />
                    <ellipse cx="121" cy="310" rx="66" ry="34" style={{ fill: 'url(#psPool)' }} />
                  </g>
                  <rect x="-179" y="-24" width="12" height="16" rx="2" style={{ fill: '#3A4150' }} /><circle cx="-173" cy="-6" r="3" style={{ fill: '#F8F9FA' }} />
                  <rect x="-75" y="36" width="12" height="16" rx="2" style={{ fill: '#3A4150' }} /><circle cx="-69" cy="54" r="3" style={{ fill: '#F8F9FA' }} />
                  <rect x="29" y="96" width="12" height="16" rx="2" style={{ fill: '#3A4150' }} /><circle cx="35" cy="114" r="3" style={{ fill: '#F8F9FA' }} />
                </g>

                {/* delivery truck: arrives at 06, leaves at 07 */}
                <g style={s.truck}>
                  <g transform="matrix(.866,.5,-.866,.5,0,0)"><ellipse cx="380" cy="445" rx="200" ry="60" style={{ fill: '#000', opacity: .35, filter: 'url(#psSoft)' }} /></g>
                  <g transform="matrix(.866,.5,0,1,-415.7,140)"><rect x="200" y="0" width="290" height="100" style={{ fill: '#E5E7EB', stroke: '#A9AEB8' }} /><rect x="200" y="86" width="290" height="14" style={{ fill: '#2D2D2D' }} /><rect x="230" y="30" width="60" height="18" style={{ fill: '#172F9D' }} /><path d="M300,44 L306,30 L312,44 L309,44 L306,39 L303,44 Z" style={{ fill: '#53B618' }} /><text x="318" y="43" style={{ fill: '#172F9D', fontFamily: DISPLAY, fontWeight: 800, fontSize: '13px', letterSpacing: '.06em' }}>APPROACH</text><circle cx="240" cy="108" r="13" style={{ fill: '#0B0D12', stroke: '#6B7280', strokeWidth: 2 }} /><circle cx="270" cy="108" r="13" style={{ fill: '#0B0D12', stroke: '#6B7280', strokeWidth: 2 }} /><circle cx="450" cy="108" r="13" style={{ fill: '#0B0D12', stroke: '#6B7280', strokeWidth: 2 }} /></g>
                  <g transform="matrix(-.866,.5,0,1,424.3,145)"><rect x="400" y="0" width="80" height="100" style={{ fill: '#C9CCD3', stroke: '#A9AEB8' }} /><path d="M440,4 L440,96" style={{ stroke: '#A9AEB8' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-100)"><rect x="200" y="400" width="290" height="80" style={{ fill: '#F8F9FA' }} /></g>
                  <g transform="matrix(.866,.5,0,1,-415.7,170)"><rect x="490" y="0" width="70" height="70" style={{ fill: '#172F9D', stroke: '#0F1F63' }} /><rect x="500" y="8" width="52" height="26" style={{ fill: 'url(#psGlass)', stroke: 'rgba(248,249,250,.4)' }} /><rect x="490" y="58" width="70" height="12" style={{ fill: '#2D2D2D' }} /><circle cx="525" cy="78" r="13" style={{ fill: '#0B0D12', stroke: '#6B7280', strokeWidth: 2 }} /></g>
                  <g transform="matrix(-.866,.5,0,1,485,210)"><rect x="400" y="0" width="80" height="70" style={{ fill: '#0F1F63' }} /><rect x="408" y="8" width="64" height="28" style={{ fill: 'url(#psGlass)', stroke: 'rgba(248,249,250,.5)' }} /><rect x="404" y="50" width="14" height="6" style={{ fill: '#F8F9FA', opacity: .9 }} /><rect x="462" y="50" width="14" height="6" style={{ fill: '#F8F9FA', opacity: .9 }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-70)"><rect x="490" y="400" width="70" height="80" style={{ fill: '#172F9D' }} /></g>
                </g>

                {/* flight cases */}
                <g style={s.crates}>
                  <g transform="matrix(.866,.5,0,1,-381,160)"><rect x="40" y="0" width="80" height="60" style={{ fill: '#1E232D', stroke: '#6B7280' }} /><path d="M40,10 L120,10 M40,50 L120,50" style={{ stroke: '#6B7280', strokeWidth: 1 }} /></g>
                  <g transform="matrix(-.866,.5,0,1,103.9,0)"><rect x="380" y="0" width="60" height="60" style={{ fill: '#171B23', stroke: '#6B7280' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-60)"><rect x="40" y="380" width="80" height="60" style={{ fill: '#2A303B', stroke: '#6B7280' }} /><rect x="70" y="400" width="20" height="20" style={{ fill: '#53B618' }} /></g>
                  <g transform="matrix(.866,.5,0,1,-389.7,175)"><rect x="140" y="0" width="60" height="50" style={{ fill: '#1E232D', stroke: '#6B7280' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,173.2,50)"><rect x="400" y="0" width="50" height="50" style={{ fill: '#171B23', stroke: '#6B7280' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-50)"><rect x="140" y="400" width="60" height="50" style={{ fill: '#2A303B', stroke: '#6B7280' }} /></g>
                </g>
                <g style={s.crates2}>
                  <g transform="matrix(.866,.5,0,1,-372.4,115)"><rect x="50" y="0" width="60" height="40" style={{ fill: '#1E232D', stroke: '#6B7280' }} /></g>
                  <g transform="matrix(-.866,.5,0,1,95.3,-45)"><rect x="390" y="0" width="40" height="40" style={{ fill: '#171B23', stroke: '#6B7280' }} /></g>
                  <g transform="matrix(.866,.5,-.866,.5,0,-100)"><rect x="50" y="390" width="60" height="40" style={{ fill: '#2A303B', stroke: '#6B7280' }} /></g>
                </g>

                {/* scope: material tags */}
                <g style={tag(0)}><circle cx="139" cy="-20" r="3.5" style={{ fill: '#53B618' }} /><path d="M139,-20 L170,-58" style={{ stroke: '#53B618', strokeWidth: 1 }} /><rect x="170" y="-84" width="132" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(255,255,255,.14)' }} /><text x="186" y="-67" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>3 × 2 m LED wall</text></g>
                <g style={tag(1)}><circle cx="-160" cy="20" r="3.5" style={{ fill: '#53B618' }} /><path d="M-160,20 L-200,-40" style={{ stroke: '#53B618', strokeWidth: 1 }} /><rect x="-330" y="-66" width="130" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(255,255,255,.14)' }} /><text x="-314" y="-49" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Laminated MDF wall</text></g>
                <g style={tag(2)}><circle cx="260" cy="-70" r="3.5" style={{ fill: '#53B618' }} /><path d="M260,-70 L290,-118" style={{ stroke: '#53B618', strokeWidth: 1 }} /><rect x="290" y="-144" width="128" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(255,255,255,.14)' }} /><text x="306" y="-127" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Acrylic lightbox fascia</text></g>
                <g style={tag(3)}><circle cx="117" cy="205" r="3.5" style={{ fill: '#53B618' }} /><path d="M117,205 L160,236" style={{ stroke: '#53B618', strokeWidth: 1 }} /><rect x="160" y="236" width="128" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(255,255,255,.14)' }} /><text x="176" y="253" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Glass reception desk</text></g>

                {/* logistics chips */}
                <g style={s.chips}>
                  <rect x="150" y="392" width="118" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(83,182,24,.5)' }} /><circle cx="166" cy="405" r="3.5" style={{ fill: '#53B618' }} /><text x="178" y="409" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Alignment check</text>
                  <rect x="-330" y="-128" width="102" height="26" rx="13" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(83,182,24,.5)' }} /><circle cx="-314" cy="-115" r="3.5" style={{ fill: '#53B618', animation: reduced ? 'none' : 'psPulse 1.2s ease-in-out infinite' }} /><text x="-302" y="-111" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Lighting test</text>
                </g>
                <g style={s.done}>
                  <rect x="-150" y="380" width="176" height="28" rx="14" style={{ fill: 'rgba(11,13,18,.92)', stroke: 'rgba(83,182,24,.6)' }} /><path d="M-134,394 L-129,399 L-120,389" style={{ fill: 'none', stroke: '#53B618', strokeWidth: 2 }} /><text x="-110" y="398" style={{ fill: '#F8F9FA', fontSize: '11px', fontWeight: 500 }}>Site cleared · venue handed back</text>
                </g>
              </g>
            </svg>

            {/* Stage 1 · brief cards */}
            <div style={card(d === 0, { left: '1%', top: '3%', width: '26%' }, 0)}><div style={CARD_SHELL}>
              <div style={CARD_LABEL}>Exhibition brief</div>
              <div style={{ display: 'grid', gap: '1.1cqw', marginTop: '1.6cqw' }}>
                <div style={ROW}><span style={{ color: '#8B93A5' }}>Booth</span><span>6 × 4 m</span></div>
                <div style={ROW}><span style={{ color: '#8B93A5' }}>Open sides</span><span>2</span></div>
                <div style={ROW}><span style={{ color: '#8B93A5' }}>Floor plan</span><span style={{ color: '#53B618' }}>Received</span></div>
              </div>
            </div></div>
            <div style={card(d === 0, { right: '1%', top: '6%', width: '25%' }, .12)}><div style={CARD_SHELL}>
              <div style={CARD_LABEL}>Brand guidelines</div>
              <div style={{ display: 'flex', gap: '1cqw', marginTop: '1.6cqw' }}>
                <span style={{ width: '4cqw', height: '4cqw', borderRadius: '.8cqw', background: '#172F9D' }} />
                <span style={{ width: '4cqw', height: '4cqw', borderRadius: '.8cqw', background: '#53B618' }} />
                <span style={{ width: '4cqw', height: '4cqw', borderRadius: '.8cqw', background: '#F8F9FA' }} />
                <span style={{ width: '4cqw', height: '4cqw', borderRadius: '.8cqw', background: '#2D2D2D', border: '1px solid rgba(255,255,255,.15)' }} />
              </div>
            </div></div>
            <div style={card(d === 0, { right: '1%', bottom: '10%', width: '26%' }, .24)}><div style={CARD_SHELL}>
              <div style={CARD_LABEL}>Design references</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1cqw', marginTop: '1.6cqw' }}>
                <span style={{ aspectRatio: '4/3', borderRadius: '.8cqw', background: 'linear-gradient(135deg,#0F1F63,#172F9D)' }} />
                <span style={{ aspectRatio: '4/3', borderRadius: '.8cqw', background: 'linear-gradient(135deg,#2D2D2D,#172F9D)' }} />
                <span style={{ aspectRatio: '4/3', borderRadius: '.8cqw', background: 'linear-gradient(135deg,#172F9D,#53B618)' }} />
              </div>
            </div></div>
            <div style={card(d === 0, { left: '1%', bottom: '6%', width: '27%' }, .36)}><div style={CARD_SHELL}>
              <div style={CARD_LABEL}>Budget &amp; timeline</div>
              <div style={{ height: '.6cqw', borderRadius: '.3cqw', background: 'rgba(255,255,255,.1)', marginTop: '1.6cqw', overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg,#172F9D,#53B618)' }} />
              </div>
            </div></div>

            {/* Stage 4 · scope cards */}
            <div style={card(d === 3, { left: '0%', top: '3%', width: '29%' }, 0)}><div style={CARD_SHELL}>
              <div style={CARD_LABEL}>Scope of work</div>
              <div style={{ display: 'grid', gap: '1.2cqw', marginTop: '1.6cqw' }}>
                {['Structure & flooring', 'Graphics & print', 'AV & lighting', 'Furniture & storage'].map((t, i) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw' }}><span style={tick(i)} />{t}</div>
                ))}
              </div>
            </div></div>
            <div style={card(d === 3, { right: '0%', top: '2%', width: '29%' }, .14)}><div style={CARD_SHELL}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={CARD_LABEL}>Estimate</span>
                <span style={{ fontSize: '1.3cqw', letterSpacing: '.1em', textTransform: 'uppercase', color: '#0B0D12', background: '#53B618', borderRadius: '2cqw', padding: '.4cqw 1.2cqw', fontWeight: 600 }}>Approved</span>
              </div>
              <div style={{ display: 'grid', gap: '1.2cqw', marginTop: '1.6cqw', color: '#8B93A5', fontSize: '1.6cqw' }}>
                {[['Fabrication', '72%', '#172F9D'], ['Graphics & AV', '48%', '#172F9D'], ['Logistics', '28%', '#53B618']].map(([label, w, c]) => (
                  <div key={label}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{label}</span></div>
                    <div style={{ height: '.7cqw', borderRadius: '.35cqw', background: 'rgba(255,255,255,.1)', marginTop: '.6cqw' }}>
                      <div style={{ width: w, height: '100%', borderRadius: '.35cqw', background: c }} />
                    </div></div>
                ))}
              </div>
            </div></div>
            <div style={card(d === 3, { right: '0%', bottom: '3%', width: '34%' }, .28)}><div style={{ ...CARD_SHELL, padding: '2cqw 2.4cqw', fontSize: '1.5cqw', color: '#8B93A5' }}>
              <div style={CARD_LABEL}>Project timeline</div>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 5fr 2fr 2fr', gap: '.5cqw', marginTop: '1.4cqw' }}>
                <div style={{ height: '.9cqw', borderRadius: '.45cqw', background: '#53B618' }} />
                <div style={{ height: '.9cqw', borderRadius: '.45cqw', background: '#172F9D' }} />
                <div style={{ height: '.9cqw', borderRadius: '.45cqw', background: 'rgba(255,255,255,.35)' }} />
                <div style={{ height: '.9cqw', borderRadius: '.45cqw', background: 'rgba(255,255,255,.15)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 5fr 2fr 2fr', gap: '.5cqw', marginTop: '.8cqw' }}>
                <span>Design</span><span>Production</span><span>Install</span><span>Show</span>
              </div>
            </div></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '18px', padding: '0 2px' }}>
            <span style={{ color: '#53B618', fontSize: '12px', fontWeight: 600, letterSpacing: '.14em' }}>{cur.step}</span>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: '14px', color: '#F8F9FA', whiteSpace: 'nowrap' }}>{cur.title}</span>
            <div style={{ flex: 1, display: 'flex', gap: '4px', minWidth: '80px' }}>
              {steps.map((st, i) => (
                <div key={st.step} style={{ flex: 1, height: '2px', borderRadius: '1px', background: i <= d ? '#53B618' : 'rgba(255,255,255,.12)', transition: 'background .5s' }} />
              ))}
            </div>
          </div>
        </div>

        <ol className="ps__list">
          {steps.map((st, i) => {
            const open = i <= active || i === d
            const isCur = i === d
            return (
              <li key={st.step} data-stage-item="1"
                  style={{ position: 'relative', background: isCur ? 'rgba(255,255,255,.025)' : 'transparent', transition: 'background .4s' }}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  onClick={() => { setActive(i); setHover(null) }}>
                <div style={{ position: 'absolute', left: '-44px', top: '38px', width: '30px', height: '1px', background: '#53B618', opacity: isCur ? 1 : 0, transform: isCur ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'right', transition: `opacity .4s, transform .5s ${E}` }} />
                <div className="ps__row">
                  <div style={{ width: '3px', borderRadius: '2px', background: '#53B618', opacity: isCur ? 1 : 0, transform: isCur ? 'scaleY(1)' : 'scaleY(.2)', transformOrigin: 'top', transition: `opacity .4s, transform .5s ${E}` }} />
                  <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.14em', paddingTop: '5px', color: open || isCur ? '#53B618' : 'rgba(83,182,24,.5)', transition: 'color .4s' }}>{st.step}</div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: '21px', lineHeight: 1.3, color: open || isCur ? '#F8F9FA' : '#5C6373', transition: 'color .4s' }}>{st.title}</h3>
                    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: reduced ? 'none' : `grid-template-rows .6s ${E}` }}>
                      <div style={{ overflow: 'hidden', minHeight: 0, opacity: open ? 1 : 0, transition: 'opacity .5s' }}>
                        <p style={{ margin: '10px 0 0', color: '#8B93A5', fontSize: '16px', lineHeight: 1.6, maxWidth: '60ch', textWrap: 'pretty' }}>{st.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
