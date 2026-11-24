import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import CircularText from '../components/bits/CircularText.jsx';
import Visual from '../components/Visual.jsx';
import { testimonials } from '../data/content.js';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];
  const step = d => {
    setDir(d);
    setI(v => (v + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials section" id="testimonials">
      <div className="wrap testimonials__layout">
        <div className="testimonials__badge">
          <CircularText text="Trusted by founders • Trusted by founders • " size={150} fontSize={12} fontWeight={600} letterSpacing={2} spinDuration={26}>
            {t?.avatar ? (
              <img src={t.avatar} alt={t.name} className="testimonials__avatar" style={{ objectFit: 'cover' }} />
            ) : (
              <Visual seed={i + 3} className="testimonials__avatar" />
            )}
          </CircularText>
        </div>
        <div className="testimonials__body" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: dir * -40, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && step(info.offset.x < 0 ? 1 : -1)}
            >
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="testimonials__nav">
            <button className="round" onClick={() => step(-1)} aria-label="Previous testimonial">←</button>
            <span>{i + 1} / {testimonials.length}</span>
            <button className="round" onClick={() => step(1)} aria-label="Next testimonial">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
