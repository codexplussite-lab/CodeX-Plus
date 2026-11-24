import React from 'react';

/**
 * ShinyText - React Bits (https://reactbits.dev/text-animations/shiny-text)
 * Smooth metallic gleam moving across the text with luxury shimmer.
 */
export default function ShinyText({
  text = '',
  disabled = false,
  speed = 4,
  className = '',
}) {
  return (
    <span
      className={`inline-block text-transparent bg-clip-text ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : 'linear-gradient(120deg, rgba(255, 255, 255, 0.7) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.7) 65%)',
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
        WebkitBackgroundClip: 'text',
      }}
    >
      {text}
    </span>
  );
}

