import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from '../components/Footer';
import { CmsProvider } from '../context/CmsContext';

describe('Footer Component', () => {
  it('should render brand logo, navigation links, and copyright', () => {
    render(
      <CmsProvider>
        <Footer onOpenModal={vi.fn()} onNavigate={vi.fn()} />
      </CmsProvider>
    );

    expect(screen.getAllByText(/CODEXX/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Disciplines')).toBeInTheDocument();
  });

  it('should trigger navigation callback when links are clicked', async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(
      <CmsProvider>
        <Footer onOpenModal={vi.fn()} onNavigate={handleNavigate} />
      </CmsProvider>
    );

    const links = screen.getAllByText('Our Team');
    expect(links.length).toBeGreaterThan(0);
    await user.click(links[0]);

    expect(handleNavigate).toHaveBeenCalledWith('team', undefined);
  });
});
