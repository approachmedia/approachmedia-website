'use client'

/**
 * Photo set pieces: a band of real project photographs that moves with the
 * scroll and answers the pointer. Four shapes, so neighbouring pages do not
 * repeat each other:
 *
 *   strip    two rows of photographs sliding in opposite directions as the
 *            page scrolls
 *   columns  a window onto four columns drifting up and down at different
 *            speeds
 *   fan      a deck of photographs that fans open as it enters the screen
 *   lit      a dark wall of photographs; a light follows the pointer and
 *            shows them in colour (on touch screens it sweeps with the scroll)
 *   flow     a cover flow: the centre photograph faces the visitor and the
 *            rest lean away either side; drag, swipe, arrow keys or a click
 *            move through it, and a click on the centre opens the project
 *
 * `variant="auto"` picks one from the page's path, so a template used by many
 * pages (cities, countries, expos) still varies page to page.
 *
 * The photographs are the hero images of published portfolio projects, from
 * /api/showcase, rotated by the page's path so each page shows a different
 * run. Every tile links to its project. The band keeps its height while the
 * photographs load, and removes itself if none can be loaded. Reduced motion
 * shows each shape at rest.
 */

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import './showcase.css'

// Only pages that show the cover flow download it.
const CoverFlow = dynamic(() => import('@/components/ui/cover-flow').then(m => m.CoverFlow), { ssr: false })

type Item = { src: string; srcLg: string; alt: string; title: string; href: string }
export type ShowcaseVariant = 'strip' | 'columns' | 'fan' | 'lit' | 'flow'

const ORDER: ShowcaseVariant[] = ['strip', 'flow', 'columns', 'fan', 'lit']
const NEED: Record<ShowcaseVariant, number> = { strip: 16, columns: 20, fan: 7, lit: 18, flow: 12 }

let cache: Promise<Item[]> | null = null
function load(): Promise<Item[]> {
  cache ??= fetch('/api/showcase')
    .then(r => (r.ok ? r.json() : { items: [] }))
    .then(d => (Array.isArray(d.items) ? (d.items as Item[]) : []))
    .catch(() => { cache = null; return [] })
  return cache
}

function hash(s: string) {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0
  return h
}

