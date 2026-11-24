"use client";

// Cover Flow by Louis Studios.
// 200 more hand-made React components at https://studios.lou15.com/?ref=21st-code

import * as React from "react";

/** The built-in code-drawn cover artworks. */
export type CoverFlowArt =
  | "rose-static"
  | "amber-room"
  | "high-kite"
  | "meadow-hum"
  | "blue-hour"
  | "open-door"
  | "ember-season"
  | "paper-comets"
  | "glasshouse"
  | "tidal-lines";

/** One cover in the flow. */
export interface CoverFlowItem {
  /** Title shown on the centre cover. */
  title: string;
  /** Second caption line under the title, for example the artist. */
  subtitle?: string;
  /** Image URL for the cover. Square images look best; anything else is cropped to fill. */
  src?: string;
  /** One of the built-in code-drawn artworks, used when there is no src. */
  art?: CoverFlowArt;
  /** Alternative text for the cover image. Defaults to the title. */
  alt?: string;
}

export interface CoverFlowProps {
  /** The covers, in order. Each takes an image src or one of the built-in artworks. */
  items?: CoverFlowItem[];
  /** Controlled centre cover index. Pair it with onIndexChange. */
  index?: number;
  /** Centre cover when uncontrolled. */
  defaultIndex?: number;
  /** Called with the new centre index after a drag, swipe, wheel, click, arrow key or autoplay step. */
  onIndexChange?: (index: number) => void;
  /** Called when the centre cover is clicked, or Enter is pressed while the flow has focus. */
  onSelect?: (index: number) => void;
  /** Step to the next cover on a timer. Pauses while hovered, focused or dragged. */
  autoplay?: boolean;
  /** Seconds between autoplay steps. */
  interval?: number;
  /** Wrap around at the ends so the flow never runs out of covers. */
  loop?: boolean;
  /** Colour of the rounded stage the covers sit on, and of the floor fade. */
  stageColor?: string;
  /** Page colour around the stage. */
  pageColor?: string;
  /** Focus ring colour. */
  accent?: string;
  /** Colour of the caption title. The subtitle uses the same colour at half strength. */
  captionColor?: string;
  /** Mirror the centre cover on a glossy floor under it. The covers move up to make room. */
  showReflection?: boolean;
  /** Show the title and subtitle on the centre cover. */
  showCaptions?: boolean;
  /** Strength of the idle sway of the side covers, 0 to 1. */
  sway?: number;
  /** Let the mouse wheel step through covers. Horizontal trackpad scrolling always works. */
  wheel?: boolean;
  /** Font stack for the captions and the type on the built-in artworks. */
  font?: string;
  /** Freeze the animation at this many seconds. With autoplay it steps through the covers on the interval. For stills and tests. */
  seconds?: number;
  /** Accessible name for the carousel region. */
  ariaLabel?: string;
  /** Extra class on the outer element. */
  className?: string;
  /** Extra style on the outer element. The root fills its container (width and height 100%), falls back to a 16 / 9 aspect ratio when the container has no height, and is never shorter than 360 px. */
  style?: React.CSSProperties;
}

const DEFAULT_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, "Helvetica Neue", Arial, sans-serif';

export const COVER_FLOW_ITEMS: CoverFlowItem[] = [
  { title: "Rose Static", subtitle: "Velour Moth", art: "rose-static" },
  { title: "Amber Room", subtitle: "Hollow Pines", art: "amber-room" },
  { title: "High Kite", subtitle: "Saltgrass", art: "high-kite" },
  { title: "Meadow Hum", subtitle: "Paper Oak", art: "meadow-hum" },
  { title: "Blue Hour", subtitle: "Quiet Harbour", art: "blue-hour" },
  { title: "Open Door", subtitle: "Glass Atlas", art: "open-door" },
  { title: "Ember Season", subtitle: "Copper Field", art: "ember-season" },
  { title: "Paper Comets", subtitle: "Lumen Avenue", art: "paper-comets" },
  { title: "Glasshouse", subtitle: "Nine Lanterns", art: "glasshouse" },
  { title: "Tidal Lines", subtitle: "Tidewater Club", art: "tidal-lines" },
];

/* ------------------------------------------------------------------ */
/* Geometry, measured from the reference still                         */
/* ------------------------------------------------------------------ */

const STAGE_RATIO = 2.1807; // stage width / height
const PAGE_PAD = 0.0865; // side margin / root width on wide layouts
const CARD = 0.8745; // centre cover size / stage height
const CARD_REFLECT = 0.74; // centre cover size / stage height with the reflection on
const STAGE_CORNER = 0.1602; // superellipse extent / stage height
const STAGE_CORNER_N = 2.65;
const CORNER_C = 0.0573; // centre cover corner extent / cover size
const CORNER_C_N = 2.5;
const CORNER_S = 0.115; // side cover corner extent / cover size
const CORNER_S_N = 1.9;
const SHIFT = 0.011; // the flow sits this many cover sizes right of the stage centre
const PERSP = 2.5; // per-cover perspective distance, in cover sizes
const SLOPE = 0.366; // top-edge slope of a side cover
const THETA = Math.atan(2 * PERSP * SLOPE); // side cover rotation, radians
// Outer-edge half height of a side cover (cover sizes) and outer-edge positions of slots 1 to 4,
// as fractions of the free stage on that side.
const LEFT = { h: 0.48065, edges: [0.27594, 0.64944, 0.97468, 1.27] };
const RIGHT = { h: 0.46949, edges: [0.3315, 0.6386, 0.91841, 1.2] };
const FADE_FROM = 0.3428; // side cover floor fade, local fraction of its height
const FADE_TO = 0.9813;
// floor fade over the backdrop: [percent of stage height, percent of stage colour]
const FLOOR: [number, number][] = [[40, 0], [44, 3], [52, 13], [61, 43], [69, 63], [78, 77], [87, 92], [90, 100]];
// left edge fade: [percent of stage width, percent of stage colour], measured from the reference
const EDGE: [number, number][] = [[0, 100], [1.3, 88], [2.29, 76], [3.27, 60], [4.26, 40], [5.24, 16], [6.06, 0]];
const TITLE = { size: 0.067, base: 0.8685 }; // caption metrics, fractions of the cover size
const SUB = { size: 0.0407, base: 0.9288 };

/* ------------------------------------------------------------------ */
/* Small math                                                          */
/* ------------------------------------------------------------------ */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const mod = (v: number, n: number) => ((v % n) + n) % n;
/** 0 to 1 ease for the turn into the centre: flat at the centre and at the slot, so a cover turns while it travels. */
const ease = (u: number) => u * u * (3 - 2 * u);

function squircle(w: number, h: number, a: number, n: number, ox = 0, oy = 0, seg = 18): string {
  const r = Math.max(0, Math.min(a, w / 2, h / 2));
  const e = 2 / n;
  const pts: string[] = [];
  const put = (x: number, y: number) => pts.push(`${(x + ox).toFixed(2)} ${(y + oy).toFixed(2)}`);
  // clockwise from the left end of the top-left corner; each corner runs t = 0 to 90 degrees
  const corners: ((c: number, s: number) => [number, number])[] = [
    (c, s) => [r - r * c, r - r * s],
    (c, s) => [w - r + r * s, r - r * c],
    (c, s) => [w - r + r * c, h - r + r * s],
    (c, s) => [r - r * s, h - r + r * c],
  ];
  for (const f of corners) {
    for (let i = 0; i <= seg; i++) {
      const t = (i / seg) * (Math.PI / 2);
      const [x, y] = f(Math.pow(Math.cos(t), e), Math.pow(Math.sin(t), e));
      put(x, y);
    }
  }
  return `M ${pts.join(" L ")} Z`;
}

/** Monotone cubic through (1, y1) ... (m, ym); returns value and slope. */
function monotone(ys: number[]) {
  const n = ys.length;
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) d.push(ys[i + 1] - ys[i]);
  const m: number[] = [d[0]];
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
  m.push(d[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i];
    const s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
  }
  return (u: number) => {
    // u is a slot coordinate starting at 1
    const x = u - 1;
    if (x >= n - 1) return ys[n - 1] + m[n - 1] * (x - (n - 1));
    const i = Math.max(0, Math.floor(x));
    const t = x - i;
    const t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * m[i + 1];
  };
}

interface Side { h: number; k: number; x: (u: number) => number }

/** Builds the horizontal path of one side for a stage with `free` cover sizes of room beyond the centre cover. */
function buildSide(spec: { h: number; edges: number[] }, free: number): Side {
  const sin = Math.sin(THETA), cos = Math.cos(THETA);
  const fo = PERSP / (PERSP - 0.5 * sin);
  const k = (2 * spec.h) / fo;
  const wo = spec.h * cos; // projected distance from the outer edge to the cover centre
  const slots = spec.edges.map((e) => 0.5 + e * free - wo);
  const outer = monotone(slots);
  const x1 = slots[0];
  const m1 = outer(1.001) - outer(1) > 0 ? (outer(1.001) - outer(1)) / 0.001 : 0;
  const m0 = 2.1 * x1; // covers either side of the centre meet halfway through a step
  return {
    h: spec.h,
    k,
    x: (u: number) => {
      if (u >= 1) return outer(u);
      const t = u, t2 = t * t, t3 = t2 * t;
      return (t3 - 2 * t2 + t) * m0 + (-2 * t3 + 3 * t2) * x1 + (t3 - t2) * m1;
    },
  };
}

