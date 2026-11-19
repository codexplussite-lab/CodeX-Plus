import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

const DEFAULT_CMS_DATA: CmsData = {
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

interface CmsContextValue {
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
  deleteClientLogo: (id: string) => void;
  // Master Save & Reset
  saveAndPublish: () => Promise<boolean>;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastPublished: string | null;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cms, setCms] = useState<CmsData>(() => {
    try {
      const saved = localStorage.getItem('codex_cms_content');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CMS_DATA;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastPublished, setLastPublished] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('codex_cms_content', JSON.stringify(cms));
  }, [cms]);

  // Initial fetch from backend if available
  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cms').catch(() => null);
        if (active && res && res.ok) {
          const json = await res.json();
          if (json.data && typeof json.data === 'object') {
            setCms((prev) => ({ ...prev, ...json.data }));
            setLastPublished(new Date().toLocaleTimeString());
          }
        }
      } catch {
        // local storage fallback
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const updateHero = useCallback((data: Partial<CmsHeroContent>) => {
    setCms((prev) => ({ ...prev, hero: { ...prev.hero, ...data } }));
  }, []);

  const updateAbout = useCallback((data: Partial<CmsAboutContent>) => {
    setCms((prev) => ({ ...prev, about: { ...prev.about, ...data } }));
  }, []);

  const updateContact = useCallback((data: Partial<CmsContactInfo>) => {
    setCms((prev) => ({ ...prev, contact: { ...prev.contact, ...data } }));
  }, []);

  // Services
  const addService = useCallback((service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `svc_${Date.now()}`,
    };
    setCms((prev) => ({ ...prev, services: [newService, ...prev.services] }));
  }, []);

  const updateService = useCallback((id: string, updated: Partial<ServiceItem>) => {
    setCms((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  }, []);

  // Team
  const addTeamMember = useCallback((member: Omit<FullTeamMember, 'id'>) => {
    const created: FullTeamMember = {
      ...member,
      id: `member_${Date.now()}`,
    };
    setCms((prev) => ({ ...prev, team: [created, ...prev.team] }));
  }, []);

  const updateTeamMember = useCallback((id: string, updated: Partial<FullTeamMember>) => {
    setCms((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    }));
  }, []);

  const deleteTeamMember = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id),
    }));
  }, []);

  // Testimonials
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>) => {
    const created: TestimonialItem = {
      ...item,
      id: `t_${Date.now()}`,
    };
    setCms((prev) => ({ ...prev, testimonials: [created, ...prev.testimonials] }));
  }, []);

  const updateTestimonial = useCallback((id: string, updated: Partial<TestimonialItem>) => {
    setCms((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  }, []);

  // Client Logos
  const addClientLogo = useCallback((logo: Omit<ClientLogo, 'id'>) => {
    const created: ClientLogo = {
      ...logo,
      id: `logo_${Date.now()}`,
    };
    setCms((prev) => ({ ...prev, clientLogos: [...prev.clientLogos, created] }));
  }, []);

  const updateClientLogo = useCallback((id: string, updated: Partial<ClientLogo>) => {
    setCms((prev) => ({
      ...prev,
      clientLogos: prev.clientLogos.map((l) => (l.id === id ? { ...l, ...updated } : l)),
    }));
  }, []);

  const deleteClientLogo = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      clientLogos: prev.clientLogos.filter((l) => l.id !== id),
    }));
  }, []);

  // Save & Publish
  const saveAndPublish = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    localStorage.setItem('codex_cms_content', JSON.stringify(cms));
    try {
      await fetch('http://localhost:5000/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cms),
      });
      setLastPublished(new Date().toLocaleTimeString());
      return true;
    } catch {
      setLastPublished(new Date().toLocaleTimeString());
      return true; // Local storage publish succeeded
    } finally {
      setIsSaving(false);
    }
  }, [cms]);

  const resetToDefaults = useCallback(() => {
    if (window.confirm('Reset all website content back to factory default presets?')) {
      setCms(DEFAULT_CMS_DATA);
      localStorage.removeItem('codex_cms_content');
      setLastPublished(new Date().toLocaleTimeString());
    }
  }, []);

  return (
    <CmsContext.Provider
      value={{
        cms,
        updateHero,
        updateAbout,
        updateContact,
        addService,
        updateService,
        deleteService,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addClientLogo,
        updateClientLogo,
        deleteClientLogo,
        saveAndPublish,
        resetToDefaults,
        isSaving,
        lastPublished,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export { useCms } from './useCms';

