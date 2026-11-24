# Home page opening film and corridor loop

How `public/home-intro/approach-media-opening*` (the first-visit opening) and
`public/home-intro/approach-media-corridor*` (the loop behind the hero) are made.
Every picture comes from the owner's own clips in `clips/` and the official
brand files (the Approach Media brand-guidelines skill: logos and fonts).

## Pieces

- `build2d.py <W> <H> <outdir>` (ffmpeg) renders the two 2D phases into `<outdir>/A.mp4` and `<outdir>/B.mp4`:
  - **A, Imagine:** six extreme close-ups drawn as line art over a brand duotone (blue to teal to green), cut on white flashes.
  - **B, Create:** nine fast cuts under a moving blue and green wash, with the brand line and the company's real figures drifting through.
- `scene.html` (three.js) is the 3D part, driven by a time value: `window.renderAt(t)` returns that frame.
  - **Default mode** (7.8 s): the corridor flight, then the logo's own shapes extruded and filled with project photographs. They settle under the official reverse-white logo, unaltered.
  - **`?mode=loop`** (12 s): one corridor segment repeated, so the cycle is seamless.
- `render3d.js <W> <H> <outdir> [times]` drives `scene.html` in headless Chromium and writes one PNG per frame. Set `MODE=loop` for the loop.
- `assemble.sh <2d dir> <3d frames> <out.mp4>` joins A, B and the 3D frames with white flashes.

## Folder `scene.html` is served from

`render3d.js` loads `http://localhost:4630/opening/scene.html`. Serve a folder that contains an `opening/` directory with:

- `scene.html`
- a `three` symlink to `node_modules/three`
- `logo.svg`, the brand skill's `reverse-white-logo.svg`
- `tex/t01.jpg` to `tex/t16.jpg`, stills from `clips/` at 1024 px wide

Serve it with `python3 -m http.server 4630`.

## Sizes made

| Version | Size |
|---|---|
| Desktop | 1920×960 (2:1) |
| Phone | 720×1280, rendered separately with the logo at 68 % of the width so it survives the crop on narrow screens |

`build2d.py` holds absolute paths to `clips/` and the skill's fonts; adjust them for another machine.
