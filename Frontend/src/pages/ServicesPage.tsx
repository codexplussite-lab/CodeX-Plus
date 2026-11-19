import { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Film,
  TrendingUp,
  Search,
  CheckCircle2,
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCms } from '../context/useCms';
import { SERVICES as DEFAULT_SERVICES, CLIENT_LOGOS as DEFAULT_LOGOS } from '../data/siteData';

interface ServicesPageProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

const ICONS = [Code2, Palette, Film, TrendingUp, Search, Cpu, Layers, ShieldCheck];
  {
    id: 'development',
    step: '01',
    title: 'Full-Stack & Autonomous AI',
    tag: 'Engineering Core',
    icon: Code2,
    lead: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
    description:
      'We construct mission-critical software systems that handle massive traffic without degradation. From deterministic LLM workflows to event-driven microservices and reactive interfaces, every line of code is structured for long-term maintainability and sub-second execution.',
    techStack: ['React 19 & Next.js', 'Node.js & Python', 'LangChain & Agentic Workflows', 'PostgreSQL & Redis', 'Cloudflare Edge'],
    deliverables: [
      'Multi-agent autonomous automation pipelines',
      'High-throughput REST & GraphQL API services',
      'Enterprise database architecture & schema design',
      'Zero-downtime CI/CD deployment infrastructure',
    ],
  },
  {
    id: 'graphics-design',
    step: '02',
    title: 'Graphics & Visual Identity',
    tag: 'Visual Craft',
    icon: Palette,
    lead: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
    description:
      'Great products fail when wrapped in mundane design. We sculpt visual languages that instantly signal elite positioning: bespoke design token systems, crisp specular lighting, custom iconography, and high-conversion typography designed to captivate discerning enterprise buyers.',
    techStack: ['Figma Enterprise', 'Token Studio', 'Vector Systems', 'Custom Typography', 'Design System Guidelines'],
    deliverables: [
      'Complete luxury dark design system & component library',
      'Comprehensive brand identity, voice, and guidelines',
      'Custom vector iconography and illustration assets',
      'Pitch decks, collateral & marketing asset kits',
    ],
  },
  {
    id: 'video-editing',
    step: '03',
    title: '3D Motion & WebGL Experiences',
    tag: 'Motion & Post',
    icon: Film,
    lead: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
    description:
      'We bridge modern Hollywood-grade visual fidelity with 60fps web performance. By marrying GPU shader code with fluid GSAP micro-choreography, we transform static corporate sites into immersive digital flagship destinations.',
    techStack: ['Three.js & OGL', 'GLSL Custom Shaders', 'GSAP Animation Suite', 'DaVinci Resolve Studio', 'After Effects'],
    deliverables: [
      'Interactive 3D WebGL hero scenes & product showcases',
      'Keynote product announcement & brand launch videos',
      'Physics-based gesture animations & page transitions',
      'Sound design & cinematic audio mastering',
    ],
  },
  {
    id: 'social-media-marketing',
    step: '04',
    title: 'Social Media & Growth Engine',
    tag: 'Growth Strategy',
    icon: TrendingUp,
    lead: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
    description:
      'Visibility without conversion is vanity. We craft targeted content architectures, founder-led social strategies, and algorithmic distribution playbooks that turn industry attention into qualified enterprise inbound.',
    techStack: ['Attribution Engines', 'Multi-Platform Distribution', 'Competitive Analytics', 'Founder Narrative Mapping'],
    deliverables: [
      'C-suite executive thought leadership ghostwriting',
      'Data-driven omnichannel content publishing schedules',
      'High-converting product demo shorts & carousels',
      'Inbound attribution analytics & lead tracking',
    ],
  },
  {
    id: 'seo-geo',
    step: '05',
    title: 'Next-Gen SEO & AI Engine Discovery',
    tag: 'Search & GEO',
    icon: Search,
    lead: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery worldwide.',
    description:
      'The search landscape has permanently shifted. In addition to Google SERP dominance, we optimize your digital presence for Generative Engine Optimization (GEO)—ensuring LLMs like Perplexity, ChatGPT, and Claude recommend your platform as the primary source of truth in your category.',
    techStack: ['JSON-LD Semantic Schemas', 'Perplexity & Claude Indexing', 'Core Web Vitals 100/100', 'Vectorized Knowledge Graphs'],
    deliverables: [
      'Full semantic schema markup & entity graph definition',
      'Generative Engine Optimization (GEO) audit & execution',
      'High-authority technical content clusters',
      'Core Web Vitals sub-second performance tuning',
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & System Blueprinting',
    time: 'Week 1',
    description:
      'We conduct exhaustive technical interviews, evaluate target audience psychology, audit legacy infrastructure, and draft a deterministic system architectural specification.',
  },
  {
    number: '02',
    title: 'Interactive Prototyping & Shaders',
    time: 'Weeks 2–3',
    description:
      'We materialize high-fidelity interactive wireframes, custom design tokens, and live WebGL shader sandbox previews for rapid stakeholder consensus.',
  },
  {
    number: '03',
    title: 'Production Engineering & AI Pipelines',
    time: 'Weeks 4–6',
    description:
      'Our senior architects write typed, tested, zero-bloat code. We configure autonomous agents, database schemas, edge workers, and automated test coverage.',
  },
  {
    number: '04',
    title: 'Global Deployment & Observability SLA',
    time: 'Weeks 7–8+',
    description:
      'Zero-downtime cutover across global CDN nodes, live synthetic load testing, SEO/GEO verification, and activation of our 24/7 infrastructure observability SLA.',
  },
];

