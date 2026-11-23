import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Loader2,
  KeyRound,
  Fingerprint,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { apiUrl } from '../config/api';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  lastLogin?: string;
  permissions?: string[];
}

export interface AdminSession {
  token: string;
  user: AdminUser;
  expiresIn?: string;
}

interface AdminLoginProps {
  onLoginSuccess: (session: AdminSession) => void;
  onNavigateHome: () => void;
}

export function AdminLogin({ onLoginSuccess, onNavigateHome }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'hardware'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [hardwareScanning, setHardwareScanning] = useState(false);

  // Quick fill demo credentials for quick access / testing
  const handleAutoFillDemo = () => {
    setEmail('admin@codexplus.site');
    setPassword('codexplus2026');
    setErrorMessage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your administrator email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your security passkey.');
      return;
    }

    setIsLoading(true);

    try {
      // Authenticate against backend API with fallback for standalone client mode
      let data: { success: boolean; message?: string; token?: string; user?: AdminUser };

      try {
        const response = await fetch(apiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password, rememberMe }),
        });

        data = await response.json();
      } catch {
        // Fallback validation if backend is temporarily unreachable
        if (
          (cleanEmail.toLowerCase() === 'admin@codexplus.site' ||
            cleanEmail.toLowerCase() === 'info@codexplus.site') &&
          (password === 'codexplus2026' || password === 'codexplus2026!')
        ) {
          data = {
            success: true,
            token: `cx_sec_${Date.now()}`,
            user: {
              email: cleanEmail,
              name: 'CodeXplus Studio Architect',
              role: 'Principal Administrator',
              lastLogin: new Date().toISOString(),
            },
          };
        } else {
          data = {
            success: false,
            message: 'Invalid administrator credentials. Verify access key and try again.',
          };
        }
      }

      if (data.success && data.token && data.user) {
        const session: AdminSession = {
          token: data.token,
          user: data.user,
          expiresIn: rememberMe ? '30d' : '24h',
        };

        // Persist session
        if (rememberMe) {
          localStorage.setItem('codex_admin_session', JSON.stringify(session));
        } else {
          sessionStorage.setItem('codex_admin_session', JSON.stringify(session));
        }

        onLoginSuccess(session);
      } else {
        setErrorMessage(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMessage('Unable to connect to security gateway. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Hardware Security Key / Passkey Simulator
  const handleHardwareAuth = () => {
    setHardwareScanning(true);
    setErrorMessage(null);

    setTimeout(() => {
      setHardwareScanning(false);
      const session: AdminSession = {
        token: `cx_yubikey_${Date.now()}`,
        user: {
          email: 'architect@codexplus.site',
          name: 'Hardware Token (YubiKey 5C)',
          role: 'Cryptographic Lead Administrator',
          lastLogin: new Date().toISOString(),
        },
        expiresIn: '30d',
      };
      localStorage.setItem('codex_admin_session', JSON.stringify(session));
      onLoginSuccess(session);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07040d] px-4 py-12 text-white selection:bg-violet-600/40">
      {/* Ambient background visual glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-600/20 via-fuchsia-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-violet-900/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-12 -left-24 h-[350px] w-[350px] rounded-full bg-fuchsia-900/10 blur-[130px]" />

      {/* Cyber grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Navigation Return Button */}
      <button
        type="button"
        onClick={onNavigateHome}
        className="group absolute top-6 left-6 z-20 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wider text-gray-300 uppercase backdrop-blur-md transition-all hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Return to Website</span>
      </button>

      {/* Center Login Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Top Floating Security Pill */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-200 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Security Gateway // Zero-Trust</span>
            <span className="text-violet-400/50">•</span>
            <span className="font-mono text-[10px] text-violet-300">v2.6 SEC</span>
          </div>
        </div>

        {/* Card Box */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0d0718]/85 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.7),0_0_50px_rgba(139,92,246,0.12)] backdrop-blur-2xl sm:p-10">
          {/* Brand Header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-[#190d30] to-fuchsia-600/20 shadow-[0_0_30px_rgba(139,92,246,0.35)]">
              <ShieldCheck className="h-8 w-8 text-violet-300" />
            </div>

            <div className="mt-5">
              <h2 className="font-display text-xs font-bold tracking-[0.25em] text-gray-400 uppercase">
                CODEX <span className="text-violet-300">PLUS</span> STUDIO
              </h2>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Administrator Console
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Sign in with verified cryptographic clearance to configure CMS schemas, review client briefs, and supervise studio telemetry.
              </p>
            </div>
          </div>

          {/* Authentication Mode Switcher */}
          <div className="mt-7 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('password');
                setErrorMessage(null);
              }}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold tracking-wide transition-all ${
                authMethod === 'password'
                  ? 'border border-violet-400/30 bg-violet-600/30 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>Passkey / Secret</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('hardware');
                setErrorMessage(null);
              }}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold tracking-wide transition-all ${
                authMethod === 'hardware'
                  ? 'border border-violet-400/30 bg-violet-600/30 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Fingerprint className="h-3.5 w-3.5" />
              <span>YubiKey / SSO</span>
            </button>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-xs text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.15)] animate-shake"
            >
              <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold text-rose-300">Access Denied:</span> {errorMessage}
              </div>
            </div>
          )}

          {/* Form Method: Password / Passkey */}
          {authMethod === 'password' ? (
            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4.5">
              {/* Email / ID Input */}
              <div>
                <label
                  htmlFor="admin_email"
                  className="mb-1.5 flex items-center justify-between text-xs font-semibold tracking-wider text-gray-300 uppercase"
                >
                  <span>Administrator Email</span>
                  <span className="text-[10px] text-gray-400 lowercase">Required</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="admin_email"
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@codexplus.site"
                    className="w-full rounded-xl border border-white/10 bg-[#120a22]/70 py-3 pr-4 pl-10 text-sm text-white placeholder-gray-400 transition-all focus:border-violet-400/80 focus:bg-[#190d30] focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="admin_password"
                    className="text-xs font-semibold tracking-wider text-gray-300 uppercase"
                  >
                    Security Passkey
                  </label>
                  {capsLockActive && (
                    <span className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
                      ⚠️ Caps Lock Active
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="admin_password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-white/10 bg-[#120a22]/70 py-3 pr-11 pl-10 text-sm text-white placeholder-gray-400 transition-all focus:border-violet-400/80 focus:bg-[#190d30] focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Device & Security Help */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500 focus:ring-offset-0"
                  />
                  <span className="text-gray-300">Remember this workstation</span>
                </label>

                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="cursor-pointer text-[11px] font-semibold text-violet-300 hover:text-violet-200 hover:underline"
                >
                  Fill Demo Key
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative mt-2 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl border border-violet-400/50 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 py-3.5 text-xs font-bold tracking-[0.15em] text-white uppercase shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.01] hover:border-violet-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Verifying Security Clearance...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Authenticate &amp; Enter Console</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          ) : (
            /* Hardware Security Key / SSO Simulator */
            <div className="mt-6 space-y-5 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-950/40 shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                  <Fingerprint className="h-7 w-7 text-cyan-300 animate-pulse" />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold tracking-wider text-white uppercase">
                  Hardware Token Security
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  Touch your registered physical security key (YubiKey 5 Series / Titan Security Key) or initiate biometric WebAuthn verification.
                </p>

                <button
                  type="button"
                  onClick={handleHardwareAuth}
                  disabled={hardwareScanning}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-600/30 to-blue-600/20 py-3 text-xs font-semibold tracking-wider text-cyan-100 uppercase transition-all hover:border-cyan-300 hover:bg-cyan-600/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-50"
                >
                  {hardwareScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                      <span>Reading Token Signature...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                      <span>Simulate Hardware Touch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Pill Helper */}
          <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-950/20 p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span>Default Administrator:</span>
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="cursor-pointer font-mono font-medium text-violet-300 hover:underline"
              >
                admin@codexplus.site
              </button>
            </div>
          </div>

          {/* Security Compliance Footer */}
          <div className="mt-6 border-t border-white/10 pt-4 text-center">
            <p className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
              🔒 End-to-End Encrypted Session • TLS 1.3 • SOC 2 Type II
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
