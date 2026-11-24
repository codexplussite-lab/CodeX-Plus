import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
}

const PARTNER_LOGOS = [
  { name: 'NEXUS LABS', tag: 'Enterprise AI' },
  { name: 'AURA CAPITAL', tag: 'FinTech' },
  { name: 'CHRONOS', tag: 'Spatial Audio' },
  { name: 'VAULT 7', tag: 'Autonomous Ops' },
  { name: 'SOLARIS', tag: 'Clean Energy' },
  { name: 'HORIZON', tag: 'Distributed Cloud' },
];

export function CtaBanner({ onOpenModal, onNavigateContact }: CtaBannerProps) {
  return (
    <section
      aria-label="Call to Action Banner"
      className="relative w-full overflow-hidden bg-[#07040d] pt-20 pb-16"
    >
      {/* Background ambient radial violet lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Partner Logos Ribbon */}
        <div className="border-b border-white/10 pb-16">
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">
            Trusted by Venture-Backed Founders &bull; Publicly Traded Enterprise Platforms
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 backdrop-blur-md transition-colors hover:border-violet-400/40"
              >
                <span className="font-display text-sm font-bold tracking-widest text-white/90">
                  {logo.name}
                </span>
                <span className="text-[10px] text-violet-400/70">/ {logo.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avista-style Giant "Want to Start?" Statement */}
        <div className="mt-20 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Your Next Flagship Sprint
          </span>

          <h2 className="mt-8 font-display text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-9xl">
            Want to Start?
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Let&apos;s build deterministic AI systems, bespoke luxury platforms, and GPU-driven WebGL experiences that define your vertical.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0a0612] shadow-[0_0_36px_rgba(168,85,247,0.45)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span>Schedule 15-Min Discovery</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-violet-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span>Contact Global Desk</span>
            </button>
          </div>
        </div>

        {/* Avista-style Precision Ruler / Audio Frequency Tick Marks Divider */}
        <div className="mt-20 flex w-full items-center justify-between overflow-hidden opacity-30 select-none" aria-hidden="true">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className={`w-0.5 bg-violet-300 ${
                i % 4 === 0 ? 'h-5 bg-violet-400' : 'h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
