/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShoppingCart, HelpCircle, FileText, Mail, BookOpen, Flame, Home, Facebook, Search } from 'lucide-react';
import { CartItem } from '../types';
import logoImg from '../assets/images/reddit_product_icon_1780251390780.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen, searchTerm, setSearchTerm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + (curr.product.salePrice || curr.product.originalPrice) * curr.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, url: '#' },
    { id: 'boost', label: 'Boost Reddit Posts', icon: Flame, url: 'https://karmawhores.com/product-category/reddit-upvotes/' },
    { id: 'blog', label: 'Blog', icon: BookOpen, url: 'https://karmawhores.com/' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, url: 'https://karmawhores.com/' },
    { id: 'contact', label: 'Contact Us', icon: Mail, url: 'https://karmawhores.com/' },
    { id: 'terms', label: 'Terms of Service', icon: FileText, url: 'https://karmawhores.com/' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4e352b] shadow-md border-b border-[#28140e]">
      
      {/* Top Header Row (Genuine Cocoa bar matching screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo element on the left with high-fidelity hot-pink highlights */}
          <div className="flex items-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border-2 border-[#ec1c6d] mr-3 overflow-hidden">
              <img src={logoImg} alt="KarmaWhores Logo" className="w-7 h-7 object-contain animate-pulse" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#ec1c6d] rounded-full border border-white flex items-center justify-center">
                <span className="text-[8px] text-white font-black">✓</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-2xl text-white tracking-normal leading-none flex items-center">
                Karma<span className="text-[#ec1c6d] ml-0.5 font-black drop-shadow-[0_1px_rgba(0,0,0,0.5)]">Whores</span>
              </span>
              <span className="text-[10px] text-[#dec2b1] tracking-wide font-medium uppercase font-mono">Premium Aged Assets</span>
            </div>
          </div>

          {/* Screenshot-matched integrated Search Bar */}
          <div className="w-full max-w-md flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-[#704d40] placeholder-[#dec2b1] border border-[#3e271f] text-white text-sm rounded-l-md focus:outline-none focus:bg-[#7b5547] focus:border-[#28140e]"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-2 text-[#dec2b1] hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
            <button className="bg-[#28140e] text-[#dfd5bd] px-4 py-2.5 rounded-r-md border-y border-r border-[#3e271f] hover:bg-black hover:text-white transition-colors">
              <Search size={15} />
            </button>
          </div>

          {/* Genuine Shopping Cart Summary widget on the right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#3e271f] hover:bg-[#28140e] border border-[#2c1912] text-[#dfd5bd] hover:text-white transition-all cursor-pointer shadow-sm group"
            >
              <ShoppingCart size={15} className="group-hover:scale-110 transition-transform text-white" />
              <span className="font-mono text-xs font-semibold">
                {totalItems} items <span className="text-[#dec2b1] mx-1">|</span> <span className="text-white">${totalPrice.toFixed(2)}</span>
              </span>
            </button>

            {/* Mobile Burger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white hover:bg-[#3e271f] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} className="text-[#ec1c6d]" /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Navigation Row (Mahogany / Roasted dark coffee background) */}
      <div className="bg-[#28140e] border-t border-[#3e271f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            
            {/* Nav links on secondary header line */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isHome = item.id === 'home';
                return isHome ? (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick('home')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'home'
                        ? 'bg-[#ec1c6d] text-white shadow-sm'
                        : 'text-[#dec2b1] hover:bg-[#3e271f] hover:text-white'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-all text-[#dec2b1] hover:bg-[#3e271f] hover:text-[#ec1c6d]"
                  >
                    <Icon size={12} />
                    <span>{item.label}</span>
                    <span className="text-[9px] text-[#dec2b1]/60">↗</span>
                  </a>
                );
              })}
            </nav>

            {/* Quiet tag or banner info on the right menu shelf */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#dec2b1] uppercase tracking-wider font-semibold">
              <span className="inline-block w-2- h-2 rounded bg-emerald-500 animate-pulse mr-1"></span>
              <span>EST. LONDON 2018</span>
              <span className="text-[#3e271f] mx-2">|</span>
              <a 
                href="https://www.facebook.com/Reddit-accounts-for-sale-500910903614566/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors text-[#dec2b1]"
              >
                Facebook Page ↗
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Responsive Responsive Mobile Burger Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#28140e] border-t border-[#3e271f] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isHome = item.id === 'home';
            return isHome ? (
              <button
                key={item.id}
                onClick={() => handleNavClick('home')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-wider font-mono uppercase transition-all ${
                  activeTab === 'home'
                    ? 'bg-[#ec1c6d] text-white border-l-4 border-[#ff006d]'
                    : 'text-[#dec2b1] hover:bg-[#3e271f] hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            ) : (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-wider font-mono uppercase text-[#dec2b1] hover:bg-[#3e271f] hover:text-[#ec1c6d]"
              >
                <Icon size={14} />
                <span>{item.label}</span>
                <span className="text-[11px] text-[#dec2b1]/70 ml-auto font-sans">↗</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
