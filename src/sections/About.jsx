import ScrollReveal from '../components/bits/ScrollReveal.jsx';
import CountUp from '../components/bits/CountUp.jsx';
import AnimatedContent from '../components/bits/AnimatedContent.jsx';
import Visual from '../components/Visual.jsx';
import { about } from '../data/content.js';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="wrap">
        <h2 className="about__lead-label">Who we are</h2>
        <ScrollReveal containerClassName="about__reveal" textClassName="about__reveal-text" baseOpacity={0.12} blurStrength={6} stagger={0.04}>
          {about.statement}
        </ScrollReveal>

        <div className="about__founder">
          {about.founder.avatar ? (
            <img src={about.founder.avatar} alt={about.founder.name} className="about__avatar" style={{ objectFit: 'cover' }} />
          ) : (
            <Visual seed={4} className="about__avatar" title="Portrait placeholder" />
          )}
          <div>
            <p className="about__name">{about.founder.name}</p>
            <p className="about__role">{about.founder.role}</p>
          </div>
        </div>

        <div className="about__cards">
          <AnimatedContent distance={60} duration={0.9} blur={8}>
            <article className="card card--paper">
              <h3>Our story</h3>
              <p>{about.story}</p>
            </article>
          </AnimatedContent>
          <AnimatedContent distance={60} duration={0.9} delay={0.12} blur={8}>
            <article className="card card--ink">
              <h3>Our goal</h3>
              <p>{about.goal}</p>
            </article>
          </AnimatedContent>
        </div>

        <dl className="stats">
          {about.stats.map(s => (
            <div className="stats__item" key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <CountUp to={s.to} duration={2.2} suffix={s.suffix} decimals={s.decimals} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
