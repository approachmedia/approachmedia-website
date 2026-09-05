'use client'

/**
 * The eyebrow and H1, dynamic on ?show= and ?city= (spec §6).
 *
 * The server renders them from the request's search params so there is no
 * flash; after mount, values restored from sessionStorage (a bare reload
 * that lost its query string) take over.
 */

import { CITY_VENUES } from '@/content/lp/types'
import { useLpParams } from './lp-params'

export function swapVenues(eyebrow: string, city: string): string {
  const venues = CITY_VENUES[city]
  if (!venues) return eyebrow
  // The eyebrow's city list follows the first " · ". Replace it with the venues.
  const i = eyebrow.indexOf(' · ')
  return i === -1 ? eyebrow : `${eyebrow.slice(0, i)} · ${venues.join(' · ')}`
}

export function headlineFor(h1: string, h1WithShow: string, show: string): string {
  return show ? h1WithShow.replace('{show}', show) : h1
}

export default function LpHeadline({
  eyebrow, h1, h1WithShow, initialShow, initialCity,
}: {
  eyebrow: string; h1: string; h1WithShow: string; initialShow: string; initialCity: string
}) {
  const p = useLpParams()
  const show = p.show || initialShow
  const city = p.city || initialCity
  return (
    <>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
        {swapVenues(eyebrow, city)}
      </p>
      <h1 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {headlineFor(h1, h1WithShow, show)}
      </h1>
    </>
  )
}
