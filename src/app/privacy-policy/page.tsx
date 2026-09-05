import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { ORG_NAME, ORG_EMAIL, ORG_PHONES, ORG_ADDRESS } from '@/lib/seo/organization'
import { GTM_ID } from '@/components/site/Gtm'

/**
 * Privacy policy.
 *
 * Written against what this site actually does, verified in the codebase and
 * against the production environment rather than filled in from a template:
 *
 *  · the only form that collects personal data is /contact, and it is emailed
 *    to info@approachmedia.in through Resend. It is not written to a database;
 *  · there is no analytics, tag manager, advertising pixel or session recorder
 *    anywhere in the app shell. There is no third-party script at all;
 *  · the only cookie the site sets is `admin_auth`, for staff signing in to
 *    the admin area. An ordinary visitor is never issued a cookie;
 *  · typefaces are compiled in by next/font at build time and served from this
 *    domain, so loading a page sends nothing to Google Fonts;
 *  · Google review avatars on the homepage are the one third-party asset a
 *    visitor's browser fetches directly, and that is disclosed below;
 *  · Cloudflare Turnstile is implemented but NOT enabled in production (no
 *    TURNSTILE_SECRET_KEY is set), so it is deliberately not claimed here.
 *
 * The last-updated date is the date this page was published. Change it when
 * the policy changes, not on every deploy.
 */

