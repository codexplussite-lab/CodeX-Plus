import { useState } from 'react';
import { ArrowUpRight, Plus, X, Sparkles, Check } from 'lucide-react';

interface ServicesProps {
  onOpenModal: () => void;
}

interface ServiceAccordionItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  pills: string[];
  mockupImage: string;
  previewTitle: string;
  previewSubtitle: string;
}

const ACCORDION_SERVICES: ServiceAccordionItem[] = [
  {
    id: 'ai-innovation',
    number: '{01}',
    title: 'AI Innovation & Autonomous Systems',
    tag: 'Multi-Agent & LLMs',
    description:
      'We engineer deterministic multi-agent pipelines, private enterprise LLM orchestrations, and automated reasoning workflows. From intelligent customer intelligence to internal operations copilots, every system is designed for verifiable zero-loss execution.',
    pills: ['Multi-Agent Workflows', 'Private LLM Fine-Tuning', 'Deterministic Output Schema', 'SOC2 Cryptographic Guardrails'],
    mockupImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'CodexAgent Orchestrator',
    previewSubtitle: 'Enterprise Multi-Agent Pipeline &bull; Active',
  },
  {
    id: 'enterprise-web',
    number: '{02}',
    title: 'Enterprise Web Platforms',
    tag: 'Development',
    description:
      'Zero-bloat modular platforms built on React 19, Next.js, and high-throughput TypeScript REST/GraphQL gateways. Engineered for sub-second First Contentful Paint, global edge caching, and scalable multi-region uptime.',
    pills: ['Development & React 19', 'Tailwind CSS v4 Engine', 'High-Throughput API Gateway', 'PostgreSQL & Edge KV'],
    mockupImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Core Web Platform',
    previewSubtitle: 'Edge Cache Hit Rate 99.4% &bull; Sub-100ms TTFB',
  },
  {
    id: 'dark-luxury-ui',
    number: '{03}',
    title: 'Bespoke Dark Luxury UI/UX',
    tag: 'Design Systems & Tokens',
    description:
      'Cinematic digital experiences with obsidian backgrounds, subtle specular reflections, and rhythmic 8pt typography. Every screen adheres to WCAG 2.2 AAA visible focus appearance and responsive touch compliance.',
    pills: ['Obsidian & Void Palettes', 'W3C DTCG Token Standards', '44px Touch Target Strict', 'Fluid Micro-Interactions'],
    mockupImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'Specular Design Token Kit',
    previewSubtitle: 'WCAG 2.2 AAA &bull; Fluid Spatial Typography',
  },
  {
    id: '3d-motion-webgl',
    number: '{04}',
    title: '3D Motion & WebGL Graphics',
    tag: 'GLSL & OGL Shaders',
    description:
      'GPU-accelerated interactive canvas scenes, custom fragment shaders, and GSAP timeline choreography. Designed to captivate visitors without thermal throttling or layout thrashing.',
    pills: ['GPU-Accelerated Shaders', 'OGL Interactive Geometry', 'GSAP Kinetic Choreography', 'Reduced-Motion Safe Fallbacks'],
    mockupImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    previewTitle: 'MoltenMetal Shader Runtime',
    previewSubtitle: '60fps Mobile Optimized &bull; Hardware Accelerated',
  },
];

export function Services({ onOpenModal }: ServicesProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>(ACCORDION_SERVICES[0].id);

  return (
    <section
      id="services"
      aria-label="Studio Capabilities & Services"
      className="relative w-full overflow-hidden bg-[#07040d] py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Avista-style Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Our Services &amp; Capabilities
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              What We Offer
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">
              End-to-end digital solutions designed to elevate enterprise prestige, automate complex workflows, and drive measurable revenue.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 self-start rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-violet-400/70 hover:bg-violet-500/20 md:self-auto focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Explore More</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Avista Interactive Multi-Item Accordion */}
        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {ACCORDION_SERVICES.map((item) => {
            const isExpanded = activeAccordion === item.id;

            return (
              <div
                key={item.id}
                className={`transition-colors duration-300 ${
                  isExpanded ? 'bg-[#10081d]/90' : 'bg-transparent hover:bg-white/[0.02]'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => setActiveAccordion(isExpanded ? '' : item.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full cursor-pointer items-center justify-between py-8 text-left transition-all focus-visible:outline-2 focus-visible:outline-violet-400 sm:py-10"
                >
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <span className="font-mono text-sm font-bold text-violet-400 sm:text-base">
                      {item.number}
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {item.title}
                    </h3>
                    <span className="hidden rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 font-mono text-xs text-violet-300 sm:inline-block">
                      {item.tag}
                    </span>
                  </div>

                  <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-transform duration-300">
                    {isExpanded ? (
                      <X className="h-5 w-5 text-violet-300" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                </button>

                {/* Expanded Accordion Body (Split copy & visual mockup) */}
                {isExpanded && (
                  <div className="grid grid-cols-1 gap-8 pb-10 animate-in fade-in duration-300 lg:grid-cols-12 lg:gap-12">
                    {/* Left Copy & Pill Badges */}
                    <div className="space-y-6 lg:col-span-7">
                      <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
                        {item.description}
                      </p>

                      <div>
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Standard Deliverables &amp; Architectural Stack:
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.pills.map((pill) => (
                            <span
                              key={pill}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/30 bg-violet-500/10 px-3.5 py-2 text-xs font-medium text-violet-200"
                            >
                              <Check className="h-3.5 w-3.5 text-violet-400" />
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Visual Preview Mockup Card */}
                    <div className="lg:col-span-5">
                      <div className="group relative overflow-hidden rounded-2xl border border-violet-400/30 bg-[#160c29] p-3 shadow-[0_16px_50px_rgba(139,92,246,0.25)]">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0a0612]">
                          <img
                            src={item.mockupImage}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0612]/90 via-transparent to-transparent" />
                          <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/10 bg-[#0a0612]/80 p-3 backdrop-blur-md">
                            <p className="font-display text-sm font-bold text-white">
                              {item.previewTitle}
                            </p>
                            <p className="text-[11px] text-violet-300" dangerouslySetInnerHTML={{ __html: item.previewSubtitle }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
