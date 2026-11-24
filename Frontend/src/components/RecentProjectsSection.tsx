import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tagline: string;
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'lumina-cloud',
    title: 'Lumina Autonomous Ops',
    category: 'Full-Stack & Multi-Agent AI',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tagline: 'High-throughput enterprise AI agent orchestrator with zero-downtime execution.',
  },
  {
    id: 'veritas-fintech',
    title: 'Veritas Asset Platform',
    category: 'Bespoke Dark Luxury UI/UX',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Institutional digital banking dashboard with real-time liquidity analytics.',
  },
  {
    id: 'spectral-motion',
    title: 'Spectral 3D Engine',
    category: 'Interactive WebGL / OGL Shaders',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tagline: 'GPU-accelerated spatial interactive canvas for luxury architectural real estate.',
  },
  {
    id: 'aegis-defense',
    title: 'Aegis Threat Architecture',
    category: 'Enterprise Edge Infrastructure',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tagline: 'SOC2-ready deterministic API gateway and distributed cryptographic logging.',
  },
  {
    id: 'elysium-sound',
    title: 'Elysium Spatial Acoustics',
    category: 'Product Design & E-Commerce',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'High-fidelity audio eCommerce platform designed for audiophile connoisseurs.',
  },
  {
    id: 'chateau-reserve',
    title: 'Château Privé Concierge',
    category: 'Luxury Brand Identity & Mobile',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Ultra-exclusive private cellar allocation registry and tokenized asset custody.',
  },
];

interface RecentProjectsSectionProps {
  onOpenModal: () => void;
}

export function RecentProjectsSection({ onOpenModal }: RecentProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-label="Recent Flagship Projects"
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Avista-style Section Header with embedded image chips in title */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Curated Deliverables
          </span>

          <h2 className="flex flex-wrap items-center justify-center gap-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span>Recent Proj</span>
            <span className="inline-flex h-12 w-20 overflow-hidden rounded-full border border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.35)] sm:h-14 sm:w-24">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80"
                alt="Mockup preview chip"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="inline-flex h-12 w-20 overflow-hidden rounded-full border border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.35)] sm:h-14 sm:w-24">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
                alt="Mockup preview chip 2"
                className="h-full w-full object-cover"
              />
            </span>
            <span>ects</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Engineering deterministic software systems, high-throughput AI pipelines, and bespoke dark luxury interfaces for industry pioneers.
          </p>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {PROJECTS.map((item, idx) => {
            const isStaggered = idx % 2 === 1;

            return (
              <article
                key={item.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10081d]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_24px_80px_rgba(139,92,246,0.25)] ${
                  isStaggered ? 'md:mt-12' : ''
                }`}
              >
                {/* Top Category Badge & Arrow */}
                <div className="flex items-center justify-between gap-4 p-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-violet-300">
                    <span className="text-violet-400">&#123;</span>
                    <span>{item.category}</span>
                    <span className="text-violet-400">&#125;</span>
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 group-hover:border-violet-400/80 group-hover:bg-white group-hover:text-[#0a0612]">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Preview Image Canvas */}
                <div className="relative mt-2 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0a0612]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0612]/80 via-transparent to-transparent" />
                </div>

                {/* Card Footer Bar */}
                <div className="mt-6 flex items-end justify-between border-t border-white/10 p-3 pt-5">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.tagline}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-violet-400">
                    {item.year}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Center CTA Button */}
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 px-8 py-4 text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 hover:border-violet-400/80 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Explore Full Architecture Portfolio</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
