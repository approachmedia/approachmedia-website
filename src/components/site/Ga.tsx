import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * GA4, loaded in site code rather than through GTM.
 *
 * The GA4 tag was deliberately removed from container GTM-NN376CML
 * (Version 4) so measurement can live here without double-counting. Do NOT
 * re-add a GA4 tag in GTM while this component ships: two sources means
 * double pageviews and inflated sessions.
 *
 * The package's component is used rather than a hand-rolled gtag snippet
 * because it re-sends page_view on client-side route changes. A raw snippet
 * fires once on first load and silently misses every <Link> navigation,
 * which on an App Router site is most of them.
 *
 * It shares window.dataLayer with GTM, which is fine: GTM ignores gtag's
 * command entries and gtag.js ignores GTM's object pushes.
 */
export const GA_ID = 'G-J52GL419KN'

export function Ga() {
  // Not in development. The property is new and otherwise every `npm run dev`
  // session would land in it as real traffic from a real location. Remove
  // this guard if you ever need to verify the tag from a local build.
  if (process.env.NODE_ENV !== 'production') return null
  return <GoogleAnalytics gaId={GA_ID} />
}
