import React from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Code2, 
  Zap, 
  Globe2, 
  Terminal, 
  Flame 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function AboutPage({ onNavigate, onOpenBookingModal }) {
  const { content } = useCms();
  const aboutCms = content?.about || {};

  const defaultStats = [
    { label: 'Uptime & Production SLA', value: '99.98%' },
    { label: 'Enterprise Value Influenced', value: '$420M+' },
    { label: 'Deterministic Deployments', value: '30+' },
    { label: 'Global Flagship Hubs', value: '4 Hubs' },
  ];

  const stats = aboutCms.stats && aboutCms.stats.length > 0 ? aboutCms.stats : defaultStats;

  const pillars = [
    {
      num: '01',
      title: 'Deterministic AI Systems',
      subtitle: 'Zero Hallucination Engineering',
      desc: 'We do not build flimsy wrapper chatbots. We construct hardened, multi-agent LLM DAG networks with strict programmatic fallback mechanisms, deterministic schema enforcement, and zero-data-retention isolation.',
      tags: ['Autonomous Agents', 'RAG Pipelines', 'Vector Synthesis', 'Zero Retention'],
      icon: Cpu,
    },
    {
      num: '02',
      title: 'Obsidian Design Architecture',
      subtitle: 'Dark-Luxury Token Systems',
      desc: 'Every pixel is governed by mathematical design tokens. We choreograph custom GPU shaders, typography hierarchies, and tactile micro-interactions that elevate brand prestige to an institutional level.',
      tags: ['Token Architecture', 'Shader Choreography', 'Spatial UX', 'Core Web Vitals 99+'],
      icon: Palette,
    },
    {
      num: '03',
      title: 'High-Throughput Cloud Backends',
      subtitle: 'Sub-30ms Global Edge Latency',
      desc: 'High-performance cloud platforms built on distributed edge networks and lightweight typed backends. Engineered for millions of concurrent requests without latency spikes or infrastructure bloat.',
      tags: ['Distributed Edge', 'TypeScript & Rust', 'Redis Caching', 'SOC2 Compliance'],
      icon: Layers,
    },
  ];

  const values = [
    {
      title: 'No Junior Proxies',
      desc: 'Every client communicates directly with senior and principal systems architects who write and review production code daily.',
    },
    {
      title: 'Code Ownership Transfer',
      desc: '100% of all intellectual property, git repositories, design Figma assets, and models transfer unconditionally to you.',
    },
    {
      title: 'Selective Concurrency',
      desc: 'We strictly cap our studio to 3–4 concurrent enterprise client engagements to maintain obsessive attention to craft.',
    },
    {
      title: 'Production Speed & Rigor',
      desc: 'Typical flagship sprints deploy within 3 to 6 weeks, replacing multi-quarter legacy agency stagnation with rapid deployment velocity.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/4 w-[650px] h-[550px] bg-violet-600/10 blur-[170px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full" />
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
            <span className="text-[#c084fc]">Studio Philosophy</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-widest text-[#c084fc] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Philosophy & Architectural Ethos</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Treating Code as <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">Digital Architecture</span>.
          </h1>

          <p className="text-lg sm:text-xl text-purple-200/80 font-light leading-relaxed max-w-3xl">
            CODEXX PLUS was founded to reject the bloated, sluggish agency paradigm. We operate as an elite engineering and design laboratory, partnering with visionary leaders to build deterministic software that outlasts trends.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="bg-[#120822]/80 border border-purple-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300 font-mono mb-2">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-mono text-purple-300/70 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Founder Quote Card */}
        <div className="bg-[#10071e] border border-purple-500/25 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-3">
                Principal Architect Manifesto
              </span>
              <blockquote className="text-xl sm:text-2xl text-gray-100 font-light leading-relaxed">
                {aboutCms.quote || '“In an era saturated with generic templates and ungrounded AI experiments, true enterprise advantage belongs to those with surgical precision. We design digital touchpoints that feel like bespoke luxury instruments: impeccably fast, mathematically balanced, and uncompromising in technical performance.”'}
              </blockquote>
            </div>

            <div className="lg:col-span-4 flex items-center gap-4 bg-[#180b2e] border border-purple-500/20 p-5 rounded-2xl">
              <img
                src={aboutCms.founderImage || '/assets/a3-author-1.webp'}
                alt={aboutCms.founderName || 'Alexander Reid'}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#a855f7]"
              />
              <div>
                <h4 className="text-base font-bold text-white">{aboutCms.founderName || 'Alexander Reid'}</h4>
                <p className="text-xs text-purple-300/80 font-mono">{aboutCms.founderRole || 'Founder & Principal Partner'}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#c084fc]">
                  <Award className="w-3.5 h-3.5" />
                  <span>{aboutCms.founderExp || '15+ Years Enterprise Systems'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Core Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 inline-block mb-3">
              Foundational Disciplines
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our Architectural Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#120822]/90 hover:bg-[#160a2b] border border-purple-500/20 hover:border-purple-400/50 rounded-3xl p-8 transition-all duration-500 ease-out flex flex-col justify-between group shadow-xl hover:shadow-[0_16px_40px_rgba(139,92,246,0.25)] hover:-translate-y-2 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/30">
                      Pillar {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform">
                      <p.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#c084fc] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mb-4">{p.subtitle}</p>

                  <p className="text-sm text-purple-200/75 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-purple-500/15">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 text-purple-300 border border-purple-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Operating Principles */}
        <div className="bg-[#0e071c] border border-purple-500/20 rounded-3xl p-8 sm:p-14 mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-2">
              Operational Governance
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Why Global Enterprise Teams Choose CODEXX+
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-[#140a26]/70 border border-purple-500/15">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-indigo-900/30 border border-purple-500/30 shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Build Your Flagship Architecture?
          </h3>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mb-8 font-light">
            Schedule an introductory 15-minute scoping call with Alexander Reid and our lead architects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all cursor-pointer"
            >
              <span>Schedule 15-Min Scoping Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 hover:text-white border border-purple-500/30 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              <span>Explore Capabilities</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
