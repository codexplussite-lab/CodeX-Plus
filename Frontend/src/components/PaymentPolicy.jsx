import React from 'react';
import { ShieldCheck, CreditCard, Clock, FileText, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PaymentPolicy({ onBackToHome, onOpenBookingModal }) {
  const { content } = useCms();
  const policy = content?.paymentPolicy || {};

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-20">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/4 w-[600px] h-[500px] bg-violet-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-white transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Homepage</span>
        </button>

        {/* Document Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c084fc] px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4 inline-block">
            {policy.badge || 'Legal & Financial Governance'}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-2 font-sans">
            {policy.title || 'Payment & Milestone Terms'}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-purple-200/75 leading-relaxed font-sans">
            {policy.subtitle || 'Effective as of 2026. Official financial terms governing all architectural sprints, enterprise software engineering engagements, and studio retainers with CODEXX PLUS.'}
          </p>
        </div>

        {/* Policy Grid Content */}
        <div className="max-w-4xl space-y-8 text-purple-100/90 font-sans leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">1. Engagement Models & Billing Schedule</h2>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-purple-200/80">
              <p>
                <strong>Flagship Sprints ($25,000+):</strong> Billed in two deterministic 50/50 tranches. A 50% non-refundable architectural reservation deposit is required to lock your delivery sprint window. The remaining 50% is invoiced upon final staging review and prior to DNS/production cutover.
              </p>
              <p>
                <strong>Enterprise Architecture ($60,000+):</strong> Invoiced across four structured architectural milestones: 40% discovery blueprint & system architecture; 30% interactive prototype & shader core; 20% production engineering & AI agent integration; 10% global cutover & observability activation.
              </p>
              <p>
                <strong>Dedicated Studio Retainer ($18,000/mo):</strong> Billed upfront on the 1st calendar day of each billing cycle for 160+ guaranteed hours of senior architectural velocity. Unused hours do not roll over to safeguard high-throughput engineering availability.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">2. Accepted Settlement Currencies & Gateways</h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-purple-200/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong>Institutional Bank Wire (SWIFT / Fedwire):</strong> USD, EUR, and CHF accounts held with Tier-1 Swiss and US financial institutions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong>Corporate Credit Cards:</strong> Settled securely via Stripe with automated VAT/GST compliant institutional receipts.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong>On-Chain Stablecoin Settlement:</strong> USDC and USDT on Ethereum Mainnet or Arbitrum with cryptographic transaction receipts.</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">3. Intellectual Property Assignment</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Upon receipt of final milestone settlement in full, all proprietary source code, Figma design tokens, 3D WebGL assets, AI pipeline configurations, and custom database schemas created specifically for your organization are assigned exclusively to your legal entity under perpetual, worldwide, irrevocable ownership.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">4. Refund, Rescheduling & Scope Modifications</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Initial deposit payments secure dedicated senior velocity and are non-refundable once architectural blueprinting has commenced. In the event of early project suspension requested by the client, billing is reconciled against completed milestone artifacts. Any scope expansion requested during active sprints is estimated and billed via separate Addendum SOW.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
