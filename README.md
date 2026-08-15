# Approach Media — approachmedia.in

Next.js (App Router) site for Approach Media Pvt Ltd. Deploys on Railway from
the `claude/build-dynamic-cms-dqNrS` branch; every push triggers a build, and
the deploy is only live once Railway's healthcheck (`/api/health`) passes.

## Publishing a blog post

The blog is a markdown CMS — no database, no admin panel. To publish:

1. Create `content/blog/<slug>.md`. The filename should match the `slug`
   frontmatter field.
2. Use this frontmatter contract (all fields required):

   ```yaml
   ---
   seoTitle: "Title used for the <title> tag and RSS item"
   metaDescription: "Meta description, also the RSS item description"
   slug: "url-slug-of-the-post"
   h1: "The on-page H1 (rendered once — do not repeat it in the body)"
   schema: ["Article", "FAQPage", "BreadcrumbList"]
   author: "Name — Role, Approach Media"
   authorBio: "One-line bio rendered at the foot of the post."
   datePublished: "YYYY-MM-DD"   # publish date — see "Scheduling" below
   dateModified: "YYYY-MM-DD"    # optional; defaults to datePublished
   status: "approved — publish"
   ---
   ```

3. Body rules:
   - Start the body with `# <h1>` (it is stripped at render; the frontmatter
     `h1` is the page H1).
   - A `## FAQ` section with `**Question**` lines followed by answer
     paragraphs is parsed into FAQPage structured data automatically.
   - A bold link alone on a line (`**[Label →](/contact)**`) renders as a
     CTA button.
   - Anything from `### Internal links used in this post` onward is treated
     as implementation notes and never rendered. Register the anchors it
     lists in `src/lib/blog-links.ts` (`INTERNAL_LINKS`), and the hero image
     in `POST_IMAGES` — real Approach Media project photos only.
4. Only posts with `status: "approved — publish"` are rendered. Anything
   else stays invisible.
5. Deploy (push to the deploy branch). The post appears at `/blog/<slug>`,
   in `/blog`, in `sitemap.xml` and in the RSS feed at `/feed.xml`
   automatically. The feed drives the social-automation pipeline, so a
   deploy is also what triggers social distribution.

## Scheduling posts ahead of time

`datePublished` is a real switch, not a label. A post dated in the future is
committed and deployed like any other and then **stays invisible until that
date arrives in India** — absent from `/blog`, the sitemap, the RSS feed, the
homepage cards and every Related block, and its own URL returns 404.

So a batch of posts is written once, deployed once, and publishes itself over
the following weeks. Nobody has to remember to deploy on the day.

**How it goes live.** Two mechanisms, one backing up the other:

- The blog routes revalidate every 15 minutes, so a post whose date has
  arrived appears within that window of the first visit.
- `src/lib/publish-scheduler.ts`, armed by `src/instrumentation.ts` when the
  server boots, calls `/api/revalidate` a few minutes after midnight IST each
  day. That publishes the day's posts before the day's traffic, rather than
  waiting for a visitor to trigger the refresh. It runs inside the existing
  Railway container — no second service, no external cron — and re-arms
  itself from the clock on every restart, so a redeploy cannot lose it.

Dates are evaluated in `Asia/Kolkata`, not the server's UTC. A post dated the
24th goes live at 00:00 IST on the 24th.

**Cross-references between scheduled posts** are handled automatically. A
markdown link to `/blog/<slug>` whose target is not published yet renders as
plain text and becomes a real link the day the target goes live — so a batch
can reference itself freely without anyone sequencing links by hand. The same
rule covers links to posts that do not exist at all.

**To see the schedule:**

```bash
npx tsx scripts/blog-schedule-check.ts   # what is live, what is pending, on which dates
npx tsx scripts/blog-link-audit.ts       # every internal link resolves
```

`POST /api/revalidate` with `{ "secret": "<ADMIN_SECRET>", "scope": "blog" }`
publishes anything due immediately and returns the current live and scheduled
lists — use it to bring a post forward without a deploy.

To pull a scheduled post back, change its `datePublished` or its `status` and
deploy; it disappears again.

### Content guardrails

Never use: "premier", "trusted", "leading", "world-class", "passionate".
The only approved price figure anywhere is ₹7,000–₹25,000 per sq metre
(India, custom, design + fabrication) and its size-table multiples. Do not
add other figures — the posts deliberately omit them.
