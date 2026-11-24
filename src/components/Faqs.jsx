import React, { useState } from 'react';
import { ChevronDown, Send, CheckCircle2, Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Faqs({ onNavigate }) {
  const { content } = useCms();
  const faqsCms = content?.faqs || {};

  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Development',
    budget: '$25,000 – $50,000',
    message: '',
  });

  const defaultFaqs = [
    {
      q: 'What distinguishes CODEXX PLUS from typical digital agencies?',
      a: 'We operate as an elite engineering and design architecture lab. You work directly with principal architects—not account managers or junior proxies. We engineer deterministic multi-agent AI workflows, bespoke WebGL shaders, zero-layout-shift frontends, and high-throughput cloud backends built for enterprise scale.',
    },
    {
      q: 'How does your 4-stage engagement methodology work?',
      a: 'Our framework spans 4 deterministic phases: 1) Discovery & System Blueprinting (exhaustive technical evaluation & system specs), 2) Interactive Prototyping & Shaders (live WebGL sandbox and design tokens), 3) Production Engineering & AI Pipelines (typed, zero-bloat code with edge workers), and 4) Global Deployment & Observability SLA (zero-downtime cutover and 24/7 monitoring).',
    },
    {
      q: 'What is Generative Engine Optimization (GEO)?',
      a: 'GEO is next-generation discovery optimization engineered to ensure your company and product offerings are accurately synthesized, cited, and recommended by generative AI engines (Perplexity, ChatGPT, Claude, and Gemini) alongside traditional algorithmic Google ranking.',
    },
    {
      q: 'What pricing plans and engagement models do you offer?',
      a: 'We offer three transparent structures: Flagship Sprint ($25,000+ for 3–4 week rapid brand & digital product launches), Enterprise Architecture ($60,000+ for end-to-end full-stack platforms with autonomous AI pipelines), and Dedicated Studio Retainer ($18,000/mo for 160+ guaranteed hours of senior architectural velocity).',
    },
    {
      q: 'How do we schedule a discovery call and begin?',
      a: 'Submit your project details using the inquiry form here or schedule a direct 15-minute introductory call. We evaluate technical feasibility, target psychology, and architectural alignment within 24 hours. We only take on 3 to 4 flagship enterprise engagements simultaneously.',
    },
  ];

  const faqs = (faqsCms.items && faqsCms.items.length > 0) ? faqsCms.items : defaultFaqs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Enterprise Client',
          service: formData.service || 'Development',
          budget: formData.budget || '$25,000 – $50,000',
          message: formData.message && formData.message.trim().length >= 5
            ? formData.message.trim()
            : `Discovery consultation inquiry for ${formData.service || 'Full-Stack Architecture'}.`,
        }),
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', company: '', service: 'Development', budget: '$25,000 – $50,000', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="faqs" className="relative py-20 sm:py-28 bg-[#0d0718] border-t border-purple-500/15 overflow-hidden">
      
      {/* Decorative background circles */}
      <div className="absolute top-10 left-10 w-48 h-48 opacity-15 pointer-events-none">
        <img src="/assets/f3-bg-circle-1.webp" alt="deco" className="w-full h-full object-contain filter hue-rotate-[240deg]" />
      </div>
      <div className="absolute bottom-10 right-10 w-64 h-64 opacity-15 pointer-events-none">
        <img src="/assets/f3-bg-circle-2.webp" alt="deco" className="w-full h-full object-contain filter hue-rotate-[240deg]" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title & FAQs Accordion */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
                Discovery & Architecture FAQ
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                Designed for Deep Focus & Architectural Precision
              </h2>
              <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed max-w-xl">
                Clear answers regarding our deterministic engineering sprints, autonomous AI systems, and dark luxury engagement models.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-[#140a26] border-purple-500/40 shadow-[0_0_25px_rgba(139,92,246,0.15)]'
                        : 'bg-[#10081e] border-purple-500/10 hover:border-purple-500/25'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-semibold text-white">
                        {faq.q}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#7c3aed] text-white rotate-180' : 'bg-purple-500/10 text-purple-300'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 text-sm text-purple-200/80 leading-relaxed border-t border-purple-500/15 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Schedule a Discovery Call Form from codexplus.site */}
          <div className="lg:col-span-5 relative" id="contact">
            
            {/* Floating 3D Ball */}
            <div className="absolute -top-6 -right-6 w-16 h-16 pointer-events-none z-20 animate-float">
              <img src="/assets/f3-boll.webp" alt="3D ball" className="w-full h-full object-contain filter hue-rotate-[240deg] drop-shadow-[0_10px_20px_rgba(139,92,246,0.5)]" />
            </div>

            <div className="bg-[#120822] border border-purple-500/25 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(44,21,140,0.25)] relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Schedule a Discovery Call</h3>
                  <p className="text-xs text-purple-300/70 mt-1">Pick a topic and leave your contact. We evaluate within 24h.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('/contact')}
                    title="Open dedicated Contact page"
                    className="p-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-[#c084fc] hover:text-white transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Discovery Call Requested!</h4>
                  <p className="text-sm text-purple-200/80">
                    Thank you, {formData.name}. Our principal architects will review your project and email you at {formData.email} to confirm the session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alexander Reid"
                      className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@enterprise.com"
                      className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                        Discipline
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#a855f7] transition-colors"
                      >
                        <option value="Development">Development (Full-Stack & AI)</option>
                        <option value="Graphics Design">Graphics Design & Brand Tokens</option>
                        <option value="Video Editing">Video Editing & 3D WebGL</option>
                        <option value="SEO / GEO">SEO & Generative Engine Discovery</option>
                        <option value="Social Media Marketing">Social Media & Growth</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#a855f7] transition-colors"
                    >
                      <option value="$25,000+">Flagship Sprint ($25,000+)</option>
                      <option value="$60,000+">Enterprise Architecture ($60,000+)</option>
                      <option value="$18,000/mo">Dedicated Retainer ($18,000 / mo)</option>
                      <option value="Custom Enterprise">Custom Enterprise Scope</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-purple-300/80 mb-2">
                      Project Goals & Architectural Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your systems, challenges, and target milestones..."
                      className="w-full bg-[#180d2e] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Request Discovery Session</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
