import PortfolioShowcase, { type ShowcaseItem } from '@/components/portfolio/PortfolioShowcase'

const items: ShowcaseItem[] = [
  { slug: 'a', clientName: 'Lenovo', eventName: 'FITAG Tech Expo', location: 'Gandhinagar', year: 2025, boothSize: '48 sqm', heroImage: '/test-1e3a8a.svg', heroAlt: 'a', category: 'Electrical Industry' },
  { slug: 'b', clientName: 'Sun Pharma', eventName: 'CPhI India', location: 'Delhi', year: 2024, boothSize: '120 sqm', heroImage: '/test-14532d.svg', heroAlt: 'b', category: 'Pharmaceutical Industry' },
  { slug: 'c', clientName: 'Prestige', eventName: 'ACETECH', location: 'Mumbai', year: 2024, boothSize: '200 sqm', heroImage: '/test-7c2d12.svg', heroAlt: 'c', category: 'Builder & Real Estate' },
  { slug: 'd', clientName: 'Kajaria', eventName: 'Vibrant Ceramics', location: 'Ahmedabad', year: 2023, boothSize: '96 sqm', heroImage: '/test-581c87.svg', heroAlt: 'd', category: 'Architecture' },
]

export default function Page() {
  return <PortfolioShowcase items={items} />
}
