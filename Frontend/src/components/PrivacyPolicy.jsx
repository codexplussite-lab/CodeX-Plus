import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, ArrowLeft, CheckCircle2, Globe, FileCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PrivacyPolicy({ onBackToHome }) {
  const { content } = useCms();
  const policy = content?.privacyPolicy || {};

  return (
    <div className="min-h-screen bg-[#07030e] text-white selection:bg-[#8b5cf6] selection:text-white font-sans pt-28 pb-20">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-1/4 w-[600px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-[600px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full" />
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
            {policy.badge || 'Legal & Data Compliance'}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-2 font-sans">
            {policy.title || 'Terms & Privacy Framework'}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-purple-200/75 leading-relaxed font-sans">
            {policy.subtitle || 'Effective as of 2026. Official terms of service and global privacy framework governing client intellectual property, autonomous AI agent confidentiality, and platform telemetry.'}
          </p>
        </div>

        {/* Policy Grid Content */}
        <div className="max-w-4xl space-y-8 text-purple-100/90 font-sans leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <EyeOff className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">1. Zero-Retention AI Data Policy</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed mb-3">
              We operate under an uncompromising zero-data-retention architectural policy:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-purple-200/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong>No Public Model Training:</strong> Your private enterprise codebase, database documents, and proprietary prompts are never used to train public foundational or commercial LLMs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong>Private VPC Execution:</strong> Multi-agent neural pipelines are architected within isolated virtual private clouds with ephemeral in-memory embeddings that flush immediately upon task completion.</span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">2. Strict Mutual Non-Disclosure (NDA)</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Every client engagement is covered by our comprehensive bilateral Institutional Non-Disclosure Agreement before system access or codebase audits begin. All trade secrets, unannounced venture funding, pre-launch roadmaps, and client identities remain under permanent institutional confidentiality unless explicit public case study approval is granted.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">3. SOC2 & GDPR Security Standards</h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-purple-200/80">
              <p>
                <strong>Encryption in Transit & At Rest:</strong> All web applications, API microservices, and databases engineered by CODEXX PLUS enforce TLS 1.3 with AES-256 GCM encryption at rest.
              </p>
              <p>
                <strong>Zero Invasive Tracking:</strong> We refuse to deploy intrusive advertising trackers, third-party pixel beacons, or invasive behavior monitors on our software or client platforms.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#0e071c]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#c084fc]">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-sans">4. Governing Law & Jurisdiction</h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the Canton of Zürich, Switzerland for European engagements, and the State of California, United States for North American and global enterprise accounts, without regard to conflict of law principles.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
