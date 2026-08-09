/**
 * Timestamp of the current build, stable for every request a deploy serves.
 *
 * The sitemap previously stamped `new Date()` on all 646 URLs, which meant
 * every crawl saw the entire site as having changed seconds earlier. Google
 * detects unreliable lastmod and stops trusting it site-wide, which costs the
 * one signal that gets genuinely new pages crawled quickly.
 *
 * BUILD_TIME comes from next.config, where it is inlined at build time. The
 * fallback only matters if that inlining ever stops happening: it is a fixed
 * past date rather than `new Date()`, because a wrong-but-stable value is
 * harmless while a fresh-every-request value is the bug being fixed.
 */
const FALLBACK = '2026-01-01T00:00:00.000Z'

function parse(value: string | undefined) {
  if (!value) return new Date(FALLBACK)
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? new Date(FALLBACK) : d
}

export const BUILD_TIME = parse(process.env.BUILD_TIME)
