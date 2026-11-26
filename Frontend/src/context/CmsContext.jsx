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
          setContent(prev => {
            const next = { ...prev };
            for (const [key, val] of Object.entries(json.data)) {
              if (Array.isArray(DEFAULT_CMS_DATA[key])) {
                if (Array.isArray(val)) next[key] = val;
                else if (val && Array.isArray(val.items)) next[key] = val.items;
                else if (val && Array.isArray(val.members)) next[key] = val.members;
              } else if (key === 'about' && val && typeof val === 'object') {
                next.about = {
                  ...prev.about,
                  ...val,
                  stats: Array.isArray(val.stats) ? val.stats : prev.about.stats,
                };
              } else if (key === 'brand' && val && typeof val === 'object') {
                next.brand = {
                  ...prev.brand,
                  ...val,
                  name: val.siteName || val.name || prev.brand.name,
                  socials: Array.isArray(val.socials) ? val.socials : prev.brand.socials,
                };
              } else if (val !== undefined && val !== null) {
                next[key] = val;
              }
            }
            return next;
          });
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

  useEffect(() => {
    const s = content?.settings;
    if (!s) return;
    if (s.siteTitle) document.title = s.siteTitle;
    if (s.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = s.favicon;
    }
  }, [content?.settings]);

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
