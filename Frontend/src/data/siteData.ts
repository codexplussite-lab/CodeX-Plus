export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  lead?: string;
  techStack?: string[];
  deliverables?: string[];
  featured?: boolean;
  isLarge?: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  subtitle?: string;
  src?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  image?: string;
  company?: string;
  rating: number;
  quote: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string;
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#about' },
  { label: 'Products', href: '#services' },
  { label: 'Pricing', href: '#clients' },
  { label: 'Company', href: '#team' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'development',
    title: 'Full-Stack & Autonomous AI',
    tag: 'Full-Stack & AI',
    lead: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
    description:
      'We construct mission-critical software systems that handle massive traffic without degradation. From deterministic LLM workflows to event-driven microservices and reactive interfaces, every line of code is structured for long-term maintainability and sub-second execution.',
    techStack: ['React 19 & Next.js', 'Node.js & Python', 'LangChain & Agentic Workflows', 'PostgreSQL & Redis', 'Cloudflare Edge'],
    deliverables: [
      'Multi-agent autonomous automation pipelines',
      'High-throughput REST & GraphQL API services',
      'Enterprise database architecture & schema design',
      'Zero-downtime CI/CD deployment infrastructure',
    ],
    isLarge: true,
  },
  {
    id: 'graphics-design',
    title: 'Graphics & Visual Identity',
    tag: 'Visual Identity',
    lead: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
    description:
      'Great products fail when wrapped in mundane design. We sculpt visual languages that instantly signal elite positioning: bespoke design token systems, crisp specular lighting, custom iconography, and high-conversion typography designed to captivate discerning enterprise buyers.',
    techStack: ['Figma Enterprise', 'Token Studio', 'Vector Systems', 'Custom Typography', 'Design System Guidelines'],
    deliverables: [
      'Complete luxury dark design system & component library',
      'Comprehensive brand identity, voice, and guidelines',
      'Custom vector iconography and illustration assets',
      'Pitch decks, collateral & marketing asset kits',
    ],
  },
  {
    id: 'video-editing',
    title: '3D Motion & WebGL Experiences',
    tag: 'Motion & Post',
    lead: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
    description:
      'We bridge modern Hollywood-grade visual fidelity with 60fps web performance. By marrying GPU shader code with fluid GSAP micro-choreography, we transform static corporate sites into immersive digital flagship destinations.',
    techStack: ['Three.js & OGL', 'GLSL Custom Shaders', 'GSAP Animation Suite', 'DaVinci Resolve Studio', 'After Effects'],
    deliverables: [
      'Interactive 3D WebGL hero scenes & product showcases',
      'Keynote product announcement & brand launch videos',
      'Physics-based gesture animations & page transitions',
      'Sound design & cinematic audio mastering',
    ],
    featured: true,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media & Growth Engine',
    tag: 'Growth Engine',
    lead: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
    description:
      'Visibility without conversion is vanity. We craft targeted content architectures, founder-led social strategies, and algorithmic distribution playbooks that turn industry attention into qualified enterprise inbound.',
    techStack: ['Attribution Engines', 'Multi-Platform Distribution', 'Competitive Analytics', 'Founder Narrative Mapping'],
    deliverables: [
      'C-suite executive thought leadership ghostwriting',
      'Data-driven omnichannel content publishing schedules',
      'High-converting product demo shorts & carousels',
      'Inbound attribution analytics & lead tracking',
    ],
  },
  {
    id: 'seo-geo',
    title: 'Next-Gen SEO & AI Engine Discovery',
    tag: 'Search & AI Discovery',
    lead: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery worldwide.',
    description:
      'As search behaviors transition from ten blue links to generative summaries (Perplexity, ChatGPT, Google Gemini), we engineer algorithmic GEO architectures ensuring your domain is quoted as the canonical source of truth.',
    techStack: ['Generative Engine Optimization (GEO)', 'Semantic Entity Graphs', 'Automated Content Caching', 'Technical Schema Architecture'],
    deliverables: [
      'Full generative AI visibility audit & entity positioning',
      'Structured microdata & schema knowledge graphs',
      'Deep technical performance & Core Web Vitals optimization',
      'Competitive authority & backlinks acquisition strategy',
    ],
  },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: 'godaddy', name: 'GoDaddy', subtitle: 'Cloud Infrastructure', src: '/images/logos/godaddy.svg' },
  { id: 'hotjar', name: 'Hotjar', subtitle: 'Behavior Analytics', src: '/images/logos/hotjar.svg' },
  { id: 'tripadvisor', name: 'Tripadvisor', subtitle: 'Global Hospitality', src: '/images/logos/tripadvisor.svg' },
  { id: 'google-fonts', name: 'Google Fonts', subtitle: 'Design Systems', src: '/images/logos/google-fonts.svg' },
  { id: 'figma', name: 'Figma', subtitle: 'Product Design', src: '/images/logos/figma.svg' },
  { id: 'stripe', name: 'Stripe', subtitle: 'Global Payments', src: '/images/logos/stripe.svg' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ashley',
    name: 'Ashley Cole',
    role: 'Teacher at Stanford',
    avatar: '/images/client-1.jpg',
    rating: 5,
    quote:
      "Super easy to use and actually works! I've already recommended it to a few friends.",
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Founder at Morheme Tech',
    avatar: '/images/client-2.jpg',
    rating: 5,
    quote:
      'Their AI workflow automation cut our manual reporting time by 70% within the very first month.',
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Product Lead at OWL',
    avatar: '/images/client-3.jpg',
    rating: 5,
    quote:
      'Rare blend of dark-luxury visual craft and rock-solid engineering. Every milestone shipped ahead of schedule.',
  },
  {
    id: 'david',
    name: 'David Chen',
    role: 'Director of Ops, Lumina',
    avatar: '/images/client-4.svg',
    rating: 5,
    quote:
      'From brand identity to full-stack delivery, CODEXX PLUS transformed how our enterprise clients perceive us.',
  },
  {
    id: 'nadia',
    name: 'Nadia Karim',
    role: 'CEO at Zainab Bees',
    avatar: '/images/client-5.svg',
    rating: 5,
    quote:
      'Thoughtful communication, sharp strategy, and measurable ROI across both web conversion and SEO.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Aiden Mercer',
    role: 'Creative Director',
    specialty: 'Brand Architecture & Luxury UI',
    image: '/images/team-1.jpg',
  },
  {
    id: 'team-2',
    name: 'Sophia Lindqvist',
    role: 'Lead AI Architect',
    specialty: 'Enterprise LLM & Automation',
    image: '/images/team-2.jpg',
  },
  {
    id: 'team-3',
    name: 'Julian Thorne',
    role: 'Principal Product Designer',
    specialty: 'Design Systems & Motion',
    image: '/images/team-3.jpg',
  },
  {
    id: 'team-4',
    name: 'Aria Rahman',
    role: 'Head of Growth & GEO',
    specialty: 'Search Strategy & Brand Scaling',
    image: '/images/team-4.svg',
  },
  {
    id: 'team-5',
    name: 'Marcus Sterling',
    role: 'VP of Engineering',
    specialty: 'Distributed Cloud & WebGL',
    image: '/images/team-5.svg',
  },
  {
    id: 'team-6',
    name: 'Zara Al-Mansoor',
    role: 'Motion & 3D Lead',
    specialty: 'Interactive Shaders & Film',
    image: '/images/team-6.svg',
  },
];
