import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useCms } from '../context/useCms';

export type AppPage = 'home' | 'about' | 'services' | 'team' | 'contact' | 'admin';

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
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Our Team', page: 'team' },
  { label: 'Contact', page: 'contact' },
];

export function CodexxLogo({ onClick, brandName = 'CODEXX PLUS' }: { onClick?: () => void; brandName?: string }) {
  const words = brandName.trim().split(' ');
  const firstWord = words[0] || 'CODEXX';
  const restWords = words.slice(1).join(' ') || 'PLUS';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-3 focus:outline-none"
      aria-label={`${brandName} Home`}
    >
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-600/30 via-[#1a0d30] to-fuchsia-600/20 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-transform duration-300 group-hover:scale-105">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z"
            stroke="url(#codexx-grad)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12H15.5M12 8.5V15.5"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="codexx-grad"
              x1="4"
              y1="2"
              x2="20"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E9D5FF" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-display text-sm font-bold tracking-[0.18em] text-white sm:text-base">
        {firstWord} <span className="text-violet-300">{restWords}</span>
      </span>
    </button>
  );
}

export function Navbar({ onOpenModal, currentPage, onNavigate }: NavbarProps) {
  const { cms } = useCms();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const brandName = cms.branding?.name || 'CODEXX PLUS';
  const availabilityBadge = cms.branding?.availabilityBadge || 'Accepting Q1/Q2 Engagements';
  const ctaButtonText = cms.branding?.ctaButtonText || 'Schedule Discovery';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (item: NavItem) => {
    setMobileOpen(false);
    onNavigate(item.page, item.hash);
  };

  if (currentPage === 'admin') {
    return null;
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0612]/80 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
        <CodexxLogo brandName={brandName} onClick={() => onNavigate('home', '#home')} />

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur-md lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.page === currentPage;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleLinkClick(item)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border border-violet-400/40 bg-violet-600/25 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]'
                    : 'text-gray-300 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{availabilityBadge}</span>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
          >
            {ctaButtonText}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
          aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b border-white/10 bg-[#0a0612]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = item.page === currentPage;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item)}
                  className={`cursor-pointer rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                    isActive
                      ? 'border border-violet-400/40 bg-violet-600/25 text-white'
                      : 'text-gray-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-2 text-xs text-gray-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>{availabilityBadge}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal();
                }}
                className="w-full cursor-pointer rounded-full bg-white py-3 text-center text-sm font-semibold text-[#0a0612] shadow-[0_0_24px_rgba(168,85,247,0.35)]"
              >
                {ctaButtonText}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
