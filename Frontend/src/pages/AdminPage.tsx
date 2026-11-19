import { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Search,
  Filter,
  Clock,
  Mail,
  RefreshCw,
  Trash2,
  Eye,
  ArrowLeft,
  Calendar,
  Users,
  Layers,
  Activity,
  X,
  Server,
  Send,
} from 'lucide-react';
import { ALL_TEAM_MEMBERS, type FullTeamMember } from '../data/teamData';

interface AdminPageProps {
  onNavigateHome: () => void;
}

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'archived';
  createdAt: string;
  ipAddress?: string;
}

export interface StoredBooking {
  id: string;
  name: string;
  email: string;
  service: string;
  preferredDate?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed';
  createdAt: string;
  ipAddress?: string;
}

// Fallback initial data when backend is not running locally
const FALLBACK_INQUIRIES: StoredInquiry[] = [
  {
    id: 'inq_demo_1',
    name: 'Julian Mercer',
    email: 'julian@northstarcloud.io',
    company: 'Northstar Cloud',
    service: 'Full-Stack Platform',
    budget: '$50k – $100k',
    message:
      'Seeking end-to-end dark-luxury platform re-architecture with distributed multi-agent LLM pipelines. We need sub-second query latency and zero layout shift.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    ipAddress: '198.51.100.24',
  },
  {
    id: 'inq_demo_2',
    name: 'Elena Rostova',
    email: 'elena@owl-systems.com',
    company: 'OWL Systems',
    service: 'AI & Autonomous Systems',
    budget: '$100k+',
    message:
      'Need high-throughput agent workflows for automated regulatory reporting and custom model inference across financial nodes.',
    status: 'in_review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    ipAddress: '203.0.113.19',
  },
  {
    id: 'inq_demo_3',
    name: 'Marcus Vance',
    email: 'marcus@morhemetech.com',
    company: 'Morheme Tech',
    service: 'Motion & 3D WebGL',
    budget: '$25k – $50k',
    message:
      'Looking to commission interactive 3D WebGL hero scenes and spatial product viewer for our upcoming series A keynote.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    ipAddress: '192.0.2.88',
  },
];

const FALLBACK_BOOKINGS: StoredBooking[] = [
  {
    id: 'book_demo_1',
    name: 'David Chen',
    email: 'david@luminalabs.ai',
    service: 'Full-Stack Platform',
    preferredDate: '2026-11-24',
    notes: 'Discussing enterprise cloud architecture sprint and API gateway orchestration.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    ipAddress: '198.51.100.12',
  },
  {
    id: 'book_demo_2',
    name: 'Nadia Karim',
    email: 'nadia@zainabbees.org',
    service: 'Dark Luxury UI/UX',
    preferredDate: '2026-11-26',
    notes: 'Brand guidelines & typography token overhaul for luxury e-commerce launch.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    ipAddress: '203.0.113.44',
  },
];

type ActiveTab = 'inquiries' | 'bookings' | 'team' | 'gateway';

