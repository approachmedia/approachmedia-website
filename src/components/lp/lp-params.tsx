'use client'

/**
 * First-touch campaign attribution, for the WHOLE site.
 *
 * Read once on the client, persisted in sessionStorage, and exposed through
 * context. Mounted in the root layout, so a visitor who lands on the home
 * page from an ad and submits the contact form two pages later still carries
 * the gclid that brought them: the values are only overwritten when a fresh
 * landing arrives with new ones.
 *
 * It began as landing-page-only, which is why it lives under components/lp
 * and still carries the landing pages' own params (show, city, size, kw, v)
 * alongside gclid and the utm_* set. Nothing here breaks when any of them is
 * absent; every value defaults to an empty string.
 */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { sanitizeShow, normalizeCity } from './lp-params-shared'

export type LpParams = {
  show: string
  city: string
  size: string
  gclid: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  kw: string
  v: string
  referrer: string
  landing_path: string
}

const KEYS: (keyof LpParams)[] = [
  'show', 'city', 'size', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign',
  'utm_term', 'utm_content', 'kw', 'v', 'referrer', 'landing_path',
]

const EMPTY: LpParams = Object.fromEntries(KEYS.map(k => [k, ''])) as LpParams
const STORE = 'am_lp_params'

const Ctx = createContext<LpParams>(EMPTY)

export function LpParamsProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<LpParams>(EMPTY)

  useEffect(() => {
    let stored: Partial<LpParams> = {}
    try { stored = JSON.parse(sessionStorage.getItem(STORE) || '{}') } catch { /* fresh session */ }

    const q = new URLSearchParams(window.location.search)
    const fresh: Partial<LpParams> = {}
    for (const k of KEYS) {
      const v = q.get(k)
      if (v) fresh[k] = k === 'show' ? sanitizeShow(v) : k === 'city' ? normalizeCity(v) : v.slice(0, 200)
    }
    // A landing with new params overrides what was stored; a bare reload keeps it.
    const merged: LpParams = { ...EMPTY, ...stored, ...fresh }
    if (!merged.landing_path) merged.landing_path = window.location.pathname
    if (!merged.referrer && document.referrer) merged.referrer = document.referrer.slice(0, 300)

    try { sessionStorage.setItem(STORE, JSON.stringify(merged)) } catch { /* storage blocked */ }
    setP(merged)
  }, [])

  const value = useMemo(() => p, [p])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLpParams() {
  return useContext(Ctx)
}
