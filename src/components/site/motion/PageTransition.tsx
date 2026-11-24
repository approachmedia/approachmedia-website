'use client'

/**
 * Page transitions for the whole public site.
 *
 * Two phases around every internal navigation:
 *   cover    a dark panel rises from the bottom over the old page (380ms)
 *   uncover  once the new route has rendered, the panel carries on up and
 *            off the top, revealing the new page underneath (560ms)
 * The brand wordmark rides on the panel, so a page change reads as one
 * gesture rather than a blank. Back/forward skip the cover and only play the
 * uncover, so history navigation never waits.
 *
 * The first visit of a session also gets an intro (see Intro below), shown
 * by classes an inline script sets before paint (see IntroScript). Without
 * JavaScript neither runs, because both layers are only visible under
 * classes the scripts add.
 *
 * Only plain left-clicks on same-origin links to a different path are taken
 * over; new tabs, downloads, hash jumps, modifier keys, external links and
 * the admin are left to the browser. Reduced motion turns the whole thing off.
 */

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const COVER_MS = 380
const SAFETY_MS = 4000

export function IntroScript() {
  // Runs before first paint, and drives the whole intro on its own timers so
  // it never waits on the JavaScript bundle: a slow connection gets the same
  // intro as a fast one. A click, tap or key press opens the curtain at once.
  // On the home page the first visit gets the opening film instead (see
  // HomeOpening), unless the connection asks to save data; a timer clears it
  // regardless, should the film's script never arrive.
  // Skipped on the admin and the ad landing pages, which have no intro, and
  // under reduced motion.
  const js = `try{var p=location.pathname;if(!/^\\/(admin|lp|thank-you)/.test(p)&&!sessionStorage.getItem('am-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('am-intro','1');var h=document.documentElement,a,b,done=0;var c=navigator.connection;if(p==='/'&&!(c&&(c.saveData||/2g/.test(c.effectiveType||'')))){h.classList.add('am-opening');setTimeout(function(){h.classList.remove('am-opening','am-opening-out')},22000)}else{h.classList.add('am-intro');var out=function(){if(done)return;done=1;clearTimeout(a);h.classList.add('am-intro-out');b=setTimeout(function(){h.classList.remove('am-intro','am-intro-out')},950)};a=setTimeout(out,1500);var skip=function(){out();removeEventListener('pointerdown',skip);removeEventListener('keydown',skip)};addEventListener('pointerdown',skip);addEventListener('keydown',skip)}}}catch(e){}`
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}

/**
 * The first-visit intro, drawn only while html.am-intro is set:
 *
 *   0.00  a hairline draws out from the centre of the screen
 *   0.15  APPROACH rises out of it, centre letters first, each letter
 *         converging from a wider spacing and coming into focus
 *   0.55  Imagine · Create · Deliver, word by word; a fill runs the line
 *   1.05  a light passes across the wordmark
 *   1.50  the screen parts along the line, top half up and bottom half
 *         down, as the wordmark dissolves into the light; the page behind
 *         settles from a slight zoom and its own entrances start
 *   2.45  gone
 */
function Intro() {
  const word = 'APPROACH'.split('')
  const mid = (word.length - 1) / 2
  return (
    <div className="am-in" aria-hidden="true">
      <div className="am-in-half am-in-top" />
      <div className="am-in-half am-in-bot" />
      <div className="am-in-stage">
        <div className="am-in-word">
          {word.map((c, i) => (
            <span key={i} className="am-in-m">
              <i style={{ ['--o' as string]: Math.abs(i - mid), ['--x' as string]: i - mid, ['--i' as string]: i }}>{c}</i>
            </span>
          ))}
        </div>
        <div className="am-in-rule"><b /></div>
        <div className="am-in-sub">
          <span style={{ ['--i' as string]: 0 }}>Imagine</span>
          <em style={{ ['--i' as string]: 1 }} />
          <span style={{ ['--i' as string]: 2 }}>Create</span>
          <em style={{ ['--i' as string]: 3 }} />
          <span style={{ ['--i' as string]: 4 }}>Deliver</span>
        </div>
      </div>
    </div>
  )
}

export default function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const panel = useRef<HTMLDivElement>(null)
  const pending = useRef<string | null>(null)
  const safety = useRef(0)

  // Take over plain internal link clicks.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || !a.href || a.target && a.target !== '_self' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname) return // hash jumps and same page
      if (url.pathname.startsWith('/admin') || /\.(xml|txt|pdf|jpg|png|webp)$/i.test(url.pathname)) return
      e.preventDefault()
      const href = url.pathname + url.search + url.hash
      pending.current = href
      const el = panel.current
      if (!el) { router.push(href); return }
      el.classList.remove('is-out')
      el.classList.add('is-cover')
      window.setTimeout(() => router.push(href), COVER_MS)
      window.clearTimeout(safety.current)
      safety.current = window.setTimeout(() => el.classList.remove('is-cover'), SAFETY_MS)
    }
    // Capture phase: React attaches its handlers to the app root, which sits
    // below the document, so a bubbling listener here would only ever see
    // clicks Next's <Link> had already handled and prevented.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  // New route rendered: lift the panel off.
  useEffect(() => {
    const el = panel.current
    if (!el) return
    // History navigation never covered anything, so there is nothing to lift.
    if (!el.classList.contains('is-cover')) return
    pending.current = null
    window.clearTimeout(safety.current)
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      el.classList.add('is-out')
      el.classList.remove('is-cover')
      window.setTimeout(() => el.classList.remove('is-out'), 700)
    })
  }, [pathname])

  return (
    <>
    <Intro />
    <div ref={panel} className="am-pt" aria-hidden="true">
      <div className="am-pt-edge" />
      <div className="am-pt-mark">
        <span className="am-pt-word">
          {'APPROACH'.split('').map((c, i) => <i key={i} style={{ ['--i' as string]: i }}>{c}</i>)}
        </span>
        <span className="am-pt-sub">Imagine · Create · Deliver</span>
      </div>
    </div>
    </>
  )
}
