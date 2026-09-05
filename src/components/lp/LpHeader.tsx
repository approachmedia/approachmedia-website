import Image from 'next/image'
import Link from 'next/link'
import { LOGO_URL } from '@/lib/brand'
import { LP_PHONE_DISPLAY } from '@/content/lp/types'
import { TelLink, WaLink } from './LpLinks'

/**
 * Minimal sticky header. Logo home, phone, WhatsApp. No site nav, so a paid
 * click has nowhere to wander off to. Spec §2.1.
 */
export default function LpHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[hsl(222,30%,6%)]/90 backdrop-blur-md">
      <div className="container-wide flex h-14 items-center justify-between md:h-16">
        <Link href="/" aria-label="Approach Media — Home" className="inline-flex">
          <Image src={LOGO_URL} alt="Approach Media" width={160} height={44} unoptimized priority className="h-9 w-auto md:h-11" />
        </Link>

        {/* Desktop: number and a WhatsApp button. Mobile: icons only; the
            sticky bar at the bottom carries the full CTAs. */}
        <div className="flex items-center gap-2 md:gap-4">
          <TelLink placement="header" className="hidden text-sm font-semibold text-foreground hover:text-brand-green-glow md:inline-flex">
            {LP_PHONE_DISPLAY}
          </TelLink>
          <TelLink placement="header" iconOnly className="inline-flex h-10 w-10 rounded-md border border-white/15 text-foreground md:hidden" />
          <WaLink placement="header" className="hidden h-10 rounded-md bg-brand-green px-4 text-sm font-semibold text-accent-foreground hover:bg-brand-green-glow md:inline-flex">
            WhatsApp Us
          </WaLink>
          <WaLink placement="header" iconOnly className="inline-flex h-10 w-10 rounded-md bg-brand-green text-accent-foreground md:hidden" />
        </div>
      </div>
    </header>
  )
}
