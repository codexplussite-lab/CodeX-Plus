import React from 'react';
import { ArrowUpRight, Award, Sparkles, CheckCircle2, Cpu, Layers, Palette } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import SpotlightCard from './react-bits/SpotlightCard';
import TiltedCard from './react-bits/TiltedCard';
import CountUp from './react-bits/CountUp';

export default function About({ onNavigate }) {
  const { content } = useCms();
  const about = content?.about || {};

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#0d0718] border-t border-purple-500/15 overflow-hidden">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7c3aed]/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header Tag & Link to Standalone Page */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30">
              {about.sectionBadge || 'Studio Philosophy & Pillars'}
            </span>
            <div className="h-px w-12 bg-purple-500/20 hidden sm:block" />
          </div>

          <button
            onClick={() => onNavigate?.('/about')}
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Explore Dedicated About Page</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Top Split: Quote & Author */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-16 border-b border-purple-500/15">
          
          <div className="lg:col-span-8">
            <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light leading-relaxed tracking-tight">
              {about.quote || '“At CODEXX PLUS, we treat code as digital architecture. Beyond simple chatbots, we engineer deterministic multi-agent workflows, bespoke obsidian design systems, and real-time inference pipelines that eliminate operational friction at scale.”'}
            </blockquote>
          </div>

          <div className="lg:col-span-4">
            <TiltedCard maxTilt={8} scale={1.02} glare={true} className="rounded-2xl">
              <div className="flex items-center gap-4 bg-[#140a26] border border-purple-500/20 p-5 rounded-2xl shadow-lg">
                <div className="relative shrink-0">
                  <img
                    src={about.founderImage || '/assets/a3-author-1.webp'}
                    alt={about.founderName || 'Alexander Reid'}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#a855f7]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#140a26]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{about.founderName || 'Alexander Reid'}</h4>
                  <p className="text-xs text-purple-300/80 font-mono">{about.founderRole || 'Founder & Managing Partner'}</p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-[#c084fc]">
                    <Award className="w-3.5 h-3.5" />
                    <span>{about.founderExp || '15+ Years Enterprise Experience'}</span>
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>

        </div>

        {/* Middle Split: 3 Engineering & Design Pillars from codexplus.site */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.25)"
            borderColor="rgba(168, 85, 247, 0.2)"
            className="p-8 group shadow-lg hover:shadow-[0_16px_40px_rgba(139,92,246,0.22)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out bg-[#120822] hover:bg-[#180d2e]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/25">
                  Step 01
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c084fc] transition-colors">
                Architectural Precision
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                We treat code as digital architecture. Every component, WebGL shader, and cloud transaction is benchmarked for sub-millisecond execution, flawless accessibility, and fluid responsiveness.
              </p>
            </div>
            <ul className="space-y-2 border-t border-purple-500/15 pt-5 text-xs text-purple-300/80 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Micro-interaction choreography</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>WebGL & GPU-accelerated rendering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Zero-layout-shift architecture</span>
              </li>
            </ul>
          </SpotlightCard>

          {/* Pillar 2 */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.25)"
            borderColor="rgba(168, 85, 247, 0.2)"
            className="p-8 group shadow-lg hover:shadow-[0_16px_40px_rgba(139,92,246,0.22)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out bg-[#120822] hover:bg-[#180d2e]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/25">
                  Step 02
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c084fc] transition-colors">
                Autonomous Intelligence
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                Beyond simple chatbots, we engineer deterministic multi-agent workflows, fine-tuned retrieval engines, and real-time inference pipelines that eliminate operational friction at scale.
              </p>
            </div>
            <ul className="space-y-2 border-t border-purple-500/15 pt-5 text-xs text-purple-300/80 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Enterprise LLM orchestration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Autonomous data automation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Deterministic security boundaries</span>
              </li>
            </ul>
          </SpotlightCard>

          {/* Pillar 3 */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.25)"
            borderColor="rgba(168, 85, 247, 0.2)"
            className="p-8 group shadow-lg hover:shadow-[0_16px_40px_rgba(139,92,246,0.22)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out bg-[#120822] hover:bg-[#180d2e]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/25">
                  Step 03
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c084fc] transition-colors">
                Dark Luxury Aesthetic
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                Enterprise software does not have to feel sterile. We fuse deep obsidian palettes, subtle specular rims, and commanding typography to instill immediate prestige and investor confidence.
              </p>
            </div>
            <ul className="space-y-2 border-t border-purple-500/15 pt-5 text-xs text-purple-300/80 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Bespoke design systems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Luxury dark visual identity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>High-conversion typography</span>
              </li>
            </ul>
          </SpotlightCard>

        </div>

        {/* Studio Values Row */}
        <div className="mt-16 pt-12 border-t border-purple-500/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" className="p-5 rounded-2xl bg-[#10081e] border-purple-500/10">
            <h4 className="font-bold text-white mb-1">Deep Asynchronous Focus</h4>
            <p className="text-purple-300/70 leading-relaxed">We eliminate excessive meetings. Our architects work in deep, uninterrupted blocks to produce pristine digital craft.</p>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" className="p-5 rounded-2xl bg-[#10081e] border-purple-500/10">
            <h4 className="font-bold text-white mb-1">Direct Principal Access</h4>
            <p className="text-purple-300/70 leading-relaxed">Clients communicate directly with senior engineers and design leads who actually author their systems.</p>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" className="p-5 rounded-2xl bg-[#10081e] border-purple-500/10">
            <h4 className="font-bold text-white mb-1">Zero-Bloat Rigor</h4>
            <p className="text-purple-300/70 leading-relaxed">We reject heavy dependencies and fragile boilerplate. Every component is constructed with typed discipline.</p>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" className="p-5 rounded-2xl bg-[#10081e] border-purple-500/10">
            <h4 className="font-bold text-white mb-1">High-Touch Partnership</h4>
            <p className="text-purple-300/70 leading-relaxed">We only take on 3 to 4 flagship enterprise engagements simultaneously to ensure undivided attention.</p>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}
