import { ArrowUpRight } from 'lucide-react';
import DepthCarousel, { type DepthCarouselItemObject } from './DepthCarousel';
import { useCms } from '../context/useCms';
import { ALL_TEAM_MEMBERS } from '../data/teamData';

interface OurTeamSectionProps {
  onNavigateTeam?: () => void;
}

export function OurTeamSection({ onNavigateTeam }: OurTeamSectionProps) {
  const { cms } = useCms();

  const members = cms.team && cms.team.length > 0 ? cms.team : ALL_TEAM_MEMBERS;

  // Amara Okafor flagship lead matching user's design reference
  const amaraIndex = members.findIndex((m) => m.id === 'amara-okafor');
  const initialLeadIndex = amaraIndex >= 0 ? amaraIndex : 0;

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
      aria-label="Our Team"
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      {/* Ambient background glows matching site design system */}
      <div className="pointer-events-none absolute top-1/3 left-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/12 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-[450px] w-[450px] translate-x-1/3 -translate-y-1/2 rounded-full bg-purple-600/12 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Split Flex Layout: Left Text & Right Scrolling Depth Deck */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Left Column: Eyebrow, Heading, Subtitle & Luxury Glass CTA */}
          <div className="flex w-full shrink-0 flex-col items-start justify-center text-left lg:w-[360px] xl:w-[400px]">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-violet-300 uppercase shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              Senior-Led Delivery <span className="text-violet-400/50 select-none" aria-hidden="true">&mdash;</span> Learn More
            </span>

            <span className="mb-3 inline-block text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
              Studio Architects &amp; Leads
            </span>

            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[54px] lg:leading-[1.1]">
              Our Team
            </h2>

            <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-400 sm:text-lg">
              Specialized engineering architects, AI researchers, and luxury product designers building deterministic software systems.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateTeam) {
                    onNavigateTeam();
                  } else {
                    window.location.hash = '#team';
                  }
                }}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:shadow-[0_0_28px_rgba(139,92,246,0.3)] active:scale-95"
              >
                <span>Meet All Architects</span>
                <ArrowUpRight className="h-4 w-4 text-violet-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D DepthCarousel Stage with 6 Cards shown & smooth scrolling animation */}
          <div className="relative h-[490px] w-full flex-1 overflow-visible sm:h-[520px] lg:h-[540px]">
            <DepthCarousel
              items={carouselItems}
              align="left"
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
              initialIndex={initialLeadIndex}
              autoplay={true}
              autoplayDelay={2400}
              loop={true}
              showControls={false}
              showIndicators={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { OurTeamSection as Team };
