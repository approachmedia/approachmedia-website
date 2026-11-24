'use client'

/**
 * Style 6 (Stellar Card Gallery): the projects as cards floating on a sphere
 * in a starfield. Drag to turn it (mouse), it turns slowly by itself, and a
 * card opens a tilting preview with a link to its project.
 *
 * Reworked from the original for a section inside a scrolling page:
 *  - the starfield is drawn inside the section, not fixed over the window;
 *  - zoom is off, so the wheel scrolls the page instead of zooming;
 *  - on touch screens dragging is off too (it would swallow vertical
 *    scrolling); the sphere turns by itself and a card is still a tap;
 *  - the preview's Download and favourite buttons are replaced by a single
 *    link to the project page, which is what a visitor here needs;
 *  - the canvas only renders while on screen;
 *  - reduced motion: no auto-turn and no tilt.
 *
 * Cards are DOM images (drei Html), so the R2 photographs need no CORS.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowUpRight, X } from 'lucide-react'

export type StellarCard = { id: string; imageUrl: string; alt: string; title: string; href: string }

function Stars() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const n = 4000
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 400
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d * 0.006; ref.current.rotation.x += d * 0.003 } })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.35} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

function Card({ card, position, onOpen }: { card: StellarCard; position: [number, number, number]; onOpen: (c: StellarCard) => void }) {
  const group = useRef<THREE.Group>(null)
  const [hover, setHover] = useState(false)
  useFrame(({ camera }) => { group.current?.lookAt(camera.position) })
  return (
    <group ref={group} position={position}>
      <mesh
        onClick={e => { e.stopPropagation(); onOpen(card) }}
        onPointerOver={e => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = '' }}
      >
        <planeGeometry args={[4.5, 5.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <Html transform distanceFactor={10} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
        <div
          className="w-40 select-none overflow-hidden rounded-lg bg-[#10151d] p-2.5 transition-transform duration-300"
          style={{
            transform: hover ? 'scale(1.12)' : 'scale(1)',
            boxShadow: hover ? '0 25px 50px hsl(110 55% 50% / 0.4), 0 0 30px hsl(110 55% 50% / 0.25)' : '0 15px 30px rgba(0,0,0,0.6)',
            border: hover ? '2px solid hsl(110 55% 50% / 0.6)' : '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.imageUrl} alt="" loading="lazy" draggable={false} className="h-28 w-full rounded-md object-cover" />
          <p className="mt-1.5 line-clamp-2 text-center text-xs font-medium leading-tight text-white">{card.title}</p>
        </div>
      </Html>
    </group>
  )
}

/** Touch screens: the sphere turns by itself, with no controls attached. */
function Spin({ on, children }: { on: boolean; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, d) => { if (on && g.current) g.current.rotation.y += d * 0.12 })
  return <group ref={g}>{children}</group>
}

function Galaxy({ cards, onOpen }: { cards: StellarCard[]; onOpen: (c: StellarCard) => void }) {
  const spots = useMemo(() => {
    const n = cards.length
    const phi = (1 + Math.sqrt(5)) / 2
    return cards.map((_, i) => {
      const y = n > 1 ? 1 - (i / (n - 1)) * 2 : 0
      const r = Math.sqrt(1 - y * y)
      const t = (2 * Math.PI * i) / phi
      const R = 12 + (i % 3) * 4
      return [Math.cos(t) * r * R, y * R, Math.sin(t) * r * R] as [number, number, number]
    })
  }, [cards])
  return (
    <>
      <Sphere args={[12, 32, 32]}><meshBasicMaterial color="#3fbf4a" transparent opacity={0.05} wireframe /></Sphere>
      <Sphere args={[18, 32, 32]}><meshBasicMaterial color="#4f6bff" transparent opacity={0.03} wireframe /></Sphere>
      {cards.map((c, i) => <Card key={c.id} card={c} position={spots[i]} onOpen={onOpen} />)}
    </>
  )
}

function Preview({ card, onClose }: { card: StellarCard; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md" style={{ perspective: 1000 }}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10">
          <X className="h-6 w-6" />
        </button>
        <div
          ref={box}
          className="rounded-2xl bg-[#10151d] p-4 shadow-2xl transition-transform duration-500 ease-out"
          onMouseMove={e => {
            if (!box.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
            const r = box.current.getBoundingClientRect()
            const rx = (e.clientY - r.top - r.height / 2) / 18
            const ry = (r.width / 2 - (e.clientX - r.left)) / 18
            box.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
          }}
          onMouseLeave={() => { if (box.current) box.current.style.transform = '' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.imageUrl} alt={card.alt} className="aspect-[4/3] w-full rounded-xl object-cover" />
          <h3 className="mt-4 text-center font-display text-lg font-semibold text-white">{card.title}</h3>
          <Link href={card.href} className="am-btn mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green text-sm font-bold text-accent-foreground">
            View project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function StellarGallery({ cards }: { cards: StellarCard[] }) {
  const box = useRef<HTMLDivElement>(null)
  // Mounted once on first approach and then kept: unmounting a canvas with
  // drei <Html> children mid-render throws. Off screen it stops rendering.
  const [visible, setVisible] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [open, setOpen] = useState<StellarCard | null>(null)
  const [touch, setTouch] = useState(false)
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { setOnScreen(e.isIntersecting); if (e.isIntersecting) setVisible(true) }, { rootMargin: '150px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={box} className="relative h-[85svh] min-h-[520px] w-full overflow-hidden rounded-3xl bg-black" data-own-cursor>
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 26], fov: 60 }}
          dpr={[1, 1.75]}
          frameloop={reduce || !onScreen ? 'demand' : 'always'}
          // A vertical swipe over the sphere must still scroll the page.
          style={{ touchAction: 'pan-y' }}
        >
          <Suspense fallback={null}>
            <Stars />
            {touch ? (
              // OrbitControls sets touch-action: none on the canvas, which
              // would trap a phone's scroll; on touch it is not mounted.
              <Spin on={!reduce}><Galaxy cards={cards} onOpen={setOpen} /></Spin>
            ) : (
              <>
                <Galaxy cards={cards} onOpen={setOpen} />
                <OrbitControls enablePan={false} enableZoom={false} autoRotate={!reduce} autoRotateSpeed={0.6} rotateSpeed={0.5} />
              </>
            )}
          </Suspense>
        </Canvas>
      )}
      {open && <Preview card={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
