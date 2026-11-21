import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Team } from '../components/Team';
import { CmsProvider } from '../context/CmsContext';

describe('Team Component', () => {
  it('should render section title and flagship member Amara Okafor', () => {
    render(
      <CmsProvider>
        <Team />
      </CmsProvider>
    );

    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Studio Architects & Leads')).toBeInTheDocument();
    expect(screen.getByText('Amara Okafor')).toBeInTheDocument();
    expect(screen.getByText('Head of Product Strategy')).toBeInTheDocument();
    expect(screen.getByText('Roadmap Execution')).toBeInTheDocument();
  });

  it('should trigger onNavigateTeam callback when Meet All Architects is clicked', async () => {
    const user = userEvent.setup();
    const handleNavigateTeam = vi.fn();

    render(
      <CmsProvider>
        <Team onNavigateTeam={handleNavigateTeam} />
      </CmsProvider>
    );

    const button = screen.getByText('Meet All Architects');
    await user.click(button);

    expect(handleNavigateTeam).toHaveBeenCalled();
  });
});
