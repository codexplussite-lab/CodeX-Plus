import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from './Icons';
import { useCms } from '../context/CmsContext';

export default function Team({ onNavigate }) {
  const { content } = useCms();
  const teamCms = content?.team || {};

  const defaultArchitects = [
    {
      name: 'Alexander Reid',
      role: 'Founder & Managing Partner',
      image: '/assets/t3-img-1.webp',
      specialty: 'High-Throughput Systems & Cloud',
      location: 'San Francisco',
    },
    {
      name: 'Helena Rostova',
      role: 'Creative Director & Founder',
      image: '/assets/t3-img-2.webp',
      specialty: 'Dark Luxury Tokens & Brand Systems',
      location: 'Zürich',
    },
    {
      name: 'Marcus Thorne',
      role: 'Principal AI Systems Engineer',
      image: '/assets/t3-img-3.webp',
      specialty: 'LLM Orchestration & Autonomous Agents',
      location: 'San Francisco',
    },
    {
      name: 'Maya Patel',
      role: 'Head of Product Strategy',
      image: '/assets/t3-img-4.webp',
      specialty: 'Enterprise Architecture & User Psychology',
      location: 'London',
    },
    {
      name: 'Kai Takahashi',
      role: 'Senior WebGL & 3D Engineer',
      image: '/assets/t3-img-5.webp',
      specialty: 'GPU Shaders, Three.js & Spatial UX',
      location: 'Tokyo / Remote',
    },
    {
      name: 'Liam Chen',
      role: 'Lead Cloud Architect',
      image: '/assets/t3-img-6.webp',
      specialty: 'Distributed Edge & Zero-Trust Security',
      location: 'San Francisco',
    },
    {
      name: 'Amara Okafor',
      role: 'Principal Product Designer',
      image: '/assets/t3-img-7.webp',
      specialty: 'Component Libraries & Editorial Design',
      location: 'Zürich',
    },
    {
      name: 'Julian Croft',
      role: 'Lead Spatial Computing Architect',
      image: '/assets/author-4.webp',
      specialty: 'Hardware Interfaces & WebGL Labs',
      location: 'San Francisco',
    },
  ];

  const architects = teamCms.members && teamCms.members.length > 0 ? teamCms.members : defaultArchitects;

  return (
    <section id="team" className="relative py-20 sm:py-28 bg-[#0d0718] border-t border-purple-500/15 overflow-hidden">
      
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-purple-500/15 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
              {teamCms.sectionBadge || 'Studio Architects & Leads'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {teamCms.title || 'Our Core Team'}
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-sm text-purple-200/70 max-w-md font-mono sm:text-right">
              {teamCms.subtitle || '{ Specialized engineering architects, AI researchers, and luxury product designers building deterministic software systems. }'}
            </p>
            <button
              onClick={() => onNavigate?.('/team')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c084fc] hover:text-white transition-colors cursor-pointer group"
            >
              <span>Explore Dedicated Leadership Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {architects.map((member, idx) => (
            <div
              key={idx}
              className="group bg-[#120822] hover:bg-[#180d2e] border border-purple-500/15 hover:border-purple-400/50 rounded-3xl p-4 transition-all duration-500 ease-out shadow-lg hover:shadow-[0_16px_36px_rgba(139,92,246,0.25)] hover:-translate-y-2 cursor-pointer"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/40 mb-4 border border-purple-500/15">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Location & Social Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] font-mono text-purple-200 bg-purple-900/60 px-2 py-1 rounded-md border border-purple-500/30">
                    {member.location}
                  </span>
                  <div className="flex items-center gap-2">
                    <a href="#" className="w-8 h-8 rounded-full bg-purple-500/20 hover:bg-[#7c3aed] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-200">
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-purple-500/20 hover:bg-[#7c3aed] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-200">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-2 pb-1">
                <h4 className="text-lg font-bold text-white group-hover:text-[#c084fc] transition-colors flex items-center justify-between">
                  <span>{member.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400/60 group-hover:text-[#c084fc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </h4>
                <p className="text-xs text-purple-300/70 font-mono mt-0.5">
                  {member.role}
                </p>
                <div className="mt-3 pt-3 border-t border-purple-500/10 text-[11px] text-purple-400/60 font-mono">
                  {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
