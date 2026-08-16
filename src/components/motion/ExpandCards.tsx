'use client'

/**
 * Motion UI's expand-card mechanic: a grid tile that morphs into a modal
 * detail panel and back, via a shared layoutId on the card surface and on
 * each part that should travel with it.
 *
 * Ported as supplied, with the usual two substitutions — timings from
 * ./tokens instead of a @motion/ui-theme provider, and the "off" motion mode
 * dropped since the theme's reduced-motion strategy is "calm".
 *
 * The overlay helpers (focus trap, scroll lock, backdrop) are the supplied
 * @motion/overlay file, folded in here rather than kept as a separate module
 * because this is the only thing on the site that needs them.
 *
 * One addition: `renderStatic`. The demo's panel content exists only while
 * the panel is open, which is right for a dialog but wrong when the card
 * carries a link that should be in the served HTML. See ServiceExpandGrid —
 * the six links out of the services hub have to survive this change, so they
 * live on the card, not only in the panel.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GENTLE, SNAP, TRAVEL, UI, withFade } from './tokens'

// ── overlay helpers ──────────────────────────────────────────

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableWithin(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
}

/** Trap keyboard focus inside an open overlay, and restore it on close. */
function useFocusTrap({
  active, container, onEscape,
}: {
  active: boolean
  container: RefObject<HTMLElement | null>
  onEscape?: () => void
}) {
  const escapeRef = useRef(onEscape)
  escapeRef.current = onEscape

  useEffect(() => {
    if (!active) return
    const node = container.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const raf = requestAnimationFrame(() => {
      const target = focusableWithin(node)[0] ?? node
      target?.focus({ preventScroll: true })
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        escapeRef.current?.()
        return
      }
      if (event.key !== 'Tab' || !node) return
      const focusables = focusableWithin(node)
      if (focusables.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const activeEl = document.activeElement
      const inside = node.contains(activeEl)
      if (event.shiftKey) {
        if (activeEl === first || !inside) {
          event.preventDefault()
          last.focus()
        }
      } else if (activeEl === last || !inside) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [active, container])
}

/**
 * Freeze background scroll while open.
 *
 * The supplied hook sets overflow: hidden on the document element. This site
 * runs Lenis, which drives its own scroll position and ignores that, so the
 * page keeps gliding behind the dialog. Lenis watches for this data
 * attribute, so both are set.
 */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    root.setAttribute('data-lenis-prevent', '')
    return () => {
      root.style.overflow = previous
      root.removeAttribute('data-lenis-prevent')
    }
  }, [active])
}

// ── context ──────────────────────────────────────────────────

interface ExpandCardsContextValue {
  openId: string | null
  open: (id: string) => void
  close: () => void
  scrimOpacity: number
  group: string
  calm: boolean
}

const ExpandCardsContext = createContext<ExpandCardsContextValue | null>(null)
const CardIdContext = createContext<string | null>(null)

function useCards(): ExpandCardsContextValue {
  const ctx = useContext(ExpandCardsContext)
  if (!ctx) throw new Error('Expand card parts must be used inside <ExpandCards>.')
  return ctx
}

function sharedId(group: string, part: string, id: string) {
  return `${group}-${part}-${id}`
}

export function useExpandCard() {
  const { openId, open, close } = useCards()
  return { openId, open, close, isOpen: (id: string) => openId === id }
}

// ── provider ─────────────────────────────────────────────────

export function ExpandCards({
  children, scrimOpacity = 0.72,
}: {
  children?: ReactNode
  scrimOpacity?: number
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const group = useId()
  const calm = !!useReducedMotion()

  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])

  const value = useMemo(
    () => ({ openId, open, close, scrimOpacity, group, calm }),
    [openId, open, close, scrimOpacity, group, calm],
  )

  return <ExpandCardsContext.Provider value={value}>{children}</ExpandCardsContext.Provider>
}

// ── card ─────────────────────────────────────────────────────

/**
 * The morphing card surface, plus an overlay button that opens it.
 *
 * The demo makes the whole card a <button>. That cannot hold the "Explore
 * service" anchor — a button may not contain a link — so the surface stays a
 * div and the trigger is an absolutely positioned button beneath it in the
 * stacking order. Anything in the card that needs to stay clickable sits
 * above the button instead.
 */
