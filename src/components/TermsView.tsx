/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, BookOpen, Scale, Verified, FileText } from 'lucide-react';

export default function TermsView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10 text-slate-350">
        <span className="text-xs font-bold font-mono text-[#c59b27] uppercase tracking-widest bg-[#c59b27]/10 px-3 py-1 rounded-full border border-[#c59b27]/20">
          Legal & Regulatory Agreement
        </span>
        <h2 className="text-3xl sm:text-4xl title-font font-bold text-white mt-3 mb-4 tracking-tight">
          Terms of Service & Delivery Policy
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Please review the following rules carefully before committing payments. These policies safeguard both our digital delivery pipelines and your investments.
        </p>
      </div>

      <div className="bg-[#1c1611] rounded-2xl border border-[#2c2016] p-6 sm:p-8 space-y-8 shadow-md">
        {/* Term 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Scale size={18} className="text-[#c59b27]" />
            <h3 className="text-base sm:text-lg font-display font-bold">1. Agreement of Sale Parameters</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            All purchases made across the KarmaWhores marketplace are discrete digital asset transactions. Once payment is authorized and cleared, ownership credentials of the aged Reddit profiles or PDF strategy guides are dispatched via automated messaging modules.
          </p>
        </section>

        {/* Term 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <ShieldAlert size={18} className="text-[#dfba6b]" />
            <h3 className="text-base sm:text-lg font-display font-bold">2. Anti-Ban Warranty & Hand-Over</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            We warrant that every purchased account sits completely free of active shadowbans or restrictions at hand-over time. KarmaWhores operates a strict 14-day replacement policy. If your profile experiences algorithmic deactivation prior to any actual posting interaction, we replace it instantly with a similar age-equivalent asset.
          </p>
        </section>

        {/* Term 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <BookOpen size={18} className="text-sky-400" />
            <h3 className="text-base sm:text-lg font-display font-bold">3. Acceptable Use Guidelines</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            Reddit accounts and upvoting campaign tools supplied are proposed strictly as digital assets. Safe deployment relies on correct handling of IP fingerprints, rate multipliers, and community guidelines. KarmaWhores does not represent corporate backing from Reddit Inc. and is not responsible for outcomes arising from downstream posting violations.
          </p>
        </section>

        {/* Term 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Verified size={18} className="text-emerald-400" />
            <h3 className="text-base sm:text-lg font-display font-bold">4. Dispute Settlement & Refund Flow</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            We are dedicated to your marketing satisfaction. If you encounter credential errors, kindly contact our 24/7 London-based customer service instead of filing external credit disclaimers. We resolve 100% of complaints via refund credits or equivalent bulk account packages.
          </p>
        </section>

        {/* Footer meta info block */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px] sm:text-xs">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-slate-400" />
            <span>Document ID: TOC-66-2-2026</span>
          </div>
          <span>Effective Revision Date: May 31, 2026</span>
          <span className="text-emerald-500 font-semibold uppercase">Fully Compliant</span>
        </div>
      </div>
    </div>
  );
}
