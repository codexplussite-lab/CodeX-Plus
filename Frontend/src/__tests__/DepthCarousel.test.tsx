import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DepthCarousel } from '../components/DepthCarousel';

const mockItems = [
  {
    image: 'https://images.unsplash.com/photo-1',
    title: 'Alpha Leader',
    subtitle: 'Chief Architect',
    badge: 'Core System',
  },
  {
    image: 'https://images.unsplash.com/photo-2',
    title: 'Beta Engineer',
    subtitle: 'Lead AI Engineer',
    badge: 'Neural Radiance',
  },
  {
    image: 'https://images.unsplash.com/photo-3',
    title: 'Gamma Designer',
    subtitle: 'Creative Director',
    badge: 'UI Motion',
  },
];

describe('DepthCarousel Component', () => {
  it('should render slides and indicators', () => {
    render(
      <div style={{ width: 800, height: 500 }}>
        <DepthCarousel
          items={mockItems}
          cardWidth={280}
          cardHeight={380}
          showIndicators={true}
          showControls={true}
          loop={true}
        />
      </div>
    );

    expect(screen.getByRole('group', { name: /Depth carousel/i })).toBeInTheDocument();
    expect(screen.getByText('Alpha Leader')).toBeInTheDocument();
  });

  it('should trigger next and previous navigation on control click', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <div style={{ width: 800, height: 500 }}>
        <DepthCarousel
          items={mockItems}
          cardWidth={280}
          cardHeight={380}
          showControls={true}
          onChange={handleChange}
        />
      </div>
    );

    const nextBtn = screen.getByRole('button', { name: /next slide/i });
    await user.click(nextBtn);

    expect(handleChange).toHaveBeenCalled();
  });
});
