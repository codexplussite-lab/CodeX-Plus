import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// A round label that follows the mouse over any element with data-cursor="Label".
export default function CursorLabel() {
  const el = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const x = gsap.quickTo(el.current, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(el.current, 'y', { duration: 0.35, ease: 'power3' });
    const move = e => {
      x(e.clientX);
      y(e.clientY);
      const t = e.target.closest?.('[data-cursor]');
      if (t) {
        text.current.textContent = t.dataset.cursor;
        gsap.to(el.current, { scale: 1, opacity: 1, duration: 0.3, overwrite: 'auto' });
      } else {
        gsap.to(el.current, { scale: 0.2, opacity: 0, duration: 0.3, overwrite: 'auto' });
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="cursor-label" ref={el} aria-hidden="true">
      <span ref={text} />
    </div>
  );
}
