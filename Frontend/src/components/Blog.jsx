import React from 'react';
import { Calendar, ArrowUpRight, Clock, BookOpen } from 'lucide-react';

export default function Blog() {
  const blogs = [
    {
      id: 1,
      title: 'The Rise of Generative Engine Optimization (GEO): Securing Discovery in the Age of LLMs',
      date: 'May 17, 2025',
      readTime: '6 min read',
      category: 'AI & Search Strategy',
      image: '/assets/b3-img-1.webp',
      excerpt: 'Traditional Google SEO is no longer sufficient. Explore how structuring your data tokens and knowledge graph citations ensures Perplexity, ChatGPT, and Gemini cite your brand authoritative.',
    },
    {
      id: 2,
      title: 'Deterministic Multi-Agent Workflows: Moving Beyond Hallucinating Enterprise Chatbots',
      date: 'April 22, 2025',
      readTime: '8 min read',
      category: 'Systems Architecture',
      image: '/assets/b3-img-2.webp',
      excerpt: 'Why enterprise autonomy requires rigid state validation, cryptographic audit boundaries, and multi-agent consensus protocols to replace brittle single-prompt implementations.',
    },
    {
      id: 3,
      title: 'The Dark Luxury Design Language: Why High-Prestige Software Wins Enterprise Deals',
      date: 'March 14, 2025',
      readTime: '5 min read',
      category: 'Design Systems',
      image: '/assets/b3-img-3.webp',
      excerpt: 'Enterprise software does not have to feel like a bland spreadsheet. Deep obsidian surfaces, subtle specular highlights, and commanding typography build instant investor prestige.',
    },
  ];

  return (
    <section id="blog" className="relative py-20 sm:py-28 bg-[#0a0612] border-t border-purple-500/15 overflow-hidden">
      
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-purple-500/15 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
              Studio Journal & Research
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Engineering & Design Insights
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#c084fc] hover:text-white uppercase tracking-wider transition-colors font-mono"
          >
            <span>View All Insights</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group bg-[#120822] hover:bg-[#160c29] border border-purple-500/15 hover:border-purple-500/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#0a0612]/90 backdrop-blur-md text-[#c084fc] border border-purple-500/30 uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-4 text-xs font-mono text-purple-400/70 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#c084fc] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-purple-200/70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-purple-500/10 flex items-center justify-between text-xs font-semibold text-purple-300 group-hover:text-[#c084fc] transition-colors font-mono">
                <span>Read Full Paper</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
