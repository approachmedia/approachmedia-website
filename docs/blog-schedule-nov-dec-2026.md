# Blog schedule, 27 Oct 2026 to 7 Jan 2027

Twenty-seven posts are committed and dated. **Nothing needs to be deployed, rebuilt
or clicked for them to appear.** Each one goes live on its own date and nobody has
to be at a desk.

## How a post goes live

`src/lib/blog.ts` compares each file's `datePublished` against today's date in
Asia/Kolkata. Before that date the post is invisible everywhere: the index, the
sitemap, the feed, the homepage cards, Related blocks, and its own URL, which
404s. On the date, the same code finds it and the page renders.

The blog index, the post route and the feed are ISR with `revalidate = 900`, so a
post appears **within fifteen minutes of midnight India time** on its date. The
sitemap and the homepage are `force-dynamic` and so are always current.

This is worth being explicit about, because it is the opposite of how a statically
built site works, and the brief for this batch assumed a static build:

- **No daily rebuild is needed.** No GitHub Actions cron, no deploy hook, no
  Railway scheduled job. Adding one would do nothing except burn build minutes.
- **No manual redeploy checklist is needed either.** There is no Mon/Thu/Sat
  routine to keep.
- A deploy is only needed to change what is *in* a post, or to add a new one.

## The schedule

| Publish | Slug |
|---|---|
| 2026-10-27 | zak-doors-windows-expo-2026-exhibitor-guide |
| 2026-10-29 | *reserved — REI / Battery Show case study, awaiting photos* |
| 2026-10-31 | bharat-mandapam-exhibitor-guide |
| 2026-11-03 | khadhya-khurak-2026-exhibitor-guide |
| 2026-11-05 | asia-coat-ink-show-2026-exhibitor-guide |
| 2026-11-07 | whx-dubai-2027-indian-exhibitors-guide |
| 2026-11-10 | india-trade-shows-jan-mar-2027-calendar |
| 2026-11-12 | imtex-2027-exhibitor-guide |
| 2026-11-14 | heimtextil-2027-indian-exhibitors-guide |
| 2026-11-17 | indusfood-2027-exhibitor-guide |
| 2026-11-19 | stall-fabricator-checklist-questions |
| 2026-11-21 | plastivision-2027-exhibitor-guide |
| 2026-11-24 | dwtc-vs-dubai-exhibition-centre-guide |
| 2026-11-26 | bharat-mobility-2027-exhibitor-guide |
| 2026-11-28 | exhibition-budget-planning-2027 |
| 2026-12-01 | *reserved — CPHI & PMEC delivery case study, awaiting photos* |
| 2026-12-03 | elecrama-2027-exhibitor-guide |
| 2026-12-05 | stall-design-brief-template |
| 2026-12-08 | ambiente-2027-indian-exhibitors-guide |
| 2026-12-10 | biec-bengaluru-exhibitor-guide |
| 2026-12-12 | *reserved — India ITME delivery case study, awaiting photos* |
| 2026-12-15 | ifex-2027-exhibitor-guide |
| 2026-12-17 | logimat-india-2027-exhibitor-guide |
| 2026-12-19 | real-budget-of-exhibiting-india |
| 2026-12-22 | india-energy-week-2027-exhibitor-guide |
| 2026-12-24 | 9-sqm-stall-design-guide |
| 2026-12-29 | gulfood-2027-indian-exhibitors-guide |
| 2026-12-31 | plastivision-arabplast-2027-plastics-quarter |
| 2027-01-05 | europe-food-shows-q1-2027-guide |
| 2027-01-07 | exhibition-roi-measurement |

The three reserved dates need no code. Drop the case-study file in with that
`datePublished` and it flows through the same gate.

## Cross-links between scheduled posts

Several posts link to posts that publish later. Those links are not dead and are
not hand-managed: `unlinkUnpublished()` renders a link to an unpublished post as
its own anchor text, and it becomes a real hyperlink by itself the day the target
goes live. Nobody edits anything.

Two anchors point at posts that **do not exist anywhere**, so they will stay as
plain text until somebody writes them:

| Missing target | Referenced by |
|---|---|
| `/blog/bombay-exhibition-centre-nesco-exhibitor-guide` | asia-coat-ink-show, logimat-india-2027, plastivision-2027, plastivision-arabplast |
| `/blog/iphex-2026-exhibitor-guide` | whx-dubai-2027 |

Four posts wanting a NESCO venue guide is a reasonable argument for writing one.

## Refresh discipline

Each event guide carries a `Last checked: 25 October 2026` line.

- **Re-verify each guide against the official show site two to three weeks before
  its event**, and update that line.
- **The Q1 calendar hub** (`india-trade-shows-jan-mar-2027-calendar`) re-verifies
  every date on **15 Dec 2026** and again on **15 Jan 2027**.
- That hub gains **AAHAR** and **ACETECH** rows only once those shows are
  officially dated.

## Search Console

The sitemap is generated per request, so it always lists exactly the posts that
are live. Submitting `https://www.approachmedia.in/sitemap.xml` once in Search
Console covers every future post; there is nothing to resubmit per post.

Google retired the sitemap ping endpoint in 2023, so there is no ping to automate.
If a particular post needs to be indexed quickly, use **URL Inspection → Request
Indexing** in Search Console by hand on the day it goes live. Otherwise the
sitemap does the work.

## Images

None of the 27 has a hero image assigned, which is deliberate: they take the
typographic header. To give one a photograph later, add an entry to `POST_IMAGES`
in `src/lib/blog-links.ts` — and only a real Approach Media project photo, never
stock and never generated.
