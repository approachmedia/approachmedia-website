/**
 * GoldenRatio — the final hero shape: an exact golden-ratio construction.
 *
 * True Fibonacci subdivision of a 1618×1000 golden rectangle (φ = 1.618),
 * with the golden spiral swept through every square, an inscribed circle in
 * each square, the two reciprocal diagonals crossing at the spiral's pole,
 * and a faint golden-division grid. The drawing guides behind every layout.
 *
 * Stroke-only SVG; renders server-side.
 */

export default function GoldenRatio({ className = '' }: { className?: string }) {
  const squares = 'rgba(255,255,255,0.30)'
  const circles = 'rgba(255,255,255,0.13)'
  const diagonals = 'rgba(255,255,255,0.22)'
  const grid = 'rgba(255,255,255,0.09)'
  const spiral = 'rgba(255,255,255,0.48)'

  return (
    <svg
      viewBox="0 0 1618 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* faint golden-division grid */}
      <g stroke={grid} strokeWidth="1.5">
        <line x1="618" y1="0" x2="618" y2="1000" />
        <line x1="0" y1="382" x2="1618" y2="382" />
      </g>

      {/* Fibonacci squares */}
      <g stroke={squares} strokeWidth="1.5" fill="none">
        <rect x="0" y="0" width="1618" height="1000" />
        <line x1="1000" y1="0"   x2="1000" y2="1000" />
        <line x1="1000" y1="618" x2="1618" y2="618" />
        <line x1="1236" y1="618" x2="1236" y2="1000" />
        <line x1="1000" y1="764" x2="1236" y2="764" />
        <line x1="1146" y1="618" x2="1146" y2="764" />
        <line x1="1146" y1="708" x2="1236" y2="708" />
        <line x1="1180" y1="708" x2="1180" y2="764" />
      </g>

      {/* inscribed circles */}
      <g stroke={circles} strokeWidth="1.5" fill="none">
        <circle cx="500"  cy="500" r="500" />
        <circle cx="1309" cy="309" r="309" />
        <circle cx="1427" cy="809" r="191" />
        <circle cx="1118" cy="882" r="118" />
        <circle cx="1073" cy="691" r="73" />
        <circle cx="1191" cy="663" r="45" />
        <circle cx="1208" cy="736" r="28" />
      </g>

      {/* reciprocal diagonals — they cross at the spiral's pole */}
      <g stroke={diagonals} strokeWidth="1.5">
        <line x1="0" y1="0" x2="1618" y2="1000" />
        <line x1="1618" y1="0" x2="1000" y2="1000" />
      </g>

      {/* the golden spiral */}
      <path
        d="M 0 1000
           A 1000 1000 0 0 1 1000 0
           A 618 618 0 0 1 1618 618
           A 382 382 0 0 1 1236 1000
           A 236 236 0 0 1 1000 764
           A 146 146 0 0 1 1146 618
           A 90 90 0 0 1 1236 708
           A 56 56 0 0 1 1180 764
           A 34 34 0 0 1 1146 730"
        fill="none"
        stroke={spiral}
        strokeWidth="2"
      />
    </svg>
  )
}