/* Motion: a critically damped lead that eases in, followed by a soft spring. */
const LEAD = 14, SPRING = 13, DAMP = 0.78;
interface Motion { pos: number; vel: number; aim: number; aimVel: number }
function integrate(m: Motion, target: number, h: number) {
  const a1 = -LEAD * LEAD * (m.aim - target) - 2 * LEAD * m.aimVel;
  m.aimVel += a1 * h;
  m.aim += m.aimVel * h;
  const a2 = -SPRING * SPRING * (m.pos - m.aim) - 2 * DAMP * SPRING * m.vel;
  m.vel += a2 * h;
  m.pos += m.vel * h;
}
/** Deterministic response of the motion model to a unit step, x seconds in. */
function stepCurve(x: number) {
  const m: Motion = { pos: 0, vel: 0, aim: 0, aimVel: 0 };
  const h = 1 / 240;
  let t = 0;
  while (t + h <= x) { integrate(m, 1, h); t += h; }
  if (x - t > 1e-9) integrate(m, 1, x - t);
  return m.pos;
}

/* ------------------------------------------------------------------ */
/* Colour helpers for the artworks                                     */
/* ------------------------------------------------------------------ */

function rgbOf(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function mix(a: string, b: string, t: number): string {
  const A = rgbOf(a), B = rgbOf(b);
  const c = (i: number) => Math.round(lerp(A[i], B[i], t));
  return `rgb(${c(0)}, ${c(1)}, ${c(2)})`;
}
function fade(hex: string, a: number): string {
  const [r, g, b] = rgbOf(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* The artworks, drawn in a unit square                                */
/* ------------------------------------------------------------------ */

type Ctx = CanvasRenderingContext2D;
type Painter = (c: Ctx, N: number, font: string) => void;

let GRAIN: HTMLCanvasElement | null = null;
function grain(c: Ctx, N: number, amount: number) {
  if (!GRAIN) {
    GRAIN = document.createElement("canvas");
    GRAIN.width = GRAIN.height = 256;
    const g = GRAIN.getContext("2d");
    if (g) {
      const img = g.createImageData(256, 256);
      const r = rng(11);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 128 + (r() + r() + r() - 1.5) * 110; // ls:keep
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v; // ls:keep
        img.data[i + 3] = 255; // ls:keep
      }
      g.putImageData(img, 0, 0);
    }
  }
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.globalCompositeOperation = "overlay";
  c.globalAlpha = amount;
  const s = Math.max(1, N / 1000) * 256;
  for (let y = 0; y < N; y += s) for (let x = 0; x < N; x += s) c.drawImage(GRAIN, x, y, s, s);
  c.restore();
}

function vgrad(c: Ctx, stops: [number, string][], x0 = 0, y0 = 0, x1 = 0, y1 = 1) {
  const g = c.createLinearGradient(x0, y0, x1, y1);
  for (const [o, col] of stops) g.addColorStop(o, col);
  return g;
}
function radial(c: Ctx, x: number, y: number, r: number, stops: [number, string][]) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  for (const [o, col] of stops) g.addColorStop(o, col);
  return g;
}
function disc(c: Ctx, x: number, y: number, r: number, fill: string | CanvasGradient) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = fill;
  c.fill();
}
/** Text drawn at device scale with tracking, in unit coordinates. */
function type(c: Ctx, N: number, str: string, x: number, y: number, size: number, color: string, opts: { weight?: number; track?: number; align?: "left" | "center" | "right"; font: string }) {
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.font = `${opts.weight || 500} ${size * N}px ${opts.font}`;
  c.fillStyle = color;
  c.textBaseline = "alphabetic";
  const track = (opts.track || 0) * size * N;
  const widths = [...str].map((ch) => c.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + track * (str.length - 1);
  let px = x * N - (opts.align === "center" ? total / 2 : opts.align === "right" ? total : 0);
  [...str].forEach((ch, i) => {
    c.fillText(ch, px, y * N);
    px += widths[i] + track;
  });
  c.restore();
}
function ridge(c: Ctx, base: number, waves: [number, number, number][], fill: string | CanvasGradient) {
  c.beginPath();
  c.moveTo(-0.01, 1.01);
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    let y = base;
    for (const [a, f, p] of waves) y += a * Math.sin(Math.PI * 2 * (f * x + p));
    c.lineTo(x, y);
  }
  c.lineTo(1.01, 1.01);
  c.closePath();
  c.fillStyle = fill;
  c.fill();
}
function ridgeY(base: number, waves: [number, number, number][], x: number) {
  let y = base;
  for (const [a, f, p] of waves) y += a * Math.sin(Math.PI * 2 * (f * x + p));
  return y;
}
function flower(c: Ctx, x: number, y: number, r: number, petals: number, col: string, mid: string, rot: number, shade?: string) {
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  for (let i = 0; i < petals; i++) {
    c.save();
    c.rotate((i / petals) * Math.PI * 2);
    c.beginPath();
    c.ellipse(0, -r * 0.56, r * (petals > 8 ? 0.17 : 0.34), r * 0.5, 0, 0, Math.PI * 2);
    c.fillStyle = col;
    c.fill();
    if (shade) {
      c.beginPath();
      c.ellipse(0, -r * 0.42, r * (petals > 8 ? 0.05 : 0.1), r * 0.3, 0, 0, Math.PI * 2);
      c.fillStyle = shade;
      c.fill();
    }
    c.restore();
  }
  disc(c, 0, 0, r * 0.28, mid);
  disc(c, -r * 0.07, -r * 0.08, r * 0.1, "rgba(255, 255, 255, 0.35)");
  c.restore();
}
function leaf(c: Ctx, x: number, y: number, len: number, ang: number, col: string) {
  c.save();
  c.translate(x, y);
  c.rotate(ang);
  c.beginPath();
  c.moveTo(0, 0);
  c.quadraticCurveTo(len * 0.35, -len * 0.22, len, 0);
  c.quadraticCurveTo(len * 0.35, len * 0.22, 0, 0);
  c.fillStyle = col;
  c.fill();
  c.restore();
}
function cloud(c: Ctx, x: number, y: number, w: number, col: string, shade: string, r: () => number) {
  const puffs = 7;
  c.fillStyle = shade;
  for (let i = 0; i < puffs; i++) {
    const t = i / (puffs - 1);
    const pr = w * (0.12 + 0.14 * Math.sin(Math.PI * t)) * (0.85 + r() * 0.3);
    disc(c, x + (t - 0.5) * w * 0.9, y + w * 0.02, pr, shade);
  }
  for (let i = 0; i < puffs; i++) {
    const t = i / (puffs - 1);
    const pr = w * (0.11 + 0.14 * Math.sin(Math.PI * t)) * (0.85 + r() * 0.3);
    disc(c, x + (t - 0.5) * w * 0.9, y - pr * 0.15, pr, col);
  }
  c.fillRect(x - w * 0.45, y - 0.001, w * 0.9, w * 0.06);
}

