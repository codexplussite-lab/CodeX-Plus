import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadCmsData,
  saveCmsData,
  resetCmsData,
  CMS_STORAGE_KEY,
  DEFAULT_CMS_DATA,
} from '../context/cmsStore';

describe('CMS Store & Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return DEFAULT_CMS_DATA when localStorage is empty', () => {
    const data = loadCmsData();
    expect(data.hero.headline).toBe(DEFAULT_CMS_DATA.hero.headline);
    expect(data.services.length).toBe(DEFAULT_CMS_DATA.services.length);
  });

  it('should save and retrieve updated CMS data from localStorage', () => {
    const customHeadline = 'Next-Gen Autonomous Architecture';
    saveCmsData({
      hero: {
        ...DEFAULT_CMS_DATA.hero,
        headline: customHeadline,
      },
    });

    const stored = JSON.parse(localStorage.getItem(CMS_STORAGE_KEY) || '{}');
    expect(stored.hero.headline).toBe(customHeadline);

    const reloaded = loadCmsData();
    expect(reloaded.hero.headline).toBe(customHeadline);
  });

  it('should reset CMS data back to defaults', () => {
    saveCmsData({
      hero: {
        ...DEFAULT_CMS_DATA.hero,
        headline: 'Temporary Modified Headline',
      },
    });

    const resetResult = resetCmsData();
    expect(resetResult.hero.headline).toBe(DEFAULT_CMS_DATA.hero.headline);
    expect(localStorage.getItem(CMS_STORAGE_KEY)).toBeNull();
  });
});
