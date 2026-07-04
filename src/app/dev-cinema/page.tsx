import ProjectCinema from '@/components/portfolio/ProjectCinema'

const scenes = [
  { src: '/cin-1.svg', alt: '1', caption: 'The 24 sqm three-side-open stand' },
  { src: '/cin-2.svg', alt: '2', caption: 'Backlit product display walls' },
  { src: '/cin-3.svg', alt: '3', caption: 'Structured cable shelving' },
  { src: '/cin-4.svg', alt: '4', caption: 'Factory tour LED feature' },
  { src: '/cin-5.svg', alt: '5', caption: null },
]

export default function Page() {
  return (
    <>
      <ProjectCinema title="Voltaic" meta="FITAG Tech Expo · Gandhinagar · 2025 · 24 sqm" category="CCTV, TV, Wire and Cable Industry" scenes={scenes} />
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>rest of case study…</div>
    </>
  )
}
