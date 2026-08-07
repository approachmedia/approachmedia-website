import type { ProseBlock } from '@/components/seo/ProseSection'

export const INTRO =
  'Turnkey exhibition project management means one team owns the outcome from brief to dismantling — design, fabrication, print, freight, permissions, installation, show-day standby and removal, under a single scope and a single budget. Approach Media has run this model across more than 6,000 stands in 14 countries, and it exists for one reason: on a multi-vendor build, the gaps between suppliers are where projects fail, and nobody owns the gaps.'

export const BLOCKS: ProseBlock[] = [
  {
    heading: 'What sits inside a turnkey scope',
    paragraphs: [
      'The visible part is the stand. The part that consumes your team is everything around it — and that is the part a turnkey scope absorbs.',
      'On a typical project we are handling organiser paperwork, structural approvals, electrical load applications, rigging permissions, freight documentation, on-site labour passes and the schedule that ties all of them to a build-up slot. None of it is complicated on its own. All of it has a deadline, and missing one usually means missing the show.',
    ],
    bullets: [
      { term: 'Design and engineering', copy: 'Concept, 3D approval, working drawings and structural calculations where the stand needs them.' },
      { term: 'Fabrication and print', copy: 'Built in our own workshop, dry-assembled and inspected before crating.' },
      { term: 'Organiser liaison', copy: 'Stand plan submissions, structural approval, power and rigging applications, and the follow-up when a query comes back.' },
      { term: 'Freight and customs', copy: 'Crating, transport, documentation and — for overseas shows — carnet or import paperwork handled before it becomes urgent.' },
      { term: 'Installation', copy: 'Our crew on site for build-up, working to an assembly sequence rather than improvising from a photograph.' },
      { term: 'Show-day standby', copy: 'Someone present through show days for the lamp that fails, the panel that scuffs and the graphic that needs replacing overnight.' },
      { term: 'Dismantling and storage', copy: 'Removal within the organiser window, and storage of reusable elements for the next show if the stand is built for reuse.' },
    ],
  },
  {
    heading: 'Why multi-vendor builds go wrong',
    paragraphs: [
      'When design, fabrication, print and logistics sit with four suppliers, each one is accountable for their own deliverable and none is accountable for the interfaces. The designer signs off a detail the fabricator prices differently. The printer produces to a bleed the joinery does not allow. The freight company arrives at a dock the organiser has allocated to someone else.',
      'Every one of those is recoverable in isolation. What is not recoverable is the day lost while four suppliers establish whose problem it is. On a build-up window measured in hours, that conversation is the failure.',
      'A single scope does not make problems disappear. It makes them one company\'s problem, which is the only arrangement under which they get solved at the speed a show demands.',
    ],
  },
  {
    heading: 'How a turnkey project runs',
    paragraphs: [
      'You get one project manager who stays with the build from the first call to the final crate leaving the hall. They hold the schedule, the budget and the organiser relationship, and they are the person you call rather than a coordination inbox.',
      'The schedule works backward from the build-up slot, not forward from today. Approval deadlines, fabrication start, artwork lock, dispatch date and freight booking all fall out of that, and each is a checkpoint rather than an aspiration. When something slips, you hear about it at the checkpoint it slipped at, while there is still room to respond.',
    ],
  },
  {
    heading: 'International shows',
    paragraphs: [
      'Overseas builds add three things: longer freight lead times, venue rules that differ from Indian halls, and a local crew that did not build the stand. All three are manageable, and all three punish improvisation.',
      'We ship as numbered crates with an assembly sequence and drawings a local team can follow, and we build to the destination venue standard for fire rating, loading and certification rather than assuming Indian norms transfer. On larger stands our own supervisor travels, because the difference between a crew following drawings and a crew following someone who built the stand is usually a day.',
    ],
  },
]
