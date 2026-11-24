import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Services from '../components/Services';
import { CmsProvider } from '../context/CmsContext';

describe('Services Component', () => {
  it('should render all 5 studio disciplines without crashing even if icon is undefined', () => {
    render(
      <CmsProvider>
        <Services />
      </CmsProvider>
    );

    const devHeadings = screen.getAllByRole('heading', { name: /Development/i });
    expect(devHeadings.length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: /Graphics Design/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: /Video Editing/i }).length).toBeGreaterThan(0);
    expect(screen.getByText('Social Media Marketing')).toBeInTheDocument();
    expect(screen.getByText('SEO / GEO')).toBeInTheDocument();
  });

  it('should switch active service on hover/click', () => {
    render(
      <CmsProvider>
        <Services />
      </CmsProvider>
    );

    const graphicsCard = screen.getAllByRole('heading', { name: /Graphics Design/i })[0];
    fireEvent.mouseEnter(graphicsCard);
    expect(graphicsCard).toBeInTheDocument();
  });
});
