/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, MessageSquare } from 'lucide-react';
import { faqs } from '../data';

export default function FaqView() {
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Title & Search bar */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold font-mono text-[#c59b27] uppercase tracking-widest bg-[#c59b27]/10 px-3 py-1 rounded-full border border-[#c59b27]/20">
          Knowledge Base & Support
        </span>
        <h2 className="text-3xl sm:text-4xl title-font font-bold text-white mt-3 mb-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-8">
          Answers to typical inquiries regarding credential verification, campaign launches, upvote mechanics, custom orders, and our refund guarantees.
        </p>

        {/* Live Search */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search FAQs / support terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1c1611] border border-[#2c2016] rounded-xl text-white text-sm focus:outline-none focus:border-[#c59b27] pl-10"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-500">🔍</span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 bg-[#1c1611] rounded-2xl border border-dashed border-slate-700">
            <AlertCircle className="mx-auto text-slate-600 mb-3" size={32} />
            <p className="text-sm text-slate-400">No matching questions found in database.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs text-[#dfba6b] underline uppercase tracking-wider font-mono font-bold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#1c1611] rounded-2xl border ${isExpanded ? 'border-[#c59b27]/40 shadow-md shadow-[#c59b27]/5' : 'border-[#2c2016]'} transition-all`}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-5 py-4.5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className={`p-2 rounded-lg ${isExpanded ? 'bg-[#c59b27]/10 text-[#c59b27]' : 'bg-[#2a1f16] text-[#dfba6b]'} shrink-0 transition-colors`}>
                      <HelpCircle size={16} />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 bg-[#0d121f]/50 rounded-b-2xl">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center justify-between pt-3.5 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-500">
                      <span>Category: <strong className="text-slate-300 capitalize">{faq.category}</strong></span>
                      <span className="text-emerald-500">Verified Answer ✓</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Static Live Assistance Helpdesk footer */}
      <div className="bg-gradient-to-r from-[#1c1611] to-[#2a1f16] rounded-2xl border border-[#2c2016] p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#c59b27] to-[#dfba6b] text-white">
            <MessageSquare size={24} />
          </div>
          <div>
            <h4 className="text-base font-display font-bold text-white">Still have questions regarding KarmaWhores assets?</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Our support operators are online right now. Talk directly to our 24/7 London helpdesk line.
            </p>
          </div>
        </div>
        <a
          href="#contact"
          className="shrink-0 w-full sm:w-auto py-3 px-5 rounded-xl bg-[#2a1f16] hover:bg-[#382a1e] text-white border border-[#3d2f23] text-xs font-semibold text-center transition-colors shadow-sm"
        >
          Open Support Ticket
        </a>
      </div>
    </div>
  );
}
