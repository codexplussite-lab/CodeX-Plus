import React, { useEffect, useState, useRef } from 'react';

/**
 * CountUp - React Bits (https://reactbits.dev/components/count-up)
 * Smooth animated metric counter when scrolled into view.
 */
export default function CountUp({
  to = 100,
  from = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setCount(to);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);

        const startTime = performance.now();
        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          // Ease out quad
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentVal = Math.floor(from + (to - from) * easeProgress);
          setCount(currentVal);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setCount(to);
          }
        };

        requestAnimationFrame(step);
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, from, duration, hasAnimated]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

