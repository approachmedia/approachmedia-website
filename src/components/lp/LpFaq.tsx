'use client'

/**
 * FAQ accordion (§2.9) on the site's own Accordion. When ?city= is present,
 * the venues for that city are set in bold inside FAQ 2's answer. The words
 * are not changed, only weighted. Spec §6.
 */

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { CITY_VENUES, type LpFaqItem } from '@/content/lp/types'
import { useLpParams } from './lp-params'

function emphasise(text: string, venues: string[]) {
  if (!venues.length) return text
  const re = new RegExp(`(${venues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(re).map((part, i) =>
    venues.includes(part) ? <strong key={i} className="font-semibold text-white">{part}</strong> : part,
  )
}

export default function LpFaq({ items, initialCity }: { items: LpFaqItem[]; initialCity: string }) {
  const p = useLpParams()
  const venues = CITY_VENUES[p.city || initialCity] ?? []
  return (
    <section className="border-t border-white/10">
      <div className="container-wide mx-auto max-w-3xl py-14 md:py-20">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Questions exhibitors ask</h2>
        <Accordion type="single" collapsible className="mt-6">
          {items.map((it, i) => (
            <AccordionItem key={it.q} value={`q${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold md:text-base">{it.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-300">
                {i === 1 ? emphasise(it.a, venues) : it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
