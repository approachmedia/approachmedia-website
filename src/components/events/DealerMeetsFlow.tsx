'use client'

/**
 * GJAKS Unveil 2026, the dealer-meet page, as a scroll-driven case study.
 *
 * The markup here is served HTML: every headline, caption and paragraph is
 * real text in reading order, so a crawler or a visitor without JavaScript
 * gets the whole story top to bottom. The engine only animates what is
 * already on the page; it generates no DOM.
 *
 * Behaviour lives in /events/dealer-meets.js rather than in this file. That
 * script is the one reviewed and corrected over several rounds with the
 * owner, and rewriting it into a useEffect would have put all of that back
 * at risk. This component renders the markup, then loads the engine and the
 * script in that order, because the script measures the DOM the engine is
 * about to drive.
 *
 * Footage comes from R2, not from the app: ten clips, their 720 variants and
 * their poster frames, about 18MB in all, which has no business sitting in
 * the repository or being served by Railway.
 */

import { useEffect } from 'react'

/** Loads a script once per document and resolves when it is ready. */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-src="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === '1') resolve()
      else existing.addEventListener('load', () => resolve(), { once: true })
      return
    }
    const el = document.createElement('script')
    el.src = src
    el.async = false
    el.dataset.src = src
    el.addEventListener('load', () => { el.dataset.loaded = '1'; resolve() }, { once: true })
    el.addEventListener('error', () => reject(new Error(`failed to load ${src}`)), { once: true })
    document.head.appendChild(el)
  })
}

