/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal
} from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { products } from './data';
import { Product, CartItem } from './types';
import logoImg from './assets/images/reddit_product_icon_1780251390780.png';

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
    <div className="min-h-screen bg-[#f0ebe0] flex flex-col selection:bg-brand-pink selection:text-white">
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Container Workspace */}
      <main className="flex-1 pb-16 animate-fade-in">
        {/* HERO BADGE HEADER */}
        <section className="relative overflow-hidden pt-12 pb-14 bg-[#ebdcb8]/45 border-b border-[#e3dac9]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cream via-transparent to-transparent opacity-60"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-xs text-brand-pink font-mono font-bold uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles size={12} className="text-brand-pink" />
              <span>Verified Aged Reputation Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-sans font-black text-brand-brown-dark tracking-tight leading-none mb-4 max-w-4xl mx-auto">
              Buy Premium <span className="text-brand-pink drop-shadow-[0_0.5px_rgba(255,255,255,0.7)]">Reddit Accounts</span> & Post Upvotes
            </h1>
            
            <p className="text-sm sm:text-base text-[#6c5547] max-w-2xl mx-auto leading-relaxed mb-8">
              Gain instant native authority to post and market organically. Our 24/7 London-based support team delivers unbanned, CMS-compliant aged digital assets backed by a full refund guarantee.
            </p>

            {/* Grid features info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
              <div className="p-4 bg-brand-cream/80 rounded-xl border border-[#e2d6be] flex items-center gap-3 shadow-xs">
                <span className="text-xl">🛡️</span>
                <div>
                  <h4 className="text-xs font-bold text-brand-brown-dark font-mono uppercase tracking-wide">100% Unbanned</h4>
                  <p className="text-[11px] text-[#6e584f]">Residential IP proxies</p>
                </div>
              </div>
              <div className="p-4 bg-brand-cream/80 rounded-xl border border-[#e2d6be] flex items-center gap-3 shadow-xs">
                <span className="text-xl">✈️</span>
                <div>
                  <h4 className="text-xs font-bold text-brand-brown-dark font-mono uppercase tracking-wide">Instant Dispatch</h4>
                  <p className="text-[11px] text-[#6e584f]">Automated secure node</p>
                </div>
              </div>
              <div className="p-4 bg-brand-cream/80 rounded-xl border border-[#e2d6be] flex items-center gap-3 shadow-xs">
                <span className="text-xl">💳</span>
                <div>
                  <h4 className="text-xs font-bold text-brand-brown-dark font-mono uppercase tracking-wide">4 Payment Types</h4>
                  <p className="text-[11px] text-[#6e584f]">PayPal, Card, G-Pay, Apple</p>
                </div>
              </div>
              <div className="p-4 bg-brand-cream/80 rounded-xl border border-[#e2d6be] flex items-center gap-3 shadow-xs">
                <span className="text-xl">🇬🇧</span>
                <div>
                  <h4 className="text-xs font-bold text-brand-brown-dark font-mono uppercase tracking-wide">London Support</h4>
                  <p className="text-[11px] text-[#6e584f]">Resolutions in Under 4 Hrs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATALOG WORKSPACE */}
        <section className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
          {/* Filter controls panel bar */}
          <div className="bg-brand-cream rounded-2xl border border-[#e4dcc9] p-5 mb-8 shadow-sm">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#ebdcb8]">
              <h3 className="text-base font-sans font-black text-brand-brown-dark flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-brand-pink" />
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
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                      selectedCategory === cat.id
                        ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                        : 'bg-white border-[#ebdcb8] text-brand-brown-medium hover:bg-[#ebdcb8]/30 hover:text-brand-pink'
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
                  placeholder="Search products (e.g. comment index, age, karma, wp ID)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#e0dac4] rounded-xl text-brand-brown-dark text-sm focus:outline-none focus:border-brand-pink pl-10"
                />
                <Search size={14} className="absolute left-3.5 top-3 text-[#9b8275]" />
              </div>

              {/* Pricing slider config */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <span className="text-xs text-[#8c7467] shrink-0 font-mono font-bold">Price Limit:</span>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-[#ebdcb8] rounded-lg cursor-pointer accent-brand-pink"
                />
                <span className="text-xs text-brand-pink font-mono font-extrabold shrink-0 min-w-[55px] text-right">
                  ${priceRange}
                </span>
              </div>

              {/* Ordering Select sorting - styled matching screenshot select box */}
              <div className="lg:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e0dac4] rounded-xl text-brand-brown-dark text-xs focus:outline-none focus:border-brand-pink"
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
            <div className="text-center py-24 bg-brand-cream rounded-3xl border border-dashed border-[#ddcea7]/70">
              <span className="text-5xl inline-block mb-3 animate-bounce">🔍</span>
              <p className="text-[#8c7467] font-bold">No digital store assets match your filter parameters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange(1000);
                }}
                className="mt-4 px-4 py-2 bg-brand-beige hover:bg-brand-beige-dark border border-[#c4b9a1] text-brand-brown-dark rounded-xl text-xs font-mono font-bold uppercase transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-5 px-1">
                <span className="text-xs text-[#8a7266] font-mono font-bold uppercase">
                  Showing 1–{filteredProducts.length} of {filteredProducts.length} results
                </span>
                <span className="text-[10px] text-[#7d2207] font-bold bg-[#ebdcb8]/55 px-2.5 py-0.5 rounded border border-[#ddcaa3] uppercase tracking-wide">
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
      </main>

      {/* FOOTER SIDEBAR AND REPLICA STORE CREDITS */}
      <footer id="colophon" className="bg-[#28140e] border-t border-[#3e271f] py-12 text-[#dec2b1] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-[#ec1c6d] mr-2.5 overflow-hidden">
                <img src={logoImg} alt="KarmaWhores Logo" className="w-5.5 h-5.5 object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-sans font-extrabold text-lg text-white">Karma<span className="text-[#ec1c6d]">Whores</span></span>
            </div>
            <p className="text-[#dec2b1]/70 leading-relaxed text-[11px]">
              24/7 support London-based customer service, Reddit accounts upvote and downvotes, Reddit multi-task campaigns with full refund policy.
            </p>
            <div className="flex gap-2">
              <span className="bg-[#1f0d08] border border-[#3e271f] rounded px-2.5 py-1 text-[10px] font-mono text-[#ebdcb8]">
                Est. London 2018
              </span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div>
            <h4 className="text-white font-sans font-black text-xs uppercase tracking-wider mb-4">Marketplace Segments</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <a 
                  href="https://karmawhores.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Aged Reddit Accounts ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/product-category/reddit-upvotes/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Reddit Upvotes & Seeding ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/product/post-reddit-comments/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Buy Custom Reddit Comments ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/product/comprehensive-reddit-beginners-guide-by-karmawhores/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Reddit Marketing Guide ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Integration links */}
          <div>
            <h4 className="text-white font-sans font-black text-xs uppercase tracking-wider mb-4">Direct Navigation</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <a 
                  href="https://karmawhores.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Strategic Marketing Blog ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Frequently Asked Questions ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Terms of Service (66-2) ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://karmawhores.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white text-[#dec2b1]/80 transition-colors"
                >
                  Open Support Hub Ticket ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Badge & Accepted payments */}
          <div className="space-y-4">
            <h4 className="text-white font-sans font-black text-xs uppercase tracking-wider mb-4">Cleared Payment Portals</h4>
            <p className="text-[#dec2b1]/70 leading-relaxed text-[11px]">
              We facilitate automated hand-overs immediately following financial transaction clearance. Supported methods:
            </p>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-[#ebdcb8] font-bold uppercase">
              <span className="p-1.5 bg-[#1f0d08] border border-[#3e271f] rounded text-center">PayPal</span>
              <span className="p-1.5 bg-[#1f0d08] border border-[#3e271f] rounded text-center">Google Pay</span>
              <span className="p-1.5 bg-[#1f0d08] border border-[#3e271f] rounded text-center">Visa / Card</span>
              <span className="p-1.5 bg-[#1f0d08] border border-[#3e271f] rounded text-center">Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Replica Store Copyrights block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-[#3e271f] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#dec2b1]/45">
          <div>
            &copy; 2026 Buy Reddit accounts High karma and upvotes. All Rights Reserved.
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
