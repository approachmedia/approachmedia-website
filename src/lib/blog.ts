import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { INTERNAL_LINKS } from './blog-links'

/**
 * Markdown blog. Posts live in content/blog/<slug>.md.
 *
 * Publishing is by DATE, not by deploy. A file whose datePublished is in the
 * future is committed and deployed like any other, but stays invisible — it
 * is absent from /blog, the sitemap, the feed, the homepage and the Related
 * blocks, and its own URL returns 404 — until that date arrives in India.
 * The routes that read this module use ISR, so the post appears on its date
 * without anyone deploying anything.
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

/** Publishing follows the business's own day, not the server's. Railway runs
 *  in UTC, and without this a post dated the 24th would appear at 05:30 on
 *  the 24th IST — or, worse for an evening date, on the wrong day entirely. */
const PUBLISH_TIMEZONE = 'Asia/Kolkata'

export type BlogFrontmatter = {
  seoTitle: string
  metaDescription: string
  slug: string
  h1: string
  author: string
  authorBio: string
  datePublished: string
  /** Optional: falls back to datePublished when a file does not carry it. */
  dateModified?: string
  status: string
}

export type FaqPair = { q: string; a: string }

export type BlogPost = BlogFrontmatter & {
  /** Rendered HTML body — notes stripped, links applied, CTAs styled. */
  html: string
  faqs: FaqPair[]
  /** Always set — datePublished when the file omits dateModified. */
  dateModified: string
}

// ── publication date ─────────────────────────────────────────

/**
 * Today in India as YYYY-MM-DD. Compared as strings, which is safe because
 * ISO dates sort lexicographically and both sides are the same format — no
 * timezone arithmetic, no off-by-one at month ends.
 */
export function todayInIndia(): string {
  // en-CA formats as YYYY-MM-DD, which is what the frontmatter uses.
  return new Intl.DateTimeFormat('en-CA', { timeZone: PUBLISH_TIMEZONE }).format(new Date())
}

/** A post is live once its publish date is today or earlier, India time. */
function isPublished(post: BlogFrontmatter, today: string): boolean {
  return post.datePublished <= today
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
 * Unlink cross-references to posts that have not published yet.
 *
 * Posts are written as a batch and reference each other, but they go live on
 * different days — the bauma guide links the REI/Battery guide that follows
 * it five days later. Shipping that as a hyperlink means five days of a link
 * to a 404. Rather than tracking it by hand at each deploy, the link is
 * demoted to its own anchor text while the target is unpublished and becomes
 * a real link on its own, the day the target goes live.
 */
function unlinkUnpublished(body: string, publishedSlugs: Set<string>) {
  return body.replace(
    /\[([^\]]+)\]\(\/blog\/([a-z0-9-]+)\)/gi,
    (whole, text: string, slug: string) => (publishedSlugs.has(slug) ? whole : text),
  )
}

/**
 * Turn the anchor phrases from each file's internal-links notes into real
 * links. First case-insensitive occurrence only, never inside a heading,
 * never inside an existing link.
 */
function applyInternalLinks(body: string, slug: string, publishedSlugs: Set<string>) {
  const links = (INTERNAL_LINKS[slug] ?? []).filter(l => {
    // Same rule as unlinkUnpublished, applied before the link is created.
    const target = l.href.match(/^\/blog\/([a-z0-9-]+)$/i)
    return !target || publishedSlugs.has(target[1])
  })
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

type RawPost = { fm: BlogFrontmatter; content: string }

/** Frontmatter only — cheap enough to run over every file before rendering
 *  any of them, which is what deciding the published set requires. */
function readAll(): RawPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8')
      const { data, content } = matter(raw)
      return { fm: data as BlogFrontmatter, content }
    })
    .filter(p => p.fm.status === PUBLISH_STATUS)
}

function render({ fm, content }: RawPost, publishedSlugs: Set<string>): BlogPost {
  let body = stripImplementationNotes(content)
  body = stripLeadingH1(body)
  body = stripUnpublishedReferences(body)
  body = unlinkUnpublished(body, publishedSlugs)
  body = applyInternalLinks(body, fm.slug, publishedSlugs)
  const faqs = extractFaqs(body)
  body = transformCtas(body)

  return {
    ...fm,
    // Schema and OpenGraph both want a modified date; a file that omits it
    // has not been modified since it was written.
    dateModified: fm.dateModified ?? fm.datePublished,
    html: renderMarkdown(body),
    faqs,
  }
}

function sortNewestFirst(posts: BlogPost[]): BlogPost[] {
  // Slug is a stable tiebreak: several posts share a publish date, and
  // without it the order — and so which posts the homepage's top-3 shows —
  // would depend on filesystem read order.
  return posts.sort(
    (a, b) => b.datePublished.localeCompare(a.datePublished) || a.slug.localeCompare(b.slug),
  )
}

/**
 * Every post whose publish date has arrived. This is what the site renders:
 * the index, the sitemap, the feed, the homepage cards and Related blocks all
 * go through here, so a scheduled post cannot leak into any of them.
 */
export function getAllPosts(): BlogPost[] {
  const today = todayInIndia()
  const raw = readAll()
  const publishedSlugs = new Set(raw.filter(p => isPublished(p.fm, today)).map(p => p.fm.slug))

  return sortNewestFirst(
    raw.filter(p => publishedSlugs.has(p.fm.slug)).map(p => render(p, publishedSlugs)),
  )
}

/**
 * Posts still waiting for their date, soonest first. Nothing user-facing
 * reads this — it exists so the publishing schedule can be inspected from
 * the build report and the status endpoint.
 */
export function getScheduledPosts(): { slug: string; h1: string; datePublished: string }[] {
  const today = todayInIndia()
  return readAll()
    .filter(p => !isPublished(p.fm, today))
    .map(p => ({ slug: p.fm.slug, h1: p.fm.h1, datePublished: p.fm.datePublished }))
    .sort((a, b) => a.datePublished.localeCompare(b.datePublished))
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find(p => p.slug === slug) ?? null
}
