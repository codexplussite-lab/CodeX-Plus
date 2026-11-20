import DepthCarousel, { type DepthCarouselItemObject } from './DepthCarousel';
import { useCms } from '../context/useCms';
import { ALL_TEAM_MEMBERS } from '../data/teamData';

interface OurTeamSectionProps {
  onNavigateTeam?: () => void;
}

export function OurTeamSection({ onNavigateTeam }: OurTeamSectionProps) {
  const { cms } = useCms();

  const members = cms.team && cms.team.length > 0 ? cms.team : ALL_TEAM_MEMBERS;

  // Liam Chen active lead matching flagship display
  const liamIndex = members.findIndex((m) => m.id === 'liam-chen');
  const initialLeadIndex = liamIndex >= 0 ? liamIndex : 0;

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
      className="relative w-full overflow-hidden bg-[#0a0612] px-6 py-24 sm:py-32 md:px-12 lg:px-16"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-900/10 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-fuchsia-900/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1700px]">
        {/* Split Flex Layout: Left Text & Right Scrolling Depth Deck */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          {/* Left Column: Heading, Subtitle & See More CTA */}
          <div className="flex w-full shrink-0 flex-col items-start justify-center text-left lg:w-[350px] xl:w-[390px]">
            <span className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">
              STUDIO ARCHITECTS &amp; LEADS
            </span>

            <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Our Team
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400 sm:text-base">
              Drag, swipe, or use arrows to cycle through our active engineering and design leads.
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
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_4px_24px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-gray-200 hover:shadow-[0_4px_30px_rgba(255,255,255,0.22)] active:scale-95"
              >
                See More
              </button>
            </div>
          </div>

          {/* Right Column: 3D DepthCarousel Stage with 6 Cards shown & smooth scrolling animation */}
          <div className="relative h-[480px] w-full flex-1 overflow-visible sm:h-[520px]">
            <DepthCarousel
              items={carouselItems}
              align="left"
              cardWidth={310}
              cardHeight={380}
              radius={20}
              tint="#0a0612"
              depth={48}
              spread={44}
              tilt={10}
              tiltDirection="right"
              perspective={1500}
              visibleCards={5}
              falloff={0.14}
              blur={2}
              duration={800}
              ease="power2.out"
              initialIndex={initialLeadIndex}
              autoplay={true}
              autoplayDelay={2600}
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
