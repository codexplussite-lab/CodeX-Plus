const TECH_STACK_ITEMS = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'Python & PyTorch',
  'FastAPI & Node.js',
  'PostgreSQL & Vector DB',
  'WebGL & Three.js',
  'Cloudflare Edge',
  'Autonomous LLM Agents',
  'Docker & Kubernetes',
  'GraphQL & REST APIs',
  'Tailwind CSS v4',
];

export function TechStackMarquee() {
  return (
    <section
      aria-label="Technology Stack"
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#0c0617]/70 py-4.5 backdrop-blur-md"
    >
      {/* Edge gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0612] to-transparent sm:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0612] to-transparent sm:w-36" />

      <div className="flex w-max animate-marquee">
        {/* Track 1: Accessible to screen readers */}
        <div className="flex items-center gap-10 px-6" role="list">
          {TECH_STACK_ITEMS.map((item) => (
            <div
              key={item}
              role="listitem"
              className="flex items-center gap-3 whitespace-nowrap text-xs font-mono font-medium tracking-wider text-gray-300 uppercase transition-colors hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Track 2: Cloned / duplicated for seamless continuous marquee loop - aria-hidden for screen readers */}
        <div className="flex items-center gap-10 px-6" aria-hidden="true">
          {TECH_STACK_ITEMS.map((item, idx) => (
            <div
              key={`clone-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs font-mono font-medium tracking-wider text-gray-300 uppercase transition-colors hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackMarquee;
