'use client'

/**
 * The home page's grand entrance, on the first visit of a session.
 *
 *   1. An Enter screen: the official reverse-white logo on the dark ground,
 *      an Enter button, a note that sound is on. The film loads behind it.
 *   2. Enter plays the opening film with its music (browsers allow sound
 *      because the visitor clicked). Imagine, Create, the corridor, the
 *      logo's own shapes, then the official colour logo on Soft White.
 *   3. The film hands over to the page a beat before it ends.
 *
 * Skip intro (on the Enter screen and during the film), Escape, or scrolling
 * goes straight to the page; a skip mid-film fades the music out rather than
 * cutting it. Shown only when the head script has set html.am-opening (first
 * visit, home page, motion allowed, not on a data-saving connection); that
 * class covers the page before first paint and holds its entrances.
 *
 * Portalled to <body>: the page content forms its own stacking context, and a
 * layer inside it would paint beneath the pre-paint cover at the root.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FILM = '/home-intro/approach-media-opening'
const LOGO = '/home-intro/approach-media-logo-white.svg'

export default function HomeOpening() {
  const video = useRef<HTMLVideoElement>(null)
  const enterBtn = useRef<HTMLButtonElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [stage, setStage] = useState<'gate' | 'film'>('gate')
  const api = useRef<{ enter: () => void; finish: () => void } | null>(null)

  // Mount only when the head script asked for the entrance, and tell its
  // safety timer that the page's script has taken over.
  useEffect(() => {
    if (!document.documentElement.classList.contains('am-opening')) return
    ;(window as unknown as { __amOpeningLive?: boolean }).__amOpeningLive = true
    setHost(document.body)
  }, [])

  useEffect(() => {
    const h = document.documentElement
    const v = video.current
    if (!host || !v || !h.classList.contains('am-opening')) return
    let done = false
    let started = false
    let stall = 0

    // load the film behind the Enter screen: portrait cut on portrait screens
    const tall = window.innerHeight > window.innerWidth
    const webm = v.canPlayType('video/webm; codecs="vp9, opus"') !== ''
    v.src = tall ? `${FILM}-m.mp4` : webm ? `${FILM}.webm` : `${FILM}.mp4`
    v.preload = 'auto'
    v.load()

    const fadeAudio = () => {
      const from = v.volume, t0 = performance.now()
      const step = (now: number) => {
        // a frame's timestamp can be a hair earlier than t0, so clamp both ways
        const k = Math.min(1, Math.max(0, (now - t0) / 600))
        v.volume = Math.min(1, Math.max(0, from * (1 - k)))
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const finish = () => {
      if (done) return
      done = true
      if (started) fadeAudio()
      h.classList.add('am-opening-out')
      window.setTimeout(() => {
        h.classList.remove('am-opening', 'am-opening-out')
        v.pause()
        v.removeAttribute('src')
        v.load()
      }, 950)
      off()
    }
    const enter = () => {
      if (started || done) return
      started = true
      v.muted = false
      v.volume = 1
      // play() is called inside the click, so the browser allows the sound
      const p = v.play()
      setStage('film')
      p.catch(() => {
        // sound refused after all: play silent rather than not at all
        v.muted = true
        v.play().catch(finish)
      })
      stall = window.setTimeout(() => { if (v.currentTime === 0) finish() }, 6000)
    }
    api.current = { enter, finish }

    const onTime = () => { if (v.duration && v.currentTime >= v.duration - 0.6) finish() }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish() }
    const onScroll = () => finish()
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', finish)
    v.addEventListener('error', finish)
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onScroll, { passive: true })
    window.addEventListener('touchmove', onScroll, { passive: true })
    enterBtn.current?.focus({ preventScroll: true })
    function off() {
      window.clearTimeout(stall)
      v!.removeEventListener('timeupdate', onTime)
      v!.removeEventListener('ended', finish)
      v!.removeEventListener('error', finish)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
    return off
  }, [host])

  if (!host) return null
  return createPortal(
    <div className={`ho ${stage === 'film' ? 'is-film' : ''}`}>
      <video ref={video} className="ho-film" playsInline muted preload="none" aria-hidden="true" />
      <div className="ho-gate" role="dialog" aria-modal="true" aria-label="Approach Media" aria-hidden={stage === 'film'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ho-logo" src={LOGO} alt="Approach Media Pvt. Ltd. Imagine, Create, Deliver" width={321} height={143} />
        <button ref={enterBtn} type="button" className="ho-enter" onClick={() => api.current?.enter()} data-no-transition>
          Enter
        </button>
        <p className="ho-sound">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" /></svg>
          Sound on
        </p>
      </div>
      <button type="button" className="ho-skip" onClick={() => api.current?.finish()} data-no-transition>
        Skip intro
      </button>
    </div>,
    host,
  )
}
