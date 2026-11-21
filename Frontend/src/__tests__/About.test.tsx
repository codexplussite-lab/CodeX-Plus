import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../components/About';
import { CmsProvider } from '../context/CmsContext';

describe('About Component', () => {
  it('should render about statement and key metrics', () => {
    render(
      <CmsProvider>
        <About />
      </CmsProvider>
    );

    expect(screen.getByText(/We architect next-generation digital products/i)).toBeInTheDocument();
    expect(screen.getByText('120+')).toBeInTheDocument();
    expect(screen.getByText('99.98%')).toBeInTheDocument();
  });
});
