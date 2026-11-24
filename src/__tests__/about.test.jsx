import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import { CmsProvider } from '../context/CmsContext';

describe('About Component', () => {
  it('should render executive manifesto quote and founder card', () => {
    render(
      <CmsProvider>
        <About />
      </CmsProvider>
    );

    expect(screen.getByText(/Alexander Reid/i)).toBeInTheDocument();
    expect(screen.getByText(/Founder & Managing Partner/i)).toBeInTheDocument();
  });

  it('should render 3 studio architectural pillars', () => {
    render(
      <CmsProvider>
        <About />
      </CmsProvider>
    );

    expect(screen.getByText('Architectural Precision')).toBeInTheDocument();
    expect(screen.getByText('Autonomous Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Dark Luxury Aesthetic')).toBeInTheDocument();
  });
});
