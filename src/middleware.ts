import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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

export const config = { matcher: '/admin/:path*' }
