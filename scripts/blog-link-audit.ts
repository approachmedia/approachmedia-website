/**
 * Resolve every internal link the blog posts point at.
 *
 * Posts are written in batches that cross-reference each other and the rest
 * of the site, and a link written today can name a page that does not exist
 * yet. This walks the actual routes on disk — app directory, expo data,
 * blog files — and reports anything that would render as a 404.
 *
 * Body links only: the "Internal links used in this post" notes are stripped
 * before render, so a path mentioned only there is a note to us, not a link.
 *
 * Run: npx tsx scripts/blog-link-audit.ts
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const APP = path.join(ROOT, 'src', 'app')
const CONTENT = path.join(ROOT, 'content', 'blog')

// ── every route the app can serve ────────────────────────────

function staticRoutes(dir: string, prefix = ''): Set<string> {
  const out = new Set<string>()
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const name = entry.name
    // route groups don't appear in the URL; private and dynamic dirs are
    // handled separately
    if (name.startsWith('_') || name.startsWith('.')) continue
    const segment = name.startsWith('(') && name.endsWith(')') ? '' : `/${name}`
    if (name.startsWith('[')) continue
    const full = prefix + segment
    const dirPath = path.join(dir, name)
    if (fs.existsSync(path.join(dirPath, 'page.tsx')) || fs.existsSync(path.join(dirPath, 'page.ts'))) {
      out.add(full || '/')
    }
    for (const r of staticRoutes(dirPath, full)) out.add(r)
  }
  return out
}

const routes = staticRoutes(APP)
if (fs.existsSync(path.join(APP, 'page.tsx'))) routes.add('/')

const expoSlugs = new Set<string>(
  (JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/expo-pages.json'), 'utf8')) as { slug: string }[])
    .map(e => `/expos/${e.slug}`),
)

const blogFiles = fs.readdirSync(CONTENT).filter(f => f.endsWith('.md'))
const blogBySlug = new Map<string, { datePublished: string; file: string }>()
for (const f of blogFiles) {
  const fm = matter(fs.readFileSync(path.join(CONTENT, f), 'utf8')).data as {
    slug: string; datePublished: string
  }
  blogBySlug.set(`/blog/${fm.slug}`, { datePublished: fm.datePublished, file: f })
}

// ── check each post's body links ─────────────────────────────

const NOTE_MARKERS = [
  '### Internal links used in this post',
  '### Accuracy notes',
  '### External sources policy',
]

function bodyOf(raw: string): string {
  const { content } = matter(raw)
  let cut = content.length
  for (const m of NOTE_MARKERS) {
    const i = content.indexOf(m)
    if (i !== -1 && i < cut) cut = i
  }
  return content.slice(0, cut)
}

let missing = 0
let scheduled = 0

console.log('\nInternal links in blog bodies\n')

for (const file of blogFiles.sort()) {
  const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8')
  const body = bodyOf(raw)
  const hrefs = [...body.matchAll(/\]\((\/[^)#?\s]*)/g)].map(m => m[1])
  const unique = [...new Set(hrefs)]
  if (unique.length === 0) continue

  const problems: string[] = []
  for (const href of unique) {
    const clean = href.replace(/\/$/, '') || '/'
    if (routes.has(clean) || expoSlugs.has(clean)) continue
    const post = blogBySlug.get(clean)
    if (post) {
      // exists as a file — may simply not be published yet, which the
      // renderer handles by demoting the link to plain text
      if (post.datePublished > new Date().toISOString().slice(0, 10)) {
        problems.push(`  scheduled  ${clean}  (publishes ${post.datePublished} — rendered as plain text until then)`)
        scheduled++
      }
      continue
    }
    problems.push(`  MISSING    ${clean}`)
    missing++
  }

  if (problems.length) {
    console.log(file)
    problems.forEach(p => console.log(p))
    console.log()
  }
}

console.log(
  missing === 0
    ? `No broken links. ${scheduled} link(s) point at scheduled posts and are auto-unlinked until live.\n`
    : `${missing} link(s) point at pages that do not exist.\n`,
)
process.exit(missing === 0 ? 0 : 1)
