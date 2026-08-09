import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Two jobs: consolidate every request onto the canonical host, then guard
 * /admin.
 *
 * Host consolidation happens here rather than at the edge because there is no
 * CDN in front of this domain — both hostnames resolve straight to Railway
 * (responses carry `server: railway-hikari`, no `cf-ray`), and DNS sits at the
 * registrar. The Cloudflare account is used for R2 storage only, so a
 * Cloudflare Redirect Rule was never an option.
 *
 * CANONICAL_HOST must stay in step with NEXT_PUBLIC_SITE_URL. If they ever
 * disagree, every page will 301 to a host whose canonical tag points back at
 * the other one, which is a redirect loop as far as a crawler is concerned.
 */
const CANONICAL_ORIGIN = 'https://www.approachmedia.in'
const CANONICAL_HOST = 'www.approachmedia.in'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // Strip any port so localhost:3000 and previews are never redirected.
  const hostname = host.split(':')[0].toLowerCase()

  const isWrongHost =
    hostname.endsWith('.railway.app') || hostname === 'approachmedia.in'

  // Only redirect safe methods. Several HTTP clients silently downgrade a
  // POST to GET when following a 301, which would turn a form or webhook
  // submission on the wrong host into a broken no-op rather than a redirect.
  const isSafeMethod = request.method === 'GET' || request.method === 'HEAD'

  if (isWrongHost && isSafeMethod && hostname !== CANONICAL_HOST) {
    return NextResponse.redirect(new URL(pathname + search, CANONICAL_ORIGIN), 301)
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
 * Matches everything except Next's build output. The matcher previously
 * covered only /admin/:path*, which would have limited the host redirect to
 * admin routes — robots.txt, the sitemap and every public page would have
 * gone on serving from the wrong hostname.
 *
 * robots.txt and sitemap.xml are deliberately NOT excluded: those are exactly
 * the URLs a crawler fetches, so they need the 301 more than anything else.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
