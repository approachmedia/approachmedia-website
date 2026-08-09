import type { NextConfig } from 'next'

const config: NextConfig = {
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
