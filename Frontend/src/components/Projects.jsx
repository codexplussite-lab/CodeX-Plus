import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Projects() {
  const { content } = useCms();
  const projectsCms = content?.projects || {};

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const categories = ['All', 'Development', 'Visual Identity', 'Motion & 3D', 'AI Systems'];

  const defaultProjects = [
    {
      id: 'owl',
      title: 'OWL AI Systems',
      category: 'AI Systems',
      tag: '{ Full-Stack & AI }',
      year: '2025',
      image: '/assets/p3-img-2.webp',
      bg: '/assets/p3-bg-img-1.webp',
      desc: 'Bespoke multi-agent cognitive architecture with sub-millisecond real-time inference pipelines, fine-tuned retrieval engines, and dark-luxury executive dashboard.',
      client: 'OWL Neural Labs',
      role: 'Autonomous AI Orchestration & Full-Stack Platform',
    },
    {
      id: 'morheme',
      title: 'Morheme Tech',
      category: 'Development',
      tag: '{ Enterprise Cloud }',
      year: '2025',
      image: '/assets/p3-img-3.webp',
      bg: '/assets/p3-bg-img-2.webp',
      desc: 'High-throughput cloud observability portal engineered with real-time telemetry, zero-trust cryptographic security boundaries, and GPU-accelerated network visualizers.',
      client: 'Morheme Enterprise',
      role: 'Cloud Architecture & Next.js 15 Platform',
    },
    {
      id: 'zainab',
      title: 'Zainab Bees',
      category: 'Visual Identity',
      tag: '{ Luxury Brand & Commerce }',
      year: '2025',
      image: '/assets/p3-img-4.webp',
      bg: '/assets/p3-bg-img-1.webp',
      desc: 'Cinematic visual storytelling, authoritative packaging guidelines, and custom dark-luxury design tokens powering an international organic collective.',
      client: 'Zainab Bees Global',
      role: 'Brand Tokens & Headless Commerce',
    },
    {
      id: 'lumina',
      title: 'Lumina Labs',
      category: 'AI Systems',
      tag: '{ Neural Ops }',
      year: '2025',
      image: '/assets/p3-img-5.webp',
      bg: '/assets/p3-bg-img-2.webp',
      desc: 'Interactive 3D WebGL motion graphics and real-time model evaluation sandbox for enterprise artificial intelligence researchers.',
      client: 'Lumina Intelligence',
      role: 'Interactive WebGL & Neural Telemetry',
    },
    {
      id: 'veritas',
      title: 'Veritas Capital',
      category: 'Development',
      tag: '{ FinTech Architecture }',
      year: '2025',
      image: '/assets/p3-img-6.webp',
      bg: '/assets/p3-bg-img-1.webp',
      desc: 'High-frequency algorithmic order routing and portfolio simulation platform built with zero-layout-shift frontends and SOC2-ready security.',
      client: 'Veritas Financial',
      role: 'Institutional Trading UI & High-Throughput API',
    },
    {
      id: 'apex',
      title: 'Apex Cloud Intelligence',
      category: 'Motion & 3D',
      tag: '{ Motion & Post }',
      year: '2025',
      image: '/assets/p1-img-1.webp',
      bg: '/assets/p3-bg-img-2.webp',
      desc: 'World-class product keynote film, GPU shader animations, and Generative Engine Optimization (GEO) rollout that accelerated Series B funding.',
      client: 'Apex Intelligence',
      role: 'Keynote Film & Generative Engine Optimization',
    },
  ];

  const projects = (projectsCms.items && projectsCms.items.length > 0) ? projectsCms.items : defaultProjects;

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-20 sm:py-28 bg-[#0a0612] border-t border-purple-500/15 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#7c3aed]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#4f46e5]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-purple-500/15 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
              Selected Works & Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Flagship Enterprise Deployments
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-mono px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    : 'bg-purple-500/10 text-purple-200 border-purple-500/20 hover:border-purple-500/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Interactive List */}
        <div className="space-y-4">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 ease-out cursor-pointer overflow-hidden hover:-translate-y-1.5 ${
                  isHovered 
                    ? 'bg-[#140a26] border-purple-500/50 shadow-[0_16px_40px_rgba(139,92,246,0.25)]' 
                    : 'bg-[#10081e] border-purple-500/10 hover:border-purple-400/40 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  
                  {/* Left: Tag, Title & Year */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#c084fc]">
                      {project.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-[#c084fc] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-purple-200/70 max-w-xl">
                      {project.desc}
                    </p>
                  </div>

                  {/* Right: Year, Thumbnail & Action */}
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-purple-300/80 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full">
                      {project.year}
                    </span>

                    {/* Thumbnail Image */}
                    <div className="w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden border border-purple-500/20 bg-black shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Arrow Circle */}
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 group-hover:bg-[#7c3aed] text-purple-300 group-hover:text-white flex items-center justify-center border border-purple-500/20 transition-all duration-300 group-hover:rotate-45 shadow-sm">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#120822] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(44,21,140,0.4)] overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-purple-400 hover:text-white p-2 rounded-full hover:bg-purple-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-2">
              {selectedProject.tag} • {selectedProject.year}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-purple-500/20 bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-purple-500/20 text-xs font-mono">
              <div>
                <span className="text-purple-400/60 block">ENTERPRISE CLIENT</span>
                <span className="text-white font-bold">{selectedProject.client}</span>
              </div>
              <div>
                <span className="text-purple-400/60 block">DISCIPLINE DELIVERABLES</span>
                <span className="text-white font-bold">{selectedProject.role}</span>
              </div>
            </div>

            <p className="text-sm text-purple-200/80 leading-relaxed mt-4 mb-6">
              {selectedProject.desc} Constructed with zero-layout-shift architecture, sub-millisecond execution, and SOC2-ready security boundaries.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full border border-purple-500/20 text-xs font-mono text-purple-200 hover:text-white hover:bg-purple-500/10 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                <span>Request System Architecture</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
