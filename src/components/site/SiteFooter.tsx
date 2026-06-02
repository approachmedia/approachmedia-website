import Link from 'next/link'
import FooterCityList from './FooterCityList'

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
      { label: 'About Us',   href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

const CITIES = [
  { label: 'Mumbai',      href: '/exhibition-stall-designer-mumbai' },
  { label: 'Delhi',       href: '/exhibition-stall-designer-delhi' },
  { label: 'Bangalore',   href: '/exhibition-stall-designer-bangalore' },
  { label: 'Hyderabad',   href: '/exhibition-stall-design-hyderabad' },
  { label: 'Chennai',     href: '/exhibition-stall-designer-chennai' },
  { label: 'Pune',        href: '/exhibition-stall-design-pune' },
  { label: 'Ahmedabad',   href: '/exhibition-stand-builders-in-ahmedabad' },
  { label: 'Surat',       href: '/exhibition-agency-in-surat' },
  { label: 'Jaipur',      href: '/exhibition-stand-in-jaipur' },
  { label: 'Kolkata',     href: '/exhibition-stand-builder-in-kolkata' },
  { label: 'Noida',       href: '/exhibition-stand-builders-in-noida' },
  { label: 'Ludhiana',    href: '/exhibition-stall-design-ludhiana' },
  { label: 'Chandigarh',  href: '/exhibition-stall-design-chandigarh' },
  { label: 'Kochi',       href: '/exhibition-stall-design-kochi' },
  { label: 'Goa',         href: '/exhibition-stall-design-goa' },
]

const SOCIAL = [
  { label: 'LinkedIn',  short: 'in' },
  { label: 'Instagram', short: 'ig' },
  { label: 'YouTube',   short: 'yt' },
  { label: 'Facebook',  short: 'fb' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[hsl(222,30%,5%)] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-display font-bold text-white">
              Approach<span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Media</span>
            </Link>
            <p className="text-sm text-slate-400 mt-4 max-w-sm leading-relaxed">
              India&apos;s trusted exhibition stall design and build company. Since 2002, creating spaces
              that attract, engage, and deliver lasting impact across India and 14+ countries.
            </p>
            <div className="flex gap-2 mt-5">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 hover:border-blue-500 hover:text-white transition"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{col.heading}</h5>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cities We Work */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Cities We Work</h5>
            <FooterCityList cities={CITIES} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Approach Media Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <Link href="/portfolio" className="hover:text-slate-300 transition">Portfolio</Link>
            <Link href="/contact"   className="hover:text-slate-300 transition">Contact</Link>
            <a href="/sitemap.xml" className="hover:text-slate-300 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
