import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import type { AppPage } from './Navbar';

interface FloatingDockProps {
  onOpenModal: () => void;
  onNavigate: (page: AppPage, targetHash?: string) => void;
}

export function FloatingDock({ onOpenModal, onNavigate }: FloatingDockProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        // Keep visible on scroll
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const handleLink = (page: AppPage, hash?: string) => {
    setDrawerOpen(false);
    onNavigate(page, hash);
  };

  return (
    <>
      {/* Floating Bottom Dock Pill */}
      <nav
        aria-label="Quick Action Dock"
        className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#120820]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(139,92,246,0.25)] backdrop-blur-2xl">
          {/* Brand Icon Monogram (Left) */}
          <button
            type="button"
            onClick={() => onNavigate('home', '#home')}
            aria-label="Go to Top / Home"
            className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-600 via-[#1a0d30] to-fuchsia-600 shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span className="font-display text-sm font-black tracking-tighter text-white">
              C<span className="text-violet-300">+</span>
            </span>
          </button>

          {/* Primary Action Button (Center) */}
          <button
            type="button"
            onClick={onOpenModal}
            className="group relative inline-flex min-h-[44px] cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-xs font-bold tracking-wider text-[#0a0612] uppercase shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#0a0612] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500/0 via-violet-400/20 to-violet-500/0 transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          {/* Menu Trigger Button (Right) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle Full Navigation Drawer"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Offcanvas Navigation Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen Navigation Drawer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07040d]/95 p-6 backdrop-blur-3xl animate-in fade-in duration-300"
        >
          {/* Close button in top-right */}
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation overlay"
            className="absolute top-8 right-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mx-auto flex w-full max-w-4xl flex-col justify-between py-12 md:flex-row md:items-center">
            {/* Nav Links Column */}
            <nav className="flex flex-col space-y-4 text-left">
              <span className="text-xs font-semibold tracking-[0.25em] text-violet-400 uppercase">
                Directory / Navigation
              </span>
              {[
                { label: '01 / Home', page: 'home' as AppPage, hash: '#home' },
                { label: '02 / About Studio', page: 'about' as AppPage },
                { label: '03 / Capabilities', page: 'services' as AppPage },
                { label: '04 / Flagship Projects', page: 'home' as AppPage, hash: '#projects' },
                { label: '05 / Architects & Leads', page: 'team' as AppPage },
                { label: '06 / Client Journal', page: 'home' as AppPage, hash: '#testimonials' },
                { label: '07 / Direct Contact', page: 'contact' as AppPage },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLink(item.page, item.hash)}
                  className="group flex cursor-pointer items-center gap-4 text-left font-display text-2xl font-bold tracking-tight text-gray-300 transition-all hover:text-white sm:text-4xl"
                >
                  <span className="text-violet-500 transition-transform group-hover:translate-x-2">
                    &rarr;
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Direct Studio Contact & Meta Column */}
            <div className="mt-12 flex flex-col space-y-8 border-t border-white/10 pt-8 md:mt-0 md:border-t-0 md:border-l md:pl-12 md:pt-0">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  Global Hubs
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-white">
                  San Francisco &bull; Zurich &bull; London
                </p>
                <a
                  href="mailto:Info@codexplus.site"
                  className="mt-2 block font-mono text-sm text-violet-300 underline hover:text-white"
                >
                  Info@codexplus.site
                </a>
                <p className="mt-1 text-xs text-gray-400">
                  Response SLA: Under 24 Hours
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Direct Inquiries
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenModal();
                    }}
                    className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0a0612] hover:bg-violet-100"
                  >
                    Schedule 15-Min Discovery
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLink('contact')}
                    className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Submit RFP Brief
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
