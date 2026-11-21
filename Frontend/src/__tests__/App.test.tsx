import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { CmsProvider } from '../context/CmsContext';

describe('App Root Component', () => {
  beforeEach(() => {
    window.location.hash = '';
    window.history.pushState(null, '', '/');
  });

  it('should render the full homepage with navbar, hero, about, services, team, feedback, and footer', () => {
    render(
      <CmsProvider>
        <App />
      </CmsProvider>
    );

    // Navbar
    expect(screen.getAllByText(/CODEXX/i).length).toBeGreaterThan(0);

    // Hero CTAs
    expect(screen.getByText(/Schedule Discovery/i)).toBeInTheDocument();

    // About metrics
    expect(screen.getByText('120+')).toBeInTheDocument();

    // Services
    expect(screen.getByText('What We Offer')).toBeInTheDocument();

    // Team section
    expect(screen.getByText('Studio Architects & Leads')).toBeInTheDocument();
  });
});
