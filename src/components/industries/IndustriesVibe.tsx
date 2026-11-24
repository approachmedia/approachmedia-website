'use client'

/**
 * The /industries hub, rebuilt as a motion-led page.
 *
 * Every word of copy is the hub's existing copy, unchanged, and every image
 * is one the site already publishes: the sixteen industry photographs on R2
 * (the same set the home page's orbit wheel uses) and the hero photographs of
 * real published projects, drawn from the database by the server page. No
 * stock, nothing generated.
 *
 * Sections, top to bottom:
 *
 *   Hero      the h1 assembles word by word over three columns of industry
 *             photographs drifting past at different speeds, under a glow
 *             that follows the pointer.
 *   Ticker    the sixteen industry names running in two opposing bands.
 *             Decorative (aria-hidden); the grid below carries the links.
 *   Grid      a bento grid of sixteen image cards. Each tilts toward the
 *             pointer under a spotlight, and on hover cycles through that
 *             sector's real project photographs. On touch screens the
 *             tagline is always shown, since there is no hover to reveal it.
 *   Process   the paragraph lights up word by word as it scrolls through the
 *             viewport, over a filmstrip of project photographs.
 *   Close     the CTA panel inside a slowly rotating gradient border.
 *
 * All copy is in the served HTML. Reduced motion stops every loop and drift
 * and shows the reveals in their finished state.
 */

import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useHydratedReducedMotion } from '@/components/motion/useHydratedReducedMotion'

export type IndustryShot = { src: string; alt: string }
export type IndustryCard = {
  name: string
  slug: string
  tagline: string
  cover: IndustryShot | null
  shots: IndustryShot[]
}

const EASE = [0.22, 1, 0.36, 1] as const

// ── Hero ─────────────────────────────────────────────────────

const H1 = 'Exhibition Stall Design for Your Industry'
/** Words of the h1 painted in the accent gradient. */
const H1_ACCENT = new Set(['Your', 'Industry'])

