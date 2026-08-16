'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StaggerReveal, STAGGER_WORD_CLASS, type StaggerSplit } from '@/components/motion/StaggerReveal'
import { HeroFilings } from './HeroFilings'

// The headline, split at the point the brand gradient starts. Kept as
// constants rather than inline JSX because the word index below is derived
// from the lead — see restoreAccent.
const HEADLINE_LEAD = 'Exhibition Stall Design & Fabrication —'
const HEADLINE_ACCENT = 'Spaces That Make Your Brand Impossible to Ignore.'

/** Index of the first gradient word once the heading is split on spaces. */
const ACCENT_FROM_WORD = HEADLINE_LEAD.split(' ').length

const isAccent = (word: HTMLElement) => Number(word.dataset.index) >= ACCENT_FROM_WORD

/**
 * splitText flattens the heading to plain text, which destroys the
 * .text-gradient-brand span the accent half was wrapped in. This puts the
 * gradient back, on the line spans instead.
 *
 * The awkward part is that it has to be put back *continuous*. The accent is
 * one inline span running 135deg from brand-blue-glow to brand-green, and an
 * inline box broken over several lines defaults to box-decoration-break:
 * slice — the browser sizes the gradient to the unbroken box the span would
 * have occupied, then slices that image across the line fragments. So the
 * live heading sweeps once across the whole phrase: blue at "Spaces",
 * green by "Ignore.".
 *
 * Applying the class to each line instead restarts the sweep on every line,
 * which is visibly wrong — "Ignore." comes out blue and "Spaces" green,
 * the two ends swapped. The slice is therefore reproduced by hand: measure
 * the box the accent words span, size every line's gradient to that box, and
 * offset each line's copy by its own position within it.
 *
 * Words before the accent get an explicit colour, since background-clip: text
 * clips to every glyph in the line and would otherwise tint the lead half too.
 */
function restoreAccent({ lines }: StaggerSplit) {
  // One fragment per line the accent touches — the run from its first accent
  // word to its last. Measured before the reveal animation starts, so no
  // transform is in play yet.
  const fragments = []
  for (const line of lines) {
    const words = Array.from(line.querySelectorAll<HTMLElement>(`.${STAGGER_WORD_CLASS}`))
    const accent = words.filter(isAccent)
    if (accent.length === 0) continue

    const first = accent[0].getBoundingClientRect()
    const last = accent[accent.length - 1].getBoundingClientRect()
    fragments.push({ line, words, left: first.left, top: first.top, width: last.right - first.left, height: first.height })
  }

  if (fragments.length === 0) return

  // The unbroken box: the fragments laid end to end on a single line, which
  // is the box `slice` sizes the gradient to. Not the union of the fragments
  // — that box is short and wide where this one is long and thin, and the
  // 135deg sweep lands somewhere quite different on the two.
  const unbrokenWidth = fragments.reduce((sum, fragment) => sum + fragment.width, 0)
  const unbrokenHeight = Math.max(...fragments.map(fragment => fragment.height))

  let consumed = 0
  for (const { line, words, left, top, width } of fragments) {
    line.classList.add('text-gradient-brand')

    // Inline styles, applied after the class: .text-gradient-brand sets the
    // `background` shorthand, which would reset all three.
    const box = line.getBoundingClientRect()
    line.style.backgroundSize = `${unbrokenWidth}px ${unbrokenHeight}px`
    line.style.backgroundPosition = `${left - box.left - consumed}px ${top - box.top}px`
    line.style.backgroundRepeat = 'no-repeat'

    for (const word of words) {
      if (!isAccent(word)) word.style.color = 'hsl(var(--foreground))'
    }

    consumed += width
  }
}

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

export function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % taglines.length), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" style={{ background: 'var(--gradient-hero)' }}>
      {/* Hero visual — video-ready container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/home/hero-stall.jpg"
          alt="Premium custom exhibition stall built by Approach Media"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--brand-blue-glow)/0.15),transparent_55%)]" />
      </div>

      {/* Not inside the -z-10 layer above. That layer sits behind the
          section's own --gradient-hero, whose last stop is an opaque
          hsl(222 30% 4%), so anything in it is painted over — the filings
          were invisible there, and elementFromPoint in the hero returns the
          section rather than its own background layer. This sits above the
          section background and below the copy, which is given relative
          z-10 for the purpose. */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroFilings />
        {/* The copy is left-aligned in a narrow column, so the field is
            dimmed on that side and left at full strength on the right where
            there is nothing to read. A flat wash over the whole hero would
            have cost the effect everywhere to fix it in one place. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <StaggerReveal className="container-wide relative z-10" onSplit={restoreAccent}>
        {/* Rotating eyebrow. Deliberately not a stagger item: it re-runs its
            own fade every 4.2s as the tagline rotates, and it reads better
            arriving before the headline than queued behind it. */}
        <div className="flex items-center gap-2 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-glow" />
          <p key={idx} className="animate-fade-up text-xs uppercase tracking-[0.22em] text-muted-foreground md:text-sm">
            {taglines[idx]}
          </p>
        </div>

        {/* Rendered with the gradient span intact, so the served HTML is
            unchanged and a crawler or a JS-less visitor sees exactly what was
            there before. The split replaces it on the client; restoreAccent
            puts the gradient back. */}
        <h1
          data-stagger-headline
          className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {HEADLINE_LEAD}{' '}
          <span className="text-gradient-brand">{HEADLINE_ACCENT}</span>
        </h1>

        <p data-stagger-item className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Your exhibition stall is more than a display. It is a space where your brand is
          experienced, understood, and remembered. We design and build exhibition spaces that
          attract the right audience, guide walk-in interactions, and turn attention into
          lasting impact.
        </p>

        <div data-stagger-item className="mt-9 flex flex-col gap-3 sm:flex-row">
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

        {/* Metrics */}
        <div data-stagger-item className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-4">
          {metrics.map(m => (
            <div key={m.l} className="bg-surface/80 px-5 py-6 backdrop-blur md:px-7 md:py-8">
              <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">{m.v}</div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">{m.l}</div>
            </div>
          ))}
        </div>
      </StaggerReveal>
    </section>
  )
}
