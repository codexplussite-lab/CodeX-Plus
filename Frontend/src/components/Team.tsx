import DepthCarousel, { type DepthCarouselItemObject } from './DepthCarousel';
import { useCms } from '../context/useCms';
import { ALL_TEAM_MEMBERS } from '../data/teamData';

export function OurTeamSection() {
  const { cms } = useCms();

  const members = cms.team && cms.team.length > 0 ? cms.team : ALL_TEAM_MEMBERS;

  const carouselItems: DepthCarouselItemObject[] = members.map((member) => ({
    image: member.image,
    alt: `Portrait of ${member.name}, ${member.role}`,
    title: member.name,
    subtitle: member.role,
    badge: member.specialty
      ? member.specialty.split('&')[0].split('•')[0].trim()
      : undefined,
  }));

  // Initial index set to Liam Chen to match flagship showcase
  const liamIndex = members.findIndex((m) => m.id === 'liam-chen');
  const initialIndex = liamIndex >= 0 ? liamIndex : 0;

  return (
    <section
      id="team"
      aria-label="Our Team"
      className="relative w-full overflow-hidden bg-[#0a0612] px-6 py-24 md:px-12"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-[300px] w-[350px] rounded-full bg-fuchsia-800/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Centered Header Block */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            Studio Architects &amp; Leads
          </div>
          <h2 className="mt-4 text-center font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Team
          </h2>
          <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-sm leading-relaxed text-gray-300/80 md:text-base">
            Drag, swipe, or use arrows to cycle through our active engineering and design leads.
          </p>
        </div>

        {/* DepthCarousel 3D Stage */}
        <div className="relative h-[480px] w-full md:h-[530px]">
          <DepthCarousel
            items={carouselItems}
            cardWidth={300}
            cardHeight={400}
            radius={22}
            tint="#0a0612"
            depth={55}
            spread={52}
            tilt={11}
            tiltDirection="right"
            perspective={1800}
            visibleCards={6}
            initialIndex={initialIndex}
            centerOffset={0}
            falloff={0.12}
            blur={3}
            duration={450}
            ease="power3.out"
            autoplay={true}
            autoplayDelay={3600}
            loop={true}
            showControls={true}
            showIndicators={true}
          />
        </div>
      </div>
    </section>
  );
}

export { OurTeamSection as Team };
