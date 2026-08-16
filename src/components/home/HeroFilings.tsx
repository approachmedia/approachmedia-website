'use client'

/**
 * The magnetic-filings field, as a background layer for the hero.
 *
 * An invisible attractor wanders the hero on layered sine waves and every
 * filing rotates to face it, on a spring. The maths is the supplied
 * component's, unchanged: atan2 to the attractor, the accumulated-angle trick
 * so a filing takes the shortest way round rather than unwinding a full turn
 * when atan2 wraps at ±180°, the same spring constants, and the same wander
 * frequencies.
 *
 * Two things are different.
 *
 * It is a layer, not a section. The supplied component owns the whole hero
 * and renders its own headline and subtitle; this hero already has a headline
 * that reveals line by line, two calls to action and four metrics, so the
 * field sits behind all of it and nothing about the content changes.
 *
 * It draws to a canvas rather than one absolutely-positioned motion.div per
 * filing. That is not a preference — the DOM version was built first and
 * measured at 20.5fps on a 1440x1000 hero with an 83ms worst frame, because
 * a thousand-odd elements each take a style write, a layout and a paint every
 * frame. One canvas is a single element and a thousand line draws, which is
 * work the GPU is built for. It measures 60fps at a denser grid than the DOM
 * version managed, so the field is bigger AND smoother; see the commit
 * message for both numbers.
 *
 * The canvas is transparent, so the hero photograph and its washes still show
 * through underneath.
 */

import { useEffect, useRef } from 'react'

// ── the supplied constants, with the field made denser and heavier ──

/** px per filing. Lower is denser. Canvas affords the density asked for. */
const CELL_DESKTOP = 30
/** Phones get a coarser grid — same density there is work nobody sees. */
const CELL_MOBILE = 42
const FILING_LENGTH = 30
const FILING_THICKNESS = 3

/** The supplied spring. Lower damping wobbles more. */
const STIFFNESS = 250
const DAMPING = 35
const WANDER_SPEED = 1

/**
 * The supplied 0.85 is for a hero whose only content is a centred headline
 * with a text-shadow. This hero carries a headline, a four-line paragraph,
 * two buttons and four metrics over the field, and at full strength the
 * paragraph was genuinely hard to read against it.
 */
const FILING_OPACITY = 0.5

/** Blue to bright green — the site's accent sweep, and the supplied stops. */
const GRADIENT_STOPS: [number, number, number][] = [
  [74, 109, 240],
  [109, 148, 200],
  [95, 181, 106],
  [88, 213, 75],
]

function gradientColor(t: number) {
  const n = GRADIENT_STOPS.length - 1
  const clamped = Math.min(1, Math.max(0, t))
  const idx = Math.min(n - 1, Math.floor(clamped * n))
  const local = clamped * n - idx
  const [r1, g1, b1] = GRADIENT_STOPS[idx]
  const [r2, g2, b2] = GRADIENT_STOPS[idx + 1]
  const r = Math.round(r1 + (r2 - r1) * local)
  const g = Math.round(g1 + (g2 - g1) * local)
  const b = Math.round(b1 + (b2 - b1) * local)
  return `rgba(${r}, ${g}, ${b}, ${FILING_OPACITY})`
}

export function HeroFilings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Flat arrays rather than an array of objects: the whole field is walked
    // every frame, and this keeps that loop over contiguous memory.
    let cx = new Float32Array(0)
    let cy = new Float32Array(0)
    let angle = new Float32Array(0)
    let velocity = new Float32Array(0)
    let colors: string[] = []
    let count = 0

    let width = 0
    let height = 0
    let dpr = 1
    let frame: number | undefined
    let last = 0

    const build = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (!width || !height) return

      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      const cell = width < 768 ? CELL_MOBILE : CELL_DESKTOP
      const cols = Math.ceil(width / cell)
      const rows = Math.ceil(height / cell)
      const offsetX = (width - cols * cell) / 2
      const offsetY = (height - rows * cell) / 2

      count = cols * rows
      cx = new Float32Array(count)
      cy = new Float32Array(count)
      angle = new Float32Array(count)
      velocity = new Float32Array(count)
      colors = new Array(count)

      let i = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * cell + cell / 2
          const y = offsetY + row * cell + cell / 2
          cx[i] = x
          cy[i] = y
          // Mostly horizontal, slightly vertical — the same diagonal sweep
          // the heading above it runs.
          colors[i] = gradientColor((x / width) * 0.8 + (y / height) * 0.2)
          i++
        }
      }

      ctx.lineCap = 'round'
      ctx.lineWidth = FILING_THICKNESS
      draw()
    }

    const half = FILING_LENGTH / 2

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineCap = 'round'
      ctx.lineWidth = FILING_THICKNESS * dpr

      for (let i = 0; i < count; i++) {
        const radians = (angle[i] * Math.PI) / 180
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        // The rotation folded into the transform, so there is no
        // save/rotate/restore per filing.
        ctx.setTransform(cos * dpr, sin * dpr, -sin * dpr, cos * dpr, cx[i] * dpr, cy[i] * dpr)
        ctx.strokeStyle = colors[i]
        ctx.beginPath()
        ctx.moveTo(-half, 0)
        ctx.lineTo(half, 0)
        ctx.stroke()
      }
    }

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      if (!count || reduced.matches) return

      // The supplied wander: unrelated frequencies, so the path is smooth
      // and never repeats.
      const s = (time / 1000) * WANDER_SPEED
      const px =
        (0.5 + 0.34 * Math.sin(s * 0.7) * Math.cos(s * 0.23) + 0.12 * Math.sin(s * 1.13)) * width
      const py =
        (0.5 + 0.34 * Math.sin(s * 0.5 + 2) * Math.cos(s * 0.31) + 0.12 * Math.cos(s * 0.87)) * height

      // Clamped so a dropped frame cannot blow the integration up.
      const dt = Math.min(0.05, last ? (time - last) / 1000 : 0.016)
      last = time

      for (let i = 0; i < count; i++) {
        const target = (Math.atan2(py - cy[i], px - cx[i]) * 180) / Math.PI
        let delta = target - (((angle[i] % 360) + 360) % 360)
        if (delta > 180) delta -= 360
        if (delta < -180) delta += 360

        // The same spring Motion would integrate, at the same constants.
        const force = delta * STIFFNESS
        velocity[i] += (force - DAMPING * velocity[i]) * dt
        angle[i] += velocity[i] * dt
      }

      draw()
    }

    build()
    const observer = new ResizeObserver(build)
    observer.observe(canvas)
    frame = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
