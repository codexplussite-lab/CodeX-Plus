import { useState, useMemo, useEffect } from 'react';
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
  Sparkles,
  Save,
  RotateCcw,
  Search,
  ExternalLink,
  MapPin,
  X,
  Menu,
  Briefcase,
  Globe,
  Share2,
} from 'lucide-react';
import { useCms } from '../context/useCms';

interface AdminPageProps {
  onNavigateHome: () => void;
}

type CmsSection =
  | 'overview'
  | 'branding'
  | 'hero'
  | 'about'
  | 'services'
  | 'team'
  | 'testimonials'
  | 'clients'
  | 'contact'
  | 'inquiries'
  | 'bookings'
  | 'telemetry';

export function AdminPage({ onNavigateHome }: AdminPageProps) {
  const {
    cms,
    updateBranding,
    updateHero,
    updateAbout,
    updateContact,
    updateTeamCarouselSubtitle,
    addService,
    updateService,
    deleteService,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addTrustedClient,
    updateTrustedClient,
    deleteTrustedClient,
    addHub,
    updateHub,
    deleteHub,
    addFaq,
    updateFaq,
    deleteFaq,
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
  const [editingClientId, setEditingClientId] = useState<string | null>(null);

  // New Item Modals
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddHubOpen, setIsAddHubOpen] = useState(false);
  const [isAddFaqOpen, setIsAddFaqOpen] = useState(false);

  // New item form buffers
  const [newServiceForm, setNewServiceForm] = useState({
    title: '',
    tag: 'Engineering Core',
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
    company: 'Enterprise Inc',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    rating: 5,
    quote: '',
  });

  const [newClientForm, setNewClientForm] = useState({
    title: '',
    subtitle: 'Enterprise Technology',
    src: '/images/logos/stripe.svg',
    alt: 'Partner logo',
  });

  const [newHubForm, setNewHubForm] = useState({
    city: '',
    address: '',
    hours: 'Mon – Fri: 09:00 – 18:00',
    phone: '+1 (555) 000-0000',
  });

  const [newFaqForm, setNewFaqForm] = useState({
    q: '',
    a: '',
  });

  // Inquiries & Bookings States
  interface InquiryRecord {
    id: string;
    fullName: string;
    email: string;
    company: string;
    serviceRequested: string;
    budget?: string;
    message: string;
    status: 'new' | 'reviewed' | 'contacted' | 'archived';
    createdAt: string;
  }

  interface BookingRecord {
    id: string;
    clientName: string;
    email: string;
    companyName: string;
    requestedDate: string;
    requestedTime: string;
    focusArea: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
  }

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [telemetryPing, setTelemetryPing] = useState<number | null>(null);

  // Fetch Inquiries & Bookings from Backend
  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [inqRes, bookRes] = await Promise.all([
          fetch('/api/inquiries'),
          fetch('/api/bookings'),
        ]);

        if (inqRes.ok && active) {
          const inqData = await inqRes.json();
          if (Array.isArray(inqData.data)) setInquiries(inqData.data);
        }

        if (bookRes.ok && active) {
          const bookData = await bookRes.json();
          if (Array.isArray(bookData.data)) setBookings(bookData.data);
        }
      } catch {
        // Local mode fallback
      }
    }

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  // Handle master publish
  const handlePublish = async () => {
    await saveAndPublish();
    setPublishToast(true);
    setTimeout(() => setPublishToast(false), 2500);
  };

  const testPing = async () => {
    const t0 = performance.now();
    try {
      await fetch('/api/health');
      setTelemetryPing(Math.round(performance.now() - t0));
    } catch {
      setTelemetryPing(Math.round(performance.now() - t0));
    }
  };

  // Filtered lists
  const filteredServices = useMemo(() => {
    return cms.services.filter(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.services, searchQuery]);

  const filteredTeam = useMemo(() => {
    return cms.team.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.team, searchQuery]);

  const filteredTestimonials = useMemo(() => {
    return cms.testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.company && t.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [cms.testimonials, searchQuery]);

  const filteredClients = useMemo(() => {
    return (cms.trustedClients || []).filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cms.trustedClients, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#07040d] text-white selection:bg-violet-600/40">
      {/* -------------------------------------------------------- */}
      {/* LEFT CMS SIDEBAR */}
      {/* -------------------------------------------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-[#090513] p-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Logo & Hub Badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <span className="font-display text-sm font-bold tracking-wider text-white">
                  CODEXX <span className="text-violet-400">CMS</span>
                </span>
                <span className="block text-[10px] tracking-wider text-gray-400 uppercase">
                  Universal Studio Engine
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Category: CMS Content */}
          <div className="mt-6">
            <span className="px-3 text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Website Content
            </span>
            <nav className="mt-2 space-y-1">
              {[
                { id: 'overview', label: 'CMS Overview', icon: LayoutDashboard },
                { id: 'branding', label: 'Brand & Global Bar', icon: Globe },
                { id: 'hero', label: 'Hero & Top Display', icon: Sparkles },
                { id: 'about', label: 'Studio Story & Pillars', icon: Building2 },
                { id: 'services', label: 'Services & Disciplines', icon: Layers },
                { id: 'team', label: 'Team Directory & 3D', icon: Users },
                { id: 'testimonials', label: 'Client Feedback', icon: MessageSquare },
                { id: 'clients', label: 'Trusted Brand Logos', icon: Briefcase },
                { id: 'contact', label: 'Global Hubs & FAQs', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id as CmsSection);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? 'border border-violet-400/40 bg-violet-600/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-violet-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Navigation Category: Inbound & Gateway */}
          <div className="mt-6">
            <span className="px-3 text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Inbound &amp; Gateway
            </span>
            <nav className="mt-2 space-y-1">
              {[
                { id: 'inquiries', label: 'Client Inquiries', icon: Mail, badge: inquiries.length },
                { id: 'bookings', label: 'Strategy Bookings', icon: Calendar, badge: bookings.length },
                { id: 'telemetry', label: 'API & Telemetry', icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id as CmsSection);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? 'border border-violet-400/40 bg-violet-600/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-violet-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: Fast Actions */}
        <div className="border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-medium text-gray-300 transition-colors hover:border-violet-400/40 hover:bg-white/[0.08] hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Live Website</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------- */}
      {/* MAIN CMS CONTENT VIEWPORT */}
      {/* -------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
        {/* Top Header Bar */}
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {activeSection === 'overview' && 'CMS Master Control Room'}
                {activeSection === 'branding' && 'Brand, Navigation & Footer'}
                {activeSection === 'hero' && 'Hero Stage & Live Mockup'}
                {activeSection === 'about' && 'About Studio, Stats & Pillars'}
                {activeSection === 'services' && 'Capabilities & Disciplines'}
                {activeSection === 'team' && 'Team Directory & 3D Carousel'}
                {activeSection === 'testimonials' && 'Client Feedback & Reviews'}
                {activeSection === 'clients' && 'Trusted Brand Logos'}
                {activeSection === 'contact' && 'Global Hubs, Contacts & FAQs'}
                {activeSection === 'inquiries' && 'Inbound Project Inquiries'}
                {activeSection === 'bookings' && 'Strategy Discovery Bookings'}
                {activeSection === 'telemetry' && 'Gateway & Telemetry'}
              </h1>
              <p className="mt-1 text-xs text-gray-400">
                Live changes sync directly to the site and persist across reload.
              </p>
            </div>
          </div>

          {/* Master Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {lastPublished && (
              <span className="text-[11px] text-gray-400">
                Last published: <strong className="text-violet-300">{lastPublished}</strong>
              </span>
            )}
            <button
              type="button"
              onClick={resetToDefaults}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isSaving}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.4)] transition-all hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.6)] disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{isSaving ? 'Publishing...' : 'Publish to Live Site'}</span>
            </button>
          </div>
        </header>

        {/* Floating Notification Toast */}
        {publishToast && (
          <div className="fixed top-8 right-8 z-[9999] flex items-center gap-3 rounded-2xl border border-emerald-400/50 bg-[#0d071a] p-4 text-sm font-semibold text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.3)] backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
            <Check className="h-5 w-5 text-emerald-400" />
            <span>All updates published live to website and saved to disk.</span>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: OVERVIEW */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* Metric Highlights */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: 'Services', count: cms.services.length, target: 'services' },
                { label: 'Team Leads', count: cms.team.length, target: 'team' },
                { label: 'Testimonials', count: cms.testimonials.length, target: 'testimonials' },
                { label: 'Brand Logos', count: (cms.trustedClients || []).length, target: 'clients' },
                { label: 'Inquiries', count: inquiries.length, target: 'inquiries' },
                { label: 'Bookings', count: bookings.length, target: 'bookings' },
              ].map((card) => (
                <button
                  key={card.label}
                  type="button"
                  onClick={() => setActiveSection(card.target as CmsSection)}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-[#10081d] p-4 text-left transition-all hover:border-violet-400/40 hover:bg-[#150a26]"
                >
                  <span className="text-xs text-gray-400">{card.label}</span>
                  <div className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    {card.count}
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Jumps */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">Direct Content Editors</h3>
              <p className="mt-1 text-xs text-gray-400">
                Jump straight into any page component to modify headlines, media, or copy.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: 'Brand & Global Bar',
                    desc: 'Logo text, availability pill, header CTA, footer blurb, social links.',
                    id: 'branding',
                  },
                  {
                    title: 'Hero & Typography',
                    desc: 'Main headline, subtitle, eyebrow pill, discovery CTAs.',
                    id: 'hero',
                  },
                  {
                    title: 'About & Pillars',
                    desc: 'Manifesto, studio office image, key metrics, principles, timeline.',
                    id: 'about',
                  },
                  {
                    title: 'Team & 3D Coverflow',
                    desc: 'Portraits, specialty badges, bios, carousel guide subtitle.',
                    id: 'team',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id as CmsSection)}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition-all hover:border-violet-400/50 hover:bg-violet-500/10"
                  >
                    <div>
                      <h4 className="font-display text-base font-bold text-white group-hover:text-violet-300">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">{item.desc}</p>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-violet-400">Edit Section →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: BRANDING */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'branding' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">Global Identity &amp; Navbar</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Brand Name / Logo Text
                  </label>
                  <input
                    type="text"
                    value={cms.branding?.name || 'CODEXX PLUS'}
                    onChange={(e) => updateBranding({ name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Studio Tagline
                  </label>
                  <input
                    type="text"
                    value={cms.branding?.tagline || ''}
                    onChange={(e) => updateBranding({ tagline: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Availability Pill Badge (Navbar &amp; Mobile)
                  </label>
                  <input
                    type="text"
                    value={cms.branding?.availabilityBadge || ''}
                    onChange={(e) => updateBranding({ availabilityBadge: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Header Discovery CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={cms.branding?.ctaButtonText || ''}
                    onChange={(e) => updateBranding({ ctaButtonText: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Primary Corporate Email
                  </label>
                  <input
                    type="email"
                    value={cms.branding?.primaryEmail || ''}
                    onChange={(e) => updateBranding({ primaryEmail: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Copyright Line (Footer)
                  </label>
                  <input
                    type="text"
                    value={cms.branding?.copyrightText || ''}
                    onChange={(e) => updateBranding({ copyrightText: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs font-semibold text-gray-300 uppercase">
                  Footer Brand Bio / Manifesto
                </label>
                <textarea
                  rows={3}
                  value={cms.branding?.footerBio || ''}
                  onChange={(e) => updateBranding({ footerBio: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-violet-400" />
                <h3 className="font-display text-lg font-bold text-white">Official Social Channels</h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {['linkedin', 'twitter', 'instagram', 'facebook', 'github'].map((platform) => {
                  const currentUrl =
                    (cms.branding?.socials as Record<string, string>)?.[platform] || '';
                  return (
                    <div key={platform}>
                      <label className="block text-xs font-semibold text-gray-300 uppercase">
                        {platform} URL
                      </label>
                      <input
                        type="text"
                        value={currentUrl}
                        onChange={(e) =>
                          updateBranding({
                            socials: {
                              ...cms.branding?.socials,
                              [platform]: e.target.value,
                            },
                          })
                        }
                        placeholder={`https://${platform}.com/...`}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: HERO */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'hero' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">Hero Typography &amp; Actions</h3>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Eyebrow Pill Badge
                    </label>
                    <input
                      type="text"
                      value={cms.hero.eyebrow}
                      onChange={(e) => updateHero({ eyebrow: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Main Display Headline
                    </label>
                    <textarea
                      rows={3}
                      value={cms.hero.headline}
                      onChange={(e) => updateHero({ headline: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={4}
                      value={cms.hero.subtitle}
                      onChange={(e) => updateHero({ subtitle: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase">
                        Primary CTA Label
                      </label>
                      <input
                        type="text"
                        value={cms.hero.ctaPrimary}
                        onChange={(e) => updateHero({ ctaPrimary: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase">
                        Secondary CTA Label
                      </label>
                      <input
                        type="text"
                        value={cms.hero.ctaSecondary}
                        onChange={(e) => updateHero({ ctaSecondary: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Trust Badge Text
                    </label>
                    <input
                      type="text"
                      value={cms.hero.badgeText}
                      onChange={(e) => updateHero({ badgeText: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Visual Card Mockup */}
            <div className="lg:col-span-5">
              <div className="sticky top-6 rounded-3xl border border-violet-400/30 bg-gradient-to-b from-[#160b2b] via-[#10071f] to-[#08040e] p-6 shadow-2xl">
                <span className="text-xs font-semibold tracking-widest text-violet-300 uppercase">
                  Real-time Preview
                </span>
                <div className="mt-6 text-center">
                  <span className="inline-block rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-300">
                    {cms.hero.eyebrow}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
                    {cms.hero.headline}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-gray-300">
                    {cms.hero.subtitle}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <span className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black">
                      {cms.hero.ctaPrimary}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white">
                      {cms.hero.ctaSecondary}
                    </span>
                  </div>

                  <p className="mt-5 text-[11px] text-gray-400">
                    ● {cms.hero.badgeText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: ABOUT */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'about' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">Manifesto &amp; Studio Vision</h3>
              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Headline Statement
                  </label>
                  <textarea
                    rows={2}
                    value={cms.about?.statement || ''}
                    onChange={(e) => updateAbout({ statement: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Paragraph 1 (Craft &amp; Genesis)
                    </label>
                    <textarea
                      rows={5}
                      value={cms.about?.paragraph1 || ''}
                      onChange={(e) => updateAbout({ paragraph1: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Paragraph 2 (Engineering &amp; Scalability)
                    </label>
                    <textarea
                      rows={5}
                      value={cms.about?.paragraph2 || ''}
                      onChange={(e) => updateAbout({ paragraph2: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Office / Studio Image URL
                    </label>
                    <input
                      type="text"
                      value={cms.about?.officeImage || '/images/office-interior.jpg'}
                      onChange={(e) => updateAbout({ officeImage: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Office Card Headline
                    </label>
                    <input
                      type="text"
                      value={cms.about?.officeTitle || ''}
                      onChange={(e) => updateAbout({ officeTitle: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Office Card Subtitle
                    </label>
                    <input
                      type="text"
                      value={cms.about?.officeSubtitle || ''}
                      onChange={(e) => updateAbout({ officeSubtitle: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Key Statistics */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">4 Key Numerical Statistics</h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(cms.about?.stats || []).map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase">
                      Metric #{idx + 1} Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...(cms.about?.stats || [])];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        updateAbout({ stats: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-base font-bold text-white outline-none focus:border-violet-400"
                    />
                    <label className="mt-3 block text-[11px] font-semibold text-gray-400 uppercase">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...(cms.about?.stats || [])];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        updateAbout({ stats: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-gray-300 outline-none focus:border-violet-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: SERVICES */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'services' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search capabilities by name or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10081d] py-2.5 pr-4 pl-10 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddServiceOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Discipline</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => {
                const isEditing = editingServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#10081d] p-6 transition-all hover:border-violet-400/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">
                          {service.tag}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingServiceId(isEditing ? null : service.id)
                            }
                            className="rounded-lg p-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                          >
                            {isEditing ? 'Close' : 'Edit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteService(service.id)}
                            className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                            title="Delete Service"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) =>
                              updateService(service.id, { title: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-sm text-white"
                          />
                          <input
                            type="text"
                            value={service.tag}
                            onChange={(e) =>
                              updateService(service.id, { tag: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-violet-300"
                          />
                          <textarea
                            rows={3}
                            value={service.description}
                            onChange={(e) =>
                              updateService(service.id, { description: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-gray-300"
                          />
                        </div>
                      ) : (
                        <div className="mt-4">
                          <h4 className="font-display text-lg font-bold text-white">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-xs leading-relaxed text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: TEAM */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'team' && (
          <div className="mt-8 space-y-6">
            {/* Carousel Subtitle Configuration */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6">
              <label className="block text-xs font-semibold text-gray-300 uppercase">
                3D Carousel Guide Subtitle (Above Deck)
              </label>
              <input
                type="text"
                value={
                  cms.teamCarouselSubtitle ||
                  'Drag, swipe, or use arrows to cycle through our active engineering and design leads.'
                }
                onChange={(e) => updateTeamCarouselSubtitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
              />
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team by name, role, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10081d] py-2.5 pr-4 pl-10 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddTeamOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTeam.map((member) => {
                const isEditing = editingTeamMemberId === member.id;
                return (
                  <div
                    key={member.id}
                    className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10081d] p-5 transition-all hover:border-violet-400/40"
                  >
                    <div>
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#090513]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover object-top grayscale contrast-110"
                        />
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-2">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) =>
                              updateTeamMember(member.id, { name: e.target.value })
                            }
                            placeholder="Name"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) =>
                              updateTeamMember(member.id, { role: e.target.value })
                            }
                            placeholder="Role"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-violet-300"
                          />
                          <input
                            type="text"
                            value={member.specialty}
                            onChange={(e) =>
                              updateTeamMember(member.id, { specialty: e.target.value })
                            }
                            placeholder="Specialty badge"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-gray-300"
                          />
                          <input
                            type="text"
                            value={member.image}
                            onChange={(e) =>
                              updateTeamMember(member.id, { image: e.target.value })
                            }
                            placeholder="Image URL"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-gray-400"
                          />
                        </div>
                      ) : (
                        <div className="mt-4">
                          <span className="inline-block rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
                            {member.specialty.split('&')[0].trim()}
                          </span>
                          <h4 className="mt-2 font-display text-base font-bold text-white">
                            {member.name}
                          </h4>
                          <p className="text-xs text-gray-400">{member.role}</p>
                          <p className="mt-2 text-[11px] leading-relaxed text-gray-400">
                            {member.bio}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingTeamMemberId(isEditing ? null : member.id)
                        }
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        {isEditing ? 'Done' : 'Edit Member'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTeamMember(member.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: TESTIMONIALS */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'testimonials' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews by client or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10081d] py-2.5 pr-4 pl-10 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddTestimonialOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTestimonials.map((t) => {
                const isEditing = editingTestimonialId === t.id;
                return (
                  <div
                    key={t.id}
                    className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#10081d] p-6 transition-all hover:border-violet-400/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#FACC15]">
                          {'★'.repeat(t.rating)}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingTestimonialId(isEditing ? null : t.id)
                            }
                            className="rounded-lg p-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                          >
                            {isEditing ? 'Done' : 'Edit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTestimonial(t.id)}
                            className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-2">
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) =>
                              updateTestimonial(t.id, { name: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) =>
                              updateTestimonial(t.id, { role: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-violet-300"
                          />
                          <textarea
                            rows={3}
                            value={t.quote}
                            onChange={(e) =>
                              updateTestimonial(t.id, { quote: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs text-gray-300"
                          />
                        </div>
                      ) : (
                        <div className="mt-4">
                          <p className="text-xs italic leading-relaxed text-gray-300">
                            {t.quote}
                          </p>
                          <h4 className="mt-4 font-display text-sm font-bold text-white">
                            {t.name}
                          </h4>
                          <p className="text-[11px] text-gray-400">{t.role}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: TRUSTED CLIENT LOGOS */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'clients' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brand partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10081d] py-2.5 pr-4 pl-10 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddClientOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Brand Partner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => {
                const isEditing = editingClientId === client.id;
                return (
                  <div
                    key={client.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#10081d] p-5"
                  >
                    <div>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={client.title}
                            onChange={(e) =>
                              updateTrustedClient(client.id, { title: e.target.value })
                            }
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={client.subtitle}
                            onChange={(e) =>
                              updateTrustedClient(client.id, { subtitle: e.target.value })
                            }
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-xs text-gray-300"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">
                            {client.title}
                          </h4>
                          <p className="text-[11px] text-gray-400">{client.subtitle}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingClientId(isEditing ? null : client.id)
                        }
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        {isEditing ? 'Save' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTrustedClient(client.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: CONTACT HUBS & FAQS */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'contact' && (
          <div className="mt-8 space-y-8">
            {/* Direct Channels */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">Direct Communication Channels</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Primary Corporate Email
                  </label>
                  <input
                    type="email"
                    value={cms.contact?.email || ''}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Americas Hotline Phone
                  </label>
                  <input
                    type="text"
                    value={cms.contact?.phoneAmericas || ''}
                    onChange={(e) => updateContact({ phoneAmericas: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase">
                    Europe Hotline Phone
                  </label>
                  <input
                    type="text"
                    value={cms.contact?.phoneEurope || ''}
                    onChange={(e) => updateContact({ phoneEurope: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-violet-400"
                  />
                </div>
              </div>
            </div>

            {/* Global Studio Hubs */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Global Studio Hubs</h3>
                  <p className="text-xs text-gray-400">Physical office locations displayed on Contact page and Footer.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddHubOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-violet-400/40 bg-violet-600/20 px-3.5 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-600/30"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Hub</span>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(cms.contact?.hubs || []).map((hub, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">{hub.city}</span>
                      <button
                        type="button"
                        onClick={() => deleteHub(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={hub.address}
                      onChange={(e) => updateHub(idx, { address: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-xs text-gray-300"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      value={hub.hours}
                      onChange={(e) => updateHub(idx, { hours: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-xs text-gray-400"
                      placeholder="Hours"
                    />
                    <input
                      type="text"
                      value={hub.phone}
                      onChange={(e) => updateHub(idx, { phone: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-xs text-violet-300"
                      placeholder="Phone"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion Editor */}
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Frequently Asked Questions</h3>
                  <p className="text-xs text-gray-400">Questions and answers displayed on Contact page.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddFaqOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-violet-400/40 bg-violet-600/20 px-3.5 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-600/30"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {(cms.contact?.faqs || []).map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => updateFaq(idx, { q: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-sm font-semibold text-white"
                        placeholder="Question"
                      />
                      <button
                        type="button"
                        onClick={() => deleteFaq(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={faq.a}
                      onChange={(e) => updateFaq(idx, { a: e.target.value })}
                      className="mt-3 w-full rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs leading-relaxed text-gray-300"
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: INQUIRIES */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'inquiries' && (
          <div className="mt-8 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#10081d]">
              <div className="border-b border-white/10 p-5">
                <h3 className="font-display text-base font-bold text-white">
                  Client Project Inquiries ({inquiries.length})
                </h3>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">
                  No inbound inquiries recorded yet. Submissions from Contact page will appear here live.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400">
                      <tr>
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Discipline</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02]">
                          <td className="p-4 font-semibold text-white">{inq.fullName}</td>
                          <td className="p-4 text-gray-300">{inq.email}</td>
                          <td className="p-4 text-gray-400">{inq.company}</td>
                          <td className="p-4 text-violet-300">{inq.serviceRequested}</td>
                          <td className="p-4">
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 uppercase">
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              className="cursor-pointer text-xs font-semibold text-violet-400 hover:underline"
                            >
                              Inspect Brief
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: BOOKINGS */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'bookings' && (
          <div className="mt-8 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#10081d]">
              <div className="border-b border-white/10 p-5">
                <h3 className="font-display text-base font-bold text-white">
                  Strategy Discovery Calls ({bookings.length})
                </h3>
              </div>

              {bookings.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">
                  No strategy bookings submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 bg-white/[0.02] text-gray-400">
                      <tr>
                        <th className="p-4">Client</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Date / Time</th>
                        <th className="p-4">Focus Area</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02]">
                          <td className="p-4 font-semibold text-white">{b.clientName}</td>
                          <td className="p-4 text-gray-300">{b.email}</td>
                          <td className="p-4 text-gray-300">
                            {b.requestedDate} @ {b.requestedTime}
                          </td>
                          <td className="p-4 text-violet-300">{b.focusArea}</td>
                          <td className="p-4">
                            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400 uppercase">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* SECTION: TELEMETRY */}
        {/* -------------------------------------------------------- */}
        {activeSection === 'telemetry' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#10081d] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-white">Gateway Diagnostics</h3>
              <p className="mt-1 text-xs text-gray-400">
                Live monitoring of the Node.js / Express backend storage and API latency.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={testPing}
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-violet-500"
                >
                  Ping Health Endpoint
                </button>
                {telemetryPing !== null && (
                  <span className="text-xs font-mono text-emerald-400">
                    Roundtrip Latency: {telemetryPing}ms (OK)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD SERVICE */}
      {/* -------------------------------------------------------- */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add New Discipline</h3>
              <button
                type="button"
                onClick={() => setIsAddServiceOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Title</label>
                <input
                  type="text"
                  value={newServiceForm.title}
                  onChange={(e) =>
                    setNewServiceForm({ ...newServiceForm, title: e.target.value })
                  }
                  placeholder="e.g. Distributed Cloud Architecture"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Category Tag</label>
                <input
                  type="text"
                  value={newServiceForm.tag}
                  onChange={(e) =>
                    setNewServiceForm({ ...newServiceForm, tag: e.target.value })
                  }
                  placeholder="e.g. Infrastructure Core"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  value={newServiceForm.description}
                  onChange={(e) =>
                    setNewServiceForm({ ...newServiceForm, description: e.target.value })
                  }
                  placeholder="Detailed breakdown of capabilities..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddServiceOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newServiceForm.title) return;
                  addService({
                    title: newServiceForm.title,
                    tag: newServiceForm.tag,
                    description: newServiceForm.description,
                  });
                  setIsAddServiceOpen(false);
                  setNewServiceForm({ title: '', tag: 'Engineering Core', description: '' });
                }}
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Create Discipline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD TEAM MEMBER */}
      {/* -------------------------------------------------------- */}
      {isAddTeamOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add Studio Principal</h3>
              <button
                type="button"
                onClick={() => setIsAddTeamOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={newTeamForm.name}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, name: e.target.value })}
                  placeholder="e.g. Kai Takahashi"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Role</label>
                <input
                  type="text"
                  value={newTeamForm.role}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, role: e.target.value })}
                  placeholder="e.g. Lead Cloud Architect"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Specialty Badge</label>
                <input
                  type="text"
                  value={newTeamForm.specialty}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, specialty: e.target.value })}
                  placeholder="e.g. Deterministic Security"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Portrait Image URL</label>
                <input
                  type="text"
                  value={newTeamForm.image}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Short Bio</label>
                <textarea
                  rows={2}
                  value={newTeamForm.bio}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, bio: e.target.value })}
                  placeholder="Background summary..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddTeamOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newTeamForm.name) return;
                  addTeamMember({
                    name: newTeamForm.name,
                    role: newTeamForm.role,
                    specialty: newTeamForm.specialty,
                    location: newTeamForm.location,
                    image: newTeamForm.image,
                    bio: newTeamForm.bio,
                    socials: { linkedin: '#' },
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
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Add Principal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD TESTIMONIAL */}
      {/* -------------------------------------------------------- */}
      {isAddTestimonialOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add Client Review</h3>
              <button
                type="button"
                onClick={() => setIsAddTestimonialOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Client Name</label>
                <input
                  type="text"
                  value={newTestimonialForm.name}
                  onChange={(e) =>
                    setNewTestimonialForm({ ...newTestimonialForm, name: e.target.value })
                  }
                  placeholder="e.g. Marcus Vance"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Role / Company</label>
                <input
                  type="text"
                  value={newTestimonialForm.role}
                  onChange={(e) =>
                    setNewTestimonialForm({ ...newTestimonialForm, role: e.target.value })
                  }
                  placeholder="VP of Product at FinScale"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Quote</label>
                <textarea
                  rows={3}
                  value={newTestimonialForm.quote}
                  onChange={(e) =>
                    setNewTestimonialForm({ ...newTestimonialForm, quote: e.target.value })
                  }
                  placeholder="Client feedback statement..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddTestimonialOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newTestimonialForm.name) return;
                  addTestimonial({
                    name: newTestimonialForm.name,
                    role: newTestimonialForm.role,
                    company: newTestimonialForm.company,
                    image: newTestimonialForm.image,
                    rating: newTestimonialForm.rating,
                    quote: newTestimonialForm.quote,
                  });
                  setIsAddTestimonialOpen(false);
                  setNewTestimonialForm({
                    name: '',
                    role: '',
                    company: 'Enterprise Inc',
                    image:
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
                    rating: 5,
                    quote: '',
                  });
                }}
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD BRAND CLIENT LOGO */}
      {/* -------------------------------------------------------- */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add Brand Partner Logo</h3>
              <button
                type="button"
                onClick={() => setIsAddClientOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Company Name</label>
                <input
                  type="text"
                  value={newClientForm.title}
                  onChange={(e) => setNewClientForm({ ...newClientForm, title: e.target.value })}
                  placeholder="e.g. OpenAI / Stripe"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Category Subtitle</label>
                <input
                  type="text"
                  value={newClientForm.subtitle}
                  onChange={(e) =>
                    setNewClientForm({ ...newClientForm, subtitle: e.target.value })
                  }
                  placeholder="e.g. Global Payments"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Logo SVG / Image URL</label>
                <input
                  type="text"
                  value={newClientForm.src}
                  onChange={(e) => setNewClientForm({ ...newClientForm, src: e.target.value })}
                  placeholder="/images/logos/stripe.svg"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddClientOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newClientForm.title) return;
                  addTrustedClient({
                    title: newClientForm.title,
                    subtitle: newClientForm.subtitle,
                    src: newClientForm.src,
                    alt: newClientForm.alt,
                  });
                  setIsAddClientOpen(false);
                  setNewClientForm({
                    title: '',
                    subtitle: 'Enterprise Technology',
                    src: '/images/logos/stripe.svg',
                    alt: 'Partner logo',
                  });
                }}
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Add Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD HUB */}
      {/* -------------------------------------------------------- */}
      {isAddHubOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add Global Studio Hub</h3>
              <button
                type="button"
                onClick={() => setIsAddHubOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300">City Hub Name</label>
                <input
                  type="text"
                  value={newHubForm.city}
                  onChange={(e) => setNewHubForm({ ...newHubForm, city: e.target.value })}
                  placeholder="e.g. Singapore"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Physical Address</label>
                <input
                  type="text"
                  value={newHubForm.address}
                  onChange={(e) => setNewHubForm({ ...newHubForm, address: e.target.value })}
                  placeholder="Marina Bay Financial Centre"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Working Hours</label>
                <input
                  type="text"
                  value={newHubForm.hours}
                  onChange={(e) => setNewHubForm({ ...newHubForm, hours: e.target.value })}
                  placeholder="Mon – Fri: 09:00 – 18:00 SGT"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Hotline Phone</label>
                <input
                  type="text"
                  value={newHubForm.phone}
                  onChange={(e) => setNewHubForm({ ...newHubForm, phone: e.target.value })}
                  placeholder="+65 6789 0123"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddHubOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newHubForm.city) return;
                  addHub(newHubForm);
                  setIsAddHubOpen(false);
                  setNewHubForm({
                    city: '',
                    address: '',
                    hours: 'Mon – Fri: 09:00 – 18:00',
                    phone: '+1 (555) 000-0000',
                  });
                }}
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Add Studio Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD FAQ */}
      {/* -------------------------------------------------------- */}
      {isAddFaqOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Add Frequently Asked Question</h3>
              <button
                type="button"
                onClick={() => setIsAddFaqOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Question</label>
                <input
                  type="text"
                  value={newFaqForm.q}
                  onChange={(e) => setNewFaqForm({ ...newFaqForm, q: e.target.value })}
                  placeholder="e.g. Do you support multi-region cloud deployments?"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Answer</label>
                <textarea
                  rows={4}
                  value={newFaqForm.a}
                  onChange={(e) => setNewFaqForm({ ...newFaqForm, a: e.target.value })}
                  placeholder="Comprehensive explanation..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddFaqOpen(false)}
                className="rounded-xl px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newFaqForm.q) return;
                  addFaq(newFaqForm);
                  setIsAddFaqOpen(false);
                  setNewFaqForm({ q: '', a: '' });
                }}
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-500"
              >
                Add FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: INSPECT INQUIRY BRIEF */}
      {/* -------------------------------------------------------- */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#120822] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Brief: {selectedInquiry.fullName}
                </h3>
                <p className="text-xs text-gray-400">
                  {selectedInquiry.company} &middot; {selectedInquiry.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-xs">
              <div>
                <span className="font-semibold text-gray-400 uppercase">Service Requested:</span>
                <p className="mt-1 text-sm font-bold text-violet-300">
                  {selectedInquiry.serviceRequested}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-400 uppercase">Budget / Tier:</span>
                <p className="mt-1 text-gray-200">{selectedInquiry.budget || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-400 uppercase">Brief Narrative:</span>
                <p className="mt-1 rounded-xl bg-white/[0.03] p-4 leading-relaxed text-gray-300">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-[#0a0612]"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
