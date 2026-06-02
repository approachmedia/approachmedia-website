'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { label: 'Home',        href: '/' },
  { label: 'Services',    href: '/services' },
  { label: 'Portfolio',   href: '/portfolio' },
  { label: 'Tradeshows',  href: '/tradeshow-calendar' },
  { label: 'About',       href: '/about' },
  { label: 'Contact',     href: '/contact' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[hsl(222,30%,6%)]/90 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-display font-bold text-white flex-shrink-0">
          Approach<span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Media</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {NAV.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition ${
                  isActive(item.href) ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-block px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition flex-shrink-0"
        >
          Book A Consultation
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-800 bg-[hsl(222,30%,6%)]">
          <ul className="px-4 py-3 space-y-1">
            {NAV.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition ${
                    isActive(item.href) ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition"
              >
                Book A Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
