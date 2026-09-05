'use client'

import type { LandingPageConfig } from '@/content/lp/types'
import { ToFormButton, WaLink } from './LpLinks'

/** Final CTA band (§2.10). */
export default function LpFinalCta({ h2, body, primary, whatsapp }: LandingPageConfig['finalCta']) {
  return (
    <section className="border-t border-white/10 bg-[image:var(--gradient-footer)]">
      <div className="container-wide py-16 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-2xl font-black leading-tight text-white md:text-4xl">{h2}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 md:text-lg">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ToFormButton className="inline-flex h-12 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] px-7 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5">
            {primary}
          </ToFormButton>
          <WaLink placement="final" className="h-12 rounded-lg bg-brand-green px-7 text-base font-semibold text-accent-foreground transition hover:bg-brand-green-glow hover:-translate-y-0.5">
            {whatsapp}
          </WaLink>
        </div>
      </div>
    </section>
  )
}
