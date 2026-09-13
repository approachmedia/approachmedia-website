'use client'

/**
 * Call and WhatsApp, always within reach on the main site.
 *
 * The landing pages have had a sticky Call/WhatsApp bar since they launched;
 * the rest of the site had no WhatsApp path at all, not even a link. That made
 * the landing-page-versus-website test unreadable rather than merely
 * unflattering: one arm offered three ways to convert and the other offered a
 * form.
 *
 * Mobile gets the same two-button bar as the landing pages. Desktop gets a
 * single floating WhatsApp button, because a full-width bar across a 1440px
 * viewport reads as an ad.
 *
 * These are plain anchors on purpose. The site-wide listener in
 * SiteClickTracking picks them up and pushes whatsapp_click / call_click with
 * the page path, so there is no tracking code here to drift out of step with
 * it. They deliberately do NOT carry data-tracked: that marker exists to stop
 * the landing pages double-counting, and these have no push of their own.
 *
 * Mounted from SiteChrome rather than the root layout, which is what already
 * knows to step aside for /admin and for /lp/* and /thank-you — the landing
 * pages carry LpStickyBar, and two bars would fight for the same corner.
 */

import { useEffect, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { SITE_TEL_HREF, SITE_WA_HREF } from './contact-links'

export default function SiteContactBar() {
  const [hidden, setHidden] = useState(false)

  // Hidden while a form is on screen, so the bar never sits on top of a submit
  // button. /contact and the expo pages are the cases that matter; the landing
  // pages solve the same problem the same way.
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('form'))
    if (forms.length === 0) return
    const io = new IntersectionObserver(
      entries => setHidden(entries.some(e => e.isIntersecting)),
      { threshold: 0.15 },
    )
    forms.forEach(f => io.observe(f))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Mobile: the two-button bar. */}
      <div
        data-site-cta="bar"
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[hsl(222,30%,6%)]/95 backdrop-blur-md transition-transform duration-300 md:hidden ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden={hidden}
      >
        <div className="grid grid-cols-2 gap-2 p-2.5">
          <a
            href={SITE_TEL_HREF}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            Call now
          </a>
          <a
            href={SITE_WA_HREF}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-accent-foreground"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Desktop: one floating WhatsApp button. */}
      <a
        data-site-cta="float"
        href={SITE_WA_HREF}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp us"
        className={`fixed bottom-6 right-6 z-40 hidden h-14 items-center justify-center gap-2.5 rounded-full bg-brand-green px-5 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/30 transition hover:bg-brand-green-glow md:inline-flex ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
        WhatsApp us
      </a>
    </>
  )
}
