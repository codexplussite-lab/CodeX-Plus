import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Testimonials from '../components/Testimonials';
import { CmsProvider } from '../context/CmsContext';

describe('Testimonials Component', () => {
  it('should render initial client quote and navigate with next button', () => {
    render(
      <CmsProvider>
        <Testimonials />
      </CmsProvider>
    );

    expect(screen.getByText(/Dr. Aris Thorne/i)).toBeInTheDocument();
    expect(screen.getByText(/Hyperion Neural Systems/i)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /next testimonial/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/Veronica Sterling/i)).toBeInTheDocument();
  });
});
