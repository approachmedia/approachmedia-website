'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, stagger } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MenuToggleIcon } from '@/components/motion/MenuToggleIcon'
import { LOGO_URL } from '@/lib/brand'

/**
 * The panel's own open/close. The example reveals a left sidebar by growing
 * a clip-path circle out of the toggle; this menu is a full-width sheet
 * under the header, so it opens on height instead — a circle centred on a
 * button in the top-right corner would sweep across the page rather than out
 * from the control.
 */
const panelVariants = {
  open: { height: 'auto', opacity: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 30 } },
  closed: { height: 0, opacity: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 40 } },
}

/**
 * The example's orchestration, unchanged: opening deals the items out from
 * the top after the panel has started moving, closing gathers them from the
 * last one back. Closing is quicker than opening, which is what stops the
 * menu feeling reluctant to go away.
 */
const listVariants = {
  open: { transition: { delayChildren: stagger(0.07, { startDelay: 0.15 }) } },
  closed: { transition: { delayChildren: stagger(0.04, { from: 'last' as const }) } },
}

/**
 * The example throws items 50px which suits a full-height sidebar; over a
 * short sheet that reads as a jump, so the travel is the site's own
 * enter distance. Its stiffness of 1000 is kept — that snap is the character
 * of the effect.
 */
const itemVariants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 24, opacity: 0, transition: { y: { stiffness: 1000 } } },
}

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }

/**
 * Events is the only item with a submenu. It holds the event setup service
 * lines; dealer meets is the first and two more are planned, so the parent
 * points at the one page that exists rather than at an index with a single
 * entry on it. Add the other two to `children` as they land.
 */
const NAV: NavItem[] = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Industries',   href: '/industries' },
  { label: 'Events',       href: '/events/dealer-meets', children: [
    { label: 'Dealer Meets', href: '/events/dealer-meets' },
  ] },
  { label: 'Portfolio',    href: '/portfolio' },
  { label: 'Expos',        href: '/expos' },
  { label: 'Tradeshows',   href: '/tradeshow-calendar' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'Contact',      href: '/contact' },
]

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="ml-1 inline-block shrink-0">
      <path d="M1.5 3.5 L5 7 L8.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
      <div className="container-wide flex h-20 items-center justify-between gap-4 md:h-24">
        {/* Logo. Sized in Tailwind rather than an inline style so it can step
            up at md — an inline style would win over the breakpoint class.
            72px matches how the mark reads at 150% browser zoom, which is
            where the "MEDIA PVT. LTD." and tagline lines become legible; the
            bar height grows with it to keep the same 12px breathing room. */}
        <Link href="/" aria-label="Approach Media — Home" className="flex shrink-0 items-center">
          <Image
            src={LOGO_URL}
            alt="Approach Media"
            width={220}
            height={56}
            priority
            unoptimized
            className="h-14 w-auto md:h-[72px]"
          />
        </Link>

        {/* Desktop nav */}
        {/* gap-5 rather than gap-7: the desktop nav appears at xl (1280px) and
            Industries makes nine items, which overflowed that width by 37px at
            the old spacing. */}
        <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary">
          {NAV.map(item => item.children ? (
            /* Opens on hover and on keyboard focus. The panel stays in the
               DOM and is hidden with opacity+invisible rather than display,
               so focus can reach the links inside it; the pt-2 on the
               wrapper bridges the gap so the pointer does not fall out of
               the group on its way down to the panel. */
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-haspopup="true"
                className={`flex items-center whitespace-nowrap text-sm transition-colors ${
                  isActive(item.href) ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <Chevron />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[190px] rounded-lg border border-white/15 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive(child.href)
                          ? 'font-semibold text-foreground'
                          : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-sm transition-colors ${
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
          <MenuToggleIcon open={open} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            className="overflow-hidden border-t border-white/15 bg-background/95 backdrop-blur-xl xl:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
          >
            <motion.nav
              className="container-wide flex flex-col py-4"
              aria-label="Mobile"
              variants={listVariants}
            >
              {NAV.map(item => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-sm transition-colors ${
                      isActive(item.href) ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* No hover on a phone, so the submenu is simply listed
                      under its parent rather than hidden behind a tap. */}
                  {item.children?.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={`block border-l border-white/15 py-2 pl-4 text-sm transition-colors ${
                        isActive(child.href) ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
              <motion.div className="mt-3 flex flex-col gap-2" variants={itemVariants}>
                <Button asChild variant="glass" size="sm">
                  <Link href="/portfolio" onClick={() => setOpen(false)}>View Portfolio</Link>
                </Button>
                <Button asChild variant="hero" size="sm">
                  <Link href="/contact" onClick={() => setOpen(false)}>Book A Consultation</Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
