import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import AdminLogin from '../admin/AdminLogin.jsx';

describe('AdminLogin Component', () => {
  it('should render login form inputs and title', () => {
    render(<AdminLogin onLogin={() => {}} onBackToSite={() => {}} />);

    expect(screen.getByText('Codex Admin')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/admin@codexplus.site or admin/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in to Dashboard/i })).toBeInTheDocument();
  });

  it('should show error when invalid credentials submitted', async () => {
    render(<AdminLogin onLogin={() => {}} onBackToSite={() => {}} />);

    const userInput = screen.getByPlaceholderText(/admin@codexplus.site or admin/i);
    const passInput = screen.getByPlaceholderText('••••••••••••');
    const submitBtn = screen.getByRole('button', { name: /Sign in to Dashboard/i });

    fireEvent.change(userInput, { target: { value: 'wronguser' } });
    fireEvent.change(passInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitBtn);

    const errorMsg = await screen.findByText(/Invalid username or password/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
