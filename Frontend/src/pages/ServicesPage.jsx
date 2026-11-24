import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CodeXml, 
  Palette, 
  Film, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function ServicesPage({ onNavigate, onOpenBookingModal }) {
  const { content } = useCms();
  const servicesCms = content?.services || {};

  const [selectedDiscipline, setSelectedDiscipline] = useState(0);

  const defaultDisciplines = [
    {
      num: '01',
      id: 'development',
      title: 'Full-Stack & Autonomous AI Development',
      badge: 'Core Architecture',
      tagline: 'High-throughput enterprise platforms with autonomous LLM orchestration.',
      desc: 'We engineer deterministic web platforms, custom agent DAG pipelines, and lightning-fast edge microservices. Every application is built with strict type safety, zero layout shifts, and sub-second global responses.',
      deliverables: [
        'Production Next.js 15 / React / Vite Architectures',
        'Multi-Agent LLM Orchestration & Custom Vector Indexes',
        'Custom WebGL Shaders & Real-time Canvas Rendering',
        'Distributed Edge Infrastructure & High-Concurrency APIs',
        'SOC2 & GDPR Data Isolation and Automated Audit Logs',
        'Full CI/CD Pipeline & 100% Intellectual Property Ownership',
      ],
      techStack: ['Next.js 15', 'TypeScript', 'LangChain / LlamaIndex', 'PostgreSQL', 'Redis', 'Docker', 'AWS / Cloudflare Edge'],
      image: '/assets/p3-img-2.webp',
      icon: CodeXml,
    },
    {
      num: '02',
      id: 'graphics-design',
      title: 'Graphics Design & Visual Tokens',
      badge: 'Brand Authority',
      tagline: 'Authoritative visual identities and dark-luxury digital design systems.',
      desc: 'We sculpt luxury brand identities engineered for global prestige. From mathematical obsidian color tokens to bespoke iconographies and typography hierarchies, we construct systems that command respect.',
      deliverables: [
        'Comprehensive Obsidian & Luxury Dark Design System',
        'Mathematical Color, Spacing & Typography Token Architecture',
        'Corporate Identity Manuals & Brand Governance Rules',
        'High-Fidelity Interactive Figma Component Libraries',
        'Marketing Deck & Keynote Presentation System',
        'Multi-Format Vector Asset Kits & Editorial Graphics',
      ],
      techStack: ['Figma Tokens', 'Adobe Creative Suite', 'Cinema 4D', 'Vector Geometry', 'Typography Glyphs'],
      image: '/assets/s3-img-1.webp',
      icon: Palette,
    },
    {
      num: '03',
      id: 'video-editing',
      title: 'Video Editing, Motion & 3D WebGL',
      badge: 'Immersive Motion',
      tagline: 'World-class 3D motion graphics, WebGL choreography, and keynote films.',
      desc: 'We produce cinematic product release keynotes, interactive 3D WebGL canvas choreography, and conversion-optimized motion design that transforms passive viewers into committed stakeholders.',
      deliverables: [
        'Interactive 3D WebGL Canvas & Three.js Experiences',
        'Silicon Valley-Grade Flagship Keynote Launch Films',
        'Complex 3D Product Explainer & Architecture Walkthroughs',
        'Tactile Micro-Interactions & UI Choreography',
        'Spatial Audio & Professional Sound Design Mastering',
        'High-Efficiency Web Video Encoding & Responsive Playback',
      ],
      techStack: ['Three.js', 'WebGL / GLSL', 'Blender / Cinema 4D', 'After Effects', 'Premiere Pro', 'DaVinci Resolve'],
      image: '/assets/p3-img-3.webp',
      icon: Film,
    },
    {
      num: '04',
      id: 'social-media-marketing',
      title: 'Social Media Marketing & Executive Growth',
      badge: 'Strategic Distribution',
      tagline: 'High-leverage omnichannel positioning that drives qualified enterprise pipeline.',
      desc: 'We position founders, executives, and technology firms as industry authorities. Through high-signal thought leadership, data-driven distribution, and precise narrative framing, we generate institutional trust.',
      deliverables: [
        'Executive & Founder Authority Architecture on X & LinkedIn',
        'Deep-Tech Thought Leadership Articles & Technical Whitepapers',
        'High-Impact Graphic Data Visualizations & Infographics',
        'Omnichannel Release Campaigns & Press Orchestration',
        'Community & Developer Ecosystem Activation',
        'Transparent Attribution & Pipeline Conversion Analytics',
      ],
      techStack: ['Analytical Tracking', 'High-Impact Content Systems', 'Ghost / Substack', 'Direct Distribution Channels'],
      image: '/assets/p3-img-4.webp',
      icon: TrendingUp,
    },
    {
      num: '05',
      id: 'seo-geo',
      title: 'SEO / GEO (Search & Generative AI Engine Optimization)',
      badge: 'Next-Gen Discovery',
      tagline: 'Dual-engine authority: dominating both Google and Generative LLM search.',
      desc: 'The search landscape has permanently bifurcated. We optimize your digital presence for both classical search algorithms (Google) and next-generation generative answer engines (Perplexity, ChatGPT, Claude, and Gemini).',
      deliverables: [
        'Generative Engine Optimization (GEO) Semantic Modeling',
        'Authoritative Knowledge Graph & Structured Data Citations',
        'Entity Association for ChatGPT, Perplexity & Claude Synthesis',
        'Programmatic Technical SEO & Core Web Vitals 98+ Optimization',
        'Zero-Bloat Schema.org JSON-LD Microdata Implementation',
        'Competitive Keyword & AI Model Mentions Observability',
      ],
      techStack: ['Schema.org', 'JSON-LD', 'Perplexity Indexing', 'Algorithmic Crawlers', 'OpenGraph Protocol'],
      image: '/assets/p3-img-5.webp',
      icon: Compass,
    },
  ];

  const disciplines = (servicesCms.items && servicesCms.items.length > 0)
    ? servicesCms.items.map((it, idx) => ({
        ...it,
        num: it.num || `0${idx + 1}`,
        icon: defaultDisciplines[idx % defaultDisciplines.length]?.icon || CodeXml,
        techStack: it.techStack || defaultDisciplines[idx % defaultDisciplines.length]?.techStack || ['Edge Computing', 'Enterprise Architecture'],
        deliverables: it.deliverables || defaultDisciplines[idx % defaultDisciplines.length]?.deliverables || ['Deterministic Architecture', 'Type-Safe Endpoints', 'Production Deployment'],
        tagline: it.desc || defaultDisciplines[idx % defaultDisciplines.length]?.tagline || '',
      }))
    : defaultDisciplines;

  const methodology = [
    {
      step: '01',
      title: 'Technical Blueprinting',
      timeframe: 'Week 1',
      desc: 'Exhaustive scoping of architecture specs, database schemas, API boundaries, and mathematical design tokens. No guessing, no assumptions.',
    },
    {
      step: '02',
      title: 'Interactive Shaders & Tokens',
      timeframe: 'Week 2',
      desc: 'Live WebGL and interactive UI components in browser sandboxes. You interact with working prototypes before backend integration.',
    },
    {
      step: '03',
      title: 'Deterministic Engineering',
      timeframe: 'Weeks 3–5',
      desc: 'Full-stack production engineering with typed endpoints, autonomous agent loops, and rigorous end-to-end automated test suites.',
    },
    {
      step: '04',
      title: 'Global Deployment & Observability',
      timeframe: 'Week 6+',
      desc: 'Zero-downtime cutover to global CDN edge nodes, automated rollback configurations, and 99.98% uptime telemetry monitoring.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-1/4 w-[650px] h-[550px] bg-violet-600/10 blur-[170px] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full" />
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
            <span className="text-[#c084fc]">Capabilities & Services</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-widest text-[#c084fc] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Capabilities & Engineering Disciplines</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Full-Spectrum <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">Technical Craft</span>.
          </h1>

          <p className="text-lg sm:text-xl text-purple-200/80 font-light leading-relaxed max-w-3xl">
            From autonomous agent intelligence to GPU-rendered WebGL motion and dual-engine SEO/GEO discovery, we operate as an end-to-end technical partner for elite digital enterprises.
          </p>
        </div>

        {/* Interactive Discipline Selector Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-purple-500/15 pb-6">
          {disciplines.map((d, idx) => {
            const IconComp = d.icon || defaultDisciplines[idx % defaultDisciplines.length]?.icon || CodeXml;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDiscipline(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDiscipline === idx
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-purple-400/40'
                    : 'bg-[#120822] text-purple-300/70 hover:text-white hover:bg-purple-500/10 border border-purple-500/20'
                }`}
              >
                {IconComp && <IconComp className="w-4 h-4" />}
                <span>{(d.title || 'Discipline').split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Detailed Showcase Card */}
        {(() => {
          const active = disciplines[selectedDiscipline] || disciplines[0] || defaultDisciplines[0];
          return (
            <div className="bg-[#10071e] border border-purple-500/25 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Details & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/30">
                      Discipline {active.num}
                    </span>
                    <span className="text-xs font-mono text-purple-400/70 uppercase tracking-wider">
                      {active.badge}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {active.title}
                  </h2>

                  <p className="text-base text-purple-200/90 font-medium">
                    {active.tagline}
                  </p>

                  <p className="text-sm text-purple-300/70 leading-relaxed">
                    {active.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] mb-3">
                      Production Deliverables Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(Array.isArray(active.deliverables) ? active.deliverables : []).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-purple-200/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Stack Pills */}
                  <div className="pt-4 border-t border-purple-500/15">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400/80 mb-2.5">
                      Production Stack & Tools:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(active.techStack) ? active.techStack : []).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] font-mono px-3 py-1 rounded-lg bg-black/40 text-purple-300 border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={onOpenBookingModal}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                    >
                      <span>Scope This Discipline</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('/pricing')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                    >
                      <span>View Pricing Tiers</span>
                    </button>
                  </div>

                </div>

                {/* Right Column: Visual Preview Asset */}
                <div className="lg:col-span-5 relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-purple-500/20 shadow-2xl relative">
                    <img 
                      src={active.image} 
                      alt={active.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0e071c]/80 backdrop-blur-md border border-purple-500/20">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#c084fc] block">
                        Obsidian Standard
                      </span>
                      <span className="text-xs text-white font-medium">
                        Production-grade engineering verified under SOC2 standards.
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

        {/* 4-Stage Methodology Framework */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 inline-block mb-3">
              Deterministic Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our 4-Stage Execution Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#120822]/80 border border-purple-500/20 hover:border-purple-400/50 rounded-3xl p-6 relative group transition-all duration-500 ease-out shadow-lg hover:shadow-[0_16px_36px_rgba(139,92,246,0.22)] hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                    {m.step}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                    {m.timeframe}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-indigo-900/30 border border-purple-500/30 shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need a Custom Architecture Combination?
          </h3>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mb-8 font-light">
            We frequently combine Full-Stack Next.js platforms, Autonomous AI RAG pipelines, and 3D WebGL motion into unified flagship launches.
          </p>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all cursor-pointer"
          >
            <span>Book 15-Min Scoping Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
