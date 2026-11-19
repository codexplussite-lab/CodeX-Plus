import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Github,
  Terminal,
  Shield,
  Layers,
  HeartHandshake,
  Briefcase,
} from 'lucide-react';
import DepthCarousel, { type DepthCarouselItemObject } from '../components/DepthCarousel';

interface TeamPageProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

export interface FullTeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  location: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const ALL_TEAM_MEMBERS: FullTeamMember[] = [
  {
    id: 'aiden-mercer',
    name: 'Aiden Mercer',
    role: 'Creative Director & Founder',
    specialty: 'Brand Architecture & Dark Luxury UI',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    bio: 'Pioneered the dark-luxury aesthetic at CODEXX PLUS. Former principal designer at European design labs.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'sophia-lindqvist',
    name: 'Sophia Lindqvist',
    role: 'Lead AI Architect',
    specialty: 'Enterprise LLM & Agentic Workflows',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    bio: 'PhD in Distributed Systems. Leads multi-agent deterministic pipelines and autonomous workflow engineering.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Principal Product Designer',
    specialty: 'Design Systems & Motion Tokens',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    bio: 'Designs living design token systems and high-throughput component ecosystems for tier-1 web platforms.',
    location: 'London Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'alexander-reid',
    name: 'Alexander Reid',
    role: 'Founder & Managing Partner',
    specialty: 'Executive Strategy & Capital Advisory',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    bio: 'Serial technology entrepreneur. Oversees studio partnerships, enterprise relationships, and strategic investments.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Head of Engineering',
    specialty: 'Full-Stack Edge Infrastructure',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
    bio: '14+ years architecting zero-downtime distributed platforms and low-latency cloud data engines.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'zara-al-mansoor',
    name: 'Zara Al-Mansoor',
    role: 'Motion & 3D Lead',
    specialty: 'WebGL Shaders & Spatial Interfaces',
    image:
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80',
    bio: 'WebGL pioneer crafting GPU-accelerated interactive canvas scenes and bespoke GLSL shaders.',
    location: 'Dubai Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'kai-takahashi',
    name: 'Kai Takahashi',
    role: 'Lead Cloud Architect',
    specialty: 'Distributed Infrastructure & SOC2',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    bio: 'Expert in Kubernetes orchestration, isolated sandbox environments, and global multi-region failover.',
    location: 'San Francisco',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'liam-chen',
    name: 'Liam Chen',
    role: 'Systems Security Lead',
    specialty: 'Deterministic Security & Threat Modeling',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    bio: 'Audits cryptography boundaries, zero-trust architectures, and secure enclave execution.',
    location: 'London Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    role: 'Head of Brand Strategy',
    specialty: 'Narrative Positioning & Omnichannel Growth',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    bio: 'Orchestrates enterprise market positioning and founder-led content engines that generate multi-million pipeline.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'david-keller',
    name: 'David Keller',
    role: 'Principal AI Systems Engineer',
    specialty: 'Fine-Tuning & Vector Retrieval',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    bio: 'Builds low-latency semantic caching and high-accuracy RAG architectures for enterprise knowledge bases.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Head of Product Strategy',
    specialty: 'Roadmap Execution & KPI Architecture',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80',
    bio: 'Aligns technical milestones with executive business outcomes, ensuring every sprint impacts bottom-line ROI.',
    location: 'London Hub',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'lucas-silva',
    name: 'Lucas Silva',
    role: 'Senior WebGL & 3D Engineer',
    specialty: 'Three.js, OGL & Performance Shaders',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
    bio: 'Masters 60fps mobile WebGL rendering, instanced geometry, and seamless reactive micro-interactions.',
    location: 'San Francisco',
    socials: { linkedin: '#', github: '#' },
  },
];

const CAROUSEL_ITEMS: DepthCarouselItemObject[] = ALL_TEAM_MEMBERS.map((member) => ({
  image: member.image,
  alt: `Portrait of ${member.name}, ${member.role}`,
  title: member.name,
  subtitle: member.role,
  badge: member.specialty.split('&')[0].trim(),
}));

const STUDIO_PRINCIPLES = [
  {
    icon: Terminal,
    title: 'Deep Asynchronous Focus',
    description:
      'We eliminate excessive meetings and middle-management bureaucracy. Our architects work in deep, uninterrupted blocks to produce pristine digital craft.',
  },
  {
    icon: Shield,
    title: 'Direct Principal Access',
    description:
      'Clients communicate directly with the senior engineers and design leads who actually author their systems—not account managers or junior proxies.',
  },
  {
    icon: Layers,
    title: 'Zero-Bloat Architectural Rigor',
    description:
      'We reject heavy dependencies and fragile boilerplate. Every component and API route is constructed with strict typed discipline for longevity.',
  },
  {
    icon: HeartHandshake,
    title: 'High-Touch Partnership',
    description:
      'We only take on 3 to 4 flagship enterprise engagements simultaneously to ensure undivided attention and unmatched standard of execution.',
  },
];

