import FlexCarousel, { type FlexCarouselItem } from './FlexCarousel';
import { useCms } from '../context/useCms';
import { DEFAULT_TRUSTED_CLIENTS } from '../context/cmsStore';

export function TrustedClients() {
  const { cms } = useCms();

  const clientLogos: FlexCarouselItem[] = (
    cms.trustedClients && cms.trustedClients.length > 0
      ? cms.trustedClients
      : DEFAULT_TRUSTED_CLIENTS
  ).map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    subtitle: item.subtitle,
  }));

  return (
    <section aria-label="Trusted Clients" className="relative py-8 lg:py-12">
      <div className="mx-auto h-[420px] w-full max-w-[1600px] sm:h-[480px] lg:h-[540px]">
        <FlexCarousel
          items={clientLogos}
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
          bend={-0.34}
          reach={1.4}
          curl="twist"
          dispersion={0.8}
          liquid={0.4}
          followCursor={false}
          autoplay
          interval={3000}
        />
      </div>
    </section>
  );
}
