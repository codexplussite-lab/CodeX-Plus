import { useMemo } from 'react'

const X0 = 104
const X1 = 672
const STEP = 4.4
const Y0 = 70
const Y1 = 304

const plusPath = (cx, cy, a, w) =>
  `M${cx - w} ${cy - a}H${cx + w}V${cy - w}H${cx + a}V${cy + w}H${cx + w}V${cy + a}H${cx - w}V${cy + w}H${cx - a}V${cy - w}H${cx - w}Z`

// C aur O ki patli outline (as-is logo jaisi double outline)
const C_OUT = 'M215 135V130Q215 82 160 82Q105 82 105 130V242Q105 292 160 292Q215 292 215 242V235'
const C_IN = 'M193 235V240Q193 270 160 270Q127 270 127 240V132Q127 102 160 102Q193 102 193 132V135'
const O_OUT = 'M338 130Q338 82 283 82Q228 82 228 130V242Q228 292 283 292Q338 292 338 242Z'
const O_IN = 'M316 132Q316 102 283 102Q250 102 250 132V240Q250 270 283 270Q316 270 316 240Z'

const PLUS_START = 1300

/**
 * Lines upar se neeche, left -> right (line by line assemble)
 */
export default function CodexLogo() {
  const lines = useMemo(() => {
    const n = Math.floor((X1 - X0) / STEP) + 1
    return Array.from({ length: n }, (_, i) => {
      const x = +(X0 + i * STEP).toFixed(2)
      const jitter = ((i * 37) % 7) * 6
      return { x, delay: Math.round(i * 13 + jitter) }
    })
  }, [])

  return (
    <svg
      className="cx-logo"
      viewBox="0 0 860 340"
      role="img"
      aria-label="CODEX+"
    >
      <defs>
        <linearGradient id="cxg" gradientUnits="userSpaceOnUse" x1={X0} y1="0" x2={X1} y2="0">
          <stop offset="0" stopColor="#F4EFE6" />
          <stop offset="0.24" stopColor="#E6C3A1" />
          <stop offset="0.52" stopColor="#D4825A" />
          <stop offset="0.8" stopColor="#B8643F" />
          <stop offset="1" stopColor="#F0A875" />
        </linearGradient>

        <mask id="cxm" maskUnits="userSpaceOnUse" x="0" y="0" width="860" height="340">
          <rect width="860" height="340" fill="#000" />
          <g fill="#fff">
            {/* C */}
            <rect x="105" y="82" width="110" height="210" rx="55" />
            {/* O */}
            <rect x="228" y="82" width="110" height="210" rx="55" />
            {/* D */}
            <path d="M345 82H392Q442 82 442 135V239Q442 292 392 292H345Z" />
            {/* E */}
            <rect x="455" y="82" width="34" height="210" />
            <rect x="455" y="82" width="100" height="34" />
            <rect x="455" y="170" width="84" height="34" />
            <rect x="455" y="258" width="100" height="34" />
            {/* X */}
            <path d="M566 82L664 292" stroke="#fff" strokeWidth="44" fill="none" />
            <path d="M664 82L566 292" stroke="#fff" strokeWidth="44" fill="none" />
          </g>
          <g fill="#000">
            {/* C inner counter + opening, O inner counter */}
            <rect x="127" y="102" width="66" height="168" rx="33" />
            <rect x="185" y="135" width="40" height="100" />
            <rect x="250" y="102" width="66" height="168" rx="33" />
          </g>
        </mask>
      </defs>

      {/* vertical stripe lines, masked into letter shapes */}
      <g mask="url(#cxm)" stroke="#E1DCC9" strokeWidth="2.3" fill="none">
        {lines.map((l, i) => (
          <path
            key={i}
            className="cx-line"
            pathLength="1"
            d={`M${l.x} ${Y0}V${Y1}`}
            style={{ '--d': `${l.delay}ms` }}
          />
        ))}
      </g>

      {/* C / O thin outlines */}
      <g stroke="#E1DCC9" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {[C_OUT, C_IN, O_OUT, O_IN].map((d, i) => (
          <path key={i} d={d} pathLength="1" className="cx-line cx-outline" style={{ '--d': `${300 + i * 140}ms` }} />
        ))}
      </g>

      {/* "+" ripple */}
      <g
        className="cx-plus"
        stroke="#E1DCC9"
        fill="none"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d={plusPath(492, 187, 46, 16)} fill="var(--cx-bg)" stroke="none" className="cx-plus-fill" />
        {[0, 1, 2, 3, 4].map((k) => (
          <path
            key={k}
            d={plusPath(492, 187, 46 - k * 8, 16 - k * 3)}
            pathLength="1"
            className="cx-line cx-ripple"
            style={{ '--d': `${PLUS_START + k * 130}ms` }}
          />
        ))}
      </g>
    </svg>
  )
}
