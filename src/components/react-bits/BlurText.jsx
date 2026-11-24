import React, { useEffect, useState, useRef } from 'react';

/**
 * BlurText - React Bits (https://reactbits.dev/text-animations/blur-text)
 * Renders letters or words that blur and animate smoothly into crisp focus.
 */
export default function BlurText({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  threshold = 0.1,
  rootMargin = '0px',
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  if (!text) return null;

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, i) => (
        <span
          key={i}
          style={{
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: inView ? `${i * delay}ms` : '0ms',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
            willChange: 'filter, opacity, transform',
          }}
          className="inline-block"
        >
          {element}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

