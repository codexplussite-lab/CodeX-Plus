import React, { useEffect, useState, useRef } from 'react';

/**
 * DecryptedText - React Bits (https://reactbits.dev/text-animations/decrypted-text)
 * Scrambles and decrypts characters upon view or hover with luxury cyber styling.
 */
export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-purple-400/80',
  animateOn = 'view', // 'view' | 'hover'
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const containerRef = useRef(null);

  const decrypt = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsDecrypted(true);
        setDisplayText(text);
      }

      iteration += 1 / (maxIterations / text.length || 1);
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      if (typeof window === 'undefined' || !window.IntersectionObserver) {
        setDisplayText(text);
        setIsDecrypted(true);
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          decrypt();
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      });

      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [text, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setIsHovering(true);
      decrypt();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovering(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-mono ${parentClassName}`}
    >
      <span className={isDecrypted ? className : encryptedClassName}>
        {displayText}
      </span>
    </span>
  );
}

