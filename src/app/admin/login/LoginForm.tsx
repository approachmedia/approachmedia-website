'use client'
import { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Step = 'password' | 'totp'

export default function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const from         = searchParams.get('from') ?? '/admin'

  const [step, setStep]         = useState<Step>('password')
  const [password, setPassword] = useState('')
  const [totp, setTotp]         = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const totpRef                 = useRef<HTMLInputElement>(null)

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res  = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) {
      const data = await res.json()
      if (data.step === 'totp') {
        setStep('totp')
        setTimeout(() => totpRef.current?.focus(), 50)
      } else {
        router.push(from); router.refresh()
      }
    } else {
      setError('Incorrect password')
    }
  }

  async function handleTotp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password, totp }),
    })
    setLoading(false)
    if (res.ok) {
      router.push(from); router.refresh()
    } else {
      setError('Invalid code — check Google Authenticator and try again')
      setTotp('')
      totpRef.current?.focus()
    }
  }

  return (
    <div className="w-full max-w-sm">
      <p className="text-center text-xs uppercase tracking-widest text-[hsl(110,55%,50%)] font-display mb-3">
        Approach Media
      </p>
      <h1 className="text-2xl font-display font-bold text-white text-center mb-8">Admin Panel</h1>

      {/* ── Step 1: Password ───────────────────────────────────── */}
      {step === 'password' && (
        <form onSubmit={handlePassword} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-4">
          <div>
            <label className="field-label mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="field-input"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition disabled:opacity-50"
          >
            {loading ? 'Checking…' : 'Continue'}
          </button>
        </form>
      )}

      {/* ── Step 2: Google Authenticator TOTP ─────────────────── */}
      {step === 'totp' && (
        <form onSubmit={handleTotp} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-xs">✓</span>
            <span className="text-xs text-slate-500">Password verified</span>
          </div>

          <div>
            <label className="field-label mb-1">Authenticator Code</label>
            <p className="text-xs text-slate-500 mb-3">
              Open Google Authenticator and enter the 6-digit code for <span className="text-slate-300">Approach Media Admin</span>.
            </p>
            <input
              ref={totpRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={totp}
              onChange={e => setTotp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="field-input text-center text-2xl tracking-[0.4em] font-mono"
              autoComplete="one-time-code"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || totp.length !== 6}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setStep('password'); setError(''); setTotp('') }}
            className="w-full text-xs text-slate-500 hover:text-slate-300 transition"
          >
            ← Back to password
          </button>
        </form>
      )}
    </div>
  )
}