function DriftColumn({ shots, speed, reverse }: { shots: IndustryShot[]; speed: number; reverse?: boolean }) {
  // Two copies back to back, translated by exactly one copy's height, loop
  // without a seam.
  const loop = [...shots, ...shots]
  return (
    <div className="iv-drift-col" style={{ '--dur': `${speed}s`, '--dir': reverse ? 'reverse' : 'normal' } as CSSProperties}>
      <div className="iv-drift-track">
        {loop.map((s, i) => (
          <div key={i} className="iv-drift-tile">
            <Image src={s.src} alt="" fill sizes="(min-width: 768px) 22vw, 45vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero({ covers }: { covers: IndustryShot[] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // The glow trails the pointer. Written straight to CSS variables, so a
  // pointer move never re-renders React.
  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const third = Math.ceil(covers.length / 3)
  const cols = [covers.slice(0, third), covers.slice(third, third * 2), covers.slice(third * 2)]
    .map(c => (c.length > 0 ? c : covers))

  return (
    <section ref={ref} onPointerMove={onMove} className="iv-hero">
      <div className="iv-drift" aria-hidden="true">
        <DriftColumn shots={cols[0]} speed={46} />
        <DriftColumn shots={cols[1]} speed={58} reverse />
        <DriftColumn shots={cols[2]} speed={50} />
      </div>
      <div className="iv-hero-veil" aria-hidden="true" />
      <div className="iv-glow" aria-hidden="true" />
      <div className="iv-grain" aria-hidden="true" />

      <div className="container-wide relative z-10 py-24 md:py-32">
        <motion.p
          className="iv-pill"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="iv-pill-dot" aria-hidden="true" />
          Industries
        </motion.p>

        <h1 className="iv-h1">
          {/* The space sits between the masks, not inside one: trailing
              whitespace inside an inline-block collapses, which ran the
              words together. */}
          {H1.split(' ').map((w, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="iv-word-mask">
                <motion.span
                  className={H1_ACCENT.has(w) ? 'iv-word iv-accent' : 'iv-word'}
                  initial={reduce ? false : { y: '110%', rotate: 4 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
        >
          <p className="iv-lede">Spaces shaped around what you sell and who you want to meet.</p>
          <p className="iv-body mt-5">
            A property buyer, an engineer and a retail distributor arrive at an exhibition with
            different questions. Your stall should help answer them. Approach Media designs and
            builds exhibition spaces around your products, audience and business objectives.
          </p>
          <p className="iv-body mt-4">
            Explore your industry to see relevant work, understand the display possibilities and
            start planning your next exhibition.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#find-your-industry" className="iv-btn iv-btn-primary">
              <span>Explore Industries</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="iv-btn iv-btn-glass">
              Request a Proposal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Ticker ───────────────────────────────────────────────────

function Ticker({ names }: { names: string[] }) {
  const row = (outline: boolean) => (
    <div className={outline ? 'iv-tick-row iv-tick-reverse' : 'iv-tick-row'}>
      {[0, 1].map(copy => (
        <div key={copy} className="iv-tick-set">
          {names.map(n => (
            <span key={n} className={outline ? 'iv-tick-item iv-tick-outline' : 'iv-tick-item'}>
              {n}
              <span className="iv-tick-star">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
  return (
    <div className="iv-ticker" aria-hidden="true">
      {row(false)}
      {row(true)}
    </div>
  )
}

// ── Grid ─────────────────────────────────────────────────────

/** Bento placement on the 4-column grid: 4 + 2 + 4 + 2 + 12 singles = 24 cells, six full rows. */
const SPAN: Record<number, string> = {
  0: 'iv-span-big',
  5: 'iv-span-wide',
  9: 'iv-span-big',
  14: 'iv-span-wide',
}

function initials(name: string) {
  return name.split(/[\s,&]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('')
}

function Card({ card, index }: { card: IndustryCard; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const [hover, setHover] = useState(false)
  const [frame, setFrame] = useState(0)

  const frames = [card.cover, ...card.shots]
    .filter((s): s is IndustryShot => !!s)
    .filter((s, i, all) => all.findIndex(o => o.src === s.src) === i)
    .slice(0, 4)

  // On hover, step through the sector's real project photographs.
  useEffect(() => {
    if (!hover || reduce || frames.length < 2) return
    const t = window.setInterval(() => setFrame(f => (f + 1) % frames.length), 1100)
    return () => window.clearInterval(t)
  }, [hover, reduce, frames.length])

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    if (!reduce) {
      el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
      el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
    }
  }
  function onLeave() {
    setHover(false)
    setFrame(0)
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.li
      className={`iv-cell ${SPAN[index] ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: EASE }}
    >
      <Link
        ref={ref}
        href={`/industries/${card.slug}`}
        className="iv-card group"
        onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true) }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="iv-card-media">
          {frames.length > 0 ? (
            frames.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={i === 0 ? s.alt : ''}
                aria-hidden={i === 0 ? undefined : true}
                fill
                sizes={SPAN[index] ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'}
                className={`iv-card-img ${i === frame ? 'is-on' : ''}`}
              />
            ))
          ) : (
            <div className="iv-card-mesh" aria-hidden="true">
              <span>{initials(card.name)}</span>
            </div>
          )}
        </div>
        <div className="iv-card-shade" aria-hidden="true" />
        <div className="iv-card-spot" aria-hidden="true" />

        <span className="iv-card-chip" aria-hidden="true">
          <ArrowUpRight className="h-4 w-4" />
        </span>

        {frames.length > 1 && (
          <span className="iv-card-dots" aria-hidden="true">
            {frames.map((_, i) => <i key={i} className={i === frame ? 'is-on' : ''} />)}
          </span>
        )}

        <div className="iv-card-copy">
          <h3 className="iv-card-name">{card.name}</h3>
          <div className="iv-card-more">
            <div>
              <p className="iv-card-tag">{card.tagline}</p>
              <span className="iv-card-cta">
                Explore {card.name}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

function Grid({ cards }: { cards: IndustryCard[] }) {
  const reduce = useReducedMotion()
  return (
    <section id="find-your-industry" className="iv-grid-sec scroll-mt-28">
      <div className="container-wide py-20 md:py-28">
        <motion.h2
          className="iv-h2"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Find Your Industry
        </motion.h2>
        <ul className="iv-bento">
          {cards.map((c, i) => <Card key={c.slug} card={c} index={i} />)}
        </ul>
      </div>
    </section>
  )
}

// ── Process ──────────────────────────────────────────────────

const PROCESS =
  'We bring concept design, fabrication and on-site execution into one coordinated process. Your products, stall dimensions and exhibition requirements guide the layout, while your brand shapes the look and feel.'

function LitWord({ word, progress, range, still }: { word: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.16, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

function Process({ strip }: { strip: IndustryShot[] }) {
  const reduce = useHydratedReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] })
  const words = PROCESS.split(' ')
  const loop = [...strip, ...strip]

  return (
    <section className="iv-process">
      <div className="container-wide py-20 md:py-28">
        <h2 className="iv-h2 max-w-3xl">From Industry Brief to Exhibition Space</h2>
        <p ref={ref} className="iv-lit">
          {/* Same markup on server and client; reduced motion holds every
              word at full strength (plain text here broke hydration). */}
          {words.map((w, i) => (
            <LitWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce} />
          ))}
        </p>
      </div>
      {strip.length > 0 && (
        <div className="iv-film" aria-hidden="true">
          <div className="iv-film-track">
            {loop.map((s, i) => (
              <div key={i} className="iv-film-frame">
                <Image src={s.src} alt="" fill sizes="(min-width: 768px) 26vw, 70vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Close ────────────────────────────────────────────────────

function Close() {
  const reduce = useReducedMotion()
  return (
    <section className="iv-close-sec">
      <div className="container-wide py-20 md:py-28">
        <motion.div
          className="iv-close"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="iv-close-inner">
            <h2 className="iv-h2">Planning an Exhibition?</h2>
            <p className="iv-body mx-auto mt-5">
              Tell us where you are exhibiting and what you want visitors to experience. We will help
              turn your brief into a practical exhibition-space plan.
            </p>
            <Link href="/contact" className="iv-btn iv-btn-primary mt-9">
              <span>Discuss Your Exhibition</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────

export function IndustriesVibe({ cards, strip }: { cards: IndustryCard[]; strip: IndustryShot[] }) {
  const covers = cards.map(c => c.cover).filter((s): s is IndustryShot => !!s)
  return (
    <div className="iv">
      <Hero covers={covers} />
      <Ticker names={cards.map(c => c.name)} />
      <Grid cards={cards} />
      <Process strip={strip.length > 0 ? strip : covers} />
      <Close />
    </div>
  )
}
