import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

function ProblematicComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Simulated runtime error for test');
  }
  return <div>Component Rendered Successfully</div>;
}

describe('ErrorBoundary Component', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component Rendered Successfully')).toBeInTheDocument();
  });

  it('should catch error and display fallback UI with reload button', async () => {
    // Suppress console.error during expected test throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackTitle="Custom Glitch Detected">
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Glitch Detected')).toBeInTheDocument();
    expect(screen.getByText('Reload Component')).toBeInTheDocument();

    spy.mockRestore();
  });
});
