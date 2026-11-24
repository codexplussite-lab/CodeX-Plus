import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Testimonials() {
  const { content } = useCms();
  const testimonialsCms = content?.testimonials || {};

  const [currentIdx, setCurrentIdx] = useState(0);

  const defaultTestimonials = [
    {
      id: 'ashley',
      quote: "Super easy to use and actually works! I've already recommended it to a few friends. The deterministic AI workflows saved our faculty countless hours of manual overhead.",
      name: "Ashley Cole",
      role: "Teacher & Researcher at Stanford",
      company: "Stanford University",
      avatar: "/assets/author-1.webp",
      rating: 5,
    },
    {
      id: 'marcus',
      quote: "Their AI workflow automation cut our manual reporting time by 70% within the very first month. Flawless execution, zero bloat, and dependable architectural integrity.",
      name: "Marcus Vance",
      role: "Founder at Morheme Tech",
      company: "Morheme Tech",
      avatar: "/assets/author-2.webp",
      rating: 5,
    },
    {
      id: 'elena',
      quote: "Rare blend of dark-luxury visual craft and rock-solid engineering. Every milestone shipped ahead of schedule. Our enterprise user engagement jumped by 65%.",
      name: "Elena Rostova",
      role: "Product Lead at OWL",
      company: "OWL Neural Systems",
      avatar: "/assets/author-3.webp",
      rating: 5,
    },
    {
      id: 'david',
      quote: "From brand identity tokens to full-stack delivery, CODEXX PLUS transformed how our enterprise clients perceive us. Truly a standout digital architecture partner.",
      name: "David Chen",
      role: "Director of Ops at Lumina",
      company: "Lumina Labs",
      avatar: "/assets/author-5.webp",
      rating: 5,
    },
    {
      id: 'nadia',
      quote: "Thoughtful communication, sharp strategy, and measurable ROI across both web conversion and Generative Engine Optimization (GEO).",
      name: "Nadia Karim",
      role: "CEO at Zainab Bees",
      company: "Zainab Bees Global",
      avatar: "/assets/author-6.webp",
      rating: 5,
    },
  ];

  const testimonials = (testimonialsCms.items && testimonialsCms.items.length > 0) ? testimonialsCms.items : defaultTestimonials;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIdx];

  return (
    <section id="testimonial" className="relative py-20 sm:py-28 bg-[#0a0612] border-t border-purple-500/15 overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#7c3aed]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
            Client Stories & Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.2]">
            4.9 / 5.0 Rating · Verified testimonials from enterprise partners and founders worldwide.
          </h2>
        </div>

        {/* Featured Testimonial Card with CodexPlus Purple Gradient */}
        <div className="relative bg-gradient-to-br from-[#160c29] via-[#120822] to-[#0a0612] border border-purple-500/25 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(44,21,140,0.3)]">
          
          {/* Giant Quote Icon watermark */}
          <div className="absolute top-8 right-8 text-purple-400/[0.04] select-none pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <div className="relative z-10">
            {/* Rating Stars & Verified Badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#a855f7] fill-[#a855f7]" />
                ))}
              </div>
              <span className="text-xs font-mono text-[#34d399] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Verified Endorsement
              </span>
            </div>

            {/* Quote Text */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-light leading-relaxed mb-10">
              "{current.quote}"
            </p>

            {/* Author Info & Navigation Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-purple-500/20">
              
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#a855f7]"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{current.name}</h4>
                  <p className="text-xs text-purple-300/80 font-mono">
                    {current.role} • <span className="text-[#c084fc]">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-purple-400/60 mr-2">
                  0{currentIdx + 1} / 0{testimonials.length}
                </span>

                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] text-purple-300 hover:text-white flex items-center justify-center border border-purple-500/20 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] text-purple-300 hover:text-white flex items-center justify-center border border-purple-500/20 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Thumbnail Avatars Bar below */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`relative rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === idx
                  ? 'ring-2 ring-[#a855f7] ring-offset-2 ring-offset-[#0a0612] scale-110'
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
