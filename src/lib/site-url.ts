/**
 * Canonical origin for the site, e.g. "https://www.approachmedia.in".
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
/**
 * Must be the host the site actually serves on. It is not decoration: a Docker
 * build that does not receive NEXT_PUBLIC_SITE_URL falls back to this, and
 * every statically prerendered page bakes it as their canonical. Pointing it
 * at a host that redirects away is how eleven pages ended up declaring a
 * canonical that immediately 301s.
 */
const FALLBACK_ORIGIN = 'https://www.approachmedia.in'

function normalise(value: string | undefined) {
  const trimmed = value?.trim()
  if (!trimmed) return FALLBACK_ORIGIN
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return withScheme.replace(/\/+$/, '')
}

export const SITE_URL = normalise(process.env.NEXT_PUBLIC_SITE_URL)
