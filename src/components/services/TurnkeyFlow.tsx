'use client'

/**
 * The scroll-driven sections on /services/turnkey-project-management, on the
 * shared FlowScrubSection: the approved full-screen video + text pattern.
 * Copy is the page's existing copy verbatim (em dashes to commas or colons
 * per the motion convention). Clips are this page's own two, unused
 * elsewhere: the camera arcing around the finished MOUNT stand for the
 * reasons, and the dolly through its handed-over lounge for the process.
 */

import {
  Calendar, ClipboardList, FileText, Globe2, Hammer, PackageCheck, PenTool,
  Ruler, ShieldCheck, Truck, Users,
} from 'lucide-react'
import { FlowScrubSection, type FlowItem } from './ServiceFlow'

const REASONS: FlowItem[] = [
  { icon: ClipboardList, title: 'Single accountability', copy: 'One team owns every stage: design, fabrication, logistics, installation, and dismantling. No finger-pointing, no gaps, no surprises.' },
  { icon: Calendar, title: 'Timeline management', copy: 'Structured milestone schedules, built-in buffer windows, and proactive replanning if anything shifts, so the show always opens on time.' },
  { icon: Users, title: 'Cross-team coordination', copy: 'We coordinate internal teams, venue authorities, freight partners, and on-site crews under a single master plan you always have visibility into.' },
  { icon: Globe2, title: 'International execution', copy: 'Exhibitions across 14+ countries. We manage local compliance, import documentation, ground-level logistics, and trusted regional partners.' },
  { icon: ShieldCheck, title: 'Risk management', copy: 'Contingency plans for every critical path item. We identify and de-risk before mobilisation, not on the show floor.' },
  { icon: FileText, title: 'Transparent reporting', copy: 'Regular status updates, budget trackers, and post-event documentation. You always know exactly where the project stands.' },
]

const STEPS: FlowItem[] = [
  { num: '01', icon: ClipboardList, title: 'Brief', copy: 'We capture your event, brand goals, footprint, timeline, and budget in a focused discovery session.' },
  { num: '02', icon: PenTool, title: 'Design', copy: 'Concept, mood, spatial layout and 3D walkthroughs, refined until you can see and feel the result.' },
  { num: '03', icon: Ruler, title: 'Scope & Quote', copy: 'A transparent, line-item budget covering every stage. No hidden vendor charges, no scope ambiguity.' },
  { num: '04', icon: Hammer, title: 'Fabrication', copy: 'Built in our 30,000 sq ft in-house warehouse: carpentry, metal, print, lighting, and AV under one roof.' },
  { num: '05', icon: ShieldCheck, title: 'QC Mock-up', copy: 'The entire stand is erected and inspected end-to-end before it leaves our workshop.' },
  { num: '06', icon: Truck, title: 'Logistics & Installation', copy: 'Freight, venue approvals, on-site build, AV calibration, and a standby crew for every show day.' },
  { num: '07', icon: PackageCheck, title: 'Dismantling', copy: 'Clean, safe dismantle, asset return, and a full post-event project close-out report.' },
]

export function TurnkeyWhyFlow() {
  return (
    <FlowScrubSection
      ariaLabel="Why choose Approach Media"
      clip="award-winning-stall-design-and-fabrication-agency-01"
      eyebrow="Why choose Approach Media"
      title="Six reasons project teams hand it over to us and sleep soundly."
      cta={{ href: '/contact', label: 'Discuss your project' }}
      pairs={[[REASONS[0], REASONS[1]], [REASONS[2], REASONS[3]], [REASONS[4], REASONS[5]]]}
    />
  )
}

export function TurnkeyProcessFlow() {
  return (
    <FlowScrubSection
      ariaLabel="Our seven step turnkey process"
      clip="award-winning-stall-design-and-fabrication-agency-02"
      eyebrow="From brief to dismantling"
      title="A 7-step process with zero gaps in ownership."
      cta={{ href: '/contact', label: 'Start your project' }}
      pairs={[[STEPS[0], STEPS[1]], [STEPS[2], STEPS[3]], [STEPS[4], STEPS[5]], [STEPS[6]]]}
      span={4.4}
    />
  )
}
