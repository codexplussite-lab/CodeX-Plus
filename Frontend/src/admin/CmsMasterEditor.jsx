import React, { useState } from 'react';
import {
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Building,
  Layers,
  Cpu,
  Users,
  DollarSign,
  FolderGit2,
  HelpCircle,
  MessageSquareQuote,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  CodeXml,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check
} from 'lucide-react';
import { DEFAULT_CMS_DATA } from '../context/CmsContext';

export default function CmsMasterEditor({ cmsData, setCmsData, onPublish, publishing, saveAlert, activeSection: controlledSection, onSectionChange }) {
  const [internalSection, setInternalSection] = useState('brand');
  const activeSection = controlledSection ?? internalSection;
  const setActiveSection = onSectionChange ?? setInternalSection;
  const [rawJsonText, setRawJsonText] = useState('');
  const [rawJsonError, setRawJsonError] = useState(null);

  const updateSectionField = (section, field, value) => {
    setCmsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleResetSection = (section) => {
    if (!window.confirm(`Reset "${section}" section to factory default content?`)) return;
    setCmsData(prev => ({
      ...prev,
      [section]: JSON.parse(JSON.stringify(DEFAULT_CMS_DATA[section]))
    }));
  };

  const handleResetAll = () => {
    if (!window.confirm('WARNING: Reset ALL website content to default initial configuration?')) return;
    setCmsData(JSON.parse(JSON.stringify(DEFAULT_CMS_DATA)));
  };

  // Helper arrays
  const brand = cmsData?.brand || DEFAULT_CMS_DATA.brand;
  const hero = cmsData?.hero || DEFAULT_CMS_DATA.hero;
  const about = cmsData?.about || DEFAULT_CMS_DATA.about;
  const services = cmsData?.services || DEFAULT_CMS_DATA.services;
  const rawTeam = cmsData?.team || DEFAULT_CMS_DATA.team;
  const team = Array.isArray(rawTeam) ? { members: rawTeam } : { ...rawTeam, members: Array.isArray(rawTeam?.members) ? rawTeam.members : DEFAULT_CMS_DATA.team };
  const pricing = cmsData?.pricing || DEFAULT_CMS_DATA.pricing;
  const projects = cmsData?.projects || DEFAULT_CMS_DATA.projects;
  const faqs = cmsData?.faqs || DEFAULT_CMS_DATA.faqs;
  const testimonials = cmsData?.testimonials || DEFAULT_CMS_DATA.testimonials;
  const paymentPolicy = cmsData?.paymentPolicy || DEFAULT_CMS_DATA.paymentPolicy;
  const privacyPolicy = cmsData?.privacyPolicy || DEFAULT_CMS_DATA.privacyPolicy;

  const sectionsMenu = [
    { id: 'brand', name: 'Global Brand & Hubs', icon: Globe, count: '9 Fields' },
    { id: 'settings', name: 'Site Settings & SEO', icon: Building, count: '7 Settings' },
    { id: 'hero', name: 'Hero Main Section', icon: Sparkles, count: '8 Fields' },
    { id: 'about', name: 'About & Philosophy', icon: Building, count: `${about?.stats?.length || 4} Stats` },
    { id: 'services', name: 'Capabilities & Services', icon: Cpu, count: `${services?.items?.length || 5} Services` },
    { id: 'team', name: 'Team Members', icon: Users, count: `${team?.members?.length || 8} Members` },
    { id: 'pricing', name: 'Investment Sprints', icon: DollarSign, count: `${pricing?.tiers?.length || 3} Tiers` },
    { id: 'projects', name: 'Flagship Deployments', icon: FolderGit2, count: `${projects?.items?.length || 4} Projects` },
    { id: 'faqs', name: 'Technical FAQs', icon: HelpCircle, count: `${faqs?.items?.length || 5} FAQs` },
    { id: 'testimonials', name: 'Client Feedback', icon: MessageSquareQuote, count: `${testimonials?.items?.length || 3} Reviews` },
    { id: 'journal', name: 'Journal & Posts', icon: Layers, count: `${Array.isArray(cmsData?.posts) ? cmsData.posts.length : 0} Posts` },
    { id: 'navigation', name: 'Nav, Searches & Marquee', icon: Globe, count: `${Array.isArray(cmsData?.nav) ? cmsData.nav.length : 0} Links` },
    { id: 'policies', name: 'Compliance & Policies', icon: ShieldAlert, count: '2 Legal Docs' },
    { id: 'raw', name: 'Raw JSON Editor', icon: CodeXml, count: 'Full CMS' },
  ];

  return (
    <div className="cms-editor-root">
      <style>{`
        .cms-editor-root { display: flex; flex-direction: column; gap: 1.5rem; font-family: inherit; color: #111827; }
        .cms-editor-root > div:first-of-type { background: linear-gradient(135deg, #170933, #110526); color: #fff; padding: 1.75rem 2rem; border-radius: 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.25rem; }
        .cms-editor-root > div:first-of-type h1 { color: #fff; font-size: 1.75rem; font-weight: 800; margin: 0.35rem 0; }
        .cms-editor-root > div:first-of-type p { color: rgba(233,213,255,0.8); font-size: 0.9rem; margin: 0; max-width: 42rem; }
        .cms-editor-root > div:first-of-type > div:last-child { display: flex; gap: 0.75rem; align-items: center; }
        .cms-editor-root button { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.6rem 1.1rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; background: #fff; color: #1f2937; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .cms-editor-root button:hover { background: #f3f4f6; }
        .cms-editor-root > div:first-of-type button:last-child,
        .cms-editor-root > div:last-child button { background: #4f46e5; color: #fff; border-color: #4f46e5; }
        .cms-editor-root > div:first-of-type button:last-child:hover,
        .cms-editor-root > div:last-child button:hover { background: #4338ca; }
        .cms-editor-root > div:nth-of-type(2):not(:last-child) { background: #fff; border: 1px solid #e5e7eb; border-radius: 1.25rem; padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .cms-editor-root .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; width: 100%; }
        .cms-editor-root img { width: 56px; height: 56px; object-fit: cover; border-radius: 0.75rem; flex-shrink: 0; }
        .cms-editor-root .space-y-6 { display: flex; flex-direction: column; gap: 1.25rem; width: 100%; }
        .cms-editor-root .space-y-4 { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        .cms-editor-root .space-y-3 { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .cms-editor-root .space-y-2 { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; }
        .cms-editor-root .flex { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .cms-editor-root .items-center { align-items: center; }
        .cms-editor-root .justify-between { justify-content: space-between; }
        .cms-editor-root .p-5, .cms-editor-root .p-6 { padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 1rem; background: #f9fafb; }
        .cms-editor-root input[type="text"],
        .cms-editor-root input[type="email"],
        .cms-editor-root input[type="url"],
        .cms-editor-root input[type="number"],
        .cms-editor-root textarea,
        .cms-editor-root select { width: 100%; box-sizing: border-box; padding: 0.65rem 0.85rem; border-radius: 0.65rem; border: 1.5px solid #d1d5db; background: #fff; color: #111827; font-size: 0.9rem; font-family: inherit; margin-top: 0.25rem; }
        .cms-editor-root input:focus, .cms-editor-root textarea:focus, .cms-editor-root select:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
        .cms-editor-root label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-top: 0.75rem; }
        .cms-editor-root h2, .cms-editor-root h3 { font-size: 1.15rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem; }
        .cms-editor-root > div:last-child { position: sticky; bottom: 1rem; background: #100720; color: #fff; padding: 1rem 1.5rem; border-radius: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
      `}</style>
      
      {/* Top Banner & Control Bar */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#170933] via-[#110526] to-[#0d041c] border border-purple-500/25 shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/35 text-[10px] font-mono text-[#c084fc] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#c084fc]" />
              Master Site Content Management System
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Site-Wide Content Editor
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl font-sans leading-relaxed">
            Directly customize every headline, quote, pricing tier, architect, deliverable, and legal clause across the entire website with instant disk persistence to <code className="text-purple-300 font-mono">db.json</code>.
          </p>
        </div>

        {/* Global Save / Reset Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetAll}
            className="px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-rose-500/20 text-purple-300 hover:text-rose-200 border border-purple-500/20 hover:border-rose-500/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-2"
            title="Reset everything to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>

          <button
            type="button"
            onClick={onPublish}
            disabled={publishing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Save className={`w-4 h-4 ${publishing ? 'animate-spin' : ''}`} />
            <span>{publishing ? 'Saving to Disk...' : 'Publish All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Save Notification Alert */}
      {saveAlert && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-mono animate-in fade-in ${
          saveAlert.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-200' 
            : 'bg-rose-500/15 border-rose-500/35 text-rose-200'
        }`}>
          {saveAlert.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{saveAlert.text}</span>
        </div>
      )}

      {/* Navigation Sub-Menu Bar (hidden when controlled by AdminPanel sidebar) */}
      {!controlledSection && (
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-purple-500/15">
        {sectionsMenu.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400/40'
                  : 'bg-[#100722] text-purple-300/70 hover:text-white hover:bg-purple-500/15 border border-purple-500/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                isActive ? 'bg-white/20 text-white' : 'bg-purple-500/15 text-purple-400'
              }`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
      )}

      {/* ================= 1. GLOBAL BRAND & HUBS ================= */}
      {activeSection === 'brand' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Global Studio Branding & Footprint</h3>
              <p className="text-purple-300/70 text-xs">Governs site title, footer hubs, phone, direct emails, and copyright notices.</p>
            </div>
            <button
              type="button"
              onClick={() => handleResetSection('brand')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
            >
              Reset Brand Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Studio Brand Name</label>
              <input
                type="text"
                value={brand.siteName || ''}
                onChange={(e) => updateSectionField('brand', 'siteName', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Brand Tagline</label>
              <input
                type="text"
                value={brand.tagline || ''}
                onChange={(e) => updateSectionField('brand', 'tagline', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Header Marquee Pill Badge</label>
              <input
                type="text"
                value={brand.headerBadge || ''}
                onChange={(e) => updateSectionField('brand', 'headerBadge', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Primary Ingestion Email</label>
              <input
                type="email"
                value={brand.primaryEmail || ''}
                onChange={(e) => updateSectionField('brand', 'primaryEmail', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Primary Direct Phone</label>
              <input
                type="text"
                value={brand.phone || ''}
                onChange={(e) => updateSectionField('brand', 'phone', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Architect SLA Guarantee Text</label>
              <input
                type="text"
                value={brand.slaResponse || ''}
                onChange={(e) => updateSectionField('brand', 'slaResponse', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">San Francisco Flagship Address</label>
              <input
                type="text"
                value={brand.sfAddress || ''}
                onChange={(e) => updateSectionField('brand', 'sfAddress', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Zurich Systems Lab Address</label>
              <input
                type="text"
                value={brand.zurichAddress || ''}
                onChange={(e) => updateSectionField('brand', 'zurichAddress', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-300 uppercase mb-2">Brand Logo Image (Upload or URL)</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="https://... or upload"
                value={brand.logoUrl || ''}
                onChange={(e) => updateSectionField('brand', 'logoUrl', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
              <label style={{ margin: 0, cursor: 'pointer', padding: '0.65rem 1rem', borderRadius: '0.75rem', background: '#4f46e5', color: '#fff', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const r = new FileReader();
                    r.onload = () => updateSectionField('brand', 'logoUrl', r.result);
                    r.readAsDataURL(f);
                  }}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-purple-300 uppercase mb-2">Footer Copyright Statement</label>
            <input
              type="text"
              value={brand.copyright || ''}
              onChange={(e) => updateSectionField('brand', 'copyright', e.target.value)}
              className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
            />
          </div>
        </div>
      )}

      {/* ================= 2. HERO SECTION ================= */}
      {activeSection === 'hero' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Homepage Hero Section</h3>
              <p className="text-purple-300/70 text-xs">Primary headline typography, narrative paragraph, CTA buttons, and ambient pill.</p>
            </div>
            <button
              type="button"
              onClick={() => handleResetSection('hero')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
            >
              Reset Hero Defaults
            </button>
          </div>

          <div>
            <label className="block text-purple-300 uppercase mb-2">Top Glowing Badge</label>
            <input
              type="text"
              value={hero.badge || ''}
              onChange={(e) => updateSectionField('hero', 'badge', e.target.value)}
              className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Title Line 1 (White)</label>
              <input
                type="text"
                value={hero.titleLine1 || ''}
                onChange={(e) => updateSectionField('hero', 'titleLine1', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Title Highlight (Violet Gradient)</label>
              <input
                type="text"
                value={hero.titleHighlight || ''}
                onChange={(e) => updateSectionField('hero', 'titleHighlight', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-[#c084fc] font-bold focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Title Line 2 (White)</label>
              <input
                type="text"
                value={hero.titleLine2 || ''}
                onChange={(e) => updateSectionField('hero', 'titleLine2', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-300 uppercase mb-2">Hero Narrative Description</label>
            <textarea
              rows={3}
              value={hero.description || ''}
              onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
              className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Primary CTA Button</label>
              <input
                type="text"
                value={hero.ctaPrimary || ''}
                onChange={(e) => updateSectionField('hero', 'ctaPrimary', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Secondary CTA Button</label>
              <input
                type="text"
                value={hero.ctaSecondary || ''}
                onChange={(e) => updateSectionField('hero', 'ctaSecondary', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Bottom Footer Pill Text</label>
              <input
                type="text"
                value={hero.footerPill || ''}
                onChange={(e) => updateSectionField('hero', 'footerPill', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. ABOUT & PHILOSOPHY ================= */}
      {activeSection === 'about' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Studio Philosophy, Founder Manifesto & Stats</h3>
              <p className="text-purple-300/70 text-xs">Executive manifesto quote, partner attribution, numerical statistics, and three architectural pillars.</p>
            </div>
            <button
              type="button"
              onClick={() => handleResetSection('about')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
            >
              Reset About Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Badge</label>
              <input
                type="text"
                value={about.sectionBadge || ''}
                onChange={(e) => updateSectionField('about', 'sectionBadge', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Founder Name</label>
              <input
                type="text"
                value={about.founderName || ''}
                onChange={(e) => updateSectionField('about', 'founderName', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-300 uppercase mb-2">Founder Executive Manifesto Quote</label>
            <textarea
              rows={3}
              value={about.quote || ''}
              onChange={(e) => updateSectionField('about', 'quote', e.target.value)}
              className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Founder Role Title</label>
              <input
                type="text"
                value={about.founderRole || ''}
                onChange={(e) => updateSectionField('about', 'founderRole', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Founder Experience Badge</label>
              <input
                type="text"
                value={about.founderExp || ''}
                onChange={(e) => updateSectionField('about', 'founderExp', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Founder Image URL / Path</label>
              <input
                type="text"
                value={about.founderImage || ''}
                onChange={(e) => updateSectionField('about', 'founderImage', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none"
              />
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="pt-4 border-t border-purple-500/15">
            <h4 className="text-white font-bold text-sm mb-3">Numerical Proof Metrics (4 Stats)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {(about.stats || []).map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-2">
                  <span className="text-[10px] text-purple-400 uppercase">Metric #{idx + 1}</span>
                  <div>
                    <label className="text-[10px] text-purple-300/70 block mb-1">Value (e.g. 99.98%)</label>
                    <input
                      type="text"
                      value={st.value || ''}
                      onChange={(e) => {
                        const newStats = [...(about.stats || [])];
                        newStats[idx] = { ...newStats[idx], value: e.target.value };
                        updateSectionField('about', 'stats', newStats);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300/70 block mb-1">Label</label>
                    <input
                      type="text"
                      value={st.label || ''}
                      onChange={(e) => {
                        const newStats = [...(about.stats || [])];
                        newStats[idx] = { ...newStats[idx], label: e.target.value };
                        updateSectionField('about', 'stats', newStats);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars List */}
          <div className="pt-4 border-t border-purple-500/15 space-y-4">
            <h4 className="text-white font-bold text-sm">3 Core Studio Pillars</h4>
            {(about.pillars || []).map((pillar, pIdx) => (
              <div key={pIdx} className="p-4 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#c084fc]">Pillar {pillar.num || `0${pIdx + 1}`}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Title</label>
                    <input
                      type="text"
                      value={pillar.title || ''}
                      onChange={(e) => {
                        const newPillars = [...(about.pillars || [])];
                        newPillars[pIdx] = { ...newPillars[pIdx], title: e.target.value };
                        updateSectionField('about', 'pillars', newPillars);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={pillar.subtitle || ''}
                      onChange={(e) => {
                        const newPillars = [...(about.pillars || [])];
                        newPillars[pIdx] = { ...newPillars[pIdx], subtitle: e.target.value };
                        updateSectionField('about', 'pillars', newPillars);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={pillar.desc || ''}
                    onChange={(e) => {
                      const newPillars = [...(about.pillars || [])];
                      newPillars[pIdx] = { ...newPillars[pIdx], desc: e.target.value };
                      updateSectionField('about', 'pillars', newPillars);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. CAPABILITIES & SERVICES ================= */}
      {activeSection === 'services' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Studio Capabilities & Disciplines</h3>
              <p className="text-purple-300/70 text-xs">Manage all core capabilities: Development, Graphics Design, Video, Social, and SEO/GEO.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newItems = [...(services.items || [])];
                  newItems.push({
                    id: `service-${Date.now()}`,
                    num: `0${newItems.length + 1}`,
                    title: 'New Studio Capability',
                    tag: 'Enterprise Architecture',
                    badge: 'Bespoke Discipline',
                    desc: 'High-throughput enterprise platform built with zero layout shifts and deterministic responses.',
                    tags: ['TypeScript', 'Edge Workers', 'SOC2 Isolation'],
                    image: '/assets/p3-img-2.webp'
                  });
                  updateSectionField('services', 'items', newItems);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[#c084fc] hover:text-white border border-purple-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Discipline</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetSection('services')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Badge</label>
              <input
                type="text"
                value={services.sectionBadge || ''}
                onChange={(e) => updateSectionField('services', 'sectionBadge', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Title</label>
              <input
                type="text"
                value={services.title || ''}
                onChange={(e) => updateSectionField('services', 'title', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Subtitle</label>
              <input
                type="text"
                value={services.subtitle || ''}
                onChange={(e) => updateSectionField('services', 'subtitle', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
          </div>

          {/* List of Services */}
          <div className="space-y-4 pt-4 border-t border-purple-500/15">
            {(services.items || []).map((srv, sIdx) => (
              <div key={srv.id || sIdx} className="p-5 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/15 text-[#c084fc] flex items-center justify-center font-bold">
                      {srv.num || `0${sIdx + 1}`}
                    </span>
                    <span className="text-white font-bold text-sm">{srv.title || 'Untitled Discipline'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm(`Delete discipline "${srv.title}"?`)) return;
                      const newItems = services.items.filter((_, idx) => idx !== sIdx);
                      updateSectionField('services', 'items', newItems);
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Discipline Name</label>
                    <input
                      type="text"
                      value={srv.title || ''}
                      onChange={(e) => {
                        const newItems = [...services.items];
                        newItems[sIdx] = { ...newItems[sIdx], title: e.target.value };
                        updateSectionField('services', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Tagline / Category</label>
                    <input
                      type="text"
                      value={srv.tag || ''}
                      onChange={(e) => {
                        const newItems = [...services.items];
                        newItems[sIdx] = { ...newItems[sIdx], tag: e.target.value };
                        updateSectionField('services', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={srv.badge || ''}
                      onChange={(e) => {
                        const newItems = [...services.items];
                        newItems[sIdx] = { ...newItems[sIdx], badge: e.target.value };
                        updateSectionField('services', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-[#c084fc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={srv.desc || ''}
                    onChange={(e) => {
                      const newItems = [...services.items];
                      newItems[sIdx] = { ...newItems[sIdx], desc: e.target.value };
                      updateSectionField('services', 'items', newItems);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Preview Image Path</label>
                    <input
                      type="text"
                      value={srv.image || ''}
                      onChange={(e) => {
                        const newItems = [...services.items];
                        newItems[sIdx] = { ...newItems[sIdx], image: e.target.value };
                        updateSectionField('services', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(srv.tags) ? srv.tags.join(', ') : (srv.tags || '')}
                      onChange={(e) => {
                        const newItems = [...services.items];
                        newItems[sIdx] = { ...newItems[sIdx], tags: e.target.value.split(',').map(s => s.trim()) };
                        updateSectionField('services', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 5. TEAM & ARCHITECTS ================= */}
      {activeSection === 'team' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Principal Architects & Bench Leads</h3>
              <p className="text-purple-300/70 text-xs">Manage partners, systems engineers, design directors, and recruitment fellowship details.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newMembers = [...(team.members || [])];
                  newMembers.push({
                    id: `team-${Date.now()}`,
                    name: 'New Principal Architect',
                    role: 'Systems Architect',
                    specialty: 'Distributed Infrastructure & Vector Meshes',
                    location: 'San Francisco, CA',
                    image: '/assets/t3-img-1.webp',
                    bio: 'Senior architect engineering deterministic software and luxury digital systems.'
                  });
                  updateSectionField('team', 'members', newMembers);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[#c084fc] hover:text-white border border-purple-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Architect</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetSection('team')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Badge</label>
              <input
                type="text"
                value={team.sectionBadge || ''}
                onChange={(e) => updateSectionField('team', 'sectionBadge', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Title</label>
              <input
                type="text"
                value={team.title || ''}
                onChange={(e) => updateSectionField('team', 'title', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Fellowship Recruitment Email</label>
              <input
                type="text"
                value={team.fellowshipEmail || ''}
                onChange={(e) => updateSectionField('team', 'fellowshipEmail', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
          </div>

          {/* Members List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-purple-500/15">
            {(team.members || []).map((member, mIdx) => (
              <div key={member.id || mIdx} className="p-4 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.image || '/assets/t3-img-1.webp'}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-purple-500/30"
                    />
                    <div>
                      <span className="text-white font-bold text-sm block">{member.name || 'Architect Name'}</span>
                      <span className="text-purple-400 text-xs">{member.role || 'Role'}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm(`Delete architect "${member.name}"?`)) return;
                      const newMembers = team.members.filter((_, idx) => idx !== mIdx);
                      updateSectionField('team', 'members', newMembers);
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Name</label>
                    <input
                      type="text"
                      value={member.name || ''}
                      onChange={(e) => {
                        const newMembers = [...team.members];
                        newMembers[mIdx] = { ...newMembers[mIdx], name: e.target.value };
                        updateSectionField('team', 'members', newMembers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Role Title</label>
                    <input
                      type="text"
                      value={member.role || ''}
                      onChange={(e) => {
                        const newMembers = [...team.members];
                        newMembers[mIdx] = { ...newMembers[mIdx], role: e.target.value };
                        updateSectionField('team', 'members', newMembers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Specialty</label>
                    <input
                      type="text"
                      value={member.specialty || ''}
                      onChange={(e) => {
                        const newMembers = [...team.members];
                        newMembers[mIdx] = { ...newMembers[mIdx], specialty: e.target.value };
                        updateSectionField('team', 'members', newMembers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Location Hub</label>
                    <input
                      type="text"
                      value={member.location || ''}
                      onChange={(e) => {
                        const newMembers = [...team.members];
                        newMembers[mIdx] = { ...newMembers[mIdx], location: e.target.value };
                        updateSectionField('team', 'members', newMembers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Bio</label>
                  <textarea
                    rows={2}
                    value={member.bio || ''}
                    onChange={(e) => {
                      const newMembers = [...team.members];
                      newMembers[mIdx] = { ...newMembers[mIdx], bio: e.target.value };
                      updateSectionField('team', 'members', newMembers);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Image URL / Path</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={member.image || ''}
                      onChange={(e) => {
                        const newMembers = [...team.members];
                        newMembers[mIdx] = { ...newMembers[mIdx], image: e.target.value };
                        updateSectionField('team', 'members', newMembers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                    <label style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          const r = new FileReader();
                          r.onload = () => {
                            const newMembers = [...team.members];
                            newMembers[mIdx] = { ...newMembers[mIdx], image: r.result };
                            updateSectionField('team', 'members', newMembers);
                          };
                          r.readAsDataURL(f);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 6. INVESTMENT TIERS & PRICING ================= */}
      {activeSection === 'pricing' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Investment Sprints & Architecture Tiers</h3>
              <p className="text-purple-300/70 text-xs">Configure the 3 flagship engagement plans, deliverable bullets, timelines, and prices.</p>
            </div>
            <button
              type="button"
              onClick={() => handleResetSection('pricing')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
            >
              Reset Pricing Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Badge</label>
              <input
                type="text"
                value={pricing.sectionBadge || ''}
                onChange={(e) => updateSectionField('pricing', 'sectionBadge', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Title</label>
              <input
                type="text"
                value={pricing.title || ''}
                onChange={(e) => updateSectionField('pricing', 'title', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-purple-300 uppercase mb-2">Section Subtitle</label>
              <input
                type="text"
                value={pricing.subtitle || ''}
                onChange={(e) => updateSectionField('pricing', 'subtitle', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white outline-none"
              />
            </div>
          </div>

          {/* 3 Tiers Detailed Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 border-t border-purple-500/15">
            {(pricing.tiers || []).map((tier, tIdx) => (
              <div key={tier.id || tIdx} className={`p-5 rounded-2xl bg-[#140a28] border space-y-4 ${
                tier.popular ? 'border-purple-400 shadow-[0_0_25px_rgba(139,92,246,0.25)]' : 'border-purple-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-base">{tier.name}</span>
                  <label className="flex items-center gap-1.5 text-[10px] text-purple-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!tier.popular}
                      onChange={(e) => {
                        const newTiers = [...pricing.tiers];
                        newTiers[tIdx] = { ...newTiers[tIdx], popular: e.target.checked };
                        updateSectionField('pricing', 'tiers', newTiers);
                      }}
                      className="rounded accent-purple-600"
                    />
                    <span>Highlight</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Price (e.g. $25,000+)</label>
                    <input
                      type="text"
                      value={tier.price || ''}
                      onChange={(e) => {
                        const newTiers = [...pricing.tiers];
                        newTiers[tIdx] = { ...newTiers[tIdx], price: e.target.value };
                        updateSectionField('pricing', 'tiers', newTiers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Period (e.g. per sprint)</label>
                    <input
                      type="text"
                      value={tier.period || ''}
                      onChange={(e) => {
                        const newTiers = [...pricing.tiers];
                        newTiers[tIdx] = { ...newTiers[tIdx], period: e.target.value };
                        updateSectionField('pricing', 'tiers', newTiers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Timeline (e.g. 3–4 Weeks)</label>
                    <input
                      type="text"
                      value={tier.timeline || ''}
                      onChange={(e) => {
                        const newTiers = [...pricing.tiers];
                        newTiers[tIdx] = { ...newTiers[tIdx], timeline: e.target.value };
                        updateSectionField('pricing', 'tiers', newTiers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-[#c084fc]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Badge</label>
                    <input
                      type="text"
                      value={tier.badge || ''}
                      onChange={(e) => {
                        const newTiers = [...pricing.tiers];
                        newTiers[tIdx] = { ...newTiers[tIdx], badge: e.target.value };
                        updateSectionField('pricing', 'tiers', newTiers);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={tier.description || ''}
                    onChange={(e) => {
                      const newTiers = [...pricing.tiers];
                      newTiers[tIdx] = { ...newTiers[tIdx], description: e.target.value };
                      updateSectionField('pricing', 'tiers', newTiers);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Deliverables (1 per line)</label>
                  <textarea
                    rows={4}
                    value={Array.isArray(tier.features) ? tier.features.join('\n') : (tier.features || '')}
                    onChange={(e) => {
                      const newTiers = [...pricing.tiers];
                      newTiers[tIdx] = { ...newTiers[tIdx], features: e.target.value.split('\n').filter(Boolean) };
                      updateSectionField('pricing', 'tiers', newTiers);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={tier.ctaText || ''}
                    onChange={(e) => {
                      const newTiers = [...pricing.tiers];
                      newTiers[tIdx] = { ...newTiers[tIdx], ctaText: e.target.value };
                      updateSectionField('pricing', 'tiers', newTiers);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 7. SELECTED WORKS & PROJECTS ================= */}
      {activeSection === 'projects' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Flagship Deployments & Case Studies</h3>
              <p className="text-purple-300/70 text-xs">Manage client portfolio items, categories, tags, and architectural roles.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newItems = [...(projects.items || [])];
                  newItems.push({
                    id: `proj-${Date.now()}`,
                    title: 'New Enterprise Platform',
                    client: 'Enterprise Client',
                    category: 'Development',
                    tag: '{ Cloud Architecture }',
                    year: '2026',
                    role: 'Autonomous Systems & Edge Platform',
                    desc: 'High-throughput enterprise platform built with zero layout shifts and deterministic responses.',
                    image: '/assets/p3-img-2.webp'
                  });
                  updateSectionField('projects', 'items', newItems);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[#c084fc] hover:text-white border border-purple-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetSection('projects')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {(projects.items || []).map((proj, pIdx) => (
              <div key={proj.id || pIdx} className="p-5 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">{proj.title || 'Untitled Project'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm(`Delete project "${proj.title}"?`)) return;
                      const newItems = projects.items.filter((_, idx) => idx !== pIdx);
                      updateSectionField('projects', 'items', newItems);
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title || ''}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], title: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Client Name</label>
                    <input
                      type="text"
                      value={proj.client || ''}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], client: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Category</label>
                    <select
                      value={proj.category || 'Development'}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], category: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    >
                      <option value="Development">Development</option>
                      <option value="AI Systems">AI Systems</option>
                      <option value="Visual Identity">Visual Identity</option>
                      <option value="Motion & 3D">Motion & 3D</option>
                      <option value="SEO / GEO">SEO / GEO</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Year</label>
                    <input
                      type="text"
                      value={proj.year || '2026'}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], year: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Role & Scope</label>
                    <input
                      type="text"
                      value={proj.role || ''}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], role: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-[#c084fc]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={proj.image || ''}
                      onChange={(e) => {
                        const newItems = [...projects.items];
                        newItems[pIdx] = { ...newItems[pIdx], image: e.target.value };
                        updateSectionField('projects', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={proj.desc || ''}
                    onChange={(e) => {
                      const newItems = [...projects.items];
                      newItems[pIdx] = { ...newItems[pIdx], desc: e.target.value };
                      updateSectionField('projects', 'items', newItems);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 8. TECHNICAL FAQS ================= */}
      {activeSection === 'faqs' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Technical FAQs & Questions</h3>
              <p className="text-purple-300/70 text-xs">Manage answers to enterprise client questions regarding methodology, pricing, GEO, and vetting.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newItems = [...(faqs.items || [])];
                  newItems.push({
                    id: `faq-${Date.now()}`,
                    q: 'New Question regarding engineering craft?',
                    a: 'Detailed technical explanation outlining deterministic engineering standards and zero-downtime protocols.'
                  });
                  updateSectionField('faqs', 'items', newItems);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[#c084fc] hover:text-white border border-purple-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetSection('faqs')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(faqs.items || []).map((faq, fIdx) => (
              <div key={faq.id || fIdx} className="p-4 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-xs">Question #{fIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm('Delete this FAQ question?')) return;
                      const newItems = faqs.items.filter((_, idx) => idx !== fIdx);
                      updateSectionField('faqs', 'items', newItems);
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.q || ''}
                    onChange={(e) => {
                      const newItems = [...faqs.items];
                      newItems[fIdx] = { ...newItems[fIdx], q: e.target.value };
                      updateSectionField('faqs', 'items', newItems);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.a || ''}
                    onChange={(e) => {
                      const newItems = [...faqs.items];
                      newItems[fIdx] = { ...newItems[fIdx], a: e.target.value };
                      updateSectionField('faqs', 'items', newItems);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-white resize-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 9. CLIENT TESTIMONIALS ================= */}
      {activeSection === 'testimonials' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Institutional Validation & Reviews</h3>
              <p className="text-purple-300/70 text-xs">Manage client executive statements, verified metric badges, and company affiliations.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newItems = [...(testimonials.items || [])];
                  newItems.push({
                    id: `test-${Date.now()}`,
                    name: 'Julian Mercer',
                    role: 'Chief Technology Officer',
                    company: 'Enterprise AI Labs (San Francisco)',
                    quote: 'CODEXX PLUS delivered unmatched architectural execution. Our platform response times plummeted while conversion surged.',
                    avatar: '/assets/t3-img-1.webp',
                    metric: '+65% Conversion'
                  });
                  updateSectionField('testimonials', 'items', newItems);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[#c084fc] hover:text-white border border-purple-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Review</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetSection('testimonials')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(testimonials.items || []).map((t, tIdx) => (
              <div key={t.id || tIdx} className="p-4 rounded-2xl bg-[#140a28] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">{t.name || 'Client Name'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!window.confirm(`Delete review from "${t.name}"?`)) return;
                      const newItems = testimonials.items.filter((_, idx) => idx !== tIdx);
                      updateSectionField('testimonials', 'items', newItems);
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Executive Name</label>
                    <input
                      type="text"
                      value={t.name || ''}
                      onChange={(e) => {
                        const newItems = [...testimonials.items];
                        newItems[tIdx] = { ...newItems[tIdx], name: e.target.value };
                        updateSectionField('testimonials', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Title & Role</label>
                    <input
                      type="text"
                      value={t.role || ''}
                      onChange={(e) => {
                        const newItems = [...testimonials.items];
                        newItems[tIdx] = { ...newItems[tIdx], role: e.target.value };
                        updateSectionField('testimonials', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-purple-300 uppercase block mb-1">Metric Badge (e.g. -80% Latency)</label>
                    <input
                      type="text"
                      value={t.metric || ''}
                      onChange={(e) => {
                        const newItems = [...testimonials.items];
                        newItems[tIdx] = { ...newItems[tIdx], metric: e.target.value };
                        updateSectionField('testimonials', 'items', newItems);
                      }}
                      className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 uppercase block mb-1">Quote</label>
                  <textarea
                    rows={3}
                    value={t.quote || ''}
                    onChange={(e) => {
                      const newItems = [...testimonials.items];
                      newItems[tIdx] = { ...newItems[tIdx], quote: e.target.value };
                      updateSectionField('testimonials', 'items', newItems);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 10. COMPLIANCE & POLICIES ================= */}
      {activeSection === 'policies' && (
        <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-8 text-xs font-mono shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Payment & Privacy Policy Frameworks</h3>
              <p className="text-purple-300/70 text-xs">Edit the clauses, headings, and legal terms published on /payment-policy and /privacy-policy.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleResetSection('paymentPolicy');
                handleResetSection('privacyPolicy');
              }}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] border border-purple-500/20 cursor-pointer"
            >
              Reset Policies
            </button>
          </div>

          {/* Payment Policy Block */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#c084fc]" />
              <span>Payment Policy Page Content</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 uppercase mb-1">Page Title</label>
                <input
                  type="text"
                  value={paymentPolicy.title || ''}
                  onChange={(e) => updateSectionField('paymentPolicy', 'title', e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-purple-300 uppercase mb-1">Badge</label>
                <input
                  type="text"
                  value={paymentPolicy.badge || ''}
                  onChange={(e) => updateSectionField('paymentPolicy', 'badge', e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-300 uppercase mb-1">Subtitle</label>
              <input
                type="text"
                value={paymentPolicy.subtitle || ''}
                onChange={(e) => updateSectionField('paymentPolicy', 'subtitle', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-purple-300 font-bold block">Payment Policy Clauses</span>
              {(paymentPolicy.sections || []).map((sec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#140a28] border border-purple-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c084fc] font-bold">Section {sec.num || idx + 1}:</span>
                    <input
                      type="text"
                      value={sec.title || ''}
                      onChange={(e) => {
                        const newSecs = [...paymentPolicy.sections];
                        newSecs[idx] = { ...newSecs[idx], title: e.target.value };
                        updateSectionField('paymentPolicy', 'sections', newSecs);
                      }}
                      className="flex-1 bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1 text-white font-bold"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={sec.content || ''}
                    onChange={(e) => {
                      const newSecs = [...paymentPolicy.sections];
                      newSecs[idx] = { ...newSecs[idx], content: e.target.value };
                      updateSectionField('paymentPolicy', 'sections', newSecs);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Policy Block */}
          <div className="space-y-4 pt-6 border-t border-purple-500/20">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#c084fc]" />
              <span>Terms & Privacy Policy Page Content</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 uppercase mb-1">Page Title</label>
                <input
                  type="text"
                  value={privacyPolicy.title || ''}
                  onChange={(e) => updateSectionField('privacyPolicy', 'title', e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-purple-300 uppercase mb-1">Badge</label>
                <input
                  type="text"
                  value={privacyPolicy.badge || ''}
                  onChange={(e) => updateSectionField('privacyPolicy', 'badge', e.target.value)}
                  className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-300 uppercase mb-1">Subtitle</label>
              <input
                type="text"
                value={privacyPolicy.subtitle || ''}
                onChange={(e) => updateSectionField('privacyPolicy', 'subtitle', e.target.value)}
                className="w-full bg-[#150a2b] border border-purple-500/25 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-purple-300 font-bold block">Privacy Policy Clauses</span>
              {(privacyPolicy.sections || []).map((sec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#140a28] border border-purple-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c084fc] font-bold">Section {sec.num || idx + 1}:</span>
                    <input
                      type="text"
                      value={sec.title || ''}
                      onChange={(e) => {
                        const newSecs = [...privacyPolicy.sections];
                        newSecs[idx] = { ...newSecs[idx], title: e.target.value };
                        updateSectionField('privacyPolicy', 'sections', newSecs);
                      }}
                      className="flex-1 bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1 text-white font-bold"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={sec.content || ''}
                    onChange={(e) => {
                      const newSecs = [...privacyPolicy.sections];
                      newSecs[idx] = { ...newSecs[idx], content: e.target.value };
                      updateSectionField('privacyPolicy', 'sections', newSecs);
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-2.5 py-1.5 text-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 1.5 SITE SETTINGS & SEO */}
      {activeSection === 'settings' && (
        <div className="p-6 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white font-sans">Site Settings &amp; SEO</h2>
            <p className="text-xs text-purple-300/60 font-mono">Configure global site metadata, theme accent, maintenance mode, and footer copyright.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-purple-300">Site Title (Browser Tab)</label>
              <input
                type="text"
                placeholder="CodeX Plus — Digital Engineering Studio"
                value={cmsData?.settings?.siteTitle || ''}
                onChange={e => updateSectionField('settings', 'siteTitle', e.target.value)}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-purple-300">Favicon URL / Upload Image</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="/favicon.ico"
                  value={cmsData?.settings?.favicon || ''}
                  onChange={e => updateSectionField('settings', 'favicon', e.target.value)}
                  className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                />
                <label style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  Upload
                  <input
                    type="file"
                    accept="image/*,.ico"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => updateSectionField('settings', 'favicon', reader.result);
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-purple-300">Meta Description (SEO)</label>
              <textarea
                rows={2}
                placeholder="High-performance web applications, AI systems, and digital products."
                value={cmsData?.settings?.metaDescription || ''}
                onChange={e => updateSectionField('settings', 'metaDescription', e.target.value)}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-purple-300">Primary Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={cmsData?.settings?.accentColor || '#8b5cf6'}
                  onChange={e => updateSectionField('settings', 'accentColor', e.target.value)}
                  className="h-9 w-12 rounded bg-transparent border border-purple-500/25 cursor-pointer"
                />
                <input
                  type="text"
                  value={cmsData?.settings?.accentColor || '#8b5cf6'}
                  onChange={e => updateSectionField('settings', 'accentColor', e.target.value)}
                  className="flex-1 bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-purple-300">Google Analytics / Tracking ID</label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={cmsData?.settings?.analyticsId || ''}
                onChange={e => updateSectionField('settings', 'analyticsId', e.target.value)}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs font-mono text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-purple-300">Footer Copyright Text</label>
              <input
                type="text"
                placeholder="© 2026 CodeX Plus. All rights reserved."
                value={cmsData?.settings?.copyright || ''}
                onChange={e => updateSectionField('settings', 'copyright', e.target.value)}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#180c33] border border-purple-500/20">
              <div>
                <div className="text-xs font-mono text-white font-bold">Maintenance Mode</div>
                <div className="text-[11px] text-purple-300/60">Show maintenance banner to visitors</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(cmsData?.settings?.maintenanceMode)}
                onChange={e => updateSectionField('settings', 'maintenanceMode', e.target.checked)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 11. JOURNAL & POSTS */}
      {activeSection === 'journal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-sans">Journal &amp; Blog Posts</h2>
              <p className="text-xs text-purple-300/60 font-mono">Add, edit, or remove articles shown in the Journal section.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = Array.isArray(cmsData?.posts) ? cmsData.posts : [];
                setCmsData(prev => ({
                  ...prev,
                  posts: [...current, { title: 'New Article', category: 'Engineering', date: '2026', readTime: '4 min read', excerpt: '', image: '' }]
                }));
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Post
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Array.isArray(cmsData?.posts) ? cmsData.posts : []).map((post, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300">Post #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(cmsData?.posts || [])];
                      updated.splice(idx, 1);
                      setCmsData(prev => ({ ...prev, posts: updated }));
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  value={post.title || ''}
                  onChange={e => {
                    const updated = [...(cmsData?.posts || [])];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setCmsData(prev => ({ ...prev, posts: updated }));
                  }}
                  className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Category"
                    value={post.category || ''}
                    onChange={e => {
                      const updated = [...(cmsData?.posts || [])];
                      updated[idx] = { ...updated[idx], category: e.target.value };
                      setCmsData(prev => ({ ...prev, posts: updated }));
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Date / Read Time"
                    value={post.date || ''}
                    onChange={e => {
                      const updated = [...(cmsData?.posts || [])];
                      updated[idx] = { ...updated[idx], date: e.target.value };
                      setCmsData(prev => ({ ...prev, posts: updated }));
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Excerpt"
                  value={post.excerpt || ''}
                  onChange={e => {
                    const updated = [...(cmsData?.posts || [])];
                    updated[idx] = { ...updated[idx], excerpt: e.target.value };
                    setCmsData(prev => ({ ...prev, posts: updated }));
                  }}
                  className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white resize-none"
                />
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Post Image URL or Upload"
                    value={post.image || ''}
                    onChange={e => {
                      const updated = [...(cmsData?.posts || [])];
                      updated[idx] = { ...updated[idx], image: e.target.value };
                      setCmsData(prev => ({ ...prev, posts: updated }));
                    }}
                    className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <label style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const r = new FileReader();
                        r.onload = () => {
                          const updated = [...(cmsData?.posts || [])];
                          updated[idx] = { ...updated[idx], image: r.result };
                          setCmsData(prev => ({ ...prev, posts: updated }));
                        };
                        r.readAsDataURL(f);
                      }}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. NAVIGATION, SEARCHES & MARQUEE */}
      {activeSection === 'navigation' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-sans">Header &amp; Footer Navigation Links</h3>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(cmsData?.nav) ? cmsData.nav : [];
                  setCmsData(prev => ({ ...prev, nav: [...current, { label: 'New Link', href: '#section' }] }));
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Link
              </button>
            </div>
            <div className="space-y-2">
              {(Array.isArray(cmsData?.nav) ? cmsData.nav : []).map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Label"
                    value={link.label || ''}
                    onChange={e => {
                      const updated = [...(cmsData?.nav || [])];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      setCmsData(prev => ({ ...prev, nav: updated }));
                    }}
                    className="flex-1 bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Href (#about, /services)"
                    value={link.href || ''}
                    onChange={e => {
                      const updated = [...(cmsData?.nav || [])];
                      updated[idx] = { ...updated[idx], href: e.target.value };
                      setCmsData(prev => ({ ...prev, nav: updated }));
                    }}
                    className="flex-1 bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(cmsData?.nav || [])];
                      updated.splice(idx, 1);
                      setCmsData(prev => ({ ...prev, nav: updated }));
                    }}
                    className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-3">
              <h3 className="text-sm font-bold text-white font-sans">Hero Quick Searches (one per line)</h3>
              <textarea
                rows={5}
                value={(Array.isArray(cmsData?.searches) ? cmsData.searches : []).join('\n')}
                onChange={e => setCmsData(prev => ({ ...prev, searches: e.target.value.split('\n').filter(Boolean) }))}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs font-mono text-white"
              />
            </div>
            <div className="p-5 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-3">
              <h3 className="text-sm font-bold text-white font-sans">Statement Marquee Lines (one per line)</h3>
              <textarea
                rows={5}
                value={(Array.isArray(cmsData?.marqueeLines) ? cmsData.marqueeLines : []).join('\n')}
                onChange={e => setCmsData(prev => ({ ...prev, marqueeLines: e.target.value.split('\n').filter(Boolean) }))}
                className="w-full bg-[#180c33] border border-purple-500/25 rounded-lg px-3 py-2 text-xs font-mono text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* 13. RAW JSON EDITOR */}
      {activeSection === 'raw' && (
        <div className="p-5 rounded-2xl bg-[#100722] border border-purple-500/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white font-sans">Full CMS Raw JSON Editor</h2>
              <p className="text-xs text-purple-300/60 font-mono">Edit any field in the entire CMS JSON directly, then click Apply JSON &amp; Publish.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRawJsonText(JSON.stringify(cmsData, null, 2));
                  setRawJsonError(null);
                }}
                className="px-3 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 text-xs font-mono cursor-pointer"
              >
                Load Current JSON
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(rawJsonText || JSON.stringify(cmsData));
                    setCmsData(parsed);
                    setRawJsonError(null);
                  } catch (err) {
                    setRawJsonError(err.message);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Apply JSON
              </button>
            </div>
          </div>
          {rawJsonError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-200 text-xs font-mono">
              JSON Error: {rawJsonError}
            </div>
          )}
          <textarea
            rows={18}
            value={rawJsonText || JSON.stringify(cmsData, null, 2)}
            onChange={e => setRawJsonText(e.target.value)}
            className="w-full bg-[#090314] border border-purple-500/30 rounded-xl p-4 text-xs font-mono text-purple-100 leading-relaxed"
            spellCheck={false}
          />
        </div>
      )}

      {/* Floating Save Reminder */}
      <div className="sticky bottom-6 z-30 p-4 rounded-2xl bg-[#100720]/95 border border-purple-500/30 shadow-[0_10px_40px_rgba(44,21,140,0.4)] backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#c084fc] animate-pulse" />
          <span className="text-xs font-mono text-purple-200">
            Unsaved changes in this tab are held in state until you publish.
          </span>
        </div>
        <button
          type="button"
          onClick={onPublish}
          disabled={publishing}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.5)] cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{publishing ? 'Publishing...' : 'Save & Publish All Changes'}</span>
        </button>
      </div>

    </div>
  );
}
