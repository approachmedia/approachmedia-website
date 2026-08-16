'use client'

/**
 * Interactive image accordion for the home "What we do" section.
 * Six vertical image strips — the hovered/active strip expands, the rest
 * collapse to slim bars with a vertical title. Every strip links to its
 * service page. Styled with the site design system (font-display, dark
 * surface, brand-green accents) — adapted from the client-supplied
 * reference component.
 *
 * Images live in the R2 bucket folder `images/services/`:
 *   exhibition-stall-design.jpg, custom-booth-fabrication.jpg,
 *   turnkey-project-management.jpg, av-technology-integration.jpg,
 *   double-decker-mezzanine-stands.jpg, immersive-brand-experience.jpg
 */

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

type ServiceItem = {
  slug:  string   // /services/<slug> — must match the existing service pages
  title: string
  image: string
}

const ITEMS: ServiceItem[] = [
  { slug: 'exhibition-stall-design',        title: 'Exhibition Stall Design',          image: 'exhibition-stall-design.jpg' },
  { slug: 'custom-booth-fabrication',       title: 'Custom Booth Fabrication',         image: 'custom-booth-fabrication.jpg' },
  { slug: 'turnkey-project-management',     title: 'Turnkey Project Management',       image: 'turnkey-project-management.jpg' },
  { slug: 'av-technology-integration',      title: 'Audio-Visual & Tech Integration',  image: 'av-technology-integration.jpg' },
  { slug: 'double-decker-mezzanine-stands', title: 'Double Decker / Mezzanine Stands', image: 'double-decker-mezzanine-stands.jpg' },
  { slug: 'immersive-brand-experience',     title: 'Immersive Brand Experiences',      image: 'immersive-brand-experience.jpg' },
]

export function ServicesImageAccordion() {
  const [active, setActive] = useState(0)

  return (
    <>
      {/* ── Phones: a plain grid ──────────────────────────────
          The accordion expands on hover, and touch has no hover — so on a
          phone the five inactive services stayed collapsed with no way to
          open them. Six strips sharing a 375px screen left each one about
          27px wide: a sliver of sideways text, and the open one truncated to
          "Exhib…". Tapping worked, but nothing told you what you were
          tapping.

          A grid answers that directly: every service shows its own photo and
          its full name, so the destination is obvious before the tap. Both
          sets of images are lazy, and the hidden set is display:none, so a
          phone does not pay to download the desktop strips. */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:hidden">
        {ITEMS.map(item => (
          <Link key={item.slug} href={`/services/${item.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${CDN}/${item.image}`}
                alt={`${item.title} — Approach Media`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <span className="mt-2.5 flex items-start gap-1.5 font-display text-sm font-semibold leading-snug text-foreground">
              <span>{item.title}</span>
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green-glow" />
            </span>
          </Link>
        ))}
      </div>

      {/* ── md and up: the hover accordion, unchanged ───────── */}
      <div className="hidden w-full items-stretch gap-2 md:flex md:gap-4">
      {ITEMS.map((item, i) => {
        const isActive = i === active
        return (
          <Link
            key={item.slug}
            href={`/services/${item.slug}`}
            aria-label={item.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group relative h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-surface transition-[flex-grow] duration-700 ease-in-out md:h-[460px] ${
              isActive ? 'flex-[7] md:flex-[6]' : 'flex-[1]'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${CDN}/${item.image}`}
              alt={`${item.title} — Approach Media`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* dark gradient so titles stay readable */}
            <div className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-85'}`} />

            {/* Active label — horizontal, bottom-left */}
            <span
              className={`absolute bottom-5 left-5 right-5 flex items-center gap-2 font-display text-base font-semibold text-foreground transition-all duration-300 md:bottom-6 md:left-6 md:text-2xl ${
                isActive ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-3 opacity-0'
              }`}
            >
              <span className="truncate">{item.title}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-green-glow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-5 md:w-5" />
            </span>

            {/* Collapsed label — vertical, reads bottom-to-top */}
            <span
              className={`absolute bottom-5 left-1/2 max-h-[85%] -translate-x-1/2 overflow-hidden whitespace-nowrap font-display text-xs font-semibold text-foreground/90 [writing-mode:vertical-rl] rotate-180 transition-opacity duration-300 md:bottom-6 md:text-sm ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {item.title}
            </span>
          </Link>
        )
      })}
      </div>
    </>
  )
}
