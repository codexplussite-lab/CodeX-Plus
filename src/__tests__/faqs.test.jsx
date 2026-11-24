import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Faqs from '../components/Faqs';
import { CmsProvider } from '../context/CmsContext';

describe('Faqs Component', () => {
  it('should render technical FAQ questions and toggle answers on click', () => {
    render(
      <CmsProvider>
        <Faqs />
      </CmsProvider>
    );

    const firstQuestion = screen.getByText(/What distinguishes CODEXX PLUS from typical digital agencies\?/i);
    expect(firstQuestion).toBeInTheDocument();

    // First question is initially open by default
    expect(screen.getByText(/We operate as an elite engineering/i)).toBeInTheDocument();

    // Toggle by clicking second question
    const secondQuestion = screen.getByText(/How does your 4-stage engagement methodology work\?/i);
    fireEvent.click(secondQuestion);
    expect(screen.getByText(/Our framework spans 4 deterministic phases/i)).toBeInTheDocument();
  });
});
