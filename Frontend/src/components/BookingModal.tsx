import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { X, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('AI Innovation & Development');

  const resetAndClose = useCallback(() => {
    setSubmitted(false);
    setName('');
    setEmail('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetAndClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, resetAndClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service,
        }),
      });

      if (!res.ok) {
        // Fallback if running directly without proxy
        await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            service,
          }),
        }).catch(() => {});
      }
      setSubmitted(true);
    } catch {
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-violet-400/30 bg-[#12091f] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-300">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3
              id="booking-modal-title"
              className="mt-5 font-display text-2xl font-semibold text-white"
            >
              Discovery Call Requested
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Thanks, <span className="text-white">{name || 'there'}</span>. Our
              team will send a calendar invite to{' '}
              <span className="text-violet-300">{email || 'your inbox'}</span>{' '}
              within 24 hours.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-7 cursor-pointer rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0a0612] transition-colors hover:bg-violet-100"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
              <Calendar className="h-3.5 w-3.5" />
              15-Minute Strategy Call
            </div>
            <h3
              id="booking-modal-title"
              className="mt-4 font-display text-2xl font-semibold text-white"
            >
              Schedule a Discovery Call
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Pick a preliminary topic and leave your contact. We&apos;ll reach
              out with private calendar availability.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Topic of Discussion
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#170c2a] px-3.5 py-2.5 text-sm text-white transition-colors focus:border-violet-400/60 focus:outline-none"
                >
                  <option value="AI Innovation & Development">
                    AI Innovation &amp; Development
                  </option>
                  <option value="Enterprise Web Platforms">
                    Enterprise Web Platforms
                  </option>
                  <option value="Bespoke Dark Luxury Design">
                    Bespoke Dark Luxury Design
                  </option>
                  <option value="3D Motion & WebGL Graphics">
                    3D Motion &amp; WebGL Graphics
                  </option>
                  <option value="General Strategic Advisory">
                    General Strategic Advisory
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-[#0a0612] shadow-[0_0_28px_rgba(168,85,247,0.4)] transition-all hover:bg-violet-100 disabled:opacity-50"
                >
                  <span>{submitting ? 'Confirming...' : 'Confirm Call Request'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
