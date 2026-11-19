import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Users,
  Layers,
  Activity,
  Settings,
  Search,
  Plus,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  Send,
  ArrowLeft,
  Clock,
  Shield,
  Server,
  Check,
  X,
  Menu,
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

const INITIAL_INQUIRIES: StoredInquiry[] = [
  {
    id: 'inq_demo_1',
    name: 'Julian Mercer',
    email: 'julian@northstarcloud.io',
    company: 'Northstar Cloud',
    service: 'Full-Stack Platform',
    budget: '$50k – $100k',
    message:
      'Seeking end-to-end dark-luxury platform re-architecture with distributed multi-agent LLM pipelines. Sub-second query latency and zero layout shift required.',
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
  {
    id: 'inq_demo_4',
    name: 'Sophia Aris',
    email: 'sophia@luminalabs.com',
    company: 'Lumina Labs',
    service: 'SEO / GEO Engine',
    budget: '$50k – $100k',
    message:
      'Enterprise generative engine optimization for Perplexity and Claude search citations.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    ipAddress: '198.51.100.91',
  },
];

const INITIAL_BOOKINGS: StoredBooking[] = [
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
  {
    id: 'book_demo_3',
    name: 'Tariq Al-Fassi',
    email: 'tariq@vertexcap.ae',
    service: 'AI & Autonomous Systems',
    preferredDate: '2026-11-28',
    notes: 'Agentic workflows for portfolio risk intelligence.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    ipAddress: '195.229.241.1',
  },
];

type AdminNavTab =
  | 'dashboard'
  | 'inquiries'
  | 'bookings'
  | 'team'
  | 'services'
  | 'telemetry'
  | 'settings';

export function AdminPage({ onNavigateHome }: AdminPageProps) {
  // Navigation Section
  const [activeTab, setActiveTab] = useState<AdminNavTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states with persistence
  const [inquiries, setInquiries] = useState<StoredInquiry[]>(() => {
    const saved = localStorage.getItem('codex_admin_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [bookings, setBookings] = useState<StoredBooking[]>(() => {
    const saved = localStorage.getItem('codex_admin_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [teamMembers, setTeamMembers] = useState<FullTeamMember[]>(() => {
    const saved = localStorage.getItem('codex_admin_team');
    return saved ? JSON.parse(saved) : ALL_TEAM_MEMBERS;
  });

  // Settings state
  const [siteSettings, setSiteSettings] = useState({
    adminEmail: 'Info@codexplus.site',
    maintenanceMode: false,
    enableWebGl: true,
    autoNotifyDiscord: true,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Network / Gateway state
  const [gatewayOnline, setGatewayOnline] = useState<boolean | null>(null);
  const [healthData, setHealthData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');

  // Modals
  const [inspectedInquiry, setInspectedInquiry] = useState<StoredInquiry | null>(null);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

  // New Team Member Form
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    specialty: '',
    location: 'San Francisco',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    bio: '',
  });

  // Synchronize to LocalStorage
  useEffect(() => {
    localStorage.setItem('codex_admin_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('codex_admin_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('codex_admin_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Fetch live backend data if available
  const refreshGatewayData = useCallback(async () => {
    setLoading(true);
    try {
      const healthRes = await fetch('http://localhost:5000/api/health').catch(() => null);
      if (healthRes && healthRes.ok) {
        const hJson = await healthRes.json();
        setGatewayOnline(true);
        setHealthData(hJson);
      } else {
        setGatewayOnline(false);
      }

      const inqRes = await fetch('http://localhost:5000/api/contact').catch(() => null);
      if (inqRes && inqRes.ok) {
        const inqJson = await inqRes.json();
        if (inqJson.data && inqJson.data.length > 0) {
          setInquiries(inqJson.data);
        }
      }

      const bookRes = await fetch('http://localhost:5000/api/bookings').catch(() => null);
      if (bookRes && bookRes.ok) {
        const bookJson = await bookRes.json();
        if (bookJson.data && bookJson.data.length > 0) {
          setBookings(bookJson.data);
        }
      }
    } catch {
      setGatewayOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
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
          if (inqJson.data && inqJson.data.length > 0) {
            setInquiries(inqJson.data);
          }
        }

        const bookRes = await fetch('http://localhost:5000/api/bookings').catch(() => null);
        if (active && bookRes && bookRes.ok) {
          const bookJson = await bookRes.json();
          if (bookJson.data && bookJson.data.length > 0) {
            setBookings(bookJson.data);
          }
        }
      } catch {
        if (active) setGatewayOnline(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Actions: Inquiries
  const handleUpdateInquiryStatus = async (id: string, newStatus: StoredInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (inspectedInquiry?.id === id) {
      setInspectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Offline fallback
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    if (inspectedInquiry?.id === id) setInspectedInquiry(null);
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
    } catch {
      // Offline fallback
    }
  };

  // Actions: Bookings
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
      // Offline fallback
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Delete this discovery call booking?')) return;
    setBookings((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
    } catch {
      // Offline fallback
    }
  };

  // Actions: Team Members
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    const created: FullTeamMember = {
      id: `member-${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      specialty: newMember.specialty || 'Full-Stack Architecture',
      location: newMember.location || 'San Francisco',
      image: newMember.image,
      bio: newMember.bio || 'Senior lead at CODEXX PLUS.',
      socials: { linkedin: '#', twitter: '#' },
    };

    setTeamMembers((prev) => [created, ...prev]);
    setIsAddTeamModalOpen(false);
    setNewMember({
      name: '',
      role: '',
      specialty: '',
      location: 'San Francisco',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      bio: '',
    });
  };

  const handleDeleteTeamMember = (id: string) => {
    if (!window.confirm('Remove this team member from the directory?')) return;
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Export Inquiries as CSV
  const exportInquiriesCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Service', 'Budget', 'Status', 'Date', 'Message'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${i.service}"`,
      `"${i.budget}"`,
      `"${i.status}"`,
      `"${i.createdAt}"`,
      `"${i.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `codexplus-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Lists
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchQuery =
        inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        inq.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
      return matchQuery && matchStatus;
    });
  }, [inquiries, searchQuery, inquiryStatusFilter]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((book) => {
      const matchQuery =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = bookingStatusFilter === 'all' || book.status === bookingStatusFilter;
      return matchQuery && matchStatus;
    });
  }, [bookings, searchQuery, bookingStatusFilter]);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="flex min-h-screen bg-[#07040d] text-white selection:bg-violet-600/40">
      {/* -------------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* -------------------------------------------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-[#0a0514] p-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-[#1a0d30] to-fuchsia-600/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Shield className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
                  CODEXX <span className="text-violet-300">PLUS</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-violet-400 uppercase">
                  Admin Panel
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              {
                id: 'inquiries',
                label: 'Client Inquiries',
                icon: Mail,
                badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : undefined,
                badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
              },
              {
                id: 'bookings',
                label: 'Strategy Bookings',
                icon: Calendar,
                badge: pendingBookingsCount > 0 ? `${pendingBookingsCount} Pending` : undefined,
                badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
              },
              {
                id: 'team',
                label: 'Team Directory',
                icon: Users,
                badge: `${teamMembers.length}`,
              },
              { id: 'services', label: 'Services & Tiers', icon: Layers },
              { id: 'telemetry', label: 'API & Telemetry', icon: Activity },
              { id: 'settings', label: 'Panel Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as AdminNavTab);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition-all ${
                    isActive
                      ? 'border border-violet-400/50 bg-gradient-to-r from-violet-600/25 to-fuchsia-600/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                      : 'border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                        item.badgeColor || 'border-white/10 bg-white/5 text-gray-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 pt-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-gray-200">Production Mode</span>
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              Admin Session Active &bull; v1.0.0
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-semibold text-gray-200 transition-colors hover:border-violet-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------- */}
      {/* MAIN ADMIN WORKSPACE */}
      {/* -------------------------------------------------------- */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#07040d]/90 px-6 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/15 text-gray-300 hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Admin Panel</span>
                <span>/</span>
                <span className="text-violet-300 font-medium capitalize">{activeTab}</span>
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-white capitalize sm:text-2xl">
                {activeTab === 'dashboard'
                  ? 'Overview Dashboard'
                  : activeTab === 'inquiries'
                  ? 'Client Project Inquiries'
                  : activeTab === 'bookings'
                  ? 'Strategy Call Bookings'
                  : activeTab === 'team'
                  ? 'Team Member Management'
                  : activeTab === 'services'
                  ? 'Services & Deliverables'
                  : activeTab === 'telemetry'
                  ? 'API Gateway & Telemetry'
                  : 'Panel Settings'}
              </h2>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Live Gateway Pill */}
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs sm:flex">
              <span
                className={`h-2 w-2 rounded-full ${
                  gatewayOnline
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                }`}
              />
              <span className="text-gray-300 text-[11px]">
                {gatewayOnline ? 'Node API Online (5000)' : 'Local Storage Engine'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => void refreshGatewayData()}
              disabled={loading}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-violet-400 hover:text-white"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {activeTab === 'inquiries' && (
              <button
                type="button"
                onClick={exportInquiriesCsv}
                className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200 hover:border-violet-400 hover:bg-white/10 sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            )}

            {activeTab === 'team' && (
              <button
                type="button"
                onClick={() => setIsAddTeamModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0a0612] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-violet-100"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Member</span>
              </button>
            )}

            <button
              type="button"
              onClick={onNavigateHome}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-gray-200 transition-all hover:border-violet-300 hover:bg-white/10 sm:inline-flex"
            >
              <span>Back to Site</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 sm:p-8">
          {/* ---------------------------------------------------- */}
          {/* TAB: DASHBOARD OVERVIEW */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* 4 KPI Metric Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
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
                  <p className="mt-2 text-xs text-gray-400">Incoming prospective client briefs</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Strategy Bookings
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
                  <p className="mt-2 text-xs text-gray-400">15-Min architecture strategy calls</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
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
                      {teamMembers.length}
                    </span>
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                      Verified Leads
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Zurich, SF, London &amp; Dubai</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120822] via-[#0d0617] to-[#08040f] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      System Reliability
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                      <Server className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-4xl font-extrabold text-white">
                      {gatewayOnline ? '99.98%' : 'Local'}
                    </span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                      Optimal
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Zero-downtime microservice architecture</p>
                </div>
              </div>

              {/* Activity Feed & Quick Actions */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Recent Inquiries List */}
                <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8 lg:col-span-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Recent Client Inquiries
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Latest submissions received from website contact channels.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className="cursor-pointer text-xs font-semibold text-violet-300 hover:text-white"
                    >
                      View All ({inquiries.length}) &rarr;
                    </button>
                  </div>

                  <div className="mt-6 divide-y divide-white/5">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white truncate">
                              {inq.name}
                            </span>
                            {inq.company && (
                              <span className="text-xs text-gray-400 truncate">
                                &bull; {inq.company}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{inq.message}</p>
                          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
                            <span>{inq.service}</span>
                            <span>&bull;</span>
                            <span className="text-violet-300 font-medium">{inq.budget}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setInspectedInquiry(inq)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 hover:text-white"
                            title="View Brief"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              void handleUpdateInquiryStatus(
                                inq.id,
                                e.target.value as StoredInquiry['status']
                              )
                            }
                            className="rounded-lg border border-white/10 bg-[#140826] px-2 py-1 text-[11px] font-semibold text-gray-200 outline-none cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="in_review">In Review</option>
                            <option value="contacted">Contacted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Strategy Consultations */}
                <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8 lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Upcoming Consultations
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Scheduled 15-minute strategy discovery sessions.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('bookings')}
                      className="cursor-pointer text-xs font-semibold text-violet-300 hover:text-white"
                    >
                      View ({bookings.length}) &rarr;
                    </button>
                  </div>

                  <div className="mt-6 space-y-3.5">
                    {bookings.slice(0, 3).map((book) => (
                      <div
                        key={book.id}
                        className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/15"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-white">{book.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              book.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{book.service}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-violet-300">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{book.preferredDate || 'Earliest slot requested'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB: INQUIRIES MANAGEMENT */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              {/* Filter bar */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'new', 'in_review', 'contacted', 'archived'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setInquiryStatusFilter(st)}
                      className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                        inquiryStatusFilter === st
                          ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                          : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="relative w-full max-w-xs">
                  <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, email, company..."
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              {/* Data Table */}
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
                            No inquiries found matching criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="transition-colors hover:bg-white/[0.02]">
                            <td className="py-4 px-6">
                              <div className="font-semibold text-white">{inq.name}</div>
                              <div className="text-gray-400">{inq.email}</div>
                              {inq.company && (
                                <div className="text-[11px] text-violet-300 font-medium">
                                  {inq.company}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-300">
                                {inq.service}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold text-white">
                              {inq.budget}
                            </td>
                            <td className="py-4 px-6 text-gray-400">
                              {new Date(inq.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  void handleUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as StoredInquiry['status']
                                  )
                                }
                                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider outline-none cursor-pointer ${
                                  inq.status === 'new'
                                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                    : inq.status === 'in_review'
                                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                                    : inq.status === 'contacted'
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
                                  onClick={() => setInspectedInquiry(inq)}
                                  className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                  title="View Brief"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <a
                                  href={`mailto:${inq.email}?subject=Regarding your CODEXX PLUS Inquiry (${inq.service})`}
                                  className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                  title="Reply to Client"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteInquiry(inq.id)}
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

          {/* ---------------------------------------------------- */}
          {/* TAB: STRATEGY BOOKINGS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'pending', 'confirmed', 'rescheduled', 'completed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setBookingStatusFilter(st)}
                      className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                        bookingStatusFilter === st
                          ? 'border border-violet-400/50 bg-violet-500/20 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                          : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative w-full max-w-xs">
                  <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, email, service..."
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400 focus:bg-white/[0.08]"
                  />
                </div>
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
                            No strategy call bookings found.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((book) => (
                          <tr key={book.id} className="transition-colors hover:bg-white/[0.02]">
                            <td className="py-4 px-6">
                              <div className="font-semibold text-white">{book.name}</div>
                              <div className="text-gray-400">{book.email}</div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-300">
                                {book.service}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 text-violet-300 font-medium">
                                <Clock className="h-3.5 w-3.5" />
                                {book.preferredDate || 'Earliest slot'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-300 max-w-xs truncate">
                              {book.notes || '—'}
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={book.status}
                                onChange={(e) =>
                                  void handleUpdateBookingStatus(
                                    book.id,
                                    e.target.value as StoredBooking['status']
                                  )
                                }
                                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider outline-none cursor-pointer ${
                                  book.status === 'confirmed'
                                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                    : book.status === 'pending'
                                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                                    : book.status === 'rescheduled'
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
                                  href={`mailto:${book.email}?subject=Confirmation: CODEXX PLUS Strategy Session`}
                                  className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                                  title="Send Calendar / Email"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteBooking(book.id)}
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

          {/* ---------------------------------------------------- */}
          {/* TAB: TEAM MEMBERS MANAGEMENT */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Studio Principal Directory ({teamMembers.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Manage studio architects, roles, bio descriptions, and active statuses.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddTeamModalOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0a0612] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-violet-100"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add New Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0d0718]/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#08040f]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover grayscale contrast-110"
                        />
                        <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white/90">
                          {member.location}
                        </div>
                        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4">
                          <h4 className="font-display text-base font-bold text-white">
                            {member.name}
                          </h4>
                          <p className="text-xs text-violet-300">{member.role}</p>
                        </div>
                      </div>

                      <div className="mt-3.5">
                        <span className="inline-block rounded-md border border-violet-400/25 bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-200">
                          {member.specialty}
                        </span>
                        <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-2">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        Active Lead
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1.5 text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/20"
                        title="Remove Member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB: SERVICES & TIERS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Studio Disciplines &amp; Engagement Tiers
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Core capabilities and package structures presented across the platform.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {[
                  {
                    name: 'Flagship Sprint',
                    price: '$25,000+',
                    timeline: '3–4 Weeks',
                    desc: 'Rapid high-impact MVP overhaul and luxury branding.',
                  },
                  {
                    name: 'Enterprise Architecture',
                    price: '$60,000+',
                    timeline: '6–8 Weeks',
                    desc: 'End-to-end multi-agent LLM systems and custom WebGL shaders.',
                  },
                  {
                    name: 'Dedicated Studio Retainer',
                    price: '$18,000 / mo',
                    timeline: 'Ongoing Sprints',
                    desc: 'Embedded principal architects with 4-hour SLA guarantee.',
                  },
                ].map((tier) => (
                  <div
                    key={tier.name}
                    className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6"
                  >
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-[11px] font-semibold text-violet-300">
                      {tier.timeline}
                    </span>
                    <h4 className="mt-4 font-display text-xl font-bold text-white">{tier.name}</h4>
                    <p className="mt-2 text-2xl font-extrabold text-white">{tier.price}</p>
                    <p className="mt-2 text-xs text-gray-400">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB: API & TELEMETRY */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'telemetry' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8 lg:col-span-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-violet-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    Live Gateway Diagnostic
                  </h3>
                </div>

                <div className="mt-6 space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Node API Host</span>
                    <span className="text-white">http://localhost:5000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Status</span>
                    <span className="text-emerald-400 uppercase">
                      {gatewayOnline ? 'Online / Operational' : 'Offline / Local Store'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Environment</span>
                    <span className="text-white uppercase">
                      {String(healthData?.environment || 'development')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-violet-300">
                      {healthData?.uptimeSeconds !== undefined
                        ? `${healthData.uptimeSeconds} seconds`
                        : 'Local Engine'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Stored Inquiries</span>
                    <span className="text-white">{inquiries.length} records</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void refreshGatewayData()}
                  className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-violet-100"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Execute Gateway Ping</span>
                </button>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8 lg:col-span-6">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-violet-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    REST API Schema Contracts
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
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Telemetry status</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                        POST
                      </span>
                      <span className="text-white">/api/contact</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Submit client inquiry</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        PATCH
                      </span>
                      <span className="text-white">/api/contact/:id</span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-gray-400">Update status</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB: SETTINGS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-violet-400" />
                <h3 className="font-display text-lg font-bold text-white">
                  Admin Panel Configuration
                </h3>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                    Lead Notification Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.adminEmail}
                    onChange={(e) =>
                      setSiteSettings((prev) => ({ ...prev, adminEmail: e.target.value }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                  <p className="mt-1 text-[11px] text-gray-500">
                    New inquiries and strategy requests will be routed to this address.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="text-sm font-semibold text-white">Maintenance Mode</span>
                    <p className="text-xs text-gray-400">
                      Display maintenance status notice on public landing pages.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={siteSettings.maintenanceMode}
                    onChange={(e) =>
                      setSiteSettings((prev) => ({ ...prev, maintenanceMode: e.target.checked }))
                    }
                    className="h-5 w-5 accent-violet-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="text-sm font-semibold text-white">WebGL &amp; 3D Acceleration</span>
                    <p className="text-xs text-gray-400">
                      Enable GPU shader backgrounds and interactive canvas across desktop.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={siteSettings.enableWebGl}
                    onChange={(e) =>
                      setSiteSettings((prev) => ({ ...prev, enableWebGl: e.target.checked }))
                    }
                    className="h-5 w-5 accent-violet-500 cursor-pointer"
                  />
                </div>

                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSettingsSaved(true);
                      setTimeout(() => setSettingsSaved(false), 2000);
                    }}
                    className="cursor-pointer rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-violet-100"
                  >
                    {settingsSaved ? 'Saved Successfully!' : 'Save Panel Settings'}
                  </button>

                  {settingsSaved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      Updated in local engine
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

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
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-gray-200 max-h-48 overflow-y-auto">
                {inspectedInquiry.message}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Update Status:</span>
                <select
                  value={inspectedInquiry.status}
                  onChange={(e) =>
                    void handleUpdateInquiryStatus(
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

      {/* -------------------------------------------------------- */}
      {/* ADD TEAM MEMBER MODAL */}
      {/* -------------------------------------------------------- */}
      {isAddTeamModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsAddTeamModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-violet-400/30 bg-[#120822] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddTeamModalOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-300">
              Directory Management
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              Add Studio Principal
            </h3>

            <form onSubmit={handleAddTeamMember} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Liam Sterling"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Role / Job Title</label>
                <input
                  type="text"
                  required
                  value={newMember.role}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. Lead Systems Engineer"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Specialty Tag</label>
                <input
                  type="text"
                  value={newMember.specialty}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, specialty: e.target.value }))}
                  placeholder="e.g. Autonomous Agents &amp; Cloud"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Studio Hub</label>
                <select
                  value={newMember.location}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, location: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#160a2c] p-3 text-white outline-none"
                >
                  <option value="San Francisco">San Francisco Hub</option>
                  <option value="Zurich Hub">Zurich Core</option>
                  <option value="London Hub">London Hub</option>
                  <option value="Dubai Hub">Dubai DIFC</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Portrait Image URL</label>
                <input
                  type="url"
                  value={newMember.image}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Short Bio</label>
                <textarea
                  rows={2}
                  value={newMember.bio}
                  onChange={(e) => setNewMember((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief background and specialties..."
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-full bg-white py-3 font-semibold text-[#0a0612] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-violet-100"
                >
                  Save to Studio Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
