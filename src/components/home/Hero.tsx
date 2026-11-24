'use client'

/**
 * The home page opening, rebuilt as a cinematic stage.
 *
 *  - A finished build plays full-bleed behind the headline.
 *  - The headline rises word by word through masks on load (once): the
 *    lead first, then the accent in the brand gradient.
 *  - The pointer separates the layers: the lead, the accent and the clip
 *    each lean a different distance, so the headline floats over the build.
 *  - Scrolling pulls the clip back into a rounded frame and lifts the copy
 *    away, handing over to the figures below, which count up into view.
 *
 * Every word is the hero's existing copy and is in the served HTML.
 * Reduced motion: everything in place, the clip held on its poster.
 */

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CountUp from './motion/CountUp'
import './motion/home-motion.css'

const HEADLINE_LEAD = 'Exhibition Stall Design & Fabrication —'
const HEADLINE_ACCENT = 'Spaces That Make Your Brand Impossible to Ignore.'

const taglines = [
  'In an ocean of lookalikes, those who stand apart will survive.',
  'Custom Exhibition and Trade Show Booth Builders & Designers.',
  'Innovative Designs. Engaging Experiences. Lasting Impact.',
]

const metrics = [
  { v: '23+', l: 'Years of Experience' },
  { v: '6000+', l: 'Stalls Executed' },
  { v: '9+', l: 'Industries Served' },
  { v: '14+', l: 'Countries Delivered In' },
]

const CLIP = 'custom-exhibition-stand-design-india-01'

function Words({ text, start, className }: { text: string; start: number; className?: string }) {
  return (
    <>
      {/* A lone dash never starts a line: it is bound to the word before it. */}
      {text.split(' ').reduce<string[]>((a, w) => (w === '—' && a.length ? [...a.slice(0, -1), `${a[a.length - 1]}\u00a0—`] : [...a, w]), []).map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="hx-mask">
            <span className={`hx-word ${className ?? ''}`} style={{ animationDelay: `${0.25 + (start + i) * 0.06}s` }}>{w}</span>
          </span>
        </Fragment>
      ))}
    </>
  )
}

export function Hero() {
  const [idx, setIdx] = useState(0)
  const track = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const lead = useRef<HTMLSpanElement>(null)
  const accent = useRef<HTMLSpanElement>(null)
  const veil = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % taglines.length), 4200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const tr = track.current, m = media.current, c = copy.current
    if (!tr || !m || !c) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      m.querySelector('video')?.pause()
      return
    }
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    // The stage sits under the sticky header, so its height is the screen
    // less the header; the CSS holds a default until this measures it.
    let head = 0
    const measure = () => { head = document.querySelector('header')?.offsetHeight ?? 0; tr.style.setProperty('--hx-head', `${head}px`) }
    measure()
    const frame = () => {
      raf = 0
      const r = tr.getBoundingClientRect()
      const travel = r.height - (window.innerHeight - head)
      const p = travel > 0 ? Math.min(1, Math.max(0, (head - r.top) / travel)) : 0
      ptr.x += (ptr.tx - ptr.x) * 0.08
      ptr.y += (ptr.ty - ptr.y) * 0.08
      // The veil lifts with the copy so the build shows in its frame.
      const ix = p * 4, top = p * 24, bottom = p * window.innerHeight * 0.06, rad = p * 36
      m.style.clipPath = `inset(${top.toFixed(1)}px ${ix.toFixed(2)}vw ${bottom.toFixed(1)}px ${ix.toFixed(2)}vw round ${rad.toFixed(1)}px)`
      if (veil.current) veil.current.style.opacity = (1 - p * 0.55).toFixed(3)
      m.style.transform = `translate3d(${(ptr.x * 18).toFixed(1)}px, ${(ptr.y * 12).toFixed(1)}px, 0) scale(${(1.08 - p * 0.06).toFixed(4)})`
      c.style.transform = `translate3d(0, ${(-p * 140).toFixed(1)}px, 0)`
      c.style.opacity = String(Math.max(0, 1 - p * 1.3))
      if (lead.current) lead.current.style.transform = `translate3d(${(ptr.x * -10).toFixed(1)}px, ${(ptr.y * -6).toFixed(1)}px, 0)`
      if (accent.current) accent.current.style.transform = `translate3d(${(ptr.x * 16).toFixed(1)}px, ${(ptr.y * 10).toFixed(1)}px, 0)`
      if (Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 0.002) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      ptr.tx = e.clientX / window.innerWidth - 0.5
      ptr.ty = e.clientY / window.innerHeight - 0.5
      kick()
    }
    frame()
    window.addEventListener('scroll', kick, { passive: true })
    const onResize = () => { measure(); kick() }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  const leadCount = HEADLINE_LEAD.split(' ').filter(w => w !== '—').length

  return (
    <>
      <section ref={track} className="hx" data-no-reveal>
        <div className="hx-stage">
          <div ref={media} className="hx-media" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata" poster={`/services-flow/${CLIP}-poster.webp`}>
              <source src={`/services-flow/${CLIP}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
              <source src={`/services-flow/${CLIP}.webm`} type="video/webm" />
              <source src={`/services-flow/${CLIP}.mp4`} type="video/mp4" />
            </video>
            <div ref={veil} className="hx-veil" />
            <div className="hx-grain" />
          </div>

          <div ref={copy} className="hx-copy container-wide">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-glow" />
              <p key={idx} className="animate-fade-up text-xs uppercase tracking-[0.22em] text-white/85 md:text-sm">
                {taglines[idx]}
              </p>
            </div>

            <h1 className="hx-h1">
              <span ref={lead} className="hx-layer"><Words text={HEADLINE_LEAD} start={0} /></span>{' '}
              <span ref={accent} className="hx-layer"><Words text={HEADLINE_ACCENT} start={leadCount} className="hx-accent" /></span>
            </h1>

            <p className="hx-lede">
              Your exhibition stall is more than a display. It is a space where your brand is
              experienced, understood, and remembered. We design and build exhibition spaces that
              attract the right audience, guide walk-in interactions, and turn attention into
              lasting impact.
            </p>

            <div className="hx-ctas mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">
                  Book a Consultation <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/portfolio">
                  <Play className="h-4 w-4" /> View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The figures, counting up as they arrive. */}
      <section className="hx-metrics container-wide" aria-label="Approach Media in numbers">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/10 sm:grid-cols-4">
          {metrics.map(m => (
            <div key={m.l} className="hx-metric am-spot bg-surface/85 px-5 py-7 backdrop-blur md:px-8 md:py-10">
              <div className="font-display text-4xl font-semibold text-foreground md:text-6xl"><CountUp value={m.v} /></div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">{m.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
