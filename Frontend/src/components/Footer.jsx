import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, ArrowUpRight, Check, Heart, Globe, MapPin } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { useCms } from '../context/CmsContext';

export default function Footer({ onOpenAdmin, onNavigate, onOpenBookingModal }) {
  const { content } = useCms();
  const brand = content?.brand || {};

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch {}
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#07040d] text-white pt-20 sm:pt-28 pb-12 border-t border-purple-500/20 overflow-hidden">
      
      {/* Background Graphic Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen filter hue-rotate-[240deg]">
        <img src="/assets/f3-bg-img.webp" alt="footer texture" className="w-full h-full object-cover" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Top Big Callout Banner: Schedule Discovery with Rotating Stamp */}
        <div className="flex flex-col lg:flex-row items-center justify-between pb-16 sm:pb-20 border-b border-purple-500/20 gap-8">
          
          <div className="flex items-center gap-6 text-center lg:text-left">
            {/* Spinning Circle Stamp Badge in Violet */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
              <img
                src="/assets/f3-circle-text.webp"
                alt="CODEXX PLUS Circle Badge"
                className="w-full h-full object-contain animate-spin-slow filter hue-rotate-[240deg] drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              />
              <img
                src="/assets/f3-favicon.webp"
                alt="Center Icon"
                className="absolute w-8 h-8 object-contain"
              />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] block mb-1">
                DISCOVERY & ARCHITECTURE
              </span>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                  Say Hello!
                </h2>
                <img
                  src="/assets/hy-icon.gif"
                  alt="Waving Hand"
                  className="w-10 sm:w-14 h-auto drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Direct Contact Pill with CodexPlus Gradient */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Schedule 15-Min Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4 Columns Information Grid from codexplus.site */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-purple-500/20">
          
          {/* Col 1: Global Hubs (San Francisco & Zurich) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
              STUDIO & HEADQUARTERS
            </span>
            <div>
              <a
                href={`mailto:${brand.primaryEmail || 'contact@codexplus.site'}`}
                className="text-2xl sm:text-3xl font-bold text-white hover:text-[#c084fc] transition-colors block font-mono"
              >
                {brand.primaryEmail || 'contact@codexplus.site'}
              </a>
              <span className="text-sm text-purple-300/80 block mt-1 font-mono">
                {brand.phone || '+1 (415) 890-CODEX'}
              </span>
            </div>
            
            <div className="space-y-2 pt-2 text-xs text-purple-300/70 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#a855f7] mt-0.5 shrink-0" />
                <span>San Francisco: {brand.sfAddress || '555 Mission St, Financial District, CA 94105'}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#a855f7] mt-0.5 shrink-0" />
                <span>Zürich Hub: {brand.zurichAddress || 'Gotthardstrasse 26, 8002 Zürich, Switzerland'}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-sm text-purple-200/80">
              <li>
                <a href="/" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/'); } }} className="hover:text-[#c084fc] transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/about'); } }} className="hover:text-[#c084fc] transition-colors">About Us</a>
              </li>
              <li>
                <a href="/services" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/services'); } }} className="hover:text-[#c084fc] transition-colors">Services</a>
              </li>
              <li>
                <a href="/team" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/team'); } }} className="hover:text-[#c084fc] transition-colors">Team</a>
              </li>
              <li>
                <a href="/pricing" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/pricing'); } }} className="hover:text-[#c084fc] transition-colors">Pricing</a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/contact'); } }} className="hover:text-[#c084fc] transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="/projects" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/projects'); } }} className="hover:text-[#c084fc] transition-colors">Selected Projects</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Disciplines (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
              DISCIPLINES
            </span>
            <ul className="space-y-2 text-xs text-purple-300/70 font-mono">
              <li>Development (Full-Stack & AI)</li>
              <li>Graphics Design (Brand Tokens)</li>
              <li>Video Editing (Motion & 3D)</li>
              <li>SEO / GEO (AI Engine Discovery)</li>
              <li>Social Media Growth</li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
              STUDIO INTELLIGENCE
            </span>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Curated whitepapers on autonomous agent architectures, WebGL shaders, and Generative Engine Optimization.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Check className="w-4 h-4" />
                <span>Subscription confirmed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full bg-[#140a26] border border-purple-500/20 rounded-xl px-4 py-3 pr-12 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white p-2 rounded-lg transition-colors cursor-pointer shadow-md"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies matching codexplus.site */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-400/60 border-t border-purple-500/15 mt-10">
          <div>
            {brand.copyright || 'All rights reserved © 2026 CODEXX PLUS. Next-Generation AI Innovation.'}
          </div>

          <div className="flex items-center gap-6 text-xs text-purple-300/80 font-mono">
            <button
              type="button"
              onClick={() => onNavigate?.('/payment-policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Payment Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('/privacy-policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              T&C and Privacy Policies
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: TwitterIcon, href: 'https://x.com' },
              { icon: LinkedinIcon, href: 'https://linkedin.com' },
              { icon: InstagramIcon, href: 'https://instagram.com' },
              { icon: Globe, href: '#' },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] hover:text-white flex items-center justify-center text-purple-300 border border-purple-500/20 transition-colors"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
