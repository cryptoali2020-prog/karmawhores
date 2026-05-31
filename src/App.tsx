/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Sparkles, 
  ShoppingBag, 
  ArrowUpRight, 
  CheckCircle, 
  RefreshCcw, 
  SlidersHorizontal,
  ThumbsUp,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import BlogView from './components/BlogView';
import FaqView from './components/FaqView';
import ContactView from './components/ContactView';
import TermsView from './components/TermsView';
import BoostView from './components/BoostView';
import { products } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Filtering states on catalog Page
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(1000); // Max cap matching our premium items
  const [sortBy, setSortBy] = useState<string>('default');

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('karmawhores_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to recover localStorage cart key:", e);
    }
  }, []);

  // Save cart to LocalStorage on changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('karmawhores_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error("Failed to commit localStorage cart update:", e);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      const updated = cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
    // Automatically trigger slide-over side cart
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updated = cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity } 
        : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Filter and sort mechanism
  const filteredProducts = products.filter(product => {
    const finalPrice = product.salePrice ?? product.originalPrice;
    
    // Category match
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Search term match
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.wpId && product.wpId.includes(searchTerm));
                          
    // Price match
    const matchesPrice = finalPrice <= priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    const priceA = a.salePrice ?? a.originalPrice;
    const priceB = b.salePrice ?? b.originalPrice;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'popularity') return b.wpId.localeCompare(a.wpId); // Simulated via wp post id size
    return 0; // Default order
  });

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col selection:bg-[#FF4500] selection:text-white">
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
      />

      {/* Main Container Workspace */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <div>
            {/* HERO BADGE HEADER */}
            <section className="relative overflow-hidden pt-12 pb-14 bg-gradient-to-b from-[#111726] to-[#070a13] border-b border-[#131b2e]">
              <div className="absolute inset-0 bg-radial-gradient from-[#FF4500]/10 via-transparent to-transparent opacity-40"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 text-xs text-[#FF4500] font-mono font-bold uppercase tracking-wider mb-6 animate-pulse">
                  <Sparkles size={13} className="text-[#FFB000]" />
                  <span>Verified Aged Reputation Marketplace</span>
                </div>

                <h1 className="text-3xl sm:text-5xl title-font font-bold text-white tracking-tight leading-none mb-4 max-w-4xl mx-auto">
                  Buy High Karma <span className="text-[#FF4500]">Reddit Accounts</span> & Post Upvotes
                </h1>
                
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                  Gain instant native authority to post and market organically. Our 24/7 London-based support team delivers unbanned, CMS-compliant aged digital assets backed by a full refund guarantee.
                </p>

                {/* Grid features info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
                  <div className="p-4 bg-[#111726]/60 rounded-xl border border-[#1e293b] flex items-center gap-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">100% Unbanned</h4>
                      <p className="text-[11px] text-slate-500">Residential IP proxies</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#111726]/60 rounded-xl border border-[#1e293b] flex items-center gap-3">
                    <span className="text-xl">✈️</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">Instant Dispatch</h4>
                      <p className="text-[11px] text-slate-500">Automated secure node</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#111726]/60 rounded-xl border border-[#1e293b] flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">4 Payment Types</h4>
                      <p className="text-[11px] text-slate-500">Paypal, Card, G-Pay, Apple</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#111726]/60 rounded-xl border border-[#1e293b] flex items-center gap-3">
                    <span className="text-xl">🇬🇧</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">London Support</h4>
                      <p className="text-[11px] text-slate-500">Resolutions in Under 4 Hrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCT CATALOG WORKSPACE */}
            <section className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
              {/* Filter controls panel bar */}
              <div className="bg-[#111625] rounded-2xl border border-[#1e293b] p-5 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#1e293b]">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#FF4500]" />
                    <span>Digital Asset Catalog Filters</span>
                  </h3>
                  
                  {/* Category select buttons */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {[
                      { id: 'all', label: 'All Assets' },
                      { id: 'reddit-accounts', label: 'Reddit Accounts' },
                      { id: 'reddit-posts', label: 'Reddit Posts' },
                      { id: 'reddit-comments', label: 'Comments Boost' },
                      { id: 'guides', label: 'Guides' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-[#FF4500] border-[#FF4500] text-white text-semibold'
                            : 'bg-[#0d121f] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
                  {/* Live Search */}
                  <div className="lg:col-span-5 relative">
                    <input
                      type="text"
                      placeholder="Search accounts (e.g. age, karma, wp ID)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0d121f] border border-[#1e293b] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF4500] pl-10"
                    />
                    <Search size={14} className="absolute left-3.5 top-3 text-slate-500" />
                  </div>

                  {/* Pricing slider config */}
                  <div className="lg:col-span-4 flex items-center gap-3">
                    <span className="text-xs text-slate-400 shrink-0 font-mono">Price Limit:</span>
                    <input
                      type="range"
                      min="5"
                      max="1000"
                      step="5"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-[#1e293b] rounded-lg cursor-pointer accent-[#FF4500]"
                    />
                    <span className="text-xs text-[#FFB000] font-mono font-bold shrink-0 min-w-[50px] text-right">
                      ${priceRange}
                    </span>
                  </div>

                  {/* Ordering Select sorting */}
                  <div className="lg:col-span-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0d121f] border border-[#1e293b] rounded-xl text-slate-300 text-xs focus:outline-none"
                    >
                      <option value="default">Default sorting</option>
                      <option value="popularity">Sort by popularity</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid listings render */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-[#111625] rounded-3xl border border-dashed border-slate-800">
                  <span className="text-5xl inline-block mb-3">🔍</span>
                  <p className="text-slate-400 font-medium">No digital store assets match your filter parameters.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange(1000);
                    }}
                    className="mt-4 px-4 py-2 bg-[#162035] hover:bg-[#1a2640] border border-[#27314a] text-[#FF4500] rounded-xl text-xs font-mono font-bold uppercase transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-5 px-1">
                    <span className="text-xs text-slate-500 font-mono uppercase">
                      Showing {filteredProducts.length} premium offers
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                      Direct Checkout Enabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* CUSTOM ENHANCED ROUTING */}
        {activeTab === 'boost' && (
          <BoostView 
            onAddToCart={handleAddToCart} 
            onNavigateToCart={() => setIsCartOpen(true)}
          />
        )}
        {activeTab === 'blog' && <BlogView />}
        {activeTab === 'faqs' && <FaqView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'terms' && <TermsView />}
      </main>

      {/* FOOTER SIDEBAR AND REPLICA STORE CREDITS */}
      <footer id="colophon" className="bg-[#0b0f19] border-t border-[#131b2c] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4500] shadow-md shadow-[#FF4500]/10 mr-2.5">
                <span className="text-white font-bold text-base title-font">K</span>
              </div>
              <span className="font-display font-semibold text-white text-base">KarmaWhores</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              24/7 support London-based customer service, Reddit accounts upvote and downvotes, Reddit multi-task campaigns with full refund policy.
            </p>
            <div className="flex gap-2">
              <span className="bg-[#111726] border border-slate-800 rounded px-2.5 py-1 text-[10px] font-mono text-[#FFB000]">
                Est. London 2018
              </span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Marketplace Segments</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <button onClick={() => { setActiveTab('home'); setSelectedCategory('reddit-accounts'); }} className="hover:text-[#FF4500] text-slate-500 transition-colors">
                  Aged Reddit Accounts
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('boost'); }} className="hover:text-[#FF4500] text-slate-500 transition-colors">
                  Reddit Upvotes & Seeding
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('home'); setSelectedCategory('reddit-comments'); }} className="hover:text-[#FF4500] text-slate-500 transition-colors">
                  Buy Custom Reddit Comments
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('home'); setSelectedCategory('guides'); }} className="hover:text-[#FF4500] text-slate-500 transition-colors">
                  Reddit Marketing Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Integration links */}
          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Direct Navigation</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <button onClick={() => { setActiveTab('blog'); }} className="hover:text-[#FFB000] text-slate-500 transition-colors">
                  Strategic Marketing Blog
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('faqs'); }} className="hover:text-[#FFB000] text-slate-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('terms'); }} className="hover:text-[#FFB000] text-slate-400 transition-colors">
                  Terms of Service (66-2)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); }} className="hover:text-[#FF4500] text-slate-400 transition-colors">
                  Open Support Hub Ticket
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Badge & Accepted payments */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Cleared Payment Portals</h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              We facilitate automated hand-overs immediately following financial transaction clearance. Supported methods:
            </p>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-[#FFB000] font-semibold uppercase">
              <span className="p-1.5 bg-[#111726] border border-slate-800 rounded text-center">PayPal</span>
              <span className="p-1.5 bg-[#111726] border border-slate-800 rounded text-center">Google Pay</span>
              <span className="p-1.5 bg-[#111726] border border-slate-800 rounded text-center">Visa / Card</span>
              <span className="p-1.5 bg-[#111726] border border-slate-800 rounded text-center">Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Replica Store Copyrights block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-[#131b2c] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-600">
          <div>
            &copy; 2026 Buy Reddit accounts High karma and upvotes. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a href="https://inkhive.com/product/store/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-400 transition-colors underline bg-[#111726] px-1.5 py-0.5 rounded border border-slate-800">
              Store Theme
            </a>
          </div>
        </div>
      </footer>

      {/* Cart side-drawer utility slider */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
