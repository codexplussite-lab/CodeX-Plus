import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../components/bits/SplitText.jsx';
import VariableProximity from '../components/bits/VariableProximity.jsx';
import CircularText from '../components/bits/CircularText.jsx';
import Magnet from '../components/bits/Magnet.jsx';
import { brand as defaultbrand, searches as defaultsearches } from '../data/content.js';
import { useCms } from '../context/CmsContext.jsx';

export default function Hero({ ready }) {
  const { content } = useCms();
  const brand = content?.brand || defaultbrand; 
  const searches = content?.searches || defaultsearches; 
  const section = useRef(null);
  const orb = useRef(null);

  // Soft cursor parallax on the orbs.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const moveX = gsap.quickTo(orb.current, 'x', { duration: 1.2, ease: 'power3' });
    const moveY = gsap.quickTo(orb.current, 'y', { duration: 1.2, ease: 'power3' });
    const onMove = e => {
      moveX((e.clientX / window.innerWidth - 0.5) * 40);
      moveY((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    const hero = content?.hero || {};
  const heroHeadline = [hero.titleLine1, hero.titleHighlight, hero.titleLine2].filter(Boolean).join(' ') || hero.title || 'From vision to reality. Design crafted to captivate.';
  return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const hero = content?.hero || {};
  const heroHeadline = [hero.titleLine1, hero.titleHighlight, hero.titleLine2].filter(Boolean).join(' ') || hero.title || 'From vision to reality. Design crafted to captivate.';
  return (
    <section className="hero" id="top" ref={section}>
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__tag">{brand.name} &bull; {brand.city}</p>
          <div className="hero__headline">
            {ready && (
              <SplitText
                tag="h2"
                text={heroHeadline}
                splitType="words"
                effect="blur"
                delay={70}
                duration={1}
                textAlign="left"
                trigger="view"
                rootMargin="0px"
                className="hero__h2"
              />
            )}
          </div>
          <div className="hero__search">
            <span>People also search for</span>
            <ul>
              {searches.map(s => (
                <li key={s}>
                  <a href="#services">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__orb" ref={orb} aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
          <Magnet padding={80} magnetStrength={4} wrapperClassName="hero__badge">
            <a href="#contact" tabIndex={-1} data-cursor="Talk">
              <CircularText text="Available for new projects • " size={168} fontSize={13} fontWeight={600} letterSpacing={2} spinDuration={22} onHover="slowDown">
                <span className="hero__arrow">↘</span>
              </CircularText>
            </a>
          </Magnet>
        </div>
      </div>

      <h1 className="hero__wordmark">
        {ready && (
          <VariableProximity
            label={brand.wordmark || 'CODEXX'}
            containerRef={section}
            radius={260}
            falloff="gaussian"
            fromFontVariationSettings="'wght' 280, 'wdth' 75"
            toFontVariationSettings="'wght' 800, 'wdth' 100"
            className="hero__wordmark-text"
          />
        )}
      </h1>
    </section>
  );
}