const ART: Record<CoverFlowArt, Painter> = {
  /* Bright illustrated meadow under a big low sun: the hero cover. */
  "meadow-hum": (c, N) => {
    const r = rng(4);
    const sky = "#f8ecd5", skyLow = "#fbdcb6", sun = "#ffc94d", sunRing = "#ffe3a1";
    const hills = ["#b9d6a6", "#8fc27f", "#5fa863", "#3f8d4b"];
    const deep = "#24502e", trunk = "#6b4c36", canopy = "#2f7a4c", canopyLit = "#56a065";
    c.fillStyle = vgrad(c, [[0, sky], [0.62, skyLow]]);
    c.fillRect(0, 0, 1, 1);
    // low sun with soft rings
    c.fillStyle = radial(c, 0.68, 0.33, 0.42, [[0, fade(sunRing, 0.7)], [0.45, fade(sunRing, 0.18)], [1, fade(sunRing, 0)]]);
    c.fillRect(0, 0, 1, 1);
    for (const [rr, a] of [[0.24, 0.35], [0.19, 0.5]] as [number, number][]) disc(c, 0.68, 0.33, rr, fade(sunRing, a));
    disc(c, 0.68, 0.33, 0.145, sun);
    // clouds
    cloud(c, 0.2, 0.2, 0.3, "#fffaf0", "#f3e2c6", r);
    cloud(c, 0.9, 0.44, 0.22, "#fffaf0", "#f3e2c6", r);
    // birds
    c.strokeStyle = "#5a4a3c";
    c.lineWidth = 0.004;
    c.lineCap = "round";
    for (const [bx, by, s] of [[0.42, 0.2, 0.022], [0.47, 0.17, 0.016], [0.51, 0.215, 0.012]] as [number, number, number][]) {
      c.beginPath();
      c.moveTo(bx - s, by);
      c.quadraticCurveTo(bx - s * 0.45, by - s * 0.7, bx, by);
      c.quadraticCurveTo(bx + s * 0.45, by - s * 0.7, bx + s, by);
      c.stroke();
    }
    // hills, far to near
    const waves: [number, number, number][][] = [
      [[0.03, 0.8, 0.1], [0.012, 2.1, 0.4]],
      [[0.035, 0.9, 0.55], [0.014, 2.4, 0.2]],
      [[0.04, 0.7, 0.85], [0.012, 2.8, 0.1]],
      [[0.03, 0.9, 0.3], [0.01, 3.1, 0.7]],
    ];
    const bases = [0.53, 0.6, 0.69, 0.8];
    hills.forEach((col, i) => {
      ridge(c, bases[i], waves[i], vgrad(c, [[bases[i] - 0.06, mix(col, "#ffffff", 0.14)], [Math.min(1, bases[i] + 0.3), mix(col, deep, 0.18)]]));
      // ploughed rows following the ridge
      if (i === 1 || i === 2) {
        c.save();
        c.globalAlpha = 0.28;
        c.strokeStyle = mix(col, "#ffffff", 0.45);
        c.lineWidth = 0.0035;
        for (let k = 1; k <= 5; k++) {
          c.beginPath();
          for (let s = 0; s <= 60; s++) {
            const x = s / 60;
            const y = ridgeY(bases[i], waves[i], x) + k * 0.016 + k * k * 0.002;
            if (s) c.lineTo(x, y); else c.moveTo(x, y);
          }
          c.stroke();
        }
        c.restore();
      }
      // trees on the second hill
      if (i === 1) {
        for (const [tx, s] of [[0.08, 1], [0.14, 0.75], [0.33, 0.9], [0.78, 1.1], [0.86, 0.8]] as [number, number][]) {
          const ty = ridgeY(bases[i], waves[i], tx) + 0.012;
          c.fillStyle = trunk;
          c.fillRect(tx - 0.004 * s, ty - 0.05 * s, 0.008 * s, 0.05 * s);
          disc(c, tx, ty - 0.065 * s, 0.035 * s, canopy);
          disc(c, tx - 0.01 * s, ty - 0.075 * s, 0.018 * s, canopyLit);
        }
      }
      // flower dots on the third hill
      if (i === 2) {
        const cols = ["#f48fb1", "#ffd166", "#ffffff", "#c39bf5"];
        for (let j = 0; j < 130; j++) {
          const fx = r(), fy = ridgeY(bases[i], waves[i], fx) + 0.015 + r() * 0.12;
          if (fx > 0.24 && fx < 0.76 && fy > 0.79) continue;
          flower(c, fx, fy, 0.008 + r() * 0.006, 5, cols[j % cols.length], "#f2a93b", r() * 3);
        }
      }
    });
    // grass tufts on the near hill
    c.strokeStyle = mix(hills[3], deep, 0.3);
    c.lineWidth = 0.0024;
    c.lineCap = "round";
    for (let j = 0; j < 90; j++) {
      const gx = r(), gy = ridgeY(bases[3], waves[3], gx) + 0.03 + r() * 0.18;
      const tall = 0.012 + r() * 0.012, lean = (r() - 0.5) * 0.006;
      for (let b = -1; b <= 1; b++) {
        c.beginPath();
        c.moveTo(gx, gy);
        c.quadraticCurveTo(gx + b * 0.003 + lean, gy - tall * 0.6, gx + b * 0.006 + lean * 2, gy - tall * (b ? 0.8 : 1));
        c.stroke();
      }
    }
    // mid flowers on the near hill
    const fcols: [string, string][] = [["#f48fb1", "#f6b93b"], ["#ffd166", "#e07a2e"], ["#ffffff", "#f6b93b"], ["#f39a4a", "#9b4b1f"], ["#b48cf0", "#f6d365"]];
    for (let j = 0; j < 44; j++) {
      const fx = r(), fy = ridgeY(bases[3], waves[3], fx) + 0.035 + r() * 0.15;
      const [col, mid] = fcols[j % fcols.length];
      if (fx > 0.22 && fx < 0.78 && fy > 0.78) continue;
      c.strokeStyle = "#2f6f3a";
      c.lineWidth = 0.004;
      c.beginPath();
      c.moveTo(fx, fy);
      c.lineTo(fx + 0.004, fy + 0.05);
      c.stroke();
      leaf(c, fx + 0.002, fy + 0.03, 0.025, -0.5, "#3a7d40");
      flower(c, fx, fy, 0.018 + r() * 0.012, 5 + (j % 3 === 0 ? 3 : 0), col, mid, r() * 3, fade("#ffffff", 0.18));
    }
    // lavender spikes at both edges
    for (const [lx, ly, lh, lean] of [[0.9, 0.9, 0.2, 0.15], [0.95, 0.86, 0.17, 0.25], [0.86, 0.94, 0.15, -0.05], [0.04, 0.82, 0.14, -0.2], [0.1, 0.84, 0.12, -0.05]] as [number, number, number, number][]) {
      c.strokeStyle = "#2f6f3a";
      c.lineWidth = 0.004;
      c.beginPath();
      c.moveTo(lx, ly + lh * 0.3);
      c.lineTo(lx + lean * lh, ly - lh);
      c.stroke();
      for (let k = 0; k < 9; k++) {
        const t = k / 9;
        const px = lx + lean * lh * (1 - t * 0.9) + (k % 2 ? 0.006 : -0.006), py = ly - lh + t * lh * 0.9;
        c.beginPath();
        c.ellipse(px, py, 0.007 * (0.6 + t * 0.5), 0.011 * (0.6 + t * 0.5), (k % 2 ? 0.5 : -0.5), 0, Math.PI * 2);
        c.fillStyle = k % 3 ? "#9b7be0" : "#7e5cc9";
        c.fill();
      }
    }
    // big foreground blooms, cropped by the frame
    const big: [number, number, number, number, string, string][] = [
      [0.07, 0.95, 0.1, 8, "#f48fb1", "#d9577f"],
      [0.27, 1.02, 0.08, 5, "#ffd166", "#e07a2e"],
      [0.93, 0.9, 0.09, 12, "#ffffff", "#f6b93b"],
      [0.72, 1.03, 0.095, 6, "#f39a4a", "#9b4b1f"],
    ];
    for (const [bx, by, br, p, col, mid] of big) {
      leaf(c, bx, by + br * 0.6, br * 1.6, -2.4, "#2f6f3a");
      leaf(c, bx, by + br * 0.6, br * 1.5, -0.6, "#3a7d40");
      flower(c, bx, by, br, p, col, mid, 0.3, fade("#ffffff", 0.2));
    }
    grain(c, N, 0.09);
  },

  /* Dusty pink field, a dark moon with a thin rim of light, small set type. */
  "rose-static": (c, N, font) => {
    const pink = "#d8a6b3", pinkLow = "#ad7a8c", ink = "#2a1f24", inkDeep = "#150f12", rim = "#f7dce4";
    c.fillStyle = vgrad(c, [[0, pink], [1, pinkLow]]);
    c.fillRect(0, 0, 1, 1);
    c.fillStyle = fade("#ffffff", 0.035);
    for (let y = 0; y < 1; y += 1 / 160) c.fillRect(0, y, 1, 0.5 / 160);
    disc(c, 0.565, 0.585, 0.338, rim);
    disc(c, 0.575, 0.597, 0.338, radial(c, 0.5, 0.5, 0.45, [[0, ink], [1, inkDeep]]));
    disc(c, 0.575, 0.597, 0.338, radial(c, 0.45, 0.42, 0.3, [[0, fade(pink, 0.18)], [1, fade(pink, 0)]]));
    type(c, N, "ROSE STATIC", 0.075, 0.12, 0.034, ink, { weight: 600, track: 0.32, font });
    type(c, N, "NO. 04", 0.925, 0.12, 0.022, ink, { weight: 500, track: 0.2, align: "right", font });
    grain(c, N, 0.16);
  },

  /* A warm room: cream ceiling, terracotta wall, an arched window and its patch of light. */
  "amber-room": (c, N) => {
    const r = rng(9);
    const cream = "#efdfbd", creamLow = "#dcc497", wall = "#a8653b", wallLow = "#723d22", floor = "#43230f", glass = "#fdf5e3", glassLow = "#efd8ad", leafCol = "#2f3b22";
    c.fillStyle = vgrad(c, [[0, cream], [1, creamLow]], 0, 0, 0, 0.24);
    c.fillRect(0, 0, 1, 0.24);
    c.fillStyle = vgrad(c, [[0, wall], [1, wallLow]], 0, 0.24, 0, 0.86);
    c.fillRect(0, 0.24, 1, 0.62);
    c.fillStyle = fade(floor, 1);
    c.fillRect(0, 0.86, 1, 0.14);
    c.fillStyle = fade(creamLow, 0.9);
    c.fillRect(0, 0.235, 1, 0.012);
    // light patch on the wall and floor
    const patch = (dx: number, a: number, grow: number) => {
      c.beginPath();
      c.moveTo(0.18 + dx - grow, 0.5 - grow);
      c.lineTo(0.44 + dx + grow, 0.47 - grow);
      c.lineTo(0.4 + dx + grow, 0.98 + grow);
      c.lineTo(0.05 + dx - grow, 1.0 + grow);
      c.closePath();
      c.fillStyle = fade("#e9a46a", a);
      c.fill();
    };
    for (let i = 0; i < 6; i++) patch(0, 0.07, 0.012 * (5 - i));
    // arched window
    const wx = 0.56, ww = 0.28, wy = 0.34, wb = 0.78;
    c.beginPath();
    c.moveTo(wx, wb);
    c.lineTo(wx, wy + ww / 2);
    c.arc(wx + ww / 2, wy + ww / 2, ww / 2, Math.PI, 0);
    c.lineTo(wx + ww, wb);
    c.closePath();
    c.fillStyle = vgrad(c, [[0, glass], [1, glassLow]], 0, wy, 0, wb);
    c.fill();
    c.strokeStyle = wallLow;
    c.lineWidth = 0.011;
    c.beginPath();
    c.moveTo(wx + ww / 2, wy);
    c.lineTo(wx + ww / 2, wb);
    c.moveTo(wx, 0.6);
    c.lineTo(wx + ww, 0.6);
    c.stroke();
    c.fillStyle = mix(wallLow, floor, 0.4);
    c.fillRect(wx - 0.015, wb, ww + 0.03, 0.018);
    // plant in the corner
    c.fillStyle = "#5a2f18";
    c.beginPath();
    c.moveTo(0.1, 0.86);
    c.lineTo(0.22, 0.86);
    c.lineTo(0.2, 0.97);
    c.lineTo(0.12, 0.97);
    c.closePath();
    c.fill();
    for (let i = 0; i < 16; i++) {
      const a = -Math.PI / 2 + (r() - 0.5) * 2.2;
      leaf(c, 0.16, 0.86, 0.1 + r() * 0.16, a, i % 2 ? leafCol : mix(leafCol, "#556b34", 0.5));
    }
    grain(c, N, 0.12);
  },

  /* Blue sky, painterly clouds and a red kite on a long string. */
  "high-kite": (c, N) => {
    const r = rng(21);
    const top = "#2a62c9", mid = "#5d97e3", low = "#acd0f4", white = "#ffffff", shade = "#c9dcf2", red = "#ef5136", gold = "#f7b331", spar = "#5b2b1a";
    c.fillStyle = vgrad(c, [[0, top], [0.55, mid], [1, low]]);
    c.fillRect(0, 0, 1, 1);
    const bank = (cx: number, cy: number, w: number, h: number, count: number) => {
      const puffs: [number, number, number][] = [];
      for (let i = 0; i < count; i++) {
        const t = i / Math.max(1, count - 1);
        const rr = (0.025 + r() * 0.05) * (0.55 + Math.sin(Math.PI * t) * 0.7);
        puffs.push([cx + (t - 0.5) * w + (r() - 0.5) * 0.02, cy - Math.sin(Math.PI * t) * h * (0.4 + r() * 0.6), rr]);
      }
      for (const [x, y, rr] of puffs) disc(c, x + rr * 0.08, y + rr * 0.22, rr, shade);
      for (const [x, y, rr] of puffs) disc(c, x, y, rr * 0.94, white);
      for (const [x, y, rr] of puffs) disc(c, x - rr * 0.2, y - rr * 0.25, rr * 0.5, fade(white, 0.6));
      if (w > 1) {
        c.fillStyle = shade;
        c.fillRect(cx - w / 2, cy, w, h * 0.6);
        c.fillStyle = white;
        c.fillRect(cx - w / 2, cy + h * 0.6, w, 1);
      }
    };
    bank(0.24, 0.3, 0.3, 0.07, 9);
    bank(0.86, 0.6, 0.22, 0.05, 7);
    bank(0.5, 0.92, 1.25, 0.14, 26);
    // string and tail
    c.strokeStyle = fade(white, 0.75);
    c.lineWidth = 0.0028;
    c.beginPath();
    c.moveTo(0.63, 0.47);
    c.bezierCurveTo(0.55, 0.62, 0.32, 0.72, 0.12, 1.02);
    c.stroke();
    c.strokeStyle = fade(spar, 0.7);
    c.beginPath();
    c.moveTo(0.63, 0.47);
    for (let i = 1; i <= 30; i++) c.lineTo(0.63 + Math.sin(i * 0.5) * 0.02, 0.47 + i * 0.008);
    c.stroke();
    for (let i = 1; i <= 4; i++) {
      const y = 0.47 + i * 0.055, x = 0.63 + Math.sin(i * 3.4) * 0.02;
      c.fillStyle = i % 2 ? red : white;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x - 0.018, y - 0.01);
      c.lineTo(x - 0.018, y + 0.01);
      c.closePath();
      c.moveTo(x, y);
      c.lineTo(x + 0.018, y - 0.01);
      c.lineTo(x + 0.018, y + 0.01);
      c.closePath();
      c.fill();
    }
    // kite
    c.save();
    c.translate(0.63, 0.33);
    c.rotate(0.22);
    const kw = 0.085, kt = 0.1, kb = 0.15;
    const quad = (pts: number[][], col: string) => {
      c.beginPath();
      c.moveTo(0, 0);
      pts.forEach(([x, y]) => c.lineTo(x, y));
      c.closePath();
      c.fillStyle = col;
      c.fill();
    };
    quad([[0, -kt], [-kw, 0]], red);
    quad([[0, -kt], [kw, 0]], gold);
    quad([[kw, 0], [0, kb]], red);
    quad([[-kw, 0], [0, kb]], gold);
    c.strokeStyle = spar;
    c.lineWidth = 0.004;
    c.beginPath();
    c.moveTo(0, -kt);
    c.lineTo(0, kb);
    c.moveTo(-kw, 0);
    c.lineTo(kw, 0);
    c.stroke();
    c.restore();
    grain(c, N, 0.07);
  },

  /* Deep blue dusk over a dark hill, one lit window and a crescent moon. */
  "blue-hour": (c, N) => {
    const r = rng(33);
    const top = "#061638", mid = "#0f3a88", low = "#2f74d4", glow = "#5f9bea", hill = "#04102a", moon = "#f4f0dd", warm = "#ffc56b";
    const sky = vgrad(c, [[0, top], [0.5, mid], [0.88, low], [1, glow]]);
    c.fillStyle = sky;
    c.fillRect(0, 0, 1, 1);
    for (let i = 0; i < 110; i++) {
      const y = r() * 0.6;
      disc(c, r(), y, 0.001 + r() * 0.0025, fade("#ffffff", (0.25 + r() * 0.6) * (1 - y)));
    }
    for (let i = 0; i < 7; i++) {
      c.beginPath();
      c.ellipse(r(), 0.45 + r() * 0.35, 0.18 + r() * 0.2, 0.012 + r() * 0.012, 0, 0, Math.PI * 2);
      c.fillStyle = fade("#9cc2f5", 0.1 + r() * 0.12);
      c.fill();
    }
    disc(c, 0.74, 0.24, 0.065, moon);
    disc(c, 0.765, 0.225, 0.06, sky);
    c.beginPath();
    c.moveTo(-0.01, 1.01);
    c.lineTo(-0.01, 0.6);
    c.bezierCurveTo(0.1, 0.5, 0.26, 0.5, 0.36, 0.62);
    c.bezierCurveTo(0.46, 0.74, 0.58, 0.9, 0.7, 1.01);
    c.closePath();
    c.fillStyle = hill;
    c.fill();
    c.fillStyle = radial(c, 0.215, 0.535, 0.09, [[0, fade(warm, 0.35)], [1, fade(warm, 0)]]);
    c.fillRect(0.1, 0.43, 0.24, 0.24);
    c.fillStyle = hill;
    c.beginPath();
    c.moveTo(0.18, 0.56);
    c.lineTo(0.18, 0.53);
    c.lineTo(0.215, 0.505);
    c.lineTo(0.25, 0.53);
    c.lineTo(0.25, 0.56);
    c.closePath();
    c.fill();
    c.fillStyle = warm;
    c.fillRect(0.207, 0.535, 0.016, 0.014);
    grain(c, N, 0.08);
  },

  /* Off-white sleeve with a dark doorway and a little warm light inside. */
  "open-door": (c, N, font) => {
    const paper = "#f4f3ef", paperShade = "#dedcd5", door = "#1a1817", doorWarm = "#3d2b20", light = "#d8b083", ink = "#1d1b1a", inkSoft = "#8a8780";
    c.fillStyle = vgrad(c, [[0, paperShade], [0.45, paper], [1, paper]], 0, 0, 1, 0);
    c.fillRect(0, 0, 1, 1);
    c.fillStyle = vgrad(c, [[0, fade(paperShade, 0)], [1, fade(paperShade, 0.75)]], 0, 0.55, 0, 1);
    c.fillRect(0, 0.55, 1, 0.45);
    // cast shadow of the frame
    c.beginPath();
    c.moveTo(0.34, 0.8);
    c.lineTo(0.62, 0.8);
    c.lineTo(0.5, 0.86);
    c.lineTo(0.2, 0.86);
    c.closePath();
    c.fillStyle = fade(paperShade, 0.9);
    c.fill();
    c.fillStyle = door;
    c.fillRect(0.08, 0.17, 0.26, 0.63);
    c.fillStyle = vgrad(c, [[0, fade(doorWarm, 0)], [1, doorWarm]], 0, 0.4, 0, 0.8);
    c.fillRect(0.1, 0.19, 0.22, 0.61);
    c.fillStyle = light;
    c.fillRect(0.2, 0.3, 0.05, 0.07);
    c.fillStyle = fade(light, 0.25);
    c.fillRect(0.19, 0.29, 0.07, 0.09);
    type(c, N, "OPEN DOOR", 0.92, 0.12, 0.03, ink, { weight: 600, track: 0.34, align: "right", font });
    type(c, N, "GLASS ATLAS", 0.92, 0.16, 0.02, inkSoft, { weight: 500, track: 0.3, align: "right", font });
    grain(c, N, 0.05);
  },

  /* Near black with a warm core and rising embers. */
  "ember-season": (c, N) => {
    const r = rng(52);
    const night = "#120905", deep = "#7c2c0d", core = "#e86c2a", spark = "#ffbf66", hot = "#ff6a2a";
    c.fillStyle = night;
    c.fillRect(0, 0, 1, 1);
    c.fillStyle = radial(c, 0.44, 0.62, 0.62, [[0, fade(deep, 0.95)], [0.55, fade(deep, 0.35)], [1, fade(deep, 0)]]);
    c.fillRect(0, 0, 1, 1);
    c.fillStyle = radial(c, 0.42, 0.66, 0.22, [[0, fade(core, 0.65)], [1, fade(core, 0)]]);
    c.fillRect(0, 0, 1, 1);
    c.save();
    c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 150; i++) {
      const x = 0.44 + (r() - 0.5) * 0.9 * (0.4 + r()), y = 0.15 + r() * 0.85;
      const s = 0.0015 + Math.pow(r(), 3) * 0.009;
      const col = mix(spark, hot, r());
      disc(c, x, y, s * 4, radial(c, x, y, s * 4, [[0, fade(spark, 0.25)], [1, fade(spark, 0)]]));
      disc(c, x, y, s, col);
      if (r() > 0.7) {
        c.strokeStyle = fade(spark, 0.35);
        c.lineWidth = s * 0.8;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + (r() - 0.5) * 0.02, y + 0.02 + r() * 0.03);
        c.stroke();
      }
    }
    c.restore();
    c.fillStyle = radial(c, 0.5, 0.5, 0.75, [[0.55, fade(night, 0)], [1, fade(night, 0.85)]]);
    c.fillRect(0, 0, 1, 1);
    grain(c, N, 0.18);
  },

  /* Two-colour print: pink and teal comets slightly off register on paper. */
  "paper-comets": (c, N, font) => {
    const r = rng(64);
    const paper = "#f1eadb", pink = "#ff4f93", teal = "#17969a";
    c.fillStyle = paper;
    c.fillRect(0, 0, 1, 1);
    c.strokeStyle = fade("#b9a98a", 0.18);
    c.lineWidth = 0.0012;
    for (let i = 0; i < 260; i++) {
      const x = r(), y = r(), a = r() * Math.PI;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + Math.cos(a) * 0.012, y + Math.sin(a) * 0.012);
      c.stroke();
    }
    c.save();
    c.globalCompositeOperation = "multiply";
    const comet = (x: number, y: number, rr: number, len: number, ang: number, col: string) => {
      c.save();
      c.translate(x, y);
      c.rotate(ang);
      c.beginPath();
      c.moveTo(0, -rr);
      c.quadraticCurveTo(-len * 0.5, -rr * 0.6, -len, 0);
      c.quadraticCurveTo(-len * 0.5, rr * 0.6, 0, rr);
      c.arc(0, 0, rr, Math.PI / 2, -Math.PI / 2, true);
      c.closePath();
      c.fillStyle = col;
      c.fill();
      c.restore();
    };
    comet(0.66, 0.42, 0.13, 0.62, 0.62, pink);
    comet(0.36, 0.7, 0.07, 0.36, 0.62, teal);
    comet(0.84, 0.82, 0.045, 0.22, 0.62, pink);
    // halftone shadow of the big comet in teal, off register
    for (let y = 0.05; y < 0.95; y += 0.018) {
      for (let x = 0.05; x < 0.95; x += 0.018) {
        const d = Math.hypot(x - 0.69, y - 0.45);
        const s = clamp(0.17 - d, 0, 0.17) / 0.17;
        if (s > 0.02) disc(c, x, y, 0.0075 * Math.sqrt(s), teal);
      }
    }
    c.restore();
    for (let i = 0; i < 9; i++) {
      const x = 0.08 + r() * 0.84, y = 0.06 + r() * 0.5, s = 0.008 + r() * 0.012;
      c.fillStyle = i % 2 ? pink : teal;
      c.beginPath();
      c.moveTo(x, y - s);
      c.quadraticCurveTo(x, y, x + s, y);
      c.quadraticCurveTo(x, y, x, y + s);
      c.quadraticCurveTo(x, y, x - s, y);
      c.quadraticCurveTo(x, y, x, y - s);
      c.fill();
    }
    type(c, N, "PAPER COMETS", 0.07, 0.93, 0.052, teal, { weight: 800, track: 0.04, font });
    grain(c, N, 0.1);
  },

  /* Aurora colour field with a refracting glass sphere. */
  glasshouse: (c, N) => {
    const base = "#1b0a3a", violet = "#7a2ff0", lime = "#b8f23a", cyan = "#25c7e8", rose = "#ff6fb1";
    const field = document.createElement("canvas");
    field.width = field.height = Math.max(64, Math.round(N / 2));
    const f = field.getContext("2d");
    if (!f) return;
    f.scale(field.width, field.width);
    f.fillStyle = base;
    f.fillRect(0, 0, 1, 1);
    f.globalCompositeOperation = "screen";
    const blob = (x: number, y: number, rr: number, col: string, a: number) => {
      f.fillStyle = radial(f, x, y, rr, [[0, fade(col, a)], [1, fade(col, 0)]]);
      f.fillRect(0, 0, 1, 1);
    };
    blob(0.22, 0.28, 0.7, violet, 0.95);
    blob(0.82, 0.78, 0.5, lime, 0.8);
    blob(0.8, 0.16, 0.42, cyan, 0.85);
    blob(0.12, 0.88, 0.4, rose, 0.7);
    c.drawImage(field, 0, 0, 1, 1);
    c.save();
    c.beginPath();
    c.arc(0.5, 0.52, 0.24, 0, Math.PI * 2);
    c.clip();
    c.translate(0.5, 0.52);
    c.scale(-1.35, 1.35);
    c.drawImage(field, -0.5, -0.5, 1, 1);
    c.restore();
    disc(c, 0.5, 0.52, 0.24, radial(c, 0.42, 0.42, 0.34, [[0, fade("#ffffff", 0.32)], [0.5, fade("#ffffff", 0.04)], [1, fade(base, 0.25)]]));
    c.strokeStyle = fade("#ffffff", 0.35);
    c.lineWidth = 0.003;
    c.beginPath();
    c.arc(0.5, 0.52, 0.2385, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.ellipse(0.43, 0.41, 0.06, 0.03, -0.6, 0, Math.PI * 2);
    c.fillStyle = fade("#ffffff", 0.7);
    c.fill();
    c.beginPath();
    c.ellipse(0.5, 0.79, 0.17, 0.02, 0, 0, Math.PI * 2);
    c.fillStyle = fade(base, 0.35);
    c.fill();
    grain(c, N, 0.06);
  },

  /* Swiss-style rings rolling in from a corner, a small orange sun. */
  "tidal-lines": (c, N, font) => {
    const sea = "#0e4b5a", seaLow = "#093642", cream = "#f2e6d0", sun = "#f38b3c";
    c.fillStyle = vgrad(c, [[0, sea], [1, seaLow]]);
    c.fillRect(0, 0, 1, 1);
    c.strokeStyle = cream;
    let i = 0;
    for (let rr = 0.16; rr < 0.86; rr += 0.055) {
      c.lineWidth = i % 3 === 0 ? 0.014 : 0.0045;
      c.beginPath();
      c.arc(-0.02, 1.04, rr, -Math.PI / 2, 0);
      c.stroke();
      i++;
    }
    disc(c, 0.77, 0.3, 0.088, sun);
    c.fillStyle = fade(cream, 0.6);
    c.fillRect(0.075, 0.18, 0.2, 0.003);
    type(c, N, "TIDAL LINES", 0.075, 0.115, 0.034, cream, { weight: 600, track: 0.24, font });
    type(c, N, "VOL. 2", 0.075, 0.155, 0.022, fade(cream, 0.7), { weight: 500, track: 0.2, font });
    grain(c, N, 0.1);
  },
};

