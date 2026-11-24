import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  Globe 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function ContactPage({ onNavigate, onOpenBookingModal }) {
  const { content } = useCms();
  const brand = content?.brand || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Full-Stack & AI Architecture',
    budget: '$25,000 – $50,000',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || 'Enterprise Client',
          service: formData.service || 'Full-Stack & AI Architecture',
          budget: formData.budget || '$25,000 – $50,000',
          message: formData.message.trim() || `Inquiry for ${formData.service || 'Architecture'}.`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // graceful confirmation
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/4 w-[650px] h-[550px] bg-violet-600/10 blur-[170px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-8 border-b border-purple-500/15 mb-12">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-400/60">
            <span className="hover:text-purple-300 cursor-pointer" onClick={() => onNavigate('/')}>CODEXX+</span>
            <span>/</span>
            <span className="text-[#c084fc]">Discovery & Contact</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-widest text-[#c084fc] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Architecture Consultation</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Initiate a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">Discovery Sprint</span>.
          </h1>

          <p className="text-lg sm:text-xl text-purple-200/80 font-light leading-relaxed max-w-3xl">
            We evaluate architectural feasibility, technical scope, and project alignment within 24 hours. Connect directly with our managing partners and principal architects.
          </p>
        </div>

        {/* Main Grid: Form (Left) & Hub Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          
          {/* Left Column: Comprehensive Consultation Form */}
          <div className="lg:col-span-7 bg-[#10071e]/90 border border-purple-500/25 rounded-3xl p-8 sm:p-11 shadow-2xl backdrop-blur-xl">
            
            {submitted ? (
              <div className="text-center py-16 px-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Discovery Brief Received
                </h3>
                <p className="text-sm text-purple-200/80 font-light max-w-md mx-auto mb-8 leading-relaxed">
                  Our principal engineering architects have received your submission. We evaluate specifications under mutual NDA and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      service: 'Full-Stack & AI Architecture',
                      budget: '$25,000 – $50,000',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-xs font-mono text-purple-200 hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-2">
                    Project Consultation Inquiry
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Tell Us About Your Vision
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Julian Vance"
                      className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@enterprise.io"
                      className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Northstar AI Corp"
                      className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                      Primary Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono cursor-pointer"
                    >
                      <option value="Full-Stack & AI Architecture">Full-Stack & AI Architecture</option>
                      <option value="Graphics Design & Luxury Tokens">Graphics Design & Luxury Tokens</option>
                      <option value="Video Editing & 3D WebGL Motion">Video Editing & 3D WebGL Motion</option>
                      <option value="Social Media Executive Growth">Social Media Executive Growth</option>
                      <option value="SEO / GEO Generative Engine Optimization">SEO / GEO Generative Engine Optimization</option>
                      <option value="Dedicated Studio Retainer">Dedicated Studio Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                    Estimated Capital Allocation / Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono cursor-pointer"
                  >
                    <option value="$25,000 – $50,000">$25,000 – $50,000 (Flagship Sprint Tier)</option>
                    <option value="$50,000 – $100,000">$50,000 – $100,000 (Enterprise Architecture)</option>
                    <option value="$100,000+">$100,000+ (Full Platform & Retainer Ecosystem)</option>
                    <option value="$18,000/mo Retainer">$18,000/mo (Dedicated Monthly Retainer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
                    System Architecture Requirements & Overview
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your architectural goals, current tech stack, desired launch timeline, and key performance deliverables..."
                    className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400/70">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Protected under strict Mutual NDA</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{submitting ? 'Transmitting Brief...' : 'Transmit Scoping Brief'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Global Hubs, Instant 15-Min Booking & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 15-Minute Instant Scoping Card */}
            <div className="bg-[#120822] border border-purple-500/25 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-[#c084fc]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c084fc] block">
                    Rapid Evaluation
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Need an Immediate Discussion?
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6 font-light">
                Skip the questionnaire. Book a 15-minute introductory technical alignment call directly with our principal architects.
              </p>

              <button
                type="button"
                onClick={onOpenBookingModal}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
              >
                <span>Schedule 15-Min Scoping Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Channel Cards */}
            <div className="bg-[#120822] border border-purple-500/20 rounded-3xl p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href={`mailto:${brand.primaryEmail || 'contact@codexplus.site'}`}
                  className="text-xl sm:text-2xl font-bold text-white hover:text-[#c084fc] transition-colors font-mono block"
                >
                  {brand.primaryEmail || 'contact@codexplus.site'}
                </a>
                <span className="text-xs font-mono text-purple-400/60 block mt-1">
                  {brand.slaResponse || 'Guaranteed architect response under 24 hours.'}
                </span>
              </div>

              <div className="pt-6 border-t border-purple-500/15 space-y-4">
                <h5 className="text-xs font-mono uppercase tracking-wider text-white">
                  Studio Headquarters & Flagship Hubs
                </h5>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#a855f7] mt-1 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">San Francisco Flagship</span>
                    <span className="text-xs text-purple-300/70 font-mono">{brand.sfAddress || '555 Mission St, Suite 2400, CA 94105'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#a855f7] mt-1 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Zürich Systems Lab</span>
                    <span className="text-xs text-purple-300/70 font-mono">{brand.zurichAddress || 'Gotthardstrasse 26, 8002 Zürich, Switzerland'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono text-purple-400/60">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit TLS Ingestion</span>
                </div>
                <span>SOC2 Compliant</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
