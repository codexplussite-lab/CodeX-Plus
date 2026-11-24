import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Visual from '../components/Visual.jsx';
import SplitText from '../components/bits/SplitText.jsx';
import { services } from '../data/content.js';

const seeds = [0, 2, 3, 5]; // palette indexes that stay visible on the dark section

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="services section" id="services">
      <div className="wrap">
        <SplitText tag="h2" text="Our services" splitType="chars" effect="rise" delay={30} textAlign="left" className="section-title" rootMargin="-60px" />
        <div className="services__layout">
          <ul className="services__list">
            {services.map((s, i) => {
              const open = active === i;
              return (
                <li key={s.title} className={`service ${open ? 'is-open' : ''}`}>
                  <h3>
                    <button
                      className="service__head"
                      aria-expanded={open}
                      aria-controls={`service-${i}`}
                      onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                    >
                      <span className="service__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="service__title">{s.title}</span>
                      <span className="service__plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`service-${i}`}
                        className="service__panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{s.body}</p>
                        <ul className="tags">
                          {s.tags.map(t => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="services__visual" aria-hidden="true">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                className="services__frame"
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.1 }}
                animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                {services[active]?.image ? (
                  <img src={services[active].image} alt={services[active].title} className="visual" style={{ objectFit: 'cover' }} />
                ) : (
                  <Visual seed={seeds[active % seeds.length]} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
