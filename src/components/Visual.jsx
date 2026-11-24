import { useId } from 'react';

// Generative abstract artwork. Same seed = same picture. Swap for real photos by
// rendering <img> instead of <Visual /> wherever you have final imagery.
const palettes = [
  ['#3326FF', '#FF6A3D', '#EDEEF1'],
  ['#15171C', '#3326FF', '#9AA4FF'],
  ['#FF6A3D', '#15171C', '#FFD7C9'],
  ['#9AA4FF', '#3326FF', '#15171C'],
  ['#C9CDE0', '#FF6A3D', '#3326FF'],
  ['#1D2BFF', '#C9CEFF', '#FF6A3D']
];

const rng = seed => {
  let s = (seed + 11) * 9301 + 49297;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
};

export default function Visual({ seed = 0, className = '', title = '' }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const r = rng(seed);
  const [a, b, c] = palettes[seed % palettes.length];
  const shapes = Array.from({ length: 6 }, (_, i) => {
    const kind = Math.floor(r() * 4);
    const fill = [b, c, a][i % 3];
    const cx = 40 + r() * 320;
    const cy = 50 + r() * 400;
    const s = 50 + r() * 120;
    const rot = r() * 90;
    if (kind === 0) return <circle key={i} cx={cx} cy={cy} r={s / 1.6} fill={fill} opacity={0.92} />;
    if (kind === 1)
      return <rect key={i} x={cx - s / 2} y={cy - s / 2} width={s} height={s * 1.4} rx={s / 2} fill={fill} opacity={0.9} transform={`rotate(${rot} ${cx} ${cy})`} />;
    if (kind === 2)
      return <path key={i} d={`M${cx - s} ${cy} a${s} ${s} 0 0 1 ${s * 2} 0z`} fill={fill} opacity={0.95} transform={`rotate(${rot} ${cx} ${cy})`} />;
    return <circle key={i} cx={cx} cy={cy} r={s / 1.8} fill="none" stroke={fill} strokeWidth={10 + r() * 14} />;
  });

  return (
    <svg className={`visual ${className}`} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role={title ? 'img' : 'presentation'} aria-label={title || undefined}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={a} stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#g${id})`} />
      {shapes}
    </svg>
  );
}
