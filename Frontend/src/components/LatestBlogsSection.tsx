import { ArrowUpRight, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  image: string;
  readTime: string;
}

const POSTS: BlogPost[] = [
  {
    id: 'ai-agents-deterministic',
    title: 'Architecting Deterministic Multi-Agent Pipelines for High-Throughput Enterprises',
    date: 'May 24, 2026',
    tag: 'Autonomous AI',
    summary:
      'How to build self-healing LLM agent networks that respect strict schema validation, state consistency, and zero-loss financial rollback transactions.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    readTime: '6 min read',
  },
  {
    id: 'webgl-shader-craft',
    title: 'GPU-Accelerated WebGL Shaders: Balancing 60fps Performance with Visual Opulence',
    date: 'April 18, 2026',
    tag: 'Creative Tech',
    summary:
      'Deep dive into fragment shaders, instanced meshes, and memory leak mitigation across mobile WebGL viewports.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: 'geo-search-engine',
    title: 'Generative Engine Optimization (GEO): Indexing Platforms for Perplexity and LLMs',
    date: 'March 30, 2026',
    tag: 'Search & GEO',
    summary:
      'Why traditional keywords fail in AI answer engines, and how structured schema graphs secure authoritative organic citations.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
  },
];

interface LatestBlogsSectionProps {
  onOpenModal: () => void;
}

export function LatestBlogsSection({ onOpenModal }: LatestBlogsSectionProps) {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <section
      id="editorial"
      aria-label="Latest Editorial and Engineering Research"
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute top-1/3 left-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Engineering Research &amp; Insights
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Latest Editorial
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all hover:border-violet-400/60 hover:bg-violet-500/15 md:self-auto focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Read All Research</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Asymmetrical 1 + 2 Grid */}
        <div className="mt-14 space-y-8">
          {/* Top Featured Hero Card */}
          <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#120820]/80 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-violet-400/50">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:col-span-7">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120820] via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-violet-300">
                      <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_#c084fc]" />
                      {featured.tag}
                    </span>
                    <span className="text-gray-500">&bull;</span>
                    <span className="text-gray-400">{featured.date}</span>
                    <span className="text-gray-500">&bull;</span>
                    <span className="text-gray-400">{featured.readTime}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-violet-200 sm:text-3xl">
                    {featured.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {featured.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white uppercase group-hover:text-violet-300">
                    <span>Read Whitepaper</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Bottom 2-Column Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#120820]/80 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-violet-400/50"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-xs">
                    <span className="text-violet-300 font-medium">{post.tag}</span>
                    <span className="text-gray-500">&bull;</span>
                    <span className="text-gray-400">{post.date}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-violet-200">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-300 uppercase group-hover:text-white">
                    <span>Read Analysis</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-violet-400" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
