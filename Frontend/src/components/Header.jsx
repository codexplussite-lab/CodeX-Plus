import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Magnet from './bits/Magnet.jsx';
import { brand as defaultbrand, nav as defaultnav } from '../data/content.js';
import { useCms } from '../context/CmsContext.jsx';

const go = (e, href) => {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20, duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
};

export default function Header({ ready }) {
  const { content } = useCms();
  const brand = content?.brand || defaultbrand; 
  const nav = content?.nav || defaultnav; 
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.__lenis?.stop();
    else if (ready) window.__lenis?.start();
  }, [open, ready]);

  return (
    <>
      <motion.header
        className={`header ${solid ? 'header--solid' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -90 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="logo" href="#top" onClick={e => go(e, '#top')} aria-label={`${brand.name} home`}>
          <img src={brand.logoUrl || '/logo.jpeg'} alt={brand.name} style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <nav className="header__nav" aria-label="Primary">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={e => go(e, item.href)} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <Magnet padding={60} magnetStrength={3}>
            <a className="btn btn--accent" href="#contact" onClick={e => go(e, '#contact')}>
              Start a project
            </a>
          </Magnet>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              {[...nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="menu__link"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.06 } }}
                  onClick={e => {
                    setOpen(false);
                    setTimeout(() => go(e, item.href), 50);
                    e.preventDefault();
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <p className="menu__meta">{brand.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
