import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-url'

/**
 * robots.txt
 *
 * A single group governs every crawler, AI bots included.
 *
 * There were previously five extra groups (GPTBot, PerplexityBot,
 * Google-Extended, anthropic-ai, CCBot) carrying only `Allow` rules. Those
 * were worse than redundant. A crawler obeys the most specific group that
 * matches it and ignores every other, so each of those bots matched its own
 * group and never saw the `*` group's Disallow lines — leaving /admin and
 * /api/ open to exactly the five crawlers the rules looked like they were
 * constraining. The Allow lists also granted nothing, since anything not
 * disallowed is already allowed, while omitting /exhibition-stall-designer-*,
 * /tradeshow-calendar and /expos, which read as a deliberate exclusion of the
 * pages we most want cited.
 *
 * Deleting them lets `*` govern: AI crawlers get the whole public site and
 * the same two exclusions as everyone else.
 *
 * The sitemap URL is derived from SITE_URL so it always matches the host the
 * sitemap's own <loc> entries use — a mismatch there is a common reason a
 * sitemap is fetched but its URLs are treated as cross-host and ignored.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Both forms: the bare path and the trailing-slash prefix, so
        // subpaths are covered whichever way a crawler interprets it.
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
