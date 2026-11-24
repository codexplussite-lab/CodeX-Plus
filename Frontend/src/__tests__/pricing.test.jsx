import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Pricing from '../components/Pricing';
import { CmsProvider } from '../context/CmsContext';

describe('Pricing Component', () => {
  it('should render all 3 investment tiers and prices', () => {
    render(
      <CmsProvider>
        <Pricing />
      </CmsProvider>
    );

    expect(screen.getByText('Flagship Sprint')).toBeInTheDocument();
    expect(screen.getByText('$25,000+')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Architecture')).toBeInTheDocument();
    expect(screen.getByText('$60,000+')).toBeInTheDocument();
    expect(screen.getByText('Dedicated Studio Retainer')).toBeInTheDocument();
    expect(screen.getByText('$18,000')).toBeInTheDocument();
  });

  it('should highlight the popular tier badge', () => {
    render(
      <CmsProvider>
        <Pricing />
      </CmsProvider>
    );

    expect(screen.getByText('Most Comprehensive')).toBeInTheDocument();
  });
});
