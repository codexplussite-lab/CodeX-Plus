import React from 'react';
import { ArrowUpRight, Mail, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import Aurora from './react-bits/Aurora';
import Particles from './react-bits/Particles';
import ShinyText from './react-bits/ShinyText';
import DecryptedText from './react-bits/DecryptedText';
import Magnet from './react-bits/Magnet';
import TiltedCard from './react-bits/TiltedCard';

export default function Hero({ onOpenBookingModal, onNavigate }) {
  const { content } = useCms();
  const hero = content?.hero || {};
  const brand = content?.brand || {};

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#0a0612]">
      
      {/* Ambient React Bits Aurora Background */}
      <Aurora colorStops={['#7c3aed', '#9333ea', '#4f46e5', '#f59e0b']} />
      
      {/* Interactive React Bits Particle Canvas */}
      <Particles particleCount={50} particleColor="rgba(168, 85, 247, 0.45)" lineColor="rgba(139, 92, 246, 0.12)" speed={0.4} />

      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-[#7c3aed]/25 via-[#4f46e5]/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#9333ea]/15 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Giant subtle watermark text */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[15vw] font-black uppercase text-purple-400/[0.03] tracking-tighter leading-none whitespace-nowrap">
        {brand.siteName || 'CODEXX+'}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-8 mb-12 border-b border-purple-500/15 gap-4 text-xs font-mono">
          {/* Email */}
          <div className="flex items-center gap-2 text-purple-200/80">
            <span className="text-purple-400/60">Contact:</span>
            <a 
              href={`mailto:${brand.primaryEmail || 'contact@codexplus.site'}`} 
              className="text-white hover:text-[#c084fc] transition-colors flex items-center gap-1.5 font-sans"
            >
              <Mail className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>{brand.primaryEmail || 'contact@codexplus.site'}</span>
            </a>
          </div>

          {/* Reliability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
            </span>
            <DecryptedText 
              text={hero.badge || brand.headerBadge || 'Trusted by 500+ enterprises worldwide · 99.98% reliability'} 
              speed={25}
              animateOn="view"
            />
          </div>

          {/* Socials / Links */}
          <div className="flex items-center gap-4 text-purple-300/70">
            <span className="text-purple-400/80">San Francisco</span>
            <span className="text-purple-500/40">•</span>
            <span className="text-purple-400/80">Zürich Hub</span>
            <span className="text-purple-500/40">•</span>
            <button 
              onClick={() => onNavigate ? onNavigate('/contact') : window.location.hash = '#contact'} 
              className="hover:text-white transition-colors underline decoration-purple-500/30 cursor-pointer"
            >
              Book Discovery
            </button>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs uppercase tracking-widest text-[#c084fc] font-semibold mb-6 shadow-[0_0_15px_rgba(168,85,247,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
            <ShinyText text="Next-Gen Enterprise Intelligence & Craft" speed={3.5} />
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Empower Your Business with <br className="hidden sm:inline" />
            <span className="text-gradient-violet">
              {hero.titleLine1 || 'Next-Generation'}
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-300 underline decoration-purple-500/40 underline-offset-8">
              {hero.titleHighlight || 'AI Innovation'}
            </span>{' '}
            <span>{hero.titleLine2 || '& Digital Solutions'}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#c4b4ffcc] max-w-3xl mx-auto leading-relaxed">
            {hero.description || 'Harness powerful artificial intelligence to streamline workflows, unlock actionable insights, and drive sustainable growth with a secure, enterprise-ready platform built for the future.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnet magnetStrength={0.25}>
              <button
                onClick={onOpenBookingModal || (() => { if (onNavigate) onNavigate('/contact'); })}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0612]"
              >
                <span>{hero.ctaPrimary || 'Schedule 15-Min Discovery'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnet>

            <Magnet magnetStrength={0.25}>
              <button
                onClick={() => onNavigate ? onNavigate('/services') : window.location.hash = '#services'}
                className="inline-flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-white text-sm font-semibold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 hover:border-purple-500/40 active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0612]"
              >
                <span>{hero.ctaSecondary || 'Explore Capabilities'}</span>
              </button>
            </Magnet>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-purple-400/80">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>{hero.footerPill || 'Driven By Smart Innovation & Deep Craft'}</span>
          </div>
        </div>

        {/* Hero Visual Collage & Floating Elements */}
        <div className="relative max-w-[1440px] mx-auto">
          {/* Main Visual Box with 3D Tilt */}
          <TiltedCard maxTilt={5} scale={1.01} className="w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/25 bg-gradient-to-b from-[#160c29] to-[#0d0718] p-4 sm:p-8 shadow-[0_0_50px_rgba(44,21,140,0.35)]">
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src="/assets/p3-bg-img-1.webp"
                  alt="CODEXX PLUS Architecture & AI Showcase"
                  className="w-full h-full object-cover opacity-70"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />
                
                {/* Center Floating Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/assets/h3-illus-1.webp"
                    alt="AI Systems Graphic"
                    className="w-24 sm:w-36 h-auto drop-shadow-[0_0_35px_rgba(168,85,247,0.7)] animate-pulse"
                  />
                </div>
              </div>

              {/* Floating Card 1 - Left */}
              <div className="absolute -bottom-6 left-6 sm:left-12 hidden sm:flex items-center gap-3 bg-[#140a26]/95 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 shadow-xl animate-float">
                <img
                  src="/assets/h3-img-1-xs.webp"
                  alt="AI element badge"
                  className="w-12 h-12 rounded-xl object-cover border border-purple-500/20"
                />
                <div className="pr-3">
                  <span className="text-[11px] font-mono text-[#c084fc] uppercase block">Autonomous Agents</span>
                  <span className="text-xs font-bold text-white">Deterministic LLM Systems</span>
                </div>
              </div>

              {/* Floating Card 2 - Right */}
              <div className="absolute -top-6 right-6 sm:right-12 hidden sm:flex items-center gap-3 bg-[#140a26]/95 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 shadow-xl animate-float [animation-delay:2s]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                  <img
                    src="/assets/fevicon-1.webp"
                    alt="CODEXX PLUS Icon"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="pr-3">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase block">Sub-Millisecond Engine</span>
                  <span className="text-xs font-bold text-white">Dark Luxury Architecture</span>
                </div>
              </div>

              {/* Floating Mini Badge Card */}
              <div className="absolute -bottom-4 right-8 hidden md:block">
                <img 
                  src="/assets/h3-img-2-xs.webp" 
                  alt="Creative asset preview" 
                  className="w-20 h-auto rounded-xl border border-purple-500/25 shadow-lg object-cover"
                />
              </div>
            </div>
          </TiltedCard>
        </div>

      </div>
    </section>
  );
}
