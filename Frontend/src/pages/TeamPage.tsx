import {
  Sparkles,
  ArrowRight,
  Terminal,
  Shield,
  Layers,
  HeartHandshake,
  Briefcase,
} from 'lucide-react';
import { useCms } from '../context/useCms';
import { ALL_TEAM_MEMBERS } from '../data/teamData';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.21 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.52C9.34 21.61 9.52 21.3 9.52 21.03C9.52 20.79 9.51 20.15 9.51 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.52 18.45 8.97 18.01 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.41 6.01 9.52 6.65 8.82C6.55 8.57 6.21 7.55 6.75 6.19C6.75 6.19 7.59 5.92 9.5 7.21C10.3 6.99 11.15 6.88 12 6.88C12.85 6.88 13.7 6.99 14.5 7.21C16.41 5.92 17.25 6.19 17.25 6.19C17.79 7.55 17.45 8.57 17.35 8.82C17.99 9.52 18.38 10.41 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.49 17.33 14.49 18.26C14.49 19.6 14.48 20.68 14.48 21.03C14.48 21.3 14.66 21.62 15.17 21.52C19.14 20.19 22 16.44 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

interface TeamPageProps {
  onOpenModal: () => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

const PRINCIPLE_ICONS = [Terminal, Shield, Layers, HeartHandshake];

export function TeamPage({ onOpenModal, onNavigateContact, onNavigateHome }: TeamPageProps) {
  const { cms } = useCms();
  const teamMembers = cms.team && cms.team.length > 0 ? cms.team : ALL_TEAM_MEMBERS;
  const principles = cms.teamPrinciples && cms.teamPrinciples.length > 0 ? cms.teamPrinciples : [
    {
      title: 'Deep Asynchronous Focus',
      description:
        'We eliminate excessive meetings and middle-management bureaucracy. Our architects work in deep, uninterrupted blocks to produce pristine digital craft.',
    },
    {
      title: 'Direct Principal Access',
      description:
        'Clients communicate directly with the senior engineers and design leads who actually author their systems—not account managers or junior proxies.',
    },
    {
      title: 'Zero-Bloat Architectural Rigor',
      description:
        'We reject heavy dependencies and fragile boilerplate. Every component and API route is constructed with strict typed discipline for longevity.',
    },
    {
      title: 'High-Touch Partnership',
      description:
        'We only take on 3 to 4 flagship enterprise engagements simultaneously to ensure undivided attention and unmatched standard of execution.',
    },
  ];

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
            Senior-Led Delivery <span className="text-violet-400/50 select-none" aria-hidden="true">&mdash;</span> Learn More
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
              Browse {teamMembers.length}-Member Directory
            </a>
          </div>
        </div>

        {/* Complete Dynamic Directory Grid */}
        <div id="directory" className="mt-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Studio Directory
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                All {teamMembers.length} Studio Principals
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Every project is staffed exclusively by seasoned leads with a verified history of shipping
              high-throughput production systems.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member) => (
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
                    {member.location && (
                      <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                        {member.location}
                      </div>
                    )}

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
                    {member.specialty && (
                      <span className="inline-block rounded-lg border border-violet-400/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-200">
                        {member.specialty}
                      </span>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-gray-400">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Social Links Row */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[11px] font-medium text-gray-400">Verified Principal</span>
                  <div className="flex items-center gap-2">
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        aria-label={`${member.name} LinkedIn`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <LinkedinIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a
                        href={member.socials.twitter}
                        aria-label={`${member.name} Twitter`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <TwitterIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        aria-label={`${member.name} GitHub`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:border-violet-400 hover:text-white"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Studio Culture & Principles */}
        <div className="mt-28">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              How We Operate
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Studio Operating Principles
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-400">
              The foundational cultural pillars that allow our distributed teams to ship at velocity.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, idx) => {
              const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#120820]/75 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-violet-400/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join The Collective Card */}
        <div className="mt-28 rounded-3xl border border-violet-400/30 bg-gradient-to-r from-[#170a2c] via-[#1c0e35] to-[#120820] p-10 shadow-[0_20px_80px_rgba(139,92,246,0.25)] md:p-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300 uppercase">
                <Briefcase className="h-3.5 w-3.5" />
                Join The Collective
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Always looking for top 1% engineers &amp; designers.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                We hire senior architects worldwide. If you obsess over WebGL shaders, zero-latency multi-agent systems, or bespoke luxury typography, let&apos;s talk.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateContact}
              className="cursor-pointer shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0612] shadow-lg transition-colors hover:bg-violet-100"
            >
              Apply as Principal Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
