import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Hero from '../sections/Hero.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Hero Section', () => {
  it('should render digital agency tag and search options', () => {
    render(
      <CmsProvider>
        <Hero ready={true} />
      </CmsProvider>
    );

    expect(screen.getByText(/Digital agency in Los Angeles/i)).toBeInTheDocument();
    expect(screen.getByText(/People also search for/i)).toBeInTheDocument();
    expect(screen.getByText('UI/UX')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });
});
