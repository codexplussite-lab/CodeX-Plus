import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Layers,
  Users,
  MessageSquare,
  Building2,
  Mail,
  Calendar,
  Activity,
  Plus,
  Trash2,
  Check,
  Eye,
  ArrowLeft,
  Sparkles,
  Save,
  RotateCcw,
  Search,
  ExternalLink,
  Star,
  MapPin,
  Clock,
  X,
  Menu,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import type { ServiceItem, TestimonialItem } from '../data/siteData';
import type { FullTeamMember } from '../data/teamData';

interface AdminPageProps {
  onNavigateHome: () => void;
}

type CmsSection =
  | 'overview'
  | 'hero'
  | 'services'
  | 'team'
  | 'testimonials'
  | 'about'
  | 'contact'
  | 'inquiries'
  | 'bookings'
  | 'telemetry';

export function AdminPage({ onNavigateHome }: AdminPageProps) {
  const {
    cms,
    updateHero,
    updateAbout,
    updateContact,
    addService,
    updateService,
    deleteService,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    saveAndPublish,
    resetToDefaults,
    isSaving,
    lastPublished,
  } = useCms();

  const [activeSection, setActiveSection] = useState<CmsSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [publishToast, setPublishToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Editing States
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  // New Item Modals
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false);

  // Form buffers for new items
  const [newServiceForm, setNewServiceForm] = useState({
    title: '',
    tag: 'Full-Stack & AI',
    description: '',
  });

  const [newTeamForm, setNewTeamForm] = useState({
    name: '',
    role: '',
    specialty: '',
    location: 'San Francisco',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    bio: '',
  });

  const [newTestimonialForm, setNewTestimonialForm] = useState({
    name: '',
    role: '',
    avatar: '/images/client-1.jpg',
    rating: 5,
    quote: '',
  });

  // Handle master publish
  const handlePublish = async () => {
    await saveAndPublish();
    setPublishToast(true);
    setTimeout(() => setPublishToast(false), 2500);
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    return cms.services.filter(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.services, searchQuery]);

  // Filtered Team
  const filteredTeam = useMemo(() => {
    return cms.team.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.team, searchQuery]);

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    return cms.testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.testimonials, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#07040d] text-white selection:bg-violet-600/40">
      {/* -------------------------------------------------------- */}
      {/* LEFT CMS SIDEBAR */}
      {/* -------------------------------------------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-[#090513] p-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand & CMS Wordmark */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-[#1a0d30] to-fuchsia-600/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
                  CODEXX <span className="text-violet-300">PLUS</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-violet-400 uppercase">
                  Content Management System
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

          {/* Navigation Category: Site CMS Content */}
          <div className="mt-6">
            <span className="px-3 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Page Content Management
            </span>
            <nav className="mt-2 space-y-1">
              {[
                { id: 'overview', label: 'CMS Overview', icon: LayoutDashboard },
                { id: 'hero', label: 'Hero & Branding', icon: Sparkles },
                { id: 'services', label: 'Services & Disciplines', icon: Layers, count: cms.services.length },
                { id: 'team', label: 'Team Directory', icon: Users, count: cms.team.length },
                { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquare, count: cms.testimonials.length },
                { id: 'about', label: 'About Studio & Stats', icon: Building2 },
                { id: 'contact', label: 'Global Hubs & Contact', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id as CmsSection);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'border border-violet-400/50 bg-gradient-to-r from-violet-600/25 to-fuchsia-600/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-gray-400">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Navigation Category: Inbound Communications */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <span className="px-3 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Inbox &amp; Gateway
            </span>
            <nav className="mt-2 space-y-1">
              {[
                { id: 'inquiries', label: 'Client Inquiries', icon: Mail },
                { id: 'bookings', label: 'Strategy Bookings', icon: Calendar },
                { id: 'telemetry', label: 'API & Telemetry', icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id as CmsSection);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'border border-violet-400/50 bg-violet-600/25 text-white'
                        : 'border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="border-t border-white/10 pt-5 space-y-3">
          <button
            type="button"
            onClick={resetToDefaults}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-[11px] font-semibold text-gray-400 hover:border-white/20 hover:text-rose-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Content Defaults</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-semibold text-gray-200 hover:border-violet-300 hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Preview Live Website</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------- */}
      {/* CMS MAIN WORKSPACE */}
      {/* -------------------------------------------------------- */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#07040d]/90 px-6 backdrop-blur-xl sm:px-8">
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
                <span>CMS Studio</span>
                <span>/</span>
                <span className="text-violet-300 font-medium capitalize">{activeSection}</span>
              </div>
              <h1 className="font-display text-xl font-bold tracking-tight text-white capitalize sm:text-2xl">
                {activeSection === 'overview'
                  ? 'Content Management Dashboard'
                  : activeSection === 'hero'
                  ? 'Hero & Branding Manager'
                  : activeSection === 'services'
                  ? 'Services & Capabilities CMS'
                  : activeSection === 'team'
                  ? 'Team Directory CMS'
                  : activeSection === 'testimonials'
                  ? 'Client Testimonials CMS'
                  : activeSection === 'about'
                  ? 'About Studio & Pillars'
                  : activeSection === 'contact'
                  ? 'Global Hubs & Direct Channels'
                  : activeSection === 'inquiries'
                  ? 'Incoming Client Inquiries'
                  : activeSection === 'bookings'
                  ? 'Strategy Consultation Bookings'
                  : 'API Gateway Telemetry'}
              </h1>
            </div>
          </div>

          {/* Master Save & Publish Actions */}
          <div className="flex items-center gap-3">
            {lastPublished && (
              <span className="hidden text-[11px] text-gray-400 xl:inline-block">
                Last published: <span className="text-violet-300 font-mono">{lastPublished}</span>
              </span>
            )}

            <button
              type="button"
              onClick={handlePublish}
              disabled={isSaving}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] disabled:opacity-75"
            >
              <Save className={`h-3.5 w-3.5 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Publishing...' : 'Publish to Live Site'}</span>
            </button>
          </div>
        </header>

        {/* Floating Toast Notification */}
        {publishToast && (
          <div className="fixed top-24 right-8 z-50 flex items-center gap-2 rounded-2xl border border-emerald-400/40 bg-[#120822] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-top-3">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Changes published to live website and database!</span>
          </div>
        )}

        {/* Main Section Content */}
        <main className="p-6 sm:p-8">
          {/* ==================================================== */}
          {/* SECTION: OVERVIEW */}
          {/* ==================================================== */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              {/* CMS Quick Stat Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: 'Active Services',
                    val: cms.services.length,
                    sub: 'Capabilities configured',
                    section: 'services',
                    icon: Layers,
                  },
                  {
                    title: 'Studio Principals',
                    val: cms.team.length,
                    sub: 'Active directory leads',
                    section: 'team',
                    icon: Users,
                  },
                  {
                    title: 'Client Testimonials',
                    val: cms.testimonials.length,
                    sub: 'Verified endorsements',
                    section: 'testimonials',
                    icon: MessageSquare,
                  },
                  {
                    title: 'Brand Logos',
                    val: cms.clientLogos.length,
                    sub: 'Partner trust badges',
                    section: 'services',
                    icon: Sparkles,
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <button
                      key={stat.title}
                      type="button"
                      onClick={() => setActiveSection(stat.section as CmsSection)}
                      className="group cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br from-[#120822] via-[#0d0617] to-[#08040f] p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all hover:border-violet-400/40 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          {stat.title}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-4 font-display text-4xl font-extrabold text-white">
                        {stat.val}
                      </div>
                      <p className="mt-2 text-xs text-gray-400 group-hover:text-violet-300">
                        {stat.sub} &rarr;
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Quick Content Navigation Hub */}
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">
                  Quick CMS Editors
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Click any card to modify headlines, add services, or update team credentials.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      sec: 'hero',
                      title: 'Hero & Main Headline',
                      desc: `Current: "${cms.hero.headline}"`,
                    },
                    {
                      sec: 'services',
                      title: 'Services & Deliverables',
                      desc: `${cms.services.length} active service disciplines configured`,
                    },
                    {
                      sec: 'team',
                      title: 'Team Directory',
                      desc: `${cms.team.length} studio architects and leads in active roster`,
                    },
                    {
                      sec: 'testimonials',
                      title: 'Testimonials & Reviews',
                      desc: `${cms.testimonials.length} reviews from clients & enterprise partners`,
                    },
                    {
                      sec: 'about',
                      title: 'About Statement & Metrics',
                      desc: `Statement: "${cms.about.statement.slice(0, 60)}..."`,
                    },
                    {
                      sec: 'contact',
                      title: 'Global Hubs & Email',
                      desc: `Direct: ${cms.contact.email} &bull; 4 global hubs configured`,
                    },
                  ].map((card) => (
                    <button
                      key={card.sec}
                      type="button"
                      onClick={() => setActiveSection(card.sec as CmsSection)}
                      className="cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-left transition-all hover:border-violet-400/40 hover:bg-white/[0.04]"
                    >
                      <h4 className="font-display text-sm font-bold text-white">{card.title}</h4>
                      <p className="mt-1 text-xs text-gray-400 line-clamp-2">{card.desc}</p>
                      <span className="mt-3 inline-block text-[11px] font-semibold text-violet-300">
                        Open Editor &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: HERO & BRANDING CMS */}
          {/* ==================================================== */}
          {activeSection === 'hero' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Form Controls */}
              <div className="space-y-6 lg:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                  <h3 className="font-display text-lg font-bold text-white">
                    Hero Section Copy &amp; CTAs
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Controls the primary above-the-fold content on the Home page.
                  </p>

                  <div className="mt-6 space-y-5 text-xs">
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Eyebrow Pill Label
                      </label>
                      <input
                        type="text"
                        value={cms.hero.eyebrow}
                        onChange={(e) => updateHero({ eyebrow: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Main Display Headline
                      </label>
                      <textarea
                        rows={3}
                        value={cms.hero.headline}
                        onChange={(e) => updateHero({ headline: e.target.value })}
                        className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400 font-display text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={cms.hero.subtitle}
                        onChange={(e) => updateHero({ subtitle: e.target.value })}
                        className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-semibold uppercase tracking-wider text-gray-300">
                          Primary CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={cms.hero.ctaPrimary}
                          onChange={(e) => updateHero({ ctaPrimary: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold uppercase tracking-wider text-gray-300">
                          Secondary CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={cms.hero.ctaSecondary}
                          onChange={(e) => updateHero({ ctaSecondary: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Studio Availability Status Badge
                      </label>
                      <input
                        type="text"
                        value={cms.hero.badgeText}
                        onChange={(e) => updateHero({ badgeText: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="space-y-6 lg:col-span-5">
                <div className="sticky top-28 rounded-3xl border border-violet-400/30 bg-gradient-to-b from-[#140826] via-[#0d0619] to-[#07040d] p-6 shadow-[0_16px_50px_rgba(139,92,246,0.25)]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[10px] font-bold tracking-widest text-violet-300 uppercase">
                      Live Visual Preview
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-semibold">
                      Real-Time Mockup
                    </span>
                  </div>

                  <div className="mt-6 text-left">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-[11px] font-semibold text-violet-200">
                      <Sparkles className="h-3 w-3" />
                      <span>{cms.hero.eyebrow}</span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {cms.hero.headline}
                    </h2>

                    <p className="mt-3 text-xs leading-relaxed text-gray-300">
                      {cms.hero.subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#0a0612]">
                        {cms.hero.ctaPrimary}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold text-white">
                        {cms.hero.ctaSecondary}
                      </span>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {cms.hero.badgeText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: SERVICES CMS */}
          {/* ==================================================== */}
          {activeSection === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Service Capabilities ({cms.services.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add, edit, or delete disciplines displayed in the Bento Grid and Services page.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter disciplines..."
                      className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-4 text-xs text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddServiceOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0a0612] hover:bg-violet-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>New Discipline</span>
                  </button>
                </div>
              </div>

              {/* Services List / Cards */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredServices.map((service, idx) => {
                  const isEditing = editingServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-colors hover:border-violet-400/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-violet-400">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="rounded-md border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300">
                            {service.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingServiceId(isEditing ? null : service.id)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300 hover:text-white"
                          >
                            {isEditing ? 'Done' : 'Edit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteService(service.id)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1 text-rose-400 hover:border-rose-500/40"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-3 text-xs">
                          <div>
                            <label className="text-gray-400 font-medium">Title</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => updateService(service.id, { title: e.target.value })}
                              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 font-medium">Tag Pill</label>
                            <input
                              type="text"
                              value={service.tag}
                              onChange={(e) => updateService(service.id, { tag: e.target.value })}
                              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 font-medium">Description</label>
                            <textarea
                              rows={3}
                              value={service.description}
                              onChange={(e) =>
                                updateService(service.id, { description: e.target.value })
                              }
                              className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <h4 className="font-display text-xl font-bold text-white">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-xs leading-relaxed text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: TEAM DIRECTORY CMS */}
          {/* ==================================================== */}
          {activeSection === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Studio Principals Roster ({cms.team.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Manage leadership profiles, specialties, and bio cards.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search member name or role..."
                      className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-4 text-xs text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddTeamOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0a0612] hover:bg-violet-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Member</span>
                  </button>
                </div>
              </div>

              {/* Team Cards Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTeam.map((member) => {
                  const isEditing = editingTeamMemberId === member.id;
                  return (
                    <div
                      key={member.id}
                      className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover grayscale contrast-110"
                        />
                        <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] text-white">
                          {member.location}
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-2 text-xs">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white font-semibold"
                          />
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(member.id, { role: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-violet-300"
                          />
                          <input
                            type="text"
                            value={member.specialty}
                            onChange={(e) =>
                              updateTeamMember(member.id, { specialty: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => setEditingTeamMemberId(null)}
                            className="w-full rounded-lg bg-white py-1.5 font-semibold text-[#0a0612] text-[11px]"
                          >
                            Save Details
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <h4 className="font-display text-base font-bold text-white">
                            {member.name}
                          </h4>
                          <p className="text-xs text-violet-300">{member.role}</p>
                          <span className="mt-2 inline-block rounded-md border border-violet-400/25 bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-200">
                            {member.specialty}
                          </span>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingTeamMemberId(isEditing ? null : member.id)}
                          className="cursor-pointer text-xs text-gray-300 hover:text-white"
                        >
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTeamMember(member.id)}
                          className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1 text-rose-400 hover:border-rose-500/40"
                          title="Delete Member"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: TESTIMONIALS CMS */}
          {/* ==================================================== */}
          {activeSection === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Client Testimonials &amp; Reviews ({cms.testimonials.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Quotes and client ratings presented in the Testimonials slider.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddTestimonialOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0a0612] hover:bg-violet-100"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTestimonials.map((item) => {
                  const isEditing = editingTestimonialId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingTestimonialId(isEditing ? null : item.id)}
                            className="cursor-pointer text-xs text-gray-300 hover:text-white"
                          >
                            {isEditing ? 'Done' : 'Edit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTestimonial(item.id)}
                            className="cursor-pointer text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-2 text-xs">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateTestimonial(item.id, { name: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white font-semibold"
                          />
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => updateTestimonial(item.id, { role: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-gray-300"
                          />
                          <textarea
                            rows={3}
                            value={item.quote}
                            onChange={(e) => updateTestimonial(item.id, { quote: e.target.value })}
                            className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white"
                          />
                        </div>
                      ) : (
                        <div className="mt-4">
                          <p className="text-xs italic leading-relaxed text-gray-300">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                          <div className="mt-4 border-t border-white/10 pt-3">
                            <h4 className="font-display text-sm font-bold text-white">{item.name}</h4>
                            <p className="text-[11px] text-violet-300">{item.role}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: ABOUT & PILLARS CMS */}
          {/* ==================================================== */}
          {activeSection === 'about' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">
                  About Statement &amp; Studio Narrative
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  The primary manifesto and narrative blocks featured on the Home &amp; About pages.
                </p>

                <div className="mt-6 space-y-5 text-xs">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      Primary Headline Statement
                    </label>
                    <textarea
                      rows={3}
                      value={cms.about.statement}
                      onChange={(e) => updateAbout({ statement: e.target.value })}
                      className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400 font-display text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      Paragraph 1 (Precision &amp; Dedication)
                    </label>
                    <textarea
                      rows={3}
                      value={cms.about.paragraph1}
                      onChange={(e) => updateAbout({ paragraph1: e.target.value })}
                      className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      Paragraph 2 (Scalability &amp; ROI)
                    </label>
                    <textarea
                      rows={3}
                      value={cms.about.paragraph2}
                      onChange={(e) => updateAbout({ paragraph2: e.target.value })}
                      className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400 leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Statistics Grid Editor */}
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">
                  Key Studio Statistics
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cms.about.stats.map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...cms.about.stats];
                          updated[i] = { ...updated[i], value: e.target.value };
                          updateAbout({ stats: updated });
                        }}
                        className="w-full font-display text-xl font-bold text-white bg-transparent outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...cms.about.stats];
                          updated[i] = { ...updated[i], label: e.target.value };
                          updateAbout({ stats: updated });
                        }}
                        className="mt-1 w-full text-violet-300 bg-transparent outline-none font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: GLOBAL HUBS & CONTACT CMS */}
          {/* ==================================================== */}
          {activeSection === 'contact' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">
                  Global Hubs &amp; Direct Channels
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update primary email addresses and geographic hub locations.
                </p>

                <div className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      Primary Email Address
                    </label>
                    <input
                      type="email"
                      value={cms.contact.email}
                      onChange={(e) => updateContact({ email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Phone (Americas Hub)
                      </label>
                      <input
                        type="text"
                        value={cms.contact.phoneAmericas}
                        onChange={(e) => updateContact({ phoneAmericas: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-gray-300">
                        Phone (Europe Core)
                      </label>
                      <input
                        type="text"
                        value={cms.contact.phoneEurope}
                        onChange={(e) => updateContact({ phoneEurope: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      San Francisco Address
                    </label>
                    <input
                      type="text"
                      value={cms.contact.sfAddress}
                      onChange={(e) => updateContact({ sfAddress: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-gray-300">
                      Zurich Hub Address
                    </label>
                    <input
                      type="text"
                      value={cms.contact.zurichAddress}
                      onChange={(e) => updateContact({ zurichAddress: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-violet-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: INQUIRIES & BOOKINGS */}
          {/* ==================================================== */}
          {(activeSection === 'inquiries' || activeSection === 'bookings') && (
            <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white capitalize">
                {activeSection} Feed
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Client submissions stored in the backend and local storage.
              </p>
              <div className="mt-6 text-xs text-gray-400">
                Connected to active database pipeline &bull; Stored locally in JSON storage engine.
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SECTION: TELEMETRY */}
          {/* ==================================================== */}
          {activeSection === 'telemetry' && (
            <div className="rounded-3xl border border-white/10 bg-[#0d0718]/90 p-6 sm:p-8 max-w-2xl">
              <h3 className="font-display text-lg font-bold text-white">
                CMS System Diagnostic &amp; Telemetry
              </h3>
              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Storage Engine</span>
                  <span className="text-white">Local Storage &amp; Backend API Sync</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Publish Endpoint</span>
                  <span className="text-emerald-400">PUT /api/cms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Read Endpoint</span>
                  <span className="text-emerald-400">GET /api/cms</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD NEW SERVICE */}
      {/* -------------------------------------------------------- */}
      {isAddServiceOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsAddServiceOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-violet-400/30 bg-[#120822] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddServiceOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-xl font-bold text-white">Add New Service</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newServiceForm.title) return;
                addService(newServiceForm);
                setIsAddServiceOpen(false);
                setNewServiceForm({ title: '', tag: 'Full-Stack & AI', description: '' });
              }}
              className="mt-5 space-y-4 text-xs"
            >
              <div>
                <label className="text-gray-300 font-medium">Service Title</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.title}
                  onChange={(e) =>
                    setNewServiceForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Autonomous AI Pipeline"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Tag Pill</label>
                <input
                  type="text"
                  value={newServiceForm.tag}
                  onChange={(e) => setNewServiceForm((prev) => ({ ...prev, tag: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={newServiceForm.description}
                  onChange={(e) =>
                    setNewServiceForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Comprehensive service description..."
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-white py-3 font-semibold text-[#0a0612] hover:bg-violet-100"
              >
                Create Discipline
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD TEAM MEMBER */}
      {/* -------------------------------------------------------- */}
      {isAddTeamOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsAddTeamOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-violet-400/30 bg-[#120822] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddTeamOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-xl font-bold text-white">Add Team Principal</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTeamForm.name || !newTeamForm.role) return;
                addTeamMember({
                  ...newTeamForm,
                  socials: { linkedin: '#', twitter: '#' },
                });
                setIsAddTeamOpen(false);
                setNewTeamForm({
                  name: '',
                  role: '',
                  specialty: '',
                  location: 'San Francisco',
                  image:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
                  bio: '',
                });
              }}
              className="mt-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="text-gray-300 font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={newTeamForm.name}
                  onChange={(e) => setNewTeamForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Role / Title</label>
                <input
                  type="text"
                  required
                  value={newTeamForm.role}
                  onChange={(e) => setNewTeamForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Specialty Tag</label>
                <input
                  type="text"
                  value={newTeamForm.specialty}
                  onChange={(e) =>
                    setNewTeamForm((prev) => ({ ...prev, specialty: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Location Hub</label>
                <select
                  value={newTeamForm.location}
                  onChange={(e) =>
                    setNewTeamForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#160a2c] p-2.5 text-white"
                >
                  <option value="San Francisco">San Francisco</option>
                  <option value="Zurich Hub">Zurich Hub</option>
                  <option value="London Hub">London Hub</option>
                  <option value="Dubai Hub">Dubai Hub</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 font-medium">Portrait Image URL</label>
                <input
                  type="url"
                  value={newTeamForm.image}
                  onChange={(e) => setNewTeamForm((prev) => ({ ...prev, image: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-white py-3 font-semibold text-[#0a0612] hover:bg-violet-100"
              >
                Save Principal Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD TESTIMONIAL */}
      {/* -------------------------------------------------------- */}
      {isAddTestimonialOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsAddTestimonialOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-violet-400/30 bg-[#120822] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddTestimonialOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-xl font-bold text-white">Add Client Review</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTestimonialForm.name || !newTestimonialForm.quote) return;
                addTestimonial(newTestimonialForm);
                setIsAddTestimonialOpen(false);
                setNewTestimonialForm({
                  name: '',
                  role: '',
                  avatar: '/images/client-1.jpg',
                  rating: 5,
                  quote: '',
                });
              }}
              className="mt-5 space-y-4 text-xs"
            >
              <div>
                <label className="text-gray-300 font-medium">Client Name</label>
                <input
                  type="text"
                  required
                  value={newTestimonialForm.name}
                  onChange={(e) =>
                    setNewTestimonialForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Sarah Jenkins"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Role &amp; Company</label>
                <input
                  type="text"
                  required
                  value={newTestimonialForm.role}
                  onChange={(e) =>
                    setNewTestimonialForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="e.g. VP of Product, Cyberdyne"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium">Quote</label>
                <textarea
                  rows={3}
                  required
                  value={newTestimonialForm.quote}
                  onChange={(e) =>
                    setNewTestimonialForm((prev) => ({ ...prev, quote: e.target.value }))
                  }
                  placeholder="Client review text..."
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-white py-3 font-semibold text-[#0a0612] hover:bg-violet-100"
              >
                Add Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
