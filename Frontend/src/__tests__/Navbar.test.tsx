import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '../components/Navbar';
import { CmsProvider } from '../context/CmsContext';

describe('Navbar Component', () => {
  it('should render brand logo and navigation links', () => {
    render(
      <CmsProvider>
        <Navbar onOpenModal={vi.fn()} onNavigate={vi.fn()} currentPage="home" />
      </CmsProvider>
    );

    expect(screen.getByText(/CODEXX/i)).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should trigger onNavigate when a link is clicked', async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(
      <CmsProvider>
        <Navbar onOpenModal={vi.fn()} onNavigate={handleNavigate} currentPage="home" />
      </CmsProvider>
    );

    const teamLink = screen.getByText('Our Team');
    await user.click(teamLink);

    expect(handleNavigate).toHaveBeenCalledWith('team', undefined);
  });

  it('should trigger onOpenModal when Schedule Call is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenModal = vi.fn();

    render(
      <CmsProvider>
        <Navbar onOpenModal={handleOpenModal} onNavigate={vi.fn()} currentPage="home" />
      </CmsProvider>
    );

    const callButtons = screen.getAllByText('Schedule Call');
    expect(callButtons.length).toBeGreaterThan(0);
    await user.click(callButtons[0]);

    expect(handleOpenModal).toHaveBeenCalled();
  });
});
