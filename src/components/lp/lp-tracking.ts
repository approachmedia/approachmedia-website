/**
 * Conversion events for the landing pages. Spec §8.
 *
 * Each call does two things:
 *
 *  1. pushes a GTM-style object onto window.dataLayer. Container
 *     GTM-NN376CML reads these and fires the Google Ads conversion tags
 *     (AW-1060906256) for call_click, whatsapp_click and thank_you_view.
 *  2. forwards the same event to GA4.
 *
 * Step 2 exists because GA4 was deliberately taken out of GTM so it could
 * live in site code without double-counting pageviews. That move also cut
 * GA4 off from every event above: gtag.js does not read GTM's object
 * pushes, so without this forward GA4 would record pageviews and nothing
 * else. The GA4 install note calls for a dataLayer.push monkey-patch to
 * bridge them; that is unnecessary here because every event on the site
 * already goes through this one function, so the forward lives where the
 * events are rather than wrapping a global array.
 *
 * Both halves are safe before their script has loaded. dataLayer is a queue:
 * GTM and gtag.js each drain it on load.
 */

declare global {
  interface Window { dataLayer?: unknown[] }
}

export type LpPlacement = 'header' | 'hero' | 'sticky' | 'final' | 'thank-you'

/**
 * GA4 names for the events that are conversions. Anything not listed is
 * forwarded under its own name, which is useful for funnel steps
 * (lp_view, lead_form_start) and costs nothing.
 *
 * thank_you_view is the confirmed lead, so it becomes GA4's recommended
 * `generate_lead`. Mark generate_lead, call_click and whatsapp_click as key
 * events under GA4 Admin, Events.
 */
const GA4_NAME: Record<string, string> = {
  thank_you_view: 'generate_lead',
}

/**
 * gtag() is literally `dataLayer.push(arguments)`, so pushing the same shape
 * by hand is the same call. Written as a function declaration because it
 * needs a real `arguments` object: gtag.js reads the command queue by
 * position, and an array is not the same thing.
 */
function gtagCommand(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  ;(window.dataLayer = window.dataLayer || []).push(arguments)
}

/** GA4 caps a parameter value at 100 characters; longer ones are dropped. */
function trim(v: unknown): unknown {
  return typeof v === 'string' && v.length > 100 ? v.slice(0, 100) : v
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })

  const clean: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v !== '' && v != null) clean[k] = trim(v)
  }
  gtagCommand('event', GA4_NAME[event] ?? event, clean)
}
