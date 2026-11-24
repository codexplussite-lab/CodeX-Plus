import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Hero from '../components/Hero';
import { CmsProvider } from '../context/CmsContext';

describe('Hero Component', () => {
  it('should render hero title, highlight, and description', () => {
    render(
      <CmsProvider>
        <Hero />
      </CmsProvider>
    );

    expect(screen.getByText(/AI Innovation/i)).toBeInTheDocument();
    expect(screen.getByText(/Schedule 15-Min Discovery/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Capabilities/i)).toBeInTheDocument();
  });

  it('should trigger onOpenBookingModal on primary CTA click', () => {
    const onOpenBookingModal = vi.fn();
    render(
      <CmsProvider>
        <Hero onOpenBookingModal={onOpenBookingModal} />
      </CmsProvider>
    );

    const cta = screen.getByText(/Schedule 15-Min Discovery/i);
    fireEvent.click(cta);
    expect(onOpenBookingModal).toHaveBeenCalled();
  });
});
