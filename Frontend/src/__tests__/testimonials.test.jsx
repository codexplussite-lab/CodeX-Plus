import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Testimonials from '../sections/Testimonials.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Testimonials Section', () => {
  it('should render client testimonial and author', () => {
    render(
      <CmsProvider>
        <Testimonials />
      </CmsProvider>
    );

    expect(screen.getByText('Robert Tom')).toBeInTheDocument();
    expect(screen.getByText('CEO, Chapelle')).toBeInTheDocument();
  });
});
