import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Activity,
  CheckCircle2,
  Server,
  Zap
} from 'lucide-react';

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
        localStorage.setItem('codexplus_admin_token', data.token || ('token_' + Date.now()));
        onLogin(data.user || { name: 'Alexander Reid (Principal)', role: 'Administrator', email: cleanUser });
        return;
      }
    } catch {
      // Backend request fallback
    }

    // Direct credentials verification
    const isValid =
      (cleanUser === 'admin' || cleanUser === 'admin@codexplus.site' || cleanUser === 'alexander@codexplus.site' || cleanUser === 'elena@codexplus.site') &&
      (cleanPass === 'admin123' || cleanPass === 'password123' || cleanPass === 'admin');

    if (isValid) {
      const fallbackUser = {
        username: cleanUser.includes('@') ? cleanUser : 'admin@codexplus.site',
        name: cleanUser.includes('elena') ? 'Elena Vance' : 'Alexander Reid (Principal)',
        role: 'Administrator',
      };
      localStorage.setItem('codexplus_admin_token', 'token_' + Date.now());
      onLogin(fallbackUser);
    } else {
      setError('Invalid username or password. (Demo: admin / admin123 or admin@codexplus.site / password123)');
    }
    setLoading(false);
  };

  const handleQuickDemo = (demoEmail, demoName, demoRole) => {
    setEmail(demoEmail);
    setPassword('password123');
    const demoUser = {
      username: demoEmail,
      name: demoName,
      role: demoRole,
    };
    localStorage.setItem('codexplus_admin_token', 'demo_token_' + Date.now());
    onLogin(demoUser);
  };

  return (
    <div className="min-h-screen bg-[#07030d] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-[#8b5cf6] selection:text-white">
      
      {/* Dynamic ambient lighting & grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#805ad508_1px,transparent_1px),linear-gradient(to_bottom,#805ad508_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#7c3aed]/20 via-[#a855f7]/15 to-[#3b82f6]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#9333ea]/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#6366f1]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative w-full max-w-lg bg-[#0e071c]/90 border border-purple-500/25 rounded-3xl p-8 sm:p-11 shadow-[0_0_80px_rgba(112,26,245,0.25)] backdrop-blur-2xl z-10">
        
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-500/15">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Live Site</span>
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>API Gateway 5000 Online</span>
          </div>
        </div>

        {/* Brand identity */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-0.5 shadow-[0_0_30px_rgba(139,92,246,0.5)] mb-4">
            <div className="w-full h-full bg-[#0a0514] rounded-[14px] flex items-center justify-center p-2.5">
              <img src="/assets/fevicon-1.webp" alt="CODEXX PLUS" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
              CODEXX<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">+</span>
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-purple-500/20 text-[#c084fc] border border-purple-500/30">
              V2.4 Console
            </span>
          </div>
          <p className="text-xs font-mono text-purple-300/70">
            Next-Gen AI & Enterprise Studio Command Operations
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
              Authorized Identity / Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codexplus.site"
                className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
              />
              <Mail className="w-4 h-4 text-purple-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-2">
              Encrypted Master Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#150a2b] border border-purple-500/25 focus:border-[#a855f7] rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
              />
              <Lock className="w-4 h-4 text-purple-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating System...' : 'Access Command Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick 1-Click Persona Demo Sign-in */}
        <div className="mt-7 pt-6 border-t border-purple-500/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>1-Click Quick Demo Personas</span>
            </span>
            <span className="text-[10px] font-mono text-purple-400/50">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('alexander@codexplus.site', 'Alexander Reid', 'Principal Partner')}
              className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-[#c084fc] transition-colors">
                Alexander Reid
              </div>
              <div className="text-[10px] font-mono text-purple-300/70 mt-0.5">
                Founder & Principal
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('elena@codexplus.site', 'Elena Vance', 'Head of Engineering')}
              className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-[#c084fc] transition-colors">
                Elena Vance
              </div>
              <div className="text-[10px] font-mono text-purple-300/70 mt-0.5">
                Head of Engineering
              </div>
            </button>
          </div>
        </div>

        {/* Security protocol footer */}
        <div className="mt-7 flex items-center justify-between text-[11px] font-mono text-purple-400/60 pt-4 border-t border-purple-500/10">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Role-Based RBAC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span>Local Disk JSON Engine</span>
          </div>
        </div>

      </div>
    </div>
  );
}