/** Draws one of the built-in artworks into a canvas at size by size device pixels, for thumbnails or a matching background elsewhere. */
export function drawCoverArt(canvas: HTMLCanvasElement, art: CoverFlowArt, size: number, font: string = DEFAULT_FONT) {
  paintArt(canvas, art, Math.max(16, Math.round(size)), font);
}

/** Writes a soft, dim copy of a cover into a tiny canvas; the stage shows it scaled up as its ambient light. Never reads pixels, so cross-origin images are fine. */
function glow(src: CanvasImageSource, w: number, h: number, out: HTMLCanvasElement) {
  if (!w || !h) return;
  const s = Math.min(w, h);
  const mid = document.createElement("canvas");
  mid.width = mid.height = 80;
  const m = mid.getContext("2d");
  const tiny = document.createElement("canvas");
  tiny.width = tiny.height = 20;
  const t = tiny.getContext("2d");
  const o = out.getContext("2d");
  if (!m || !t || !o) return;
  m.imageSmoothingQuality = "high";
  m.drawImage(src, (w - s) / 2, (h - s) / 2, s, s, 0, 0, 80, 80);
  t.imageSmoothingQuality = "high";
  t.drawImage(mid, 0, 0, 20, 20);
  out.width = out.height = 64;
  o.imageSmoothingQuality = "high";
  if ("filter" in o) o.filter = "saturate(1.7)";
  o.drawImage(tiny, 0, 0, 64, 64);
  if ("filter" in o) o.filter = "none";
  o.fillStyle = "rgba(0, 0, 0, 0.915)"; // ls:keep (a brightness mask, not a colour)
  o.fillRect(0, 0, 64, 64);
}

