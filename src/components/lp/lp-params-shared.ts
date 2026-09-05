/**
 * Pure helpers shared by the server page (initial render from searchParams)
 * and the client provider (sessionStorage and the live query string). No
 * 'use client' here on purpose: a server component cannot call a function
 * exported from a client module.
 */

import { CITY_VENUES } from '@/content/lp/types'

/** Max 60 chars, HTML stripped, whitespace collapsed. Spec §6. */
export function sanitizeShow(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60)
}

export function normalizeCity(raw: string | null | undefined): string {
  const c = (raw || '').toLowerCase().trim()
  return c in CITY_VENUES ? c : ''
}

/** Server-side reader for the page's initial render (no flash on the H1). */
export function paramsFromSearch(sp: Record<string, string | string[] | undefined>): { show: string; city: string } {
  const one = (k: string) => { const v = sp[k]; return Array.isArray(v) ? v[0] : v }
  return { show: sanitizeShow(one('show')), city: normalizeCity(one('city')) }
}
