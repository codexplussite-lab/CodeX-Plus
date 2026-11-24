import React from 'react';

/**
 * Aurora - React Bits (https://reactbits.dev/backgrounds/aurora)
 * Ambient Northern Lights flowing gradient ribbons for luxury headers.
 */
export default function Aurora({
  colorStops = ['#7c3aed', '#a855f7', '#4f46e5', '#f59e0b'],
  className = '',
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute -top-[50%] -left-[25%] w-[150%] h-[150%] opacity-40 blur-[130px]"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${colorStops[0]} 0%, transparent 45%),
                       radial-gradient(circle at 80% 25%, ${colorStops[1]} 0%, transparent 40%),
                       radial-gradient(circle at 50% 60%, ${colorStops[2]} 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, ${colorStops[3] || '#c084fc'} 0%, transparent 35%)`,
          animation: 'aurora 18s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
}
