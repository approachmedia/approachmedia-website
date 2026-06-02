'use client'

import Link from 'next/link'
import { useState } from 'react'

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
            <Link href={city.href} className="text-sm text-slate-400 hover:text-white transition">
              {city.label}
            </Link>
          </li>
        ))}
      </ul>

      {cities.length > VISIBLE && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition"
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
