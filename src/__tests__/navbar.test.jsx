import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Header Component', () => {
  it('should render brand logo and navigation links', () => {
    render(
      <CmsProvider>
        <Header ready={true} />
      </CmsProvider>
    );

    expect(screen.getByText('CODEXX PLUS')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Start a project')).toBeInTheDocument();
  });
});
