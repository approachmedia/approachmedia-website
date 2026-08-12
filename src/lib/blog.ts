import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { INTERNAL_LINKS } from './blog-links'

/**
 * Markdown blog. Posts live in content/blog/<slug>.md and are statically
 * generated at build time — publishing a post is "add a file, deploy".
 *
 * The source files carry implementation notes at the bottom ("Internal links
 * used in this post", "Accuracy notes", "External sources policy"). Those are
 * instructions to this code, not publishable content: everything from the
 * first such heading onward is stripped before rendering, and the links list
 * is applied to the body as real hyperlinks via blog-links.ts.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

/** Only posts whose frontmatter carries this exact status are rendered. */
const PUBLISH_STATUS = 'approved — publish'

export type BlogFrontmatter = {
  seoTitle: string
  metaDescription: string
  slug: string
  h1: string
  author: string
  authorBio: string
  datePublished: string
  dateModified: string
  status: string
}

export type FaqPair = { q: string; a: string }

export type BlogPost = BlogFrontmatter & {
  /** Rendered HTML body — notes stripped, links applied, CTAs styled. */
  html: string
  faqs: FaqPair[]
}

// ── body preparation ─────────────────────────────────────────

/** Cut the implementation-notes tail. Everything from the first of these
 *  headings onward is never rendered. */
function stripImplementationNotes(body: string) {
  const markers = [
    '### Internal links used in this post',
    '### Accuracy notes',
    '### External sources policy',
  ]
  let cut = body.length
  for (const m of markers) {
    const i = body.indexOf(m)
    if (i !== -1 && i < cut) cut = i
  }
  let out = body.slice(0, cut)
  // trim the trailing horizontal rule that precedes the notes block
  out = out.replace(/\n-{3,}\s*$/g, '\n')
  return out.trimEnd() + '\n'
}

/** The frontmatter h1 is rendered by the page component as the single H1, so
 *  the duplicate markdown H1 at the top of the body has to go. */
function stripLeadingH1(body: string) {
  return body.replace(/^\s*# .+\n/, '')
}

/**
 * "(… — link when live.)" refers to a post that is not yet published. The
 * spec says unpublished cross-references must not become dead links; leaving
 * the editorial note visible would be worse. Removed and flagged in the
 * build report — restoring it is a one-line change here.
 */
function stripUnpublishedReferences(body: string) {
  return body.replace(/\s*\((?=[^()]*link when live)[^()]*\)/gi, '')
}

/**
 * Turn the anchor phrases from each file's internal-links notes into real
 * links. First case-insensitive occurrence only, never inside a heading,
 * never inside an existing link.
 */
function applyInternalLinks(body: string, slug: string) {
  const links = INTERNAL_LINKS[slug] ?? []
  const lines = body.split('\n')

  for (const { anchor, href } of links) {
    let done = false
    for (let i = 0; i < lines.length && !done; i++) {
      const line = lines[i]
      if (/^\s*#{1,6}\s/.test(line)) continue            // never inside headings
      if (line.includes(`](${href})`)) { done = true; continue } // already linked
      const idx = line.toLowerCase().indexOf(anchor.toLowerCase())
      if (idx === -1) continue
      // don't nest inside an existing [text](url)
      const before = line.slice(0, idx)
      const opens = (before.match(/\[/g) ?? []).length
      const closes = (before.match(/\]/g) ?? []).length
      if (opens > closes) continue
      const original = line.slice(idx, idx + anchor.length)
      lines[i] = before + `[${original}](${href})` + line.slice(idx + anchor.length)
      done = true
    }
  }
  return lines.join('\n')
}

/**
 * A bold link standing alone on a line is a CTA — render it as the site's
 * button treatment instead of an inline text link.
 */
function transformCtas(body: string) {
  return body.replace(
    /^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*$/gm,
    (_m, label: string, href: string) =>
      `<p class="blog-cta"><a href="${href}">${label}</a></p>`,
  )
}

// ── FAQ extraction (for FAQPage JSON-LD) ─────────────────────

function extractFaqs(body: string): FaqPair[] {
  const m = body.match(/^## FAQ\s*$/m)
  if (!m || m.index === undefined) return []
  const section = body.slice(m.index)
  const next = section.slice(6).search(/^## /m)
  const faqBlock = next === -1 ? section : section.slice(0, next + 6)

  const faqs: FaqPair[] = []
  const re = /\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\*\*|\n## |\n### |$)/g
  let match: RegExpExecArray | null
  while ((match = re.exec(faqBlock)) !== null) {
    const q = match[1].trim()
    // strip markdown links/emphasis from the answer for clean schema text
    const a = match[2]
      .trim()
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*?/g, '')
      .replace(/\s+/g, ' ')
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

// ── loading ──────────────────────────────────────────────────

function renderMarkdown(body: string) {
  marked.setOptions({ gfm: true, breaks: false })
  return marked.parse(body, { async: false }) as string
}

function loadFile(filename: string): BlogPost | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const fm = data as BlogFrontmatter
  if (fm.status !== PUBLISH_STATUS) return null

  let body = stripImplementationNotes(content)
  body = stripLeadingH1(body)
  body = stripUnpublishedReferences(body)
  body = applyInternalLinks(body, fm.slug)
  const faqs = extractFaqs(body)
  body = transformCtas(body)

  return { ...fm, html: renderMarkdown(body), faqs }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .map(loadFile)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find(p => p.slug === slug) ?? null
}