const ENGAGEMENT_TIERS = [
  {
    name: 'Flagship Sprint',
    badge: 'Rapid Launch',
    price: '$25,000+',
    timeline: '3–4 Weeks Delivery',
    description:
      'Ideal for venture-backed startups and established firms needing a rapid, breathtaking brand overhaul or standalone digital product launch.',
    features: [
      'Comprehensive Luxury Dark UI/UX Design System',
      'Full-Stack Next.js 15 Web Platform',
      'Interactive 3D Motion & GSAP Choreography',
      'Core Web Vitals 95+ Mobile & Desktop Score',
      'Complete SEO & OpenGraph Asset Kit',
      'Direct Principal Architect Access',
    ],
    popular: false,
  },
  {
    name: 'Enterprise Architecture',
    badge: 'Most Comprehensive',
    price: '$60,000+',
    timeline: '6–8 Weeks Delivery',
    description:
      'Our end-to-end flagship engagement combining complex full-stack web platforms with custom autonomous AI workflows and 3D WebGL experiences.',
    features: [
      'Everything in Flagship Sprint',
      'Autonomous Multi-Agent AI Pipelines & LLMs',
      'Custom GPU-accelerated WebGL Shaders & OGL Scenes',
      'Enterprise Database & High-Throughput API Gateway',
      'SOC2-ready Security Posture & Role-Based Access',
      'GEO (Generative Engine Optimization) Setup',
      'Dedicated Slack Bridge & Bi-Weekly Sprints',
    ],
    popular: true,
  },
  {
    name: 'Dedicated Studio Retainer',
    badge: 'Continuous Velocity',
    price: '$18,000 / mo',
    timeline: 'Ongoing Partnership',
    description:
      'An embedded sprint team acting as your external Principal Design & Engineering arm for continuous feature rollouts and architectural evolution.',
    features: [
      'Guaranteed 160+ Dedicated Senior Hours / Month',
      'Continuous Feature Design & Production Deployment',
      'Priority 4-Hour Emergency SLA Response',
      'Autonomous AI Agent Maintenance & Fine-Tuning',
      'Ongoing Conversion & SEO/GEO Optimization',
      'Weekly Strategy & Architecture Reviews',
    ],
    popular: false,
  },
];

