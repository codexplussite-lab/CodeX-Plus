import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Team from '../sections/Team.jsx';
import { CmsProvider } from '../context/CmsContext.jsx';

describe('Team Section', () => {
  it('should render team members roster', () => {
    render(
      <CmsProvider>
        <Team />
      </CmsProvider>
    );

    expect(screen.getByText('Trina Alfard')).toBeInTheDocument();
    expect(screen.getByText('Lead UI/UX Designer')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Creative Director')).toBeInTheDocument();
  });
});
