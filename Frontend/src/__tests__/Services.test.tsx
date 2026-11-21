import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Services } from '../components/Services';
import { CmsProvider } from '../context/CmsContext';

describe('Services Component', () => {
  it('should render section title and services cards', () => {
    render(
      <CmsProvider>
        <Services onOpenModal={vi.fn()} />
      </CmsProvider>
    );

    expect(screen.getByText('What We Offer')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });

  it('should trigger onOpenModal when Explore More is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenModal = vi.fn();

    render(
      <CmsProvider>
        <Services onOpenModal={handleOpenModal} />
      </CmsProvider>
    );

    const exploreBtn = screen.getByText('Explore More');
    await user.click(exploreBtn);

    expect(handleOpenModal).toHaveBeenCalled();
  });
});