export function ServicesPage({ onOpenModal, onNavigateContact, onNavigateHome }: ServicesPageProps) {
  const { cms } = useCms();

  const services = cms.services && cms.services.length > 0 ? cms.services : DEFAULT_SERVICES;
  const clientLogos = cms.clientLogos && cms.clientLogos.length > 0 ? cms.clientLogos : DEFAULT_LOGOS;

  const disciplines = useMemo(() => {
    return services.map((s, idx) => ({
      id: s.id,
      step: String(idx + 1).padStart(2, '0'),
      title: s.title,
      tag: s.tag,
      icon: ICONS[idx % ICONS.length],
      lead: s.lead || s.description.slice(0, 160) + '...',
      description: s.description,
      techStack: s.techStack || ['React 19 & Next.js', 'Node.js & Python', 'LangChain & Agentic Workflows', 'Cloudflare Edge'],
      deliverables: s.deliverables || [
        'Enterprise architecture & schema design',
        'Zero-downtime CI/CD deployment infrastructure',
        'Deterministic security & threat modeling',
        '24/7 high-availability SLA monitoring',
      ],
    }));
  }, [services]);

  const [activeDiscipline, setActiveDiscipline] = useState<string>(
    () => disciplines[0]?.id || 'development'
  );

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 h-[520px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-[980px] right-0 h-[480px] w-[500px] rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-gray-400">
          <button
            type="button"
            onClick={onNavigateHome}
            className="cursor-pointer text-gray-400 transition-colors hover:text-white"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-violet-300">Services &amp; Capabilities</span>
        </div>

        {/* Hero Section */}
        <div className="mt-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            Capabilities &amp; Solutions
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Engineering, Design &amp; AI Systems Built For Enterprise Scale.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            We partner with visionary enterprises to architect digital flagships. From multi-agent
            autonomous pipelines and GPU-accelerated WebGL interfaces to dark-luxury brand design systems,
            every discipline is engineered for uncompromising speed, beauty, and durability.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_0_32px_rgba(168,85,247,0.35)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)]"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#pricing"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-violet-300 hover:bg-white/10"
            >
              View Investment Tiers
            </a>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-14 flex flex-wrap items-center gap-3 border-y border-white/10 py-6">
          <div className="flex items-center gap-2 pr-6 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            <ShieldCheck className="h-4 w-4 text-violet-400" />
            Studio Commitments:
          </div>
          {[
            '99.98% High-Availability SLA',
            'Zero-Bloat Modular Architecture',
            'Sub-Second First Contentful Paint',
            'Deterministic Enterprise AI Workflows',
            'Direct Principal Architect Direct Access',
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-gray-300"
            >
              <Check className="h-3 w-3 text-violet-400" />
              {pill}
            </span>
          ))}
        </div>

        {/* Disciplines Master Showcase */}
        <div className="mt-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Core Disciplines
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                What We Architect &amp; Deploy
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Each discipline operates both as an independent specialized sprint and as part of an integrated,
              holistic digital platform delivery.
            </p>
          </div>

          {/* Quick discipline switcher buttons */}
          <div className="mt-10 flex flex-wrap gap-2">
            {disciplines.map((d) => {
              const active = activeDiscipline === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDiscipline(d.id)}
                  className={`cursor-pointer rounded-full px-5 py-2 text-xs font-medium tracking-wide transition-all ${
                    active
                      ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]'
                      : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {d.step} &middot; {d.title}
                </button>
              );
            })}
          </div>

          {/* Disciplines Grid */}
          <div className="mt-8 space-y-6">
            {disciplines.map((item) => {
              const Icon = item.icon;
              const isSelected = activeDiscipline === item.id;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  onClick={() => setActiveDiscipline(item.id)}
                  className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
                    isSelected
                      ? 'border-violet-400/60 bg-gradient-to-br from-[#170c2c] via-[#10071e] to-[#0a0514] shadow-[0_20px_60px_rgba(139,92,246,0.22)]'
                      : 'border-white/10 bg-[#10081c]/70 hover:border-violet-400/30 hover:bg-[#130a22]'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Title, Lead & Description */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold tracking-wider text-violet-400">
                          {item.step}
                        </span>
                        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-0.5 text-xs font-medium text-violet-300">
                          {item.tag}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-base font-medium leading-relaxed text-gray-200">
                        {item.lead}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        {item.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="mt-6">
                        <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                          Technologies &amp; Frameworks
                        </span>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {item.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Deliverables Matrix & CTA */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md lg:col-span-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-violet-400" />
                          <h4 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                            Key Sprint Deliverables
                          </h4>
                        </div>
                        <ul className="mt-5 space-y-3">
                          {item.deliverables.map((deliv) => (
                            <li key={deliv} className="flex items-start gap-2.5 text-xs text-gray-300">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                              <span className="leading-relaxed">{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal();
                          }}
                          className="group/btn flex w-full cursor-pointer items-center justify-between rounded-xl border border-violet-400/30 bg-violet-500/10 px-5 py-3 text-xs font-semibold text-white transition-all hover:border-violet-300 hover:bg-violet-600/30"
                        >
                          <span>Request Architecture Spec</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* 4-Stage Delivery Engineering Process */}
        <div className="mt-28 rounded-3xl border border-white/10 bg-gradient-to-b from-[#120822]/90 via-[#0d0619]/90 to-[#08040f] p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              How We Execute
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our 4-Stage Delivery Framework
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              Predictable, milestone-driven sprints designed to remove risk and guarantee on-time delivery
              without scope creep or missed deadlines.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-extrabold tracking-tight text-violet-400">
                      {step.number}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">
                      <Clock className="h-3 w-3" />
                      {step.time}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-base font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2.5 text-xs leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Tiers & Investment Section */}
        <div id="pricing" className="mt-28">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              Transparent Partnerships
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engagement Tiers &amp; Investment
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Every partnership includes direct senior architect involvement, typed production code,
              and our unwavering commitment to craftsmanship.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {ENGAGEMENT_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all duration-300 ${
                  tier.popular
                    ? 'border-violet-400/70 bg-gradient-to-b from-[#1c0f35] via-[#120824] to-[#0a0514] shadow-[0_20px_60px_rgba(139,92,246,0.3)]'
                    : 'border-white/10 bg-[#10081c]/80 hover:border-violet-400/35 hover:bg-[#140a24]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-[11px] font-bold text-white uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Recommended
                  </div>
                )}

                <div>
                  <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                    {tier.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                      {tier.price}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{tier.timeline}</span>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                      What&apos;s Included
                    </span>
                    <ul className="mt-4 space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className={`w-full cursor-pointer rounded-full py-3 text-xs font-semibold transition-all ${
                      tier.popular
                        ? 'bg-white text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.6)]'
                        : 'border border-white/20 bg-white/5 text-white hover:border-violet-300 hover:bg-white/10'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos / Trust Strip */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-[#0d0718]/80 p-8 sm:p-10">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Trusted By Innovative Technology Leaders
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {clientLogos.map((client) => (
              <div key={client.id} className="text-center">
                <span className="font-display text-xl font-bold tracking-tight text-white/80 transition-colors hover:text-white sm:text-2xl">
                  {client.name}
                </span>
                {client.subtitle && (
                  <span className="block text-[11px] tracking-wider text-violet-400/80 uppercase">
                    {client.subtitle}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-24 flex flex-col items-center justify-between gap-8 rounded-3xl border border-violet-400/25 bg-gradient-to-r from-violet-900/30 via-[#180d2c] to-fuchsia-900/20 p-8 sm:p-12 lg:flex-row lg:p-14">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <Cpu className="h-4 w-4 text-violet-400" />
              <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                Let&apos;s Build Together
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Have a complex digital project or AI roadmap?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">
              Book a 15-minute introductory architecture call. We will review your challenges, discuss technical
              feasibility, and formulate a concrete plan of action.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
            >
              <span>Book 15-Min Discovery</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-violet-300 hover:bg-white/10"
            >
              Contact Our Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
