import React, { useState, useEffect } from 'react';
import CmsMasterEditor from './CmsMasterEditor';
import {
  LayoutDashboard,
  Mail,
  Users,
  Sliders,
  Settings,
  LogOut,
  ArrowLeft,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  X,
  Activity
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import { useCms } from '../context/CmsContext';

export default function AdminPanel({ onBackToSite }) {
  const [user, setUser] = useState(null);
  const { content: cmsContent, updateContent: updateCmsContent } = useCms();
  const [cmsData, setCmsData] = useState(() => cmsContent);
  const [activeTab, setActiveTab] = useState('overview');
  const [cmsSection, setCmsSection] = useState('brand');
  const [cmsPublishing, setCmsPublishing] = useState(false);
  const [alert, setAlert] = useState(null);

  // Stats and Inquiries state
  const [stats, setStats] = useState({
    inquiriesCount: 0,
    pendingInquiries: 0,
    subscribersCount: 0,
    servicesCount: 4,
    projectsCount: 6,
    teamCount: 7,
  });

  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    if (cmsContent) {
      setCmsData(cmsContent);
    }
  }, [cmsContent]);

  const loadBackendData = async () => {
    setLoadingData(true);
    try {
      const [statsRes, inqRes, subRes] = await Promise.all([
        fetch('/api/stats').catch(() => null),
        fetch('/api/contact').catch(() => null),
        fetch('/api/newsletter').catch(() => null),
      ]);

      if (statsRes?.ok) {
        const sJson = await statsRes.json();
        if (sJson.success && sJson.data) setStats(sJson.data);
      }

      if (inqRes?.ok) {
        const iJson = await inqRes.json();
        if (iJson.success && Array.isArray(iJson.data)) setInquiries(iJson.data);
      }

      if (subRes?.ok) {
        const subJson = await subRes.json();
        if (subJson.success && Array.isArray(subJson.data)) setSubscribers(subJson.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadBackendData();
    }
  }, [user]);

  const handlePublishCms = async () => {
    setCmsPublishing(true);
    setAlert(null);
    try {
      const res = await updateCmsContent(cmsData);
      if (res && res.success !== false) {
        setAlert({ type: 'success', text: 'Avista live website content successfully published and saved to backend!' });
      } else {
        setAlert({ type: 'error', text: 'Failed to publish CMS content.' });
      }
    } catch {
      setAlert({ type: 'error', text: 'Network error publishing CMS content.' });
    } finally {
      setCmsPublishing(false);
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => null);

      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      setAlert({ type: 'success', text: `Inquiry status updated to ${status}.` });
      setTimeout(() => setAlert(null), 3000);
    } catch {
      // Ignore
    }
  };

  if (!user) {
    return <AdminLogin onLogin={setUser} onBackToSite={onBackToSite} />;
  }

  const filteredInquiries = inquiries.filter(inq => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return inq.name?.toLowerCase().includes(q) || inq.email?.toLowerCase().includes(q) || inq.message?.toLowerCase().includes(q);
  });

  return (
    <div style={{
      '--paper': '#edeef1',
      '--paper-2': '#e1e3e9',
      '--white': '#fafafb',
      '--ink': '#15171c',
      '--ink-soft': '#4a4f5c',
      '--line': 'rgba(21, 23, 28, 0.14)',
      minHeight: '100vh',
      background: 'var(--paper)',
      color: 'var(--ink)',
      fontFamily: 'var(--body)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header */}
      <header style={{
        background: 'var(--white)',
        borderBottom: '1.5px solid var(--line)',
        padding: '0.9rem clamp(1rem, 3vw, 2.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              width: '1.1rem',
              height: '1.1rem',
              background: 'var(--blue)',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)'
            }} />
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em' }}>
              Codex Studio Admin
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(51, 38, 255, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', color: 'var(--blue)', fontWeight: 600 }}>
            <Activity size={12} />
            <span>Backend Connected</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBackToSite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              border: '1.5px solid var(--line)',
              background: 'transparent',
              color: 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            <span>View Live Site</span>
          </button>

          <button
            onClick={() => setUser(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(14rem, 18vw, 18rem) 1fr',
        flex: 1
      }}>
        {/* Sidebar Nav */}
        <aside style={{
          background: 'var(--white)',
          borderRight: '1.5px solid var(--line)',
          padding: '1.8rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'overview' ? 'var(--blue)' : 'transparent',
              color: activeTab === 'overview' ? '#fff' : 'var(--ink)'
            }}
          >
            <LayoutDashboard size={18} />
            <span>Overview & Health</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'inquiries' ? 'var(--blue)' : 'transparent',
              color: activeTab === 'inquiries' ? '#fff' : 'var(--ink)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} />
              <span>Client Inquiries</span>
            </div>
            {inquiries.length > 0 && (
              <span style={{
                background: activeTab === 'inquiries' ? 'rgba(255,255,255,0.25)' : 'var(--paper-2)',
                padding: '0.1rem 0.5rem',
                borderRadius: '999px',
                fontSize: '0.75rem'
              }}>
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'subscribers' ? 'var(--blue)' : 'transparent',
              color: activeTab === 'subscribers' ? '#fff' : 'var(--ink)'
            }}
          >
            <Users size={18} />
            <span>Newsletter List</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'cms' ? 'var(--blue)' : 'transparent',
              color: activeTab === 'cms' ? '#fff' : 'var(--ink)'
            }}
          >
            <Sliders size={18} />
            <span>Live CMS Studio</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(99,102,241,0.2)', marginLeft: '0.75rem' }}>
            {[
              { id: 'brand', label: 'Global Brand & Hubs' },
              { id: 'settings', label: 'Site Settings & SEO' },
              { id: 'hero', label: 'Hero Main Section' },
              { id: 'about', label: 'About & Philosophy' },
              { id: 'services', label: 'Capabilities & Services' },
              { id: 'team', label: 'Team Members' },
              { id: 'pricing', label: 'Investment Sprints' },
              { id: 'projects', label: 'Flagship Deployments' },
              { id: 'faqs', label: 'Technical FAQs' },
              { id: 'testimonials', label: 'Client Feedback' },
              { id: 'journal', label: 'Journal & Posts' },
              { id: 'navigation', label: 'Nav, Searches & Marquee' },
              { id: 'policies', label: 'Compliance & Policies' },
              { id: 'raw', label: 'Raw JSON Editor' },
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveTab('cms');
                  setCmsSection(sec.id);
                }}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: activeTab === 'cms' && cmsSection === sec.id ? 700 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'cms' && cmsSection === sec.id ? 'rgba(51, 38, 255, 0.12)' : 'transparent',
                  color: activeTab === 'cms' && cmsSection === sec.id ? 'var(--blue)' : 'var(--ink-soft)'
                }}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'settings' ? 'var(--blue)' : 'transparent',
              color: activeTab === 'settings' ? '#fff' : 'var(--ink)'
            }}
          >
            <Settings size={18} />
            <span>Database & System</span>
          </button>
        </aside>

        {/* Tab Content Area */}
        <main style={{ padding: '2rem clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          {alert && (
            <div style={{
              background: alert.type === 'error' ? 'rgba(255, 106, 61, 0.1)' : 'rgba(51, 38, 255, 0.08)',
              border: `1.5px solid ${alert.type === 'error' ? 'var(--coral)' : 'var(--blue)'}`,
              color: alert.type === 'error' ? 'var(--coral)' : 'var(--blue)',
              padding: '0.85rem 1.25rem',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              {alert.text}
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
                  Overview & Intelligence
                </h2>
                <p style={{ color: 'var(--ink-soft)', margin: '0.4rem 0 0' }}>
                  Live metrics, real-time client submissions, and studio health status.
                </p>
              </div>

              {/* Metric Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', padding: '1.5rem', borderRadius: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Total Inquiries</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 800, marginTop: '0.2rem' }}>
                    {inquiries.length || stats.inquiriesCount}
                  </div>
                </div>

                <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', padding: '1.5rem', borderRadius: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Pending Review</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 800, color: 'var(--coral)', marginTop: '0.2rem' }}>
                    {inquiries.filter(i => i.status === 'new' || i.status === 'in_review').length || stats.pendingInquiries}
                  </div>
                </div>

                <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', padding: '1.5rem', borderRadius: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Subscribers</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 800, color: 'var(--blue)', marginTop: '0.2rem' }}>
                    {subscribers.length || stats.subscribersCount}
                  </div>
                </div>

                <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', padding: '1.5rem', borderRadius: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontWeight: 600 }}>Projects Shipped</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 800, marginTop: '0.2rem' }}>
                    240+
                  </div>
                </div>
              </div>

              {/* Quick Jump & Recent Leads */}
              <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: '1.5rem', padding: '1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
                    Recent Client Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)', cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p style={{ color: 'var(--ink-soft)', margin: 0 }}>No inquiries submitted yet. Forms from Faq.jsx appear here.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {inquiries.slice(0, 4).map(inq => (
                      <div key={inq.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--paper)', borderRadius: '0.75rem' }}>
                        <div>
                          <strong>{inq.name}</strong> <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>({inq.email})</span>
                          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{inq.message?.slice(0, 80)}...</p>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '999px', background: inq.status === 'new' ? 'rgba(255,106,61,0.15)' : 'rgba(51,38,255,0.1)', color: inq.status === 'new' ? 'var(--coral)' : 'var(--blue)' }}>
                          {inq.status || 'new'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
                    Client Inquiries
                  </h2>
                  <p style={{ color: 'var(--ink-soft)', margin: '0.4rem 0 0' }}>
                    Project inquiries received via the Faq.jsx contact form.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    onClick={loadBackendData}
                    disabled={loadingData}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      border: '1.5px solid var(--line)',
                      background: 'var(--white)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <RefreshCw size={14} className={loadingData ? 'spin' : ''} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Search bar */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: '0.75rem', padding: '0.6rem 1rem' }}>
                <Search size={16} color="var(--ink-soft)" style={{ marginRight: '0.6rem' }} />
                <input
                  type="text"
                  placeholder="Filter by client name, email, or message..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredInquiries.length === 0 ? (
                  <div style={{ background: 'var(--white)', padding: '3rem', textAlign: 'center', borderRadius: '1.25rem', border: '1.5px solid var(--line)' }}>
                    <p style={{ color: 'var(--ink-soft)', margin: 0 }}>No matching inquiries found.</p>
                  </div>
                ) : (
                  filteredInquiries.map(inq => (
                    <div
                      key={inq.id}
                      style={{
                        background: 'var(--white)',
                        border: '1.5px solid var(--line)',
                        borderRadius: '1.25rem',
                        padding: '1.5rem',
                        display: 'grid',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>{inq.name}</strong>
                          <span style={{ color: 'var(--blue)', marginLeft: '0.6rem', fontSize: '0.9rem' }}>{inq.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {['new', 'in_review', 'contacted'].map(st => (
                            <button
                              key={st}
                              onClick={() => handleUpdateInquiryStatus(inq.id, st)}
                              style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                border: 'none',
                                background: inq.status === st ? 'var(--blue)' : 'var(--paper)',
                                color: inq.status === st ? '#fff' : 'var(--ink)'
                              }}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p style={{ background: 'var(--paper)', padding: '1rem', borderRadius: '0.75rem', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>
                        {inq.message}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
                        <span>Service: {inq.service || 'Avista Consultation'}</span>
                        <span>{inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
                  Newsletter Subscribers
                </h2>
                <p style={{ color: 'var(--ink-soft)', margin: '0.4rem 0 0' }}>
                  Audience members subscribed through the Footer newsletter form.
                </p>
              </div>

              <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: '1.25rem', overflow: 'hidden' }}>
                {subscribers.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--ink-soft)' }}>
                    No newsletter subscriptions recorded yet.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--paper)', borderBottom: '1.5px solid var(--line)' }}>
                        <th style={{ padding: '0.9rem 1.25rem' }}>Email</th>
                        <th style={{ padding: '0.9rem 1.25rem' }}>Date Subscribed</th>
                        <th style={{ padding: '0.9rem 1.25rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>{sub.email || sub}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: 'var(--ink-soft)' }}>{sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'Active'}</td>
                          <td style={{ padding: '0.9rem 1.25rem' }}>
                            <span style={{ background: 'rgba(51,38,255,0.08)', color: 'var(--blue)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                              Subscribed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CMS STUDIO */}
          {activeTab === 'cms' && (
            <CmsMasterEditor
              cmsData={cmsData}
              setCmsData={setCmsData}
              onPublish={handlePublishCms}
              publishing={cmsPublishing}
              saveAlert={alert}
              activeSection={cmsSection}
              onSectionChange={setCmsSection}
            />
          )}

          {/* TAB 5: SYSTEM */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
                  System Architecture & Database
                </h2>
                <p style={{ color: 'var(--ink-soft)', margin: '0.4rem 0 0' }}>
                  Infrastructure, storage engine, and production environment metrics.
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: '1.25rem', padding: '1.8rem' }}>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                    aaPanel VPS Deployment Health
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'var(--paper)', padding: '1rem', borderRadius: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Production Domain</span>
                      <p style={{ margin: '0.2rem 0 0', fontWeight: 700 }}>codexplus.site</p>
                    </div>
                    <div style={{ background: 'var(--paper)', padding: '1rem', borderRadius: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Storage Engine</span>
                      <p style={{ margin: '0.2rem 0 0', fontWeight: 700 }}>PostgreSQL + db.json fallback</p>
                    </div>
                    <div style={{ background: 'var(--paper)', padding: '1rem', borderRadius: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>API Prefix</span>
                      <p style={{ margin: '0.2rem 0 0', fontWeight: 700 }}>/api (Proxied)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
