import { useEffect } from 'react';
import { X, Shield, FileText, Lock, CreditCard } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'security' | 'payment';

interface LegalModalProps {
  type: LegalModalType | null;
  onClose: () => void;
}

const LEGAL_CONTENT: Record<LegalModalType, { title: string; subtitle: string; icon: typeof Shield; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy & Data Security',
    subtitle: 'Confidentiality, encryption, and zero data monetization protocols',
    icon: Shield,
    content: (
      <div className="space-y-4 text-xs leading-relaxed text-gray-300">
        <p>
          CodeXplus operates under strict enterprise confidentiality standards. We never monetize, sell, or disclose client data, proprietary system blueprints, or project briefs to third parties.
        </p>
        <h4 className="font-semibold text-white">1. Scope of Data Ingestion</h4>
        <p>
          Contact and project inquiry submissions are encrypted in transit via TLS 1.3 and stored in isolated PostgreSQL clusters with row-level security. We collect only information explicitly provided to structure technical proposals.
        </p>
        <h4 className="font-semibold text-white">2. Mutual Non-Disclosure Compliance</h4>
        <p>
          All enterprise engagements are preceded by bilateral NDAs. Repository access, API tokens, and architectural diagrams are purged from working environments following engagement conclusion.
        </p>
        <h4 className="font-semibold text-white">3. Your Data Rights</h4>
        <p>
          You may request comprehensive export or complete erasure of your records at any time by emailing{' '}
          <a href="mailto:privacy@codexplus.site" className="text-violet-300 underline">
            privacy@codexplus.site
          </a>.
        </p>
      </div>
    ),
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Standard enterprise engagement principles and delivery agreements',
    icon: FileText,
    content: (
      <div className="space-y-4 text-xs leading-relaxed text-gray-300">
        <p>
          By accessing the CodeXplus platform or engaging our studio services, you agree to these Terms of Service.
        </p>
        <h4 className="font-semibold text-white">1. Professional Engagement Sprints</h4>
        <p>
          All design systems, WebGL shaders, full-stack edge infrastructure, and autonomous agent workflows are delivered under defined sprint scopes with verified milestone acceptance criteria.
        </p>
        <h4 className="font-semibold text-white">2. Intellectual Property Transfer</h4>
        <p>
          Upon milestone completion and receipt of associated milestone compensation, 100% of bespoke code, custom design tokens, and digital assets transfer irrevocably to the client.
        </p>
        <h4 className="font-semibold text-white">3. Service Level Guarantees</h4>
        <p>
          Production deployments are backed by our 99.98% infrastructure availability SLA and direct principal architect escalation channels.
        </p>
      </div>
    ),
  },
  security: {
    title: 'Security Inquiries & Vulnerability Disclosure',
    subtitle: 'Responsible disclosure guidelines and infrastructure defense',
    icon: Lock,
    content: (
      <div className="space-y-4 text-xs leading-relaxed text-gray-300">
        <p>
          Security is an foundational architectural tenet at CodeXplus. We maintain proactive vulnerability assessment pipelines, rate-limiting edge firewalls, and strict type-safe input boundaries.
        </p>
        <h4 className="font-semibold text-white">1. Reporting Vulnerabilities</h4>
        <p>
          If you identify a prospective vulnerability in our web properties or APIs, please report it immediately to our security response team at{' '}
          <a href="mailto:security@codexplus.site" className="text-violet-300 underline">
            security@codexplus.site
          </a>.
        </p>
        <h4 className="font-semibold text-white">2. Safe Harbor Policy</h4>
        <p>
          We commit to not pursuing legal action against researchers acting in good faith who follow responsible disclosure without attempting data exfiltration or service disruption.
        </p>
      </div>
    ),
  },
  payment: {
    title: 'Payment & Retainer Policies',
    subtitle: 'Transparent commercial terms, currency support, and billing schedules',
    icon: CreditCard,
    content: (
      <div className="space-y-4 text-xs leading-relaxed text-gray-300">
        <p>
          We offer clear, predictable investment schedules for venture-backed firms and global enterprises.
        </p>
        <h4 className="font-semibold text-white">1. Currency &amp; Invoicing</h4>
        <p>
          Invoices are generated in USD, EUR, or CHF via wire transfer (ACH / SEPA / SWIFT) or Stripe Invoicing with Net 15 or Net 30 commercial terms.
        </p>
        <h4 className="font-semibold text-white">2. Retainer Schedules</h4>
        <p>
          Studio retainers are billed monthly in advance and include dedicated architectural capacity, emergency hotfixes, and priority Slack communication channels.
        </p>
      </div>
    ),
  },
};

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const modal = LEGAL_CONTENT[type];
  const IconComponent = modal.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-400/30 bg-[#12091f] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <IconComponent className="h-5 w-5" />
          </span>
          <div>
            <h3 id="legal-modal-title" className="font-display text-2xl font-bold text-white">
              {modal.title}
            </h3>
            <p className="text-xs text-gray-400">{modal.subtitle}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          {modal.content}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] transition-colors hover:bg-violet-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegalModal;