function paintArt(canvas: HTMLCanvasElement, art: CoverFlowArt, N: number, font: string) {
  if (canvas.width !== N) { canvas.width = N; canvas.height = N; }
  const c = canvas.getContext("2d");
  if (!c) return;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, N, N);
  c.save();
  c.scale(N, N);
  (ART[art] || ART["meadow-hum"])(c, N, font);
  c.restore();
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface Layout {
  W: number; H: number;
  sx: number; sy: number; sw: number; sh: number;
  S: number; cx: number; cy: number;
  free: number;
  reflect: boolean;
  left: Side; right: Side;
}

function computeLayout(W: number, H: number, reflect: boolean): Layout {
  const padX = W >= 600 ? W * PAGE_PAD : lerp(16, 600 * PAGE_PAD, clamp((W - 375) / 225, 0, 1));
  const padY = 16;
  const availW = Math.max(40, W - 2 * padX), availH = Math.max(40, H - 2 * padY);
  const ratio = lerp(1.22, STAGE_RATIO, smooth(340, 560, availW));
  let sw = availW, sh = sw / ratio;
  if (sh > availH) { sh = availH; sw = Math.min(availW, sh * ratio); }
  sw = Math.round(sw);
  sh = Math.round(sh);
  const sx = Math.round((W - sw) / 2 + W * 0.0005), sy = Math.round((H - sh) / 2);
  const S = sh * (reflect ? CARD_REFLECT : CARD);
  const cx = sw / 2 + SHIFT * S;
  const cy = reflect ? sh * 0.43 : sh / 2;
  const free = Math.max(0, (sw / 2 - S / 2) / S);
  return { W, H, sx, sy, sw, sh, S, cx, cy, free, reflect, left: buildSide(LEFT, free), right: buildSide(RIGHT, free) };
}

