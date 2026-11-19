import FlexCarousel, { type FlexCarouselItem } from './FlexCarousel';
import { useCms } from '../context/useCms';
import { CLIENT_LOGOS as DEFAULT_LOGOS } from '../data/siteData';

export function TrustedClients() {
  const { cms } = useCms();

  const logosList =
    cms.clientLogos && cms.clientLogos.length > 0
      ? cms.clientLogos
      : DEFAULT_LOGOS;

  const carouselItems: FlexCarouselItem[] = logosList.map((logo) => ({
    src: logo.src || '/images/logos/figma.svg',
    alt: `${logo.name} brand partner logo`,
    title: logo.name,
    subtitle: logo.subtitle || 'Enterprise Partner',
  }));

  return (
    <section aria-label="Trusted Clients" className="relative py-8 lg:py-12">
      <div className="mx-auto h-[420px] w-full max-w-[1600px] sm:h-[480px] lg:h-[540px]">
        <FlexCarousel
          items={carouselItems}
          preset="liquid"
          intro="deal"
          cardHeight={0.3}
          gap={12}
          squeeze={0.2}
          focusOnClick
          captions={false}
          fit="square"
          radius={3}
          lensWidth={1.97}
          lensHeight={2}
          tilt={180}
          roundness={0.3}
          bend={0}
          reach={0.9}
          curl="fall"
          followCursor
          autoplay
          interval={3.5}
          className="text-white"
        />
      </div>
    </section>
  );
}
