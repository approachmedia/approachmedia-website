import type { ProseBlock } from '@/components/seo/ProseSection'

export const INTRO =
  'Approach Media is an exhibition stall design and fabrication company working across India and 14 countries. Design, custom booth fabrication, double-decker structures, AV integration and turnkey project management are run as one scope by one team, from an in-house workshop rather than a network of subcontractors. Below is what each service covers and when you would want it.'

export const BLOCKS: ProseBlock[] = [
  {
    heading: 'Choosing the right scope for your show',
    paragraphs: [
      'Most exhibitors do not need every service, and buying more scope than the project warrants is a common way to spend budget that would have been better spent on the stand itself. The right starting point is usually the size of the stand and how much of the process your own team has capacity to run.',
      'If you have an approved design already and need it built well, that is a fabrication brief. If you have a footprint and an objective but no concept, that is a design brief. If you have neither the time nor the internal bandwidth to coordinate four suppliers against an immovable date, that is a turnkey brief.',
    ],
    bullets: [
      { term: 'Exhibition stall design', copy: 'Concept, 3D visualisation and working drawings, with a costed bill of materials behind the design before you approve it.' },
      { term: 'Custom booth fabrication', copy: 'Building from your approved design or ours, in-house, with a full mock-up before crating.' },
      { term: 'Double decker and mezzanine stands', copy: 'Two-storey structures with certified load engineering and organiser-approved structural drawings.' },
      { term: 'AV and technology integration', copy: 'LED walls, interactive displays, audio and show control specified as part of the structure rather than added to it.' },
      { term: 'Immersive brand experience', copy: 'Experiential environments where dwell time and participation matter more than product display.' },
      { term: 'Turnkey project management', copy: 'The whole thing — design through dismantling — under one scope, one budget and one project manager.' },
    ],
  },
  {
    heading: 'Why in-house fabrication changes the outcome',
    paragraphs: [
      'The gap between a stand as designed and a stand as delivered is almost always created at a handoff. A design approved by one company and priced by another gets value-engineered quietly. A drawing interpreted by a subcontractor becomes their reading of it, not yours.',
      'Because our design team and our production floor are the same company, the concept you approve is costed against real materials and a real method before it reaches you. There is nothing to reinterpret later, and nobody to negotiate with when a detail turns out to be expensive.',
    ],
  },
  {
    heading: 'Industries and stand types we build for',
    paragraphs: [
      'We have delivered stands across pharmaceuticals, machinery and machine tools, water treatment, solar and renewable energy, printing and packaging, plastics, real estate, food and beverage, textiles and automation. Each carries its own constraints — floor loading for machinery, private meeting space for pharma, colour-accurate lighting for textiles, sampling flow for food.',
      'Stand formats run from 9 sqm shell-scheme upgrades through inline and corner custom builds to island stands and two-storey pavilions. The smallest stands are often the hardest, because there is no room to recover from a layout decision that does not work.',
    ],
  },
]
