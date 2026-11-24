import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Team from '../components/Team';
import { CmsProvider } from '../context/CmsContext';

describe('Team Component', () => {
  it('should render principal architects and location hubs', () => {
    render(
      <CmsProvider>
        <Team />
      </CmsProvider>
    );

    expect(screen.getByText('Alexander Reid')).toBeInTheDocument();
    expect(screen.getByText('Helena Rostova')).toBeInTheDocument();
    expect(screen.getByText('Marcus Thorne')).toBeInTheDocument();
    expect(screen.getByText('Maya Patel')).toBeInTheDocument();
  });
});
