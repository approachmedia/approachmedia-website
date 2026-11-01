/* GJAKS Unveil 2026 — the dealer-meet page's behaviour.
 *
 * Shipped as a static file rather than rewritten into the React component
 * on purpose: this is the script reviewed and signed off over several
 * rounds, and porting 500 lines into a useEffect would put every one of
 * those fixes back at risk for no gain. The component renders the markup
 * and loads this after the engine.
 *
 * Differences from the standalone build: no film player, no fixed chrome
 * (the site header does that job), and the engine mounts on #gjaks-root.
 */
/* ────────────────────────────────────────────────────────────────
   GJAKS Unveil 2026 — page JS. The engine is untouched; everything
   here reads --sc-p, which the engine publishes on each act element.

   ── THE ONLY THING TO EDIT ─────────────────────────────────────
   Put each slot's real filename in MEDIA below, exactly as it is
   spelled in the bucket, and the page uses it. A slot left as ''
   keeps its labelled plate, so the page is never broken while the
   list is half filled, and a name that turns out to be wrong falls
   back to the plate too rather than showing a black rectangle.

   Clips may be .mp4 or .webm; stills may be .jpg, .jpeg, .png or
   .webp. The slot decides how it is used, not the extension:
   scrub slots are driven by the wheel, the rest loop silently.
   ──────────────────────────────────────────────────────────────── */
const MEDIA_BASE = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/Event/clips/';

const STEM = 'gjaks-unveil-2026-approach-media-v2-1-';

/* Filled in from the ten clips in the repo's clips/ folder, read on
   31 Oct. Six of the ten carry the film's kinetic typography burnt into
   the picture (APPROACH MEDIA, ONE VENUE., ONE EVENING., LIT TO BE SEEN,
   EVERY FIXTURE., ONE BRAND. ONE ROOM.). Those exact words are what this
   page prints as live type, so using those six would show every line
   twice, once baked into the video and once animated over it. They are
   left out and their slots keep the plate until clean exports exist.

   The four below have no burnt-in type: only the venue's own signage,
   which is real and belongs in shot. */
const MEDIA = {
  /* All ten clips placed, at the owner's instruction.

     Six of the ten carry the film's kinetic typography burnt into the
     picture. The first attempt paired those words with the matching line
     on the page, on the theory that agreeing is better than arguing. A
     screenshot killed that theory: matching words land in the same band
     at the same moment, so the film's EVERY FIXTURE and the page's
     "Every finish." printed straight through each other over a cream
     table, measured at 1.01:1.

     So the rule is positional, not semantic. Four acts print type over
     the shot (s01 the title, s13 the three lines, s14 the ticker, s16
     the peak columns) and those four take the only four clean clips.
     The six that carry type go where the page prints nothing over them:
     the three act-3 panels, whose captions sit clear of the type band,
     and the three act-9 flashes, which carry no page type at all.
     Within that, the scrub slots take the longest clean clips they can,
     because a scrub maps the whole span onto the whole duration. */
  s01:          STEM + '04.mp4',   // 2.08s  niche wall, room empty      clean   under the title
  s02:          STEM + '07.mp4',   // 4.28s  outdoor standees            type: ONE VENUE.
  s03:          STEM + '10.mp4',   // 4.28s  arch doorway, crowd         type: ONE EVENING.
  'photo-wall': STEM + '02.mp4',   // 2.12s  resort exterior             type: APPROACH MEDIA
  s13:          STEM + '08.mp4',   // 2.04s  long wall, dealers walking  clean   SCRUBS
  s14:          STEM + '03.mp4',   // 2.08s  MLUE arch, lanterns         clean   under the ticker
  s16:          STEM + '01.mp4',   // 3.20s  dealers at the lit display wall  clean  SCRUBS, the peak
  s20:          STEM + '09.mp4',   // 2.08s  product table close         type: EVERY FIXTURE.
  s21:          STEM + '05.mp4',   // 3.16s  dealers comparing panels    type: ONE BRAND. ONE ROOM.
  s22:          STEM + '06.mp4',   // 5.00s  lit panel wall              type: LIT TO BE SEEN
  film:         '',                // the 95-second film is not in the clips folder
  'film-poster':'',
};

