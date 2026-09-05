import Script from 'next/script'

/**
 * Google Tag Manager, site-wide, gated on NEXT_PUBLIC_GTM_ID.
 *
 * Renders nothing when the variable is unset, so the site ships exactly as
 * before until the container ID is added on Railway. The privacy policy reads
 * the same variable and discloses the container only when it is live.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

export function GtmHead() {
  if (!GTM_ID) return null
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}

export function GtmNoScript() {
  if (!GTM_ID) return null
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
