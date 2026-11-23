import { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
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
import { SERVICES as DEFAULT_SERVICES, type ServiceItem } from '../data/siteData';

interface ServicesPageProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

const ICON_MAP = [Code2, Palette, Film, TrendingUp, Search, Cpu, Layers];

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
  const servicesList: ServiceItem[] =
    cms.services && cms.services.length > 0 ? cms.services : DEFAULT_SERVICES;

  const [activeDiscipline, setActiveDiscipline] = useState<string>(
    servicesList[0]?.id || 'development'
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
            {servicesList.map((d, idx) => {
              const active = activeDiscipline === d.id;
              const stepLabel = d.step || String(idx + 1).padStart(2, '0');
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
                  {stepLabel} &middot; {d.title}
                </button>
              );
            })}
          </div>

          {/* Disciplines Grid */}
          <div className="mt-8 space-y-6">
            {servicesList.map((item, idx) => {
              const Icon = ICON_MAP[idx % ICON_MAP.length];
              const isSelected = activeDiscipline === item.id;
              const stepLabel = item.step || String(idx + 1).padStart(2, '0');
              const techStack =
                item.techStack && item.techStack.length > 0
                  ? item.techStack
                  : ['React 19 & Next.js', 'Node.js & Python', 'Cloudflare Edge'];
              const deliverables =
                item.deliverables && item.deliverables.length > 0
                  ? item.deliverables
                  : [
                      'High-throughput REST & GraphQL API services',
                      'Zero-downtime CI/CD deployment infrastructure',
                    ];

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
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-semibold tracking-wider text-violet-400">
                          {stepLabel}
                        </span>
                        <span className="text-violet-400/50 select-none text-xs" aria-hidden="true">//</span>
                        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-0.5 text-xs font-medium text-violet-300">
                          {item.tag}
                        </span>
                        <span className="text-gray-500 select-none text-xs" aria-hidden="true">&mdash;</span>
                        <span className="text-xs font-medium text-violet-300/90">
                          Read spec
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

                      {item.lead && (
                        <p className="mt-4 text-base font-medium leading-relaxed text-gray-200">
                          {item.lead}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        {item.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="mt-6">
                        <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                          Technologies &amp; Frameworks
                        </span>
                        <ul className="mt-2.5 flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Technology stack">
                          {techStack.map((tech: string) => (
                            <li
                              key={tech}
                              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Key Deliverables Card */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0617] p-6 lg:col-span-5">
                      <div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                            Core Deliverables
                          </span>
                          <span className="text-xs text-gray-400">Included in Sprint</span>
                        </div>

                        <ul className="mt-5 space-y-3.5">
                          {deliverables.map((deliv: string, dIdx: number) => (
                            <li key={dIdx} className="flex items-start gap-3 text-xs leading-relaxed text-gray-300">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal();
                          }}
                          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-semibold text-white transition-colors hover:bg-violet-600 hover:text-white"
                        >
                          <span>Commission {item.title}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* 4-Step Engineering Process */}
        <div className="mt-28">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              How We Work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Deterministic 4-Phase Delivery Process
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-400">
              Zero ambiguity. Every phase has clear deliverables, weekly staging previews, and direct access to your project leads.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#120820]/80 p-7 shadow-lg transition-all duration-300 hover:border-violet-400/40 hover:bg-[#170a29]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-violet-400/70 group-hover:text-violet-300">
                      {step.number}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300">
                      <Clock className="h-3 w-3 text-violet-400" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4 text-[11px] font-medium text-violet-300/80">
                  Verified Phase Deliverables &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Tiers Section */}
        <div id="pricing" className="mt-28">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              Transparent Investment
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engagement Tiers &amp; Retainers
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-400">
              Predictable pricing for venture-backed startups, high-growth scaleups, and global enterprises.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {ENGAGEMENT_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 ${
                  tier.popular
                    ? 'border-violet-400/80 bg-gradient-to-b from-[#1e0e38] via-[#140827] to-[#0d0519] shadow-[0_20px_70px_rgba(139,92,246,0.35)]'
                    : 'border-white/10 bg-[#10081c]/90 hover:border-violet-400/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                      {tier.badge}
                    </span>
                    <span className="text-xs text-gray-400">{tier.timeline}</span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold tracking-tight text-white">
                      {tier.price}
                    </span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-gray-300">
                    {tier.description}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                      What&apos;s Included
                    </span>
                    <ul className="mt-4 space-y-3">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-4">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className={`w-full cursor-pointer rounded-full py-3.5 text-center text-xs font-semibold transition-all ${
                      tier.popular
                        ? 'bg-white text-[#0a0612] shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:bg-violet-100'
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

        {/* Bottom CTA Block */}
        <div className="mt-28 rounded-3xl border border-violet-400/30 bg-gradient-to-r from-[#170a2c] via-[#1c0e35] to-[#120820] p-10 text-center shadow-[0_20px_80px_rgba(139,92,246,0.25)] md:p-16">
          <div className="mx-auto max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-violet-300 uppercase">
              Custom Engineering Requirements
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Have a bespoke enterprise system in mind?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
              Talk directly with our solutions architects to structure a tailored engagement.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenModal}
                className="cursor-pointer rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0612] shadow-lg transition-colors hover:bg-violet-100"
              >
                Schedule Technical Discovery
              </button>
              <button
                type="button"
                onClick={onNavigateContact}
                className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-violet-300 hover:bg-white/10"
              >
                Submit RFP / Architecture Spec
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
