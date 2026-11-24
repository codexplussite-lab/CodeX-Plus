import { ArrowUpRight, Layers, Sparkles, Target } from 'lucide-react';
import { useCms } from '../context/useCms';

interface AboutProps {
  onOpenModal?: () => void;
}

export function About({ onOpenModal }: AboutProps) {
  const { cms } = useCms();
  const about = cms.about;

  const quoteText =
    about?.paragraph1 ||
    'CODEXX PLUS was built on a simple belief that great design, digital innovation, and autonomous AI systems can transform the way businesses connect with people. From day one, our mission has been to blend strategy with engineering, helping brands not just look better, but perform better.';

  const kineticHeadline =
    about?.statement ||
    'We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.';

  return (
    <section id="about" aria-label="About the Studio" className="relative w-full overflow-hidden py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Avista Component 1: Founder Quote Block */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-start">
          <div className="max-w-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3 w-3 text-violet-400" />
              Who we are?
            </span>
          </div>

          <div className="max-w-4xl">
            <blockquote className="font-display text-xl leading-relaxed font-medium text-gray-200 sm:text-2xl lg:text-[28px] lg:leading-[1.4]">
              &ldquo;{quoteText}&rdquo;
            </blockquote>

            {/* Author Meta */}
            <div className="mt-8 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Aiden Mercer, Founder & Principal Architect"
                className="h-12 w-12 rounded-full border border-violet-400/40 object-cover shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              />
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Aiden Mercer
                </p>
                <p className="text-xs text-gray-400">
                  Founder &bull; Principal Architect at CODEXX PLUS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Avista Component 2: Kinetic Statement Headline with Inline Action Pill */}
        <div className="relative py-20 lg:py-28">
          <div className="max-w-5xl">
            <p className="font-display text-3xl font-extrabold leading-[1.25] tracking-tight text-white transition-colors sm:text-5xl lg:text-[56px] lg:leading-[1.18]">
              {kineticHeadline}
            </p>
          </div>

          {/* Floating Rotating "LET'S GET STARTED ↗" Badge */}
          <div className="mt-10 sm:mt-12">
            <button
              type="button"
              onClick={onOpenModal}
              className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-violet-400/50 bg-[#120820] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all duration-300 hover:border-violet-400 hover:bg-white hover:text-[#0a0612] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span>Let&apos;s Get Started</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Avista Component 3: 2-Card Feature Grid (Our Story & Target Goal) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Card 1: Our Story */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#120820]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-violet-400/40 sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
              <Layers className="h-7 w-7" />
            </div>

            <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              CODEXX PLUS &bull; Our Story
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
              Founded at the convergence of algorithmic computing and luxury design, our studio emerged to reject cookie-cutter templates. We craft digital architectures where code execution speed matches visual prestige.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black text-white sm:text-3xl">120+</span>
                <span className="text-xs text-gray-400">Shipped Engagements</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black text-white sm:text-3xl">99.98%</span>
                <span className="text-xs text-gray-400">SLA Reliability</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black text-white sm:text-3xl">18</span>
                <span className="text-xs text-gray-400">Global Verticals</span>
              </div>
            </div>
          </div>

          {/* Card 2: Target Goal */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#120820]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-violet-400/40 sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
              <Target className="h-7 w-7" />
            </div>

            <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              CODEXX PLUS &bull; Target Goal
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
              Deliver deterministic enterprise platforms that remove latency and technical debt, empowering executive teams to automate operations, dominate generative search discovery, and captivate top-tier clients.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {['Autonomous Workflows', 'Zero-Bloat Next.js 15', 'Custom WebGL GLSL'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-gray-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
