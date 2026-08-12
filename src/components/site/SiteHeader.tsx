'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Portfolio',    href: '/portfolio' },
  { label: 'Expos 2026',   href: '/expos' },
  { label: 'Tradeshows',   href: '/tradeshow-calendar' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'Contact',      href: '/contact' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/15 bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-background/60 backdrop-blur'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link href="/" aria-label="Approach Media — Home" className="flex shrink-0 items-center">
          <Image
            src="https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/logo_favicon/Appraoch%20Media%20Logo.svg"
            alt="Approach Media"
            width={220}
            height={56}
            priority
            unoptimized
            style={{ height: '48px', width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href) ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="glass" size="sm">
            <Link href="/portfolio">View Portfolio</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link href="/contact">Book A Consultation</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="rounded-md border border-white/15 p-2 text-foreground xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/15 bg-background/95 backdrop-blur-xl xl:hidden">
          <nav className="container-wide flex flex-col py-4" aria-label="Mobile">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-sm transition-colors ${
                  isActive(item.href) ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild variant="glass" size="sm">
                <Link href="/portfolio" onClick={() => setOpen(false)}>View Portfolio</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link href="/contact" onClick={() => setOpen(false)}>Book A Consultation</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
