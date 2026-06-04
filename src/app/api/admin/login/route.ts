import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'otplib'

function correctPassword(pw: string) {
  return process.env.ADMIN_SECRET && pw === process.env.ADMIN_SECRET
}

function verifyTotp(token: string) {
  const secret = process.env.ADMIN_TOTP_SECRET
  if (!secret) return false
  try {
    return verify({ token, secret })
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { password, totp } = body as { password?: string; totp?: string }

  if (!correctPassword(password ?? '')) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  // Password OK but no TOTP yet — tell the client to show step 2
  if (!totp) {
    return NextResponse.json({ step: 'totp' }, { status: 200 })
  }

  // Both password + TOTP must be correct to get the session cookie
  if (!verifyTotp(totp)) {
    return NextResponse.json({ error: 'Invalid authenticator code' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_auth', 'authenticated', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 8, // 8 hours
    path:     '/',
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('admin_auth')
  return response
}
