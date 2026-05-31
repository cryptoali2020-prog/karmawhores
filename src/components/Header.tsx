/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShoppingCart, HelpCircle, FileText, Mail, BookOpen, Flame, Home, Facebook } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + (curr.product.salePrice || curr.product.originalPrice) * curr.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'boost', label: 'Boost Reddit Posts', icon: Flame },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'contact', label: 'Contact Us', icon: Mail },
    { id: 'terms', label: 'Terms of Service', icon: FileText }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d121f]/95 backdrop-blur-md border-b border-[#1e293b]">
      {/* Top Banner Tagline */}
      <div className="bg-[#111726] border-b border-[#1e293b] py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
            <span>24/7 Support: London-based Customer Service & Full Refund Policy</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/Reddit-accounts-for-sale-500910903614566/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-[#b8c2d1] flex items-center gap-1 transition-colors"
            >
              <Facebook size={13} className="text-[#1877F2]" />
              <span>Facebook Page</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-[#FFB000] font-medium">Guaranteed Delivery on Payment Cleared</span>
          </div>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#FF4500] shadow-lg shadow-[#FF4500]/20 mr-3">
              <span className="text-white font-bold text-xl title-font">K</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFB000] rounded-full border border-[#0d121f] flex items-center justify-center">
                <span className="text-[9px] text-[#0d121f] font-extrabold">✓</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-1.5">
                KarmaWhores
              </span>
              <span className="text-[10px] text-[#FFB000] font-mono tracking-widest uppercase">Premium Assets</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'boost' && (activeTab === 'reddit-comments' || activeTab === 'buy-reddit-posts'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FF4500]/10 text-[#FF4500] border-b-2 border-[#FF4500] rounded-b-none'
                      : 'text-slate-400 hover:bg-[#162035] hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons: Shopping Cart */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#162035] hover:bg-[#1f2d4a] group transition-all duration-200 text-slate-200 border border-[#27314a]"
              title="Shopping Cart"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform text-[#FFB000]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4500] text-[10px] font-bold text-white ring-2 ring-[#0d121f] animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Quick Total Indicator */}
            <div className="hidden sm:flex flex-col text-right text-xs mr-1 bg-[#111726]/80 px-3 py-1.5 rounded-lg border border-[#1e293b]">
              <span className="text-slate-500 font-mono">Cart Total</span>
              <span className="text-white font-semibold font-mono text-[#FFB000]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Responsive Responsive Mobile Burger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:bg-[#162035] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} className="text-[#FF4500]" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d17]/95 border-b border-[#1e293b] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'boost' && (activeTab === 'reddit-comments' || activeTab === 'buy-reddit-posts'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-[#FF4500]/15 text-[#FF4500] border-l-4 border-[#FF4500]'
                    : 'text-slate-300 hover:bg-[#162035] hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
