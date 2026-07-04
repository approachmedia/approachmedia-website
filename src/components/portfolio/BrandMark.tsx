/**
 * BrandMark — interlocked triangle + circle line mark (from the client's
 * selected reference): a double-outline triangle woven with a double-outline
 * circle. The circle passes OVER the triangle on the left and bottom
 * crossings and UNDER on the right — the classic impossible-interlock read.
 *
 * Pure SVG, stroke-only; color/size via props. Safe to render server-side.
 */

export default function BrandMark({
  className = '',
  stroke = 'rgba(255,255,255,0.35)',
  strokeWidth = 1.1,
}: {
  className?:   string
  stroke?:      string
  strokeWidth?: number
}) {
  return (
    <svg viewBox="0 0 120 108" className={className} aria-hidden="true">
      <defs>
        <mask id="bm-circle-under-right">
          <rect x="0" y="0" width="120" height="108" fill="white" />
          <g clipPath="url(#bm-right)">
            <polygon points="60,6 4,102 116,102" fill="black" />
            <polygon points="60,20 16,95 104,95" fill="white" />
          </g>
        </mask>
        <mask id="bm-tri-under-circle">
          <rect x="0" y="0" width="120" height="108" fill="white" />
          <g clipPath="url(#bm-leftbottom)">
            <circle cx="60" cy="68" r="31" fill="black" />
            <circle cx="60" cy="68" r="24" fill="white" />
          </g>
        </mask>
        <clipPath id="bm-right"><rect x="66" y="26" width="54" height="70" /></clipPath>
        <clipPath id="bm-leftbottom">
          <rect x="0" y="26" width="54" height="60" />
          <rect x="30" y="86" width="60" height="22" />
        </clipPath>
      </defs>

      {/* triangle double outline — interrupted where the circle passes over */}
      <g mask="url(#bm-tri-under-circle)" stroke={stroke} fill="none" strokeWidth={strokeWidth}>
        <polygon points="60,6 4,102 116,102" />
        <polygon points="60,20 16,95 104,95" />
      </g>

      {/* circle double outline — interrupted where it dives under the right band */}
      <g mask="url(#bm-circle-under-right)" stroke={stroke} fill="none" strokeWidth={strokeWidth}>
        <circle cx="60" cy="68" r="31" />
        <circle cx="60" cy="68" r="24" />
      </g>
    </svg>
  )
}
