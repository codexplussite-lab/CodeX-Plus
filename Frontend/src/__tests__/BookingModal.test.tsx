import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingModal } from '../components/BookingModal';
import { CmsProvider } from '../context/CmsContext';

describe('BookingModal Component', () => {
  it('should not render content when open is false', () => {
    render(
      <CmsProvider>
        <BookingModal open={false} onClose={vi.fn()} />
      </CmsProvider>
    );

    expect(screen.queryByText(/Schedule a Discovery Call/i)).not.toBeInTheDocument();
  });

  it('should render form fields when open is true and handle close button', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <CmsProvider>
        <BookingModal open={true} onClose={handleClose} />
      </CmsProvider>
    );

    expect(screen.getByText(/Schedule a Discovery Call/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Elena Rostova/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@company\.com/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    await user.click(closeBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
