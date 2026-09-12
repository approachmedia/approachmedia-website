'use client'

/**
 * Site-wide WhatsApp and phone click tracking.
 *
 * One capture-phase listener on the document, mounted once in the root
 * layout, so any wa.me or tel: link anywhere on the site reports a
 * conversion. Before this, only the two Google Ads landing pages pushed
 * these events, which meant an enquiry from the main site was invisible to
 * Google Ads and the landing-page-versus-home-page test could not be read
 * fairly.
 *
 * Anchors carrying data-tracked are skipped: the landing pages push their
 * own events with a `placement` field (header / hero / sticky / final) that
 * this listener cannot know, and double-counting a conversion is worse than
 * losing the placement. Marking them is the brief's option (b), chosen over
 * (a) precisely because those pushes carry that extra field.
 *
 * Events go through track() rather than straight to dataLayer so they reach
 * GA4 as well as GTM, the same as every other event on the site.
 */

import { useEffect } from 'react'
import { track } from '@/components/lp/lp-tracking'

const WHATSAPP = /wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:\/\//i
const TEL = /^tel:/i

export default function SiteClickTracking() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const a = el?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.dataset.tracked) return

      const href = a.getAttribute('href') || ''
      const common = { link_url: href, page_path: window.location.pathname }

      if (WHATSAPP.test(href)) track('whatsapp_click', { ...common, placement: 'site' })
      else if (TEL.test(href)) track('call_click', { ...common, placement: 'site' })
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  return null
}
