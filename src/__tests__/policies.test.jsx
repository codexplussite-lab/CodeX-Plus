import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import PaymentPolicy from '../components/PaymentPolicy';
import PrivacyPolicy from '../components/PrivacyPolicy';
import { CmsProvider } from '../context/CmsContext';

describe('Policy Components', () => {
  it('should render Payment Policy headings and clauses', () => {
    render(
      <CmsProvider>
        <PaymentPolicy />
      </CmsProvider>
    );

    expect(screen.getByText(/Payment Policy & Financial Framework/i)).toBeInTheDocument();
    expect(screen.getByText(/Accepted Settlement Currencies/i)).toBeInTheDocument();
  });

  it('should render Privacy Policy headings and zero-retention clauses', () => {
    render(
      <CmsProvider>
        <PrivacyPolicy />
      </CmsProvider>
    );

    expect(screen.getByText(/Terms of Engagement & Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero-Retention AI Data Policy/i)).toBeInTheDocument();
  });
});
