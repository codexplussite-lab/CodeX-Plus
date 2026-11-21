import { createContext } from 'react';
import {
  SERVICES as DEFAULT_SERVICES,
  CLIENT_LOGOS as DEFAULT_LOGOS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  type ServiceItem,
  type ClientLogo,
  type TestimonialItem,
} from '../data/siteData';
import { ALL_TEAM_MEMBERS, type FullTeamMember } from '../data/teamData';

export interface CmsBrand {
  siteName: string;
  brandAccent: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  footerDescription: string;
  copyrightYear: string;
}

export interface CmsHeroContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badgeText: string;
  bottomLeftText: string;
}

export interface CmsAboutPillar {
  step: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface CmsAboutMilestone {
  year: string;
  badge: string;
  title: string;
  desc: string;
}

export interface CmsAboutContent {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  statement: string;
  paragraph1: string;
  paragraph2: string;
  officeBadge: string;
  stats: Array<{ value: string; label: string; sub: string }>;
  pillars: CmsAboutPillar[];
  milestones: CmsAboutMilestone[];
}

export interface CmsTeamPrinciple {
  title: string;
  description: string;
}

export interface CmsGlobalHub {
  city: string;
  address: string;
  hours: string;
  phone: string;
}

export interface CmsFaq {
  q: string;
  a: string;
}

export interface CmsContactInfo {
  email: string;
  phoneAmericas: string;
  phoneEurope: string;
  sfAddress: string;
  zurichAddress: string;
  londonAddress: string;
  dubaiAddress: string;
  globalHubs: CmsGlobalHub[];
  faqs: CmsFaq[];
}

export interface CmsData {
  brand: CmsBrand;
  hero: CmsHeroContent;
  about: CmsAboutContent;
  services: ServiceItem[];
  team: FullTeamMember[];
  teamPrinciples: CmsTeamPrinciple[];
  testimonials: TestimonialItem[];
  clientLogos: ClientLogo[];
  contact: CmsContactInfo;
}

export const DEFAULT_CMS_DATA: CmsData = {
  brand: {
    siteName: 'CODEXX',
    brandAccent: 'PLUS',
    tagline: 'Autonomous Intelligence & Digital Luxury',
    contactEmail: 'Info@codexplus.site',
    contactPhone: '+1 (555) 839-2041',
    footerDescription:
      'Architecting next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.',
    copyrightYear: '2026',
  },
  hero: {
    eyebrow: 'Next-Gen Enterprise Intelligence & Craft',
    headline: 'Empower Your Business with Next-Generation AI Innovation',
    subtitle:
      'Harness powerful artificial intelligence to streamline workflows, unlock actionable insights, and drive sustainable growth with a secure, enterprise-ready platform built for the future.',
    ctaPrimary: 'Schedule Discovery',
    ctaSecondary: 'Explore Capabilities',
    badgeText: 'Trusted by 500+ enterprises worldwide · 99.98% platform reliability',
    bottomLeftText: 'Driven By Smart Innovation & Deep Craft',
  },
  about: {
    eyebrow: 'The CODEXX PLUS Studio',
    heroTitle: 'Architecting the intersection of high craft & intelligent compute.',
    heroSubtitle:
      'A distributed collective of senior system architects, product designers, AI researchers, and motion specialists turning complex enterprise challenges into deterministic digital superiority.',
    statement:
      '— We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.',
    paragraph1:
      "With unwavering dedication, we've completed over a hundred remarkable projects across digital platforms, enterprise AI ecosystems, and luxury architectural spaces—blending timeless precision with intelligent engineering.",
    paragraph2:
      'Every solution is crafted around measurable performance, refined human experience, and future-proof scalability—empowering modern enterprises and forward-thinking brands to operate effortlessly.',
    officeBadge: 'Designed for Deep Focus & Architectural Precision',
    stats: [
      { value: '120+', label: 'Flagship Projects Shipped', sub: 'Across 18 Global Verticals' },
      { value: '99.98%', label: 'Infrastructure Reliability', sub: 'Zero-Downtime Architecture' },
      { value: '500+', label: 'Enterprise Partners', sub: 'Trusting Our Digital Craft' },
      { value: '4.9 / 5', label: 'Average Client Rating', sub: 'Based on Verified Engagements' },
    ],
    pillars: [
      {
        step: '01',
        title: 'Architectural Precision',
        description:
          'We treat code as digital architecture. Every component, WebGL shader, and cloud transaction is benchmarked for sub-millisecond execution, flawless accessibility, and fluid responsiveness.',
        highlights: [
          'Micro-interaction choreography',
          'WebGL & GPU-accelerated rendering',
          'Zero-layout-shift architecture',
        ],
      },
      {
        step: '02',
        title: 'Autonomous Intelligence',
        description:
          'Beyond simple chatbots, we engineer deterministic multi-agent workflows, fine-tuned retrieval engines, and real-time inference pipelines that eliminate operational friction at scale.',
        highlights: [
          'Enterprise LLM orchestration',
          'Autonomous data automation',
          'Deterministic security boundaries',
        ],
      },
      {
        step: '03',
        title: 'Dark Luxury Aesthetic',
        description:
          'Enterprise software does not have to feel sterile. We fuse deep obsidian palettes, subtle specular rims, and commanding typography to instill immediate prestige and investor confidence.',
        highlights: [
          'Bespoke design systems',
          'Luxury dark visual identity',
          'High-conversion editorial typography',
        ],
      },
    ],
    milestones: [
      {
        year: '2022',
        badge: 'Genesis',
        title: 'The Elite Architecture Lab',
        desc: 'Founded as a boutique engineering studio specializing in high-throughput reactive interfaces and custom design tokens.',
      },
      {
        year: '2023',
        badge: 'Scale',
        title: 'Global Enterprise Rollouts',
        desc: 'Expanded into Silicon Valley and European financial hubs, completing 45+ flagship product launches and brand redesigns.',
      },
      {
        year: '2024',
        badge: 'Intelligence',
        title: 'The Autonomous Agent Era',
        desc: 'Pioneered custom multi-agent architectures and enterprise automation pipelines for Tier-1 technology companies.',
      },
      {
        year: '2025–2026',
        badge: 'Frontier',
        title: 'Next-Gen Global Footprint',
        desc: 'Deploying real-time WebGL experiences, generative UI systems, and hybrid creative hubs across Zurich, London, and San Francisco.',
      },
    ],
  },
  services: DEFAULT_SERVICES,
  team: ALL_TEAM_MEMBERS,
  teamPrinciples: [
    {
      title: 'Deep Asynchronous Focus',
      description:
        'We eliminate excessive meetings and middle-management bureaucracy. Our architects work in deep, uninterrupted blocks to produce pristine digital craft.',
    },
    {
      title: 'Direct Principal Access',
      description:
        'Clients communicate directly with the senior engineers and design leads who actually author their systems—not account managers or junior proxies.',
    },
    {
      title: 'Zero-Bloat Architectural Rigor',
      description:
        'We reject heavy dependencies and fragile boilerplate. Every component and API route is constructed with strict typed discipline for longevity.',
    },
    {
      title: 'High-Touch Partnership',
      description:
        'We only take on 3 to 4 flagship enterprise engagements simultaneously to ensure undivided attention and unmatched standard of execution.',
    },
  ],
  testimonials: DEFAULT_TESTIMONIALS,
  clientLogos: DEFAULT_LOGOS,
  contact: {
    email: 'Info@codexplus.site',
    phoneAmericas: '+1 (555) 839-2041',
    phoneEurope: '+41 44 211 4890',
    sfAddress: '500 Howard St, Financial District, CA',
    zurichAddress: 'Bahnhofstrasse 45, Tech Core, Switzerland',
    londonAddress: '10 Berkeley Square, Mayfair, London',
    dubaiAddress: 'DIFC Gate Tower, Level 14, Dubai',
    globalHubs: [
      {
        city: 'San Francisco',
        address: '500 Howard St, Financial District',
        hours: 'Mon – Fri: 09:00 – 18:00 PST',
        phone: '+1 (415) 890-3321',
      },
      {
        city: 'Zurich',
        address: 'Bahnhofstrasse 45, Tech Core',
        hours: 'Mon – Fri: 08:30 – 17:30 CET',
        phone: '+41 44 211 4890',
      },
      {
        city: 'London',
        address: '10 Berkeley Square, Mayfair',
        hours: 'Mon – Fri: 09:00 – 18:00 GMT',
        phone: '+44 20 7946 0912',
      },
      {
        city: 'Dubai',
        address: 'DIFC Gate Tower, Level 14',
        hours: 'Sun – Thu: 09:00 – 18:00 GST',
        phone: '+971 4 362 7700',
      },
    ],
    faqs: [
      {
        q: 'What is the typical turnaround timeline for a flagship engagement?',
        a: 'Comprehensive web platforms and brand design sprints typically run 4 to 8 weeks. Enterprise AI integrations and multi-agent systems are delivered in iterative two-week deployment milestones with continuous staging visibility.',
      },
      {
        q: 'Do you execute mutual NDAs prior to discovery?',
        a: 'Yes. Every project discussion can be covered by our standard enterprise mutual non-disclosure agreement or your organization’s proprietary legal framework before any architecture is shared.',
      },
      {
        q: 'How does CODEXX PLUS collaborate with in-house engineering teams?',
        a: 'We operate either as an autonomous end-to-end delivery team or as an embedded specialized sprint squad alongside your CTO and product leads via direct Slack/GitHub workflows.',
      },
      {
        q: 'What are your ongoing support and maintenance commitments?',
        a: 'We provide dedicated SLA-backed infrastructure monitoring, security patching, and proactive performance tuning to guarantee 99.98%+ system availability around the clock.',
      },
    ],
  },
};

export interface CmsContextValue {
  cms: CmsData;
  updateBrand: (brand: Partial<CmsBrand>) => void;
  updateHero: (hero: Partial<CmsHeroContent>) => void;
  updateAbout: (about: Partial<CmsAboutContent>) => void;
  updateContact: (contact: Partial<CmsContactInfo>) => void;
  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  // Team CRUD
  addTeamMember: (member: Omit<FullTeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<FullTeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  // Testimonials CRUD
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  // Brand Logos
  addClientLogo: (logo: Omit<ClientLogo, 'id'>) => void;
  deleteClientLogo: (id: string) => void;
  // FAQs CRUD
  addFaq: (faq: CmsFaq) => void;
  deleteFaq: (index: number) => void;
  // Master Save & Reset
  saveAndPublish: () => Promise<boolean>;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastPublished: string | null;
}

export const CMS_STORAGE_KEY = 'codex_cms_content';

export function loadCmsData(): CmsData {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(CMS_STORAGE_KEY) : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_CMS_DATA,
        ...parsed,
        brand: { ...DEFAULT_CMS_DATA.brand, ...(parsed.brand || {}) },
        hero: { ...DEFAULT_CMS_DATA.hero, ...(parsed.hero || {}) },
        about: { ...DEFAULT_CMS_DATA.about, ...(parsed.about || {}) },
        contact: { ...DEFAULT_CMS_DATA.contact, ...(parsed.contact || {}) },
      };
    }
  } catch {
    // fallback
  }
  return DEFAULT_CMS_DATA;
}

export function saveCmsData(data: Partial<CmsData>): CmsData {
  const current = loadCmsData();
  const updated: CmsData = {
    ...current,
    ...data,
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function resetCmsData(): CmsData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CMS_STORAGE_KEY);
  }
  return DEFAULT_CMS_DATA;
}

export const CmsContext = createContext<CmsContextValue | null>(null);
