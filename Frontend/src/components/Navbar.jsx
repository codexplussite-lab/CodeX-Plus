import React, { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenSearch, onOpenDrawer, onOpenAdmin, onNavigate, onOpenBookingModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0a0612]/90 backdrop-blur-md py-3.5 border-b border-purple-500/15 shadow-2xl' 
        : 'bg-transparent py-5 sm:py-6'
    }`}>
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between">
          
          {/* Logo with CodexPlus Glowing Badge */}
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all">
              <div className="w-full h-full bg-[#0a0612] rounded-[10px] flex items-center justify-center p-1.5">
                <img src="/assets/fevicon-1.webp" alt="CODEXX PLUS" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white flex items-center gap-1 leading-none font-mono">
                CODEXX<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">+</span>
              </span>
              <span className="text-[9px] font-mono text-purple-400/80 tracking-widest uppercase">AI Innovation & Craft</span>
            </div>
          </a>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="/" 
              onClick={(e) => handleNavClick(e, '/')} 
              className="text-sm font-medium text-gray-300 hover:text-[#c084fc] transition-colors relative py-1 group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a855f7] transition-all duration-300 group-hover:w-full" />
            </a>

            <a 
              href="/about" 
              onClick={(e) => handleNavClick(e, '/about')} 
              className="text-sm font-medium text-gray-300 hover:text-[#c084fc] transition-colors relative py-1 group"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a855f7] transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Services with Disciplines Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={(e) => handleNavClick(e, '/services')}
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#c084fc] py-1 transition-colors cursor-pointer group"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-64 bg-[#120822]/95 border border-purple-500/25 rounded-2xl py-3 shadow-[0_15px_40px_rgba(44,21,140,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                  <div className="px-4 py-1 text-[10px] font-mono text-purple-400 uppercase tracking-widest border-b border-purple-500/15 pb-2 mb-1">
                    Studio Disciplines
                  </div>
                  <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    Full-Stack & AI Architecture
                  </a>
                  <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    Graphics Design & Tokens
                  </a>
                  <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    Video Editing & 3D WebGL
                  </a>
                  <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    SEO / GEO AI Discovery
                  </a>
                  <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    Social Media Executive Growth
                  </a>
                  <div className="mt-2 pt-2 border-t border-purple-500/15 px-3">
                    <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="block text-center py-1.5 px-3 rounded-xl bg-purple-500/15 text-xs font-mono text-[#c084fc] hover:bg-purple-500/25 transition-colors">
                      View All Capabilities &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a 
              href="/team" 
              onClick={(e) => handleNavClick(e, '/team')} 
              className="text-sm font-medium text-gray-300 hover:text-[#c084fc] transition-colors relative py-1 group"
            >
              <span>Team</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a855f7] transition-all duration-300 group-hover:w-full" />
            </a>

            <a 
              href="/pricing" 
              onClick={(e) => handleNavClick(e, '/pricing')} 
              className="text-sm font-medium text-gray-300 hover:text-[#c084fc] transition-colors relative py-1 group"
            >
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a855f7] transition-all duration-300 group-hover:w-full" />
            </a>

            <a 
              href="/contact" 
              onClick={(e) => handleNavClick(e, '/contact')} 
              className="text-sm font-medium text-gray-300 hover:text-[#c084fc] transition-colors relative py-1 group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a855f7] transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Policies Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('policies')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#c084fc] py-1 transition-colors cursor-pointer group"
              >
                <span>Policies</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              {activeDropdown === 'policies' && (
                <div className="absolute top-full right-0 w-56 bg-[#120822]/95 border border-purple-500/25 rounded-2xl py-2 shadow-[0_15px_40px_rgba(44,21,140,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                  <div className="px-4 py-1 text-[10px] font-mono text-purple-400 uppercase tracking-widest border-b border-purple-500/15 pb-2 mb-1">
                    Compliance & Terms
                  </div>
                  <a href="/payment-policy" onClick={(e) => handleNavClick(e, '/payment-policy')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    Payment Policy
                  </a>
                  <a href="/privacy-policy" onClick={(e) => handleNavClick(e, '/privacy-policy')} className="block px-4 py-2 text-xs text-[#c4b4ffcc] hover:text-white hover:bg-purple-500/15 transition-colors">
                    T&C and Privacy Policies
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center text-purple-200 hover:text-white border border-purple-500/20 transition-colors cursor-pointer"
              aria-label="Open search modal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Schedule Discovery CTA */}
            <button
              onClick={onOpenBookingModal || (() => handleNavClick({ preventDefault: () => {} }, '#contact'))}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Schedule Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Hamburger / Offcanvas Toggle */}
            <button
              onClick={onOpenDrawer}
              className="w-10 h-10 rounded-full bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center text-purple-200 hover:text-white border border-purple-500/20 transition-colors cursor-pointer"
              aria-label="Open mobile menu drawer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
