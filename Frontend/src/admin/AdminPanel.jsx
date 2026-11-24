import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Mail,
  Calendar,
  FolderGit2,
  Cpu,
  Users,
  MessageSquareQuote,
  AtSign,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  X,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Archive,
  Copy,
  ChevronRight,
  Activity,
  Shield,
  ArrowUpRight,
  Sliders,
  Globe,
  Building,
  ChevronDown,
  Layers,
  Eye,
  CheckCircle2
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import CmsMasterEditor from './CmsMasterEditor';
import { useCms, DEFAULT_CMS_DATA } from '../context/CmsContext';

export default function AdminPanel({ onBackToSite }) {
  // Always require authentication when entering /admin
  const [user, setUser] = useState(null);

  const { content: cmsContent, updateContent: updateCmsContent } = useCms();
  const [cmsData, setCmsData] = useState(() => cmsContent || DEFAULT_CMS_DATA);
  const [cmsPublishing, setCmsPublishing] = useState(false);
  const [cmsSaveAlert, setCmsSaveAlert] = useState(null);

  useEffect(() => {
    if (cmsContent) {
      setCmsData(cmsContent);
    }
  }, [cmsContent]);

  const handlePublishMasterCms = async () => {
    setCmsPublishing(true);
    setCmsSaveAlert(null);
    try {
      const res = await updateCmsContent(cmsData);
      if (res && res.success !== false) {
        setCmsSaveAlert({ type: 'success', text: 'All changes successfully published to live website and saved to disk storage (db.json)!' });
      } else {
        setCmsSaveAlert({ type: 'error', text: 'Failed to sync with backend.' });
      }
    } catch {
      setCmsSaveAlert({ type: 'error', text: 'Error publishing CMS content.' });
    } finally {
      setCmsPublishing(false);
      setTimeout(() => setCmsSaveAlert(null), 6000);
    }
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [leadFilterStatus, setLeadFilterStatus] = useState('all');

  const [stats, setStats] = useState({
    inquiriesCount: 6,
    pendingInquiries: 3,
    bookingsCount: 2,
    pendingBookings: 1,
    subscribersCount: 3,
    servicesCount: 5,
    projectsCount: 6,
    teamCount: 8,
  });

  const [inquiries, setInquiries] = useState([
    {
      id: 'inq_demo_1',
      name: 'Julian Mercer',
      email: 'julian@northstarcloud.io',
      company: 'Northstar Cloud',
      service: 'Full-Stack Platform',
      budget: '$50k – $100k',
      message: 'Seeking end-to-end dark-luxury platform re-architecture with distributed multi-agent LLM pipelines.',
      status: 'new',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inq_demo_2',
      name: 'Elena Rostova',
      email: 'elena@owl-systems.com',
      company: 'OWL Systems',
      service: 'AI & Autonomous Systems',
      budget: '$100k+',
      message: 'Need high-throughput agent workflows for automated regulatory reporting and custom model inference.',
      status: 'in_review',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 'inq_demo_3',
      name: 'Sophia Test',
      email: 'sophia@test-enterprise.io',
      company: 'Test Corp',
      service: 'Full-Stack Edge Infrastructure',
      budget: '$50k – $100k',
      message: 'Need high-throughput enterprise software architecture.',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
      id: 'inq_demo_4',
      name: 'Marcus Vance',
      email: 'marcus@morhemetech.com',
      company: 'Morheme Tech',
      service: 'Motion & 3D WebGL',
      budget: '$25k – $50k',
      message: 'Looking to commission interactive 3D WebGL hero scene and spatial product viewer for our series A launch.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 'book_demo_1',
      name: 'David Chen',
      email: 'david@luminalabs.ai',
      service: 'Full-Stack Platform',
      preferredDate: '2026-11-24',
      notes: 'Discussing enterprise cloud architecture sprint.',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'book_demo_2',
      name: 'Nadia Karim',
      email: 'nadia@zainabbees.org',
      service: 'Dark Luxury UI/UX',
      preferredDate: '2026-11-26',
      notes: 'Brand guidelines & typography token overhaul.',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    }
  ]);

  const [services, setServices] = useState([
    {
      id: 'dev',
      num: '01',
      title: 'Full-Stack & Autonomous AI',
      tag: 'Development',
      desc: 'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
      tags: ['TypeScript', 'Next.js / Vite', 'Python LLM Ops', 'Distributed Workers']
    },
    {
      id: 'brand',
      num: '02',
      title: 'Graphics Design & Visual Tokens',
      tag: 'Brand Architecture',
      desc: 'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
      tags: ['Design Systems', '3D Asset Creation', 'Brand Guidelines', 'Typography Tokens']
    },
    {
      id: 'motion',
      num: '03',
      title: '3D Motion & WebGL Experiences',
      tag: 'Motion & Post',
      desc: 'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
      tags: ['Three.js', 'Custom GLSL Shaders', 'After Effects 3D', 'Cinematic Trailers']
    },
    {
      id: 'geo',
      num: '04',
      title: 'SEO / GEO (Generative Engine Optimization)',
      tag: 'Search & AI Discovery',
      desc: 'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery (Perplexity, ChatGPT, Claude, Gemini).',
      tags: ['Generative Engine Optimization', 'Knowledge Graph Schema', 'Entity Authority', 'Algorithmic Rank']
    },
    {
      id: 'growth',
      num: '05',
      title: 'Social Media & Growth Engine',
      tag: 'Distribution & Narrative',
      desc: 'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
      tags: ['Executive Positioning', 'Narrative Playbooks', 'Viral Engineering', 'B2B Inbound Flywheels']
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 'proj-1',
      title: 'Aura Protocol: Autonomous Liquidity Router',
      category: 'Development',
      tag: '{ Web3 & AI Engine }',
      year: '2025',
      image: '/assets/p3-img-2.webp',
      desc: 'Sub-millisecond decentralized swap aggregator handling $40M+ weekly transactional volume with audited zero-exploit telemetry.',
      client: 'Aura Financial Labs',
      role: 'Full-Stack Architecture & Smart Contracts'
    },
    {
      id: 'proj-2',
      title: 'Vesper Spatial: 3D Configurator Studio',
      category: 'Motion & 3D',
      tag: '{ WebGL & Spatial }',
      year: '2025',
      image: '/assets/p3-img-3.webp',
      desc: 'Interactive real-time 3D product visualizer in Three.js with realistic micro-reflections, physical shadows, and 60fps mobile execution.',
      client: 'Vesper Luxury Goods',
      role: 'WebGL Shaders & Spatial Interaction'
    },
    {
      id: 'proj-3',
      title: 'Krypton AI: Multi-Agent Enterprise Workspace',
      category: 'AI Systems',
      tag: '{ LLM Orchestration }',
      year: '2026',
      image: '/assets/p3-img-4.webp',
      desc: 'Autonomous enterprise knowledge discovery workspace orchestrating 12 specialized neural agents over 10M+ internal documents.',
      client: 'Krypton Holdings',
      role: 'Agentic Workflows & Zero-Retention Security'
    },
    {
      id: 'proj-4',
      title: 'Synthetix Brand System: Violet Obsidian Tokens',
      category: 'Visual Identity',
      tag: '{ Design System }',
      year: '2025',
      image: '/assets/p3-img-5.webp',
      desc: 'Authoritative visual token overhaul, typographic scales, cinematic 3D iconography, and responsive Figma token libraries.',
      client: 'Synthetix Bio',
      role: 'Identity Architecture & Design Tokens'
    },
    {
      id: 'proj-5',
      title: 'Atlas GEO: Generative Engine Optimization',
      category: 'SEO / GEO',
      tag: '{ AI Search Discovery }',
      year: '2026',
      image: '/assets/p3-img-6.webp',
      desc: 'Engineered synthetic knowledge citations yielding 420% increase in ChatGPT and Perplexity brand recommendations in 90 days.',
      client: 'Atlas Cloud Group',
      role: 'Entity Graph & Generative Optimization'
    },
    {
      id: 'proj-6',
      title: 'Chronos Real-Time Analytics Engine',
      category: 'Development',
      tag: '{ Edge Computing }',
      year: '2025',
      image: '/assets/p3-img-1.webp',
      desc: 'High-throughput metrics ingestion pipeline processing 1.2 billion events daily with sub-50ms query responses.',
      client: 'Chronos Data AG',
      role: 'Distributed Cloud Architecture'
    }
  ]);

  const [team, setTeam] = useState([
    {
      id: 'alexander-reid',
      name: 'Alexander Reid',
      role: 'Founder & Managing Partner',
      specialty: 'Executive Strategy & Capital Advisory',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      location: 'San Francisco Hub'
    },
    {
      id: 'sophia-lindqvist',
      name: 'Sophia Lindqvist',
      role: 'Lead AI Architect',
      specialty: 'Enterprise LLM & Agentic Workflows',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      location: 'San Francisco'
    },
    {
      id: 'aiden-mercer',
      name: 'Aiden Mercer',
      role: 'Creative Director & Founder',
      specialty: 'Brand Architecture & Dark Luxury UI',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      location: 'Zurich Hub'
    },
    {
      id: 'elena-vance',
      name: 'Elena Vance',
      role: 'Head of Engineering',
      specialty: 'Full-Stack Edge Infrastructure',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
      location: 'Zurich Hub'
    },
    {
      id: 'marcus-thorne',
      name: 'Marcus Thorne',
      role: 'Principal Product Designer',
      specialty: 'Design Systems & Motion Tokens',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
      location: 'London Hub'
    },
    {
      id: 'zara-al-mansoor',
      name: 'Zara Al-Mansoor',
      role: 'Motion & 3D Lead',
      specialty: 'WebGL Shaders & Spatial Interfaces',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80',
      location: 'Dubai Hub'
    },
    {
      id: 'kai-takahashi',
      name: 'Kai Takahashi',
      role: 'Lead Cloud Architect',
      specialty: 'Distributed Infrastructure & SOC2',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
      location: 'Tokyo / SF'
    },
    {
      id: 'charlotte-dubois',
      name: 'Charlotte Dubois',
      role: 'Principal GEO Strategist',
      specialty: 'Generative Search & Knowledge Graphs',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      location: 'Zurich Hub'
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 'test-1',
      name: 'Evelyn St. Claire',
      role: 'Chief Technology Officer',
      company: 'Aura Protocol (Switzerland)',
      quote: 'CODEXX PLUS completely engineered our high-frequency decentralized trading terminal. The zero-layout shift architecture and custom WebGL telemetry elevated our brand into institutional caliber.',
      avatar: '/assets/t3-img-1.webp'
    },
    {
      id: 'test-2',
      name: 'Dr. Henrik Lindberg',
      role: 'VP of Product Intelligence',
      company: 'Synapse Healthcare AG (Zurich)',
      quote: 'Their principal architects delivered our autonomous clinical documentation engine 3 weeks ahead of schedule. Uncompromising code hygiene and genuine architectural insight.',
      avatar: '/assets/t3-img-2.webp'
    },
    {
      id: 'test-3',
      name: 'Siddharth Mehta',
      role: 'Founder & CEO',
      company: 'Vesper Spatial Studio (Singapore)',
      quote: 'Our conversion jumped 68% after launching the new dark-luxury visual identity and interactive 3D shaders. They don’t just build software; they engineer digital dominance.',
      avatar: '/assets/t3-img-3.webp'
    }
  ]);

  const [subscribers, setSubscribers] = useState([
    { id: 'sub-1', email: 'julian@northstarcloud.io', subscribedAt: '2026-11-20T10:14:00Z' },
    { id: 'sub-2', email: 'elena.rostova@owl-systems.com', subscribedAt: '2026-11-21T14:30:00Z' },
    { id: 'sub-3', email: 'marcus@morhemetech.com', subscribedAt: '2026-11-22T08:45:00Z' },
  ]);

  const [settings, setSettings] = useState({
    siteName: 'CODEXX PLUS',
    tagline: 'Next-Generation AI Innovation & Digital Solutions',
    email: 'contact@codexplus.site',
    phone: '+1 (415) 890-CODEX',
    reliability: '99.98% platform reliability SLA',
    sfAddress: '555 Mission St, Financial District, CA 94105',
    zurichAddress: 'Gotthardstrasse 26, 8002 Zürich, Switzerland',
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newItemData, setNewItemData] = useState({});

  // Load live data from Backend API
  useEffect(() => {
    if (!user) return;
    loadAllData();
  }, [user]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [stRes, inqRes, bookRes, servRes, tmRes, subRes, cmsRes] = await Promise.all([
        fetch('/api/stats').then(r => r.json()).catch(() => null),
        fetch('/api/contact').then(r => r.json()).catch(() => null),
        fetch('/api/bookings').then(r => r.json()).catch(() => null),
        fetch('/api/services').then(r => r.json()).catch(() => null),
        fetch('/api/team').then(r => r.json()).catch(() => null),
        fetch('/api/newsletter').then(r => r.json()).catch(() => null),
        fetch('/api/cms').then(r => r.json()).catch(() => null),
      ]);

      if (stRes?.data) setStats(prev => ({ ...prev, ...stRes.data }));
      
      const inqData = inqRes?.data || inqRes;
      if (Array.isArray(inqData)) setInquiries(inqData);

      const bookData = bookRes?.data || bookRes;
      if (Array.isArray(bookData)) setBookings(bookData);

      const servData = servRes?.data || servRes;
      if (Array.isArray(servData) && servData.length > 0) {
        setServices(servData.map((s, idx) => ({
          id: s.id || `srv-${idx}`,
          num: `0${idx + 1}`,
          title: s.title || s.name,
          tag: s.tag || s.tier || 'Capability',
          desc: s.description || s.desc || '',
          tags: s.tags || ['Enterprise', 'Architecture']
        })));
      }

      const tmData = tmRes?.data || tmRes;
      if (Array.isArray(tmData) && tmData.length > 0) setTeam(tmData);

      const subData = subRes?.data || subRes;
      if (Array.isArray(subData) && subData.length > 0) setSubscribers(subData);

      if (cmsRes?.data && typeof cmsRes.data === 'object') {
        setSettings(prev => ({ ...prev, ...cmsRes.data }));
      }
    } catch (e) {
      console.log('[AdminPanel] Connected to memory cache / backend fallback.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('codexplus_admin_token');
    setUser(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (id, status) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this discovery inquiry?')) return;
    setInquiries(prev => prev.filter(i => i.id !== id));
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    } catch {}
  };

  // Booking actions
  const handleUpdateBookingStatus = async (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking record?')) return;
    setBookings(prev => prev.filter(b => b.id !== id));
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    } catch {}
  };

  // Save Settings to Backend CMS
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaveMessage('Saving configuration to disk storage...');
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveMessage('Settings successfully published to disk storage!');
      } else {
        setSaveMessage('Configuration updated in memory.');
      }
    } catch {
      setSaveMessage('Settings updated locally.');
    }
    setTimeout(() => setSaveMessage(''), 4000);
  };

  // Add Item handler
  const handleAddItem = (e) => {
    e.preventDefault();
    if (modalType === 'project') {
      const newProj = {
        id: 'proj-' + Date.now(),
        title: newItemData.title || 'Untitled Project',
        category: newItemData.category || 'Development',
        tag: `{ ${newItemData.category || 'Development'} }`,
        year: newItemData.year || '2026',
        image: newItemData.image || '/assets/p3-img-2.webp',
        desc: newItemData.desc || 'System deployment crafted by CODEXX PLUS.',
        client: newItemData.client || 'Enterprise Client',
        role: newItemData.role || 'Full-Stack Architecture',
      };
      setProjects([newProj, ...projects]);
    } else if (modalType === 'service') {
      const newServ = {
        id: 'service-' + Date.now(),
        num: `0${services.length + 1}`,
        title: newItemData.title || 'New Capability',
        tag: newItemData.tag || 'Discipline',
        desc: newItemData.desc || 'Enterprise digital solution crafted for scale.',
        tags: (newItemData.tagsString || 'AI, Cloud, Edge Architecture').split(',').map(s => s.trim()),
      };
      setServices([...services, newServ]);
    } else if (modalType === 'team') {
      const newMember = {
        id: 'team-' + Date.now(),
        name: newItemData.name || 'New Architect',
        role: newItemData.role || 'Principal Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
        specialty: newItemData.specialty || 'Architecture & Systems',
        location: newItemData.location || 'San Francisco Hub',
      };
      setTeam([...team, newMember]);
    }
    setIsModalOpen(false);
    setNewItemData({});
  };

  if (!user) {
    return <AdminLogin onLogin={(u) => setUser(u)} onBackToSite={onBackToSite} />;
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(i => {
    const term = searchFilter.toLowerCase();
    const matchesSearch = (
      (i.name || '').toLowerCase().includes(term) ||
      (i.email || '').toLowerCase().includes(term) ||
      (i.company || '').toLowerCase().includes(term) ||
      (i.service || '').toLowerCase().includes(term)
    );
    if (!matchesSearch) return false;
    if (leadFilterStatus === 'all') return true;
    return i.status === leadFilterStatus;
  });

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'new' || i.status === 'in_review').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#07030e] text-[#c7b8ff] font-sans flex antialiased selection:bg-[#8b5cf6] selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-900/15 via-purple-900/10 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-900/15 via-purple-900/10 to-transparent blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#805ad505_1px,transparent_1px),linear-gradient(to_bottom,#805ad505_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-72 bg-[#0b0517]/95 border-r border-purple-500/15 flex flex-col justify-between shrink-0 z-20 backdrop-blur-xl relative">
        
        <div>
          {/* Top Brand Logo */}
          <div className="p-6 border-b border-purple-500/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <div className="w-full h-full bg-[#090412] rounded-[14px] flex items-center justify-center p-2">
                  <img src="/assets/fevicon-1.webp" alt="CODEXX PLUS" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-white font-mono flex items-center gap-1 leading-none">
                  CODEXX<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">+</span>
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80">
                    Console v2.4
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
            
            {/* Group 1: Operations */}
            <div>
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-purple-400/50 mb-2">
                Operations & Telemetry
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
                  { id: 'inquiries', name: 'Discovery Leads', icon: Mail, count: pendingInquiriesCount },
                  { id: 'bookings', name: 'Strategy Bookings', icon: Calendar, count: pendingBookingsCount },
                  { id: 'subscribers', name: 'Newsletter List', icon: AtSign, count: subscribers.length },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setSearchFilter(''); }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] border border-purple-400/30'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400/80'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.count ? (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white text-purple-900' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Group 2: Content & Architecture */}
            <div>
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-purple-400/50 mb-2">
                CMS & Studio Architecture
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => { setActiveTab('cms_editor'); setSearchFilter(''); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                    activeTab === 'cms_editor'
                      ? 'bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400/40'
                      : 'text-purple-300 hover:text-white hover:bg-purple-500/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className={`w-4 h-4 ${activeTab === 'cms_editor' ? 'text-white' : 'text-[#c084fc]'}`} />
                    <span className="font-semibold text-white">Master Site CMS</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/25 text-[#c084fc] border border-purple-400/30 font-bold">
                    10 Sections
                  </span>
                </button>
                {[
                  { id: 'services', name: 'Capabilities / Disciplines', icon: Cpu },
                  { id: 'projects', name: 'Flagship Deployments', icon: FolderGit2, count: projects.length },
                  { id: 'team', name: 'Architects & Leads', icon: Users, count: team.length },
                  { id: 'testimonials', name: 'Client Feedback', icon: MessageSquareQuote },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setSearchFilter(''); }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] border border-purple-400/30'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400/80'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.count ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                          {item.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Group 3: System */}
            <div>
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-purple-400/50 mb-2">
                System Config
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => { setActiveTab('settings'); setSearchFilter(''); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] border border-purple-400/30'
                      : 'text-purple-300/70 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-purple-400/80'}`} />
                    <span>Studio Headquarters & CMS</span>
                  </div>
                </button>
              </nav>
            </div>

          </div>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-purple-500/15 bg-[#090414]/90">
          <div className="flex items-center justify-between p-2 rounded-xl bg-purple-500/10 border border-purple-500/15 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">{user.name}</span>
                <span className="text-[10px] font-mono text-[#c084fc]">{user.role}</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout session"
              className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/50 px-1">
            <span>Server: localhost:5000</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
        </div>

      </aside>

      {/* ================= RIGHT MAIN AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#090413]/85 backdrop-blur-xl border-b border-purple-500/15 px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400/70">
            <span className="text-purple-300">CODEXX PLUS</span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-white font-bold capitalize">{activeTab}</span>
          </div>

          {/* Action Center */}
          <div className="flex items-center gap-3">
            
            {/* Quick Publish CMS Changes Button */}
            <button
              onClick={handlePublishMasterCms}
              disabled={cmsPublishing}
              title="Save & publish all website changes to disk"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-white ${cmsPublishing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{cmsPublishing ? 'Publishing...' : 'Publish to Site'}</span>
            </button>

            {/* Sync Database Button */}
            <button
              onClick={loadAllData}
              title="Sync live records from Express API"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-xs font-mono text-purple-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#a855f7] ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            {/* Quick Add Modal Button */}
            <div className="relative">
              <button
                onClick={() => { setModalType('project'); setIsModalOpen(true); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Item</span>
              </button>
            </div>

            {/* Return to Live Site */}
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-xs font-mono text-purple-200 hover:text-white transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#a855f7]" />
              <span className="hidden sm:inline">Live Site</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full">
          
          {/* ================= MASTER SITE CMS TAB ================= */}
          {activeTab === 'cms_editor' && (
            <CmsMasterEditor
              cmsData={cmsData}
              setCmsData={setCmsData}
              onPublish={handlePublishMasterCms}
              publishing={cmsPublishing}
              saveAlert={cmsSaveAlert}
            />
          )}

          {/* ================= OVERVIEW TAB ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Welcome Banner */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#170b33] via-[#120726] to-[#0d051c] border border-purple-500/25 shadow-[0_0_40px_rgba(139,92,246,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-violet-600/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-mono text-[#c084fc] uppercase">
                        Enterprise Command
                      </span>
                      <span className="text-[11px] font-mono text-purple-400/60">
                        San Francisco & Zurich Hubs
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                      Studio Operations Telemetry
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl font-sans leading-relaxed">
                      Real-time oversight of discovery inquiries, strategy bookings, published capabilities, and global client engagements.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#0b0417]/80 border border-purple-500/25 rounded-2xl p-4 text-center min-w-[120px]">
                      <span className="text-[10px] font-mono text-purple-400 uppercase block">Platform SLA</span>
                      <span className="text-lg font-bold text-white font-mono mt-0.5 block">99.98%</span>
                    </div>
                    <div className="bg-[#0b0417]/80 border border-purple-500/25 rounded-2xl p-4 text-center min-w-[120px]">
                      <span className="text-[10px] font-mono text-purple-400 uppercase block">Edge Workers</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">14 Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Core KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Discovery Leads Card */}
                <div className="bg-[#0f0721]/90 border border-purple-500/20 hover:border-purple-500/40 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">Discovery Leads</span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{inquiries.length}</div>
                  <div className="flex items-center justify-between text-xs font-mono mt-3 pt-3 border-t border-purple-500/15">
                    <span className="text-emerald-400 font-bold">{pendingInquiriesCount} Pending Review</span>
                    <span className="text-purple-400/50">Form POST</span>
                  </div>
                </div>

                {/* Strategy Bookings Card */}
                <div className="bg-[#0f0721]/90 border border-purple-500/20 hover:border-purple-500/40 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">Strategy Calls</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{bookings.length}</div>
                  <div className="flex items-center justify-between text-xs font-mono mt-3 pt-3 border-t border-purple-500/15">
                    <span className="text-purple-300">{pendingBookingsCount} Awaiting Cutover</span>
                    <span className="text-purple-400/50">15-Min</span>
                  </div>
                </div>

                {/* Flagship Deployments Card */}
                <div className="bg-[#0f0721]/90 border border-purple-500/20 hover:border-purple-500/40 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">Deployments</span>
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{projects.length}</div>
                  <div className="flex items-center justify-between text-xs font-mono mt-3 pt-3 border-t border-purple-500/15">
                    <span className="text-purple-300">Live Client Systems</span>
                    <span className="text-purple-400/50">CMS</span>
                  </div>
                </div>

                {/* Intelligence Subscribers Card */}
                <div className="bg-[#0f0721]/90 border border-purple-500/20 hover:border-purple-500/40 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">Subscribers</span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <AtSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{subscribers.length}</div>
                  <div className="flex items-center justify-between text-xs font-mono mt-3 pt-3 border-t border-purple-500/15">
                    <span className="text-purple-300">Whitepaper Network</span>
                    <span className="text-purple-400/50">Weekly</span>
                  </div>
                </div>

              </div>

              {/* Two-Column Telemetry Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left 7 Cols: Recent Inquiries */}
                <div className="lg:col-span-7 bg-[#0d061c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-7 shadow-xl">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/15">
                    <div>
                      <h3 className="text-base font-bold text-white font-sans">Recent Discovery Inquiries</h3>
                      <p className="text-xs text-purple-300/60 font-mono mt-0.5">Real-time incoming submissions via contact form</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-mono text-[#c084fc] hover:text-white transition-colors cursor-pointer"
                    >
                      View All ({inquiries.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-[#140a28]/80 border border-purple-500/15 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white">{inq.name}</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25">
                              {inq.company || 'Enterprise'}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                              inq.status === 'new' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                              inq.status === 'in_review' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30' :
                              inq.status === 'contacted' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                              'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          
                          <p className="text-xs text-purple-200/70 mt-1.5 line-clamp-1 font-sans">
                            {inq.message || 'Discovery consultation scope.'}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] font-mono text-purple-400/60 mt-2">
                            <span>{inq.email}</span>
                            <span>•</span>
                            <span>{inq.service}</span>
                            <span>•</span>
                            <span>{inq.budget}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {inq.status !== 'contacted' && (
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors cursor-pointer"
                            >
                              Contacted
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 Cols: Scheduled Strategy Calls */}
                <div className="lg:col-span-5 bg-[#0d061c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/15">
                      <div>
                        <h3 className="text-base font-bold text-white font-sans">Strategy Consultations</h3>
                        <p className="text-xs text-purple-300/60 font-mono mt-0.5">15-minute scheduled discovery calls</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="text-xs font-mono text-[#c084fc] hover:text-white transition-colors cursor-pointer"
                      >
                        Manage ({bookings.length}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {bookings.map((book) => (
                        <div key={book.id} className="p-4 rounded-2xl bg-[#140a28]/80 border border-purple-500/15 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{book.name}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                              book.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            }`}>
                              {book.status}
                            </span>
                          </div>
                          
                          <div className="text-xs font-mono text-purple-300/80">
                            Service: <span className="text-white">{book.service}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs font-mono text-purple-400/70">
                            <Clock className="w-3.5 h-3.5 text-[#a855f7]" />
                            <span>Preferred Date: {book.preferredDate || 'Flexible'}</span>
                          </div>

                          {book.notes && (
                            <p className="text-xs text-purple-200/70 italic mt-1 font-sans">
                              "{book.notes}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono text-purple-400/60">
                    <span>Direct API: /api/bookings</span>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-[#c084fc] hover:underline"
                    >
                      Calendar view
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= INQUIRIES TAB ================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header & Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Lead Pipeline
                  </span>
                  <h1 className="text-2xl font-bold text-white">Discovery Inquiries ({filteredInquiries.length})</h1>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* Status Filter Pills */}
                  <div className="flex items-center bg-[#130826] p-1 rounded-xl border border-purple-500/20 text-xs font-mono">
                    {['all', 'new', 'in_review', 'contacted', 'archived'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setLeadFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                          leadFilterStatus === status
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold'
                            : 'text-purple-300/70 hover:text-white'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search leads..."
                      className="w-full bg-[#130826] border border-purple-500/25 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] font-mono"
                    />
                    <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Inquiries List */}
              <div className="space-y-4">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-16 bg-[#0e071c] border border-purple-500/20 rounded-3xl p-8">
                    <Mail className="w-10 h-10 text-purple-500/40 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white font-sans">No Inquiries Found</h3>
                    <p className="text-xs text-purple-300/60 font-mono mt-1">
                      No records match the current search or status filter.
                    </p>
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-[#0e071c]/90 border border-purple-500/20 hover:border-purple-500/35 rounded-3xl p-6 sm:p-7 shadow-xl transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-purple-500/15">
                        
                        {/* Client Identity & Badges */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-600/30 border border-purple-500/30 flex items-center justify-center font-bold font-mono text-base text-white shrink-0">
                            {inq.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="text-lg font-bold text-white font-sans">{inq.name}</h3>
                              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 text-[#c084fc] border border-purple-500/25">
                                {inq.company || 'Enterprise'}
                              </span>
                              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold ${
                                inq.status === 'new' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                                inq.status === 'in_review' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30' :
                                inq.status === 'contacted' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                                'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                              }`}>
                                {inq.status}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-purple-300/80 mt-2">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-[#a855f7]" />
                                <a href={`mailto:${inq.email}`} className="text-white hover:underline">{inq.email}</a>
                              </span>
                              <span>•</span>
                              <span>Service: <strong className="text-white">{inq.service}</strong></span>
                              <span>•</span>
                              <span>Budget: <strong className="text-white">{inq.budget}</strong></span>
                              <span>•</span>
                              <span className="text-purple-400/60">{new Date(inq.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions & Status Dropdown */}
                        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
                          
                          {/* Copy email button */}
                          <button
                            onClick={() => copyToClipboard(inq.email, inq.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-xs font-mono text-purple-200 transition-colors cursor-pointer"
                            title="Copy Email"
                          >
                            {copiedId === inq.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                            <span>{copiedId === inq.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          {/* Status changer */}
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-[#140a28] border border-purple-500/25 rounded-xl px-3 py-1.5 text-xs font-mono text-purple-200 focus:outline-none focus:border-[#a855f7] cursor-pointer"
                          >
                            <option value="new">Status: New</option>
                            <option value="in_review">Status: In Review</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="archived">Status: Archived</option>
                          </select>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/15 border border-rose-500/20 transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Project Scope Description */}
                      <div className="pt-5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400/80 mb-1.5">
                          Project Brief & Architecture Scope:
                        </div>
                        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-sans bg-[#130726]/60 p-4 rounded-2xl border border-purple-500/10">
                          {inq.message || 'No specific description attached with discovery inquiry.'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================= BOOKINGS TAB ================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Strategy Schedule
                  </span>
                  <h1 className="text-2xl font-bold text-white">Discovery Call Consultations ({bookings.length})</h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bookings.map((book) => (
                  <div key={book.id} className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                        <div>
                          <h3 className="text-lg font-bold text-white font-sans">{book.name}</h3>
                          <a href={`mailto:${book.email}`} className="text-xs font-mono text-purple-400 hover:underline">
                            {book.email}
                          </a>
                        </div>
                        <span className={`text-[10px] font-mono px-3 py-1 rounded-full uppercase font-bold ${
                          book.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                          book.status === 'completed' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' :
                          'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}>
                          {book.status}
                        </span>
                      </div>

                      <div className="py-4 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-purple-300/80">
                          <span>Discipline:</span>
                          <strong className="text-white">{book.service}</strong>
                        </div>
                        <div className="flex items-center justify-between text-purple-300/80">
                          <span>Preferred Date:</span>
                          <strong className="text-[#c084fc]">{book.preferredDate || 'Flexible'}</strong>
                        </div>
                        {book.notes && (
                          <div className="pt-2">
                            <span className="text-purple-400/80 block text-[11px] mb-1">Notes:</span>
                            <p className="text-purple-200/90 font-sans italic bg-[#140a28]/80 p-3 rounded-xl border border-purple-500/15">
                              "{book.notes}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between">
                      <select
                        value={book.status}
                        onChange={(e) => handleUpdateBookingStatus(book.id, e.target.value)}
                        className="bg-[#140a28] border border-purple-500/25 rounded-xl px-3 py-1.5 text-xs font-mono text-purple-200 focus:outline-none focus:border-[#a855f7]"
                      >
                        <option value="pending">Status: Pending</option>
                        <option value="confirmed">Status: Confirmed</option>
                        <option value="rescheduled">Status: Rescheduled</option>
                        <option value="completed">Status: Completed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteBooking(book.id)}
                        className="p-2 text-rose-400 hover:bg-rose-500/15 rounded-xl transition-colors cursor-pointer"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SERVICES / CAPABILITIES TAB ================= */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Studio Capabilities
                  </span>
                  <h1 className="text-2xl font-bold text-white">Disciplines & Services ({services.length})</h1>
                </div>

                <button
                  onClick={() => { setModalType('service'); setIsModalOpen(true); }}
                  className="flex items-center gap-2 text-xs font-bold font-mono uppercase bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Discipline</span>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((serv) => (
                  <div
                    key={serv.id}
                    className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-500/20 text-[#c084fc] font-bold border border-purple-500/30">
                          {serv.num}
                        </span>
                        <h3 className="text-lg font-bold text-white font-sans">{serv.title}</h3>
                        <span className="text-xs font-mono text-purple-400/80">({serv.tag})</span>
                      </div>
                      <p className="text-xs sm:text-sm text-purple-200/75 max-w-3xl leading-relaxed font-sans">{serv.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {serv.tags && serv.tags.map((t, idx) => (
                          <span key={idx} className="text-[11px] font-mono bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full text-purple-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PROJECTS TAB ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Showcase Portfolio
                  </span>
                  <h1 className="text-2xl font-bold text-white">Flagship Deployments ({projects.length})</h1>
                </div>

                <button
                  onClick={() => { setModalType('project'); setIsModalOpen(true); }}
                  className="flex items-center gap-2 text-xs font-bold font-mono uppercase bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Deployment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-5 shadow-xl flex flex-col justify-between group hover:border-purple-500/40 transition-all"
                  >
                    <div>
                      <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 mb-4 border border-purple-500/15 relative">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                          {proj.category}
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/30 text-white border border-purple-400/40 backdrop-blur-md">
                          {proj.year}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[#c084fc] mb-1">{proj.tag}</div>
                      <h3 className="text-base font-bold text-white font-sans mb-1.5 leading-snug">{proj.title}</h3>
                      <p className="text-xs text-purple-200/70 font-sans leading-relaxed line-clamp-2">{proj.desc}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-400/80">Client: {proj.client}</span>
                      <button
                        onClick={() => setProjects(prev => prev.filter(p => p.id !== proj.id))}
                        className="text-rose-400 hover:text-white transition-colors cursor-pointer p-1"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= ARCHITECTS TAB ================= */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Studio Leadership
                  </span>
                  <h1 className="text-2xl font-bold text-white">Architects & Engineering Leads ({team.length})</h1>
                </div>

                <button
                  onClick={() => { setModalType('team'); setIsModalOpen(true); }}
                  className="flex items-center gap-2 text-xs font-bold font-mono uppercase bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Architect</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {team.map((mem) => (
                  <div key={mem.id} className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 text-center flex flex-col justify-between hover:border-purple-500/40 transition-all">
                    <div>
                      <div className="w-20 h-20 rounded-full mx-auto p-0.5 bg-gradient-to-br from-violet-600 to-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.3)] mb-4">
                        <img src={mem.image} alt={mem.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <h4 className="text-base font-bold text-white font-sans">{mem.name}</h4>
                      <p className="text-xs font-mono text-[#c084fc] mt-1">{mem.role}</p>
                      <p className="text-[11px] text-purple-200/70 mt-2 font-sans line-clamp-2">{mem.specialty}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-purple-500/15">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {mem.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TESTIMONIALS TAB ================= */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-purple-500/15">
                <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                  Verified Endorsements
                </span>
                <h1 className="text-2xl font-bold text-white">Client Feedback & Case Studies ({testimonials.length})</h1>
              </div>

              <div className="space-y-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-7">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/40" />
                      <div>
                        <h4 className="text-base font-bold text-white font-sans">{test.name}</h4>
                        <p className="text-xs text-purple-300/80 font-mono">{test.role} • <strong className="text-white">{test.company}</strong></p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-sans italic bg-[#130726]/60 p-4 rounded-2xl border border-purple-500/10">
                      "{test.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SUBSCRIBERS TAB ================= */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc]">
                    Mailing List
                  </span>
                  <h1 className="text-2xl font-bold text-white">Studio Subscribers ({subscribers.length})</h1>
                </div>

                <button
                  onClick={() => {
                    const allEmails = subscribers.map(s => s.email).join('\n');
                    navigator.clipboard.writeText(allEmails);
                    alert('All subscriber emails copied to clipboard!');
                  }}
                  className="flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/25 text-purple-200 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Emails</span>
                </button>
              </div>

              <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6">
                <div className="space-y-2.5 font-mono text-xs">
                  {subscribers.map((sub, idx) => (
                    <div key={sub.id || idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#140a28]/80 border border-purple-500/15">
                      <div className="flex items-center gap-3">
                        <AtSign className="w-4 h-4 text-[#c084fc]" />
                        <span className="text-white font-mono">{sub.email}</span>
                      </div>
                      <span className="text-purple-400/60 text-[11px]">{new Date(sub.subscribedAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= SETTINGS TAB ================= */}
          {activeTab === 'settings' && (
            <CmsMasterEditor
              cmsData={cmsData}
              setCmsData={setCmsData}
              onPublish={handlePublishMasterCms}
              publishing={cmsPublishing}
              saveAlert={cmsSaveAlert}
            />
          )}

        </main>
      </div>

      {/* ================= ADD ITEM MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0e071c] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(44,21,140,0.6)]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-purple-400 hover:text-white p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-5 capitalize font-sans">
              Add New {modalType}
            </h3>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-purple-300 mb-1.5">Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neural Agent Platform"
                  value={newItemData.title || newItemData.name || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, title: e.target.value, name: e.target.value })}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                />
              </div>

              {modalType === 'project' && (
                <>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Category</label>
                    <select
                      value={newItemData.category || 'Development'}
                      onChange={(e) => setNewItemData({ ...newItemData, category: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    >
                      <option value="Development">Development</option>
                      <option value="Visual Identity">Visual Identity</option>
                      <option value="Motion & 3D">Motion & 3D</option>
                      <option value="AI Systems">AI Systems</option>
                      <option value="SEO / GEO">SEO / GEO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Client Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aura Financial Labs"
                      value={newItemData.client || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, client: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Project brief and architectural scope..."
                      value={newItemData.desc || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, desc: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                </>
              )}

              {modalType === 'service' && (
                <>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Discipline Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Edge Architecture"
                      value={newItemData.tag || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, tag: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="TypeScript, LLM, WebGL"
                      value={newItemData.tagsString || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, tagsString: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Capability Description</label>
                    <textarea
                      rows={3}
                      value={newItemData.desc || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, desc: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                </>
              )}

              {modalType === 'team' && (
                <>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Principal AI Architect"
                      value={newItemData.role || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, role: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Specialty</label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise Agent Workflows"
                      value={newItemData.specialty || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, specialty: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-purple-300 mb-1.5">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Zurich Hub or San Francisco"
                      value={newItemData.location || ''}
                      onChange={(e) => setNewItemData({ ...newItemData, location: e.target.value })}
                      className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white focus:border-[#a855f7] outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold uppercase tracking-wider py-3.5 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer shadow-lg mt-4"
              >
                Save {modalType}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
