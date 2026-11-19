import { createContext } from 'react';
import {
  SERVICES as DEFAULT_SERVICES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  type ServiceItem,
  type TestimonialItem,
} from '../data/siteData';
import { ALL_TEAM_MEMBERS, type FullTeamMember } from '../data/teamData';

export interface CmsBranding {
  name: string;
  tagline: string;
  availabilityBadge: string;
  ctaButtonText: string;
  primaryEmail: string;
  footerBio: string;
  copyrightText: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    github?: string;
  };
}

export interface CmsHeroContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badgeText: string;
  bottomBarText: string;
}

export interface CmsAboutPrinciple {
  title: string;
  description: string;
}

export interface CmsAboutMilestone {
  year: string;
  badge: string;
  title: string;
  desc: string;
}

export interface CmsAboutContent {
  statement: string;
  paragraph1: string;
  paragraph2: string;
  officeImage: string;
  officeTitle: string;
  officeSubtitle: string;
  stats: Array<{ value: string; label: string; sub: string }>;
  principles: CmsAboutPrinciple[];
  milestones: CmsAboutMilestone[];
}

export interface CmsContactHub {
  city: string;
  address: string;
  hours: string;
  phone: string;
}

export interface CmsFaqItem {
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
  hubs: CmsContactHub[];
  faqs: CmsFaqItem[];
}

export interface CmsTrustedClientItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export interface CmsData {
  branding: CmsBranding;
  hero: CmsHeroContent;
  about: CmsAboutContent;
  services: ServiceItem[];
  team: FullTeamMember[];
  teamCarouselSubtitle: string;
  testimonials: TestimonialItem[];
  trustedClients: CmsTrustedClientItem[];
  contact: CmsContactInfo;
}

export const DEFAULT_TRUSTED_CLIENTS: CmsTrustedClientItem[] = [
  {
    id: 'godaddy',
    src: '/images/logos/godaddy.svg',
    alt: 'GoDaddy brand logo',
    title: 'GoDaddy',
    subtitle: 'Cloud Infrastructure',
  },
  {
    id: 'hotjar',
    src: '/images/logos/hotjar.svg',
    alt: 'Hotjar brand logo',
    title: 'Hotjar',
    subtitle: 'Behavior Analytics',
  },
  {
    id: 'tripadvisor',
    src: '/images/logos/tripadvisor.svg',
    alt: 'Tripadvisor brand logo',
    title: 'Tripadvisor',
    subtitle: 'Global Hospitality',
  },
  {
    id: 'google-fonts',
    src: '/images/logos/google-fonts.svg',
    alt: 'Google Fonts brand logo',
    title: 'Google Fonts',
    subtitle: 'Design Systems',
  },
  {
    id: 'figma',
    src: '/images/logos/figma.svg',
    alt: 'Figma brand logo',
    title: 'Figma',
    subtitle: 'Product Design',
  },
  {
    id: 'stripe',
    src: '/images/logos/stripe.svg',
    alt: 'Stripe brand logo',
    title: 'Stripe',
    subtitle: 'Global Payments',
  },
];

export const DEFAULT_CMS_DATA: CmsData = {
  branding: {
    name: 'CODEXX PLUS',
    tagline: 'Architecting Autonomous Intelligence & Digital Luxury',
    availabilityBadge: 'Accepting Q1/Q2 Engagements',
    ctaButtonText: 'Schedule Discovery',
    primaryEmail: 'Info@codexplus.site',
    footerBio:
      'We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.',
    copyrightText: '© 2026 CODEXX PLUS. All rights reserved.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      github: 'https://github.com',
    },
  },
  hero: {
    eyebrow: 'Next-Gen Enterprise Intelligence & Craft',
    headline: 'Empower Your Business with Next-Generation AI Innovation',
    subtitle:
      'Harness powerful artificial intelligence to streamline workflows, unlock actionable insights, and drive sustainable growth with a secure, enterprise-ready platform built for the future.',
    ctaPrimary: 'Schedule Discovery',
    ctaSecondary: 'Explore Capabilities',
    badgeText: 'Trusted by 500+ enterprises worldwide · 99.98% platform reliability',
    bottomBarText: 'Driven By Smart Innovation & Deep Craft',
  },
  about: {
    statement:
      '— We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.',
    paragraph1:
      "With unwavering dedication, we've completed over a hundred remarkable projects across digital platforms, enterprise AI ecosystems, and luxury architectural spaces—blending timeless precision with intelligent engineering.",
    paragraph2:
      'Every solution is crafted around measurable performance, refined human experience, and future-proof scalability—empowering modern enterprises and forward-thinking brands to operate effortlessly.',
    officeImage: '/images/office-interior.jpg',
    officeTitle: 'Studio & Headquarters',
    officeSubtitle: 'Designed for Deep Focus & Architectural Precision',
    stats: [
      { value: '120+', label: 'Projects Shipped', sub: 'Across 18 Global Verticals' },
      { value: '98%', label: 'Client Retention', sub: 'Long-term Partnerships' },
      { value: '24/7', label: 'Global Support', sub: 'Active Engineering Teams' },
      { value: '99.98%', label: 'Uptime SLA', sub: 'Zero-Downtime Reliability' },
    ],
    principles: [
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
  teamCarouselSubtitle:
    'Drag, swipe, or use arrows to cycle through our active engineering and design leads.',
  testimonials: DEFAULT_TESTIMONIALS,
  trustedClients: DEFAULT_TRUSTED_CLIENTS,
  contact: {
    email: 'Info@codexplus.site',
    phoneAmericas: '+1 (555) 839-2041',
    phoneEurope: '+41 44 211 4890',
    sfAddress: '500 Howard St, Financial District, CA',
    zurichAddress: 'Bahnhofstrasse 45, Tech Core, Switzerland',
    londonAddress: '10 Berkeley Square, Mayfair, London',
    dubaiAddress: 'DIFC Gate Tower, Level 14, Dubai',
    hubs: [
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
  updateBranding: (branding: Partial<CmsBranding>) => void;
  updateHero: (hero: Partial<CmsHeroContent>) => void;
  updateAbout: (about: Partial<CmsAboutContent>) => void;
  updateContact: (contact: Partial<CmsContactInfo>) => void;
  updateTeamCarouselSubtitle: (subtitle: string) => void;
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
  // Trusted Clients CRUD
  addTrustedClient: (client: Omit<CmsTrustedClientItem, 'id'>) => void;
  updateTrustedClient: (id: string, client: Partial<CmsTrustedClientItem>) => void;
  deleteTrustedClient: (id: string) => void;
  // Hubs CRUD
  addHub: (hub: CmsContactHub) => void;
  updateHub: (index: number, hub: Partial<CmsContactHub>) => void;
  deleteHub: (index: number) => void;
  // FAQs CRUD
  addFaq: (faq: CmsFaqItem) => void;
  updateFaq: (index: number, faq: Partial<CmsFaqItem>) => void;
  deleteFaq: (index: number) => void;
  // Master Save & Reset
  saveAndPublish: () => Promise<boolean>;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastPublished: string | null;
}

export const CmsContext = createContext<CmsContextValue | null>(null);
