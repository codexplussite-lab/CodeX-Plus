import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// One orchestrated page-load moment: counter + wordmark, then two panels lift away.
export default function Loader({ onReveal }) {
  const root = useRef(null);
  const counter = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const state = { v: 0 };
      const tl = gsap.timeline();
      tl.from('.loader__letter', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, 0)
        .to(
          state,
          {
            v: 100,
            duration: reduce ? 0.2 : 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(state.v)).padStart(3, '0');
            }
          },
          0
        )
        .to('.loader__content', { opacity: 0, duration: 0.3 }, '>+0.1')
        .addLabel('lift')
        .to('.loader__panel', { yPercent: -100, duration: reduce ? 0.01 : 1, ease: 'expo.inOut', stagger: 0.08 }, 'lift')
        .call(onReveal, null, 'lift+=0.45')
        .set(root.current, { display: 'none' });
    },
    { scope: root }
  );

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__panel loader__panel--a" />
      <div className="loader__panel loader__panel--b" />
      <div className="loader__content">
        <div className="loader__word">
          {'Avista'.split('').map((l, i) => (
            <span className="loader__mask" key={i}>
              <span className="loader__letter">{l}</span>
            </span>
          ))}
        </div>
        <span className="loader__count" ref={counter}>000</span>
      </div>
    </div>
  );
}