export default function DealerMeetsFlow() {
  useEffect(() => {
    let cancelled = false
    loadScript('/events/scrollcraft.js')
      .then(() => { if (!cancelled) return loadScript('/events/dealer-meets.js') })
      .catch(() => {
        /* The page stays readable without either file: the copy is all real
           markup and every footage slot keeps its labelled plate. */
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="sc-scope gjaks" id="gjaks-root">
      <span data-sc-progress />

      {/* 1 · REVEAL · pin + bespoke · anticipation */}
      <section data-sc-act="pin" data-sc-span="2.0" data-sc-drift="#0B0B0D" aria-label="Approach Media">
        <div data-sc-stage>
          <div className="gj-stage a1" id="act1">
            <span className="markbox" aria-hidden="true">
              <svg viewBox="-1 -1 2 2">
                <circle cx="0" cy="0" r="1" fill="#53B618" />
                <path className="cut" d="M 0.672 0.398 L 0.551 0.207 L -0.305 0.203 L 0.129 -0.457 L 0.008 -0.664 L -0.676 0.398 Z" fill="#F4F4F2" />
              </svg>
            </span>
            <span className="stripes" aria-hidden="true"><b /><b /><b /></span>
            <div className="wordrow">
              <p className="word ghost ghost--g" aria-hidden="true">Approach</p>
              <p className="word ghost ghost--b" aria-hidden="true">Approach</p>
              <p className="word hollow" aria-hidden="true">Approach</p>
              <p className="word solid" id="a1word">Approach</p>
            </div>
            <p className="gj-mono gj-mono--sm sub">Imagine · Create · Deliver</p>
          </div>
        </div>
      </section>

      {/* 2 · EVENT · pin + dot-print · curiosity */}
      <section data-sc-act="pin" data-sc-span="2.2" data-sc-drift="#0B0B0D" aria-label="GJAKS Unveil 2026">
        <div data-sc-stage>
          <div className="gj-stage center">
            <figure className="shot-slot" data-shot="s01" data-cap="Golf-cart ride through the hills, the arrival shot" aria-hidden="true" />
            <div className="gj-wrap" style={{ position: 'relative', zIndex: 4 }}>
              <h1 className="gj-h gj-h--xl print on-shot" data-print data-fit="22" aria-label="GJAKS Unveil 2026">GJAKS Unveil 2026</h1>
              <p className="gj-mono on-shot" data-fit="10" style={{ color: 'var(--sc-accent)', marginTop: 18 }}>
                Dealer Meet · MLUE Premium Lighting by GJAKS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · VENUE · pan · recognition */}
      <section data-sc-act="pan" data-sc-span="2.6" aria-label="One venue, one evening, one first impression">
        <div data-sc-stage>
          <div className="rail" data-sc-pan="0">
            <figure className="shot-slot" data-shot="s02" data-cap="Outdoor product standees at the entrance">
              <figcaption className="cap gj-wrap"><span className="gj-h print widen on-shot" data-print aria-label="One venue.">One venue.</span></figcaption>
            </figure>
            <figure className="shot-slot" data-shot="s03" data-cap="Lobby arch and welcome standee">
              <figcaption className="cap gj-wrap"><span className="gj-h print widen on-shot" data-print aria-label="One evening.">One evening.</span></figcaption>
            </figure>
            <figure className="shot-slot" data-shot="photo-wall" data-cap="GJAKS × MLUE 3D letters, the photo wall">
              <figcaption className="cap gj-wrap"><span className="gj-h print widen on-shot" data-print aria-label="One first impression.">One first impression.</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4 · IMAGINED / BUILT · pin + cued colour cards · pride */}
      <section data-sc-act="pin" data-sc-span="2.8" aria-label="We imagined it, we built it">
        <div data-sc-stage>
          <div className="gj-stage">
            <div className="cardlayer card--blue" data-sc-cue="0 0.38 0">
              <h2 className="gj-h gj-h--xl reveal" data-reveal aria-label="We imagined it.">We imagined <span className="fill2">it.</span></h2>
            </div>
            <div className="cardlayer card--white" data-sc-cue="0.34 0.68">
              <h2 className="gj-h gj-h--xl reveal" data-reveal aria-label="We built it.">We built <span className="fill2">it.</span></h2>
            </div>
            <div className="cardlayer card--green rowdrop" data-sc-cue="0.64 1 0.3 0">
              <p className="gj-h">A premium lighting experience</p>
              <p className="gj-h">A premium lighting experience</p>
              <p className="gj-h">A premium lighting experience</p>
              <p className="gj-h">A premium lighting experience</p>
              <p className="gj-h">A premium lighting experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · EXPERIENCE ZONE · scrub · appetite */}
      <section data-sc-act="scrub" data-sc-span="2.6" data-sc-dwell="0.3" aria-label="Every fixture, every finish, every detail">
        <div data-sc-stage>
          <figure className="shot-slot scrim-left" data-shot="s13" data-cap="Long panel wall, tracking shot (scrubs under the type)" data-scrub="1" aria-hidden="true" />
          <div className="gj-wrap" style={{ position: 'relative', zIndex: 4, display: 'grid', alignContent: 'center', height: '100%' }}>
            <p className="gj-mono spread on-shot" data-spread data-sc-cue="0 0.34 0" aria-label="Every fixture.">Every fixture.</p>
            <p className="gj-mono spread on-shot" data-spread data-sc-cue="0.3 0.66" aria-label="Every finish.">Every finish.</p>
            <p className="gj-mono spread on-shot" data-spread data-sc-cue="0.62 1 0.3 0" aria-label="Every detail.">Every detail.</p>
          </div>
        </div>
      </section>

      {/* 6 · LIT TO BE SEEN · ticker · momentum */}
      <section data-sc-act="pin" data-sc-span="2.0" aria-label="Lit to be seen">
        <div data-sc-stage>
          <figure className="shot-slot" data-shot="s14" data-cap="Morning wide of the finished space" aria-hidden="true" />
          <div className="ticker" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <p key={i}>Lit to be seen</p>)}
          </div>
          <h2 className="sr-only">Lit to be seen</h2>
        </div>
      </section>

      {/* 7 · SILENCE · pin · suspense · AUTHORED EMPTY, not dead scroll */}
      <section data-sc-act="pin" data-sc-span="1.8" data-sc-drift="#172F9D" aria-label="Then the doors opened" id="silence">
        <div data-sc-stage>
          <div className="gj-stage silence">
            <h2 className="gj-mono" id="typeline" aria-label="Then the doors opened.">
              <span id="typed" /><span className="cursor" aria-hidden="true" />
            </h2>
          </div>
        </div>
      </section>

      {/* 8 · DOORS OPEN · scrub + letterbox · PEAK · arrival */}
      <section data-sc-act="scrub" data-sc-span="3.6" data-sc-dwell="0.28" aria-label="Dealers walked in and stayed">
        <div data-sc-stage>
          <figure className="shot-slot" data-shot="s16" data-cap="Ballroom wide, LED screen, the room full" data-scrub="1" aria-hidden="true" />
          <span className="bar bar--t" aria-hidden="true" />
          <span className="bar bar--b" aria-hidden="true" />
          <div className="cols">
            <h2 className="sr-only">Dealers walked in. And stayed.</h2>
            <div className="colstack rowdrop" data-col="a" data-stack="0.04 0.44" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => <p key={i} className="gj-h on-shot">Dealers walked in.</p>)}
            </div>
            <div className="colstack rowdrop" data-col="b" data-stack="0.54 0.95" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => <p key={i} className="gj-h on-shot">And stayed.</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* 9 · TOUCHED · COMPARED · ASKED · pin + card flash · energy */}
      <section data-sc-act="pin" data-sc-span="4.5" aria-label="Touched, compared, asked">
        <div data-sc-stage>
          <div className="gj-stage">
            <div className="cardlayer card--blue" data-sc-cue="0 0.19 0">
              <h2 className="gj-h gj-h--xl reveal" data-reveal aria-label="Touched.">Touched.</h2>
            </div>
            <div className="cardlayer" data-sc-cue="0.17 0.36">
              <figure className="shot-slot" data-shot="s20" data-cap="Hands on the fixtures" aria-hidden="true" />
            </div>
            <div className="cardlayer card--green" data-sc-cue="0.34 0.53">
              <h2 className="gj-h gj-h--xl reveal" data-reveal aria-label="Compared.">Compared.</h2>
            </div>
            <div className="cardlayer" data-sc-cue="0.51 0.70">
              <figure className="shot-slot" data-shot="s21" data-cap="Dealers comparing panels" aria-hidden="true" />
            </div>
            <div className="cardlayer card--dark" data-sc-cue="0.68 0.86">
              <h2 className="gj-h gj-h--xl reveal" data-reveal aria-label="Asked.">Asked.</h2>
            </div>
            <div className="cardlayer" data-sc-cue="0.84 1 0.3 0">
              <figure className="shot-slot" data-shot="s22" data-cap="Asking at the product table" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* 10 · ONE IMPRESSION · pin + outline sweep · conviction */}
      <section data-sc-act="pin" data-sc-span="2.0" aria-label="One brand, one room, one impression">
        <div data-sc-stage>
          <div className="gj-stage sweep center" id="sweep">
            <h2 className="sr-only">One brand. One room. One impression.</h2>
            {Array.from({ length: 7 }, (_, i) => <p key={i} className="row" aria-hidden="true">One impression.</p>)}
          </div>
        </div>
      </section>
    </div>
  )
}
