import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, Activity, CheckCircle2 } from 'lucide-react';

export default function AdminLogin({ onLogin, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanUser = email.trim().toLowerCase();
    const cleanPass = password.trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, email: cleanUser, password: cleanPass }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        localStorage.setItem('avista_admin_token', data.token || ('token_' + Date.now()));
        onLogin(data.user || { name: 'Arnold Vain (Founder & CEO)', role: 'Administrator', email: cleanUser });
        return;
      }
    } catch {
      // Backend request fallback
    }

    // Direct fallback check for local admin
    const isValid =
      (cleanUser === 'admin' || cleanUser === 'admin@codexplus.site' || cleanUser === 'hello@avista.studio') &&
      (cleanPass === 'admin123' || cleanPass === 'password123' || cleanPass === 'admin');

    if (isValid) {
      const fallbackUser = {
        username: cleanUser,
        name: 'Arnold Vain (Founder & CEO)',
        role: 'Administrator',
      };
      localStorage.setItem('avista_admin_token', 'token_' + Date.now());
      onLogin(fallbackUser);
    } else {
      setError('Invalid username or password. (Demo: admin / admin123 or hello@avista.studio / password123)');
    }
    setLoading(false);
  };

  const handleQuickDemo = () => {
    setEmail('hello@avista.studio');
    setPassword('password123');
    onLogin({
      username: 'hello@avista.studio',
      name: 'Arnold Vain (Founder & CEO)',
      role: 'Administrator',
    });
  };

  return (
    <div style={{
      '--paper': '#edeef1',
      '--paper-2': '#e1e3e9',
      '--white': '#fafafb',
      '--ink': '#15171c',
      '--ink-soft': '#4a4f5c',
      '--line': 'rgba(21, 23, 28, 0.14)',
      color: '#15171c',
      minHeight: '100vh',
      background: 'var(--paper)',
      color: 'var(--ink)',
      fontFamily: 'var(--body)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'var(--white)',
        border: '1.5px solid var(--line)',
        borderRadius: '1.75rem',
        padding: '2.5rem',
        boxShadow: '0 20px 40px -15px rgba(21, 23, 28, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button
            onClick={onBackToSite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--ink-soft)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Site</span>
          </button>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: 'rgba(51, 38, 255, 0.08)',
            color: 'var(--blue)',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            <Activity size={12} />
            <span>Avista Studio Portal</span>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <span style={{
              width: '1.2rem',
              height: '1.2rem',
              background: 'var(--blue)',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)'
            }} />
            <h1 style={{
              fontFamily: 'var(--display)',
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: 0
            }}>
              Avista Admin
            </h1>
          </div>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: 0 }}>
            Sign in to manage client inquiries, newsletter subscriptions, and live studio CMS.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 106, 61, 0.1)',
            border: '1px solid var(--coral)',
            color: 'var(--coral)',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Admin Email / Username
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid var(--line)',
              borderRadius: '0.75rem',
              padding: '0.6rem 0.8rem',
              background: 'var(--paper)'
            }}>
              <Mail size={16} color="var(--ink-soft)" style={{ marginRight: '0.6rem' }} />
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hello@avista.studio or admin"
                required
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--ink)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Security Password
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid var(--line)',
              borderRadius: '0.75rem',
              padding: '0.6rem 0.8rem',
              background: 'var(--paper)'
            }}>
              <Lock size={16} color="var(--ink-soft)" style={{ marginRight: '0.6rem' }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--ink)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.4rem',
              borderRadius: '999px',
              background: 'var(--blue)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign in to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{
          marginTop: '1.8rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem'
        }}>
          <button
            type="button"
            onClick={handleQuickDemo}
            style={{ color: 'var(--blue)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Demo One-Click Login
          </button>
          <span style={{ color: 'var(--ink-soft)' }}>Arnold Vain (CEO)</span>
        </div>
      </div>
    </div>
  );
}
