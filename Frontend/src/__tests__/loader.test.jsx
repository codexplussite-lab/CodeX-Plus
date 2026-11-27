import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Loader from '../components/Loader';

describe('Loader Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial loader elements correctly', () => {
    render(<Loader onReveal={vi.fn()} />);
    expect(screen.getByText('000')).toBeInTheDocument();
    expect(screen.getByAltText('CODEX+')).toBeInTheDocument();
  });

  it('triggers onReveal via safety fallback timeout and unmounts', () => {
    const onReveal = vi.fn();
    const { container } = render(<Loader onReveal={onReveal} />);

    expect(container.querySelector('.loader')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(onReveal).toHaveBeenCalled();
    expect(container.querySelector('.loader')).toBeNull();
  });
});
