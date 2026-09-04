# portfolio-case-study

Interviewed, partially. The owner gave the animation direction in writing and
answered three follow-up questions. Where their direction referred to sections
that do not exist on this page, the mapping is mine, at their explicit
instruction ("go through all section of the portfolio page follow content and
then deside your self which animation is best for that section you are full
freedom to select it").

## The eight answers

**1. Vibe.** Not asked again. Carried from the standing brand direction and the
owner's words here: "premium", "dark premium Approach Media visual style",
"smooth, professional, and lightweight". No new references given.

**2. The scroll journey.** The owner supplied a chapter list, but it was the
**city pages'** chapter list, not this page's: "01 The City", "03 The Venues",
"04 The Calendar", "06 The Sectors", "08 Why Us", "09 The Build", "Colophon".
None of those sections exist on a portfolio project page. Reported to the owner
before building. Their answer: decide the mapping myself from the page's own
content. The page's real sequence, which is what the score below is built on:

    hero photograph → intro and project facts → editorial photograph
    → The Brief → editorial photograph → What We Delivered
    → editorial photograph → Case Study (Challenge / Designed / Why It Worked)
    → Gallery: Inside the Build → The Result → closing ask → prev/next

**3. The energy curve.** Not restated. Taken from the owner's peak instruction:
the gallery is the loud moment, everything before it is reference material.

**4. Feeling, stage by stage, and the one moment.** The one moment is the
owner's own answer to the follow-up: **"Pin the Gallery, advance real photos"**,
so that the stall they actually built assembles on screen out of its own
photographs. Stage-by-stage curve below.

**5. One thing no other site does.** Every stall builder's portfolio page is a
grid of photographs under a paragraph. Nobody makes the reader *document* the
build. See the signature move.

**6. How far from premium-minimal.** Stay. Verbatim: "Preserve the dark premium
Approach Media visual style", "Do not change the current font family or
typography style", "Animations must enhance the storytelling, not distract."

**7. One unbroken world, or distinct scenes?** Distinct scenes. This is a
collection of documented objects, not a journey through a place.

**8. Assets.** The owner's own project photography, already in the database and
served from R2. Nothing generated, no API spend. Each project carries one hero
image plus its gallery; captions and alt text are real database fields.

## The reported defect

"the page content is currently not loading properly on mobile." Reproduced at
390px on the built page, and it is a layout failure, not a loading failure. The
content arrives and is then pushed off screen:

- The intro grid is `minmax(0, 1.8fr) minmax(0, 1fr)` with no media query, so
  the Project Details card is about 110px wide on a phone and every value in it
  ("Nile Test Client", "Pharmaceuticals", "Gandhinagar, India") runs off the
  right edge of the screen. Measured 99px of horizontal document overflow.
- The Brief and What We Delivered use a `180px minmax(0, 1fr)` label rail, also
  with no media query. On a 390px screen the rail eats 180px plus a 48px gap,
  leaving ~114px for the content, and the service cards (min-width 220px) sit
  half off screen.
- The hero's four corner labels collide into each other at 390px.

Root cause for all three: `ProjectDetail` is styled entirely with inline React
style objects, and an inline style cannot carry a media query. There was no
mobile layout, only a desktop one that a phone was expected to survive.

## Grammar: gallery / catalog

The visitor's real question on a portfolio page is "what did they build, at what
size, out of what". That is a collection of documented objects, and this page
already speaks in labels: `FactRow` label/value pairs, material chips, an
outcome grid, real captions on every photograph. The grammar was already latent
in the content; nothing had been built to serve it.

Why the other seven lost:

- **Filmic one-shot.** Carries a burden of proof, and this page has no single
  emotional arc to be carried through. It is reference material.
- **Chaptered editorial.** Taken by the city pages, and this page has no
  chapters, only a specimen and its record.
- **Live surface.** There is no product surface to operate.
- **Continuous world.** Would need one unbroken flight through a place. The
  assets are stills of one stand, and the owner asked for distinct scenes.
- **Typographic poster.** Bans photographic ground. The photographs are the
  entire asset here.
- **Split stage.** There is no two-sided argument on a case study.
- **Rhythmic cutlist.** Bans `pin` outright, and the owner's chosen peak is a
  pinned gallery.

## Signature move: the contact sheet develops

The pinned gallery opens as a darkroom contact sheet: every photograph of the
build laid out small, dim and unlabelled. As the reader scrolls, one frame at a
time rises to full plate, takes its real caption, then settles back into the
sheet brighter than it left. The sheet visibly develops as you go and ends fully
exposed, every frame captioned. By the bottom of the section the reader has
documented the stall out of the photographs of the stall.

Real assets only: the frame count is the project's real image count and every
caption is the real `caption` or `altText` field. No invented labels.

## Fingerprint gate

Against **city-chapters**: grammar (chaptered editorial → gallery/catalog),
nav (chapter folio → object index), hero (title page, type only → object one,
photographed and labelled), act shape (11 chapters ~22vh → 7 sections),
close (colophon masthead → inquiry plate set as a label), signature move.
**6 of 6 differ.**

Against **about-walkin**: grammar (filmic one-shot → gallery/catalog),
nav (fixed wordmark + CTA bar → object index), hero (full-bleed scrub with a
kinetic headline → object one, no scrub, no headline treatment),
act shape (scrub·pin·scrub·flow·pin·flow, 6 acts ~12.6vh → different),
close (framed lounge loop + CTA → inquiry plate), signature move.
**6 of 6 differ.**

Passes both.

## Feeling curve

| Section | Feeling | Caused by |
|---|---|---|
| Hero | Arrival | The stand itself, full frame, with its label in the corners. No claim over it |
| Intro and facts | Located | The title beside a specimen card of real measurements, each fact arriving on its own |
| Editorial photograph | Attention | One photograph, alone, drifting inside its frame |
| The Brief | Understanding | The constraint stated plainly, wiping up at the boundary |
| What We Delivered | Competence | The delivered list arriving row by row, then the materials |
| Case Study | Substance | Three blocks in alternating pairs, quiet, nothing shouting |
| **Gallery: Inside the Build** | **Absorption** | **The peak. The contact sheet develops, frame by frame, out of the real photographs** |
| The Result | Settled | The outcome figures, held, after the loud section |
| The ask | Resolved | The inquiry set as one more label in the same schema |

**Authored silence:** the Case Study block is deliberately the quietest section
on the page, immediately before the peak. A verification pass must not read it
as dead scroll.

## The peak

> "It's the site where the stall develops out of its own contact sheet while you
> scroll, and by the end every frame is captioned."

Lives in **Gallery: Inside the Build**, and gets the largest span on the page.

## The tell-someone sentence

*It's the site where a project page makes you develop the photographs of the
build.*

## Hard constraints carried into this build

- **No copy changes.** Every heading, paragraph, label, caption, link text and
  CTA stays byte-identical. These are SEO assets.
- **No font change.** The site's existing display and text families, weights and
  scale are untouched. Verbatim from the owner: "Do not change the current font
  family or typography style."
- Real assets only: the owner's own project photography from the database. No
  generated imagery, no stock, no placeholder content.
- Real figures only. The four closing statistics (23+, 6000+, 14+, 9+) are the
  site's existing numbers and are not changed, added to, or animated into
  anything that implies a different figure.
- Never the words premier, trusted, leading, world-class, passionate in anything
  authored here.
- No visible em dash in authored copy.
