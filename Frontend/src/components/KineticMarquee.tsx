interface KineticMarqueeProps {
  className?: string;
}

export function KineticMarquee({ className = '' }: KineticMarqueeProps) {
  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  ];

  return (
    <section
      aria-label="Kinetic Studio Marquee"
      className={`relative w-full overflow-hidden py-16 lg:py-24 ${className}`}
    >
      {/* Top subtle border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="space-y-6">
        {/* Ribbon 1: Left to Right Scroll */}
        <div className="flex w-max animate-marquee space-x-6 whitespace-nowrap will-change-transform">
          {[1, 2, 3].map((cycle) => (
            <div key={cycle} className="flex items-center gap-6">
              <span className="font-display text-4xl font-black uppercase tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
                Best Performing Digital
              </span>
              <div className="inline-block h-12 w-24 overflow-hidden rounded-full border border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] sm:h-16 sm:w-32">
                <img
                  src={images[0]}
                  alt="Studio visual portrait"
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
                AI Engineering Agency
              </span>
              <div className="inline-block h-12 w-24 overflow-hidden rounded-full border border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] sm:h-16 sm:w-32">
                <img
                  src={images[1]}
                  alt="Studio architect"
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="font-display text-4xl font-black uppercase tracking-tight text-violet-300 sm:text-6xl lg:text-7xl">
                &bull; CODEXX PLUS &bull;
              </span>
            </div>
          ))}
        </div>

        {/* Ribbon 2: Right to Left (Opposing Direction) */}
        <div
          className="flex w-max space-x-6 whitespace-nowrap will-change-transform"
          style={{
            animation: 'marquee 36s linear infinite reverse',
          }}
        >
          {[1, 2, 3].map((cycle) => (
            <div key={cycle} className="flex items-center gap-6">
              <span className="font-display text-4xl font-black uppercase tracking-tight text-gray-400 sm:text-6xl lg:text-7xl">
                Innovating With Precision
              </span>
              <div className="inline-block h-12 w-24 overflow-hidden rounded-full border border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] sm:h-16 sm:w-32">
                <img
                  src={images[2]}
                  alt="Visual design chip"
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="font-display text-4xl font-black uppercase tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
                High Throughput Systems
              </span>
              <div className="inline-block h-12 w-24 overflow-hidden rounded-full border border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] sm:h-16 sm:w-32">
                <img
                  src={images[3]}
                  alt="Engineering lead"
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="font-display text-4xl font-black uppercase tracking-tight text-violet-400 sm:text-6xl lg:text-7xl">
                &mdash; Dark Luxury Craft
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom subtle border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
