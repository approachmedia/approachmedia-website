/**
 * Liveness probe for Railway's healthcheck.
 *
 * railway.toml previously pointed the healthcheck at `/`. That was fine while
 * middleware only matched `/admin/:path*`, but the moment the matcher widened
 * to cover the whole site, the probe — which arrives with the *.railway.app
 * host — started receiving the canonical-host 301 instead of a 2xx, and two
 * deploys were rolled back.
 *
 * This route exists so the probe has a target that no host rule will ever
 * rewrite. The middleware exempts this path explicitly, so it answers 200
 * whatever host the request carries.
 *
 * Deliberately does not touch the database: a liveness probe should report
 * whether the process is serving, not whether every dependency is healthy.
 * A probe that fails on a transient database blip would roll back a perfectly
 * good deploy.
 */
export const dynamic = 'force-dynamic'

export function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'content-type': 'text/plain', 'cache-control': 'no-store' },
  })
}

export function HEAD() {
  return new Response(null, { status: 200, headers: { 'cache-control': 'no-store' } })
}
