import React from 'react';

export default function Partners() {
  const partners = [
    { name: 'OWL', subtitle: 'AI Systems', src: '/assets/p3-logo-1.webp' },
    { name: 'Morheme Tech', subtitle: 'Enterprise Cloud', src: '/assets/p3-logo-2.webp' },
    { name: 'Zainab Bees', subtitle: 'Organic Collective', src: '/assets/p3-logo-3.webp' },
    { name: 'Lumina Labs', subtitle: 'Neural Ops', src: '/assets/p1-logo-4.webp' },
    { name: 'Veritas Capital', subtitle: 'FinTech Architecture', src: '/assets/p1-logo-5.webp' },
    { name: 'Apex Ventures', subtitle: 'Venture Capital', src: '/assets/p1-logo-6.webp' },
  ];

  return (
    <section className="relative py-16 bg-[#0d0718] border-t border-purple-500/15 overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none filter hue-rotate-[240deg]">
        <img src="/assets/p3-bg-img-1-1.webp" alt="bg pattern" className="w-full h-full object-cover" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
            TRUSTED BY INDUSTRY LEADERS & INNOVATORS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Powering Autonomous Systems for Global Pioneers
          </h3>
        </div>

        {/* Infinite Logo Marquee with Partner Labels from codexplus.site */}
        <div className="relative overflow-hidden py-4">
          <div className="flex w-max animate-marquee-reverse items-center">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <div 
                key={idx} 
                className="mx-8 sm:mx-12 flex items-center gap-3 bg-[#120822] border border-purple-500/20 px-5 py-3 rounded-2xl opacity-75 hover:opacity-100 transition-all hover:scale-105 duration-300"
              >
                <img 
                  src={partner.src} 
                  alt={partner.name} 
                  className="h-7 w-auto max-w-[100px] object-contain filter brightness-125"
                />
                <div className="border-l border-purple-500/20 pl-3">
                  <span className="text-xs font-bold text-white block">{partner.name}</span>
                  <span className="text-[10px] font-mono text-[#c084fc] block">{partner.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
