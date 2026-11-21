import React, { useState, useEffect, useCallback } from 'react';
import type {
  ServiceItem,
  ClientLogo,
  TestimonialItem,
} from '../data/siteData';
import type { FullTeamMember } from '../data/teamData';
import {
  CmsContext,
  DEFAULT_CMS_DATA,
  CMS_STORAGE_KEY,
  loadCmsData,
  type CmsData,
  type CmsBrand,
  type CmsHeroContent,
  type CmsAboutContent,
  type CmsContactInfo,
  type CmsFaq,
} from './cmsStore';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cms, setCms] = useState<CmsData>(() => loadCmsData());

  const [isSaving, setIsSaving] = useState(false);
  const [lastPublished, setLastPublished] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cms));
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
              brand: { ...prev.brand, ...(json.data.brand || {}) },
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

  const updateBrand = useCallback((brand: Partial<CmsBrand>) => {
    setCms((prev) => ({ ...prev, brand: { ...prev.brand, ...brand } }));
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

  // Logos CRUD
  const addClientLogo = useCallback((logo: Omit<ClientLogo, 'id'>) => {
    const newLogo: ClientLogo = {
      ...logo,
      id: `logo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCms((prev) => ({ ...prev, clientLogos: [...prev.clientLogos, newLogo] }));
  }, []);

  const deleteClientLogo = useCallback((id: string) => {
    setCms((prev) => ({
      ...prev,
      clientLogos: prev.clientLogos.filter((item) => item.id !== id),
    }));
  }, []);

  // FAQs CRUD
  const addFaq = useCallback((faq: CmsFaq) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        faqs: [...(prev.contact.faqs || []), faq],
      },
    }));
  }, []);

  const deleteFaq = useCallback((index: number) => {
    setCms((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        faqs: (prev.contact.faqs || []).filter((_, i) => i !== index),
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
        updateBrand,
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
        deleteClientLogo,
        addFaq,
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
