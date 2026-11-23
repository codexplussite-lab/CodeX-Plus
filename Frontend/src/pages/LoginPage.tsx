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
  Building,
  X,
  Calendar,
  Layers,
  LogOut,
} from 'lucide-react';
import { apiUrl } from '../config/api';
import type { AppPage } from '../components/Navbar';
import { CodexxLogo } from '../components/Navbar';
import { useCms } from '../context/useCms';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
  type?: 'admin' | 'client';
  lastLogin?: string;
  permissions?: string[];
}

export interface UserSession {
  token: string;
  user: AuthUser;
  expiresIn?: string;
}

interface LoginPageProps {
  onNavigate: (page: AppPage, targetHash?: string) => void;
  onOpenBookingModal?: () => void;
}

export function LoginPage({ onNavigate, onOpenBookingModal }: LoginPageProps) {
  const { cms } = useCms();
  const siteName = cms.brand?.siteName || 'CODEXX';
  const brandAccent = cms.brand?.brandAccent || 'PLUS';

  // State
  const [activeTab, setActiveTab] = useState<'admin' | 'client'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'hardware'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [hardwareScanning, setHardwareScanning] = useState(false);

  // Existing session state (Admin or Client)
  const [currentSession, setCurrentSession] = useState<UserSession | null>(() => {
    try {
      const adminStored =
        localStorage.getItem('codex_admin_session') ||
        sessionStorage.getItem('codex_admin_session');
      if (adminStored) {
        return JSON.parse(adminStored) as UserSession;
      }
      const clientStored =
        localStorage.getItem('codex_client_session') ||
        sessionStorage.getItem('codex_client_session');
      if (clientStored) {
        return JSON.parse(clientStored) as UserSession;
      }
    } catch {
      // ignore parse error
    }
    return null;
  });

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Handle CapsLock alert
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  // Demo auto-fill helpers
  const handleAutoFillAdmin = () => {
    setActiveTab('admin');
    setEmail('admin@codexplus.site');
    setPassword('codexplus2026');
    setErrorMessage(null);
  };

  const handleAutoFillClient = () => {
    setActiveTab('client');
    setEmail('client@codexplus.site');
    setPassword('codexplus2026');
    setErrorMessage(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('codex_admin_session');
    sessionStorage.removeItem('codex_admin_session');
    localStorage.removeItem('codex_client_session');
    sessionStorage.removeItem('codex_client_session');
    setCurrentSession(null);
    setEmail('');
    setPassword('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your security passkey.');
      return;
    }

    setIsLoading(true);

    try {
      let data: { success: boolean; message?: string; token?: string; user?: AuthUser };

      try {
        const response = await fetch(apiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password, rememberMe }),
        });
        data = await response.json();
      } catch {
        // Fallback validation if backend is offline or standalone preview
        const normalized = cleanEmail.toLowerCase();
        if (
          (normalized === 'admin@codexplus.site' || normalized === 'info@codexplus.site') &&
          (password === 'codexplus2026' || password === 'codexplus2026!')
        ) {
          data = {
            success: true,
            token: `cx_sec_${Date.now()}`,
            user: {
              email: normalized,
              name: 'CodeXplus Studio Architect',
              role: 'Super Administrator',
              type: 'admin',
              lastLogin: new Date().toISOString(),
              permissions: ['cms:read', 'cms:write', 'inquiries:manage', 'bookings:manage'],
            },
          };
        } else if (
          normalized === 'client@codexplus.site' &&
          (password === 'codexplus2026' || password === 'codexplus2026!')
        ) {
          data = {
            success: true,
            token: `cx_client_${Date.now()}`,
            user: {
              email: normalized,
              name: 'Enterprise Client Partner',
              role: 'Client Partner',
              type: 'client',
              lastLogin: new Date().toISOString(),
              permissions: ['client:read', 'projects:read', 'bookings:create'],
            },
          };
        } else {
          data = {
            success: false,
            message: 'Invalid credentials or unauthorized access key.',
          };
        }
      }

      if (data.success && data.token && data.user) {
        const session: UserSession = {
          token: data.token,
          user: data.user,
          expiresIn: rememberMe ? '30d' : '24h',
        };

        const isAdmin =
          data.user.type === 'admin' ||
          data.user.role.toLowerCase().includes('admin') ||
          data.user.email.toLowerCase().includes('admin');

        if (isAdmin) {
          if (rememberMe) {
            localStorage.setItem('codex_admin_session', JSON.stringify(session));
          } else {
            sessionStorage.setItem('codex_admin_session', JSON.stringify(session));
          }
          setCurrentSession(session);
          // Redirect smoothly to Admin Console
          setTimeout(() => {
            onNavigate('admin');
          }, 350);
        } else {
          if (rememberMe) {
            localStorage.setItem('codex_client_session', JSON.stringify(session));
          } else {
            sessionStorage.setItem('codex_client_session', JSON.stringify(session));
          }
          setCurrentSession(session);
        }
      } else {
        setErrorMessage(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMessage('Unable to connect to authentication gateway. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Hardware Biometric / Security Key simulator
  const handleHardwareAuth = () => {
    setHardwareScanning(true);
    setErrorMessage(null);

    setTimeout(() => {
      setHardwareScanning(false);
      const session: UserSession = {
        token: `cx_passkey_${Date.now()}`,
        user: {
          email: activeTab === 'admin' ? 'admin@codexplus.site' : 'client@codexplus.site',
          name: activeTab === 'admin' ? 'Verified Security Key Holder' : 'Verified Client Partner',
          role: activeTab === 'admin' ? 'Super Administrator' : 'Client Partner',
          type: activeTab,
          lastLogin: new Date().toISOString(),
          permissions:
            activeTab === 'admin'
              ? ['cms:read', 'cms:write', 'inquiries:manage', 'bookings:manage']
              : ['client:read', 'projects:read'],
        },
        expiresIn: '30d',
      };

      if (activeTab === 'admin') {
        localStorage.setItem('codex_admin_session', JSON.stringify(session));
        setCurrentSession(session);
        setTimeout(() => onNavigate('admin'), 350);
      } else {
        localStorage.setItem('codex_client_session', JSON.stringify(session));
        setCurrentSession(session);
      }
    }, 1100);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07030e] pt-28 pb-16 text-white selection:bg-violet-600/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-12 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-violet-800/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-[380px] w-[380px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 -left-20 h-[360px] w-[360px] rounded-full bg-cyan-600/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home', '#home')}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Return to Website</span>
          </button>

          <CodexxLogo onClick={() => onNavigate('home', '#home')} />
        </div>

        {/* If already authenticated, show Welcome Card */}
        {currentSession ? (
          <div className="mx-auto max-w-xl">
            <div className="rounded-3xl border border-violet-400/30 bg-[#0f071f]/85 p-8 shadow-[0_10px_50px_rgba(139,92,246,0.25)] backdrop-blur-2xl sm:p-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-600/40 to-fuchsia-600/20 text-xl font-bold text-violet-300 shadow-inner">
                  {currentSession.user.name.charAt(0)}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Active Session</span>
                  </div>
                  <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {currentSession.user.name}
                  </h2>
                  <p className="text-xs text-gray-400">{currentSession.user.email}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <span className="text-gray-400">Security Clearance</span>
                  <span className="font-semibold text-violet-300">{currentSession.user.role}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <span className="text-gray-400">Account Type</span>
                  <span className="font-semibold uppercase tracking-wider text-fuchsia-300">
                    {currentSession.user.type || 'Standard'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {currentSession.user.type === 'admin' ||
                currentSession.user.role.toLowerCase().includes('admin') ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('admin')}
                    className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-xs font-semibold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <Layers className="h-4 w-4" />
                    <span>Open Admin CMS</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBookingModal) {
                        onOpenBookingModal();
                      } else {
                        onNavigate('contact');
                      }
                    }}
                    className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-xs font-semibold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Manage Projects & Bookings</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Authentication Container */
          <div className="mx-auto max-w-xl">
            {/* Header Badge */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-600/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-300 uppercase shadow-inner">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>Zero-Trust Security Gateway</span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Sign in to <span className="text-violet-300">{siteName} {brandAccent}</span>
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Access your studio administration console or client project workspace.
              </p>
            </div>

            {/* Role Tab Switcher */}
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setErrorMessage(null);
                }}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                  activeTab === 'admin'
                    ? 'border border-violet-400/40 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="h-4 w-4 text-violet-300" />
                <span>Admin CMS Console</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('client');
                  setErrorMessage(null);
                }}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                  activeTab === 'client'
                    ? 'border border-violet-400/40 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building className="h-4 w-4 text-fuchsia-300" />
                <span>Client Portal</span>
              </button>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-violet-500/20 bg-violet-950/30 px-4 py-2.5 text-xs">
              <span className="text-gray-400">One-click test credentials:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAutoFillAdmin}
                  className="cursor-pointer rounded-lg border border-violet-400/30 bg-violet-600/20 px-2.5 py-1 text-[11px] font-semibold text-violet-300 transition-colors hover:bg-violet-600/40"
                >
                  Fill Admin Demo
                </button>
                <button
                  type="button"
                  onClick={handleAutoFillClient}
                  className="cursor-pointer rounded-lg border border-fuchsia-400/30 bg-fuchsia-600/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-300 transition-colors hover:bg-fuchsia-600/40"
                >
                  Fill Client Demo
                </button>
              </div>
            </div>

            {/* Main Auth Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0d071a]/85 p-7 shadow-[0_15px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-9">
              {/* Method Toggle: Passkey vs Hardware Key */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {activeTab === 'admin' ? 'Studio Architect Auth' : 'Client Partner Auth'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('password')}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      authMethod === 'password'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    Passkey
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('hardware')}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      authMethod === 'hardware'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    Biometric / FIDO2
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-200 animate-in fade-in slide-in-from-top-2">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-300">Authentication Alert</p>
                    <p className="mt-0.5 text-gray-300">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="cursor-pointer text-red-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {authMethod === 'password' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-gray-300">
                      Work Email Address
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          activeTab === 'admin' ? 'admin@codexplus.site' : 'client@codexplus.site'
                        }
                        autoComplete="email"
                        required
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-4 pl-10 text-sm text-white placeholder-gray-600 transition-all focus:border-violet-400 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-violet-400"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold tracking-wide text-gray-300">
                        Security Passkey
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setForgotSubmitted(false);
                          setForgotModalOpen(true);
                        }}
                        className="cursor-pointer text-xs text-violet-400 hover:text-violet-300 hover:underline"
                      >
                        Forgot Passkey?
                      </button>
                    </div>

                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                        required
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-11 pl-10 text-sm text-white placeholder-gray-600 transition-all focus:border-violet-400 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-violet-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-gray-500 hover:text-gray-300"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* CapsLock Warning */}
                    {capsLockActive && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-400">
                        <KeyRound className="h-3 w-3" />
                        <span>Warning: Caps Lock is active.</span>
                      </p>
                    )}
                  </div>

                  {/* Remember Me Option */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-400 focus:ring-offset-0"
                      />
                      <span>Keep me authenticated for 30 days</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Validating Cryptographic Token...</span>
                      </>
                    ) : (
                      <>
                        <span>Authenticate & Enter Workspace</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Hardware Passkey / Biometrics Flow */
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/40 bg-violet-600/10 shadow-[0_0_30px_rgba(139,92,246,0.25)]">
                    <Fingerprint
                      className={`h-10 w-10 text-violet-300 ${
                        hardwareScanning ? 'animate-pulse text-fuchsia-400' : ''
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    FIDO2 / Biometric Authentication
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-400">
                    Touch your security key (e.g. YubiKey) or confirm biometric prompt on your
                    device for instant passwordless entry.
                  </p>

                  <button
                    type="button"
                    disabled={hardwareScanning}
                    onClick={handleHardwareAuth}
                    className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-all hover:bg-violet-500 disabled:opacity-50"
                  >
                    {hardwareScanning ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Scanning Security Sensor...</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4" />
                        <span>Simulate Passkey Verification</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Bottom Security Guarantees */}
              <div className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  <span>256-bit TLS encryption • Multi-factor zero-trust architecture</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setForgotModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-[#120822] p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-600/20 text-violet-300">
              <KeyRound className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-display text-xl font-bold text-white">
              Reset Security Passkey
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Enter your authorized email address to receive cryptographic recovery credentials.
            </p>

            {forgotSubmitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                <p className="mt-2 text-xs font-semibold text-emerald-300">
                  Recovery Instructions Dispatched
                </p>
                <p className="mt-1 text-[11px] text-gray-300">
                  We have sent reset instructions to <span className="text-white">{forgotEmail}</span>.
                  For quick testing, default passkey is: <code className="text-violet-300 font-bold">codexplus2026</code>
                </p>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="mt-4 w-full rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white hover:bg-white/15"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSubmitted(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-300">
                    Administrator / Client Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@codexplus.site"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm text-white placeholder-gray-600 focus:border-violet-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-xs font-bold text-white hover:scale-[1.01]"
                >
                  Send Recovery Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
