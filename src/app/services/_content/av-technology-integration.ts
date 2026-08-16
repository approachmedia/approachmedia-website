/**
 * Moved out of the page so the services hub can list the same points on its
 * expand cards without a second copy of the wording. The page imports this
 * and renders it exactly as before.
 */
import { Monitor, MousePointerClick, Sparkles, Volume2, Wifi, Zap } from 'lucide-react'

export const whyChoose = [
  { icon: Monitor,           title: 'LED Video Walls',               copy: 'Seamless, high-brightness LED panels sized to your footprint — from a sharp 6 sqm accent wall to a commanding 48 sqm hero display.' },
  { icon: Volume2,           title: 'Immersive Soundscapes',         copy: 'Directional speaker arrays that bathe your zone in brand audio without bleeding into neighbouring stalls.' },
  { icon: MousePointerClick, title: 'Interactive Touchscreens',      copy: 'Large-format multi-touch displays running product configurators, catalogues and data-capture experiences.' },
  { icon: Sparkles,          title: 'Projection Mapping',            copy: 'Projector-mapped content onto curved surfaces, product shells and architectural features — the moment every visitor photographs.' },
  { icon: Zap,               title: 'Lighting Design',               copy: 'Cove, spot, dynamic colour-wash and kinetic lighting choreographed to steer attention and set the mood.' },
  { icon: Wifi,              title: 'Smart Technology Integration',  copy: 'RFID check-ins, real-time analytics dashboards, CRM-connected lead capture and IoT-controlled environments.' },
]

