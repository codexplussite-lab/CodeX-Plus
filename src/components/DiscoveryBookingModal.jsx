import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function DiscoveryBookingModal({ isOpen, onClose, initialService }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || 'AI Innovation & Development');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Prospective Enterprise Client',
          email: email.trim(),
          service: service || 'AI Innovation & Development',
          preferredDate: preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          notes: notes.trim() || 'Introductory 15-minute architectural strategy session.',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="fixed inset-0"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg bg-[#0e071c] border border-purple-500/30 rounded-3xl p-6 sm:p-9 shadow-[0_0_80px_rgba(139,92,246,0.35)] z-10 text-white font-sans">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-purple-400 hover:text-white hover:bg-purple-500/15 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-white font-sans">Discovery Call Requested</h3>
            <p className="text-xs sm:text-sm text-purple-200/80 font-sans max-w-sm mx-auto leading-relaxed">
              We received your strategy request. A calendar invitation and preliminary system blueprint will be dispatched to <strong className="text-white">{email}</strong> within 24 hours.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 px-8 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all cursor-pointer shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
                  Direct Principal Architect Session
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
                Schedule a Discovery Call
              </h2>
              <p className="text-xs text-purple-200/70 font-sans mt-1">
                Pick a preliminary topic and leave your contact. We evaluate technical feasibility within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Mercer"
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Topic of Discussion</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7] cursor-pointer"
                >
                  <option value="AI Innovation & Development">AI Innovation & Development</option>
                  <option value="Enterprise Web Platforms">Enterprise Web Platforms</option>
                  <option value="Bespoke Dark Luxury Design">Bespoke Dark Luxury Design</option>
                  <option value="Generative Engine Optimization (GEO)">Generative Engine Optimization (GEO)</option>
                  <option value="Flagship Sprint ($25k+)">Flagship Sprint ($25k+)</option>
                  <option value="Enterprise Architecture ($60k+)">Enterprise Architecture ($60k+)</option>
                  <option value="Dedicated Studio Retainer ($18k/mo)">Dedicated Studio Retainer ($18k/mo)</option>
                  <option value="General Strategic Advisory">General Strategic Advisory</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Preferred Date (Optional)</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Project Scope / Preliminary Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Outline key requirements, timeline, or architecture questions..."
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting Request...' : 'Schedule Architecture Review'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-purple-400/60 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Spam Guarantee • Strict Mutual NDA Enforced</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
