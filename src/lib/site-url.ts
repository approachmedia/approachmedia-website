/**
 * Canonical origin for the site, e.g. "https://approachmedia.in".
 *
 * NEXT_PUBLIC_SITE_URL is set per environment and has been supplied as a
 * bare hostname before, which produced schemeless <loc> entries in the
 * sitemap and schemeless canonical tags across the site. So the value is
 * normalised here rather than trusted: a scheme is added when missing and
 * any trailing slash is dropped.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so changing the variable
 * requires a rebuild — a restart alone will not pick it up.
 */
function normalise(value: string | undefined) {
  const trimmed = value?.trim()
  if (!trimmed) return 'https://approachmedia.in'
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return withScheme.replace(/\/+$/, '')
}

export const SITE_URL = normalise(process.env.NEXT_PUBLIC_SITE_URL)
