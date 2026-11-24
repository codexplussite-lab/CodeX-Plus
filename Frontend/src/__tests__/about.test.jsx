import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../sections/About.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('About Section', () => {
  it('should render founder information and studio story', () => {
    render(
      <CmsProvider>
        <About />
      </CmsProvider>
    );

    expect(screen.getByText('Who we are')).toBeInTheDocument();
    expect(screen.getByText('Arnold Vain')).toBeInTheDocument();
    expect(screen.getByText('Founder & CEO')).toBeInTheDocument();
    expect(screen.getByText('Our story')).toBeInTheDocument();
    expect(screen.getByText('Our goal')).toBeInTheDocument();
  });
});
