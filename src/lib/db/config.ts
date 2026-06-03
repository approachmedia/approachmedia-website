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
 * are safe.
 *
 * Examples:
 *   buildMediaUrl('2025/fitag/img.webp', 'https://cdn.r2.dev')
 *     → 'https://cdn.r2.dev/2025/fitag/img.webp'
 *   buildMediaUrl('https://other-cdn.com/img.webp', '...')
 *     → 'https://other-cdn.com/img.webp'  (unchanged)
 */
export function buildMediaUrl(path: string | null | undefined, cdnBase: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${cdnBase}/${path.replace(/^\//, '')}`
}
