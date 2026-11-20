import { Sparkles, Shield, Cpu, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/useCms';

interface AboutPageProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

const PILLAR_ICONS = [Compass, Cpu, Shield];

export function AboutPage({ onOpenModal, onNavigateContact, onNavigateHome }: AboutPageProps) {
  const { cms } = useCms();
  const about = cms.about;

  const eyebrow = about?.eyebrow || 'The CODEXX PLUS Studio';
  const heroTitle = about?.heroTitle || 'Architecting the intersection of high craft & intelligent compute.';
  const heroSubtitle =
    about?.heroSubtitle ||
    'A distributed collective of senior system architects, product designers, AI researchers, and motion specialists turning complex enterprise challenges into deterministic digital superiority.';
  const statement =
    about?.statement ||
    '— We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.';
  const paragraph1 =
    about?.paragraph1 ||
    "With unwavering dedication, we've completed over a hundred remarkable projects across digital platforms, enterprise AI ecosystems, and luxury architectural spaces—blending timeless precision with intelligent engineering.";
  const paragraph2 =
    about?.paragraph2 ||
    'Every solution is crafted around measurable performance, refined human experience, and future-proof scalability—empowering modern enterprises and forward-thinking brands to operate effortlessly.';
  const stats = about?.stats && about.stats.length > 0 ? about.stats : [
    { value: '120+', label: 'Flagship Projects Shipped', sub: 'Across 18 Global Verticals' },
    { value: '99.98%', label: 'Infrastructure Reliability', sub: 'Zero-Downtime Architecture' },
    { value: '500+', label: 'Enterprise Partners', sub: 'Trusting Our Digital Craft' },
    { value: '4.9 / 5', label: 'Average Client Rating', sub: 'Based on Verified Engagements' },
  ];
  const pillars = about?.pillars && about.pillars.length > 0 ? about.pillars : [];
  const milestones = about?.milestones && about.milestones.length > 0 ? about.milestones : [];

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-[900px] right-0 h-[480px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Breadcrumb & Top Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-gray-400">
          <button
            type="button"
            onClick={onNavigateHome}
            className="cursor-pointer text-gray-400 transition-colors hover:text-white"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-violet-300">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="mt-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            {heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_0_32px_rgba(168,85,247,0.35)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)]"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-violet-300 hover:bg-white/10"
            >
              Contact Global Hubs
            </button>
          </div>
        </div>

        {/* Deep Studio Manifesto Section */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-[#0e071a]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:p-14">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Studio Manifesto
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Precision is not a feature. It is our baseline.
              </h2>
              {statement && (
                <p className="mt-3 border-l-2 border-violet-400 pl-3 text-sm font-semibold italic text-violet-200/90">
                  {statement}
                </p>
              )}
              <p className="mt-4 text-base leading-relaxed text-gray-300">
                {paragraph1}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                {paragraph2}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#160c29] p-3 lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <img
                  src="/images/office-interior.jpg"
                  alt="CODEXX PLUS Headquarters Interior"
                  className="h-full w-full object-cover grayscale contrast-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-md">
                  <span className="text-xs font-medium text-gray-300">Zurich &amp; San Francisco Hubs</span>
                  <span className="text-xs font-semibold text-violet-300">Active Operational Core</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic 4 Stats Grid */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-gradient-luxury font-display text-3xl font-bold sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold tracking-wide text-white uppercase sm:text-sm">
                  {stat.label}
                </div>
                {stat.sub && (
                  <div className="text-[11px] text-gray-400">{stat.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Architectural Pillars */}
        {pillars.length > 0 && (
          <div className="mt-28">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                The Disciplines
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Three Pillars of Digital Dominance
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
                How CODEXX PLUS systematically transforms high-complexity concepts into elite, high-converting platforms.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {pillars.map((pillar, idx) => {
                const IconComponent = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                return (
                  <div
                    key={pillar.step || idx}
                    className="specular-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10081c]/90 p-8 shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-violet-400/50 hover:bg-[#160c29]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold tracking-widest text-violet-400">
                          PILLAR {pillar.step}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300">
                          <IconComponent className="h-5 w-5" />
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-gray-400">
                        {pillar.description}
                      </p>
                    </div>

                    {pillar.highlights && pillar.highlights.length > 0 && (
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <ul className="space-y-2.5 text-xs text-gray-300">
                          {pillar.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Milestone Timeline */}
        {milestones.length > 0 && (
          <div className="mt-28">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Evolution &amp; Trajectory
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Studio Timeline &amp; Major Milestones
              </h2>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="relative rounded-3xl border border-white/10 bg-[#120820]/70 p-6 shadow-lg backdrop-blur-md transition-all hover:border-violet-400/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-violet-300">{m.year}</span>
                    <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-200 uppercase">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Block */}
        <div className="mt-28 relative overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-r from-[#170a2c] via-[#1c0e35] to-[#120820] p-10 text-center shadow-[0_20px_80px_rgba(139,92,246,0.25)] md:p-16">
          <div className="mx-auto max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-violet-300 uppercase">
              Immediate Engagement
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to elevate your digital posture?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
              Direct access to our senior architects and designers. Zero intermediaries.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenModal}
                className="cursor-pointer rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0612] shadow-lg transition-colors hover:bg-violet-100"
              >
                Book 15-Minute Discovery
              </button>
              <button
                type="button"
                onClick={onNavigateContact}
                className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-violet-300 hover:bg-white/10"
              >
                Send Project Brief
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
