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
   datePublished: "YYYY-MM-DD"
   dateModified: "YYYY-MM-DD"
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

### Content guardrails

Never use: "premier", "trusted", "leading", "world-class", "passionate".
The only approved price figure anywhere is ₹7,000–₹25,000 per sq metre
(India, custom, design + fabrication) and its size-table multiples. Do not
add other figures — the posts deliberately omit them.
