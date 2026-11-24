import React, { useState } from 'react';
import { Home, Compass, Cpu, Briefcase, Users, PhoneCall, ArrowUp } from 'lucide-react';

/**
 * FloatingDock - React Bits (https://reactbits.dev/components/dock)
 * Interactive magnification dock with glassmorphism styling for luxury navigation.
 */
export default function FloatingDock({ onNavigate, onOpenBookingModal }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const dockItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        if (onNavigate) onNavigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'about',
      label: 'Studio',
      icon: Compass,
      action: () => {
        if (onNavigate) onNavigate('/about');
        else window.location.hash = '#about';
      },
    },
    {
      id: 'services',
      label: 'Capabilities',
      icon: Cpu,
      action: () => {
        if (onNavigate) onNavigate('/services');
        else window.location.hash = '#services';
      },
    },
    {
      id: 'projects',
      label: 'Work',
      icon: Briefcase,
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (onNavigate) onNavigate('/#projects');
      },
    },
    {
      id: 'team',
      label: 'Architects',
      icon: Users,
      action: () => {
        if (onNavigate) onNavigate('/team');
        else window.location.hash = '#team';
      },
    },
    {
      id: 'book',
      label: 'Discovery',
      icon: PhoneCall,
      highlight: true,
      action: () => {
        if (onOpenBookingModal) onOpenBookingModal();
        else if (onNavigate) onNavigate('/contact');
      },
    },
    {
      id: 'top',
      label: 'Top',
      icon: ArrowUp,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  return (
    <nav
      aria-label="Quick Access Dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#100723]/80 backdrop-blur-2xl border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(139,92,246,0.2)]"
    >
      {dockItems.map((item, idx) => {
        const Icon = item.icon;
        const isHovered = hoveredIdx === idx;
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        let scale = 1;
        if (isHovered) scale = 1.35;
        else if (isNeighbor) scale = 1.15;

        return (
          <div key={item.id} className="relative flex flex-col items-center">
            {/* Tooltip */}
            <div
              className={`absolute -top-9 px-2.5 py-1 rounded-md bg-[#1d0e3b] border border-purple-500/40 text-[11px] font-mono text-purple-200 whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
                isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
              }`}
            >
              {item.label}
            </div>

            {/* Dock Button */}
            <button
              onClick={item.action}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              aria-label={item.label}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                item.highlight
                  ? 'bg-gradient-to-tr from-violet-600 to-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'bg-purple-500/10 hover:bg-purple-500/25 text-purple-200 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </nav>
  );
}

