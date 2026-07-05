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

const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%'

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

  const cls = `${className} transition-colors ${scrambling ? 'text-brand-green' : ''}`.trim()

  if (external) {
    return (
      <a href={href} className={cls} onMouseEnter={scramble} onFocus={scramble}>
        {display}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} onMouseEnter={scramble} onFocus={scramble}>
      {display}
    </Link>
  )
}
