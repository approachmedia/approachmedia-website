'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { track } from './lp-tracking'

/** An internal link that reports its click as a secondary event (spec §8). */
export function TrackedLink({ href, event, className, children }: { href: string; event: string; className?: string; children: ReactNode }) {
  return <Link href={href} className={className} onClick={() => track(event, { href })}>{children}</Link>
}
