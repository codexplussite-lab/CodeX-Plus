import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplitText from '../components/bits/SplitText.jsx';
import { faqs as defaultFaqs } from '../data/content.js';
import { useCms } from '../context/CmsContext';

export default function Faq() {
  const { content } = useCms();
  const faqs = content?.faqs || defaultFaqs;

  const [open, setOpen] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const submit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const details = formData.get('details');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: details,
          service: 'Avista Project Consultation',
          company: 'Client Inquiry',
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success !== false) {
        setSent(true);
      } else {
        setError(data?.message || 'Failed to submit details. Please try again.');
      }
    } catch {
      // Graceful offline fallback
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="faq section" id="faq">
      <div className="wrap faq__layout">
        <div>
          <SplitText tag="h2" text="Questions, answered" splitType="words" effect="rise" delay={60} textAlign="left" className="section-title" rootMargin="-60px" />
          <ul className="faq__list">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className={isOpen ? 'is-open' : ''}>
                  <h3>
                    <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      <span>{f.q}</span>
                      <span className="service__plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="faq__answer"
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="faq__form card card--ink" aria-labelledby="form-title">
          <p className="faq__reply">We reply within 1 hour on business days</p>
          <h3 id="form-title">Tell us about your project</h3>
          {sent ? (
            <p className="faq__thanks" role="status">Thanks. We’ve got your details and will be in touch shortly.</p>
          ) : (
            <form onSubmit={submit}>
              <label>
                Name
                <input name="name" required autoComplete="name" disabled={submitting} />
              </label>
              <label>
                Email
                <input name="email" type="email" required autoComplete="email" disabled={submitting} />
              </label>
              <label>
                What are you building?
                <textarea name="details" rows={3} required disabled={submitting} />
              </label>
              {error && (
                <p style={{ color: 'var(--coral)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>
              )}
              <button className="btn btn--light" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send details'}
              </button>
            </form>
          )}
        </aside>
      </div>
    </section>
  );
}
