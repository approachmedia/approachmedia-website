'use client';

/**
 * Style 1 / 2 / 4 (InfiniteGallery): photographs float at different depths and
 * travel toward the camera, bending like cloth with the speed, rippling like
 * a flag under the pointer, and blurring and fading at the far and near ends.
 *
 * Reworked from the original for a page that has to keep scrolling:
 *  - it is driven by the page's own scroll (the faster the page moves, the
 *    faster the photographs come), plus a slow drift at rest. The original
 *    captured the wheel over the canvas and called preventDefault, which
 *    traps the visitor inside the section.
 *  - motion state lives in refs, not React state: the original set state on
 *    every frame, re-rendering the scene 60 times a second.
 *  - it renders only while on screen, with the pixel ratio capped.
 *  - textures load through the site's own image endpoint (/_next/image),
 *    because WebGL needs CORS on cross-origin images and the R2 bucket does
 *    not send it. Same-origin also gets a resized, compressed copy.
 *  - a load failure or a browser without WebGL falls back to a plain grid of
 *    the same photographs instead of throwing.
 *  - reduced motion: a still frame.
 */

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export type GalleryImage = { src: string; alt?: string };

type Props = {
  images: GalleryImage[];
  /** Multiplier on the scroll-driven speed. */
  speed?: number;
  visibleCount?: number;
  className?: string;
  children?: ReactNode;
};

const DEPTH = 50;