/** Pose of one cover at a signed slot offset. */
function pose(L: Layout, o: number, swayDeg: number) {
  const side = o < 0 ? L.left : L.right;
  const sgn = o < 0 ? -1 : 1;
  const u = Math.abs(o);
  const e = u >= 1 ? 1 : ease(u);
  const theta = THETA * e + (swayDeg * Math.PI / 180) * e;
  const h = 0.5 + (side.h - 0.5) * e;
  const sin = Math.sin(theta);
  const fo = PERSP / (PERSP - 0.5 * sin);
  const k = (2 * h) / fo;
  const x = sgn * side.x(u);
  return { u, sgn, theta, k, x, e, fo };
}

export function CoverFlow({
  items = COVER_FLOW_ITEMS,
  index,
  defaultIndex = 3,
  onIndexChange,
  onSelect,
  autoplay = false,
  interval = 3.5,
  loop = true,
  stageColor = "#010101",
  pageColor = "#f5f5f5",
  accent = "#7fb2ff",
  captionColor = "#ffffff",
  showReflection = false,
  showCaptions = true,
  sway = 1,
  wheel = true,
  font = DEFAULT_FONT,
  seconds,
  ariaLabel = "Cover flow",
  className,
  style,
}: CoverFlowProps) {
  const n = items.length;
  const controlled = index !== undefined;
  const start = n ? mod(Math.round(controlled ? (index as number) : defaultIndex), n) : 0;
  const [active, setActive] = React.useState(start);
  const [layout, setLayout] = React.useState<Layout | null>(null);
  const [focusRing, setFocusRing] = React.useState(false);
  const [baseline, setBaseline] = React.useState(0.86);
  const [, bump] = React.useState(0);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const probeRef = React.useRef<HTMLDivElement | null>(null);
  const wrapRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const clipRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const fadeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const mirrorRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const backRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const artRefs = React.useRef<(HTMLCanvasElement | null)[]>([]);
  const mirrorArtRefs = React.useRef<(HTMLCanvasElement | null)[]>([]);
  const backArtRefs = React.useRef<(HTMLCanvasElement | null)[]>([]);

  const props = { items, n, controlled, index, onIndexChange, onSelect, autoplay, interval, loop, sway, wheel, seconds, showReflection };
  const P = React.useRef(props);
  P.current = props;

  const st = React.useRef({
    pos: start, vel: 0, aim: start, aimVel: 0, target: start, emitted: start,
    dragging: false, moved: false, startX: 0, startPos: 0, downCard: -1, samples: [] as { t: number; p: number }[],
    wheelAt: 0, wheelAcc: 0, wheelStep: 0, wheelLast: 0, wheelTimer: 0 as unknown as ReturnType<typeof setTimeout>,
    hover: false, focus: false, visible: true, hidden: false, reduced: false,
    raf: 0, last: 0, t0: 0, autoAt: 0, clipCache: [] as string[], paint: (() => {}) as () => void,
    kick: (() => {}) as () => void,
  });

  /* ---------- measure ---------- */
  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      setLayout((prev) => {
        const reflect = P.current.showReflection;
        if (prev && prev.reflect === reflect && Math.abs(prev.W - r.width) < 0.5 && Math.abs(prev.H - r.height) < 0.5) return prev;
        return computeLayout(r.width, r.height, reflect);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showReflection]);

  React.useLayoutEffect(() => {
    const p = probeRef.current;
    if (!p) return;
    const line = p.firstElementChild as HTMLElement | null;
    const mark = p.lastElementChild as HTMLElement | null;
    if (!line || !mark) return;
    const b = mark.getBoundingClientRect().top - line.getBoundingClientRect().top;
    if (b > 0) setBaseline(b / 100);
  }, [font]);

  /* ---------- draw the artworks ---------- */
  const itemsKey = items.map((it) => `${it.src || ""}|${it.art || ""}`).join(",");
  const [dpr, setDpr] = React.useState(() => (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1));
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    let mq: MediaQueryList | null = null;
    const watch = () => {
      const d = window.devicePixelRatio || 1;
      setDpr(d);
      mq?.removeEventListener?.("change", watch);
      mq = window.matchMedia(`(resolution: ${d}dppx)`);
      mq.addEventListener?.("change", watch);
    };
    watch();
    return () => mq?.removeEventListener?.("change", watch);
  }, []);
  const N = layout ? clamp(Math.ceil((layout.S * dpr) / 64) * 64, 64, 2048) : 0;
  React.useEffect(() => {
    if (!N) return;
    let cancelled = false;
    const order = items.map((_, i) => i).sort((a, b) => Math.abs(mod(a - st.current.pos + n / 2, n) - n / 2) - Math.abs(mod(b - st.current.pos + n / 2, n) - n / 2));
    const drawOne = (i: number) => {
      const it = items[i];
      if (!it) return;
      if (it.src) {
        const b = backArtRefs.current[i];
        if (!b) return;
        const im = new Image();
        im.decoding = "async";
        im.onload = () => { if (!cancelled) glow(im, im.naturalWidth, im.naturalHeight, b); };
        im.src = it.src;
        return;
      }
      const cv = artRefs.current[i];
      if (!cv) return;
      paintArt(cv, it.art || "meadow-hum", N, font);
      const m = mirrorArtRefs.current[i];
      if (m) {
        const mn = Math.max(32, Math.round(N / 2));
        m.width = m.height = mn;
        m.getContext("2d")?.drawImage(cv, 0, 0, mn, mn);
      }
      const b = backArtRefs.current[i];
      if (b) glow(cv, N, N, b);
    };
    const sync = P.current.seconds !== undefined;
    const first = sync ? order : order.slice(0, 8);
    first.forEach(drawOne);
    const rest = sync ? [] : order.slice(8);
    const tick = () => {
      if (cancelled || !rest.length) return;
      drawOne(rest.shift() as number);
      setTimeout(tick, 16);
    };
    setTimeout(tick, 16);
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N, itemsKey, font, n, showReflection]);

  /* ---------- painting one frame ---------- */
  const paint = React.useCallback((pos: number, t: number) => {
    const L = layout;
    if (!L || !n) return;
    const pr = P.current;
    const swayDeg = st.current.reduced ? 0 : 1.2 * clamp(pr.sway, 0, 1) * Math.sin((Math.PI * 2 * t) / 6);
    const S = L.S;
    const offs: number[] = [];
    let A = -1, B = -1;
    for (let i = 0; i < n; i++) {
      let o = i - pos;
      if (pr.loop) { o = mod(o + n / 2, n) - n / 2; }
      offs.push(o);
      if (o < 0 && o > -1 && (A < 0 || o > offs[A])) A = i;
      if (o >= 0 && o < 1 && (B < 0 || o < offs[B])) B = i;
    }
    const poses = offs.map((o) => pose(L, o, swayDeg));
    // where the two covers either side of the centre would meet in depth
    let cutX = NaN;
    if (A >= 0 && B >= 0) {
      const a = poses[A], b = poses[B];
      const tA = Math.tan(a.theta), tB = Math.tan(b.theta);
      if (tA + tB > 1e-4) cutX = (0.6 * b.u - 0.6 * a.u + a.x * tA + b.x * tB) / (tA + tB);
    }
    for (let i = 0; i < n; i++) {
      const wrap = wrapRefs.current[i], card = cardRefs.current[i];
      if (!wrap || !card) continue;
      const q = poses[i];
      const vis = q.u < 4.2;
      wrap.style.visibility = vis ? "visible" : "hidden";
      const cap = capRefs.current[i];
      if (!vis) { if (cap) cap.style.opacity = "0"; continue; }
      const px = L.cx + q.x * S;
      card.style.transform = `translate3d(${(px - S / 2).toFixed(3)}px, ${(L.cy - S / 2).toFixed(3)}px, 0) scale(${q.k.toFixed(5)}) perspective(${(PERSP * S).toFixed(1)}px) rotateY(${(-q.sgn * q.theta * 180 / Math.PI).toFixed(4)}deg)`;
      wrap.style.zIndex = String(1000 - Math.round(q.u * 100));
      wrap.style.opacity = String(1 - smooth(3, 3.85, q.u));
      // depth cut between the two covers that cross the centre
      let clip = "none";
      if (!isNaN(cutX) && (i === A || i === B)) {
        const front = poses[A].u < poses[B].u ? A : B;
        if (i === front) {
          const cx = L.cx + cutX * S;
          clip = i === B ? `inset(0 0 0 ${Math.max(0, cx).toFixed(2)}px)` : `inset(0 ${Math.max(0, L.sw - cx).toFixed(2)}px 0 0)`;
        }
      }
      if (st.current.clipCache[i] !== clip) { wrap.style.clipPath = clip; st.current.clipCache[i] = clip; }
      const fadeEl = fadeRefs.current[i];
      if (fadeEl) fadeEl.style.opacity = String(Math.min(1, q.u));
      const sh = shadowRefs.current[i];
      if (sh) sh.style.opacity = String(Math.max(0, 1 - q.u * 1.6));
      const mir = mirrorRefs.current[i];
      if (mir) mir.style.opacity = String(Math.max(0, 1 - q.u * 1.4));
      const clipEl = clipRefs.current[i];
      if (clipEl) {
        const a = lerp(CORNER_C, CORNER_S, q.e) * S, nn = lerp(CORNER_C_N, CORNER_S_N, q.e);
        const key = `${a.toFixed(1)}|${nn.toFixed(2)}`;
        if (clipEl.dataset.k !== key) {
          clipEl.dataset.k = key;
          clipEl.style.clipPath = `path("${squircle(S, S, a, nn)}")`;
          if (sh) sh.style.borderRadius = `${(a * 0.82).toFixed(1)}px`;
        }
      }
      if (cap) {
        const op = 1 - smooth(0, 0.26, q.u);
        cap.style.opacity = op.toFixed(3);
        cap.style.transform = `translate3d(${(px - S * 0.46).toFixed(2)}px, 0, 0)`;
        cap.style.visibility = op > 0 ? "visible" : "hidden";
      }
    }
    // backdrop: the art nearest the centre, cross-faded with the next one
    const base = Math.floor(pos), w = smooth(0, 1, pos - base);
    const ia = mod(base, n), ib = mod(base + 1, n);
    for (let i = 0; i < n; i++) {
      const b = backRefs.current[i];
      if (!b) continue;
      const op = i === ia ? (ia === ib ? 1 : 1) : i === ib ? w : 0;
      b.style.opacity = op.toFixed(3);
      b.style.zIndex = i === ib ? "2" : "1";
      b.style.visibility = op > 0.001 ? "visible" : "hidden";
    }
  }, [layout, n]);

  /* ---------- deterministic time (stills, tests, the card video) ---------- */
  const autoPos = (s: number, t: number, I: number) => {
    const Lm = Math.min(I * 0.85, 0.95);
    const m = Math.floor(t / I + 1e-9);
    const tau = t - m * I;
    const begin = I - Lm;
    let r = 0;
    if (tau > begin) {
      const x = tau - begin;
      r = stepCurve(x) + (1 - stepCurve(Lm)) * smooth(0, 1, x / Lm);
    }
    return s + m + r;
  };

  React.useLayoutEffect(() => {
    if (seconds === undefined || !layout) return;
    const pos = autoplay ? autoPos(start, seconds, Math.max(0.4, interval)) : start;
    st.current.pos = pos;
    paint(pos, seconds);
    const a = mod(Math.round(pos), n);
    if (a !== active) setActive(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, layout, paint, autoplay, interval, start]);

  /* ---------- the live engine ---------- */
  React.useEffect(() => {
    if (seconds !== undefined || !layout) return;
    const s = st.current;
    const mq = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    s.reduced = !!mq?.matches;
    const onMq = () => { s.reduced = !!mq?.matches; kick(); };
    mq?.addEventListener?.("change", onMq);
    s.t0 = s.t0 || performance.now();
    s.autoAt = performance.now() + P.current.interval * 1000;
    const swaying = () => !s.reduced && P.current.sway > 0;
    const frame = (now: number) => {
      s.raf = 0;
      const dt = Math.min(0.05, Math.max(0, (now - (s.last || now)) / 1000));
      s.last = now;
      const pr = P.current;
      if (!s.dragging && now - s.wheelAt > 160) {
        if (s.reduced) { s.pos = s.aim = s.target; s.vel = s.aimVel = 0; }
        else {
          let rem = dt;
          while (rem > 0) {
            const h = Math.min(rem, 1 / 240);
            integrate(s, s.target, h);
            rem -= h;
          }
          if (Math.abs(s.pos - s.target) < 1e-4 && Math.abs(s.vel) < 1e-3 && Math.abs(s.aim - s.target) < 1e-4) { s.pos = s.aim = s.target; s.vel = s.aimVel = 0; }
        }
      }
      if (pr.autoplay && !s.hover && !s.focus && !s.dragging && now >= s.autoAt) {
        request(s.target + 1);
        s.autoAt = now + Math.max(0.4, pr.interval) * 1000;
      }
      paint(s.pos, (now - s.t0) / 1000);
      const moving = s.dragging || s.pos !== s.target || now - s.wheelAt < 400;
      if (s.visible && !s.hidden && (moving || swaying() || pr.autoplay)) s.raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!s.raf && s.visible && !s.hidden) { s.last = performance.now(); s.raf = requestAnimationFrame(frame); }
    };
    s.kick = kick;
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((es) => { s.visible = es.some((e) => e.isIntersecting); if (s.visible) kick(); }) : null;
    if (rootRef.current && io) io.observe(rootRef.current);
    const onVis = () => { s.hidden = document.hidden; if (!s.hidden) kick(); };
    document.addEventListener("visibilitychange", onVis);
    paint(s.pos, (performance.now() - s.t0) / 1000);
    kick();
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq?.removeEventListener?.("change", onMq);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, paint, seconds]);

  /* ---------- index requests ---------- */
  const request = React.useCallback((t: number) => {
    const s = st.current, pr = P.current;
    if (!pr.n) return;
    const tt = pr.loop ? t : clamp(t, 0, pr.n - 1);
    s.target = tt;
    const idx = mod(tt, pr.n);
    s.autoAt = performance.now() + Math.max(0.4, pr.interval) * 1000;
    if (idx !== s.emitted) {
      s.emitted = idx;
      pr.onIndexChange?.(idx);
      if (!pr.controlled) setActive(idx);
      else setTimeout(() => bump((v) => v + 1), 0);
    }
    s.kick();
  }, []);

  // controlled index: follow the prop along the shortest way round
  React.useEffect(() => {
    if (!controlled || !n) return;
    const s = st.current;
    const want = mod(Math.round(index as number), n);
    setActive(want);
    if (mod(s.target, n) === want && s.emitted === want) return;
    const base = Math.round(s.pos);
    let d = want - mod(base, n);
    if (loop) d = mod(d + n / 2, n) - n / 2;
    s.target = loop ? base + d : want;
    s.emitted = want;
    s.kick();
  });

  /* ---------- input ---------- */
  const pxPer = () => (layout ? layout.S * 0.5 : 200);
  const nearest = (i: number) => {
    const s = st.current;
    let o = i - s.target;
    if (P.current.loop) o = mod(o + n / 2, n) - n / 2;
    return s.target + o;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !n || seconds !== undefined) return;
    const s = st.current;
    const el = (e.target as HTMLElement).closest("[data-cf-i]") as HTMLElement | null;
    s.downCard = el ? Number(el.dataset.cfI) : -1;
    s.dragging = true;
    s.moved = false;
    s.startX = e.clientX;
    s.startPos = s.pos;
    s.vel = 0;
    s.aim = s.pos;
    s.aimVel = 0;
    s.samples = [{ t: performance.now(), p: s.pos }];
    (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
    s.kick();
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.startX;
    if (!s.moved && Math.abs(dx) > 6) s.moved = true;
    if (!s.moved) return;
    let p = s.startPos - dx / pxPer();
    if (!P.current.loop) {
      const lo = 0, hi = n - 1;
      if (p < lo) p = lo - (1 - 1 / (1 + (lo - p) * 0.6)) / 0.6;
      if (p > hi) p = hi + (1 - 1 / (1 + (p - hi) * 0.6)) / 0.6;
    }
    s.pos = p;
    const now = performance.now();
    s.samples.push({ t: now, p });
    while (s.samples.length > 2 && now - s.samples[0].t > 100) s.samples.shift();
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.dragging) return;
    s.dragging = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
    if (!s.moved) {
      if (s.downCard >= 0) {
        const t = nearest(s.downCard);
        if (t === s.target && Math.abs(s.pos - s.target) < 0.5) P.current.onSelect?.(mod(t, n));
        else request(t);
      }
      return;
    }
    const a = s.samples[0], b = s.samples[s.samples.length - 1];
    const v = b && a && b.t - a.t > 8 ? ((b.p - a.p) / (b.t - a.t)) * 1000 : 0;
    s.vel = s.reduced ? 0 : clamp(v, -30, 30);
    s.aim = s.pos;
    s.aimVel = s.vel;
    const proj = s.pos + s.vel * 0.2;
    request(clamp(Math.round(proj), Math.round(s.pos) - 6, Math.round(s.pos) + 6));
  };

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || seconds !== undefined) return;
    const onWheel = (e: WheelEvent) => {
      const s = st.current, pr = P.current;
      if (!pr.n) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
      const dx = e.deltaX * unit, dy = e.deltaY * unit;
      const now = performance.now();
      if (Math.abs(dx) > Math.abs(dy) || (e.shiftKey && dy)) {
        e.preventDefault();
        const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        let p = s.pos + d / pxPer();
        if (!pr.loop) p = clamp(p, -0.35, pr.n - 1 + 0.35);
        s.pos = p;
        s.vel = 0;
        s.aim = p;
        s.aimVel = 0;
        s.wheelAt = now;
        clearTimeout(s.wheelTimer);
        s.wheelTimer = setTimeout(() => request(Math.round(st.current.pos)), 150);
        s.kick();
      } else if (pr.wheel && dy) {
        e.preventDefault();
        if (now - s.wheelLast > 400) s.wheelAcc = 0;
        s.wheelLast = now;
        s.wheelAcc += dy;
        if (Math.abs(s.wheelAcc) >= 36 && now - s.wheelStep > 140) {
          request(s.target + Math.sign(s.wheelAcc));
          s.wheelAcc = 0;
          s.wheelStep = now;
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [seconds, layout, request]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!n || seconds !== undefined) return;
    const s = st.current;
    let t: number | null = null;
    if (e.key === "ArrowRight") t = s.target + 1;
    else if (e.key === "ArrowLeft") t = s.target - 1;
    else if (e.key === "Home") t = nearest(0);
    else if (e.key === "End") t = nearest(n - 1);
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); P.current.onSelect?.(mod(s.target, n)); return; }
    if (t === null) return;
    e.preventDefault();
    request(t);
  };

  /* ---------- render ---------- */
  const L = layout;
  const S = L ? L.S : 0;
  const ringPad = 5;
  const titlePx = Math.max(13, S * TITLE.size);
  const subPx = Math.max(11, S * SUB.size);
  const cur = items[active];

  return (
    <div
      ref={rootRef}
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        st.current.focus = true;
        let fv = true;
        try { fv = (e.target as HTMLElement).matches(":focus-visible"); } catch { fv = true; }
        if (e.target === e.currentTarget) setFocusRing(fv);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) { st.current.focus = false; setFocusRing(false); }
      }}
      onPointerEnter={() => { st.current.hover = true; }}
      onPointerLeave={() => { st.current.hover = false; }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 360,
        aspectRatio: "16 / 9",
        background: pageColor,
        overflow: "hidden",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      <div ref={probeRef} aria-hidden style={{ position: "absolute", left: -9999, top: 0, fontFamily: font, fontSize: 100, lineHeight: 1, whiteSpace: "nowrap", visibility: "hidden" }}>
        <span style={{ display: "inline-block", verticalAlign: "top" }}>H</span>
        <span style={{ display: "inline-block", width: 1, height: 0, verticalAlign: "baseline" }} />
      </div>
      {L && (
        <>
          <svg
            aria-hidden
            width={L.sw + ringPad * 2 + 4}
            height={L.sh + ringPad * 2 + 4}
            style={{ position: "absolute", left: L.sx - ringPad - 2, top: L.sy - ringPad - 2, pointerEvents: "none", opacity: focusRing ? 1 : 0, transition: "opacity 160ms ease" }}
          >
            <path d={squircle(L.sw + ringPad * 2, L.sh + ringPad * 2, STAGE_CORNER * L.sh + ringPad, STAGE_CORNER_N, 2, 2)} fill="none" stroke={accent} strokeWidth={2.5} />
          </svg>
          <div
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              position: "absolute",
              left: L.sx,
              top: L.sy,
              width: L.sw,
              height: L.sh,
              background: stageColor,
              clipPath: `path("${squircle(L.sw, L.sh, STAGE_CORNER * L.sh, STAGE_CORNER_N)}")`,
              touchAction: "pan-y",
              userSelect: "none",
              WebkitUserSelect: "none",
              cursor: "grab",
              isolation: "isolate",
            }}
          >
            {/* blurred, dimmed copy of the centre art behind everything */}
            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              {items.map((it, i) => (
                <div
                  key={i}
                  ref={(el) => { backRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    left: L.sw * 0.02,
                    top: -L.sh * 0.15,
                    width: L.sw * 1.06,
                    height: L.sh * 2.2,
                    opacity: 0,
                    visibility: "hidden",
                  }}
                >
                  <canvas ref={(el) => { backArtRefs.current[i] = el; }} style={{ width: "100%", height: "100%", display: "block" }} />
                </div>
              ))}
              <div
                style={{
                  position: "absolute",
                  left: L.cx - S * 0.5,
                  top: L.cy - S * 0.5,
                  width: S,
                  height: S,
                  zIndex: 3,
                  borderRadius: S * 0.06,
                  boxShadow: `0 0 ${(S * 0.09).toFixed(1)}px ${(S * 0.02).toFixed(1)}px rgba(0, 0, 0, 0.55)`,
                }}
              />
              <div style={{ position: "absolute", inset: 0, zIndex: 3, background: `linear-gradient(90deg, color-mix(in srgb, ${stageColor} 30%, transparent) 0%, transparent 32%, transparent 62%, color-mix(in srgb, ${stageColor} 45%, transparent) 100%)` }} />
              <div style={{ position: "absolute", inset: 0, zIndex: 4, background: `linear-gradient(180deg, ${FLOOR.map(([o, a]) => `color-mix(in srgb, ${stageColor} ${a}%, transparent) ${o}%`).join(", ")})` }} />
            </div>
            {/* covers */}
            <div style={{ position: "absolute", inset: 0 }}>
              {items.map((it, i) => (
                <div key={i} ref={(el) => { wrapRefs.current[i] = el; }} style={{ position: "absolute", inset: 0, pointerEvents: "none", visibility: "hidden" }}>
                  <div
                    ref={(el) => { cardRefs.current[i] = el; }}
                    data-cf-i={i}
                    role="button"
                    tabIndex={-1}
                    aria-label={i === active ? `${it.title}${it.subtitle ? `, ${it.subtitle}` : ""}` : `Show ${it.title}`}
                    aria-current={i === active ? "true" : undefined}
                    style={{ position: "absolute", left: 0, top: 0, width: S, height: S, transformOrigin: "50% 50%", pointerEvents: "auto", willChange: "transform" }}
                  >
                    <div ref={(el) => { shadowRefs.current[i] = el; }} style={{ position: "absolute", inset: 0, borderRadius: S * 0.05, boxShadow: `0 ${(S * 0.012).toFixed(1)}px ${(S * 0.05).toFixed(1)}px rgba(0, 0, 0, 0.32)`, opacity: 0 }} />
                    {showReflection && (
                      <div ref={(el) => { mirrorRefs.current[i] = el; }} aria-hidden style={{ position: "absolute", left: 0, top: S * 1.012, width: S, height: S, transform: "scaleY(-1)", opacity: 0, WebkitMaskImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0%, transparent 36%)", maskImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0%, transparent 36%)", borderRadius: CORNER_C * S, overflow: "hidden" }}>
                        {it.src ? <img src={it.src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <canvas ref={(el) => { mirrorArtRefs.current[i] = el; }} style={{ width: "100%", height: "100%", display: "block" }} />}
                      </div>
                    )}
                    <div ref={(el) => { clipRefs.current[i] = el; }} style={{ position: "absolute", inset: 0, overflow: "hidden", background: stageColor }}>
                      {it.src ? (
                        <img src={it.src} alt={it.alt ?? it.title} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <canvas ref={(el) => { artRefs.current[i] = el; }} role="img" aria-label={it.alt ?? it.title} style={{ width: "100%", height: "100%", display: "block" }} />
                      )}
                      <div ref={(el) => { fadeRefs.current[i] = el; }} style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent ${FADE_FROM * 100}%, ${stageColor} ${FADE_TO * 100}%)`, opacity: 0 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* the far left edge sinks into the stage */}
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2000, pointerEvents: "none", background: `linear-gradient(90deg, ${EDGE.map(([o, a]) => `color-mix(in srgb, ${stageColor} ${a}%, transparent) ${o}%`).join(", ")})` }} />
            {showCaptions && (
              <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2001, pointerEvents: "none" }}>
                {items.map((it, i) => (
                  <div
                    key={i}
                    ref={(el) => { capRefs.current[i] = el; }}
                    style={{ position: "absolute", left: 0, top: L.cy - S / 2, width: S * 0.92, height: S, opacity: 0, visibility: "hidden", fontFamily: font, textAlign: "center", color: captionColor }}
                  >
                    <div style={{ position: "absolute", left: 0, right: 0, top: S * TITLE.base - baseline * titlePx, fontSize: titlePx, lineHeight: 1, fontWeight: 400, letterSpacing: "-0.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.title}</div>
                    {it.subtitle && (
                      <div style={{ position: "absolute", left: 0, right: 0, top: S * TITLE.base + Math.max(subPx * 1.18, S * (SUB.base - TITLE.base)) - baseline * subPx, fontSize: subPx, lineHeight: 1, fontWeight: 400, opacity: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.subtitle}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {cur ? `${cur.title}${cur.subtitle ? `, ${cur.subtitle}` : ""}. ${active + 1} of ${n}` : ""}
      </div>
    </div>
  );
}

export default CoverFlow;
