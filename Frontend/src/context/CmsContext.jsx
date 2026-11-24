import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_CMS_DATA = {
  // Global Branding & Hubs
  brand: {
    siteName: 'CODEXX+',
    tagline: 'AI Innovation & Craft',
    headerBadge: 'Trusted by 500+ enterprises worldwide · 99.98% reliability',
    primaryEmail: 'contact@codexplus.site',
    phone: '+1 (415) 890-CODEX',
    sfAddress: '555 Mission St, Financial District, CA 94105',
    zurichAddress: 'Gotthardstrasse 26, 8002 Zürich, Switzerland',
    copyright: 'All rights reserved © 2026 CODEXX PLUS. Next-Generation AI Innovation.',
    slaResponse: 'Guaranteed principal architect response under 24 hours.',
  },

  // Hero Section
  hero: {
    badge: 'Trusted by 500+ enterprises worldwide · 99.98% reliability',
    titleLine1: 'Next-Generation',
    titleHighlight: 'AI Innovation',
    titleLine2: '& Digital Solutions',
    description: 'Harness powerful artificial intelligence to streamline workflows, unlock actionable insights, and drive sustainable growth with a secure, enterprise-ready platform built for the future.',
    ctaPrimary: 'Schedule 15-Min Discovery',
    ctaSecondary: 'Explore Capabilities',
    footerPill: 'Driven By Smart Innovation & Deep Craft',
  },

  // About & Studio Philosophy
  about: {
    sectionBadge: 'Studio Philosophy & Pillars',
    quote: '“At CODEXX PLUS, we treat code as digital architecture. Beyond simple chatbots, we engineer deterministic multi-agent workflows, bespoke obsidian design systems, and real-time inference pipelines that eliminate operational friction at scale.”',
    founderName: 'Alexander Reid',
    founderRole: 'Founder & Managing Partner',
    founderExp: '15+ Years Enterprise Experience',
    founderImage: '/assets/a3-author-1.webp',
    stats: [
      { label: 'Uptime & Production SLA', value: '99.98%' },
      { label: 'Enterprise Value Influenced', value: '$420M+' },
      { label: 'Deterministic Deployments', value: '30+' },
      { label: 'Global Flagship Hubs', value: '4 Hubs' },
    ],
    pillars: [
      {
        num: '01',
        title: 'Deterministic AI Systems',
        subtitle: 'Zero Hallucination Engineering',
        desc: 'We construct hardened multi-agent LLM DAG networks with strict programmatic fallback mechanisms, deterministic schema enforcement, and zero-data-retention isolation.',
        tags: ['Autonomous Agents', 'RAG Pipelines', 'Vector Synthesis'],
      },
      {
        num: '02',
        title: 'Obsidian Design Architecture',
        subtitle: 'Dark-Luxury Token Systems',
        desc: 'Every pixel is governed by mathematical design tokens. We choreograph custom GPU shaders, typography hierarchies, and tactile micro-interactions.',
        tags: ['Token Architecture', 'Shader Choreography', 'Spatial UX'],
      },
      {
        num: '03',
        title: 'High-Throughput Cloud Backends',
        subtitle: 'Sub-30ms Global Edge Latency',
        desc: 'High-performance cloud platforms built on distributed edge networks and lightweight typed backends for millions of concurrent requests.',
        tags: ['Distributed Edge', 'TypeScript & Rust', 'SOC2 Compliance'],
      },
    ],
  },

  // Capabilities & Services
  services: {
    sectionBadge: 'Our Capabilities & Disciplines',
    title: 'What We Offer',
    subtitle: 'End-to-end digital solutions designed to elevate your brand, scale your business, and drive real results.',
    items: [
      {
        id: 'development',
        num: '01',
        title: 'Development',
        tag: 'Full-Stack & AI',
        desc: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
        tags: ['Next.js 15', 'Autonomous LLMs', 'Cloud Infrastructure', 'GPU Shaders'],
        image: '/assets/p3-img-2.webp',
        badge: 'Bespoke Engineering',
      },
      {
        id: 'graphics-design',
        num: '02',
        title: 'Graphics Design',
        tag: 'Visual Identity',
        desc: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
        tags: ['Design Tokens', 'Brand Guidelines', 'Luxury Identity', 'Spatial UX'],
        image: '/assets/s3-img-1.webp',
        badge: 'Visual Prestige',
      },
      {
        id: 'video-editing',
        num: '03',
        title: 'Video Editing',
        tag: 'Motion & Post',
        desc: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
        tags: ['Interactive 3D', 'WebGL Motion', 'Product Keynotes', 'Sound Design'],
        image: '/assets/p3-img-3.webp',
        badge: 'Motion & 3D',
      },
      {
        id: 'social-media-marketing',
        num: '04',
        title: 'Social Media Marketing',
        tag: 'Growth Engine',
        desc: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
        tags: ['Executive Positioning', 'Pipeline Growth', 'Omnichannel Strategy'],
        image: '/assets/p3-img-4.webp',
        badge: 'Strategic Growth',
      },
      {
        id: 'seo-geo',
        num: '05',
        title: 'SEO / GEO',
        tag: 'Search & AI Discovery',
        desc: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery (Perplexity, ChatGPT, Gemini).',
        tags: ['Generative Engine (GEO)', 'Algorithmic SEO', 'Structured Citations'],
        image: '/assets/p3-img-5.webp',
        badge: 'AI Discovery',
      },
    ],
  },

  // Architects & Team
  team: {
    sectionBadge: 'Studio Architects & Leads',
    title: 'Our Core Team',
    subtitle: 'Specialized engineering architects, AI researchers, and luxury product designers building deterministic software systems.',
    fellowshipEmail: 'careers@codexplus.site',
    fellowshipTitle: 'Join the Principal Architecture Bench',
    fellowshipDesc: 'We offer top-percentile equity, sovereign flexibility, and direct ownership of high-impact platforms for senior distributed systems engineers.',
    members: [
      {
        id: 'team-1',
        name: 'Alexander Reid',
        role: 'Founder & Managing Partner',
        specialty: 'High-Throughput Systems & Cloud',
        location: 'San Francisco, CA',
        image: '/assets/t3-img-1.webp',
        bio: 'Former principal systems architect with 15+ years engineering high-concurrency cloud backends and venture-backed platforms.',
      },
      {
        id: 'team-2',
        name: 'Helena Rostova',
        role: 'Creative Director & Founder',
        specialty: 'Dark Luxury Tokens & Brand Systems',
        location: 'Zürich, Switzerland',
        image: '/assets/t3-img-2.webp',
        bio: 'Leading digital luxury product designer sculpting authoritative token systems, typography hierarchies, and tactile micro-interactions.',
      },
      {
        id: 'team-3',
        name: 'Marcus Thorne',
        role: 'Principal AI Systems Engineer',
        specialty: 'LLM Orchestration & Autonomous Agents',
        location: 'San Francisco, CA',
        image: '/assets/t3-img-3.webp',
        bio: 'Specialist in multi-agent DAG architectures, vector embeddings, fine-tuning, and zero-retention enterprise inference isolation.',
      },
      {
        id: 'team-4',
        name: 'Maya Patel',
        role: 'Head of Product Strategy',
        specialty: 'Enterprise Architecture & User Psychology',
        location: 'London, UK',
        image: '/assets/t3-img-4.webp',
        bio: 'Bridges complex technical capabilities with enterprise business models, driving product-led growth and high-conversion UX flows.',
      },
      {
        id: 'team-5',
        name: 'Kai Takahashi',
        role: 'Senior WebGL & 3D Engineer',
        specialty: 'GPU Shaders, Three.js & Spatial UX',
        location: 'Tokyo / Remote',
        image: '/assets/t3-img-5.webp',
        bio: 'Pioneering mathematical GLSL shader algorithms and lightweight Three.js choreographies that run at 60fps.',
      },
      {
        id: 'team-6',
        name: 'Liam Chen',
        role: 'Lead Cloud Architect',
        specialty: 'Distributed Edge & Zero-Trust Security',
        location: 'San Francisco, CA',
        image: '/assets/t3-img-6.webp',
        bio: 'Specialist in low-latency global CDN edge routing, microservice containers, and SOC2 compliance.',
      },
      {
        id: 'team-7',
        name: 'Amara Okafor',
        role: 'Principal Product Designer',
        specialty: 'Component Libraries & Editorial Design',
        location: 'Zürich, Switzerland',
        image: '/assets/t3-img-7.webp',
        bio: 'Designs scalable, type-safe frontend UI component libraries that merge editorial luxury aesthetics with uncompromising usability.',
      },
      {
        id: 'team-8',
        name: 'Julian Croft',
        role: 'Lead Spatial Computing Architect',
        specialty: 'Hardware Interfaces & WebGL Labs',
        location: 'New York, NY',
        image: '/assets/author-4.webp',
        bio: 'Researches emerging multimodal generative models and spatial UX paradigms for experimental prototyping.',
      },
    ],
  },

  // Pricing & Investment Tiers
  pricing: {
    sectionBadge: 'Predictable Investment',
    title: 'Investment Tiers & Sprints',
    subtitle: 'Predictable pricing for venture-backed startups, high-growth scaleups, and global enterprises. No proxy managers, zero junior bloat.',
    customBannerTitle: 'Need a Custom Enterprise Architecture?',
    customBannerDesc: 'We architect bespoke dedicated studio retainer squads, private on-premise LLM inference clusters, and high-concurrency event platforms for global technology leaders.',
    tiers: [
      {
        id: 'tier-1',
        name: 'Flagship Sprint',
        badge: 'Rapid Launch',
        price: '$25,000+',
        period: 'per sprint',
        timeline: '3–4 Weeks Delivery',
        description: 'Ideal for venture-backed startups and established firms needing a rapid, breathtaking brand overhaul or standalone digital product launch.',
        features: [
          'Comprehensive Luxury Dark UI/UX Design System',
          'Full-Stack Next.js 15 / Vite Web Platform',
          'Interactive 3D Motion & WebGL Choreography',
          'Core Web Vitals 95+ Mobile & Desktop Score',
          'Complete SEO & OpenGraph Asset Kit',
          'Direct Principal Architect Access',
        ],
        popular: false,
        ctaText: 'Select Flagship Sprint',
      },
      {
        id: 'tier-2',
        name: 'Enterprise Architecture',
        badge: 'Most Comprehensive',
        price: '$60,000+',
        period: 'per engagement',
        timeline: '6–8 Weeks Delivery',
        description: 'Our end-to-end flagship engagement combining complex full-stack web platforms with custom autonomous AI workflows and 3D WebGL experiences.',
        features: [
          'Everything in Flagship Sprint',
          'Custom Multi-Agent LLM DAG Orchestration',
          'Private Retrieval-Augmented Generation (RAG)',
          'High-Throughput Global Edge Microservices',
          'Full SOC2 & GDPR Security Architecture',
          'Comprehensive Design Tokens & Token Manual',
          '100% Unconditional Intellectual Property Transfer',
        ],
        popular: true,
        ctaText: 'Select Enterprise Architecture',
      },
      {
        id: 'tier-3',
        name: 'Dedicated Studio Retainer',
        badge: 'Continuous Velocity',
        price: '$18,000',
        period: 'per month',
        timeline: '6-Month Commitment',
        description: 'Direct ongoing fractional architecture partnership for venture-backed enterprises scaling high-throughput software and visual systems.',
        features: [
          'Guaranteed 160+ Monthly Engineering Hours',
          'Direct Slack / Discord Access to Principal Architects',
          'Weekly Production Release Sprints & Reviews',
          'Continuous Feature Engineering & AI Model Tuning',
          'Dedicated Priority 4-Hour Urgent SLA Response',
          'Bespoke Design Token Iterations & Asset Kits',
        ],
        popular: false,
        ctaText: 'Inquire For Retainer',
      },
    ],
  },

  // Selected Projects Showcase
  projects: {
    sectionBadge: 'Selected Deployments',
    title: 'Featured Client Works',
    subtitle: 'A curated selection of deterministic software platforms, generative AI workflows, and visual identities crafted for global pioneers.',
    items: [
      {
        id: 'owl',
        title: 'OWL AI Systems',
        category: 'AI Systems',
        tag: '{ Full-Stack & AI }',
        year: '2025',
        image: '/assets/p3-img-2.webp',
        desc: 'Bespoke multi-agent cognitive architecture with sub-millisecond real-time inference pipelines, fine-tuned retrieval engines, and dark-luxury executive dashboard.',
        client: 'OWL Neural Labs',
        role: 'Autonomous AI Orchestration & Full-Stack Platform',
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
        role: 'Cloud Architecture & Next.js 15 Platform',
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
        role: 'Brand Tokens & Headless Commerce',
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
        role: 'Interactive WebGL & Neural Telemetry',
      },
    ],
  },

  // FAQs
  faqs: {
    sectionBadge: 'Technical FAQs',
    title: 'Frequently Asked Questions',
    items: [
      {
        id: 'faq-1',
        q: 'What distinguishes CODEXX PLUS from typical digital agencies?',
        a: 'We operate as an elite engineering and design architecture lab. You work directly with principal architects—not account managers or junior proxies. We engineer deterministic multi-agent AI workflows, bespoke WebGL shaders, zero-layout-shift frontends, and high-throughput cloud backends built for enterprise scale.',
      },
      {
        id: 'faq-2',
        q: 'How does your 4-stage engagement methodology work?',
        a: 'Our framework spans 4 deterministic phases: 1) Discovery & System Blueprinting, 2) Interactive Prototyping & Shaders, 3) Production Engineering & AI Pipelines, and 4) Global Deployment & Observability SLA.',
      },
      {
        id: 'faq-3',
        q: 'What is Generative Engine Optimization (GEO)?',
        a: 'GEO is next-generation discovery optimization engineered to ensure your company and product offerings are accurately synthesized, cited, and recommended by generative AI engines (Perplexity, ChatGPT, Claude, and Gemini) alongside traditional algorithmic Google ranking.',
      },
      {
        id: 'faq-4',
        q: 'What pricing plans and engagement models do you offer?',
        a: 'We offer three transparent structures: Flagship Sprint ($25,000+ for 3–4 week rapid brand & digital product launches), Enterprise Architecture ($60,000+ for end-to-end full-stack platforms with autonomous AI pipelines), and Dedicated Studio Retainer ($18,000/mo for 160+ guaranteed hours of senior architectural velocity).',
      },
      {
        id: 'faq-5',
        q: 'How do we schedule a discovery call and begin?',
        a: 'Submit your project details using the inquiry form or schedule a direct 15-minute introductory call. We evaluate technical feasibility, target psychology, and architectural alignment within 24 hours. We only take on 3 to 4 flagship enterprise engagements simultaneously.',
      },
    ],
  },

  // Testimonials / Client Stories
  testimonials: {
    sectionBadge: 'Institutional Validation',
    title: 'Client Stories & Feedback',
    items: [
      {
        id: 'test-1',
        name: 'Dr. Aris Thorne',
        role: 'Chief Technology Officer',
        company: 'Hyperion Neural Systems (Zurich)',
        quote: 'CODEXX PLUS delivered a level of technical depth we thought was impossible in a 6-week sprint. Their multi-agent LLM framework operates with zero hallucinations and our latency dropped from 140ms to under 28ms globally.',
        avatar: '/assets/t3-img-1.webp',
        metric: '-80% Global Latency',
      },
      {
        id: 'test-2',
        name: 'Veronica Sterling',
        role: 'Managing Partner',
        company: 'Vanguard Horizon Capital (San Francisco)',
        quote: 'Working with Alexander Reid and his engineering leads was transformative. No junior fluff, no endless committee reviews. They wrote the code, deployed the shaders, and transferred 100% of the IP to our repo ahead of schedule.',
        avatar: '/assets/t3-img-2.webp',
        metric: '100% IP Transfer',
      },
      {
        id: 'test-3',
        name: 'Siddharth Mehta',
        role: 'Founder & CEO',
        company: 'Vesper Spatial Studio (Singapore)',
        quote: 'Our conversion jumped 68% after launching the new dark-luxury visual identity and interactive 3D shaders. They don’t just build software; they engineer digital dominance.',
        avatar: '/assets/t3-img-3.webp',
        metric: '+68% Conversion',
      },
    ],
  },

  // Payment Policy Page
  paymentPolicy: {
    title: 'Payment Policy & Financial Framework',
    badge: 'Legal & Financial Governance',
    subtitle: 'Transparent, predictable settlement schedules engineered for institutional clarity and intellectual property protection.',
    sections: [
      {
        num: '1',
        title: 'Engagement Models & Billing Schedules',
        content: 'All architectural sprints and dedicated studio retainers are conducted under transparent milestone schedules. Sprints typically follow a 50/50 model (50% mobilization deposit upon execution of contract, 50% upon final production deployment). Monthly Studio Retainers are invoiced net-15 on the 1st of each calendar month.',
      },
      {
        num: '2',
        title: 'Accepted Settlement Currencies & Gateways',
        content: 'We accept domestic and international wire transfers via SWIFT, SEPA, and Fedwire. Institutional credit card and ACH disbursements are securely processed through Stripe. For global venture clients, settlement in USDC or USDT stablecoins is permitted under prior treasury approval.',
      },
      {
        num: '3',
        title: 'Intellectual Property Assignment',
        content: 'Upon full financial settlement of all milestone disbursements, 100% of all intellectual property, source code, Git repositories, Figma design token systems, and trained machine learning weights unconditionally transfer to the client.',
      },
      {
        num: '4',
        title: 'Refund & Cancellation Protocols',
        content: 'Due to the bespoke nature of our engineering team allocations, mobilization deposits are non-refundable once architectural sprint work commences. If an engagement is terminated before completion, fees are prorated to verified work delivered.',
      },
    ],
  },

  // Privacy Policy Page
  privacyPolicy: {
    title: 'Terms of Engagement & Privacy Policy',
    badge: 'Legal & Data Compliance',
    subtitle: 'Deterministic data isolation, zero-retention artificial intelligence protocols, and strict mutual non-disclosure.',
    sections: [
      {
        num: '1',
        title: 'Zero-Retention AI Data Policy',
        content: 'We strictly mandate zero-retention inference APIs. Proprietary client code, intellectual property, and system data are never used to train public or foundational models. All LLM endpoints operate with enterprise opt-outs enabled.',
      },
      {
        num: '2',
        title: 'Strict Mutual Non-Disclosure',
        content: 'Every potential engagement and scoping call is governed by our mutual non-disclosure covenant. We hold architecture blueprints, business models, and trade secrets in absolute perpetual confidentiality.',
      },
      {
        num: '3',
        title: 'SOC2 Type II & GDPR Security Standards',
        content: 'Our cloud architectures adhere to SOC2 Type II, ISO 27001, and GDPR compliance standards. We employ 256-bit AES encryption at rest and TLS 1.3 in transit with end-to-end cryptographic audit trails.',
      },
      {
        num: '4',
        title: 'Governing Law & Jurisdiction',
        content: 'Agreements with CODEXX PLUS are governed in accordance with the laws of the State of Delaware (USA) for North American operations, and the Canton of Zürich for European engagements.',
      },
    ],
  },
};

const CmsContext = createContext({
  content: DEFAULT_CMS_DATA,
  loading: false,
  updateContent: async () => {},
  refreshContent: async () => {},
});

export function CmsProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(true);

  const fetchCmsData = async () => {
    try {
      const res = await fetch('/api/cms');
      const data = await res.json().catch(() => null);
      if (data?.success && data?.data && typeof data.data === 'object') {
        setContent((prev) => deepMerge(prev, data.data));
      }
    } catch {
      // Fallback to in-memory defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsData();
  }, []);

  const updateContent = async (newCmsPayload) => {
    setContent((prev) => deepMerge(prev, newCmsPayload));
    try {
      await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCmsPayload),
      });
    } catch (err) {
      console.error('Failed to sync CMS to backend:', err);
    }
  };

  return (
    <CmsContext.Provider value={{ content, loading, updateContent, refreshContent: fetchCmsData }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  return useContext(CmsContext);
}

// Deep merge helper so partial updates in admin panel seamlessly merge with existing data
function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