export function TeamPage({ onOpenModal, onNavigateContact, onNavigateHome }: TeamPageProps) {
  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 h-[520px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-[900px] left-0 h-[480px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />

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
          <span className="text-violet-300">Our Team</span>
        </div>

        {/* Hero Section */}
        <div className="mt-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            Studio Leadership &amp; Architects
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Creative Minds &amp; Technical Experts Behind CODEXX PLUS.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            A distributed collective of senior system architects, product designers, AI researchers, and
            motion specialists turning complex ideas into seamless digital solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_0_32px_rgba(168,85,247,0.35)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)]"
            >
              <span>Connect With Our Team</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#directory"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-violet-300 hover:bg-white/10"
            >
              Browse 12-Member Directory
            </a>
          </div>
        </div>

        {/* 3D DepthCarousel Interactive Stage */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-b from-[#120822]/90 via-[#0d0619]/90 to-[#08040f] p-8 sm:p-12">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              Interactive 3D Stage
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Meet Our Studio Core
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-gray-400 sm:text-sm">
              Drag, swipe, or use arrows to cycle through our active engineering and design leads.
            </p>
          </div>

          <div className="relative mt-8 h-[460px] w-full md:h-[520px]">
            <DepthCarousel
              items={CAROUSEL_ITEMS}
              cardWidth={310}
              cardHeight={400}
              radius={20}
              tint="#0E0B12"
              depth={80}
              spread={160}
              tilt={14}
              tiltDirection="right"
              perspective={2400}
              activeCount={5}
              centerOffset={0}
              visibleCards={6}
              falloff={0.11}
              blur={5}
              duration={450}
              ease="power3.out"
              autoplay={true}
              autoplayDelay={3200}
              loop={true}
              showControls={true}
              showIndicators={true}
            />
          </div>
        </div>

        {/* Complete 12-Member Directory Grid */}
        <div id="directory" className="mt-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Studio Directory
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                All 12 Studio Principals
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Every project is staffed exclusively by seasoned leads with a verified history of shipping
              high-throughput production systems.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ALL_TEAM_MEMBERS.map((member) => (
              <article
                key={member.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10081c]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]"
              >
                <div>
                  {/* Portrait Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#08040f]">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      className="h-full w-full object-cover object-top grayscale contrast-110 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Location Badge */}
                    <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                      {member.location}
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute right-0 bottom-0 left-0 p-4">
                      <h3 className="font-display text-lg font-bold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs text-violet-300">{member.role}</p>
                    </div>
                  </div>

                  {/* Specialty Tag & Bio */}
                  <div className="mt-4">
                    <span className="inline-block rounded-lg border border-violet-400/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-200">
                      {member.specialty}
                    </span>
                    <p className="mt-3 text-xs leading-relaxed text-gray-400">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Social Links Row */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[11px] font-medium text-gray-400">Verified Principal</span>
                  <div className="flex items-center gap-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        aria-label={`${member.name} LinkedIn`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        aria-label={`${member.name} Twitter`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <Twitter className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        aria-label={`${member.name} GitHub`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Studio Culture & Architectural Principles */}
        <div className="mt-28 rounded-3xl border border-white/10 bg-[#0d0718]/80 p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              How We Work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Architectural Principles &amp; Studio Culture
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              We reject corporate bloat, unnecessary syncs, and superficial design in favor of pure,
              disciplined engineering execution.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 font-display text-base font-bold text-white">
                    {principle.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join the Studio / Open Positions Card */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-[#140a25] via-[#10071e] to-[#0a0514] p-8 sm:p-12 lg:p-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300 uppercase">
                <Briefcase className="h-3.5 w-3.5" />
                Careers &amp; Residencies
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Always looking for extraordinary engineering and design talent.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                If you write typed, zero-bloat code, master GPU shaders, or sculpt dark-luxury interfaces that
                defy industry conventions, we would love to see your GitHub and portfolio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onNavigateContact}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
              >
                <span>Send Portfolio / GitHub</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-24 flex flex-col items-center justify-between gap-8 rounded-3xl border border-violet-400/25 bg-gradient-to-r from-violet-900/30 via-[#180d2c] to-fuchsia-900/20 p-8 sm:p-12 lg:flex-row lg:p-14">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Partner directly with our principal architects.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">
              Ready to elevate your digital flagship? Reserve a 15-minute consultation to discuss your
              technical roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
            >
              <span>Schedule Discovery Call</span>
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

export default TeamPage;
