import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Two jobs: consolidate every request onto the canonical host, then guard
 * /admin.
 *
 * Host consolidation happens here rather than at the edge because there is no
 * CDN in front of this domain — both hostnames resolve straight to Railway
 * (responses carry `server: railway-hikari`, no `cf-ray`), and DNS sits at the
 * registrar. The Cloudflare account is used for R2 storage only.
 *
 * ── Why the first attempt at this rolled back ──────────────────────────────
 * railway.toml sets a healthcheck, and it was pointed at `/`. Railway probes
 * the deployment using the *.railway.app host, which is one of the hosts this
 * middleware redirects. While the matcher was `/admin/:path*` the probe never
 * reached middleware; widening it to the whole site meant `/` answered 301,
 * the probe never saw a 2xx, and Railway rolled the deploy back after eight
 * attempts. The build succeeded every time, so nothing looked wrong locally.
 *
 * Two guards now prevent that:
 *   1. HEALTH_PATH is exempted here before any host logic runs.
 *   2. railway.toml points healthcheckPath at HEALTH_PATH.
 * Either alone would be enough; both together mean a future change to one
 * cannot silently reintroduce the rollback.
 *
 * CANONICAL_HOST must stay in step with NEXT_PUBLIC_SITE_URL. If they ever
 * disagree, pages 301 to one host while their canonical tag names the other,
 * which reads to a crawler as a loop.
 */
const CANONICAL_HOST = 'www.approachmedia.in'
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`

/** Exempt from every host rule — Railway's probe must always get a 2xx. */
const HEALTH_PATH = '/api/health'

/**
 * URLs from the old WordPress site that Google still ranks but which now 404.
 * A 404 throws away whatever authority the URL had earned; a 301 hands it to
 * the closest live equivalent.
 *
 * Targets are chosen for topical match, not convenience. Google treats a
 * redirect to an unrelated page — the homepage being the usual offender — as a
 * soft 404 and passes little or none of the ranking signal, so pointing an
 * "exhibition stall designing company Ahmedabad" URL at the Ahmedabad page
 * preserves far more than pointing it at "/".
 *
 * Handled here rather than in next.config's redirects() so the whole thing
 * resolves in one hop: the indexed URLs are on the non-www host, and a config
 * redirect would fire only after middleware had already 301'd the host,
 * making a two-hop chain out of every one of them.
 *
 * Keys must be lowercase and have no trailing slash — lookup normalises both.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Ranking on "exhibition stall design agency"; the source page carried the
  // "designinging" typo, so both spellings are mapped.
  '/exhibition-stall-designinging-company': '/exhibition-stand-builders-in-ahmedabad',
  '/exhibition-stall-designing-company':    '/exhibition-stand-builders-in-ahmedabad',
  '/exhibition-stall-design-company':       '/exhibition-stand-builders-in-ahmedabad',
}

/**
 * Old WordPress trees that move wholesale. The events calendar carried the
 * Events Calendar plugin's query strings (`?tribe-bar-date=…`), which have no
 * equivalent here, so the query is dropped rather than carried to a page that
 * would ignore it.
 *
 * Case studies and individual event pages are NOT here: choosing a sensible
 * target for those needs the portfolio and expo data, so they are resolved by
 * route handlers under /casestudy and /upcoming_events__exhibitions.
 */
const LEGACY_PREFIXES: { prefix: string; target: string }[] = [
  { prefix: '/exhibitions/list', target: '/expos' },
  { prefix: '/exhibitions',      target: '/expos' },
]

function legacyTarget(pathname: string) {
  const key = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  if (LEGACY_REDIRECTS[key]) return LEGACY_REDIRECTS[key]
  const prefixed = LEGACY_PREFIXES.find(p => key === p.prefix || key.startsWith(`${p.prefix}/`))
  return prefixed?.target
}

/**
 * Only these hosts are redirected. Anything unrecognised — an internal probe,
 * a bare IP or IPv6 literal, localhost, a preview domain — passes through
 * untouched, so an unfamiliar host can never cost us a deploy again.
 */
function shouldRedirectHost(hostname: string) {
  if (hostname === CANONICAL_HOST) return false
  return hostname === 'approachmedia.in' || hostname.endsWith('.railway.app')
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Before anything else, whatever the host.
  if (pathname === HEALTH_PATH) return NextResponse.next()

  // Stale sitemap index still referenced in Search Console; 404 today.
  if (pathname === '/sitemap_index.xml') {
    return NextResponse.redirect(`${CANONICAL_ORIGIN}/sitemap.xml`, 301)
  }

  // Every indexed WordPress URL ends in a slash. next.config sets
  // skipTrailingSlashRedirect so that Next's own 308 does not fire first —
  // it ran before middleware and kept whatever host it was asked on, which
  // made an indexed non-www URL cost three hops: 308 to strip the slash, 301
  // to add www, then the legacy redirect. Handling the slash here folds the
  // first two into one.
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname

  // Old WordPress URLs Google still ranks. Straight to the canonical origin so
  // an indexed non-www URL resolves in one hop rather than two.
  const legacy = legacyTarget(trimmed)
  if (legacy) {
    return NextResponse.redirect(`${CANONICAL_ORIGIN}${legacy}`, 301)
  }

  // Only safe methods. Several HTTP clients silently downgrade POST to GET
  // when following a 301, which would turn a form or webhook submission on
  // the wrong host into a no-op rather than a redirect.
  if (request.method === 'GET' || request.method === 'HEAD') {
    const hostname = (request.headers.get('host') ?? '').toLowerCase().split(':')[0]
    const wrongHost = shouldRedirectHost(hostname)
    if (wrongHost || trimmed !== pathname) {
      // One 301 carrying both corrections. On the canonical host a bare
      // trailing slash still has to be removed, or /portfolio/ and /portfolio
      // serve the same page at two URLs.
      const origin = wrongHost || trimmed !== pathname ? CANONICAL_ORIGIN : ''
      return NextResponse.redirect(`${origin}${trimmed}${search}`, 301)
    }
  }

  // ── /admin guard ──────────────────────────────────────────
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login')     return NextResponse.next()
  // Allow without session so first-time 2FA setup is possible before login works
  if (pathname === '/admin/setup-2fa') return NextResponse.next()

  const auth = request.cookies.get('admin_auth')
  if (auth?.value !== 'authenticated') {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

/**
 * Everything except Next's build output. The /admin guard needs the wide
 * matcher, so narrowing it back is not an option — the health exemption above
 * is what makes the wide matcher safe.
 *
 * robots.txt and sitemap.xml are deliberately not excluded: those are exactly
 * the URLs a crawler fetches on the wrong host, so they need the 301 most.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
