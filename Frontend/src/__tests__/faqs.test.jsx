import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Faq from '../sections/Faq.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Faq Section', () => {
  it('should render questions title and project consultation form', () => {
    render(
      <CmsProvider>
        <Faq />
      </CmsProvider>
    );

    expect(screen.getByText(/Tell us about your project/i)).toBeInTheDocument();
    expect(screen.getByText(/We reply within 1 hour on business days/i)).toBeInTheDocument();

    const firstQuestion = screen.getByText('What services does Avista offer?');
    expect(firstQuestion).toBeInTheDocument();

    fireEvent.click(firstQuestion);
    expect(firstQuestion).toBeInTheDocument();
  });
});