export function AdminPage({ onNavigateHome }: AdminPageProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('codex_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('inquiries');

  // Data states
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [gatewayOnline, setGatewayOnline] = useState<boolean | null>(null);
  const [healthData, setHealthData] = useState<Record<string, unknown> | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');

  // Modal inspection
  const [inspectedInquiry, setInspectedInquiry] = useState<StoredInquiry | null>(null);

  // Fetch Data from Backend
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Health Ping
      const healthRes = await fetch('http://localhost:5000/api/health').catch(() => null);
      if (healthRes && healthRes.ok) {
        const hJson = await healthRes.json();
        setGatewayOnline(true);
        setHealthData(hJson);
      } else {
        setGatewayOnline(false);
      }

      // 2. Inquiries
      const inqRes = await fetch('http://localhost:5000/api/contact').catch(() => null);
      if (inqRes && inqRes.ok) {
        const inqJson = await inqRes.json();
        setInquiries(inqJson.data || []);
      } else {
        setInquiries(FALLBACK_INQUIRIES);
      }

      // 3. Bookings
      const bookRes = await fetch('http://localhost:5000/api/bookings').catch(() => null);
      if (bookRes && bookRes.ok) {
        const bookJson = await bookRes.json();
        setBookings(bookJson.data || []);
      } else {
        setBookings(FALLBACK_BOOKINGS);
      }
    } catch {
      setGatewayOnline(false);
      setInquiries(FALLBACK_INQUIRIES);
      setBookings(FALLBACK_BOOKINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    if (isAuthenticated) {
      void (async () => {
        setLoading(true);
        try {
          const healthRes = await fetch('http://localhost:5000/api/health').catch(() => null);
          if (active && healthRes && healthRes.ok) {
            const hJson = await healthRes.json();
            setGatewayOnline(true);
            setHealthData(hJson);
          } else if (active) {
            setGatewayOnline(false);
          }

          const inqRes = await fetch('http://localhost:5000/api/contact').catch(() => null);
          if (active && inqRes && inqRes.ok) {
            const inqJson = await inqRes.json();
            setInquiries(inqJson.data || []);
          } else if (active) {
            setInquiries(FALLBACK_INQUIRIES);
          }

          const bookRes = await fetch('http://localhost:5000/api/bookings').catch(() => null);
          if (active && bookRes && bookRes.ok) {
            const bookJson = await bookRes.json();
            setBookings(bookJson.data || []);
          } else if (active) {
            setBookings(FALLBACK_BOOKINGS);
          }
        } catch {
          if (active) {
            setGatewayOnline(false);
            setInquiries(FALLBACK_INQUIRIES);
            setBookings(FALLBACK_BOOKINGS);
          }
        } finally {
          if (active) setLoading(false);
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'codex2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('codex_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passcode. Try "codex2026"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('codex_admin_auth');
    setPasscode('');
  };

  // Status updates
  const handleUpdateInquiryStatus = async (id: string, newStatus: StoredInquiry['status']) => {
    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (inspectedInquiry && inspectedInquiry.id === id) {
      setInspectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // offline fallback
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    if (inspectedInquiry?.id === id) setInspectedInquiry(null);

    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // offline fallback
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: StoredBooking['status']) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // offline fallback
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Delete this strategy call booking?')) return;
    setBookings((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // offline fallback
    }
  };

  // Filtered lists
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredBookings = bookings.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      bookingStatusFilter === 'all' || book.status === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // -------------------------------------------------------------
  // Unauthenticated Passcode Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#07040d] px-6 py-20 text-white selection:bg-violet-600/40">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[150px]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#10071e]/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-[#1a0d30] to-fuchsia-600/20 shadow-[0_0_24px_rgba(139,92,246,0.3)]">
              <Lock className="h-6 w-6 text-violet-300" />
            </div>

            <span className="mt-5 text-xs font-semibold tracking-[0.25em] text-violet-300 uppercase">
              CODEXX PLUS Command
            </span>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Studio Admin Portal
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Enter master administrator credentials to access client inquiries, bookings, and telemetry.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-300 uppercase tracking-wider">
                Master Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. codex2026)"
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-violet-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-400/20"
              />
            </div>

            {authError && (
              <p className="text-xs font-medium text-rose-400">{authError}</p>
            )}

            <button
              type="submit"
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
            >
              <span>Authenticate Session</span>
              <Unlock className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setPasscode('codex2026');
                setIsAuthenticated(true);
                sessionStorage.setItem('codex_admin_auth', 'true');
              }}
              className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] py-2 text-xs font-medium text-gray-400 transition-colors hover:border-violet-400/30 hover:bg-white/5 hover:text-white"
            >
              Quick Demo Sign-In
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated Dashboard
  // -------------------------------------------------------------
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="relative min-h-screen bg-[#07040d] pb-24 text-white selection:bg-violet-600/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[450px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/12 blur-[160px]" />

      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0514]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Shield className="h-4 w-4 text-violet-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold tracking-wider text-white uppercase sm:text-base">
                  CODEXX PLUS
                </span>
                <span className="rounded-md border border-violet-400/30 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300 uppercase tracking-widest">
                  Admin Gateway
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Executive Command, Client Pipeline &amp; Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Gateway status badge */}
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs sm:flex">
              <span
                className={`h-2 w-2 rounded-full ${
                  gatewayOnline
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                }`}
              />
              <span className="text-gray-300">
                {gatewayOnline ? 'API Gateway Active (5000)' : 'Local Storage Mode'}
              </span>
            </div>

            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-violet-400/40 hover:bg-white/10 hover:text-white"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-200 transition-all hover:border-violet-300 hover:bg-white/10 sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Public Site</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition-all hover:border-rose-400 hover:bg-rose-500/20"
            >
              Lock Session
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 pt-10">
        {/* KPI Metric HUD Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#130822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Total Inquiries
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                <Mail className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-white">
                {inquiries.length}
              </span>
              {newInquiriesCount > 0 && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  {newInquiriesCount} New
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">Client project briefs submitted</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#130822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Discovery Bookings
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-white">
                {bookings.length}
              </span>
              {pendingBookingsCount > 0 && (
                <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  {pendingBookingsCount} Pending
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">15-Minute strategy consultation calls</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#130822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Studio Principals
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-white">
                {ALL_TEAM_MEMBERS.length}
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                Active Staff
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">Architects, leads &amp; designers</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#130822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Gateway Posture
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                <Server className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-white">
                {gatewayOnline ? '99.98%' : 'Local'}
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                Healthy
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">Port 5000 / Rest JSON DB Engine</p>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'inquiries', label: 'Project Inquiries', icon: Mail, count: inquiries.length },
              { id: 'bookings', label: 'Strategy Bookings', icon: Calendar, count: bookings.length },
              { id: 'team', label: 'Team Directory', icon: Users, count: ALL_TEAM_MEMBERS.length },
              { id: 'gateway', label: 'Gateway Telemetry', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]'
                      : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.2 text-[10px] ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search box for table data */}
          {(activeTab === 'inquiries' || activeTab === 'bookings') && (
            <div className="relative w-full max-w-xs">
              <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, company..."
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 outline-none transition-colors focus:border-violet-400 focus:bg-white/[0.08]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* -------------------------------------------------------- */}
        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="mt-8 space-y-6">
            {/* Status Sub-Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase mr-2 flex items-center gap-1.5">
                <Filter className="h-3 w-3" />
                Status:
              </span>
              {['all', 'new', 'in_review', 'contacted', 'archived'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setInquiryStatusFilter(st)}
                  className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-medium capitalize transition-all ${
                    inquiryStatusFilter === st
                      ? 'border border-violet-400/40 bg-violet-500/20 text-white'
                      : 'border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Inquiries Table Container */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0718]/90 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Client / Company</th>
                      <th className="py-4 px-6 font-semibold">Discipline</th>
                      <th className="py-4 px-6 font-semibold">Budget Tier</th>
                      <th className="py-4 px-6 font-semibold">Received</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inquiry) => (
                        <tr
                          key={inquiry.id}
                          className="transition-colors hover:bg-white/[0.02]"
                        >
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white">{inquiry.name}</div>
                            <div className="text-gray-400">{inquiry.email}</div>
                            {inquiry.company && (
                              <div className="text-[11px] text-violet-300 font-medium">
                                {inquiry.company}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-300">
                              {inquiry.service}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-white">
                              {inquiry.budget}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-400">
                            {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={inquiry.status}
                              onChange={(e) =>
                                handleUpdateInquiryStatus(
                                  inquiry.id,
                                  e.target.value as StoredInquiry['status']
                                )
                              }
                              className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider outline-none cursor-pointer ${
                                inquiry.status === 'new'
                                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                  : inquiry.status === 'in_review'
                                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                                  : inquiry.status === 'contacted'
                                  ? 'border-violet-500/40 bg-violet-500/15 text-violet-300'
                                  : 'border-white/10 bg-white/5 text-gray-400'
                              }`}
                            >
                              <option value="new" className="bg-[#120822] text-white">New</option>
                              <option value="in_review" className="bg-[#120822] text-white">In Review</option>
                              <option value="contacted" className="bg-[#120822] text-white">Contacted</option>
                              <option value="archived" className="bg-[#120822] text-white">Archived</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setInspectedInquiry(inquiry)}
                                className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                title="View Full Brief"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              <a
                                href={`mailto:${inquiry.email}?subject=Regarding your CODEXX PLUS Inquiry (${inquiry.service})`}
                                className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                title="Reply via Email"
                              >
                                <Send className="h-3.5 w-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inquiry.id)}
                                className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/20"
                                title="Delete Record"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'bookings' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase mr-2 flex items-center gap-1.5">
                <Filter className="h-3 w-3" />
                Status:
              </span>
              {['all', 'pending', 'confirmed', 'rescheduled', 'completed'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setBookingStatusFilter(st)}
                  className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-medium capitalize transition-all ${
                    bookingStatusFilter === st
                      ? 'border border-violet-400/40 bg-violet-500/20 text-white'
                      : 'border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0718]/90 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Client Name</th>
                      <th className="py-4 px-6 font-semibold">Discipline</th>
                      <th className="py-4 px-6 font-semibold">Preferred Date</th>
                      <th className="py-4 px-6 font-semibold">Notes</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                          No discovery call bookings found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="transition-colors hover:bg-white/[0.02]"
                        >
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white">{booking.name}</div>
                            <div className="text-gray-400">{booking.email}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-300">
                              {booking.service}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-1.5 text-violet-300 font-medium">
                              <Clock className="h-3.5 w-3.5" />
                              {booking.preferredDate || 'Earliest Available'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-300 max-w-xs truncate">
                            {booking.notes || '—'}
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                handleUpdateBookingStatus(
                                  booking.id,
                                  e.target.value as StoredBooking['status']
                                )
                              }
                              className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider outline-none cursor-pointer ${
                                booking.status === 'confirmed'
                                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                  : booking.status === 'pending'
                                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                                  : booking.status === 'rescheduled'
                                  ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                                  : 'border-white/10 bg-white/5 text-gray-400'
                              }`}
                            >
                              <option value="pending" className="bg-[#120822] text-white">Pending</option>
                              <option value="confirmed" className="bg-[#120822] text-white">Confirmed</option>
                              <option value="rescheduled" className="bg-[#120822] text-white">Rescheduled</option>
                              <option value="completed" className="bg-[#120822] text-white">Completed</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`mailto:${booking.email}?subject=Confirmation: CODEXX PLUS 15-Min Strategy Call`}
                                className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                title="Send Invite / Email"
                              >
                                <Send className="h-3.5 w-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/20"
                                title="Delete Record"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 3: TEAM DIRECTORY */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'team' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Studio Staff &amp; Verified Leads
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  12 verified architects active across Zurich, San Francisco, London &amp; Dubai hubs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ALL_TEAM_MEMBERS.map((member: FullTeamMember) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-12 w-12 rounded-2xl object-cover grayscale contrast-110 border border-white/10"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">{member.name}</h4>
                      <p className="text-[11px] text-violet-300">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-white/5 pt-3">
                    <span className="inline-block rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-gray-300">
                      {member.specialty}
                    </span>
                    <p className="mt-2 text-[11px] text-gray-400">{member.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 4: GATEWAY TELEMETRY & SYSTEM HEALTH */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'gateway' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-violet-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    Live Gateway Telemetry
                  </h3>
                </div>

                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Node API Host</span>
                    <span className="font-mono text-white">http://localhost:5000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Environment</span>
                    <span className="font-mono text-emerald-400 uppercase">
                      {String(healthData?.environment || 'development')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Gateway Version</span>
                    <span className="font-mono text-white">
                      {String(healthData?.version || '1.0.0')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Process Uptime</span>
                    <span className="font-mono text-violet-300">
                      {healthData?.uptimeSeconds !== undefined
                        ? `${healthData.uptimeSeconds} seconds`
                        : 'Active Local Engine'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Storage Backend</span>
                    <span className="font-mono text-white">Local JSON File Store (db.json)</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={fetchData}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:bg-violet-100"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Trigger Gateway Health Check</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-violet-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    API Endpoints Reference
                  </h3>
                </div>

                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        GET
                      </span>
                      <span className="text-white">/api/health</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">System status &amp; uptime</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                        POST
                      </span>
                      <span className="text-white">/api/contact</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Submit client brief / inquiry</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                        POST
                      </span>
                      <span className="text-white">/api/bookings</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Book 15-min strategy session</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        PATCH
                      </span>
                      <span className="text-white">/api/contact/:id</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Update inquiry status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------- */}
      {/* INSPECT INQUIRY MODAL */}
      {/* -------------------------------------------------------- */}
      {inspectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setInspectedInquiry(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-violet-400/30 bg-[#120822] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInspectedInquiry(null)}
              className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-violet-300 uppercase tracking-widest">
                Client Project Brief
              </span>
              <span className="text-xs text-gray-400">&bull;</span>
              <span className="text-xs text-gray-400 font-mono">{inspectedInquiry.id}</span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              {inspectedInquiry.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">
              <span className="text-violet-300 font-medium">{inspectedInquiry.email}</span>
              {inspectedInquiry.company && (
                <>
                  <span>&bull;</span>
                  <span>{inspectedInquiry.company}</span>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-xs">
              <div>
                <span className="text-gray-400 uppercase tracking-wider block text-[10px]">
                  Target Discipline
                </span>
                <span className="font-semibold text-white mt-1 block">
                  {inspectedInquiry.service}
                </span>
              </div>
              <div>
                <span className="text-gray-400 uppercase tracking-wider block text-[10px]">
                  Estimated Budget
                </span>
                <span className="font-semibold text-white mt-1 block">
                  {inspectedInquiry.budget}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                Detailed Project Description
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-gray-200">
                {inspectedInquiry.message}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Update Status:</span>
                <select
                  value={inspectedInquiry.status}
                  onChange={(e) =>
                    handleUpdateInquiryStatus(
                      inspectedInquiry.id,
                      e.target.value as StoredInquiry['status']
                    )
                  }
                  className="rounded-lg border border-white/20 bg-[#160a2c] px-3 py-1.5 text-xs font-semibold text-white outline-none"
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${inspectedInquiry.email}?subject=Regarding your CODEXX PLUS Inquiry (${inspectedInquiry.service})`}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#0a0612] transition-colors hover:bg-violet-100"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Reply to Client</span>
                </a>
                <button
                  type="button"
                  onClick={() => setInspectedInquiry(null)}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
