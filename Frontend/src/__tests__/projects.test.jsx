import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Projects from '../sections/Projects.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Projects Section', () => {
  it('should render projects intro and showcase cards', () => {
    render(
      <CmsProvider>
        <Projects />
      </CmsProvider>
    );

    expect(screen.getByText('Recent projects')).toBeInTheDocument();
    expect(screen.getByText('Design Studio')).toBeInTheDocument();
    expect(screen.getByText('StyleCart')).toBeInTheDocument();
  });
});
