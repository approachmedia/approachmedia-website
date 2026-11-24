'use client'

/**
 * Scroll reveals for every page that does not choreograph its own.
 *
 * On each route, headings rise into place through a mask and photographs open
 * upward from a clip as they first enter the screen (once each). Pages and
 * blocks with their own motion are left alone: the home page, the portfolio
 * and industry hubs, the case studies, the dealer meets story, and anything
 * inside a scrollcraft act or marked data-no-reveal. Small images (logos,
 * icons, avatars) are skipped.
 *
 * Nothing is hidden without JavaScript: the hidden state only exists under a
 * class this adds, and anything already on screen when the page arrives is
 * marked revealed before the first frame, so a page never flashes empty.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SKIP_ROUTES = [/^\/$/, /^\/portfolio/, /^\/industries\/?$/, /^\/events\//, /^\/admin/, /^\/lp\//, /^\/thank-you/]
const SKIP_INSIDE = '.iv, .pfx, .cs, .sc-scope, [data-sc-act], .gjaks, header, footer, nav, [data-no-reveal], [aria-roledescription="carousel"], .am-pt, form, details, table'

export default function AutoReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (SKIP_ROUTES.some(r => r.test(pathname))) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.querySelector<HTMLElement>('.am-content')
    if (!root) return

    // Wait a frame so the new route's DOM is in place.
    // Pending elements are checked by measurement on scroll, not with an
    // IntersectionObserver: Chrome applies the target's own clip-path when
    // computing intersection, and the hidden state here is a full clip, so an
    // observer would never see the element arrive.
    let pending: HTMLElement[] = []
    let tick = 0
    const check = () => {
      tick = 0
      // At the very bottom of the page the last elements may never reach the
      // 90% line, so anything on screen there is revealed outright.
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      const line = window.innerHeight * (atEnd ? 1 : 0.9)
      pending = pending.filter(el => {
        const r = el.getBoundingClientRect()
        // On screen, already scrolled past (a stacked or pinned layer can be
        // skipped over between frames), or collapsed to nothing: reveal, so
        // nothing can stay clipped once it has had its chance.
        if ((r.top < line && r.bottom > 0) || r.bottom <= 0 || r.height === 0) { el.classList.add('am-in'); return false }
        return el.isConnected
      })
      if (pending.length === 0) window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => { if (!tick) tick = requestAnimationFrame(check) }
    const raf = requestAnimationFrame(() => {
      const heads = Array.from(root.querySelectorAll<HTMLElement>('h1, h2'))
        .filter(el => !el.closest(SKIP_INSIDE) && !el.classList.contains('sr-only') && el.offsetHeight > 0)
      const imgs = Array.from(root.querySelectorAll<HTMLElement>('img, video'))
        .filter(el => !el.closest(SKIP_INSIDE) && el.getBoundingClientRect().width >= 160 && el.getBoundingClientRect().height >= 110)
      const vh = window.innerHeight
      const arm = (el: HTMLElement, cls: string) => {
        if (el.classList.contains('am-rv-h') || el.classList.contains('am-rv-m')) return
        const r = el.getBoundingClientRect()
        el.classList.add(cls)
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('am-in', 'am-now')
        else pending.push(el)
      }
      heads.forEach(el => arm(el, 'am-rv-h'))
      imgs.forEach(el => arm(el, 'am-rv-m'))
      if (pending.length) window.addEventListener('scroll', onScroll, { passive: true })
    })
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(tick); window.removeEventListener('scroll', onScroll) }
  }, [pathname])

  return null
}
