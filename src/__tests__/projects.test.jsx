import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Projects from '../components/Projects';
import { CmsProvider } from '../context/CmsContext';

describe('Projects Component', () => {
  it('should render project cases and category filter buttons', () => {
    render(
      <CmsProvider>
        <Projects />
      </CmsProvider>
    );

    expect(screen.getByText('OWL AI Systems')).toBeInTheDocument();
    expect(screen.getByText('Morheme Tech')).toBeInTheDocument();
    expect(screen.getByText('Zainab Bees')).toBeInTheDocument();
    expect(screen.getByText('Lumina Labs')).toBeInTheDocument();
  });

  it('should filter projects when category pill is clicked', () => {
    render(
      <CmsProvider>
        <Projects />
      </CmsProvider>
    );

    const devFilter = screen.getByRole('button', { name: /^Development$/i });
    fireEvent.click(devFilter);

    expect(screen.getByText('Morheme Tech')).toBeInTheDocument();
  });
});
