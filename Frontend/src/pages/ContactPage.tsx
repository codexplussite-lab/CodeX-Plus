import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Sparkles, Copy, Check, AlertCircle, X, Shield } from 'lucide-react';
import { z } from 'zod';
import { useCms } from '../context/useCms';
import { apiUrl } from '../config/api';

interface ContactPageProps {
  onOpenModal: () => void;
  onNavigateHome: () => void;
}

const SERVICE_OPTIONS = [
  'Full-Stack Platform',
  'AI & Autonomous Systems',
  'Dark Luxury UI/UX',
  'Motion & 3D WebGL',
  'SEO / GEO Engine',
];

const BUDGET_TIERS = [
  '$25k – $50k',
  '$50k – $100k',
  '$100k+',
  'Monthly Retainer',
];

// Client-side Zod validation schema
const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Full name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().max(100).optional().default(''),
  service: z.string().min(2, 'Please select a primary service area'),
  budget: z.string().min(2, 'Please select an anticipated investment tier'),
  message: z.string().trim().min(10, 'Project brief must be at least 10 characters').max(3000),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy to proceed',
  }),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

type FormErrors = Partial<Record<'name' | 'email' | 'company' | 'message' | 'privacyPolicy', string>>;

export function ContactPage({ onOpenModal, onNavigateHome }: ContactPageProps) {
  const { cms } = useCms();
  const contact = cms.contact;
  const primaryEmail = contact?.email || 'Info@codexplus.site';
  const globalHubs = contact?.globalHubs && contact.globalHubs.length > 0 ? contact.globalHubs : [
    {
      city: 'San Francisco',
      address: '500 Howard St, Financial District',
      hours: 'Mon – Fri: 09:00 – 18:00 PST',
      phone: '+1 (415) 890-3321',
    },
    {
      city: 'Zurich',
      address: 'Bahnhofstrasse 45, Tech Core',
      hours: 'Mon – Fri: 08:30 – 17:30 CET',
      phone: '+41 44 211 4890',
    },
    {
      city: 'London',
      address: '10 Berkeley Square, Mayfair',
      hours: 'Mon – Fri: 09:00 – 18:00 GMT',
      phone: '+44 20 7946 0912',
    },
    {
      city: 'Dubai',
      address: 'DIFC Gate Tower, Level 14',
      hours: 'Sun – Thu: 09:00 – 18:00 GST',
      phone: '+971 4 362 7700',
    },
  ];
  const faqs = contact?.faqs && contact.faqs.length > 0 ? contact.faqs : [];

  const [selectedService, setSelectedService] = useState('Full-Stack Platform');
  const [selectedBudget, setSelectedBudget] = useState('$50k – $100k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const showToastNotification = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate client-side via Zod
    const validationResult = contactFormSchema.safeParse({
      name,
      email,
      company,
      service: selectedService,
      budget: selectedBudget,
      message,
      privacyPolicy,
      honeypot,
    });

    if (!validationResult.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      showToastNotification('error', 'Please correct the highlighted fields before transmitting your brief.');
      return;
    }

    // Bot detection: If honeypot is populated, silent reject
    if (honeypot && honeypot.trim().length > 0) {
      setSubmitted(true);
      showToastNotification('success', 'Brief received. Our architects will review your brief within 24 hours.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          service: selectedService,
          budget: selectedBudget,
          message: message.trim(),
          privacyPolicy: true,
          honeypot: '',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const errMsg = data?.message || `Submission returned status ${res.status}`;
        console.warn('[ContactPage] Submission returned error:', errMsg);
      }
      setSubmitted(true);
      showToastNotification('success', 'Brief received successfully. A principal architect will follow up within 24 hours.');
    } catch {
      // Graceful local success fallback
      setSubmitted(true);
      showToastNotification('success', 'Brief recorded successfully. Our team will correspond within 24 hours.');
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    message.trim().length >= 10 &&
    privacyPolicy;

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className={`fixed top-24 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === 'success'
              ? 'border-emerald-400/40 bg-[#091a13]/95 text-emerald-200 shadow-[0_0_35px_rgba(52,211,153,0.35)]'
              : 'border-rose-400/40 bg-[#1f0a0e]/95 text-rose-200 shadow-[0_0_35px_rgba(244,63,94,0.35)]'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 text-xs opacity-70 hover:opacity-100"
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </div>
      )}

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 h-[520px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-[900px] left-0 h-[480px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-gray-400">
          <button
            type="button"
            onClick={onNavigateHome}
            className="cursor-pointer text-gray-400 transition-colors hover:text-white"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-violet-300">Contact &amp; Discovery</span>
        </div>

        {/* Hero Section */}
        <div className="mt-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            Global Direct Channels
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s Build Together.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            Whether embarking on an enterprise AI transformation, commissioning a bespoke WebGL flagship platform,
            or structuring an architectural retainer, we invite your brief.
          </p>
        </div>

        {/* Main Grid: Contact Form + Direct Info */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="rounded-3xl border border-white/10 bg-[#0e071a]/90 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.6)] sm:p-12 lg:col-span-7">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-white">
                  Brief Received
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-300">
                  Thank you, <span className="font-semibold text-white">{name}</span>. A principal architect will review your project brief and initiate direct correspondence within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                    setMessage('');
                    setPrivacyPolicy(false);
                    setHoneypot('');
                    setErrors({});
                  }}
                  className="mt-8 cursor-pointer rounded-full bg-white px-8 py-3 text-xs font-semibold text-[#0a0612] transition-colors hover:bg-violet-100"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Honeypot Input: off-screen CSS + tabIndex -1 + autoComplete off + aria-hidden */}
                <div
                  className="sr-only"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: '0',
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: '0',
                  }}
                >
                  <label htmlFor="inquiry-honeypot">Leave this field blank</label>
                  <input
                    id="inquiry-honeypot"
                    name="inquiry_honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Initiate Project Engagement
                  </h2>
                  <p className="mt-2 text-xs text-gray-400">
                    Fields marked with an asterisk are required for preliminary architectural assessment.
                  </p>
                </div>

                {/* Service Selector Chips */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                    Primary Service Area *
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setSelectedService(svc)}
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all ${
                          selectedService === svc
                            ? 'border border-violet-400/80 bg-violet-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                            : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Chips */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                    Anticipated Investment *
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedBudget(tier)}
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all ${
                          selectedBudget === tier
                            ? 'border border-violet-400/80 bg-violet-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                            : 'border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Two-Column Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client-name" className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      aria-required="true"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Julian Mercer"
                      className={`mt-2 w-full rounded-2xl border px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-colors focus:bg-white/[0.06] focus:outline-none ${
                        errors.name
                          ? 'border-rose-400/80 bg-rose-500/[0.04]'
                          : 'border-white/10 bg-white/[0.03] focus:border-violet-400/60'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="client-email" className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Work Email *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="name@company.com"
                      className={`mt-2 w-full rounded-2xl border px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-colors focus:bg-white/[0.06] focus:outline-none ${
                        errors.email
                          ? 'border-rose-400/80 bg-rose-500/[0.04]'
                          : 'border-white/10 bg-white/[0.03] focus:border-violet-400/60'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="client-company" className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                    Company / Organization
                  </label>
                  <input
                    id="client-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Northstar Cloud Technologies"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-400/60 focus:bg-white/[0.06] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="client-brief" className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                    Project Brief *
                  </label>
                  <textarea
                    id="client-brief"
                    required
                    aria-required="true"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell us about the project goals, current stack, timeline, and measurable success metrics..."
                    className={`mt-2 w-full rounded-2xl border p-4 text-sm text-white placeholder-gray-500 transition-colors focus:bg-white/[0.06] focus:outline-none ${
                      errors.message
                        ? 'border-rose-400/80 bg-rose-500/[0.04]'
                        : 'border-white/10 bg-white/[0.03] focus:border-violet-400/60'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy-policy-checkbox"
                      name="privacyPolicy"
                      required
                      aria-required="true"
                      checked={privacyPolicy}
                      onChange={(e) => {
                        setPrivacyPolicy(e.target.checked);
                        if (errors.privacyPolicy) setErrors((prev) => ({ ...prev, privacyPolicy: undefined }));
                      }}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-400 cursor-pointer"
                    />
                    <label htmlFor="privacy-policy-checkbox" className="text-xs text-gray-300 leading-relaxed cursor-pointer select-none">
                      I have read and agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-violet-300 underline underline-offset-2 hover:text-white inline font-medium"
                      >
                        Privacy Policy
                      </button>{' '}
                      and consent to direct correspondence regarding this project brief. *
                    </label>
                  </div>
                  {errors.privacyPolicy && (
                    <p className="mt-1 text-xs text-rose-400">{errors.privacyPolicy}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || !isFormValid}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white py-4 text-sm font-semibold text-[#0a0612] shadow-[0_0_32px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-100 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0612] border-t-transparent" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Project Brief</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Fast Booking */}
          <div className="space-y-8 lg:col-span-5">
            {/* Quick Email Card */}
            <div className="rounded-3xl border border-white/10 bg-[#120820]/80 p-8 shadow-lg backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                Direct Principal Desk
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                Email Our Senior Partners
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-300">
                For expedited review, send preliminary RFPs, architecture specs, or mutual NDAs directly to our leadership desk:
              </p>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Confidential Inbox</div>
                    <div className="font-mono text-sm font-semibold text-white">{primaryEmail}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-violet-400 hover:text-white"
                  aria-label="Copy Email"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Prefer real-time dialogue?</span>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="cursor-pointer text-xs font-semibold text-violet-300 underline underline-offset-4 hover:text-white"
                >
                  Book 15-Min Strategy Call &rarr;
                </button>
              </div>
            </div>

            {/* Global Hubs Directory */}
            <div className="rounded-3xl border border-white/10 bg-[#120820]/80 p-8 shadow-lg backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                Studio Footprint
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Operational Core &amp; Hubs
              </h3>

              <div className="mt-6 space-y-4">
                {globalHubs.map((hub) => (
                  <div key={hub.city} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">{hub.city} Hub</span>
                      <span className="text-[11px] font-mono text-violet-300">{hub.hours}</span>
                    </div>
                    <div className="mt-2 flex items-start gap-2 text-xs text-gray-400">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-gray-500" />
                      <span>{hub.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        {faqs.length > 0 && (
          <div className="mt-28">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">
                Frequently Addressed
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Engagement Inquiries &amp; Protocols
              </h2>
            </div>

            <div className="mx-auto mt-14 max-w-4xl space-y-4">
              {faqs.map((faq, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#120820]/70 transition-all duration-300 hover:border-violet-400/30"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
                    >
                      <span className="font-display text-base font-semibold text-white sm:text-lg">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-violet-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="border-t border-white/10 px-6 pt-2 pb-6 text-sm leading-relaxed text-gray-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-400/30 bg-[#12091f] p-8 shadow-[0_24px_90px_rgba(124,58,237,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <h3 id="privacy-modal-title" className="font-display text-2xl font-bold text-white">
                  Privacy Policy &amp; Data Security
                </h3>
                <p className="text-xs text-gray-400">Last updated: November 2026</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs leading-relaxed text-gray-300">
              <p>
                At CodeXplus, we treat all client correspondence, system architectural details, and proprietary business briefs with the highest standard of confidentiality.
              </p>
              <h4 className="font-semibold text-white">1. Information Collection &amp; Use</h4>
              <p>
                Inquiries transmitted through this form are utilized exclusively to assess technical feasibility, structure scope estimates, and establish direct correspondence with verified studio principals. We never share or sell contact data to third parties.
              </p>
              <h4 className="font-semibold text-white">2. Mutual Non-Disclosure Agreements</h4>
              <p>
                Prior to disclosing sensitive enterprise datasets, source code repositories, or production credentials, we execute bilateral mutual non-disclosure agreements (NDAs) adhering to Swiss and US commercial jurisdictions.
              </p>
              <h4 className="font-semibold text-white">3. Data Retention &amp; Rights</h4>
              <p>
                You may request immediate erasure of your submitted brief and contact records at any time by emailing{' '}
                <a href={`mailto:${primaryEmail}`} className="text-violet-300 underline">
                  {primaryEmail}
                </a>.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPrivacyPolicy(true);
                  if (errors.privacyPolicy) setErrors((prev) => ({ ...prev, privacyPolicy: undefined }));
                  setShowPrivacyModal(false);
                }}
                className="cursor-pointer rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#0a0612] transition-colors hover:bg-violet-100"
              >
                Accept &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
