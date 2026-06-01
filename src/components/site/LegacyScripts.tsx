'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ROTATING_TEXTS = [
  'In an ocean of lookalikes, those who stand apart will survive!',
  'Custom Exhibition and Trade Show Booth Builders and Designers',
  'Innovative Designs, Engaging Experiences, Lasting Impact',
]

/**
 * Ports the behaviours from the legacy js/main.js that the migrated
 * pages depend on: scroll-reveal (.animate-in), stat counters
 * ([data-count]), the rotating hero tagline, and the FAQ accordion.
 * Re-runs whenever the route changes so freshly-mounted pages animate.
 */
export default function LegacyScripts() {
  const pathname = usePathname()

  useEffect(() => {
    // ── Scroll-triggered reveal ──────────────────────────────
    const animateObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            animateObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )
    const revealEls = document.querySelectorAll('.animate-in')
    revealEls.forEach(el => animateObserver.observe(el))

    // Safety: if anything is already in view on load, reveal immediately
    requestAnimationFrame(() => {
      revealEls.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
      })
    })

    // ── Stat counters ────────────────────────────────────────
    function animateCounter(el: HTMLElement, target: number, suffix: string) {
      let startTime: number | null = null
      const duration = 1800
      const frame = (ts: number) => {
        if (startTime === null) startTime = ts
        const progress = Math.min((ts - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target) + suffix
        if (progress < 1) requestAnimationFrame(frame)
        else el.textContent = target + suffix
      }
      requestAnimationFrame(frame)
    }

    const statsSection = document.querySelector('.hero-stats')
    let counterObserver: IntersectionObserver | null = null
    if (statsSection) {
      let counted = false
      counterObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !counted) {
            counted = true
            document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
              animateCounter(el, parseInt(el.dataset.count || '0', 10), el.dataset.suffix || '')
            })
          }
        },
        { threshold: 0.4 }
      )
      counterObserver.observe(statsSection)
    }

    // ── Rotating hero tagline ────────────────────────────────
    const rotatingEl = document.getElementById('rotating-text')
    let rotateTimer: ReturnType<typeof setInterval> | null = null
    if (rotatingEl) {
      let idx = 0
      rotateTimer = setInterval(() => {
        rotatingEl.style.opacity = '0'
        setTimeout(() => {
          idx = (idx + 1) % ROTATING_TEXTS.length
          rotatingEl.textContent = ROTATING_TEXTS[idx]
          rotatingEl.style.opacity = '1'
        }, 500)
      }, 3600)
    }

    // ── FAQ accordion (event delegation) ─────────────────────
    function onFaqClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest('.faq-question')
      if (!btn) return
      const item = btn.closest('.faq-item')
      if (!item) return
      const isOpen = item.classList.contains('open')
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open')
        o.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false')
      })
      if (!isOpen) {
        item.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')
      }
    }
    document.addEventListener('click', onFaqClick)

    return () => {
      animateObserver.disconnect()
      counterObserver?.disconnect()
      if (rotateTimer) clearInterval(rotateTimer)
      document.removeEventListener('click', onFaqClick)
    }
  }, [pathname])

  return null
}
