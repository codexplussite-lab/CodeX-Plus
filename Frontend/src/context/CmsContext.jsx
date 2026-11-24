import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultData from '../data/content.js';

export const DEFAULT_CMS_DATA = {
  brand: defaultData.brand,
  nav: defaultData.nav,
  searches: defaultData.searches,
  about: defaultData.about,
  marqueeLines: defaultData.marqueeLines,
  services: defaultData.services,
  projects: defaultData.projects,
  faqs: defaultData.faqs,
  team: defaultData.team,
  testimonials: defaultData.testimonials,
  posts: defaultData.posts,
  partners: defaultData.partners,
};

const CmsContext = createContext({
  content: DEFAULT_CMS_DATA,
  loading: false,
  error: null,
  updateContent: async () => ({ success: true }),
  refreshContent: async () => {},
});

export function CmsProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCmsContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && Object.keys(json.data).length > 0) {
          setContent(prev => ({
            ...prev,
            ...json.data,
          }));
        }
      }
    } catch (err) {
      setError(err?.message || 'Error fetching CMS data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsContent();
  }, []);

  const updateContent = async (newContent) => {
    try {
      setContent(newContent);
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });
      const json = await res.json().catch(() => ({ success: true }));
      return json;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        loading,
        error,
        updateContent,
        refreshContent: fetchCmsContent,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    return {
      content: DEFAULT_CMS_DATA,
      loading: false,
      error: null,
      updateContent: async () => ({ success: true }),
      refreshContent: async () => {},
    };
  }
  return ctx;
}
