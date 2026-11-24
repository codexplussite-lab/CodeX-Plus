import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Pricing({ onSelectTier, onOpenBookingModal }) {
  const { content } = useCms();
  const pricingCms = content?.pricing || {};

  const defaultTiers = [
    {
      name: 'Flagship Sprint',
      badge: 'Rapid Launch',
      price: '$25,000+',
      period: 'per sprint',
      timeline: '3–4 Weeks Delivery',
      description: 'Ideal for venture-backed startups and established firms needing a rapid, breathtaking brand overhaul or standalone digital product launch.',
      features: [
        'Comprehensive Luxury Dark UI/UX Design System',
        'Full-Stack Next.js 15 / Vite Web Platform',
        'Interactive 3D Motion & WebGL Choreography',
        'Core Web Vitals 95+ Mobile & Desktop Score',
        'Complete SEO & OpenGraph Asset Kit',
        'Direct Principal Architect Access',
      ],
      popular: false,
      ctaText: 'Select Flagship Sprint',
    },
    {
      name: 'Enterprise Architecture',
      badge: 'Most Comprehensive',
      price: '$60,000+',
      period: 'per engagement',
      timeline: '6–8 Weeks Delivery',
      description: 'Our end-to-end flagship engagement combining complex full-stack web platforms with custom autonomous AI workflows and 3D WebGL experiences.',
      features: [
        'Everything in Flagship Sprint',
        'Autonomous Multi-Agent AI Pipelines & LLMs',
        'Custom GPU-accelerated WebGL Shaders & Scenes',
        'Enterprise Database & High-Throughput API Gateway',
        'SOC2-ready Security Posture & Role-Based Access',
        'GEO (Generative Engine Optimization) Setup',
        'Dedicated Slack Bridge & Bi-Weekly Sprints',
      ],
      popular: true,
      ctaText: 'Select Enterprise Architecture',
    },
    {
      name: 'Dedicated Studio Retainer',
      badge: 'Continuous Velocity',
      price: '$18,000',
      period: '/ month',
      timeline: 'Ongoing Partnership',
      description: 'An embedded sprint team acting as your external Principal Design & Engineering arm for continuous feature rollouts and architectural evolution.',
      features: [
        'Guaranteed 160+ Dedicated Senior Hours / Month',
        'Continuous Feature Design & Production Deployment',
        'Priority 4-Hour Emergency SLA Response',
        'Autonomous AI Agent Maintenance & Fine-Tuning',
        'Ongoing Conversion & SEO/GEO Optimization',
        'Weekly Strategy & Architecture Reviews',
      ],
      popular: false,
      ctaText: 'Retain Studio Velocity',
    },
  ];

  const tiers = pricingCms.tiers && pricingCms.tiers.length > 0 ? pricingCms.tiers : defaultTiers;

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#080312] border-t border-purple-500/15 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-violet-600/10 via-purple-600/10 to-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
            {pricingCms.sectionBadge || 'Investment Tiers & Engagement Models'}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-2 font-sans">
            {pricingCms.title || 'Transparent, Predictable Investment'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-purple-200/75 leading-relaxed font-sans">
            {pricingCms.subtitle || 'Predictable pricing for venture-backed startups, high-growth scaleups, and global enterprises. No proxy managers, zero junior bloat.'}
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#1b0c36] via-[#120726] to-[#0a0416] border-2 border-[#a855f7] shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:shadow-[0_20px_70px_rgba(168,85,247,0.45)] lg:-translate-y-3'
                  : 'bg-[#0e071c]/90 border border-purple-500/20 hover:border-purple-400/50 shadow-xl hover:shadow-[0_16px_40px_rgba(139,92,246,0.22)]'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {!tier.popular && (
                  <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-purple-400/80 mb-3 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {tier.badge}
                  </span>
                )}
                
                <h3 className="text-2xl font-bold text-white font-sans mt-1">{tier.name}</h3>
                
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">{tier.price}</span>
                  <span className="text-xs font-mono text-purple-300/70">{tier.period}</span>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs font-mono text-[#c084fc]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tier.timeline}</span>
                </div>

                <p className="mt-5 text-xs sm:text-sm text-purple-200/70 leading-relaxed font-sans border-b border-purple-500/15 pb-6">
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-3">
                    Deliverables Included:
                  </div>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-purple-100/90 font-sans">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-purple-500/15">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTier) onSelectTier(tier.name);
                    if (onOpenBookingModal) onOpenBookingModal(tier.name);
                  }}
                  className={`w-full py-4 px-6 rounded-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    tier.popular
                      ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]'
                      : 'bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-white hover:border-[#a855f7] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Architecture Callout Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#170a30] via-[#100624] to-[#0d041c] border border-purple-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#c084fc] block mb-1">
              Custom Engineering Requirements
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              Have a bespoke enterprise requirement?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl font-sans">
              We architect custom multi-cloud microservices, on-prem LLM clusters, and high-frequency trading interfaces for Fortune 500 pioneers.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-mono font-bold px-6 py-3.5 rounded-full uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] shrink-0 cursor-pointer"
          >
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
