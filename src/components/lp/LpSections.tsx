import Link from 'next/link'
import Image from 'next/image'
import type { LandingPageConfig } from '@/content/lp/types'
import { LP_PHONE_DISPLAY } from '@/content/lp/types'
import { ORG_EMAIL } from '@/lib/seo/organization'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'
import { TrackedLink } from './LpTrackedLink'

/** getPublishedProjects includes the exhibition; the card type predates that. */
export type LpProject = ProjectCardData & { exhibition?: { name: string; city: string | null } | null }

/* ── Trust bar (§2.3) ──────────────────────────────────────────
   The site holds no client logo files, only names, so the row is set as
   monochrome name chips at 60% opacity: the same treatment the homepage
   ticker uses. Nothing is placeholder. */
export function LpTrustBar({ clients, caption }: LandingPageConfig['trustBar']) {
  return (
    <section className="border-y border-white/10 bg-[hsl(222,28%,7%)]">
      <div className="container-wide py-6 md:py-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
          {clients.map(c => (
            <li key={c} className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60 md:text-base">{c}</li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-muted-foreground md:text-sm">{caption}</p>
      </div>
    </section>
  )
}

/* ── Offer / why us (§2.4) ── */
export function LpOffer({ cards }: { cards: LandingPageConfig['offer'] }) {
  return (
    <section className="container-wide py-14 md:py-20">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {cards.map((c, i) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-[hsl(222,28%,8%)] p-4 md:p-6">
            <p className="mb-2 font-display text-xs font-bold text-brand-green">0{i + 1}</p>
            <h3 className="font-display text-base font-bold leading-snug text-white md:text-lg">{c.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Process (§2.5) ── */
export function LpProcess({ steps }: { steps: string[] }) {
  return (
    <section className="border-y border-white/10 bg-[hsl(222,28%,7%)]">
      <div className="container-wide py-12 md:py-16">
        <ol className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3 md:flex-col md:gap-2">
              <span className="font-display text-2xl font-black leading-none text-brand-green md:text-3xl">{i + 1}</span>
              <span className="text-sm font-medium leading-snug text-slate-200">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── Portfolio strip (§2.6) ── */
export function LpPortfolioStrip({ projects, cta }: { projects: LpProject[]; cta: string }) {
  if (!projects.length) return null
  return (
    <section className="container-wide py-14 md:py-20">
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {projects.map(p => {
          const hero = p.media[0]
          const show = p.exhibition?.name
          const city = p.exhibition?.city ?? p.city
          const meta = [p.client?.name, show, city, p.buildYear].filter(Boolean).join(' · ')
          return (
            <div key={p.id} className="w-[78vw] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-[hsl(222,28%,8%)] sm:w-[60vw] md:w-auto">
              <div className="relative aspect-[4/3]">
                {hero ? (
                  <Image src={hero.cdnUrl ?? hero.url} alt={hero.altText} fill loading="lazy" sizes="(max-width: 768px) 78vw, 33vw" className="object-cover" />
                ) : null}
              </div>
              <div className="p-3.5">
                <p className="truncate text-xs text-slate-400">{meta}</p>
                {p.stallAreaSqm && <p className="mt-1 text-sm font-semibold text-white">{Number(p.stallAreaSqm)} sqm</p>}
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-5 text-center">
        <TrackedLink href="/portfolio" event="portfolio_click" className="text-sm font-semibold text-brand-green hover:text-brand-green-glow">{cta}</TrackedLink>
      </p>
    </section>
  )
}

/* ── Testimonials (§2.7) ── */
export function LpTestimonials({ hidden, items }: LandingPageConfig['testimonials']) {
  if (hidden || !items.length) return null
  return (
    <section className="border-y border-white/10 bg-[hsl(222,28%,7%)]">
      <div className="container-wide grid gap-5 py-14 md:grid-cols-2 md:gap-8 md:py-20">
        {items.map(t => (
          <figure key={t.name} className="rounded-2xl border border-white/10 bg-[hsl(222,30%,6%)] p-6 md:p-8">
            <blockquote className="text-sm leading-relaxed text-slate-200 md:text-base">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-xs text-muted-foreground">
              <span className="font-semibold text-white">{t.name}</span>{t.role ? `, ${t.role}` : ''} · {t.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ── Pricing guide (§2.8) ── */
export function LpPricing({ rows, note, linkLabel, linkHref }: LandingPageConfig['pricing']) {
  return (
    <section className="container-wide py-14 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Pricing guide</h2>
        <table className="mt-6 w-full overflow-hidden rounded-xl border border-white/10 text-sm">
          <thead className="bg-[hsl(222,28%,8%)] text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr><th className="px-4 py-3 font-semibold">Stall size</th><th className="px-4 py-3 font-semibold">Typical range</th></tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map(r => (
              <tr key={r.size}><td className="px-4 py-3 text-slate-200">{r.size}</td><td className="px-4 py-3 font-semibold text-white">{r.range}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground md:text-sm">{note}</p>
        <p className="mt-3">
          <TrackedLink href={linkHref} event="cost_guide_click" className="text-sm font-semibold text-brand-green hover:text-brand-green-glow">{linkLabel}</TrackedLink>
        </p>
      </div>
    </section>
  )
}

/* ── Footer (§2.11) ── */
export function LpFooter() {
  return (
    <footer className="border-t border-white/10 pb-24 md:pb-8">
      <div className="container-wide py-8 text-center text-xs leading-relaxed text-muted-foreground">
        <p>Approach Media Pvt. Ltd. · 302 Chase House, Off C.G. Road, Ahmedabad 380009 · <a href={`mailto:${ORG_EMAIL}`} className="hover:text-foreground">{ORG_EMAIL}</a> · {LP_PHONE_DISPLAY}</p>
        <p className="mt-2"><Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link> · © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
