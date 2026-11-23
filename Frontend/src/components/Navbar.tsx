import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useCms } from '../context/useCms';

export type AppPage = 'home' | 'about' | 'services' | 'team' | 'contact' | 'admin' | 'login';

interface NavbarProps {
  onOpenModal: () => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage, targetHash?: string) => void;
}

interface NavItem {
  label: string;
  page: AppPage;
  hash?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', page: 'home', hash: '#home' },
  { label: 'Services', page: 'services' },
  { label: 'Work', page: 'home', hash: '#services' },
  { label: 'About Us', page: 'about' },
  { label: 'Our Team', page: 'team' },
  { label: 'Journal', page: 'home', hash: '#clients' },
  { label: 'Contact', page: 'contact' },
];

export function CodexxLogo({ onClick }: { onClick?: () => void }) {
  const { cms } = useCms();
  const siteName = cms.brand?.siteName || 'CODEXX';
  const brandAccent = cms.brand?.brandAccent || 'PLUS';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-3 focus:outline-none"
      aria-label={`${siteName} ${brandAccent} Home`}
    >
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-600/30 via-[#1a0d30] to-fuchsia-600/20 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-transform duration-300 group-hover:scale-105">
        <img
          src="/favicon.svg"
          alt="CodeXplus Logo"
          width="20"
          height="20"
          className="h-5 w-5 object-contain"
        />
      </div>
      <span className="font-display text-sm font-bold tracking-[0.18em] text-white sm:text-base">
        {siteName} <span className="text-violet-300">{brandAccent}</span>
      </span>
    </button>
  );
}

export function Navbar({ onOpenModal, currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = (item: NavItem) => {
    setMobileOpen(false);
    onNavigate(item.page, item.hash);
  };

  if (currentPage === 'admin') {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0612]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
        {/* Brand Logo */}
        <CodexxLogo onClick={() => onNavigate('home', '#home')} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#120820]/60 px-4 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleLinkClick(item)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
              currentPage === 'login'
                ? 'border-violet-400 bg-violet-600/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                : 'border-white/15 bg-white/5 text-gray-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white'
            }`}
          >
            <LogIn className="h-3.5 w-3.5 text-violet-400" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-violet-400 hover:text-violet-300"
          >
            Start a Project
          </button>
          <button
            type="button"
            onClick={onOpenModal}
            className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-105 hover:border-violet-400/80 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            <span className="relative z-10">Schedule Call</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500/0 via-violet-300/20 to-violet-500/0 transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors md:hidden hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-b border-white/10 bg-[#0a0612]/95 px-6 pt-4 pb-8 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleLinkClick(item)}
                className={`cursor-pointer rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'border border-violet-400/40 bg-violet-500/15 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigate('login');
                }}
                className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 py-3 text-center text-xs font-semibold tracking-wider text-white uppercase hover:bg-white/10"
              >
                <LogIn className="h-4 w-4 text-violet-400" />
                <span>Sign In / Portal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigate('contact');
                }}
                className="w-full cursor-pointer rounded-2xl border border-violet-400/40 bg-violet-500/20 py-3 text-center text-xs font-semibold tracking-wider text-white uppercase hover:bg-violet-500/30"
              >
                Start a Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal();
                }}
                className="w-full cursor-pointer rounded-2xl bg-white py-3.5 text-center text-xs font-semibold tracking-wider text-[#0a0612] uppercase shadow-lg hover:bg-violet-100"
              >
                Schedule Call
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
