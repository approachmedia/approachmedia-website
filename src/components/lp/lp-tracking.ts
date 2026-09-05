/**
 * dataLayer events for the landing pages. Spec §8.
 *
 * These push to window.dataLayer whether or not GTM is installed: the array
 * is created if absent, so the calls are inert until a container reads them.
 * GTM itself is loaded by components/site/Gtm.tsx, gated on
 * NEXT_PUBLIC_GTM_ID, and the conversion tags live inside the container.
 */

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export type LpPlacement = 'header' | 'hero' | 'sticky' | 'final' | 'thank-you'

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
