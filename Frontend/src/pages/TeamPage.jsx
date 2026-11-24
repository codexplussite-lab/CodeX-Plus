import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Globe, 
  MapPin, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Cpu, 
  Palette, 
  Briefcase, 
  Users 
} from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '../components/Icons';
import { useCms } from '../context/CmsContext';

export default function TeamPage({ onNavigate, onOpenBookingModal }) {
  const { content } = useCms();
  const teamCms = content?.team || {};

  const [filter, setFilter] = useState('all');

  const defaultArchitects = [
    {
      name: 'Alexander Reid',
      role: 'Founder & Managing Partner',
      category: 'leadership',
      image: '/assets/t3-img-1.webp',
      specialty: 'High-Throughput Distributed Systems & Cloud',
      location: 'San Francisco, CA',
      bio: 'Former principal systems architect with 15+ years engineering high-concurrency cloud backends and venture-backed platforms.',
      tags: ['System Architecture', 'Zero-Downtime', 'Cloud Strategy'],
    },
    {
      name: 'Helena Rostova',
      role: 'Creative Director & Co-Founder',
      category: 'design',
      image: '/assets/t3-img-2.webp',
      specialty: 'Dark Luxury Design Tokens & Spatial Systems',
      location: 'Zürich, Switzerland',
      bio: 'Leading digital luxury product designer sculpting authoritative token systems, typography hierarchies, and tactile micro-interactions.',
      tags: ['Token Architecture', 'Luxury Identity', 'Figma Systems'],
    },
    {
      name: 'Marcus Thorne',
      role: 'Principal AI Systems Engineer',
      category: 'ai',
      image: '/assets/t3-img-3.webp',
      specialty: 'LLM Orchestration & Autonomous Agent Meshes',
      location: 'San Francisco, CA',
      bio: 'Specialist in multi-agent DAG architectures, vector embeddings, fine-tuning, and zero-retention enterprise inference isolation.',
      tags: ['Autonomous Agents', 'RAG Pipelines', 'Vector Synthesis'],
    },
    {
      name: 'Maya Patel',
      role: 'Head of Product Strategy',
      category: 'leadership',
      image: '/assets/t3-img-4.webp',
      specialty: 'Enterprise Architecture & Cognitive Psychology',
      location: 'London, UK',
      bio: 'Bridges complex technical capabilities with enterprise business models, driving product-led growth and high-conversion UX flows.',
      tags: ['Product Velocity', 'Enterprise UX', 'GTM Strategy'],
    },
    {
      name: 'Kai Takahashi',
      role: 'Senior WebGL & 3D Motion Architect',
      category: 'design',
      image: '/assets/t3-img-5.webp',
      specialty: 'GPU Shaders, Three.js & Interactive Canvases',
      location: 'Tokyo / Remote',
      bio: 'Pioneering mathematical GLSL shader algorithms and lightweight Three.js choreographies that run at 60fps across mobile and desktop.',
      tags: ['WebGL Shaders', 'Three.js', 'Motion Choreography'],
    },
    {
      name: 'Liam Chen',
      role: 'Lead Cloud Infrastructure Architect',
      category: 'systems',
      image: '/assets/t3-img-6.webp',
      specialty: 'Distributed Edge, Zero-Trust & SOC2 Compliance',
      location: 'San Francisco, CA',
      bio: 'Specialist in low-latency global CDN edge routing, microservice containers, Kubernetes orchestration, and immutable audit logging.',
      tags: ['Edge Compute', 'Zero-Trust', 'SOC2 Security'],
    },
    {
      name: 'Amara Okafor',
      role: 'Principal UI/UX Systems Designer',
      category: 'design',
      image: '/assets/t3-img-7.webp',
      specialty: 'Component Libraries & Editorial Digital Layouts',
      location: 'Zürich, Switzerland',
      bio: 'Designs scalable, type-safe frontend UI component libraries that merge editorial luxury aesthetics with uncompromising usability.',
      tags: ['Design Systems', 'Micro-Interactions', 'Accessibility'],
    },
    {
      name: 'Julian Croft',
      role: 'Lead Spatial Computing & AI Researcher',
      category: 'ai',
      image: '/assets/author-4.webp',
      specialty: 'Hardware Interfaces & Generative Labs',
      location: 'New York, NY',
      bio: 'Researches emerging multimodal generative models and spatial UX paradigms, leading experimental prototyping for CODEXX+ Labs.',
      tags: ['Multimodal AI', 'Spatial Computing', 'Experimental Labs'],
    },
  ];

  const architects = (teamCms.members && teamCms.members.length > 0)
    ? teamCms.members.map((m, idx) => ({
        ...m,
        category: m.category || (idx % 3 === 0 ? 'leadership' : idx % 3 === 1 ? 'design' : 'ai'),
        tags: m.tags || [m.specialty || 'Architecture', 'Enterprise Systems'],
        bio: m.bio || 'Principal architect designing deterministic systems and dark luxury platforms.',
        image: m.image || defaultArchitects[idx % defaultArchitects.length]?.image || '/assets/t3-img-1.webp',
      }))
    : defaultArchitects;

  const filteredArchitects = filter === 'all' 
    ? architects 
    : architects.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-24 left-1/3 w-[600px] h-[500px] bg-purple-600/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full" />
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
            <span className="text-[#c084fc]">Architects & Leadership</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-widest text-[#c084fc] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Architects & Leadership Directory</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Architects of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">New Standard</span>.
          </h1>

          <p className="text-lg sm:text-xl text-purple-200/80 font-light leading-relaxed max-w-3xl">
            We do not employ account managers, junior proxies, or bureaucratic layers. You collaborate directly with principal engineers, designers, and researchers who execute at the global frontier.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-purple-500/15 pb-6">
          {[
            { id: 'all', label: 'All Architects (08)' },
            { id: 'leadership', label: 'Leadership & Strategy' },
            { id: 'ai', label: 'AI & Autonomous Systems' },
            { id: 'design', label: 'Design Tokens & 3D WebGL' },
            { id: 'systems', label: 'Cloud Infrastructure' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-purple-400/40'
                  : 'bg-[#120822] text-purple-300/70 hover:text-white hover:bg-purple-500/10 border border-purple-500/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Architects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {filteredArchitects.map((a, idx) => (
            <div
              key={idx}
              className="group bg-[#110822]/90 border border-purple-500/20 hover:border-purple-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_35px_rgba(139,92,246,0.2)]"
            >
              <div>
                {/* Photo with Obsidian Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-purple-500/20 mb-6">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent opacity-80" />
                  
                  {/* Location Pin Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0612]/80 backdrop-blur-md border border-purple-500/25 text-[10px] font-mono text-purple-200">
                    <MapPin className="w-3 h-3 text-[#c084fc]" />
                    <span>{a.location}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#c084fc] transition-colors mb-1">
                  {a.name}
                </h3>
                <p className="text-xs font-mono text-[#c084fc] mb-3">
                  {a.role}
                </p>

                <p className="text-xs text-purple-200/70 leading-relaxed mb-4">
                  {a.bio}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-purple-500/15 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-purple-300 border border-purple-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between text-xs font-mono text-purple-400/60 pt-2 border-t border-purple-500/10">
                  <div className="flex items-center gap-2">
                    <a href="#" className="w-7 h-7 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] flex items-center justify-center text-purple-300 hover:text-white transition-colors">
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-7 h-7 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] flex items-center justify-center text-purple-300 hover:text-white transition-colors">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Active Lead</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Senior Fellowship / Hiring Banner */}
        <div className="bg-[#0e071c] border border-purple-500/20 rounded-3xl p-8 sm:p-14 mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-2">
                Talent Fellowship
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Join the Principal Architecture Bench
              </h3>
              <p className="text-sm text-purple-200/80 leading-relaxed font-light max-w-2xl">
                We are continually scouting world-class distributed systems engineers, WebGL shader artists, and AI researchers. We offer top-percentile equity, sovereign flexibility, and direct ownership of high-impact platforms.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="mailto:careers@codexplus.site"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span>careers@codexplus.site</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-indigo-900/30 border border-purple-500/30 shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Engage Directly With Our Leadership
          </h3>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mb-8 font-light">
            Skip the middle managers. Schedule a technical discovery sprint directly with our principal architects.
          </p>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all cursor-pointer"
          >
            <span>Schedule 15-Min Scoping Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