const MEDIA_MOBILE = {
  s01: STEM + '04-720.mp4',  s02: STEM + '07-720.mp4',  s03: STEM + '10-720.mp4',
  'photo-wall': STEM + '02-720.mp4',
  s13: STEM + '08-720.mp4',  s14: STEM + '03-720.mp4',  s16: STEM + '01-720.mp4',
  s20: STEM + '09-720.mp4',  s21: STEM + '05-720.mp4',  s22: STEM + '06-720.mp4',
};

const MEDIA_POSTER = {
  s01: STEM + '04-poster.jpg',  s02: STEM + '07-poster.jpg',  s03: STEM + '10-poster.jpg',
  'photo-wall': STEM + '02-poster.jpg',
  s13: STEM + '08-poster.jpg',  s14: STEM + '03-poster.jpg',  s16: STEM + '01-poster.jpg',
  s20: STEM + '09-poster.jpg',  s21: STEM + '05-poster.jpg',  s22: STEM + '06-poster.jpg',
};

const IS_STILL = /\.(jpe?g|png|webp|avif)(\?|$)/i;

(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── shot slots ──────────────────────────────────────────────
     The plate is always built first and only hidden once the media
     for that slot has actually decoded. A 404, a typo in a filename
     or a codec the browser will not take therefore leaves the
     labelled plate on screen instead of a black hole. ─────────── */
  const url = name => (/^https?:/i.test(name) ? name : MEDIA_BASE + name);

  document.querySelectorAll('.shot-slot').forEach(fig => {
    const id = fig.dataset.shot, cap = fig.dataset.cap || '';
    fig.insertAdjacentHTML('beforeend',
      '<div class="plate"><div><b>' + id + '</b><span>' + cap + '</span></div></div>');

    const file = MEDIA[id];
    if (!file) return;                       // slot not filled in yet

    const ready = () => fig.classList.add('is-live');
    let node;

    if (IS_STILL.test(file)) {
      node = document.createElement('img');
      node.src = url(file); node.alt = cap; node.loading = 'lazy';
      node.addEventListener('load', ready, { once: true });
    } else {
      node = document.createElement('video');
      node.muted = true; node.playsInline = true; node.preload = 'metadata';
      if (MEDIA_POSTER[id]) node.poster = url(MEDIA_POSTER[id]);
      const mob = MEDIA_MOBILE[id];
      if (fig.dataset.scrub === '1') {
        node.setAttribute('data-sc-scrub', '');
        node.setAttribute('data-sc-src', url(file));
        if (mob) node.setAttribute('data-sc-src-mobile', url(mob));
      } else {
        node.src = url(mob && innerWidth <= 640 ? mob : file);
        node.loop = true; node.autoplay = true;
      }
      node.addEventListener('loadeddata', ready, { once: true });
    }
    node.className = 'shot';
    node.addEventListener('error', () => fig.classList.remove('is-live'), { once: true });
    fig.appendChild(node);
    fig.insertAdjacentHTML('beforeend', '<span class="vignette"></span>');
  });

  /* ── the scroll printer ─────────────────────────────────────
     Split each marked line into letters, give every letter its index
     and the line its length, and let CSS do the rest: a letter is
     visible once the dot has passed it. The dot's travel is the line's
     own width, so it lands on the full stop. ───────────────────── */
  function split(el, cls) {
    const text = el.textContent;
    el.setAttribute('aria-label', el.getAttribute('aria-label') || text);
    const letters = [...text];
    el.textContent = '';
    letters.forEach((ch, i) => {
      const s = document.createElement('i');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.setProperty('--pi', i);
      s.setAttribute('aria-hidden', 'true');
      el.appendChild(s);
    });
    el.style.setProperty('--n', letters.length);
    return letters.length;
  }

  /* Every printed line keeps a measured map of where each of its letters
     actually sits, so the dot can be put on the reveal front instead of a
     fraction of the total width. The map is re-measured whenever the line
     changes size: a phone rotating, the fonts finishing loading, or the
     heading re-wrapping to a different number of lines. */
  const printLines = [];

  /* ── keep a line on one line ──────────────────────────────────
     The title is a single statement and reads as one; broken across
     two lines by the browser it split as "GJAKS UNVEIL 20 / 26.",
     because one element per character removes the break opportunity
     at the spaces and the only place left to break is wherever the
     overflow happens to fall. So it does not wrap at all: the type
     steps down until the line fits the column it is in. The floor in
     data-fit is the size below which shrinking further would be worse
     than wrapping, and under that it is allowed to wrap again. */
  function fitOneLine(el) {
    const min = parseFloat(el.dataset.fit) || 12;
    /* The dot is absolutely positioned inside this element and translated
       to wherever it last printed, which counts toward scrollWidth. Once
       it had travelled to the end of the line, scrollWidth read 7px wider
       than the column forever, so every later refit shrank the type again
       and the title collapsed from 121px to 37px. Measure without it. */
    const dot = el.querySelector('.printer-dot');
    const dotDisplay = dot ? dot.style.display : null;
    if (dot) dot.style.display = 'none';
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = '';
    const avail = el.parentElement && el.parentElement.clientWidth;
    if (!avail) { if (dot) dot.style.display = dotDisplay; return; }
    const restore = () => { if (dot) dot.style.display = dotDisplay; };
    let fs = parseFloat(getComputedStyle(el).fontSize);
    for (let i = 0; i < 40 && el.scrollWidth > avail; i++) {
      const next = fs * Math.min(0.97, avail / el.scrollWidth);
      if (next <= min) { fs = min; el.style.fontSize = fs + 'px'; break; }
      fs = next; el.style.fontSize = fs + 'px';
    }
    /* still too wide at the floor: wrapping beats illegible */
    if (el.scrollWidth > avail + 1) el.style.whiteSpace = '';
    restore();
  }

  /* ── left-to-right reveal on the colour cards ────────────────
     Splits only the text, so a nested span such as the dimmed "it."
     survives. Each line reads --lp, its progress through its own cue
     window, and finishes inside the first 70% of that window so the
     finished line is readable for the rest of it. */
  function splitDeep(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const texts = []; let t;
    while ((t = walker.nextNode())) texts.push(t);
    let i = 0;
    texts.forEach(node => {
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach(ch => {
        const g = document.createElement('i');
        g.textContent = ch;
        g.style.setProperty('--pi', i++);
        g.setAttribute('aria-hidden', 'true');
        frag.appendChild(g);
      });
      node.replaceWith(frag);
    });
    el.style.setProperty('--n', i);
    return i;
  }

  const revealed = [...document.querySelectorAll('[data-reveal]')].map(el => {
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.trim());
    splitDeep(el);
    const cueEl = el.closest('[data-sc-cue]');
    const nums = (cueEl ? cueEl.getAttribute('data-sc-cue') : '0 1').trim().split(/\s+/).map(Number);
    const from = isFinite(nums[0]) ? nums[0] : 0;
    const to   = isFinite(nums[1]) ? nums[1] : 1;
    return { el, act: el.closest('[data-sc-act]'), from, to };
  });

  const ramp = (x, a, b) => Math.max(0, Math.min(1, (x - a) / Math.max(0.0001, b - a)));
  const actP = act => (act ? parseFloat(getComputedStyle(act).getPropertyValue('--sc-p')) || 0 : 0);
  const cueWindow = el => {
    const cue = el.closest('[data-sc-cue]');
    const v = (cue ? cue.getAttribute('data-sc-cue') : '0 1').trim().split(/\s+/).map(Number);
    return [isFinite(v[0]) ? v[0] : 0, isFinite(v[1]) ? v[1] : 1];
  };

  /* the repeated stack that opens from its middle line outward */
  const stacks = [...document.querySelectorAll('.rowdrop')].map(box => {
    const rows = [...box.children];
    const mid = (rows.length - 1) / 2;
    rows.forEach((r, i) => r.style.setProperty('--ri', i));
    /* a stack inside an act with no cue of its own states its window */
    const v = box.dataset.stack ? box.dataset.stack.trim().split(/\s+/).map(Number) : null;
    const [from, to] = v && isFinite(v[0]) && isFinite(v[1]) ? v : cueWindow(box);
    return { rows, mid, act: box.closest('[data-sc-act]'), from, to };
  });

  /* the peak's two phases: the arrival hands over to the line it ends on */
  const colGroups = [...document.querySelectorAll('.cols [data-col]')].map(el => ({
    el, phase: el.dataset.col, act: el.closest('[data-sc-act]'),
  }));

  if (!reduced) {
    const run = () => {
      revealed.forEach(r => {
        const span = Math.max(0.001, (r.to - r.from) * 0.7);
        r.el.style.setProperty('--lp', ramp(actP(r.act), r.from, r.from + span).toFixed(4));
      });

      stacks.forEach(s => {
        const lp = ramp(actP(s.act), s.from, s.from + (s.to - s.from) * 0.8);
        s.rows.forEach((row, i) => {
          const d = Math.abs(i - s.mid);              // rings out from the centre
          row.style.setProperty('--rp', ramp(lp, d * 0.22, d * 0.22 + 0.45).toFixed(4));
        });
      });

      colGroups.forEach(c => {
        /* each stack fades itself IN through its own centre-out window;
           this only takes the first group back out again, so the second
           replaces it and then holds to the end of the act */
        const o = c.phase === 'a' ? 1 - ramp(actP(c.act), 0.46, 0.58) : 1;
        c.el.style.setProperty('--go', o.toFixed(3));
      });

      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  } else {
    revealed.forEach(r => r.el.style.setProperty('--lp', '1'));
    stacks.forEach(s => s.rows.forEach(r => r.style.setProperty('--rp', '1')));
  }

  const fitted = [...document.querySelectorAll('[data-fit]')];
  const fitAll = () => fitted.forEach(fitOneLine);
  if (fitted.length) {
    fitAll();
    addEventListener('resize', fitAll, { passive: true });
    addEventListener('orientationchange', fitAll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  }

  function measure(entry) {
    const { el, letters } = entry;
    const base = el.getBoundingClientRect();
    entry.boxes = letters.map(i => {
      const r = i.getBoundingClientRect();
      return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
    });
  }

  document.querySelectorAll('[data-print]').forEach(el => {
    split(el);
    if (reduced) return;
    const dot = document.createElement('span');
    dot.className = 'printer-dot'; dot.setAttribute('aria-hidden', 'true');
    el.appendChild(dot);

    const entry = { el, dot, letters: [...el.querySelectorAll('i')], boxes: [] };
    printLines.push(entry);
    requestAnimationFrame(() => measure(entry));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => measure(entry));
    if (window.ResizeObserver) new ResizeObserver(() => measure(entry)).observe(el);
  });

  /* Place each dot on its line's reveal front, every frame.
     A letter's opacity is clamp(0, p*n - i, 1), so the letter being printed
     right now is index floor(p*n) and it is frac of the way through. The
     dot sits at that exact point, and at p = 1 it comes to rest just past
     the final full stop, which is where the pulse fires. */
  if (printLines.length && !reduced) {
    const place = () => {
      printLines.forEach(entry => {
        const { el, dot, boxes } = entry;
        if (!boxes.length) return;
        const act = el.closest('[data-sc-act]');
        const p = act ? parseFloat(getComputedStyle(act).getPropertyValue('--sc-p')) || 0 : 0;
        const n = boxes.length;
        const f = Math.max(0, Math.min(n, p * n));
        const idx = Math.max(0, Math.min(n - 1, Math.floor(f)));
        const b = boxes[idx];
        const frac = Math.max(0, Math.min(1, f - idx));
        dot.style.setProperty('--dotx', (b.x + b.w * frac) + 'px');
        /* near the baseline of the letter it is printing, not the box bottom */
        dot.style.setProperty('--doty', (b.y + b.h * 0.82) + 'px');
      });
      requestAnimationFrame(place);
    };
    requestAnimationFrame(place);
  }
  document.querySelectorAll('[data-spread]').forEach(el => split(el));

  /* ── act 1, the staged open ─────────────────────────────────
     Five stages cut out of one act's progress. Each is its own 0..1 so the
     CSS above can drive opacity and transform from it, and scrubbing back
     runs the whole thing in reverse rather than snapping. ──────────────── */
  const act1 = document.getElementById('act1');
  if (act1) {
    const A = act1.closest('[data-sc-act]');
    const stage = (p, from, to) => Math.max(0, Math.min(1, (p - from) / (to - from)));
    const word = document.getElementById('a1word');
    const LETTERS = word ? [...word.textContent] : [];
    const GLYPHS = '#*/<>=+-_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (reduced) {
      act1.style.setProperty('--s1', 1); act1.style.setProperty('--s2', 1);
      act1.style.setProperty('--s3', 0); act1.style.setProperty('--s4', 1);
      act1.style.setProperty('--s5', 1);
    } else if (A && word) {
      let frame = 0;
      const paint = () => {
        frame++;
        const p = parseFloat(getComputedStyle(A).getPropertyValue('--sc-p')) || 0;
        /* the dot flickers before it settles: a square wave on the first beat */
        const s1raw = stage(p, 0, 0.16);
        const flicker = s1raw < 1 && (frame >> 1) % 2 === 0 ? 0.25 : 1;
        act1.style.setProperty('--s1', (s1raw * flicker).toFixed(3));
        act1.style.setProperty('--s2', stage(p, 0.14, 0.34).toFixed(3));
        act1.style.setProperty('--s3', stage(p, 0.32, 0.56).toFixed(3));
        act1.style.setProperty('--s4', stage(p, 0.40, 0.62).toFixed(3));
        const s5 = stage(p, 0.62, 0.92);
        act1.style.setProperty('--s5', s5.toFixed(3));
        /* the wordmark scrambles while the stripes wipe, settling left to right */
        if (s5 > 0 && s5 < 1) {
          word.textContent = LETTERS.map((ch, i) =>
            (i + 1) / LETTERS.length <= s5 ? ch : GLYPHS[(frame * 7 + i * 13) % GLYPHS.length]
          ).join('');
        } else if (word.textContent !== 'Approach') {
          word.textContent = 'Approach';
        }
        requestAnimationFrame(paint);
      };
      requestAnimationFrame(paint);
    }
  }

  /* ── scramble-in, the brief's headline entrance ──────────────
     Two random glyphs per letter then settle, left to right, half of them a
     frame late. Runs once when the heading first reaches the viewport. ── */
  function scrambleIn(el) {
    const final = el.textContent;
    const chars = [...final];
    const GLYPHS = '#*/<>=+-_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let f = 0;
    const total = chars.length * 2 + 14;
    const run = () => {
      f++;
      const head = (f / total) * chars.length;
      el.textContent = chars.map((ch, i) => {
        if (ch === ' ') return ' ';
        const late = i % 2 ? 1.4 : 0;
        return i + late < head ? ch : GLYPHS[(f * 5 + i * 11) % GLYPHS.length];
      }).join('');
      if (f < total) requestAnimationFrame(run); else el.textContent = final;
    };
    requestAnimationFrame(run);
  }
  if (!reduced) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting || e.target.dataset.scrambled) return;
        e.target.dataset.scrambled = '1';
        scrambleIn(e.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-scramble]').forEach(el => io.observe(el));
  }

  /* ── act 7, the typewriter in the silence ───────────────── */
  const LINE = 'Then the doors opened.';
  const typed = document.getElementById('typed');
  const silence = document.getElementById('silence');
  if (typed && silence) {
    if (reduced) { typed.textContent = LINE; }
    else {
      const paint = () => {
        const p = parseFloat(getComputedStyle(silence).getPropertyValue('--sc-p')) || 0;
        const n = Math.round(Math.min(1, p / 0.62) * LINE.length);
        const next = LINE.slice(0, n);
        if (next !== typed.textContent) typed.textContent = next;
        requestAnimationFrame(paint);
      };
      requestAnimationFrame(paint);
    }
  }

  /* ── act 10, the diagonal outline sweep ─────────────────── */
  const sweep = document.getElementById('sweep');
  if (sweep) {
    const rows = [...sweep.querySelectorAll('.row')];
    rows.forEach((row, r) => {
      const n = split(row);
      [...row.children].forEach((letter, c) => { letter.dataset.t = ((r + c) / (rows.length + n)).toFixed(3); });
    });
    const act = sweep.closest('[data-sc-act]');
    if (reduced) { sweep.querySelectorAll('i').forEach(i => i.classList.add('lit')); }
    else if (act) {
      const paint = () => {
        const p = parseFloat(getComputedStyle(act).getPropertyValue('--sc-p')) || 0;
        sweep.querySelectorAll('i').forEach(i => i.classList.toggle('lit', p > +i.dataset.t));
        requestAnimationFrame(paint);
      };
      requestAnimationFrame(paint);
    }
  }

  /* the printed lines pulse their dot once they finish */
  const printed = [...document.querySelectorAll('[data-print]')];
  if (printed.length && !reduced) {
    const tick = () => {
      printed.forEach(el => {
        const a = el.closest('[data-sc-act]');
        const p = a ? parseFloat(getComputedStyle(a).getPropertyValue('--sc-p')) || 0 : 0;
        el.dataset.done = p > 0.985 ? '1' : '0';
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();

/* Mounted last, on purpose: the block above builds the shot slots and splits
   every printed line into letters, and the engine measures the DOM it is
   given. Mounting first would have it measure markup that is about to change. */
/* The root is this page's own wrapper, not the whole document: the site
   header and footer live outside it and must not be driven by the engine. */
(function () {
  var root = document.getElementById('gjaks-root');
  if (root && window.ScrollCraft) ScrollCraft.mount(root);
})();
