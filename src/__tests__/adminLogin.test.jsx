import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import AdminLogin from '../admin/AdminLogin';

describe('AdminLogin Component', () => {
  it('should render password input and login button', () => {
    render(<AdminLogin onLogin={vi.fn()} />);

    expect(screen.getByPlaceholderText('••••••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Access Command Console/i })).toBeInTheDocument();
  });

  it('should show error when wrong password is submitted', async () => {
    render(<AdminLogin onLogin={vi.fn()} />);

    const emailInput = screen.getByPlaceholderText('admin@codexplus.site');
    const passwordInput = screen.getByPlaceholderText('••••••••••••');
    const submitBtn = screen.getByRole('button', { name: /Access Command Console/i });

    fireEvent.change(emailInput, { target: { value: 'admin@codexplus.site' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-pass' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
  });

  it('should call onLogin callback when demo persona is clicked', () => {
    const onLogin = vi.fn();
    render(<AdminLogin onLogin={onLogin} />);

    const demoBtn = screen.getByRole('button', { name: /Alexander Reid/i });
    fireEvent.click(demoBtn);

    expect(onLogin).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Alexander Reid',
        role: 'Principal Partner',
      })
    );
  });
});