/** Same-origin, resized copy of a remote photograph, safe to upload to WebGL. */
export function proxied(src: string, w = 640) {
  if (src.startsWith('/')) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=70`;
}

function clothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1 },
      blurAmount: { value: 0 },
      scrollForce: { value: 0 },
      time: { value: 0 },
      isHovered: { value: 0 },
    },
    vertexShader: `
      uniform float scrollForce; uniform float time; uniform float isHovered;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float d = length(pos.xy);
        float curve = d * d * curveIntensity;
        float ripple = (sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02 + sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015) * abs(curveIntensity) * 2.0;
        float flag = 0.0;
        if (isHovered > 0.5) {
          float damp = smoothstep(-0.5, 0.5, pos.x);
          flag = (sin(pos.x * 3.0 + time * 8.0) * 0.1 + sin(pos.x * 5.0 + time * 12.0) * 0.03) * damp;
        }
        pos.z -= (curve + ripple + flag);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D map; uniform float opacity; uniform float blurAmount; uniform float scrollForce;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texel = 1.0 / vec2(textureSize(map, 0));
          vec4 acc = vec4(0.0); float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              float w = 1.0 / (1.0 + length(vec2(x, y)));
              acc += texture2D(map, vUv + vec2(x, y) * texel * blurAmount) * w;
              total += w;
            }
          }
          color = acc / total;
        }
        color.rgb += vec3(abs(scrollForce) * 0.005);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }`,
  });
}

/** Opacity and blur as a plane travels from the far end (0) to the camera (1). */
function falloff(n: number) {
  const fadeIn = n < 0.05 ? 0 : n < 0.25 ? (n - 0.05) / 0.2 : 1;
  const fadeOut = n < 0.4 ? 1 : n < 0.43 ? 1 - (n - 0.4) / 0.03 : 0;
  const blurIn = n < 0.1 ? 8 * (1 - n / 0.1) : 0;
  const blurOut = n < 0.4 ? 0 : n < 0.43 ? 8 * ((n - 0.4) / 0.03) : 8;
  return { opacity: Math.min(fadeIn, fadeOut), blur: Math.max(blurIn, blurOut) };
}

function Scene({ images, speed, visibleCount, velocity, reduce }: {
  images: GalleryImage[]; speed: number; visibleCount: number;
  velocity: React.MutableRefObject<number>; reduce: boolean;
}) {
  const textures = useTexture(images.map(i => proxied(i.src)));
  const materials = useMemo(() => Array.from({ length: visibleCount }, clothMaterial), [visibleCount]);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  const spots = useMemo(() => Array.from({ length: visibleCount }, (_, i) => {
    const h = (i * 2.618) % (Math.PI * 2);
    const v = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
    return { x: (Math.sin(h) * (i % 3) * 1.2 * 8) / 3, y: (Math.cos(v) * ((i + 1) % 4) * 0.8 * 8) / 4 };
  }), [visibleCount]);

  const planes = useRef(Array.from({ length: visibleCount }, (_, i) => ({
    z: ((DEPTH / visibleCount) * i) % DEPTH,
    img: i % images.length,
  })));

  useEffect(() => () => materials.forEach(m => m.dispose()), [materials]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!reduce) velocity.current += 0.3 * dt; // idle drift
    velocity.current *= 0.95;
    const v = velocity.current * speed;
    const t = state.clock.getElapsedTime();
    const advance = visibleCount % images.length || images.length;
    planes.current.forEach((p, i) => {
      let z = p.z + v * dt * 10;
      if (z >= DEPTH) { p.img = (p.img + advance) % images.length; z -= DEPTH; }
      if (z < 0) { p.img = ((p.img - advance) % images.length + images.length) % images.length; z += DEPTH; }
      p.z = z;
      const mesh = meshes.current[i];
      const mat = materials[i];
      if (!mesh || !mat) return;
      const tex = textures[p.img];
      if (mat.uniforms.map.value !== tex) mat.uniforms.map.value = tex;
      const img = tex.image as { width: number; height: number } | undefined;
      const a = img ? img.width / img.height : 1;
      mesh.scale.set(a > 1 ? 2 * a : 2, a > 1 ? 2 : 2 / a, 1);
      mesh.position.set(spots[i].x, spots[i].y, z - DEPTH / 2);
      const f = falloff(z / DEPTH);
      mat.uniforms.opacity.value = f.opacity;
      mat.uniforms.blurAmount.value = f.blur;
      mat.uniforms.time.value = t;
      mat.uniforms.scrollForce.value = v;
    });
  });

  return (
    <>
      {materials.map((m, i) => (
        <mesh
          key={i}
          ref={el => { meshes.current[i] = el }}
          material={m}
          onPointerEnter={() => { m.uniforms.isHovered.value = 1 }}
          onPointerLeave={() => { m.uniforms.isHovered.value = 0 }}
        >
          <planeGeometry args={[1, 1, 32, 32]} />
        </mesh>
      ))}
    </>
  );
}

function Fallback({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-2 opacity-60 md:grid-cols-4">
      {images.slice(0, 12).map((im, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={im.src} alt={im.alt ?? ''} loading="lazy" className="h-full w-full rounded-md object-cover" />
      ))}
    </div>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function InfiniteGallery({ images, speed = 1, visibleCount = 12, className = 'relative h-96 w-full', children }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);
  const [visible, setVisible] = useState(false); // mounted once, then kept
  const [onScreen, setOnScreen] = useState(false); // renders only while true
  const [webgl, setWebgl] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) setWebgl(false);
    } catch { setWebgl(false); }
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Mount and run only near the screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { setOnScreen(e.isIntersecting); if (e.isIntersecting) setVisible(true) }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The page's scroll is the throttle.
  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      velocity.current = Math.max(-6, Math.min(6, velocity.current + (y - last) * 0.004));
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  const usable = images.filter(i => i.src);

  return (
    <div ref={box} className={className}>
      {usable.length > 0 && (webgl ? (
        <Boundary fallback={<Fallback images={usable} />}>
          {visible && (
            <Canvas
              camera={{ position: [0, 0, 0], fov: 55 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              frameloop={reduce || !onScreen ? 'demand' : 'always'}
              // A swipe over the gallery must keep scrolling the page.
              style={{ touchAction: 'pan-y' }}
            >
              <Suspense fallback={null}>
                <Scene images={usable} speed={speed} visibleCount={visibleCount} velocity={velocity} reduce={reduce} />
              </Suspense>
            </Canvas>
          )}
        </Boundary>
      ) : <Fallback images={usable} />)}
      {children}
    </div>
  );
}
