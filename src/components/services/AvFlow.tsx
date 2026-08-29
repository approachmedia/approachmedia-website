'use client'

/**
 * The two scroll-driven sections on /services/av-technology-integration, on
 * the shared FlowScrubSection: the approved full-screen video + text pattern.
 * Copy is the page's existing copy verbatim (em dashes to colons or commas
 * per the motion convention). Clips are the two the owner uploaded for this
 * page: the VR headset demo at the ALPHABET stall for the technologies, and
 * the circular LED ring with the spherical dome at the DST stall for the
 * process.
 */

import {
  Cpu, Film, Lightbulb, Monitor, MousePointerClick, Play, Settings, Sparkles,
  Users, Volume2, Wifi, Zap,
} from 'lucide-react'
import { FlowScrubSection, type FlowItem } from './ServiceFlow'

const TECH: FlowItem[] = [
  { icon: Monitor, title: 'LED Video Walls', copy: 'Seamless, high-brightness LED panels sized to your footprint: from a sharp 6 sqm accent wall to a commanding 48 sqm hero display.' },
  { icon: Volume2, title: 'Immersive Soundscapes', copy: 'Directional speaker arrays that bathe your zone in brand audio without bleeding into neighbouring stalls.' },
  { icon: MousePointerClick, title: 'Interactive Touchscreens', copy: 'Large-format multi-touch displays running product configurators, catalogues and data-capture experiences.' },
  { icon: Sparkles, title: 'Projection Mapping', copy: 'Projector-mapped content onto curved surfaces, product shells and architectural features: the moment every visitor photographs.' },
  { icon: Zap, title: 'Lighting Design', copy: 'Cove, spot, dynamic colour-wash and kinetic lighting choreographed to steer attention and set the mood.' },
  { icon: Wifi, title: 'Smart Technology Integration', copy: 'RFID check-ins, real-time analytics dashboards, CRM-connected lead capture and IoT-controlled environments.' },
]

const STEPS: FlowItem[] = [
  { num: '01', icon: Lightbulb, title: 'AV Brief & Goals', copy: 'We map your technology objectives, content strategy and audience journey before a single component is specified.' },
  { num: '02', icon: Cpu, title: 'Concept Integration', copy: 'AV is designed into the stall architecture from the start: LED walls become structural, speakers disappear into ceilings.' },
  { num: '03', icon: Settings, title: 'Engineering & Spec', copy: 'Power loads, signal paths, rigging weights and cable runs resolved in CAD, no surprises on the show floor.' },
  { num: '04', icon: Film, title: 'Content Production', copy: 'Motion graphics, product reels, interactive UI and ambient loops produced in-house to match screen spec perfectly.' },
  { num: '05', icon: Play, title: 'On-Site Installation & Calibration', copy: 'Our crew installs, configures and colour-calibrates every display, speaker and lighting fixture, then runs a full dress rehearsal.' },
  { num: '06', icon: Users, title: 'Live Show Support', copy: 'Dedicated on-floor AV technician throughout the show: content swaps, re-calibrations and incident response in minutes.' },
]

export function AvWhyFlow() {
  return (
    <FlowScrubSection
      ariaLabel="What we integrate"
      clip="exhibition-stall-av-technology-integration-01"
      eyebrow="What we integrate"
      title="Six technologies. One seamless stall experience."
      cta={{ href: '/contact', label: 'Discuss your AV brief' }}
      pairs={[[TECH[0], TECH[1]], [TECH[2], TECH[3]], [TECH[4], TECH[5]]]}
    />
  )
}

export function AvProcessFlow() {
  return (
    <FlowScrubSection
      ariaLabel="Our six step AV process"
      clip="exhibition-stall-av-technology-integration-02"
      eyebrow="From brief to live show"
      title="A 6-step process that never leaves AV to the last day."
      pairs={[[STEPS[0], STEPS[1]], [STEPS[2], STEPS[3]], [STEPS[4], STEPS[5]]]}
    />
  )
}
