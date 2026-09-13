import Script from 'next/script'

/**
 * Google Tag Manager, site-wide.
 *
 * ── Why the container ID is in code, not only in the environment ───────────
 *
 * It used to be `process.env.NEXT_PUBLIC_GTM_ID || ''`, with the component
 * rendering null when that was empty. NEXT_PUBLIC_* is inlined at BUILD time,
 * and a Docker build does not inherit the Railway service environment unless
 * the variable is declared as a build arg — which this one was not. So the
 * statically prerendered pages (/contact, /services/*, /about and the rest)
 * baked an empty ID, returned null, and shipped with no GTM at all, while the
 * dynamic pages (/, /portfolio, /lp/*, /thank-you) read the real value at
 * request time and had it. Nobody noticed because navigating from the home
 * page keeps the already-loaded container alive; only a direct hit or a
 * refresh on a static route was untagged, and /services/double-decker-
 * mezzanine-stands is a live ad destination.
 *
 * The same trap cost this site its canonicals once before, which is why the
 * Dockerfile carries an ARG for NEXT_PUBLIC_SITE_URL. NEXT_PUBLIC_GTM_ID now
 * has one too, but the ID is also defaulted here: a container ID is public by
 * definition (it ships in the HTML of every page), it cannot be a secret, and
 * defaulting it means no build-environment mistake can silently untag the
 * site again. GA4 in Ga.tsx already works this way.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NN376CML'

/**
 * Skipped outside production, so `npm run dev` does not fire Google Ads
 * conversions from a developer's machine. Same guard as Ga.tsx. Before the ID
 * was defaulted the unset variable did this by accident; now it is deliberate.
 */
const enabled = () => Boolean(GTM_ID) && process.env.NODE_ENV === 'production'

export function GtmHead() {
  if (!enabled()) return null
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}

export function GtmNoScript() {
  if (!enabled()) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
