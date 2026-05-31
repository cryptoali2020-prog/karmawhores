/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { blogArticles } from '../data';
import { BlogArticle } from '../types';

export default function BlogView() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 p-2 rounded-lg bg-[#1c1611] border border-[#2c2016] text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Articles list</span>
        </button>

        <article className="bg-[#1c1611] rounded-2xl border border-[#2c2016] overflow-hidden p-6 sm:p-8 shadow-xl">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-[#2c2016] mb-6">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-[#c59b27]" />
              <span>{selectedArticle.publishedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={13} className="text-[#dfba6b]" />
              <span>By {selectedArticle.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={13} className="text-sky-400" />
              <span>{selectedArticle.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl title-font font-bold text-white mb-4 leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap space-y-4">
            <p className="text-[#dfba6b] font-medium border-l-4 border-[#c59b27] pl-4 italic mb-6">
              {selectedArticle.snippet}
            </p>
            {selectedArticle.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="bg-[#0f0b08] border border-[#2c2016] rounded-2xl p-5 mt-10 text-xs sm:text-sm text-slate-400">
            <span className="font-semibold block text-white mb-1.5 uppercase font-mono tracking-wider text-[11px] text-[#c59b27]">
              Marketing Disclaimer
            </span>
            All strategic advisory contents shared inside the KarmaWhores analyst blog are for digital marketing research and SEO testing purposes only. Safe execution is highly dependent on continuous adjustments around Reddit's volatile platform changes.
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono text-[#c59b27] uppercase tracking-widest bg-[#c59b27]/10 px-3 py-1 rounded-full border border-[#c59b27]/20">
          Industry Insights & Guides
        </span>
        <h2 className="text-3xl sm:text-4xl title-font font-bold text-white mt-3 mb-4 tracking-tight">
          Reddit Marketing Intelligence
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Unlock algorithm mechanics, avoid early deactivations, and master post visibility parameters derived from thousands of verified campaign submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogArticles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col bg-[#1c1611] rounded-2xl border border-[#2c2016] overflow-hidden hover:border-[#c59b27]/40 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 group"
          >
            <div className="aspect-video overflow-hidden bg-slate-900 relative">
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1611] to-transparent opacity-65"></div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-4 text-[11px] font-mono text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {article.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl title-font font-semibold text-white group-hover:text-[#c59b27] transition-colors mb-3 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                {article.snippet}
              </p>

              <button
                onClick={() => setSelectedArticle(article)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#dfba6b] hover:text-white mt-auto transition-colors w-fit group/btn cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
