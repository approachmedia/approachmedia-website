'use client'

/**
 * ScrambleLink — footer link hover effect from the reference recording.
 *
 * On hover/focus the label scrambles through random glyphs in the brand
 * accent color, then resolves back to the real text left-to-right (~0.6s).
 * Skipped for prefers-reduced-motion users.
 */

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GLYPHS = '01'  // binary decode — data generating text

export default function ScrambleLink({
  href,
  children,
  className = '',
  external = false,
}: {
  href:      string
  children:  string
  className?: string
  external?: boolean
}) {
  const [display, setDisplay]     = useState(children)
  const [scrambling, setScrambling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplay(children)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [children])

  function scramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (intervalRef.current) clearInterval(intervalRef.current)

    const original = children
    const totalFrames = 20 // ~0.6s at 30ms
    let frame = 0
    setScrambling(true)

    intervalRef.current = setInterval(() => {
      frame++
      const resolved = (frame / totalFrames) * original.length
      setDisplay(
        original
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' '
            return i < resolved ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )
      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplay(original)
        setScrambling(false)
      }
    }, 30)
  }

  const cls = `group relative inline-flex items-center ${className}`.trim()

  // Green square dot scales in at the left on hover while the label shifts
  // right and scrambles in Approach green (reference-video behaviour).
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute left-0 h-1.5 w-1.5 scale-0 bg-brand-green transition-transform duration-300 ease-out group-hover:scale-100 group-focus-visible:scale-100"
      />
      <span
        className={`inline-block transition-[transform,color] duration-300 group-hover:translate-x-3.5 group-focus-visible:translate-x-3.5 ${
          scrambling ? 'text-brand-green' : ''
        }`}
      >
        {display}
      </span>
    </>
  )

  if (external) {
    return (
      <a href={href} className={cls} onMouseEnter={scramble} onFocus={scramble}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} onMouseEnter={scramble} onFocus={scramble}>
      {inner}
    </Link>
  )
}
