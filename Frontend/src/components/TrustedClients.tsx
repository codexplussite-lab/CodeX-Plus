import FlexCarousel, { type FlexCarouselItem } from './FlexCarousel';
import { useCms } from '../context/useCms';

const DEFAULT_LOGOS_FALLBACK: FlexCarouselItem[] = [
  {
    src: '/images/logos/godaddy.svg',
    alt: 'GoDaddy brand logo',
    title: 'GoDaddy',
    subtitle: 'Cloud Infrastructure',
  },
  {
    src: '/images/logos/hotjar.svg',
    alt: 'Hotjar brand logo',
    title: 'Hotjar',
    subtitle: 'Behavior Analytics',
  },
  {
    src: '/images/logos/tripadvisor.svg',
    alt: 'Tripadvisor brand logo',
    title: 'Tripadvisor',
    subtitle: 'Global Hospitality',
  },
  {
    src: '/images/logos/google-fonts.svg',
    alt: 'Google Fonts brand logo',
    title: 'Google Fonts',
    subtitle: 'Design Systems',
  },
  {
    src: '/images/logos/figma.svg',
    alt: 'Figma brand logo',
    title: 'Figma',
    subtitle: 'Product Design',
  },
  {
    src: '/images/logos/stripe.svg',
    alt: 'Stripe brand logo',
    title: 'Stripe',
    subtitle: 'Global Payments',
  },
];

export function TrustedClients() {
  const { cms } = useCms();

  const carouselItems: FlexCarouselItem[] =
    cms.clientLogos && cms.clientLogos.length > 0
      ? cms.clientLogos.map((l) => ({
          src: l.src || `/images/logos/${l.id}.svg`,
          alt: `${l.name} brand logo`,
          title: l.name,
          subtitle: l.subtitle,
        }))
      : DEFAULT_LOGOS_FALLBACK;

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
