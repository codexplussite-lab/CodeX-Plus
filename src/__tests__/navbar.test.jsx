import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { CmsProvider } from '../context/CmsContext';

describe('Navbar Component', () => {
  it('should render brand logo and public navigation links', () => {
    render(
      <CmsProvider>
        <Navbar />
      </CmsProvider>
    );

    expect(screen.getByText(/CODEXX/i)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Policies')).toBeInTheDocument();
  });

  it('MUST NOT render any public "Admin" button or link on the public navbar', () => {
    const { container } = render(
      <CmsProvider>
        <Navbar />
      </CmsProvider>
    );

    // Ensure there is no button or anchor containing text "Admin"
    const linksAndButtons = container.querySelectorAll('a, button');
    linksAndButtons.forEach((el) => {
      expect(el.textContent.trim().toLowerCase()).not.toBe('admin');
    });
  });

  it('should trigger onNavigate when navigation items are clicked', () => {
    const onNavigate = vi.fn();
    render(
      <CmsProvider>
        <Navbar onNavigate={onNavigate} />
      </CmsProvider>
    );

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    expect(onNavigate).toHaveBeenCalledWith('/about');
  });
});
