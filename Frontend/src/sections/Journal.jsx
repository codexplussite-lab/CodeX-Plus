import Visual from '../components/Visual.jsx';
import ScrollVelocity from '../components/bits/ScrollVelocity.jsx';
import AnimatedContent from '../components/bits/AnimatedContent.jsx';
import SplitText from '../components/bits/SplitText.jsx';
import { partners, posts } from '../data/content.js';

export default function Journal() {
  return (
    <section className="journal section" id="journal">
      <div className="wrap">
        <div className="journal__head">
          <SplitText tag="h2" text="Latest from the studio" splitType="words" effect="rise" delay={60} textAlign="left" className="section-title" rootMargin="-60px" />
          <a className="link-arrow" href="#journal">All articles <span aria-hidden="true">→</span></a>
        </div>
        <div className="journal__grid">
          {posts.map((p, i) => (
            <AnimatedContent key={p.title} distance={70} duration={0.9} delay={i * 0.1} blur={8} className={i === 0 ? 'journal__cell journal__cell--lead' : 'journal__cell'}>
              <article className="post" data-cursor="Read">
                <a href="#journal">
                  <div className="post__media">
                    <Visual seed={i + 12} />
                  </div>
                  <time>{p.date}</time>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </a>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
      <div className="partners" aria-label="Clients">
        <ScrollVelocity texts={[partners.join('   /   ')]} velocity={40} fontSize="clamp(1.6rem, 3.2vw, 2.8rem)" fontWeight={600} color="var(--ink-soft)" />
      </div>
    </section>
  );
}
