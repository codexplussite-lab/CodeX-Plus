import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'database.json');

// Ensure data folder exists
if (!fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Initial seed data from codexplus.site
const initialData = {
  admin: {
    username: 'admin@codexplus.site',
    password: 'password123', // Demo password
    name: 'Alexander Reid (Principal)',
    role: 'Administrator',
  },
  settings: {
    siteName: 'CODEXX PLUS',
    tagline: 'Next-Generation AI Innovation & Digital Solutions',
    email: 'contact@codexplus.site',
    phone: '+1 (415) 890-CODEX',
    reliability: '99.98% platform reliability',
    enterprises: '500+ enterprises worldwide',
    hubs: [
      { city: 'San Francisco', address: '555 Mission St, Financial District, CA 94105' },
      { city: 'Zürich', address: 'Gotthardstrasse 26, 8002 Zürich, Switzerland' }
    ]
  },
  inquiries: [
    {
      id: 'inq-1',
      name: 'Julian Mercer',
      email: 'julian@northstarcloud.com',
      company: 'Northstar Cloud',
      service: 'Development',
      budget: '$60,000+',
      message: 'Looking to architect a deterministic autonomous multi-agent pipeline with WebGL telemetry.',
      status: 'Contacted',
      createdAt: '2026-11-20T10:30:00Z',
    },
    {
      id: 'inq-2',
      name: 'Sophia Lindqvist',
      email: 'sophia@nordicsystems.io',
      company: 'Nordic Systems',
      service: 'Graphics Design',
      budget: '$25,000+',
      message: 'Need a dark-luxury design token overhaul and complete brand guidelines for Series B.',
      status: 'Pending',
      createdAt: '2026-11-22T14:15:00Z',
    }
  ],
  subscribers: [
    { id: 'sub-1', email: 'architect@enterprise.io', subscribedAt: '2026-11-18T09:12:00Z' },
    { id: 'sub-2', email: 'alex@luminalabs.ai', subscribedAt: '2026-11-21T16:45:00Z' },
    { id: 'sub-3', email: 'marcus@morheme.tech', subscribedAt: '2026-11-22T11:20:00Z' }
  ],
  services: [
    {
      id: 'development',
      num: '01',
      title: 'Development',
      tag: 'Full-Stack & AI',
      desc: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
      tags: ['Next.js 15', 'Autonomous LLMs', 'Cloud Infrastructure', 'GPU Shaders'],
      image: '/assets/p3-img-2.webp',
      badge: 'Bespoke Engineering'
    },
    {
      id: 'graphics-design',
      num: '02',
      title: 'Graphics Design',
      tag: 'Visual Identity',
      desc: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
      tags: ['Design Tokens', 'Brand Guidelines', 'Luxury Identity', 'Spatial UX'],
      image: '/assets/s3-img-1.webp',
      badge: 'Visual Prestige'
    },
    {
      id: 'video-editing',
      num: '03',
      title: 'Video Editing',
      tag: 'Motion & Post',
      desc: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
      tags: ['Interactive 3D', 'WebGL Motion', 'Product Keynotes', 'Sound Design'],
      image: '/assets/p3-img-3.webp',
      badge: 'Motion & 3D'
    },
    {
      id: 'social-media-marketing',
      num: '04',
      title: 'Social Media Marketing',
      tag: 'Growth Engine',
      desc: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
      tags: ['Executive Positioning', 'Pipeline Growth', 'Omnichannel Strategy', 'Analytics'],
      image: '/assets/p3-img-4.webp',
      badge: 'Strategic Growth'
    },
    {
      id: 'seo-geo',
      num: '05',
      title: 'SEO / GEO',
      tag: 'Search & AI Discovery',
      desc: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery (Perplexity, ChatGPT, Gemini) worldwide.',
      tags: ['Generative Engine (GEO)', 'Algorithmic SEO', 'Structured Citations', 'Authority Indexing'],
      image: '/assets/p3-img-5.webp',
      badge: 'AI Discovery'
    }
  ],
  projects: [
    {
      id: 'owl',
      title: 'OWL AI Systems',
      category: 'AI Systems',
      tag: '{ Full-Stack & AI }',
      year: '2025',
      image: '/assets/p3-img-2.webp',
      desc: 'Bespoke multi-agent cognitive architecture with sub-millisecond real-time inference pipelines, fine-tuned retrieval engines, and dark-luxury executive dashboard.',
      client: 'OWL Neural Labs',
      role: 'Autonomous AI Orchestration & Full-Stack Platform'
    },
    {
      id: 'morheme',
      title: 'Morheme Tech',
      category: 'Development',
      tag: '{ Enterprise Cloud }',
      year: '2025',
      image: '/assets/p3-img-3.webp',
      desc: 'High-throughput cloud observability portal engineered with real-time telemetry, zero-trust cryptographic security boundaries, and GPU-accelerated network visualizers.',
      client: 'Morheme Enterprise',
      role: 'Cloud Architecture & Next.js 15 Platform'
    },
    {
      id: 'zainab',
      title: 'Zainab Bees',
      category: 'Visual Identity',
      tag: '{ Luxury Brand & Commerce }',
      year: '2025',
      image: '/assets/p3-img-4.webp',
      desc: 'Cinematic visual storytelling, authoritative packaging guidelines, and custom dark-luxury design tokens powering an international organic collective.',
      client: 'Zainab Bees Global',
      role: 'Brand Tokens & Headless Commerce'
    },
    {
      id: 'lumina',
      title: 'Lumina Labs',
      category: 'AI Systems',
      tag: '{ Neural Ops }',
      year: '2025',
      image: '/assets/p3-img-5.webp',
      desc: 'Interactive 3D WebGL motion graphics and real-time model evaluation sandbox for enterprise artificial intelligence researchers.',
      client: 'Lumina Intelligence',
      role: 'Interactive WebGL & Neural Telemetry'
    },
    {
      id: 'veritas',
      title: 'Veritas Capital',
      category: 'Development',
      tag: '{ FinTech Architecture }',
      year: '2025',
      image: '/assets/p3-img-6.webp',
      desc: 'High-frequency algorithmic order routing and portfolio simulation platform built with zero-layout-shift frontends and SOC2-ready security.',
      client: 'Veritas Financial',
      role: 'Institutional Trading UI & High-Throughput API'
    },
    {
      id: 'apex',
      title: 'Apex Cloud Intelligence',
      category: 'Motion & 3D',
      tag: '{ Motion & Post }',
      year: '2025',
      image: '/assets/p1-img-1.webp',
      desc: 'World-class product keynote film, GPU shader animations, and Generative Engine Optimization (GEO) rollout that accelerated Series B funding.',
      client: 'Apex Intelligence',
      role: 'Keynote Film & Generative Engine Optimization'
    }
  ],
  team: [
    {
      id: 'team-1',
      name: 'Alexander Reid',
      role: 'Founder & Managing Partner',
      image: '/assets/t3-img-1.webp',
      specialty: 'High-Throughput Systems & Cloud',
      location: 'San Francisco'
    },
    {
      id: 'team-2',
      name: 'Helena Rostova',
      role: 'Creative Director & Founder',
      image: '/assets/t3-img-2.webp',
      specialty: 'Dark Luxury Tokens & Brand Systems',
      location: 'Zürich'
    },
    {
      id: 'team-3',
      name: 'Marcus Thorne',
      role: 'Principal AI Systems Engineer',
      image: '/assets/t3-img-3.webp',
      specialty: 'LLM Orchestration & Autonomous Agents',
      location: 'San Francisco'
    },
    {
      id: 'team-4',
      name: 'Maya Patel',
      role: 'Head of Product Strategy',
      image: '/assets/t3-img-4.webp',
      specialty: 'Enterprise Architecture & User Psychology',
      location: 'London'
    },
    {
      id: 'team-5',
      name: 'Kai Takahashi',
      role: 'Senior WebGL & 3D Engineer',
      image: '/assets/t3-img-5.webp',
      specialty: 'GPU Shaders, Three.js & Spatial UX',
      location: 'Tokyo'
    },
    {
      id: 'team-6',
      name: 'Liam Chen',
      role: 'Lead Cloud Architect',
      image: '/assets/t3-img-6.webp',
      specialty: 'Distributed Edge & Zero-Trust Security',
      location: 'San Francisco'
    },
    {
      id: 'team-7',
      name: 'Amara Okafor',
      role: 'Principal Product Designer',
      image: '/assets/t3-img-7.webp',
      specialty: 'Component Libraries & Editorial Design',
      location: 'Zürich'
    },
    {
      id: 'team-8',
      name: 'Julian Croft',
      role: 'Lead Spatial Computing Architect',
      image: '/assets/author-4.webp',
      specialty: 'Hardware Interfaces & WebGL Labs',
      location: 'San Francisco'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Ashley Cole',
      role: 'Teacher & Researcher at Stanford',
      company: 'Stanford University',
      avatar: '/assets/author-1.webp',
      quote: "Super easy to use and actually works! I've already recommended it to a few friends. The deterministic AI workflows saved our faculty countless hours of manual overhead.",
      rating: 5
    },
    {
      id: 'test-2',
      name: 'Marcus Vance',
      role: 'Founder at Morheme Tech',
      company: 'Morheme Tech',
      avatar: '/assets/author-2.webp',
      quote: "Their AI workflow automation cut our manual reporting time by 70% within the very first month. Flawless execution, zero bloat, and dependable architectural integrity.",
      rating: 5
    },
    {
      id: 'test-3',
      name: 'Elena Rostova',
      role: 'Product Lead at OWL',
      company: 'OWL Neural Systems',
      avatar: '/assets/author-3.webp',
      quote: "Rare blend of dark-luxury visual craft and rock-solid engineering. Every milestone shipped ahead of schedule. Our enterprise user engagement jumped by 65%.",
      rating: 5
    },
    {
      id: 'test-4',
      name: 'David Chen',
      role: 'Director of Ops at Lumina',
      company: 'Lumina Labs',
      avatar: '/assets/author-5.webp',
      quote: "From brand identity tokens to full-stack delivery, CODEXX PLUS transformed how our enterprise clients perceive us. Truly a standout digital architecture partner.",
      rating: 5
    },
    {
      id: 'test-5',
      name: 'Nadia Karim',
      role: 'CEO at Zainab Bees',
      company: 'Zainab Bees Global',
      avatar: '/assets/author-6.webp',
      quote: "Thoughtful communication, sharp strategy, and measurable ROI across both web conversion and Generative Engine Optimization (GEO).",
      rating: 5
    }
  ],
  blogs: [
    {
      id: 'blog-1',
      title: 'The Rise of Generative Engine Optimization (GEO): Securing Discovery in the Age of LLMs',
      date: 'May 17, 2025',
      readTime: '6 min read',
      category: 'AI & Search Strategy',
      image: '/assets/b3-img-1.webp',
      excerpt: 'Traditional Google SEO is no longer sufficient. Explore how structuring your data tokens and knowledge graph citations ensures Perplexity, ChatGPT, and Gemini cite your brand authoritative.'
    },
    {
      id: 'blog-2',
      title: 'Deterministic Multi-Agent Workflows: Moving Beyond Hallucinating Enterprise Chatbots',
      date: 'April 22, 2025',
      readTime: '8 min read',
      category: 'Systems Architecture',
      image: '/assets/b3-img-2.webp',
      excerpt: 'Why enterprise autonomy requires rigid state validation, cryptographic audit boundaries, and multi-agent consensus protocols to replace brittle single-prompt implementations.'
    },
    {
      id: 'blog-3',
      title: 'The Dark Luxury Design Language: Why High-Prestige Software Wins Enterprise Deals',
      date: 'March 14, 2025',
      readTime: '5 min read',
      category: 'Design Systems',
      image: '/assets/b3-img-3.webp',
      excerpt: 'Enterprise software does not have to feel like a bland spreadsheet. Deep obsidian surfaces, subtle specular highlights, and commanding typography build instant investor prestige.'
    }
  ]
};

export function getDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(initialData);
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database, restoring initial:', err);
    saveDB(initialData);
    return initialData;
  }
}

export function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
