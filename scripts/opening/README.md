# Home page opening film, its music, and the corridor loop

How the files in `public/home-intro/` are made:

- `approach-media-opening*`: the first-visit film behind the Enter screen.
- `approach-media-corridor*`: the loop behind the hero.

Every picture comes from the owner's own clips in `clips/` and the official brand files: the logos and fonts in the Approach Media brand-guidelines skill. The music is an original composition.

## Pieces

- `lineart.py <W> <H> <outdir>` (OpenCV) draws the Imagine phase.
  - Six close-ups, each traced as smooth anti-aliased lines over a brand duotone (blue to teal to green).
  - Drawn at twice the output size, into `<outdir>/la0..5.png`.
- `build2d.py <W> <H> <outdir>` (ffmpeg) renders the two 2D phases from those drawings and the clips.
  - **A, Imagine:** pushes into the drawings, cut on white flashes.
  - **B, Create:** nine cuts under a moving blue and green wash, with the brand line and the real figures.
- `scene.html` (three.js) is the 3D part. `window.renderAt(t)` returns one frame.
  - **Default mode:** the corridor flight, then the logo's own shapes extruded. Faces are filled with project photographs; the wedge sides are blue (left) and green (centre). The official colour logo settles over them.
  - **`?mode=loop`:** a seamless 12 s corridor.
  - **`?ss=1.5`:** supersamples the render.
- `render3d.js <W> <H> <outdir> [times]` drives `scene.html` in headless Chromium.
  - Environment variables: `SS` sets supersampling; `MODE=loop` selects the loop; `DUR` sets seconds when no times are given.
- `rect.js <W> <H> <t>` prints where the logo sits on screen at time `t`.
- `plate.html` / `plate.js` render the closing frame at 2x.
  - The official colour logo on Soft White, placed over that rectangle.
- `assemble2.sh <2d dir> <3d frames> <plate> <W> <H> <out>` joins the sequence:
  - Imagine, flash, Create, flash, 3D, dissolve, then the closing frame with a slow push.
- `compose-music.py <1|2|3> <out.wav>` composes the three music options.
  - Notes are placed at the film's exact cut times.
  - Rendered with the FluidR3 General MIDI orchestra (`fluidsynth`, `fluid-soundfont-gm`), mixed with synthesised impacts, risers and whooshes.
  - Option 2 (hybrid trailer) is the one in use. It is levelled to about -15 LUFS with a peak limiter.

## Folder `scene.html` and `plate.html` are served from

`http://localhost:4630/opening/` must hold:

- `scene.html`, `plate.html`
- a `three` symlink to `node_modules/three`
- `logo.svg` (the skill's `reverse-white-logo.svg`) and `logo-color.svg` (its `primary-logo.svg`)
- `tex/t01.jpg` to `tex/t16.jpg`, stills from `clips/` at 1024 px wide

Serve it with `python3 -m http.server 4630`.

## Sizes made

| Version | Size |
|---|---|
| Desktop | 1920×1080 |
| Phone | 1080×1920, with the logo at 68 % of the width so it survives the crop on narrow screens |

The scripts hold absolute paths to `clips/` and the skill's fonts and logos; adjust them for another machine.
