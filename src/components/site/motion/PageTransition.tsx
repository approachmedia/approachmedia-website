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
 * The first visit of a session also gets a short intro: the panel starts in
 * place (set before paint by an inline script, see IntroScript) and lifts
 * after the wordmark has drawn in. Without JavaScript neither runs, because
 * the panel is only visible under classes the scripts add.
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
  // 1.9s intro as a fast one. Skipped on the admin and the ad landing pages,
  // which have no panel, and under reduced motion.
  const js = `try{var p=location.pathname;if(!/^\\/(admin|lp|thank-you)/.test(p)&&!sessionStorage.getItem('am-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('am-intro','1');var h=document.documentElement;h.classList.add('am-intro');setTimeout(function(){h.classList.add('am-intro-out')},1100);setTimeout(function(){h.classList.remove('am-intro','am-intro-out')},1950)}}catch(e){}`
  return <script dangerouslySetInnerHTML={{ __html: js }} />
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
    <div ref={panel} className="am-pt" aria-hidden="true">
      <div className="am-pt-edge" />
      <div className="am-pt-mark">
        <span className="am-pt-word">
          {'APPROACH'.split('').map((c, i) => <i key={i} style={{ ['--i' as string]: i }}>{c}</i>)}
        </span>
        <span className="am-pt-sub">Imagine · Create · Deliver</span>
      </div>
    </div>
  )
}
