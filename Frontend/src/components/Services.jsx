import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus, CodeXml, Palette, Film, TrendingUp, Compass } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import SpotlightCard from './react-bits/SpotlightCard';
import TiltedCard from './react-bits/TiltedCard';

export default function Services({ onNavigate }) {
  const { content } = useCms();
  const servicesCms = content?.services || {};

  const [activeService, setActiveService] = useState(0);

  const defaultServices = [
    {
      num: '01',
      id: 'development',
      title: 'Development',
      tag: 'Full-Stack & AI',
      desc: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
      tags: ['Next.js 15', 'Autonomous LLMs', 'Cloud Infrastructure', 'GPU Shaders'],
      image: '/assets/p3-img-2.webp',
      badge: 'Bespoke Engineering',
      icon: CodeXml
    },
    {
      num: '02',
      id: 'graphics-design',
      title: 'Graphics Design',
      tag: 'Visual Identity',
      desc: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
      tags: ['Design Tokens', 'Brand Guidelines', 'Luxury Identity', 'Spatial UX'],
      image: '/assets/s3-img-1.webp',
      badge: 'Visual Prestige',
      icon: Palette
    },
    {
      num: '03',
      id: 'video-editing',
      title: 'Video Editing',
      tag: 'Motion & Post',
      desc: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
      tags: ['Interactive 3D', 'WebGL Motion', 'Product Keynotes', 'Sound Design'],
      image: '/assets/p3-img-3.webp',
      badge: 'Motion & 3D',
      icon: Film
    },
    {
      num: '04',
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      tag: 'Growth Engine',
      desc: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
      tags: ['Executive Positioning', 'Pipeline Growth', 'Omnichannel Strategy', 'Analytics'],
      image: '/assets/p3-img-4.webp',
      badge: 'Strategic Growth',
      icon: TrendingUp
    },
    {
      num: '05',
      id: 'seo-geo',
      title: 'SEO / GEO',
      tag: 'Search & AI Discovery',
      desc: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery (Perplexity, ChatGPT, Gemini) worldwide.',
      tags: ['Generative Engine (GEO)', 'Algorithmic SEO', 'Structured Citations', 'Authority Indexing'],
      image: '/assets/p3-img-5.webp',
      badge: 'AI Discovery',
      icon: Compass
    },
  ];

  const iconMap = {
    'development': CodeXml,
    'graphics-design': Palette,
    'video-editing': Film,
    'social-media-marketing': TrendingUp,
    'seo-geo': Compass,
  };
  const fallbackIcons = [CodeXml, Palette, Film, TrendingUp, Compass];

  const services = servicesCms.items && servicesCms.items.length > 0 ? servicesCms.items : defaultServices;
  const currentService = services[activeService] || services[0] || defaultServices[0];

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#0a0612] border-t border-purple-500/15 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#7c3aed]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-purple-500/15 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
              {servicesCms.sectionBadge || 'Our Capabilities & Disciplines'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {servicesCms.title || 'What We Offer'}
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-sm text-purple-200/70 max-w-md font-mono sm:text-right">
              {servicesCms.subtitle || '{ End-to-end digital solutions designed to elevate your brand, scale your business, and drive real results. }'}
            </p>
            <button
              onClick={() => onNavigate?.('/services')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c084fc] hover:text-white transition-colors cursor-pointer group"
            >
              <span>Explore Dedicated Capabilities Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Content Layout: Interactive Accordion / Hover List + Live Image Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Services List (Left) */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((item, idx) => {
              const isActive = activeService === idx;
              const IconComp = item.icon || iconMap[item.id] || fallbackIcons[idx % fallbackIcons.length] || CodeXml;
              return (
                <SpotlightCard
                  key={item.id || idx}
                  spotlightColor={isActive ? 'rgba(168, 85, 247, 0.35)' : 'rgba(139, 92, 246, 0.15)'}
                  borderColor={isActive ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.15)'}
                  className={`p-6 sm:p-7 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-[#140a26] shadow-[0_10px_35px_rgba(139,92,246,0.18)]'
                      : 'bg-[#10081e] hover:border-purple-500/25'
                  }`}
                >
                  <div 
                    onMouseEnter={() => setActiveService(idx)}
                    onClick={() => setActiveService(idx)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${
                          isActive ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md' : 'bg-purple-500/10 text-purple-300'
                        }`}>
                          {'{'} {item.num || `0${idx + 1}`} {'}'}
                        </span>
                        <div className="flex items-center gap-2">
                          {IconComp && <IconComp className={`w-5 h-5 ${isActive ? 'text-[#c084fc]' : 'text-purple-400/50'}`} />}
                          <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                            isActive ? 'text-white' : 'text-gray-300'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                        <span className="hidden sm:inline-block text-xs font-mono text-purple-400/70 bg-purple-500/10 px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#7c3aed] text-white' : 'bg-purple-500/10 text-purple-300'
                      }`}>
                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isActive && (
                      <div className="mt-5 pt-5 border-t border-purple-500/15 animate-in fade-in">
                        <p className="text-sm text-purple-200/80 leading-relaxed mb-5">
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(item.tags) ? item.tags.map((t, i) => (
                              <span
                                key={i}
                                className="text-xs bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-purple-200 font-mono"
                              >
                                {t}
                              </span>
                            )) : (
                              <span className="text-xs bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-purple-200 font-mono">
                                {item.tag || 'Discipline'}
                              </span>
                            )}
                          </div>

                          <a
                            href="#contact"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c084fc] hover:text-white uppercase tracking-wider transition-colors"
                          >
                            <span>Explore More</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Dynamic Image Preview (Right) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <TiltedCard maxTilt={8} scale={1.02} glare={true} className="rounded-3xl">
              <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-[#140a26] p-3 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                  <img
                    key={activeService}
                    src={currentService.image || '/assets/p3-img-2.webp'}
                    alt={currentService.title || 'Service Preview'}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612]/90 via-transparent to-transparent" />
                  
                  {/* Floating Info on preview */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#c084fc] block mb-1">
                        {currentService.badge || 'Discipline'}
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        {currentService.title || 'Studio Discipline'}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>

        </div>

      </div>
    </section>
  );
}