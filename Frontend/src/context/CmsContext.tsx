import React, { useState, useEffect, useCallback } from 'react';
import type {
  ServiceItem,
  TestimonialItem,
} from '../data/siteData';
import type { FullTeamMember } from '../data/teamData';
import {
  CmsContext,
  DEFAULT_CMS_DATA,
  type CmsData,
  type CmsBranding,
  type CmsHeroContent,
  type CmsAboutContent,
  type CmsContactInfo,
  type CmsTrustedClientItem,
  type CmsContactHub,
  type CmsFaqItem,
} from './cmsStore';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cms, setCms] = useState<CmsData>(() => {
    try {
      const saved = localStorage.getItem('codex_cms_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CMS_DATA,
          ...parsed,
          branding: { ...DEFAULT_CMS_DATA.branding, ...(parsed.branding || {}) },
          hero: { ...DEFAULT_CMS_DATA.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_CMS_DATA.about, ...(parsed.about || {}) },
          contact: { ...DEFAULT_CMS_DATA.contact, ...(parsed.contact || {}) },
        };
      }
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

    async function fetchBackendCms() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok && active) {
          const json = await res.json();
          if (json.data && Object.keys(json.data).length > 0) {
            setCms((prev) => ({
              ...prev,
              ...json.data,
              branding: { ...prev.branding, ...(json.data.branding || {}) },
              hero: { ...prev.hero, ...(json.data.hero || {}) },
              about: { ...prev.about, ...(json.data.about || {}) },
              contact: { ...prev.contact, ...(json.data.contact || {}) },
            }));
            if (json.updatedAt) setLastPublished(json.updatedAt);
          }
        }
      } catch {
        // Local mode fallback
      }
    }

    void fetchBackendCms();

    return () => {
      active = false;
    };
  }, []);

  const updateBranding = useCallback((branding: Partial<CmsBranding>) => {
    setCms((prev) => ({ ...prev, branding: { ...prev.branding, ...branding } }));
  }, []);

  const updateHero = useCallback((hero: Partial<CmsHeroContent>) => {
    setCms((prev) => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  }, []);

  const updateAbout = useCallback((about: Partial<CmsAboutContent>) => {
    setCms((prev) => ({ ...prev, about: { ...prev.about, ...about } }));
  }, []);

  const updateContact = useCallback((contact: Partial<CmsContactInfo>) => {
    setCms((prev) => ({ ...prev, contact: { ...prev.contact, ...contact } }));
  }, []);

  const updateTeamCarouselSubtitle = useCallback((teamCarouselSubtitle: string) => {
    setCms((prev) => ({ ...prev, teamCarouselSubtitle }));
  }, []);

  // Services CRUD
  const addService = useCallback((service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `svc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCms((prev) => ({ ...prev, services: [...prev.services, newService] }));
  }, []);

  const updateService = useCallback((id: string, updated: Partial<ServiceItem>) => {
    setCms((prev) => ({
      ...prev,
      services: prev.services.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      services: prev.services.filter((item) => item.id !== id),
    }));
  }, []);

  // Team CRUD
  const addTeamMember = useCallback((member: Omit<FullTeamMember, 'id'>) => {
    const newMember: FullTeamMember = {
      ...member,
      id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCms((prev) => ({ ...prev, team: [...prev.team, newMember] }));
  }, []);

  const updateTeamMember = useCallback((id: string, updated: Partial<FullTeamMember>) => {
    setCms((prev) => ({
      ...prev,
      team: prev.team.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
  }, []);

  const deleteTeamMember = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      team: prev.team.filter((item) => item.id !== id),
    }));
  }, []);

  // Testimonials CRUD
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCms((prev) => ({ ...prev, testimonials: [...prev.testimonials, newItem] }));
  }, []);

  const updateTestimonial = useCallback((id: string, updated: Partial<TestimonialItem>) => {
    setCms((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((item) => item.id !== id),
    }));
  }, []);

  // Trusted Clients CRUD
  const addTrustedClient = useCallback((client: Omit<CmsTrustedClientItem, 'id'>) => {
    const newClient: CmsTrustedClientItem = {
      ...client,
      id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCms((prev) => ({ ...prev, trustedClients: [...prev.trustedClients, newClient] }));
  }, []);

  const updateTrustedClient = useCallback((id: string, updated: Partial<CmsTrustedClientItem>) => {
    setCms((prev) => ({
      ...prev,
      trustedClients: prev.trustedClients.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  }, []);

  const deleteTrustedClient = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      trustedClients: prev.trustedClients.filter((item) => item.id !== id),
    }));
  }, []);

  // Hubs CRUD
  const addHub = useCallback((hub: CmsContactHub) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        hubs: [...prev.contact.hubs, hub],
      },
    }));
  }, []);

  const updateHub = useCallback((index: number, updated: Partial<CmsContactHub>) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        hubs: prev.contact.hubs.map((hub, i) => (i === index ? { ...hub, ...updated } : hub)),
      },
    }));
  }, []);

  const deleteHub = useCallback((index: number) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        hubs: prev.contact.hubs.filter((_, i) => i !== index),
      },
    }));
  }, []);

  // FAQs CRUD
  const addFaq = useCallback((faq: CmsFaqItem) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        faqs: [...prev.contact.faqs, faq],
      },
    }));
  }, []);

  const updateFaq = useCallback((index: number, updated: Partial<CmsFaqItem>) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        faqs: prev.contact.faqs.map((f, i) => (i === index ? { ...f, ...updated } : f)),
      },
    }));
  }, []);

  const deleteFaq = useCallback((index: number) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        faqs: prev.contact.faqs.filter((_, i) => i !== index),
      },
    }));
  }, []);

  // Master Save & Publish
  const saveAndPublish = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      localStorage.setItem('codex_cms_content', JSON.stringify(cms));

      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cms),
      });

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastPublished(now);

      if (res.ok) {
        setIsSaving(false);
        return true;
      }
      setIsSaving(false);
      return true; // Still persisted to localStorage
    } catch {
      setIsSaving(false);
      return true;
    }
  }, [cms]);

  // Reset to Defaults
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem('codex_cms_content');
    setCms(DEFAULT_CMS_DATA);
  }, []);

  return (
    <CmsContext.Provider
      value={{
        cms,
        updateBranding,
        updateHero,
        updateAbout,
        updateContact,
        updateTeamCarouselSubtitle,
        addService,
        updateService,
        deleteService,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addTrustedClient,
        updateTrustedClient,
        deleteTrustedClient,
        addHub,
        updateHub,
        deleteHub,
        addFaq,
        updateFaq,
        deleteFaq,
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
