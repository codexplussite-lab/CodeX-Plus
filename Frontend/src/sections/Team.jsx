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
  const [selected, setSelected] = useState(null);

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
              <button
                type="button"
                className="roster__name"
                onClick={() => setSelected(m)}
                style={{ textAlign: 'left', background: 'none', border: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}
              >
                {m.name}
              </button>
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

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(7, 11, 25, 0.78)',
            backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0E152B', border: '1px solid rgba(139, 61, 255, 0.35)', borderRadius: '1.5rem',
              maxWidth: '30rem', width: '100%', padding: '2rem', color: '#fff', position: 'relative',
              boxShadow: '0 0 40px rgba(139, 61, 255, 0.3)'
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1rem', right: '1rem', width: '2.2rem', height: '2.2rem',
                borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)', fontSize: '1.2rem', cursor: 'pointer'
              }}
            >
              ×
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
              {selected.image ? (
                <img src={selected.image} alt={selected.name} style={{ width: '4.5rem', height: '4.5rem', borderRadius: '1rem', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '1rem', overflow: 'hidden' }}>
                  <Visual seed={7} />
                </div>
              )}
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{selected.name}</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#38BDF8', fontSize: '0.95rem', fontWeight: 600 }}>{selected.role}</p>
              </div>
            </div>
            <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.65, fontSize: '0.95rem' }}>
              {selected.bio || selected.description || `${selected.name} is a key member of the Codex Plus team serving as ${selected.role}.`}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
