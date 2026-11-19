import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import type { AppPage } from './Navbar';
import { useCms } from '../context/useCms';

interface FooterProps {
  onOpenModal: () => void;
  onNavigate?: (page: AppPage, targetHash?: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export function Footer({ onOpenModal, onNavigate }: FooterProps) {
  const { cms } = useCms();

  const brandName = cms.branding?.name || 'CODEXX PLUS';
  const tagline = cms.branding?.tagline || 'Architecting Autonomous Intelligence & Digital Luxury';
  const primaryEmail = cms.branding?.primaryEmail || cms.contact?.email || 'Info@codexplus.site';
  const footerBio =
    cms.branding?.footerBio ||
    'We architect next-generation digital products, high-throughput AI pipelines, and bespoke luxury interfaces for industry leaders redefining the modern web.';
  const copyrightText =
    cms.branding?.copyrightText || `© ${CURRENT_YEAR} ${brandName}. All rights reserved.`;

  const hubs = cms.contact?.hubs && cms.contact.hubs.length > 0 ? cms.contact.hubs : [
    { city: 'San Francisco', address: '500 Howard St, Financial District', phone: '+1 (415) 890-3321' },
    { city: 'Zurich', address: 'Bahnhofstrasse 45, Tech Core', phone: '+41 44 211 4890' },
    { city: 'London', address: '10 Berkeley Square, Mayfair', phone: '+44 20 7946 0912' },
    { city: 'Dubai', address: 'DIFC Gate Tower, Level 14', phone: '+971 4 362 7700' },
  ];

  const servicesList = cms.services && cms.services.length > 0 ? cms.services : [];

  const handleNav = (page: AppPage, hash?: string) => {
    if (onNavigate) {
      onNavigate(page, hash);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08040f] pt-24 pb-8">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Top Collaboration Banner */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium tracking-wider text-violet-300 uppercase sm:text-base">
              Let&apos;s collaborate! Say hi
            </p>
            <a
              href={`mailto:${primaryEmail}`}
              className="mt-3 inline-block font-display text-3xl font-semibold tracking-tight text-white transition-colors hover:text-violet-300 sm:text-5xl lg:text-6xl"
            >
              {primaryEmail}
            </a>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex cursor-pointer items-center gap-3 self-start rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0a0612] shadow-[0_0_32px_rgba(168,85,247,0.35)] transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_48px_rgba(168,85,247,0.6)] lg:self-auto"
          >
            <span>Start a Project</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0612] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-5 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
                {brandName}
              </span>
            </div>
            <p className="text-sm font-medium text-violet-300">{tagline}</p>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              {footerBio}
            </p>
          </div>

          {/* Navigation Pages */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home', '#home')}
                  className="cursor-pointer text-gray-300 transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="cursor-pointer text-gray-300 transition-colors hover:text-white"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="cursor-pointer text-gray-300 transition-colors hover:text-white"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('team')}
                  className="cursor-pointer text-gray-300 transition-colors hover:text-white"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="cursor-pointer text-gray-300 transition-colors hover:text-white"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Core Capabilities
            </h4>
            <ul className="space-y-3 text-sm">
              {servicesList.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => handleNav('services')}
                    className="cursor-pointer text-left text-gray-300 transition-colors hover:text-white"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Studio Hubs */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Global Hubs
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              {hubs.slice(0, 3).map((hub, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <div>
                    <span className="font-semibold text-white">{hub.city}:</span>{' '}
                    <span>{hub.address}</span>
                  </div>
                </div>
              ))}
              {cms.contact?.phoneAmericas && (
                <div className="flex items-center gap-2.5 pt-2">
                  <Phone className="h-4 w-4 text-violet-400" />
                  <span>{cms.contact.phoneAmericas}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Panel Link */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            {copyrightText}
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <button
              type="button"
              onClick={() => handleNav('home', '#home')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Back to Top ↑
            </button>
            <span>&middot;</span>
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="cursor-pointer font-medium text-violet-400 transition-colors hover:text-violet-300 hover:underline"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
