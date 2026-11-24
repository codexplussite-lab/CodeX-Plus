import React, { useRef, useState } from 'react';

/**
 * Magnet - React Bits (https://reactbits.dev/animations/magnet)
 * Smooth magnetic pull that draws interactive buttons towards cursor position.
 */
export default function Magnet({
  children,
  magnetStrength = 0.3,
  className = '',
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = (e.clientX - centerX) * magnetStrength;
    const dy = (e.clientY - centerY) * magnetStrength;

    setPosition({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x.toFixed(1)}px, ${position.y.toFixed(1)}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}

