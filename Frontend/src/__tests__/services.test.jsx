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

    expect(screen.getByText('Development (Full-Stack & AI)')).toBeInTheDocument();
    expect(screen.getByText('Graphics Design (Visual Identity)')).toBeInTheDocument();
    expect(screen.getByText('Video Editing (Motion & 3D)')).toBeInTheDocument();

    const devBtn = screen.getByRole('button', { name: /Development/i });
    fireEvent.click(devBtn);
    expect(devBtn).toBeInTheDocument();
  });
});
