import React from 'react';
import { X, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, InstagramIcon } from './Icons';

export default function OffcanvasDrawer({ isOpen, onClose, onOpenAdmin, onNavigate, onOpenBookingModal }) {
  if (!isOpen) return null;

  const instagramImages = [
    '/assets/f3-img-1.webp',
    '/assets/f3-img-2.webp',
    '/assets/f3-img-3.webp',
    '/assets/f3-img-4.webp',
    '/assets/f3-img-5.webp',
    '/assets/f3-img-6.webp',
  ];

  const handleNav = (path) => {
    onClose();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e071a] border-l border-purple-500/20 text-white p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-purple-500/20">
              <button 
                onClick={() => handleNav('/')}
                className="flex items-center gap-2 cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#0a0612] rounded-[10px] flex items-center justify-center p-1">
                    <img src="/assets/fevicon-1.webp" alt="CODEXX PLUS" className="w-full h-full object-contain" />
                  </div>
                </div>
                <span className="text-base font-black tracking-wider text-white font-mono">
                  CODEXX<span className="text-purple-400">+</span>
                </span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-purple-400 hover:text-white rounded-full hover:bg-purple-500/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* About brief from codexplus.site */}
            <div className="py-6 border-b border-purple-500/20">
              <h4 className="text-lg font-bold text-white mb-2">Next-Gen AI & Digital Studio</h4>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Specialized engineering architects, AI researchers, and luxury product designers building deterministic software systems for global enterprise pioneers.
              </p>
              
              {/* Schedule Call Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal?.();
                }}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-[0_0_15px_rgba(139,92,246,0.4)] cursor-pointer"
              >
                Schedule 15-Min Discovery Call
              </button>
            </div>

            {/* Quick Navigation */}
            <div className="py-6 border-b border-purple-500/20">
              <h5 className="text-xs uppercase tracking-wider text-[#c084fc] font-semibold mb-3">Pages & Navigation</h5>
              <nav className="flex flex-col space-y-1.5">
                {[
                  { name: 'Home', route: '/' },
                  { name: 'About', route: '/about' },
                  { name: 'Services', route: '/services' },
                  { name: 'Team', route: '/team' },
                  { name: 'Pricing', route: '/pricing' },
                  { name: 'Contact', route: '/contact' },
                  { name: 'Selected Deployments', route: '/projects' },
                  { name: 'Payment Policy', route: '/payment-policy' },
                  { name: 'T&C and Privacy Policy', route: '/privacy-policy' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNav(item.route)}
                    className="text-left text-sm text-purple-200/80 hover:text-[#c084fc] transition-colors py-1.5 flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-purple-400/50 group-hover:text-[#c084fc] font-mono">0{idx + 1}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Instagram / Studio Media Feed */}
            <div className="py-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h6 className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">
                  Studio Media & Labs
                </h6>
                <InstagramIcon className="w-4 h-4 text-[#a855f7]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {instagramImages.map((src, i) => (
                  <div key={i} className="group relative aspect-square rounded-lg overflow-hidden bg-black/40 border border-purple-500/15">
                    <img 
                      src={src} 
                      alt={`Lab visual ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Hubs */}
            <div className="py-6 border-b border-purple-500/20 space-y-3">
              <h6 className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">Studio Hubs</h6>
              <div className="flex items-center gap-3 text-sm text-purple-200/80">
                <Mail className="w-4 h-4 text-[#a855f7]" />
                <a href="mailto:contact@codexplus.site" className="hover:text-white transition-colors">contact@codexplus.site</a>
              </div>
              <div className="flex items-start gap-3 text-xs text-purple-300/80">
                <MapPin className="w-4 h-4 text-[#a855f7] mt-0.5 shrink-0" />
                <span>San Francisco: 555 Mission St, CA 94105</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-purple-300/80">
                <MapPin className="w-4 h-4 text-[#a855f7] mt-0.5 shrink-0" />
                <span>Zürich Hub: Gotthardstrasse 26, 8002 Zürich</span>
              </div>
            </div>
          </div>

          {/* Socials & Copyright */}
          <div className="pt-6">
            <h6 className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider mb-3">Connect:</h6>
            <div className="flex items-center gap-3">
              {[
                { icon: TwitterIcon, href: '#' },
                { icon: LinkedinIcon, href: '#' },
                { icon: InstagramIcon, href: '#' },
                { icon: Globe, href: '#' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="w-9 h-9 rounded-full bg-purple-500/10 hover:bg-[#7c3aed] flex items-center justify-center text-purple-300 hover:text-white border border-purple-500/20 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
