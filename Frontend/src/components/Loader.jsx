import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// One orchestrated page-load moment: counter + wordmark, then two panels lift away.
export default function Loader({ onReveal }) {
  const root = useRef(null);
  const counter = useRef(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // Safety fallback: guaranteed unmount and scroll unlock even on slow devices/background tabs
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      onReveal?.();
      setIsDismissed(true);
    }, 2400);

    return () => clearTimeout(fallbackTimer);
  }, [onReveal]);

  useGSAP(
    () => {
      if (isDismissed) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const state = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onReveal?.();
          setIsDismissed(true);
        }
      });

      tl.from('.loader__letter', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, 0)
        .to(
          state,
          {
            v: 100,
            duration: reduce ? 0.2 : 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(state.v)).padStart(3, '0');
            }
          },
          0
        )
        .to('.loader__content', { opacity: 0, duration: 0.25 }, '>+0.1')
        .addLabel('lift')
        .set(root.current, { pointerEvents: 'none' }, 'lift')
        .to('.loader__panel--a', { yPercent: -100, duration: reduce ? 0.01 : 0.85, ease: 'expo.inOut' }, 'lift')
        .to('.loader__panel--b', { yPercent: 100, duration: reduce ? 0.01 : 0.85, ease: 'expo.inOut' }, 'lift')
        .call(() => onReveal?.(), null, 'lift+=0.35');
    },
    { scope: root, dependencies: [isDismissed] }
  );

  if (isDismissed) {
    return null;
  }

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__panel loader__panel--a" />
      <div className="loader__panel loader__panel--b" />
      <div className="loader__content">
        <div className="loader__word">
          <span className="loader__mask">
            <img
              src="/preloader-logo.png"
              alt="CODEX+"
              className="loader__letter"
              style={{ width: 'min(74vw, 34rem)', height: 'auto', borderRadius: '1rem', boxShadow: '0 0 40px rgba(65, 45, 21, 0.45)' }}
            />
          </span>
        </div>
        <span className="loader__count" ref={counter}>000</span>
      </div>
    </div>
  );
}
