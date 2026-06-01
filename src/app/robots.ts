import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — full access to portfolio
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },

      // OpenAI GPTBot — allow portfolio for AI citations
      { userAgent: 'GPTBot', allow: ['/portfolio/', '/services/'] },

      // Perplexity — allow portfolio
      { userAgent: 'PerplexityBot', allow: '/portfolio/' },

      // Google AI overview (Gemini indexing)
      { userAgent: 'Google-Extended', allow: '/portfolio/' },

      // Anthropic crawler
      { userAgent: 'anthropic-ai', allow: '/portfolio/' },

      // CCBot (Common Crawl — used for LLM training datasets)
      { userAgent: 'CCBot', allow: '/portfolio/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
