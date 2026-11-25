import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Visual from '../components/Visual.jsx';
import SplitText from '../components/bits/SplitText.jsx';
import { team as defaultteam } from '../data/content.js';
import { useCms } from '../context/CmsContext.jsx';

// Roster: hovering a name reveals a portrait that follows the cursor.
export default function Team() {
  const { content } = useCms();
  const team = content?.team || defaultteam; 
  const wrap = useRef(null);
  const portrait = useRef(null);
  const [hover, setHover] = useState(0);

  useGSAP(
    () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const x = gsap.quickTo(portrait.current, 'x', { duration: 0.5, ease: 'power3' });
      const y = gsap.quickTo(portrait.current, 'y', { duration: 0.5, ease: 'power3' });
      const move = e => {
        const r = wrap.current.getBoundingClientRect();
        x(e.clientX - r.left);
        y(e.clientY - r.top);
      };
      const el = wrap.current;
      el.addEventListener('mousemove', move);
      return () => el.removeEventListener('mousemove', move);
    },
    { scope: wrap }
  );

  const show = i => {
    setHover(i);
    gsap.to(portrait.current, { opacity: 1, scale: 1, rotate: i % 2 ? 4 : -4, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
  };
  const hide = () => gsap.to(portrait.current, { opacity: 0, scale: 0.8, duration: 0.3, overwrite: 'auto' });

  return (
    <section className="team section" id="team">
      <div className="wrap" ref={wrap}>
        <SplitText tag="h2" text="The people behind the work" splitType="words" effect="rise" delay={60} textAlign="left" className="section-title" rootMargin="-60px" />
        <ul className="roster" onMouseLeave={hide}>
          {team.map((m, i) => (
            <li key={m.name} onMouseEnter={() => show(i)} onFocus={() => show(i)} onBlur={hide}>
              {m.image ? (
                <img src={m.image} alt={m.name} className="roster__thumb" style={{ objectFit: 'cover' }} />
              ) : (
                <Visual seed={i + 7} className="roster__thumb" />
              )}
              <a href="#contact" className="roster__name">{m.name}</a>
              <span className="roster__role">{m.role}</span>
            </li>
          ))}
        </ul>
        <div className="roster__portrait" ref={portrait} aria-hidden="true">
          {team[hover]?.image ? (
            <img src={team[hover].image} alt={team[hover].name} className="visual" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          ) : (
            <Visual seed={hover + 7} />
          )}
        </div>
      </div>
    </section>
  );
}
