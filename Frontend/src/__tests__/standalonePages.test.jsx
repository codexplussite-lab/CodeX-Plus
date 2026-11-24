import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import TeamPage from '../pages/TeamPage';
import ContactPage from '../pages/ContactPage';
import { CmsProvider } from '../context/CmsContext';

describe('Standalone Pages', () => {
  it('AboutPage should render studio philosophy, values, and stats', () => {
    render(
      <CmsProvider>
        <AboutPage />
      </CmsProvider>
    );

    expect(screen.getByText(/Studio Philosophy & Architectural Ethos/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Architectural Pillars/i)).toBeInTheDocument();
  });

  it('ServicesPage should render full-spectrum capabilities', () => {
    render(
      <CmsProvider>
        <ServicesPage />
      </CmsProvider>
    );

    expect(screen.getByText(/Full-Spectrum/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Craft/i)).toBeInTheDocument();
  });

  it('TeamPage should render leadership, fellowship information, and filtering', () => {
    render(
      <CmsProvider>
        <TeamPage />
      </CmsProvider>
    );

    expect(screen.getByText(/Studio Architects & Leadership Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/All Architects/i)).toBeInTheDocument();
  });

  it('ContactPage should render consultation inquiry form and headquarters hubs', () => {
    render(
      <CmsProvider>
        <ContactPage />
      </CmsProvider>
    );

    expect(screen.getByText(/Initiate a/i)).toBeInTheDocument();
    expect(screen.getByText(/Discovery Sprint/i)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco Flagship/i)).toBeInTheDocument();
    expect(screen.getByText(/Zürich Systems Lab/i)).toBeInTheDocument();
  });
});
