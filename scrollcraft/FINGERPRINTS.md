# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| portfolio-case-study (project pages + /portfolio index) | gallery / catalog | index of objects that jumps: the filter bar held at the top of the collection | object one, photographed and already labelled: the stand at full frame with its four corner labels, no title treatment, no scrub, no cue | stagger·parallax·reveal-up·parallax·stagger·parallax·stagger·pin·stagger·reveal-left, 10 sections, ~13vh | inquiry plate typeset as one more label in the same schema, beside the standing tally | the contact sheet develops: the pinned gallery opens as a dim contact sheet and each frame rises to full plate, takes its real caption and settles back brighter, until the sheet is fully exposed | photographic (the owner's own project photography, nothing generated) | Next.js /portfolio/[slug] + /portfolio |
| city-chapters (15 city landing pages) | chaptered editorial | site header plus a sticky chapter folio that reports the chapter being read | title page: type on the ground, no media above the fold | kinetic·reveal·scrub·parallax·rail·flow·pan·[untouched]·flow·pin·flow·reveal, 11 chapters, ~22vh | colophon masthead plate, the ask set beside running text and held | the plan: the seven process steps draw a stall out of an empty plot, then pack it away again | photographic (owner's own show-floor footage) plus a vector plan | Next.js shared CityPageTemplate |

*(empty: your first build has nothing to clear, so build whatever the interview
points at. From the second onwards, this table is the constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **chaptered editorial** with a **chapter folio** as the running head, the **title-page hero** (type only, no media above
  the fold), the **colophon masthead close**, and the signature move **"the plan draws itself"** (a build sequence that
  constructs an object from a page's own numbered steps and then reverses it). The 10-12 chapter band is claimed.
- **gallery / catalog** with the **held filter bar as the object index**, the **object-one hero** (the first
  photograph, labelled in its corners, with no separate title treatment), the **inquiry plate close** set in the
  page's own label schema, and the signature move **"the contact sheet develops"** (a pinned collection that
  exposes its own frames one at a time and keeps them exposed). The ~13vh at 10 sections band is claimed.
- Note: the `about-walkin` row below sits under "Worked example" rather than in the table above. It is a real build of
  this project's, not an illustration, and the gate was run against it.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.

| about-walkin (approachmedia.in /about) | filmic one-shot | site's own fixed header: wordmark + one CTA | full-bleed scrub of real stall footage, greet kinetic lead headline | scrub·pin·scrub·flow·pin·flow, 6 acts, ~12.6vh | flow section that holds: framed lounge loop + CTA, no pin, no spotlight, no magnet | the install wall: portfolio tiles fly in and mortar into a grid from the peak act's --sc-p while the tally runs to 6,000 | photographic (owner's own footage + photos) | Next.js /about route |
