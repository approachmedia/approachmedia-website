export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-[hsl(110,55%,50%)] font-display mb-4">
        Approach Media
      </p>
      <h1 className="text-5xl font-display font-bold mb-6 bg-gradient-to-r from-[hsl(230,80%,58%)] to-[hsl(110,55%,50%)] bg-clip-text text-transparent">
        New site launching soon
      </h1>
      <p className="text-[hsl(220,10%,65%)] max-w-md">
        Exhibition stall design &amp; fabrication — Mumbai, India.
      </p>
      <a
        href="/portfolio"
        className="mt-10 inline-block px-8 py-3 rounded-full bg-[hsl(230,80%,58%)] text-white font-semibold hover:opacity-90 transition"
      >
        View Portfolio
      </a>
    </main>
  )
}
