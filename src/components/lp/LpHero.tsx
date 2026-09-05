import Image from 'next/image'
import { Star } from 'lucide-react'
import type { LandingPageConfig } from '@/content/lp/types'
import { LP_HERO_IMAGE } from '@/content/lp/types'
import type { GoogleRating } from '@/lib/google-rating'
import LpHeadline from './LpHeadline'
import LpLeadForm from './LpLeadForm'

/**
 * Above the fold. Two columns on desktop; on a phone the form sits directly
 * under the headline. Spec §2.2.
 *
 * The background is one real build from the portfolio under a gradient
 * scrim, loaded with priority so it is the LCP element. No video.
 */
export default function LpHero({
  cfg, initialShow, initialCity, rating,
}: {
  cfg: LandingPageConfig; initialShow: string; initialCity: string; rating: GoogleRating | null
}) {
  const chips = Array.isArray(cfg.proofChips) ? cfg.proofChips : []
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={LP_HERO_IMAGE.src}
          alt={LP_HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrim where the type sits, heavier at the left where the copy is. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,30%,6%)]/95 via-[hsl(222,30%,6%)]/80 to-[hsl(222,30%,6%)]/55" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(222,30%,6%)] to-transparent" />
      </div>

      <div className="container-wide relative grid gap-10 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(340px,440px)] md:items-center md:py-20 lg:gap-16">
        <div>
          <LpHeadline eyebrow={cfg.eyebrow} h1={cfg.h1} h1WithShow={cfg.h1WithShow} initialShow={initialShow} initialCity={initialCity} />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{cfg.subhead}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {rating && (
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
                {rating.rating.toFixed(1)} · {rating.count} Google reviews
              </li>
            )}
            {chips.map(c => 'text' in c && (
              <li key={c.text} className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white">
                {c.text}
              </li>
            ))}
          </ul>
        </div>

        <LpLeadForm service={cfg.service} title={cfg.form.title} sub={cfg.form.sub} button={cfg.form.button} consent={cfg.form.consent} />
      </div>
    </section>
  )
}
