# GJAKS Unveil 2026 — BRIEF

Interviewed, not self-authored. The answers below are the client's own, taken
verbatim from `GJAKS-Unveil-Event-Page-FLOW.md` section 1, which the owner
supplied as a completed Step 0. Nothing here was inferred.

## What this page is

A scroll-driven case-study page for one event Approach Media designed and
executed: GJAKS Unveil 2026, the dealer meet where GJAKS LED Lights launched
MLUE Premium Lighting to a full ballroom of dealers. The page is the web
version of the 95-second event film: the same script, the same kinetic
typography, the same beat, driven by the visitor's scroll instead of the music.

The belief it exists to install: **Approach Media turns a dealer meet into a
space people remember, from concept to completion.**

One action, one label everywhere: **Plan your next event** →
`https://www.approachmedia.in/contact` (or WhatsApp +91 94269 12602).

## The eight answers

1. **Vibe in five words:** Bold. Kinetic. Lit. Precise. Confident.
   References: the ZOA studio reel (kinetic mono/sans type, hard colour-card
   cuts); a lighting showroom at night; a product launch keynote title sequence.
2. **Scroll journey, in our words:** Logo reveal → the event in one line → the
   venue arrives → "We imagined it / We built it" → the experience zone piece by
   piece → "Lit to be seen" → the doors open → dealers inside → one impression →
   who built it + call to action.
3. **Energy curve:** Quiet start (black, one dot). Builds through the venue.
   Full energy once the build reveals start. One deliberate silence ("Then the
   doors opened."). Peak on the crowd. Settles to a calm, confident close.
4. **Feeling, stage by stage:** anticipation → curiosity → pride → appetite
   (want to touch the fixtures) → suspense → arrival/energy → conviction →
   trust. **The one moment to remember:** the black silence of "THEN THE DOORS
   OPENED." breaking into a full ballroom as you scroll one notch further.
5. **The one thing no site they've seen does:** the page's headline words are
   *printed by the scroll* the way a dot-matrix printer prints. The Approach
   green dot walks left to right across each line and the letters appear behind
   it, so the visitor literally prints the story by scrolling.
6. **Distance from premium-minimal:** **Editorial-kinetic.** Big uppercase type,
   hard colour cards, mono captions. Not minimal, not maximalist. No gradients,
   no glow, no rounded SaaS cards.
7. **One unbroken world or distinct scenes:** **Distinct scenes / chapters.**
   Hard cuts, like the film. No continuous camera flight.
8. **Assets we have:** the finished film (MP4, 1920×1080, 94.8 s), 25 cut shots
   as 1280×720 MP4 proxies, 10 photos (hero: GJAKS × MLUE photo wall), the
   Approach dot logo (PNG + SVG path), the Approach primary logo (SVG), the
   Inter variable font and DejaVu Sans Mono Bold. No generation needed, no API
   key, no spend.

## Feeling curve

| Act | Feeling | What on screen causes it |
|---|---|---|
| 1 Reveal | anticipation | black, one green dot flickering, then the logo and wordmark snap in |
| 2 Event | curiosity | the title prints itself in mono; one wide resort shot |
| 3 Venue | recognition | three tracking lines over three venue shots |
| 4 Imagined / Built | pride | blue card → white card, second word filling on the beat |
| 5 Experience zone | appetite | fixtures, finishes, details; letters spread and snap |
| 6 Lit to be seen | momentum | the stack scrolls in opposite directions over the panel wall |
| 7 Silence | suspense | pure black, typewriter line, nothing else |
| **8 Doors open (PEAK)** | **arrival** | **the ballroom fills the frame; word columns open from a letterbox** |
| 9 Touched · Compared · Asked | energy | three colour-card flashes, three live shots |
| 10 One impression | conviction | outline stack filling in a diagonal sweep on white |
| 11 Close | trust | dot logo, name, tagline, one action, holds |

## The peak

Act 8. The sentence a visitor would say: *"You scroll through a black screen
that just says 'then the doors opened' and the next notch drops you into a
packed ballroom."* It gets the largest scroll span, the silence before it, and
the highest-bitrate clip.

## Tell-someone sentence

*"It's the site where you print the story yourself by scrolling, and then the
doors open."*

## Authored silence

Act 7 is intentionally empty for 1.2 viewport-heights. The verifier must not
flag it as dead scroll.

## Asset status at build time (deviation from the brief)

Answer 8 lists footage that lives in `Documents/next-videos/event-1/` on the
owner's Mac. None of it is reachable from the build environment: no film, no
25 proxies, no photographs, no logo SVGs. ffmpeg is also absent, so the scrub
clips could not have been encoded even if the footage had been there.

The page is therefore built complete in structure, copy, type motion and the
signature move, with every footage slot rendered as a labelled plate naming the
exact clip that belongs in it (s01, s13, s16 and so on). Dropping the real
files into `public/gjaks/` and flipping one flag swaps every plate for its clip
with no other change. The dot logo is reconstructed as real SVG from the
unit-circle path the brief supplies, so it is the true mark, not a placeholder.
