import { useState, type FormEvent } from 'react';
import { Plus, X, ArrowUpRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { apiUrl } from '../config/api';

const FAQS = [
  {
    q: 'What core services does CODEXX PLUS architect & deploy?',
    a: 'We specialize in enterprise AI autonomous agent workflows, high-throughput full-stack cloud platforms (Next.js, React, Node.js), bespoke dark luxury UI/UX design systems, and interactive 3D WebGL / GPU-accelerated graphics.',
  },
  {
    q: 'What is the standard sprint duration for an enterprise engagement?',
    a: 'A typical flagship overhaul or custom AI platform rollout spans 4 to 8 weeks depending on scope, delivered in bi-weekly milestones with verified acceptance tests and continuous staging previews.',
  },
  {
    q: 'How are commercial agreements and retainer structures scheduled?',
    a: 'We offer fixed-scope milestone sprints starting from $25k as well as dedicated embedded studio retainers ($18k/mo) with guaranteed senior architect bandwidth, SLA guarantees, and priority execution.',
  },
  {
    q: 'Do you provide maintenance and engineering support post-launch?',
    a: 'Yes. Every project includes 30 days of post-deployment monitoring, direct senior architect access, and optional ongoing retainer arrangements covering continuous feature rollouts and infrastructure optimization.',
  },
  {
    q: 'How does our enterprise team initiate an architectural engagement?',
    a: 'Submit the preliminary brief below or book a direct 15-minute discovery call with our leadership. We deliver an architectural proposal and bilateral NDA within 24 hours.',
  },
];

interface FaqConsultationSectionProps {
  onOpenModal: () => void;
}

export function FaqConsultationSection({ onOpenModal: _onOpenModal }: FaqConsultationSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: 'Enterprise Architecture & AI',
          budget: '$50k – $100k',
          message: message.trim() || 'Direct consultation inquiry submitted via FAQ Hub.',
          privacyPolicy: true,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="faq-hub"
      aria-label="FAQs and Direct Consultation Hub"
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[750px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-800/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Avista Concentric Radar / Dial Centerpiece */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Concentric radar rings decoration */}
          <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full border border-violet-400/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]">
            <div className="absolute inset-4 rounded-full border border-violet-400/15" />
            <div className="absolute inset-10 rounded-full border border-violet-400/10" />
            <div className="absolute top-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_12px_#c084fc]" />
          </div>

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Clarity &amp; Architecture Direct
          </span>

          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Effortless Creativity for Success
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Deterministic software solutions that eliminate complexity, so enterprise founders can focus on expansion while we bring their technical vision to life.
          </p>
        </div>

        {/* 2-Column Split: Left FAQ Accordion + Right Consultation Form */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: FAQ Accordion (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <h3 className="font-display text-2xl font-bold text-white">
              Frequently Addressed Inquiries
            </h3>
            <p className="text-xs text-gray-400">
              Clear answers regarding our engineering standards, sprint velocity, and NDA protocols.
            </p>

            <div className="mt-6 space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = expandedFaq === index;

                return (
                  <div
                    key={faq.q}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-violet-400/60 bg-[#140a24]/90 shadow-[0_8px_30px_rgba(139,92,246,0.2)]'
                        : 'border-white/10 bg-[#0d0718]/80 hover:border-violet-400/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between p-5 text-left text-sm font-semibold tracking-wide text-white focus-visible:outline-2 focus-visible:outline-violet-400 sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300">
                        {isOpen ? <X className="h-4 w-4 text-violet-300" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 px-5 pt-3 pb-5 text-sm leading-relaxed text-gray-300">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Project Briefing Card (5 cols) */}
          <div className="rounded-3xl border border-violet-400/30 bg-[#120820]/90 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.65)] lg:col-span-5">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-300">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="mt-5 font-display text-2xl font-bold text-white">
                  Brief Received
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  Thank you, <span className="text-white font-medium">{name || 'there'}</span>. A principal architect will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-6 cursor-pointer rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] hover:bg-violet-100"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                    Tell details about your project
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-gray-400">
                    Response: &lt; 24h
                  </span>
                </div>

                <h4 className="mt-3 font-display text-2xl font-bold text-white">
                  Structured Project Consultation
                </h4>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="hub-name" className="block text-xs font-medium text-gray-300">
                      Full Name *
                    </label>
                    <input
                      id="hub-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Julian Mercer"
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="hub-email" className="block text-xs font-medium text-gray-300">
                      Work Email *
                    </label>
                    <input
                      id="hub-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="hub-message" className="block text-xs font-medium text-gray-300">
                      Project Objective / Scope
                    </label>
                    <textarea
                      id="hub-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief overview of timelines, architecture goals, or platform vision..."
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-bold tracking-wider text-[#0a0612] uppercase shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:bg-violet-100 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-violet-400"
                  >
                    <span>{submitting ? 'Transmitting...' : 'Submit Inquiry'}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>

                {/* Support Engineer Badge */}
                <div className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Aiden Mercer, Principal Architect"
                    className="h-10 w-10 rounded-full border border-violet-400/40 object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Aiden Mercer &bull; Principal Architect
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <span className="flex text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      </span>
                      <span>Client Satisfaction 4.9/5 &bull; Bilateral NDA Standard</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
