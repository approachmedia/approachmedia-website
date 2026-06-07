import { unstable_cache } from 'next/cache'
import { prisma } from './prisma'

const FALLBACK_CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev'

/**
 * Returns the CDN base URL from the app_config table.
 * Falls back to the MEDIA_CDN_BASE_URL env var, then the hardcoded default.
 * Result is cached for 1 hour — changes to the DB row take effect within an hour
 * without a redeployment.
 */
export const getCdnBaseUrl = unstable_cache(
  async (): Promise<string> => {
    try {
      const row = await prisma.appConfig.findUnique({ where: { key: 'media_cdn_base_url' } })
      const raw = row?.value ?? process.env.MEDIA_CDN_BASE_URL ?? FALLBACK_CDN
      return raw.replace(/\/$/, '') // strip trailing slash
    } catch {
      return (process.env.MEDIA_CDN_BASE_URL ?? FALLBACK_CDN).replace(/\/$/, '')
    }
  },
  ['media_cdn_base_url'],
  { revalidate: 3600 },
)

/**
 * Prepend CDN base URL to a relative media path.
 * Full URLs (http/https) pass through unchanged, so existing full-URL records
 * are safe. Each path segment is URL-encoded so folder names with spaces or
 * special characters (e.g. "SSSA BUSINESS EXPO 2022", "MET & HITS") produce
 * valid URLs.
 *
 * Examples:
 *   buildMediaUrl('2022/SSSA BUSINESS EXPO 2022/img.webp', 'https://cdn.r2.dev')
 *     → 'https://cdn.r2.dev/2022/SSSA%20BUSINESS%20EXPO%202022/img.webp'
 *   buildMediaUrl('https://other-cdn.com/img.webp', '...')
 *     → 'https://other-cdn.com/img.webp'  (unchanged)
 */
export function buildMediaUrl(path: string | null | undefined, cdnBase: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  // Normalize: decode each segment first (handles already-encoded paths from "Fix Now"),
  // then re-encode — this is idempotent whether the path has raw spaces or %20.
  const encoded = path.replace(/^\//, '').split('/').map(seg => {
    try { return encodeURIComponent(decodeURIComponent(seg)) } catch { return encodeURIComponent(seg) }
  }).join('/')
  return `${cdnBase}/${encoded}`
}
