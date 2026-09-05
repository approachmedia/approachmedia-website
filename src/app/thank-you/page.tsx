import type { Metadata } from 'next'
import Link from 'next/link'
import { LpParamsProvider } from '@/components/lp/lp-params'
import LpHeader from '@/components/lp/LpHeader'
import { LpFooter } from '@/components/lp/LpSections'
import ThankYouBody from './ThankYouBody'

/**
 * Post-submit page for the landing pages. Fires thank_you_view, which is the
 * primary Google Ads conversion (spec §7, §8). noindex.
 */
export const metadata: Metadata = {
  title: { absolute: 'Thank you | Approach Media' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export const dynamic = 'force-dynamic'

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const one = (k: string) => { const v = sp[k]; return (Array.isArray(v) ? v[0] : v) || '' }
  const service = one('service').slice(0, 40)
  const show = one('show').replace(/<[^>]*>/g, '').slice(0, 60)
  const size = one('size').slice(0, 40)

  return (
    <LpParamsProvider>
      <LpHeader />
      <main className="container-wide flex min-h-[70vh] items-center py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">Brief received</p>
          <h1 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">Thank you — your brief is in.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Our design team will call or WhatsApp you within one business day (usually within a few hours) with next steps. Your 3D concept follows within 48 hours of the call.
          </p>

          {(show || size) && (
            <dl className="mx-auto mt-8 inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-2 rounded-xl border border-white/10 bg-[hsl(222,28%,8%)] px-5 py-4 text-left text-sm">
              {show && <><dt className="text-muted-foreground">Show</dt><dd className="font-semibold text-white">{show}</dd></>}
              {size && <><dt className="text-muted-foreground">Stall size</dt><dd className="font-semibold text-white">{size}</dd></>}
            </dl>
          )}

          <ThankYouBody service={service} show={show} size={size} />

          <p className="mt-10 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Back to approachmedia.in</Link>
          </p>
        </div>
      </main>
      <LpFooter />
    </LpParamsProvider>
  )
}
