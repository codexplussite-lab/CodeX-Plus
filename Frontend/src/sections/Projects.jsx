import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Visual from '../components/Visual.jsx';
import { projects } from '../data/content.js';

// Desktop: the section pins and the cards travel sideways as you scroll.
// Mobile / reduced motion: a plain swipeable row.
export default function Projects() {
  const section = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: self => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`)
          }
        });
        gsap.utils.toArray('.project__media').forEach(m => {
          gsap.fromTo(
            m.firstElementChild,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: m, containerAnimation: gsap.getTweensOf(track.current)[0], start: 'left right', end: 'right left', scrub: true }
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section className="projects" id="work" ref={section}>
      <div className="projects__track" ref={track}>
        <header className="projects__intro">
          <h2 className="section-title">Recent projects</h2>
          <p>Six pieces of work from the last two years. Keep scrolling.</p>
        </header>
        {projects.map((p, i) => (
          <a className="project" href="#contact" key={p.title} data-cursor="View" aria-label={`${p.title}, ${p.type}, ${p.year}`}>
            <div className="project__media">
              <div className="project__img">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="visual" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <Visual seed={i + 2} />
                )}
              </div>
              <span className="project__year">{p.year}</span>
            </div>
            <div className="project__meta">
              <h3>{p.title}</h3>
              <p>{p.type}</p>
            </div>
          </a>
        ))}
        <a className="project project--end" href="#contact">
          <span>Have something in mind?</span>
          <strong>Let’s build it</strong>
        </a>
      </div>
      <div className="projects__progress" aria-hidden="true">
        <span ref={bar} />
      </div>
    </section>
  );
}
