'use client'

/**
 * The home page's grand opening: a 15.7-second film, full screen, on the
 * first visit of a session. Imagine (the stands as line drawings), Create
 * (the builds, the company's real figures), then a flight down a corridor of
 * project panels onto the logo's own shapes, which settle into the official
 * reverse-white logo. Made from the owner's footage and brand files only.
 *
 * Shown only when the head script has set html.am-opening (first visit, home
 * page, motion allowed, not on a data-saving connection); that class also
 * covers the page before first paint and holds the page's own entrances.
 * The film ends itself a beat after the logo lands, or at once on Skip, a
 * click, a key, a wheel or a swipe; if it cannot start within a few seconds,
 * or the browser refuses to play it, the page simply appears.
 *
 * It is portalled to <body>: the page content forms its own stacking
 * context, and a fixed layer inside it would paint beneath the pre-paint
 * cover that html.am-opening draws at the root.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FILM = '/home-intro/approach-media-opening'

export default function HomeOpening() {
  const video = useRef<HTMLVideoElement>(null)
  const skipBtn = useRef<HTMLButtonElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)

  // Mount the layer only when the head script asked for the film.
  useEffect(() => {
    if (document.documentElement.classList.contains('am-opening')) setHost(document.body)
  }, [])

  useEffect(() => {
    const h = document.documentElement
    const v = video.current
    if (!host || !v || !h.classList.contains('am-opening')) return
    let done = false
    const finish = () => {
      if (done) return
      done = true
      h.classList.add('am-opening-out')
      window.setTimeout(() => {
        h.classList.remove('am-opening', 'am-opening-out')
        v.pause()
        v.removeAttribute('src')
        v.load()
      }, 950)
      off()
    }
    // portrait screens get the portrait cut, everyone else the wide one
    const tall = window.innerHeight > window.innerWidth
    const webm = v.canPlayType('video/webm; codecs="vp9"') !== ''
    v.src = tall ? `${FILM}-m.mp4` : webm ? `${FILM}.webm` : `${FILM}.mp4`
    v.muted = true
    v.play().catch(finish)

    const onTime = () => { if (v.duration && v.currentTime >= v.duration - 1.1) finish() }
    const stall = window.setTimeout(() => { if (v.currentTime === 0) finish() }, 4000)
    const skip = () => finish()
    const onKey = (e: KeyboardEvent) => { if (e.key !== 'Tab') finish() }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', skip)
    v.addEventListener('error', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', onKey)
    skipBtn.current?.focus({ preventScroll: true })
    function off() {
      window.clearTimeout(stall)
      v!.removeEventListener('timeupdate', onTime)
      v!.removeEventListener('ended', skip)
      v!.removeEventListener('error', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', onKey)
    }
    return off
  }, [host])

  if (!host) return null
  return createPortal(
    <div className="ho" role="presentation">
      <video ref={video} className="ho-film" muted playsInline preload="none" aria-hidden="true" />
      <button ref={skipBtn} type="button" className="ho-skip" data-no-transition>
        Skip intro
      </button>
    </div>,
    host,
  )
}
