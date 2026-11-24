import ScrollVelocity from '../components/bits/ScrollVelocity.jsx';
import { marqueeLines } from '../data/content.js';

// Scroll-velocity marquee: text speeds up and skews as you scroll faster.
export default function Statement() {
  return (
    <section className="statement" aria-label="Agency statement">
      <ScrollVelocity
        texts={marqueeLines}
        velocity={60}
        separator="   —   "
        skewWithVelocity={6}
        outlineAlternate
        fontSize="clamp(3rem, 9vw, 8.5rem)"
        fontWeight={700}
        color="var(--ink)"
      />
    </section>
  );
}