function Tile({ item, big, className = '', style }: { item: Item | undefined; big?: boolean; className?: string; style?: CSSProperties }) {
  if (!item) return <div className={`sw-tile sw-tile--empty ${className}`} style={style} aria-hidden="true" />
  return (
    <Link href={item.href} className={`sw-tile ${className}`} style={style} aria-label={item.title}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={big ? item.srcLg : item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        onError={e => { (e.currentTarget.closest('.sw-tile') as HTMLElement | null)?.classList.add('sw-tile--empty') }}
      />
      <span className="sw-cap"><span>{item.title}</span><ArrowUpRight aria-hidden="true" /></span>
    </Link>
  )
}

export default function Showcase({
  variant = 'auto',
  eyebrow = 'From the portfolio',
  linkLabel = 'View all projects',
  ground = 'plain',
}: {
  variant?: ShowcaseVariant | 'auto'
  eyebrow?: string
  linkLabel?: string
  /** `plain` sits on the page ground; `band` draws its own, with hairlines. */
  ground?: 'plain' | 'band'
}) {
  const pathname = usePathname()
  const router = useRouter()
  const seed = hash(pathname)
  const kind: ShowcaseVariant = variant === 'auto' ? ORDER[seed % ORDER.length] : variant
  const root = useRef<HTMLElement>(null)
  const [items, setItems] = useState<Item[] | null>(null)

  useEffect(() => {
    let live = true
    load().then(list => { if (live) setItems(list) })
    return () => { live = false }
  }, [])

  // A different run of photographs on each page.
  const picks = useMemo(() => {
    const n = NEED[kind]
    if (!items || items.length === 0) return Array.from({ length: n }, () => undefined as Item | undefined)
    const start = seed % items.length
    return Array.from({ length: n }, (_, i) => items[(start + i * (kind === 'fan' ? 3 : 1)) % items.length])
  }, [items, kind, seed])

  // Scroll progress (0 as the band's top meets the bottom of the screen, 1 as
  // its bottom leaves the top) and the pointer, written to CSS variables.
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '0.5'); el.style.setProperty('--e', '1'); return }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let raf = 0
    let on = false
    let hovering = false
    const m = { x: 50, y: 50, tx: 50, ty: 50 }
    const apply = () => {
      raf = 0
      if (!on) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      el.style.setProperty('--p', p.toFixed(4))
      // the fan is fully open by the time the band is centred
      const e = Math.min(1, Math.max(0, (p - 0.12) / 0.34))
      el.style.setProperty('--e', (1 - Math.pow(1 - e, 3)).toFixed(4))
      if (kind === 'lit') {
        if (!hovering) { m.tx = 50 + Math.sin(p * 7) * 34; m.ty = 22 + p * 56 }
        m.x += (m.tx - m.x) * 0.14
        m.y += (m.ty - m.y) * 0.14
        el.style.setProperty('--mx', `${m.x.toFixed(2)}%`)
        el.style.setProperty('--my', `${m.y.toFixed(2)}%`)
        if (Math.abs(m.tx - m.x) > 0.05 || Math.abs(m.ty - m.y) > 0.05) raf = requestAnimationFrame(apply)
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const io = new IntersectionObserver(es => { on = es.some(x => x.isIntersecting); if (on) kick() }, { rootMargin: '10% 0px' })
    io.observe(el)
    const wall = el.querySelector<HTMLElement>('.sw-lit')
    const onMove = (ev: PointerEvent) => {
      if (!wall || ev.pointerType !== 'mouse') return
      const r = wall.getBoundingClientRect()
      hovering = true
      m.tx = ((ev.clientX - r.left) / r.width) * 100
      m.ty = ((ev.clientY - r.top) / r.height) * 100
      kick()
    }
    const onLeave = () => { hovering = false; kick() }
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    if (fine && wall) { wall.addEventListener('pointermove', onMove); wall.addEventListener('pointerleave', onLeave) }
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      wall?.removeEventListener('pointermove', onMove)
      wall?.removeEventListener('pointerleave', onLeave)
    }
  }, [kind, items])

  // Nothing to show (the database could not be reached): take no space.
  if (items && items.length === 0) return null

  return (
    <section ref={root} className={`sw sw--${kind} sw--${ground}`} data-no-reveal aria-label="Projects from the portfolio">
      <div className="container-wide sw-head">
        <p className="sw-eyebrow">{eyebrow}</p>
        <Link href="/portfolio" className="sw-more">{linkLabel} <ArrowUpRight aria-hidden="true" /></Link>
      </div>

      {kind === 'strip' && (
        <div className="sw-strip">
          <div className="sw-row sw-row--a">{picks.slice(0, 8).map((it, i) => <Tile key={i} item={it} />)}</div>
          <div className="sw-row sw-row--b">{picks.slice(8, 16).map((it, i) => <Tile key={i} item={it} />)}</div>
        </div>
      )}

      {kind === 'columns' && (
        <div className="container-wide">
          <div className="sw-cols">
            {[0, 1, 2, 3].map(c => (
              <div key={c} className={`sw-col sw-col--${c}`}>
                {picks.slice(c * 5, c * 5 + 5).map((it, i) => <Tile key={i} item={it} />)}
              </div>
            ))}
          </div>
        </div>
      )}

      {kind === 'fan' && (
        <div className="sw-fan">
          {picks.map((it, i) => (
            <div key={i} className="sw-card" style={{ '--i': i - 3, '--a': (i - 3) * (i - 3), zIndex: 10 - Math.abs(i - 3) } as CSSProperties}>
              <Tile item={it} big />
            </div>
          ))}
        </div>
      )}

      {kind === 'flow' && (
        <div className="sw-flow">
          {items && (
            <CoverFlow
              items={picks.filter((it): it is Item => !!it).map(it => {
                // "Client: 18 sqm stall at Show 2026" reads as two caption
                // lines; titles without a colon split before "Exhibition".
                const m = it.title.match(/^(.+?)(?::\s*|\s+(?=Exhibition\b))(.+)$/)
                return {
                  title: m ? m[1] : it.title,
                  subtitle: m ? m[2] : undefined,
                  src: it.srcLg,
                  alt: it.alt,
                }
              })}
              defaultIndex={3}
              autoplay
              interval={4}
              wheel={false}
              showReflection
              stageColor="#05080f"
              pageColor="transparent"
              accent="#53B618"
              font="Inter, system-ui, sans-serif"
              ariaLabel="Projects from the portfolio"
              onSelect={i => { const it = picks[i]; if (it) router.push(it.href) }}
              style={{ aspectRatio: 'auto' }}
            />
          )}
        </div>
      )}

      {kind === 'lit' && (
        <div className="container-wide">
          <div className="sw-lit">
            <div className="sw-wall sw-wall--dim">{picks.map((it, i) => <Tile key={i} item={it} />)}</div>
            <div className="sw-wall sw-wall--lit" aria-hidden="true">
              {picks.map((it, i) => (
                <div key={i} className="sw-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {it && <img src={it.src} alt="" loading="lazy" decoding="async" />}
                </div>
              ))}
            </div>
            <span className="sw-beam" aria-hidden="true" />
          </div>
        </div>
      )}
    </section>
  )
}
