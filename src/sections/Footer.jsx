import { useState } from 'react';
import SplitText from '../components/bits/SplitText.jsx';
import Magnet from '../components/bits/Magnet.jsx';
import CircularText from '../components/bits/CircularText.jsx';
import { brand as defaultBrand, nav as defaultNav } from '../data/content.js';
import { useCms } from '../context/CmsContext';

export default function Footer() {
  const { content } = useCms();
  const brand = content?.brand || defaultBrand;
  const nav = content?.nav || defaultNav;

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const top = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  const handleNewsletter = async e => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('#nl');
    const email = input?.value;
    if (!email) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success !== false) {
        setDone(true);
      } else {
        setError(data?.message || 'Failed to subscribe.');
      }
    } catch {
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  const openAdmin = e => {
    e.preventDefault();
    window.location.hash = '#admin';
    window.dispatchEvent(new Event('hashchange'));
  };

  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer__cta">
          <SplitText tag="h2" text="Want to start?" splitType="chars" effect="rise" delay={35} duration={1.2} textAlign="left" className="footer__title" rootMargin="-80px" />
          <Magnet padding={120} magnetStrength={4} wrapperClassName="footer__badge">
            <a href={`mailto:${brand.email}`} aria-label={`Email ${brand.email}`} data-cursor="Hello">
              <CircularText text="Say hello • Say hello • " size={190} fontSize={15} fontWeight={600} letterSpacing={3} spinDuration={18}>
                <span className="hero__arrow">↗</span>
              </CircularText>
            </a>
          </Magnet>
        </div>

        <div className="footer__cols">
          <div>
            <h3>Contact</h3>
            <a className="footer__big" href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`}>{brand.phone}</a>
            <a className="footer__big" href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
          <nav aria-label="Footer">
            <h3>Explore</h3>
            <ul>
              {nav.map(n => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
              <li>
                <a href="#admin" onClick={openAdmin} style={{ opacity: 0.6, fontSize: '0.85rem' }}>
                  Admin Portal ↗
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <h3>Newsletter</h3>
            <p>Keep up with our latest work and ideas.</p>
            {done ? (
              <p role="status">You’re subscribed.</p>
            ) : (
              <form className="newsletter" onSubmit={handleNewsletter}>
                <label className="sr-only" htmlFor="nl">Email address</label>
                <input id="nl" type="email" required placeholder="you@company.com" autoComplete="email" disabled={submitting} />
                <button className="round" aria-label="Subscribe" disabled={submitting}>→</button>
              </form>
            )}
            {error && <p style={{ color: 'var(--coral)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{error}</p>}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {brand.name || 'Avista'}. All rights reserved.</p>
          <ul className="footer__social">
            {brand.socials?.map(s => (
              <li key={s.label}><a href={s.href}>{s.label}</a></li>
            ))}
          </ul>
          <button className="link-arrow" onClick={top}>Back to top <span aria-hidden="true">↑</span></button>
        </div>
      </div>
    </footer>
  );
}
