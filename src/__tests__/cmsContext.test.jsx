import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CmsProvider, useCms, DEFAULT_CMS_DATA } from '../context/CmsContext';

function TestConsumer() {
  const { content, loading } = useCms();
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'ready'}</span>
      <span data-testid="siteName">{content?.brand?.siteName}</span>
      <span data-testid="heroTitle">{content?.hero?.titleHighlight}</span>
      <span data-testid="tiersCount">{content?.pricing?.tiers?.length}</span>
    </div>
  );
}

describe('CmsContext & DEFAULT_CMS_DATA', () => {
  it('should have all 10 core schema sections in DEFAULT_CMS_DATA', () => {
    expect(DEFAULT_CMS_DATA).toHaveProperty('brand');
    expect(DEFAULT_CMS_DATA).toHaveProperty('hero');
    expect(DEFAULT_CMS_DATA).toHaveProperty('about');
    expect(DEFAULT_CMS_DATA).toHaveProperty('services');
    expect(DEFAULT_CMS_DATA).toHaveProperty('team');
    expect(DEFAULT_CMS_DATA).toHaveProperty('pricing');
    expect(DEFAULT_CMS_DATA).toHaveProperty('projects');
    expect(DEFAULT_CMS_DATA).toHaveProperty('faqs');
    expect(DEFAULT_CMS_DATA).toHaveProperty('testimonials');
    expect(DEFAULT_CMS_DATA).toHaveProperty('paymentPolicy');
    expect(DEFAULT_CMS_DATA).toHaveProperty('privacyPolicy');
  });

  it('should provide default values to children consumers via useCms', () => {
    render(
      <CmsProvider>
        <TestConsumer />
      </CmsProvider>
    );

    expect(screen.getByTestId('siteName').textContent).toBe(DEFAULT_CMS_DATA.brand.siteName);
    expect(screen.getByTestId('heroTitle').textContent).toBe(DEFAULT_CMS_DATA.hero.titleHighlight);
    expect(screen.getByTestId('tiersCount').textContent).toBe(String(DEFAULT_CMS_DATA.pricing.tiers.length));
  });
});
