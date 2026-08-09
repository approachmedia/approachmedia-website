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

  // Only safe methods. Several HTTP clients silently downgrade POST to GET
  // when following a 301, which would turn a form or webhook submission on
  // the wrong host into a no-op rather than a redirect.
  if (request.method === 'GET' || request.method === 'HEAD') {
    const hostname = (request.headers.get('host') ?? '').toLowerCase().split(':')[0]
    if (shouldRedirectHost(hostname)) {
      return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 301)
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
