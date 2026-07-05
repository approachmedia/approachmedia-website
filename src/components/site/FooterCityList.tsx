'use client'

import Link from 'next/link'
import { useState } from 'react'
import ScrambleLink from '@/components/ui/ScrambleLink'

type City = { label: string; href: string }

const VISIBLE = 7

export default function FooterCityList({ cities }: { cities: City[] }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? cities : cities.slice(0, VISIBLE)

  return (
    <>
      <ul className="space-y-2.5">
        {shown.map(city => (
          <li key={city.href}>
            <ScrambleLink href={city.href} className="text-sm text-muted-foreground hover:text-foreground transition">
              {city.label}
            </ScrambleLink>
          </li>
        ))}
      </ul>

      {cities.length > VISIBLE && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-foreground transition"
        >
          {expanded ? 'Show less' : `See More`}
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  )
}
