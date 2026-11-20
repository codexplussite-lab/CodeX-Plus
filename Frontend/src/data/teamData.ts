export interface FullTeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  location: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const ALL_TEAM_MEMBERS: FullTeamMember[] = [
  {
    id: 'aiden-mercer',
    name: 'Aiden Mercer',
    role: 'Creative Director & Founder',
    specialty: 'Brand Architecture & Dark Luxury UI',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    bio: 'Pioneered the dark-luxury aesthetic at CODEXX PLUS. Former principal designer at European design labs.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'sophia-lindqvist',
    name: 'Sophia Lindqvist',
    role: 'Lead AI Architect',
    specialty: 'Enterprise LLM & Agentic Workflows',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    bio: 'PhD in Distributed Systems. Leads multi-agent deterministic pipelines and autonomous workflow engineering.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Principal Product Designer',
    specialty: 'Design Systems & Motion Tokens',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    bio: 'Designs living design token systems and high-throughput component ecosystems for tier-1 web platforms.',
    location: 'London Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'alexander-reid',
    name: 'Alexander Reid',
    role: 'Founder & Managing Partner',
    specialty: 'Executive Strategy & Capital Advisory',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    bio: 'Serial technology entrepreneur. Oversees studio partnerships, enterprise relationships, and strategic investments.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Head of Engineering',
    specialty: 'Full-Stack Edge Infrastructure',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
    bio: '14+ years architecting zero-downtime distributed platforms and low-latency cloud data engines.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'zara-al-mansoor',
    name: 'Zara Al-Mansoor',
    role: 'Motion & 3D Lead',
    specialty: 'WebGL Shaders & Spatial Interfaces',
    image:
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80',
    bio: 'WebGL pioneer crafting GPU-accelerated interactive canvas scenes and bespoke GLSL shaders.',
    location: 'Dubai Hub',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    id: 'kai-takahashi',
    name: 'Kai Takahashi',
    role: 'Lead Cloud Architect',
    specialty: 'Distributed Infrastructure & SOC2',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    bio: 'Expert in Kubernetes orchestration, isolated sandbox environments, and global multi-region failover.',
    location: 'San Francisco',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'liam-chen',
    name: 'Liam Chen',
    role: 'Systems Security Lead',
    specialty: 'Deterministic Security & Threat Modeling',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    bio: 'Audits cryptography boundaries, zero-trust architectures, and secure enclave execution.',
    location: 'London Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    role: 'Head of Brand Strategy',
    specialty: 'Narrative Positioning & Omnichannel Growth',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    bio: 'Orchestrates enterprise market positioning and founder-led content engines that generate multi-million pipeline.',
    location: 'San Francisco',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'david-keller',
    name: 'David Keller',
    role: 'Principal AI Systems Engineer',
    specialty: 'Fine-Tuning & Vector Retrieval',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    bio: 'Builds low-latency semantic caching and high-accuracy RAG architectures for enterprise knowledge bases.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Head of Product Strategy',
    specialty: 'Roadmap Execution & KPI Architecture',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80',
    bio: 'Aligns technical milestones with executive business outcomes, ensuring every sprint impacts bottom-line ROI.',
    location: 'London Hub',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'lucas-silva',
    name: 'Lucas Silva',
    role: 'Senior WebGL & 3D Engineer',
    specialty: 'Three.js, OGL & Performance Shaders',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
    bio: 'Masters 60fps mobile WebGL rendering, instanced geometry, and seamless reactive micro-interactions.',
    location: 'San Francisco',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'julian-croft',
    name: 'Julian Croft',
    role: 'VP of Autonomous Systems',
    specialty: 'Agentic Workflows & Multi-Agent Swarms',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    bio: 'Oversees distributed autonomous orchestration, fault-tolerant consensus, and edge inference loops.',
    location: 'Zurich Hub',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: 'helena-rostova',
    name: 'Helena Rostova',
    role: 'Lead Spatial Computing Architect',
    specialty: 'Spatial UI & Neural Radiance Fields',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    bio: 'Specializes in realtime spatial interfaces, NeRF volumetric rendering, and immersive canvas ecosystems.',
    location: 'London Hub',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'nicolette-dubois',
    name: 'Nicolette Dubois',
    role: 'Principal Cryptographic Engineer',
    specialty: 'Zero-Knowledge Proofs & Determinism',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    bio: 'Researches zero-knowledge rollups, verifiable state machines, and post-quantum encryption protocols.',
    location: 'San Francisco',
    socials: { linkedin: '#', github: '#' },
  },
];
