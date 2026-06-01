import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.approachmedia.in' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
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