const UPDATED = '4 September 2026'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Approach Media Pvt. Ltd.' },
  description:
    'How Approach Media Pvt. Ltd. collects, uses, shares and protects personal data submitted through approachmedia.in, and how to exercise your rights.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
}

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-white/10 pt-10">
      <div className="grid gap-6 md:grid-cols-[7rem_minmax(0,1fr)]">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-green">{n}</p>
        <div>
          <h2 className="mb-5 font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">{title}</h2>
          <div className="space-y-4 text-[0.95rem] leading-[1.85] text-muted-foreground [&_a]:text-brand-green [&_a]:underline [&_a]:underline-offset-4 [&_li]:leading-[1.85] [&_strong]:font-semibold [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function Rows({ items }: { items: { k: string; v: React.ReactNode }[] }) {
  return (
    <dl className="my-2 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.02]">
      {items.map(({ k, v }) => (
        <div key={k} className="grid gap-1 p-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">{k}</dt>
          <dd className="m-0 text-[0.9rem] leading-[1.7]">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function PrivacyPolicyPage() {
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/privacy-policy#webpage`,
      url: `${SITE_URL}/privacy-policy`,
      name: 'Privacy Policy',
      description:
        'How Approach Media Pvt. Ltd. collects, uses, shares and protects personal data submitted through approachmedia.in.',
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}#organization` },
      dateModified: '2026-09-04',
    },
    breadcrumb([{ name: 'Privacy Policy', path: '/privacy-policy' }]),
  ]

  return (
    <>
      <JsonLd graph={graph} />

      <main className="container-wide py-16 md:py-24">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <header className="mb-14">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li aria-hidden className="text-white/20">/</li>
                <li className="text-foreground/70">Privacy Policy</li>
              </ol>
            </nav>

            <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-brand-green">Legal</p>
            <h1 className="mb-5 font-display text-4xl font-black uppercase leading-none text-foreground md:text-6xl">
              Privacy Policy
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              This policy explains what personal data {ORG_NAME} collects through approachmedia.in,
              why we collect it, who it reaches, how long we keep it, and what you can ask us to do with it.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
              Last updated: {UPDATED}
            </p>
          </header>

          <div className="space-y-12">

            <Section id="who-we-are" n="01" title="Who we are">
              <p>
                {ORG_NAME} designs, fabricates and installs exhibition stalls and trade show stands.
                We are the data controller for personal data collected through this website. Our registered
                details are:
              </p>
              <Rows items={[
                { k: 'Company', v: ORG_NAME },
                { k: 'Registered office', v: <>{ORG_ADDRESS.streetAddress}, {ORG_ADDRESS.addressLocality}, {ORG_ADDRESS.addressRegion}, India</> },
                { k: 'Email', v: <a href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a> },
                { k: 'Telephone', v: ORG_PHONES.map(p => p.replace(/^\+91/, '+91 ')).join(', ') },
                { k: 'Website', v: <a href={SITE_URL}>{SITE_URL.replace(/^https?:\/\//, '')}</a> },
              ]} />
              <p>
                This policy covers approachmedia.in only. It does not cover exhibition venues, event
                organisers or other websites we link to, each of which handles your data under its own terms.
              </p>
            </Section>

            <Section id="what-we-collect" n="02" title="What we collect">
              <p>
                <strong>Information you give us.</strong> The enquiry form on our{' '}
                <Link href="/contact">contact page</Link> is the only place on this website where you are
                asked for personal data. It collects:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>your name, company name and work email address, which are required;</li>
                <li>your phone number, if you choose to give it;</li>
                <li>project details you enter: exhibition or event name, venue, event city or country, event date, stall and hall number, service of interest, stall size, number of open sides and indicative budget;</li>
                <li>anything you write in the message field;</li>
                <li>a floor plan or brief you attach, if you choose to upload one.</li>
              </ul>
              <p>
                You may also contact us directly by email, telephone or WhatsApp, or through our social
                media profiles. In that case we hold whatever you choose to send us.
              </p>
              <p>
                <strong>Information collected automatically.</strong> When you submit the enquiry form, our
                server reads the IP address the request came from and uses it to rate limit submissions and
                filter automated spam. It is held in memory for ten minutes for that purpose and is not
                written to a database or attached to your enquiry. Our hosting provider also keeps standard
                server logs, described in section 05.
              </p>
              {GTM_ID ? (
                <p>
                  <strong>Measurement and advertising.</strong> This website loads Google Tag Manager, through
                  which Google Analytics and Google Ads conversion measurement run. These record how you reached
                  the site and what you did on it (pages viewed, a form submitted, a phone or WhatsApp button
                  pressed) and may set cookies in your browser for that purpose. If you arrived from a Google
                  advertisement, the click identifier Google attaches to the link is recorded with any enquiry
                  you send, so we can tell which advertisement led to it. We do not run session recording, and
                  we do not buy personal data or build advertising profiles of our own.
                </p>
              ) : (
                <p>
                  <strong>What we do not collect.</strong> This website runs no analytics, no tag manager, no
                  advertising or conversion pixel, no session recording and no cross-site tracking of any kind.
                  We do not buy personal data, and we do not build advertising profiles.
                </p>
              )}
            </Section>

            <Section id="why" n="03" title="Why we use it, and on what basis">
              <Rows items={[
                { k: 'Answering your enquiry', v: 'To read your brief, prepare a design concept or quotation, and reply to you. Without this we cannot respond at all, which is why name, company and email are required.' },
                { k: 'Delivering a project', v: 'Where you go on to appoint us, to plan, fabricate, transport and install your stand, and to coordinate with the venue and organiser.' },
                { k: 'Keeping the form usable', v: 'To rate limit and filter automated submissions, so genuine enquiries reach us.' },
                { k: 'Legal and accounting', v: 'To meet tax, statutory and contractual record-keeping obligations that apply to us in India.' },
              ]} />
              <p>
                We rely on your consent, given when you submit the form, and on our legitimate interest in
                responding to business enquiries and protecting the website from abuse. Where a contract
                follows, we process what is necessary to perform it and to meet our legal obligations.
              </p>
              <p>
                We do not use your enquiry to send marketing unrelated to it, and we do not add you to a
                mailing list without asking.
              </p>
            </Section>

            <Section id="sharing" n="04" title="Who your data reaches">
              <p>
                We do not sell personal data and we do not share it with advertisers. Your enquiry is read by
                our own team. Beyond that, the only parties involved are the service providers that operate
                parts of this website:
              </p>
              <Rows items={[
                { k: 'Resend', v: 'Delivers the enquiry form as an email to our inbox. The contents of your enquiry pass through this service in transit.' },
                { k: 'Railway', v: 'Hosts the website and its database. Standard server logs are generated here.' },
                { k: 'Cloudflare R2', v: 'Stores and serves the photographs and images on this site. Your browser requests images from it when a page loads.' },
                { k: 'Google', v: 'Customer reviews shown on our homepage come from our Google Business Profile. We fetch the text on our server, but reviewer profile pictures are loaded by your browser directly from Google, which means Google can see your IP address and browser details when you view that section.' },
              ]} />
              <p>
                We may also disclose personal data where we are required to by law, by a court, or by a
                regulator, and to our professional advisers where necessary.
              </p>
              <p>
                Where a project involves a venue, organiser, contractor or freight partner, we share only
                what that party needs to let us build and install your stand, such as your company name,
                stall and hall number and site contact details.
              </p>
            </Section>

            <Section id="cookies" n="05" title="Cookies, logs and other technologies">
              {GTM_ID ? (
                <p>
                  <strong>Cookies.</strong> Google Tag Manager, Google Analytics and Google Ads may set cookies
                  in your browser to measure visits and advertising conversions, as described in section 02.
                  You can block or clear these through your browser settings, and Google describes its own
                  handling at <a href="https://policies.google.com/technologies/cookies">policies.google.com</a>.
                  Separately, the site issues one sign-in cookie called <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.85em]">admin_auth</code>,
                  set only when a member of our staff signs in to the private admin area.
                </p>
              ) : (
                <p>
                  <strong>Cookies.</strong> This website does not set advertising, analytics or tracking
                  cookies, and there is no cookie banner because there is nothing to consent to. The only
                  cookie the site issues is a sign-in cookie called <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.85em]">admin_auth</code>,
                  and it is set only when a member of our staff signs in to the private admin area. Browsing
                  the public site does not place a cookie on your device.
                </p>
              )}
              <p>
                <strong>Local browser storage.</strong> Some pages remember small display preferences in
                your own browser, such as a filter you selected. That stays on your device, is not sent to
                us, and can be cleared through your browser settings.
              </p>
              <p>
                <strong>Fonts.</strong> Our typefaces are compiled into the site and served from
                approachmedia.in. Loading a page does not send a request to Google Fonts.
              </p>
              <p>
                <strong>Server logs.</strong> Our host records standard technical information for each
                request, such as IP address, timestamp, page requested, and browser user agent. These logs
                exist for security, debugging and abuse prevention.
              </p>
            </Section>

            <Section id="retention" n="06" title="How long we keep it">
              <p>
                Enquiries arrive as email and remain in our business inbox, so we keep them while there is a
                live or potential commercial relationship and afterwards where a record is needed. Where a
                project goes ahead, we retain project and transaction records for as long as tax and
                statutory rules in India require.
              </p>
              <p>
                The IP address used for rate limiting is discarded after ten minutes. Server logs are kept
                for the period our hosting provider retains them.
              </p>
              <p>
                If you ask us to erase your data and there is no legal or contractual reason to keep it, we
                will delete it. See section 07.
              </p>
            </Section>

            <Section id="rights" n="07" title="Your rights">
              <p>
                Under the Digital Personal Data Protection Act, 2023, and other applicable law, you can ask
                us to:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>confirm what personal data of yours we hold, and give you a copy of it;</li>
                <li>correct anything inaccurate, complete anything incomplete, or update anything out of date;</li>
                <li>erase your data, where we have no legal or contractual reason to keep it;</li>
                <li>withdraw consent you previously gave, which stops further processing that relied on it;</li>
                <li>nominate another person to exercise these rights on your behalf if you are unable to.</li>
              </ul>
              <p>
                If you are in the UK or the European Economic Area, you may additionally have the right to
                object to processing, to restrict it, and to receive your data in a portable form.
              </p>
              <p>
                Write to <a href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a> and we will respond. We may ask you
                to confirm your identity first, so that we do not disclose your data to someone else. If you
                are not satisfied with our response, you may complain to the Data Protection Board of India
                or to the data protection authority in your country.
              </p>
            </Section>

            <Section id="security" n="08" title="How we protect it">
              <p>
                This site is served only over an encrypted HTTPS connection, so what you type into the
                enquiry form is encrypted in transit. The admin area is restricted to authorised staff and
                protected by a second authentication factor. Enquiry emails are held in our business email
                accounts and access is limited to the people who need it.
              </p>
              <p>
                No website or email system can be guaranteed completely secure. Please do not send bank
                details, identity documents, passwords or other sensitive information through the enquiry
                form. If we need anything of that kind for a live project, we will agree a suitable way to
                exchange it with you.
              </p>
            </Section>

            <Section id="transfers" n="09" title="Where your data is processed">
              <p>
                We are based in Ahmedabad, India, and your data is handled here. The service providers listed
                in section 04 operate internationally, so your data may be processed on servers outside
                India. We use established providers that offer contractual protections for personal data.
              </p>
            </Section>

            <Section id="children" n="10" title="Children">
              <p>
                This is a business-to-business website and it is not directed at children. We do not
                knowingly collect personal data from anyone under 18. If you believe a child has sent us
                personal data, write to <a href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a> and we will delete it.
              </p>
            </Section>

            <Section id="changes" n="11" title="Changes to this policy">
              <p>
                We update this policy when what we do changes. The date at the top shows when it was last
                revised. Where a change materially affects how we handle your data, we will make that clear
                on this page.
              </p>
            </Section>

            <Section id="contact" n="12" title="Contact us">
              <p>
                For any question about this policy, or to exercise any of the rights in section 07, contact us:
              </p>
              <Rows items={[
                { k: 'Email', v: <a href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a> },
                { k: 'Telephone', v: ORG_PHONES.map(p => p.replace(/^\+91/, '+91 ')).join(', ') },
                { k: 'Post', v: <>{ORG_NAME}, {ORG_ADDRESS.streetAddress}, {ORG_ADDRESS.addressLocality}, {ORG_ADDRESS.addressRegion}, India</> },
              ]} />
              <p>
                You can also use the form on our <Link href="/contact">contact page</Link>.
              </p>
            </Section>

          </div>
        </div>
      </main>
    </>
  )
}
