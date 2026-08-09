/**
 * Emits a schema.org @graph as a JSON-LD script tag.
 *
 * Server-rendered, so the markup is in the HTML on first byte rather than
 * appearing after hydration — which is what crawlers and AI answer engines
 * need in order to see it at all.
 */
export default function JsonLd({ graph }: { graph: Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  )
}
