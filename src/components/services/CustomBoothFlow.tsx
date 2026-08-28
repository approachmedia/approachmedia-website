'use client'

/**
 * The scroll-driven sections on /services/custom-booth-fabrication, on the
 * shared FlowScrubSection: the approved full-screen video + text pattern.
 * Copy is the page's existing copy verbatim (em dashes to commas or periods
 * per the motion convention). Clips are this page's own two, unused
 * elsewhere: the ZEON pharma stall with visitors for the reasons, and the
 * steady arc around the TEXSPIN build for the process.
 */

import { Award, Hammer, Layers, Ruler, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { FlowScrubSection, type FlowItem } from './ServiceFlow'

const REASONS: FlowItem[] = [
  { icon: Hammer, title: 'In-house workshop', copy: 'Our own 30,000 sq ft facility houses carpentry, metal, print, electricals and finishing under one roof. No third-party delays, no quality compromises.' },
  { icon: ShieldCheck, title: 'Full mock-up QC', copy: 'Every booth is fully erected and inspected in our warehouse before it ships. What you approve in the warehouse is exactly what appears on the floor.' },
  { icon: Wrench, title: 'Precision engineering', copy: 'Working drawings, tight tolerances and experienced fabricators mean every component fits the first time: millimetre accuracy on every joint and surface.' },
  { icon: Truck, title: 'End-to-end logistics', copy: 'Crating, freight, customs clearance, on-site installation and post-show dismantling. One accountable team from our workshop door to the exhibition floor.' },
  { icon: Layers, title: 'Material mastery', copy: 'Premium veneers, structural steel, fire-rated panels, edge-lit acrylic: we specify and source the right material for the right structural and aesthetic role.' },
  { icon: Award, title: 'International standards', copy: 'Booths built to satisfy venue safety norms in Frankfurt, Dubai, Singapore and Mumbai. Load ratings, fire certifications, and clean finishes every time.' },
]

const STEPS: FlowItem[] = [
  { num: '01', icon: Wrench, title: 'Brief & Engineering', copy: 'We review your design brief, exhibition specs and site conditions, turning creative intent into a buildable, costed plan.' },
  { num: '02', icon: Ruler, title: 'Technical Drawings', copy: 'Precise fabrication drawings with component breakdowns, tolerances and material callouts. Nothing goes to the shop floor without engineering sign-off.' },
  { num: '03', icon: Layers, title: 'Material Sourcing', copy: 'We procure veneers, structural steel, panels, hardware and finishes from vetted suppliers, checked against spec before cutting begins.' },
  { num: '04', icon: Hammer, title: 'In-House Fabrication', copy: 'Carpentry, metalwork, finishing and branding elements are all produced in our 30,000 sq ft workshop by permanent, skilled teams.' },
  { num: '05', icon: ShieldCheck, title: 'Mock-Up & QC', copy: 'The entire booth is assembled and inspected under show conditions. Dimensions, finishes, joints and hardware are signed off before crating.' },
  { num: '06', icon: Truck, title: 'On-Site Installation', copy: 'Our crew handles freight, on-site assembly, AV hook-up and standby support for the full show duration, then full dismantling after.' },
]

export function FabWhyFlow() {
  return (
    <FlowScrubSection
      ariaLabel="Why choose Approach Media"
      clip="pharma-exhibition-stall-design-02"
      eyebrow="Why choose Approach Media"
      title="Six reasons project managers sleep better with us on the build."
      cta={{ href: '/contact', label: 'Discuss your project' }}
      pairs={[[REASONS[0], REASONS[1]], [REASONS[2], REASONS[3]], [REASONS[4], REASONS[5]]]}
    />
  )
}

export function FabProcessFlow() {
  return (
    <FlowScrubSection
      ariaLabel="Our six step fabrication process"
      clip="custom-trade-show-booth-design-india-01"
      eyebrow="From brief to on-site installation"
      title="A 6-step fabrication process built around zero surprises."
      pairs={[[STEPS[0], STEPS[1]], [STEPS[2], STEPS[3]], [STEPS[4], STEPS[5]]]}
    />
  )
}
