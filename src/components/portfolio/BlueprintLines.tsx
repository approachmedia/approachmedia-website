/**
 * BlueprintLines — the final hero shape (client-selected): a designer's
 * construction-grid composition. A large circle, crossing diagonals, two
 * sweeping construction arcs, a faint modular grid and corner registration
 * crosshairs — the drawing guides behind every stall we design.
 *
 * Renders as a full-bleed SVG overlay; thin strokes, no rotation.
 */

export default function BlueprintLines({
  className = '',
  stroke = 'rgba(255,255,255,0.28)',
  gridStroke = 'rgba(255,255,255,0.12)',
}: {
  className?:  string
  stroke?:     string
  gridStroke?: string
}) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* faint modular grid */}
      <g stroke={gridStroke} strokeWidth="1">
        <line x1="550" y1="0" x2="550" y2="900" />
        <line x1="720" y1="0" x2="720" y2="900" />
        <line x1="890" y1="0" x2="890" y2="900" />
        <line x1="0" y1="340" x2="1440" y2="340" />
        <line x1="0" y1="455" x2="1440" y2="455" />
        <line x1="0" y1="550" x2="1440" y2="550" />
      </g>

      {/* main construction geometry */}
      <g stroke={stroke} strokeWidth="1" fill="none">
        {/* large circle */}
        <circle cx="770" cy="420" r="355" />

        {/* crossing diagonals */}
        <line x1="-30" y1="880" x2="1470" y2="15" />
        <line x1="15" y1="-20" x2="1180" y2="920" />

        {/* sweeping construction arcs */}
        <path d="M -40 90 Q 560 520 1460 745" />
        <path d="M 688 -30 C 758 260 620 590 800 930" />
      </g>

      {/* corner registration crosshairs */}
      <g stroke={stroke} strokeWidth="1">
        {[[22, 22], [1418, 22], [22, 862], [1418, 862]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} />
          </g>
        ))}
      </g>
    </svg>
  )
}
