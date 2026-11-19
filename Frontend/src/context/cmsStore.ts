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

export interface CmsHeroContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badgeText: string;
}

export interface CmsAboutContent {
  statement: string;
  paragraph1: string;
  paragraph2: string;
  stats: Array<{ value: string; label: string; sub: string }>;
}

export interface CmsContactInfo {
  email: string;
  phoneAmericas: string;
  phoneEurope: string;
  sfAddress: string;
  zurichAddress: string;
  londonAddress: string;
  dubaiAddress: string;
}

export interface CmsData {
  hero: CmsHeroContent;
  about: CmsAboutContent;
  services: ServiceItem[];
  team: FullTeamMember[];
  testimonials: TestimonialItem[];
  clientLogos: ClientLogo[];
  contact: CmsContactInfo;
}

export const DEFAULT_CMS_DATA: CmsData = {
  hero: {
    eyebrow: 'High-Performance Engineering & Digital Products',
    headline: 'Architecting Autonomous Intelligence & Digital Luxury.',
    subtitle:
      'We craft resilient multi-agent platforms, bespoke WebGL spatial interfaces, and enterprise design systems for visionary companies redefining their categories.',
    ctaPrimary: 'Schedule Discovery Call',
    ctaSecondary: 'Explore Capabilities',
    badgeText: 'Accepting Q1/Q2 Engagements',
  },
  about: {
    statement:
      '— We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.',
    paragraph1:
      "With unwavering dedication, we've completed over a hundred remarkable projects across digital platforms, enterprise AI ecosystems, and luxury architectural spaces—blending timeless precision with intelligent engineering.",
    paragraph2:
      'Every solution is crafted around measurable performance, refined human experience, and future-proof scalability—empowering modern enterprises and forward-thinking brands to operate effortlessly.',
    stats: [
      { value: '120+', label: 'Projects Shipped', sub: 'Across 18 Global Verticals' },
      { value: '98%', label: 'Client Retention', sub: 'Long-term Partnerships' },
      { value: '24/7', label: 'Global Support', sub: 'Active Engineering Teams' },
      { value: '99.98%', label: 'Uptime SLA', sub: 'Zero-Downtime Reliability' },
    ],
  },
  services: DEFAULT_SERVICES,
  team: ALL_TEAM_MEMBERS,
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
  },
};

export interface CmsContextValue {
  cms: CmsData;
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
  updateClientLogo: (id: string, logo: Partial<ClientLogo>) => void;
  deleteClientLogo: (id: string) => void;
  // Master Save & Reset
  saveAndPublish: () => Promise<boolean>;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastPublished: string | null;
}

export const CmsContext = createContext<CmsContextValue | null>(null);
