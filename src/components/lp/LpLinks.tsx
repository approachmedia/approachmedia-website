'use client'

/**
 * The two conversion links, each pushing its dataLayer event on click and
 * then letting the browser follow the href. tel: and wa.me are both primary
 * Google Ads conversions (spec §8), so every instance on the page goes
 * through here and carries its placement.
 */

import { type ReactNode } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { LP_PHONE_E164 } from '@/content/lp/types'
import { useLpParams } from './lp-params'
import { whatsappUrl } from './lp-whatsapp'
import { track, type LpPlacement } from './lp-tracking'
import { cn } from '@/lib/utils'

export function WaLink({
  placement, className, children, show, size, iconOnly,
}: {
  placement: LpPlacement; className?: string; children?: ReactNode
  /** Override the message inputs (the form passes its live values). */
  show?: string; size?: string; iconOnly?: boolean
}) {
  const p = useLpParams()
  const href = whatsappUrl(show ?? p.show, size ?? p.size)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => track('whatsapp_click', { placement })}
      className={cn('inline-flex items-center justify-center gap-2', className)}
      aria-label={iconOnly ? 'WhatsApp us' : undefined}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
      {!iconOnly && children}
    </a>
  )
}

export function TelLink({
  placement, className, children, iconOnly,
}: {
  placement: LpPlacement; className?: string; children?: ReactNode; iconOnly?: boolean
}) {
  return (
    <a
      href={`tel:${LP_PHONE_E164}`}
      onClick={() => track('call_click', { placement })}
      className={cn('inline-flex items-center justify-center gap-2', className)}
      aria-label={iconOnly ? 'Call us' : undefined}
    >
      <Phone className="h-4 w-4 shrink-0" aria-hidden />
      {!iconOnly && children}
    </a>
  )
}

/** Scrolls to the form and focuses its first field. */
export function ToFormButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const el = document.getElementById('lp-form')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => el?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 500)
      }}
    >
      {children}
    </button>
  )
}
