import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MarqueeText() {
  const items = [
    { text: 'Empowering Businesses with Next-Gen AI', img: '/assets/mt3-img-1.webp' },
    { text: 'Deterministic Software Systems', highlight: true },
    { text: 'Bespoke Engineering Architectures', img: '/assets/mt3-img-2.webp' },
    { text: 'Dark Luxury Design Tokens', highlight: true },
    { text: 'Autonomous AI Multi-Agent Pipelines', img: '/assets/mt3-img-1.webp' },
    { text: '99.98% Platform Reliability', highlight: true },
  ];

  return (
    <div className="relative py-8 bg-[#0d0718] border-y border-purple-500/20 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Loop twice for seamless infinite wrap */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4 whitespace-nowrap">
            <span className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight ${
              item.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#818cf8]' : 'text-white'
            }`}>
              {item.text}
            </span>

            {item.img && (
              <div className="w-12 sm:w-16 h-8 sm:h-10 rounded-full overflow-hidden border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                <img src={item.img} alt="Marquee thumbnail" className="w-full h-full object-cover" />
              </div>
            )}

            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#a855f7] fill-[#a855f7] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
