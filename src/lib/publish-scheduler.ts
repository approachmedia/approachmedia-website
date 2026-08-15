/**
 * Daily publish trigger.
 *
 * Posts carry their own publish date and the blog routes revalidate on a
 * timer, so a scheduled post would appear on its date regardless. But ISR
 * only regenerates when someone asks for the page: on a quiet night a post
 * dated the 24th could sit unseen until the first visitor of the morning,
 * and the first visitor gets the stale copy while the fresh one builds
 * behind them.
 *
 * This closes that gap from inside the container — no second Railway
 * service, no external cron, nothing to configure. Shortly after midnight in
 * India the server calls its own revalidate endpoint over loopback, so
 * anything dated that day is live before the day's traffic arrives.
 *
 * If the container restarts, register() runs again and the next fire time is
 * recomputed from the clock, so a redeploy cannot lose the schedule. Running
 * more than one replica just means the revalidation happens more than once,
 * which costs nothing.
 */

const PUBLISH_TIMEZONE = 'Asia/Kolkata'

/** Minutes past midnight IST. A few minutes of margin absorbs clock skew, so
 *  a post dated the 24th is never evaluated a second before the 24th. */
const FIRE_AT_MINUTES = 5

/** Guards against two registrations in one process (Next can call the
 *  instrumentation hook more than once in development). */
let scheduled = false

/** Milliseconds until the next FIRE_AT_MINUTES past midnight, India time. */
export function msUntilNextRun(now: Date = new Date()): number {
  // What time is it in India right now, as wall-clock minutes?
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: PUBLISH_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (t: string) => Number(parts.find(p => p.type === t)?.value ?? 0)
  const secondsIntoDay = get('hour') * 3600 + get('minute') * 60 + get('second')
  const target = FIRE_AT_MINUTES * 60

  const secondsAway = target > secondsIntoDay
    ? target - secondsIntoDay
    : 86_400 - secondsIntoDay + target

  return secondsAway * 1000
}

async function revalidate(): Promise<void> {
  const secret = process.env.ADMIN_SECRET
  const port = process.env.PORT || '3000'
  const base = `http://127.0.0.1:${port}`

  try {
    if (secret) {
      const res = await fetch(`${base}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, scope: 'blog' }),
      })
      const body = await res.json() as {
        published?: string[]
        scheduled?: { slug: string; datePublished: string }[]
      }
      console.log(
        `[publish] revalidated — ${body.published?.length ?? 0} live, ` +
        `${body.scheduled?.length ?? 0} scheduled` +
        (body.scheduled?.length
          ? ` (next: ${body.scheduled[0].slug} on ${body.scheduled[0].datePublished})`
          : ''),
      )
    } else {
      // No secret configured: fall back to warming the public pages, which
      // triggers the same regeneration without privileged access.
      console.warn('[publish] ADMIN_SECRET not set — warming pages instead of revalidating')
      for (const path of ['/blog', '/feed.xml']) {
        await fetch(`${base}${path}`, { cache: 'no-store' }).catch(() => {})
        await fetch(`${base}${path}`, { cache: 'no-store' }).catch(() => {})
      }
    }
  } catch (err) {
    // Never throw out of the timer — an unhandled rejection here would take
    // the server down over a cache refresh.
    console.error('[publish] revalidation failed', err)
  }
}

function queueNext(): void {
  const wait = msUntilNextRun()
  const timer = setTimeout(async () => {
    await revalidate()
    queueNext()
  }, wait)
  // Do not hold the event loop open on shutdown.
  timer.unref?.()
  console.log(`[publish] next run in ${Math.round(wait / 60000)} minutes`)
}

export function startPublishScheduler(): void {
  if (scheduled) return
  scheduled = true
  queueNext()
}
