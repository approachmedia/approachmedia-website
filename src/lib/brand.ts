/**
 * Single source of truth for the logo URL.
 *
 * The file lives in R2 and is served over the bucket's public `r2.dev` host,
 * which sits behind Cloudflare's edge cache. Overwriting the object in R2 does
 * NOT invalidate that cache — the edge keeps serving the previous bytes until
 * the TTL expires, and every browser that already fetched it keeps its own
 * copy on top of that. So a re-upload under the same key can appear to do
 * nothing for hours.
 *
 * LOGO_VERSION is the fix: Cloudflare's default cache key includes the query
 * string, so bumping it produces a fresh cache entry that has to be fetched
 * from the bucket. Bump it whenever the logo file is replaced in place.
 *
 * (Note the filename's "Appraoch" typo — that is the real key in the bucket.)
 */

const LOGO_PATH =
  'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/logo_favicon/Appraoch%20Media%20Logo.svg'

/** Bump on every in-place replacement of the logo file in R2. */
const LOGO_VERSION = '2'

export const LOGO_URL = `${LOGO_PATH}?v=${LOGO_VERSION}`
