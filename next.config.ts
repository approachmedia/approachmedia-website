import type { NextConfig } from 'next'

const config: NextConfig = {
  // Middleware owns trailing slashes instead of Next's built-in 308.
  //
  // That 308 runs before middleware and redirects to whatever host it was
  // asked on, so an indexed `https://approachmedia.in/casestudy/x/` cost three
  // hops — strip slash, add www, then the legacy redirect. Every URL left
  // indexed from the WordPress site ends in a slash, so that was the common
  // case rather than the edge case. Middleware now emits one 301 with both
  // corrections applied; see src/middleware.ts.
  skipTrailingSlashRedirect: true,
  // Inlined at build time, so it is identical for every request a given
  // deploy serves. The sitemap uses it for pages whose content is
  // source-controlled — those genuinely only change when we deploy.
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.approachmedia.in' },
      { protocol: 'https', hostname: 'approachmedia.in' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Cloudflare R2 public bucket — all project/venue media
      { protocol: 'https', hostname: 'pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev' },
    ],
  },
  async redirects() {
    return [
      // Legacy static HTML redirects — add as needed
      { source: '/index.html',    destination: '/',         permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/about.html',    destination: '/about',    permanent: true },
    ]
  },
}

export default config
