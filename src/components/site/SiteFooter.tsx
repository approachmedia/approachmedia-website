import Image from 'next/image'
import Link from 'next/link'
import FooterCityList from './FooterCityList'
import { INDIAN_CITIES } from '@/data/cities'

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Exhibition Stall Design',      href: '/services/exhibition-stall-design' },
      { label: 'Custom Booth Fabrication',     href: '/services/custom-booth-fabrication' },
      { label: 'Turnkey Project Management',   href: '/services/turnkey-project-management' },
      { label: 'AV & Technology',              href: '/services/av-technology-integration' },
      { label: 'Double Decker Stands',         href: '/services/double-decker-mezzanine-stands' },
    ],
  },
  {
    heading: 'Portfolio',
    links: [
      { label: 'All Projects',          href: '/portfolio' },
      { label: 'Tradeshow Calendar',    href: '/tradeshow-calendar' },
      { label: 'Immersive Experience',  href: '/services/immersive-brand-experience' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',     href: '/about' },
      { label: 'Work With Us', href: '/work-with-us' },
      { label: 'Expos 2026',   href: '/expos' },
      { label: 'Contact Us',   href: '/contact' },
    ],
  },
]


const SOCIAL = [
  { label: 'LinkedIn',  short: 'in' },
  { label: 'Instagram', short: 'ig' },
  { label: 'YouTube',   short: 'yt' },
  { label: 'Facebook',  short: 'fb' },
]

export default function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/15 bg-surface">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" aria-label="Approach Media — Home" className="inline-flex">
              <Image
                src="https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/logo_favicon/Appraoch%20Media%20Logo.svg"
                alt="Approach Media"
                width={200}
                height={56}
                unoptimized
                style={{ height: '52px', width: 'auto' }}
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              India&apos;s trusted exhibition stall design and build company. Since 2002, creating spaces
              that attract, engage, and deliver lasting impact across India and 14+ countries.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-xs font-semibold text-muted-foreground transition hover:border-brand-blue-glow/50 hover:text-foreground"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h5 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-foreground">{col.heading}</h5>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cities We Work */}
          <div>
            <h5 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-foreground">Cities We Work</h5>
            <FooterCityList cities={INDIAN_CITIES} />
          </div>
        </div>
      </div>

      <div className="hairline-divider" />

      {/* Bottom bar */}
      <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Approach Media Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <Link href="/portfolio" className="transition hover:text-foreground">Portfolio</Link>
          <Link href="/contact"   className="transition hover:text-foreground">Contact</Link>
          <a href="/sitemap.xml" className="transition hover:text-foreground">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
