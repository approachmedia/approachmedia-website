/**
 * Next.js calls register() once when the server process starts.
 *
 * Used here to arm the daily blog publish trigger. Guarded to the Node
 * runtime: the hook also runs on the Edge runtime, which has no long-lived
 * process to hold a timer, and it must not run during `next build`.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NEXT_PHASE === 'phase-production-build') return

  const { startPublishScheduler } = await import('@/lib/publish-scheduler')
  startPublishScheduler()
}
