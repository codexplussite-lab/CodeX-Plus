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

    expect(screen.getByText('Alexander Reid')).toBeInTheDocument();
    expect(screen.getByText('Founder & Managing Partner')).toBeInTheDocument();
    expect(screen.getByText('Helena Rostova')).toBeInTheDocument();
    expect(screen.getByText('Creative Director & Founder')).toBeInTheDocument();
  });
});
