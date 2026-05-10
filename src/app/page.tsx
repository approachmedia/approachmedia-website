import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exhibition Spaces That Make Your Brand Impossible to Ignore | Approach Media',
  description: 'Your exhibition stall is more than a display. We design and build exhibition spaces that attract, engage, and deliver lasting impact. 23+ years, 6000+ stalls.',
}

export default function Home() {
  return (
    <main>
      {/* Header - Coming Soon */}
      <header className="bg-dark-900 text-white">
        <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">APPROACH MEDIA</div>
          <button className="bg-accent-gold text-dark-900 px-6 py-2 rounded font-semibold">
            Request a Proposal
          </button>
        </nav>
      </header>

      {/* Hero Section - Coming Soon */}
      <section className="gradient-dark text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Exhibition Spaces That Make Your Brand Impossible to Ignore</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Your exhibition stall is more than a display. It is a space where your brand is experienced, understood, and remembered.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-accent-gold text-dark-900 px-8 py-3 rounded font-semibold">
            Book A Consultation Now
          </button>
          <button className="border-2 border-accent-gold text-accent-gold px-8 py-3 rounded font-semibold">
            View Portfolio
          </button>
        </div>
      </section>

      {/* Metrics Section - Coming Soon */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-gold">23+</div>
              <p className="text-dark-600">Years of Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-gold">6000+</div>
              <p className="text-dark-600">Stalls Executed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-gold">9+</div>
              <p className="text-dark-600">Industries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-gold">14+</div>
              <p className="text-dark-600">Countries Delivered In</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Coming Soon */}
      <footer className="bg-dark-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Approach Media Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
