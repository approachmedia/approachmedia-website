'use client'

import { useEffect, useRef } from 'react'
import { WaLink } from '@/components/lp/LpLinks'
import { TrackedLink } from '@/components/lp/LpTrackedLink'
import { track } from '@/components/lp/lp-tracking'

/**
 * The buttons, plus the one-shot conversion event.
 *
 * `src` is what the landing-page-versus-home-page test is read on: the
 * landing forms send src=lp, the main site's contact form sends src=website.
 * It rides on the event rather than being read back off page_location, so the
 * split is a plain GA4 dimension instead of a URL to parse.
 */
export default function ThankYouBody({ service, show, size, src, form }: { service: string; show: string; size: string; src: string; form: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track('thank_you_view', { service, src, form })
  }, [service, src, form])

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <WaLink placement="thank-you" show={show} size={size} className="h-12 rounded-lg bg-brand-green px-7 text-base font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
        WhatsApp us now
      </WaLink>
      <TrackedLink href="/portfolio" event="portfolio_click" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-base font-semibold text-white transition hover:bg-white/10">
        See our recent stalls
      </TrackedLink>
    </div>
  )
}
