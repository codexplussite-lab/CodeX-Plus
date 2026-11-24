import { ArrowDownRight, ArrowDown, ArrowRight, Sparkles, Mail } from 'lucide-react';
import MoltenMetal from './MoltenMetal';
import { useCms } from '../context/useCms';

interface HeroProps {
  onOpenModal?: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const { cms } = useCms();
  const hero = cms.hero;

  const eyebrow = hero.eyebrow || 'Digital Agency & AI Studio';
  const catchphrase = 'From Vision to Reality — Software Crafted to Captivate';
  const subtitle =
    hero.subtitle ||
    'Architecting high-throughput AI systems, bespoke dark luxury platforms, and GPU-driven WebGL graphics built for modern enterprise scale.';
  const ctaPrimary = hero.ctaPrimary || 'Schedule Discovery';
  const ctaSecondary = hero.ctaSecondary || 'Explore Capabilities';

  return (
    <section
      id="home"
      aria-label="Hero Showcase"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-24 pb-12"
    >
      {/* Background WebGL Shader + Dark Luxury Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a0612]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_35%,rgba(55,25,130,0.35),rgba(14,7,24,0.85)_60%,#0a0612_100%)]" />

        {/* MoltenMetal Interactive Canvas */}
        <div className="absolute inset-0 h-full w-full opacity-60">
          <MoltenMetal
            colors={['#2c158c', '#a99fff']}
            coreColor="#94b8da"
            speed={0.2}
            scale={6.3}
            detail={4.3}
            glow={1.3}
            thickness={1.21}
            haze={0.36}
            mouseInteraction
            flareOnClick
            swirl={0.7}
            turbulence={0.27}
            rotation={-71}
            offsetX={0.07}
            opacity={0.63}
            mouseStrength={0.58}
            lightMode
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(10,6,18,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/70 to-transparent" />
      </div>

      {/* Avista-style Top Meta Bar */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs">
          {/* Left: Direct Contact Link */}
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="h-3.5 w-3.5 text-violet-400" />
            <span>Contact:</span>
            <a
              href="mailto:Info@codexplus.site"
              className="font-medium text-white underline underline-offset-2 hover:text-violet-300"
            >
              Info@codexplus.site
            </a>
          </div>

          {/* Right: Availability Badge with pulsating status ring */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium">Available for New Projects</span>
          </div>
        </div>
      </div>

      {/* Main Avista Asymmetrical 2-Column Hero Body */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1600px] flex-1 items-center px-6 py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Eyebrow, Catchphrase, Giant Kinetic Title, Subtitle & Buttons */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              {eyebrow}
            </div>

            <p className="font-display text-base font-semibold tracking-wide text-violet-300 sm:text-lg">
              {catchphrase}
            </p>

            {/* Avista-style Giant Hero Headline with embedded floating avatar chips */}
            <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="font-display text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-[92px] lg:leading-[0.95]">
                CODEXX
              </h1>
              {/* Floating Inline Avatar Chips */}
              <div className="flex -space-x-3 overflow-hidden rounded-full border border-violet-400/40 bg-[#12091f]/80 p-1 shadow-[0_0_20px_rgba(139,92,246,0.35)] backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Lead Architect"
                  className="inline-block h-10 w-10 rounded-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Creative Director"
                  className="inline-block h-10 w-10 rounded-full object-cover"
                />
              </div>
              <span className="font-display text-5xl font-black tracking-tight text-gradient-violet sm:text-7xl lg:text-[92px] lg:leading-[0.95]">
                PLUS
              </span>
            </div>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-300 drop-shadow-sm sm:text-lg">
              {subtitle}
            </p>

            {/* Hero Interactive Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenModal}
                className="group relative inline-flex min-h-[44px] cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0a0612] shadow-[0_0_36px_rgba(168,85,247,0.45)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span>{ctaPrimary} / Start a Project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="#services"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span>{ctaSecondary}</span>
                <ArrowDownRight className="h-4 w-4 text-violet-300" />
              </a>

              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-4 text-sm font-medium text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span>Explore Case Studies</span>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center gap-2 text-xs font-medium tracking-wide text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span>Trusted by 500+ global enterprises &bull; 99.98% zero-downtime SLA</span>
            </div>
          </div>

          {/* Right Column: High-fashion portrait photograph with neon violet rim highlights & floating metallic element */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Ambient behind-portrait glowing aura */}
            <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-violet-600/25 blur-[120px]" />

            <div className="group relative w-full max-w-[460px] overflow-hidden rounded-[32px] border border-white/15 bg-[#12091f]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-500 hover:border-violet-400/50">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                  alt="High-fashion studio lead with dark-luxury neon lighting"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0612]/90 via-transparent to-violet-950/20" />

                {/* Floating 3D Badge on image */}
                <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between rounded-2xl border border-white/15 bg-[#0a0612]/80 p-4 backdrop-blur-md">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-violet-300 uppercase">
                      Studio Lead &bull; Amara Okafor
                    </span>
                    <p className="mt-0.5 font-display text-sm font-bold text-white">
                      Spatial Interaction &bull; AI Systems
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Bar with Precision Rulers */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-4">
        <div className="grid grid-cols-1 items-center gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
          {/* Bottom Left */}
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-transparent" />
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Smart Web Systems &bull; Built From Every Angle
            </span>
          </div>

          {/* Bottom Center: Scroll Down Indicator */}
          <div className="flex justify-center">
            <a
              href="#about"
              aria-label="Scroll down to company overview"
              className="group flex flex-col items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
            >
              <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 bg-white/[0.03] p-1.5 backdrop-blur-sm transition-colors group-hover:border-violet-400/60">
                <span className="h-2 w-1 animate-bounce rounded-full bg-violet-300" />
              </div>
              <ArrowDown className="h-3.5 w-3.5 text-violet-300/80 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Bottom Right: Discover More */}
          <div className="flex justify-center sm:justify-end">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pr-2.5 pl-5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/15"
            >
              <span>Explore Services</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0a0612] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                <ArrowDownRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
