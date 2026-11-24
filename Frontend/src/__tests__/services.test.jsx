import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Services from '../sections/Services.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Services Section', () => {
  it('should render all Avista studio services and allow interaction', () => {
    render(
      <CmsProvider>
        <Services />
      </CmsProvider>
    );

    expect(screen.getByText('Branding & Identity')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Application Design')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();

    const brandingBtn = screen.getByRole('button', { name: /Branding & Identity/i });
    fireEvent.click(brandingBtn);
    expect(brandingBtn).toBeInTheDocument();
  });
});
