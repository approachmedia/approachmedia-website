'use client'

/**
 * The portfolio's filters. Used many times a visit, so they do not animate
 * in or stagger (choreography rule: no entrance motion on high-frequency
 * UI); they only answer the pointer with a colour change and a press.
 *
 * On a phone each group is one swipeable row instead of a wall of forty
 * wrapped chips, and the active chip is scrolled into view on load so a
 * filter page opens showing what is selected.
 */

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface FilterBarProps {
  industries: { name: string; slug: string }[]
  stallTypes: { name: string; slug: string }[]
  activeIndustry?: string
  activeType?:     string
}

export default function FilterBar({ industries, stallTypes, activeIndustry, activeType }: FilterBarProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    root.current?.querySelectorAll<HTMLElement>('[aria-current="page"]').forEach(el => {
      const row = el.parentElement
      if (row && row.scrollWidth > row.clientWidth) {
        row.scrollLeft = el.offsetLeft - row.clientWidth / 2 + el.clientWidth / 2
      }
    })
  }, [])

  const chip = (href: string, label: string, active: boolean, tone: 'green' | 'blue') => (
    <Link
      key={href}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`pfx-chipf ${active ? `is-active is-${tone}` : ''}`}
    >
      {label}
    </Link>
  )

  return (
    <div ref={root} className="pfx-filters">
      <div>
        <p className="pfx-label">Industry</p>
        <div className="pfx-chiprow">
          {chip('/portfolio', 'All', !activeIndustry && !activeType, 'blue')}
          {industries.map(ind => chip(`/portfolio/industry/${ind.slug}`, ind.name, activeIndustry === ind.slug, 'green'))}
        </div>
      </div>
      <div>
        <p className="pfx-label">Stall Type</p>
        <div className="pfx-chiprow">
          {stallTypes.map(t => chip(`/portfolio/type/${t.slug}`, t.name, activeType === t.slug, 'blue'))}
        </div>
      </div>
    </div>
  )
}
