import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminLogin } from '../components/AdminLogin';

describe('AdminLogin Component', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders login form elements and security branding', () => {
    render(<AdminLogin onLoginSuccess={vi.fn()} onNavigateHome={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /Administrator Console/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Administrator Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Security Passkey/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Authenticate & Enter Console/i })).toBeInTheDocument();
    expect(screen.getByText(/Return to Website/i)).toBeInTheDocument();
  });

  it('triggers onNavigateHome when return button is clicked', () => {
    const handleReturn = vi.fn();
    render(<AdminLogin onLoginSuccess={vi.fn()} onNavigateHome={handleReturn} />);

    fireEvent.click(screen.getByText(/Return to Website/i));
    expect(handleReturn).toHaveBeenCalledTimes(1);
  });

  it('autofills demo credentials on clicking Fill Demo Key', () => {
    render(<AdminLogin onLoginSuccess={vi.fn()} onNavigateHome={vi.fn()} />);

    const fillBtn = screen.getByRole('button', { name: /Fill Demo Key/i });
    fireEvent.click(fillBtn);

    const emailInput = screen.getByLabelText(/Administrator Email/i) as HTMLInputElement;
    const passInput = screen.getByLabelText(/Security Passkey/i) as HTMLInputElement;

    expect(emailInput.value).toBe('admin@codexplus.site');
    expect(passInput.value).toBe('codexplus2026');
  });

  it('authenticates and calls onLoginSuccess with valid credentials', async () => {
    const handleLoginSuccess = vi.fn();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          token: 'cx_sec_mocktoken',
          user: {
            email: 'admin@codexplus.site',
            name: 'CodeXplus Studio Architect',
            role: 'Principal Administrator',
          },
        }),
      } as Response)
    );

    render(<AdminLogin onLoginSuccess={handleLoginSuccess} onNavigateHome={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Administrator Email/i), {
      target: { value: 'admin@codexplus.site' },
    });
    fireEvent.change(screen.getByLabelText(/Security Passkey/i), {
      target: { value: 'codexplus2026' },
    });

    const submitBtn = screen.getByRole('button', { name: /Authenticate & Enter Console/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleLoginSuccess).toHaveBeenCalledTimes(1);
      expect(handleLoginSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'cx_sec_mocktoken',
          user: expect.objectContaining({
            email: 'admin@codexplus.site',
          }),
        })
      );
    });
  });

  it('shows error notice when backend rejects credentials', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          message: 'Invalid administrator credentials.',
        }),
      } as Response)
    );

    render(<AdminLogin onLoginSuccess={vi.fn()} onNavigateHome={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Administrator Email/i), {
      target: { value: 'wrong@codexplus.site' },
    });
    fireEvent.change(screen.getByLabelText(/Security Passkey/i), {
      target: { value: 'wrongpass' },
    });

    const submitBtn = screen.getByRole('button', { name: /Authenticate & Enter Console/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Invalid administrator credentials/i)).toBeInTheDocument();
    });
  });
});

