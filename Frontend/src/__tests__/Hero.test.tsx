import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '../components/Hero';
import { CmsProvider } from '../context/CmsContext';

describe('Hero Component', () => {
  it('should render hero headline and CTA buttons', () => {
    render(
      <CmsProvider>
        <Hero onOpenModal={vi.fn()} />
      </CmsProvider>
    );

    expect(screen.getByText(/Schedule Discovery/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Capabilities/i)).toBeInTheDocument();
  });

  it('should trigger onOpenModal when Schedule Discovery button is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenModal = vi.fn();

    render(
      <CmsProvider>
        <Hero onOpenModal={handleOpenModal} />
      </CmsProvider>
    );

    const ctaButton = screen.getByText(/Schedule Discovery/i);
    await user.click(ctaButton);

    expect(handleOpenModal).toHaveBeenCalled();
  });
});
