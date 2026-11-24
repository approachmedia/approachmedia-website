'use client'

/**
 * framer-motion's useReducedMotion, but false until the page has hydrated.
 *
 * The plain hook reads the media query during the first client render, so a
 * component that renders a different tree under reduced motion produced
 * markup the server never sent, and React threw a hydration error (#418) for
 * every visitor with reduced motion on. This keeps the first render identical
 * to the server's and switches one tick later.
 */

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useHydratedReducedMotion(): boolean {
  const reduce = useReducedMotion()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated && !!reduce
}
