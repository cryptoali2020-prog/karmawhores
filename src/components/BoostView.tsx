/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flame, MessageSquare, PlusCircle, CheckCircle, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { Product } from '../types';

interface BoostViewProps {
  onAddToCart: (product: Product) => void;
  onNavigateToCart: () => void;
}

export default function BoostView({ onAddToCart, onNavigateToCart }: BoostViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'upvotes' | 'comments' | 'posts'>('upvotes');
  const [targetUrl, setTargetUrl] = useState('');
  const [commentsInput, setCommentsInput] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customNiche, setCustomNiche] = useState('tech');
  
  // Upvotes Configurator
  const [upvoteCount, setUpvoteCount] = useState(50);
  const upvoteUnitPrice = 0.25; // $0.25 per upvote
  const calculatedUpvotePrice = upvoteCount * upvoteUnitPrice;

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddUpvotesToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    // Compile into custom Product struct
    const customUpvotesProduct: Product = {
      id: `custom-upvotes-${Date.now()}`,
      wpId: "2598",
      title: `Reddit Posts Boost: ${upvoteCount} Target Upvotes`,
      category: "reddit-posts",
      originalPrice: calculatedUpvotePrice + 15,
      salePrice: calculatedUpvotePrice,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200",
      description: `Target high-influence upvote delivery for link: ${targetUrl}. Natural distribution over chosen timeline.`,
      link: "https://karmawhores.com/reddit-upvotes/",
      tags: ["upvote-boost", "priority-delivery"]
    };

    onAddToCart(customUpvotesProduct);
    setNotification(`${upvoteCount} Reddit Posts Boost added to your bag!`);
    setTargetUrl('');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddCommentsToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim() || !commentsInput.trim()) return;

    const commentLines = commentsInput.split('\n').filter(line => line.trim().length > 0);
    const commentCount = commentLines.length || 1;
    const commentsUnitPrice = 2.50; // $2.50 per custom written comments
    const finalCommentsPrice = commentCount * commentsUnitPrice;

    const customCommentsProduct: Product = {
      id: `custom-comments-${Date.now()}`,
      wpId: "2758",
      title: `Buy Reddit Comments: ${commentCount} Customized Posts`,
      category: "reddit-comments",
      originalPrice: finalCommentsPrice + 10,
      salePrice: finalCommentsPrice,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=200",
      description: `Custom comments sequence for url: ${targetUrl}. Texts: "${commentLines[0] || 'Nice project'}" (+${commentCount - 1} more comments)`,
      link: "https://karmawhores.com/product/post-reddit-comments/",
      tags: ["comments-engagement", "niche-warmed"]
    };

    onAddToCart(customCommentsProduct);
    setNotification(`${commentCount} Customized Reddit Comments added to your bag!`);
    setTargetUrl('');
    setCommentsInput('');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddPostWritingToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const basePostPrice = 49.99;

    const customPostProduct: Product = {
      id: `custom-posts-${Date.now()}`,
      wpId: "2757",
      title: `Done-for-you Posting: "${customTitle}"`,
      category: "reddit-posts",
      originalPrice: 65.00,
      salePrice: basePostPrice,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200",
      description: `Warmed-up post writing and publishing for Title: "${customTitle}" underneath target Subreddit matching Niche Category: "${customNiche}".`,
      link: "https://karmawhores.com/product/buy-reddit-posting-service/",
      tags: ["done-for-you-post", "copywriter-service"]
    };

    onAddToCart(customPostProduct);
    setNotification("Custom Done-for-you Reddit Posting added to your bag!");
    setCustomTitle('');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold font-mono text-[#FF4500] uppercase tracking-widest bg-[#FF4500]/10 px-3 py-1 rounded-full border border-[#FF4500]/20">
          Organic Post Accelerator
        </span>
        <h2 className="text-3xl sm:text-4xl title-font font-bold text-white mt-3 mb-4 tracking-tight">
          Reddit Upvotes & Engagement Campaign
        </h2>
        <p className="text-sm text-slate-400">
          Supercharge your posts to trending hot streams. Boost native feedback indicators and organic click conversion ratios safely.
        </p>
      </div>

      {notification && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>{notification}</span>
          </div>
          <button
            onClick={onNavigateToCart}
            className="text-xs font-mono font-bold uppercase underline text-[#FFB000]"
          >
            Review Cart
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Tab controls */}
        <div className="lg:col-span-4 space-y-3">
          <button
            onClick={() => setActiveSubTab('upvotes')}
            className={`w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'upvotes'
                ? 'bg-[#1b253b] border-[#FF4500] text-white shadow-md'
                : 'bg-[#111625] border-[#1e293b] text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeSubTab === 'upvotes' ? 'bg-[#FF4500] text-white' : 'bg-slate-800'}`}>
              <Flame size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">1. Boost Reddit Upvotes</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Custom Slider & Link Delivery</p>
            </div>
          </button>

          <button
            onClick={() => setActiveSubTab('comments')}
            className={`w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'comments'
                ? 'bg-[#1b253b] border-[#FF4500] text-white shadow-md'
                : 'bg-[#111625] border-[#1e293b] text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeSubTab === 'comments' ? 'bg-[#FF4500] text-white' : 'bg-slate-800'}`}>
              <MessageSquare size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">2. Buy Custom Comments</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Warmed engagement steering</p>
            </div>
          </button>

          <button
            onClick={() => setActiveSubTab('posts')}
            className={`w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'posts'
                ? 'bg-[#1b253b] border-[#FF4500] text-white shadow-md'
                : 'bg-[#111625] border-[#1e293b] text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeSubTab === 'posts' ? 'bg-[#FF4500] text-white' : 'bg-slate-800'}`}>
              <PlusCircle size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">3. Done-for-you Posting</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Copywriting & instant seeding</p>
            </div>
          </button>

          {/* Guarantee info panel */}
          <div className="bg-[#111625] border border-[#1e293b] rounded-xl p-4 text-xs space-y-3">
            <span className="font-semibold text-slate-300 block font-mono text-[10px] uppercase">Campaign Protocols</span>
            <div className="flex items-start gap-2 text-slate-400 leading-relaxed">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>Full anti-ghosting delivery algorithm. Real IP proxies are utilized to ensure upvotes register securely with zero drops.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-400 leading-relaxed">
              <Zap size={14} className="text-[#FFB000] shrink-0 mt-0.5" />
              <span>Gradual organic drip distribution defaults to protect post thread history. Delivery starts in 15-30 minutes.</span>
            </div>
          </div>
        </div>

        {/* Form controls config panel */}
        <div className="lg:col-span-8 bg-[#111625] rounded-2xl border border-[#1e293b] p-6 sm:p-8 shadow-md">
          {activeSubTab === 'upvotes' && (
            <form onSubmit={handleAddUpvotesToCart} className="space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-lg font-display font-semibold text-white">Upvotes Campaign Builder</h3>
                <p className="text-xs text-slate-400 mt-0.5">Adjust slider targets below. Upvotes are processed natively.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                  Target Reddit Submission URL (*)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.reddit.com/r/technology/comments/..."
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 text-xs font-mono">
                  <span className="text-slate-400 uppercase">Upvotes Quantity</span>
                  <span className="text-white bg-[#FF4500] px-2 py-0.5 rounded text-xs font-bold font-mono">
                    {upvoteCount} Upvotes
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={upvoteCount}
                  onChange={(e) => setUpvoteCount(Number(e.target.value))}
                  className="w-full text-[#FF4500] h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-[#FF4500]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5 uppercase">
                  <span>20 upvotes</span>
                  <span>500 upvotes</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0d121f] border border-[#1e293b] gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Service Estimated value</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-bold text-[#FFB000] font-mono">${calculatedUpvotePrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 font-mono font-medium">(${upvoteUnitPrice.toFixed(2)} / unit)</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#FF4500] hover:bg-[#FF5722] text-white text-xs font-semibold shadow-md shadow-[#FF4500]/15 transition-all cursor-pointer"
                >
                  Configure & Add to Cart
                </button>
              </div>

              <div className="flex gap-2 p-3 bg-indigo-500/10 border border-indigo-500/20 text-[#a5b4fc] text-[11px] rounded-xl">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-indigo-400" />
                <span>
                  <strong>Tip:</strong> We advise buying aged accounts to submit your links, then launching upvotes under 1 hour from post timestamp to secure peak logarithmic algorithmic trending scores.
                </span>
              </div>
            </form>
          )}

          {activeSubTab === 'comments' && (
            <form onSubmit={handleAddCommentsToCart} className="space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-lg font-display font-semibold text-white">Custom Comments engagement Campaign</h3>
                <p className="text-xs text-slate-400 mt-0.5">Enter direct post URL and your wanted comment copy lines. Written organically.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                  Target Reddit Submission URL (*)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.reddit.com/r/cryptocurrency/comments/..."
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                  Comments texts list (*) <span className="text-slate-500">(Multiply comments - one comment per line)</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="This is an awesome coin launch! Aping in immediately.&#10;Incredible project, dev team is super active on tg."
                  value={commentsInput}
                  onChange={(e) => setCommentsInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500] placeholder:text-slate-600 resize-none font-mono text-xs"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0d121f] border border-[#1e293b] gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Estimated campaign total</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-bold text-[#FFB000] font-mono">
                      ${(commentsInput.split('\n').filter(line => line.trim().length > 0).length * 2.50).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-medium">($2.50 / custom written comment)</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#FF4500] hover:bg-[#FF5722] text-white text-xs font-semibold shadow-md shadow-[#FF4500]/15 transition-all cursor-pointer"
                >
                  Configure & Add to Cart
                </button>
              </div>
            </form>
          )}

          {activeSubTab === 'posts' && (
            <form onSubmit={handleAddPostWritingToCart} className="space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-lg font-display font-semibold text-white">Buy Reddit Posting Service</h3>
                <p className="text-xs text-slate-400 mt-0.5">Our native copywriting team crafts, schedules, and submits clean threads in niche communities.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Proposed Title Context (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Best way to audit smart contracts in 2026"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Target Niche Category
                  </label>
                  <select
                    value={customNiche}
                    onChange={(e) => setCustomNiche(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500]"
                  >
                    <option value="tech">Crypto / Web3 / Tech niches</option>
                    <option value="saas">Software as a Service (SaaS)</option>
                    <option value="gaming">Gaming & Entertainment</option>
                    <option value="marketing">SEO & Growth Hacking</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0d121f] border border-[#1e293b] gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Fixed package value</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-bold text-[#FFB000] font-mono">$49.99</span>
                    <span className="text-xs text-slate-500 font-mono font-medium">(Includes copywriting, posting & anti-flag guarantee)</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#FF4500] hover:bg-[#FF5722] text-white text-xs font-semibold shadow-md shadow-[#FF4500]/15 transition-all cursor-pointer"
                >
                  Configure & Add to Cart
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
