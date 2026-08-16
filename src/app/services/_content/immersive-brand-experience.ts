/**
 * Moved out of the page so the services hub can list the same points on its
 * expand cards without a second copy of the wording. The page imports this
 * and renders it exactly as before.
 */
import { Layers3, Lightbulb, MousePointerClick, Sparkles, Volume2, Wand2 } from 'lucide-react'

export const sensoryLayers = [
  { icon: Layers3,          title: 'Spatial Narrative',       copy: 'A walk-through story arc — anticipation, reveal, interaction, recall.' },
  { icon: Lightbulb,        title: 'Cinematic Lighting',      copy: 'Choreographed beams, gradients and reveals that steer the eye.' },
  { icon: Volume2,          title: 'Soundscape Design',       copy: 'Directional audio zones that change as visitors move through space.' },
  { icon: Wand2,            title: 'Material & Texture',      copy: 'Tactile surfaces — wood, brass, fluted glass, micro-mesh — to feel premium.' },
  { icon: MousePointerClick, title: 'Interactive Touchpoints', copy: 'Touch walls, AR previews, kinetic installations, branded games.' },
  { icon: Sparkles,         title: 'Moments of Surprise',     copy: 'Projection mapping, kinetic ceilings, hidden reveals — designed to be shared.' },
]

