import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site-url'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — full access to portfolio
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },

      // OpenAI GPTBot — allow portfolio, services, country pages for AI citations
      { userAgent: 'GPTBot', allow: ['/portfolio/', '/services/', '/exhibition-stall-design-agency-'] },

      // Perplexity — allow portfolio and country pages
      { userAgent: 'PerplexityBot', allow: ['/portfolio/', '/exhibition-stall-design-agency-'] },

      // Google AI overview (Gemini indexing)
      { userAgent: 'Google-Extended', allow: ['/portfolio/', '/exhibition-stall-design-agency-'] },

      // Anthropic crawler
      { userAgent: 'anthropic-ai', allow: ['/portfolio/', '/exhibition-stall-design-agency-'] },

      // CCBot (Common Crawl — used for LLM training datasets)
      { userAgent: 'CCBot', allow: ['/portfolio/', '/exhibition-stall-design-agency-'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
