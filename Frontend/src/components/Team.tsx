import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import DepthCarousel, { type DepthCarouselItemObject } from './DepthCarousel';
import { useCms } from '../context/useCms';
import { ALL_TEAM_MEMBERS, type FullTeamMember } from '../data/teamData';

interface OurTeamSectionProps {
  onNavigateTeam?: () => void;
}

export function OurTeamSection({ onNavigateTeam }: OurTeamSectionProps) {
  const { cms } = useCms();
  const [viewMode, setViewMode] = useState<'grid' | 'depth'>('grid');

  const members: FullTeamMember[] =
    cms.team && cms.team.length > 0 ? (cms.team as FullTeamMember[]) : ALL_TEAM_MEMBERS;

  // Ensure flagship lead Amara Okafor is included
  const amaraLead = members.find((m) => m.id === 'amara-okafor');
  const otherMembers = members.filter((m) => m.id !== 'amara-okafor');
  const displayMembers = amaraLead ? [amaraLead, ...otherMembers].slice(0, 8) : members.slice(0, 8);

  const carouselItems: DepthCarouselItemObject[] = members.map((member) => ({
    image: member.image,
    alt: `Portrait of ${member.name}, ${member.role}`,
    title: member.name,
    subtitle: member.role,
    badge: member.specialty
      ? member.specialty.split('&')[0].split('•')[0].trim()
      : undefined,
  }));

  return (
    <section
      id="team"
      aria-label="Studio Architects and Leads"
      className="relative w-full overflow-hidden bg-[#07040d] py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Avista-style Centered Header with Indicator Dot */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_#c084fc]" />
            Studio Architects &amp; Leads
          </span>

          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Our Team
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Senior system architects, distributed AI researchers, and luxury product designers building deterministic digital platforms.
          </p>

          {/* View Mode Toggle Switcher */}
          <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                viewMode === 'grid'
                  ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Gallery Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode('depth')}
              className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                viewMode === 'depth'
                  ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              3D Depth Deck
            </button>
          </div>
        </div>

        {/* View 1: Avista-Style 4-Column Clean Studio Grid */}
        {viewMode === 'grid' ? (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayMembers.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#120820]/90 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]"
              >
                {/* Member Portrait Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0612]">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120820] via-transparent to-transparent opacity-80" />

                  {/* Specialty Badge Floating */}
                  <div className="absolute top-3.5 left-3.5 rounded-full border border-white/15 bg-[#0a0612]/70 px-3 py-1 text-[11px] font-medium text-violet-300 backdrop-blur-md">
                    {member.location}
                  </div>
                </div>

                {/* Avista-style Solid Dark Capsule Name Strip */}
                <div className="p-5 text-left">
                  <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-violet-200">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-violet-300">
                    {member.role}
                  </p>
                  {member.specialty && (
                    <p className="mt-1 font-mono text-xs text-violet-400">
                      {member.specialty.split('&')[0].split('•')[0].trim()}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs text-gray-400">
                    {member.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View 2: 3D Depth Deck Stage */
          <div className="relative mt-12 h-[490px] w-full overflow-visible sm:h-[520px] lg:h-[540px]">
            <DepthCarousel
              items={carouselItems}
              align="center"
              cardWidth={295}
              cardHeight={395}
              radius={20}
              tint="#0a0612"
              depth={56}
              spread={104}
              tilt={12}
              tiltDirection="right"
              perspective={1400}
              visibleCards={5}
              falloff={0.14}
              blur={2}
              duration={850}
              ease="power2.out"
              initialIndex={0}
              autoplay={true}
              autoplayDelay={2600}
              loop={true}
              showControls={true}
              showIndicators={true}
            />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (onNavigateTeam) {
                onNavigateTeam();
              } else {
                window.location.hash = '#team';
              }
            }}
            className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all hover:border-violet-400/60 hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Meet All Architects</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export { OurTeamSection as Team };
