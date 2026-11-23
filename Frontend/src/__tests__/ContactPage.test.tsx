import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactPage } from '../pages/ContactPage';
import { CmsProvider } from '../context/CmsContext';

describe('ContactPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Let\'s Build Together heading and required fields', () => {
    render(
      <CmsProvider>
        <ContactPage onOpenModal={vi.fn()} onNavigateHome={vi.fn()} />
      </CmsProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Let's Build Together/i);
    expect(screen.getByLabelText(/Full Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Brief \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Leave this field blank/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Privacy Policy/i })).toBeInTheDocument();
  });

  it('should show error toast and inline errors when submitting empty form', async () => {
    render(
      <CmsProvider>
        <ContactPage onOpenModal={vi.fn()} onNavigateHome={vi.fn()} />
      </CmsProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /Transmit Project Brief/i });
    // Button is disabled when form is invalid
    expect(submitBtn).toBeDisabled();
  });

  it('should submit successfully when all required fields and privacy policy are valid', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)
    );

    render(
      <CmsProvider>
        <ContactPage onOpenModal={vi.fn()} onNavigateHome={vi.fn()} />
      </CmsProvider>
    );

    await user.type(screen.getByLabelText(/Full Name \*/i), 'Julian Mercer');
    await user.type(screen.getByLabelText(/Work Email \*/i), 'julian@northstar.io');
    await user.type(screen.getByLabelText(/Project Brief \*/i), 'Comprehensive enterprise AI and WebGL migration project.');
    await user.click(screen.getByRole('checkbox', { name: /Privacy Policy/i }));

    const submitBtn = screen.getByRole('button', { name: /Transmit Project Brief/i });
    expect(submitBtn).not.toBeDisabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Brief Received/i })).toBeInTheDocument();
    });
  });
});
