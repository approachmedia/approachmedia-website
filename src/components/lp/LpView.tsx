'use client'

import { useEffect } from 'react'
import { useLpParams } from './lp-params'
import { track } from './lp-tracking'

/** Fires lp_view once per page load, after the params have been read. */
export default function LpView({ service }: { service: string }) {
  const p = useLpParams()
  useEffect(() => {
    if (!p.landing_path) return
    track('lp_view', { service, show: p.show, city: p.city, variant: p.v })
    // landing_path is set on the first read, so this runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.landing_path])
  return null
}