export function ExpandCardTrigger({
  id, children, className, label,
}: {
  id: string
  children?: ReactNode
  className?: string
  label: string
}) {
  const { openId, open, group, calm } = useCards()
  const isOpen = openId === id

  return (
    <CardIdContext.Provider value={id}>
      <div className="group relative h-full">
        <motion.div
          layoutId={calm ? undefined : sharedId(group, 'surface', id)}
          className={className}
          transition={withFade(UI)}
          // The panel takes over the shared layoutId while open; leaving the
          // card visible too would show the same surface twice mid-morph.
          style={{ opacity: isOpen ? 0 : 1 }}
        >
          {children}
        </motion.div>

        <button
          type="button"
          onClick={() => open(id)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={label}
          className="absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </div>
    </CardIdContext.Provider>
  )
}

/** A part that travels between the card and the panel. */
export function ExpandCardShared({
  part, as = 'span', layout, className, children,
}: {
  part: string
  as?: 'span' | 'div'
  layout?: 'position' | 'size' | boolean
  className?: string
  children?: ReactNode
}) {
  const { group, calm } = useCards()
  const cardId = useContext(CardIdContext)
  const El = as === 'div' ? motion.div : motion.span
  return (
    <El
      layoutId={!calm && cardId != null ? sharedId(group, part, cardId) : undefined}
      layout={calm ? undefined : layout}
      className={className}
      transition={withFade(UI)}
    >
      {children}
    </El>
  )
}

/** Detail content that cross-fades in once the surface morph has settled. */
export function ExpandCardBody({ children, className }: { children?: ReactNode; className?: string }) {
  const { calm } = useCards()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: `translateY(${calm ? 0 : TRAVEL.hover}px)` }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ ...SNAP, delay: calm ? 0 : SNAP.duration }}
    >
      {children}
    </motion.div>
  )
}

// ── panel ────────────────────────────────────────────────────

export function ExpandCardPanel({
  children, className, contentClassName, labelledBy, describedBy,
}: {
  children: ((card: { id: string }) => ReactNode) | ReactNode
  className?: string
  contentClassName?: string
  labelledBy?: (id: string) => string
  describedBy?: (id: string) => string
}) {
  const { openId, close, scrimOpacity, group, calm } = useCards()
  const panelRef = useRef<HTMLDivElement>(null)
  const [settledId, setSettledId] = useState<string | null>(null)
  const isOpen = openId != null

  useEffect(() => {
    if (!isOpen) setSettledId(null)
  }, [isOpen])

  useScrollLock(isOpen)
  useFocusTrap({ active: isOpen, container: panelRef, onEscape: close })

  // Scrolling while the surface is still morphing fights the layout
  // animation, so overflow is clipped until it lands.
  const scrollReady = calm || settledId === openId

  return (
    <AnimatePresence>
      {openId != null && (
        <CardIdContext.Provider key="expand-card-panel" value={openId}>
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: scrimOpacity }}
              exit={{ opacity: 0 }}
              transition={{ ...GENTLE, type: 'tween' }}
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy?.(openId)}
              aria-describedby={describedBy?.(openId)}
              layoutId={calm ? undefined : sharedId(group, 'surface', openId)}
              className={className}
              transition={withFade(UI)}
              onLayoutAnimationStart={() => setSettledId(null)}
              onLayoutAnimationComplete={() => setSettledId(openId)}
              initial={calm ? { opacity: 0 } : undefined}
              animate={calm ? { opacity: 1 } : undefined}
              exit={calm ? { opacity: 0 } : undefined}
            >
              <motion.div
                layout={calm ? undefined : 'position'}
                transition={withFade(UI)}
                className={contentClassName}
                style={{ overflowY: scrollReady ? 'auto' : 'clip' }}
              >
                {typeof children === 'function' ? children({ id: openId }) : children}
              </motion.div>
            </motion.div>
          </div>
        </CardIdContext.Provider>
      )}
    </AnimatePresence>
  )
}
