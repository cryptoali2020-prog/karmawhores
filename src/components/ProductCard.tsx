/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, ExternalLink, Calendar, Award, CheckCircle2, User, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const finalPrice = product.salePrice ?? product.originalPrice;
  const isSale = !!product.salePrice;
  const discountPercent = isSale 
    ? Math.round(((product.originalPrice - product.salePrice!) / product.originalPrice) * 100) 
    : 0;

  // Render correct badge icon according to categories
  const getCategoryBadge = () => {
    switch (product.category) {
      case 'reddit-accounts':
        return <span className="bg-brand-brown-medium/5 text-brand-brown-medium text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-md border border-brand-brown-medium/20">Reddit Account</span>;
      case 'reddit-posts':
        return <span className="bg-brand-pink/5 text-brand-pink text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-md border border-brand-pink/20">Reddit Posts</span>;
      case 'reddit-comments':
        return <span className="bg-brand-pink/5 text-brand-pink text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-md border border-brand-pink/20">Reddit Comments</span>;
      case 'guides':
        return <span className="bg-brand-brown-dark/5 text-brand-brown-dark text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-md border border-brand-brown-dark/25">Strategy Guide</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`relative flex flex-col bg-brand-cream rounded-2xl overflow-hidden border ${product.isOutOfStock ? 'border-dashed border-slate-300 opacity-70' : 'border-[#e0d9ca] hover:border-brand-pink/40'} transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5`}>
      {/* Discount / Category Badges overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {getCategoryBadge()}
        {isSale && !product.isOutOfStock && (
          <span className="bg-brand-pink text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Card Image */}
      <div className="relative aspect-video overflow-hidden bg-[#faf8f2] border-b border-[#ebdcb8]/20 group-hover:opacity-95 transition-opacity">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2 scale-105 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/40 to-transparent"></div>
        
        {/* Out of stock banner overlay */}
        {product.isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <span className="border-2 border-brand-pink text-brand-pink font-display font-semibold uppercase tracking-widest text-xs px-3.5 py-1.5 rounded-lg rotate-12">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Main Contents description */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="title-font font-bold text-brand-brown-dark group-hover:text-brand-pink transition-colors line-clamp-2 min-h-[2.5rem] tracking-tight leading-snug text-sm mb-3">
          {product.title}
        </h3>

        {/* Detailed accounts metric bar if relevant */}
        {product.category === 'reddit-accounts' && (
          <div className="grid grid-cols-3 gap-1 py-3 px-2 rounded-xl bg-[#f5f1e6] border border-[#e0dac4] mb-3.5 text-[11px] font-mono">
            <div className="flex flex-col items-center text-center">
              <Calendar size={13} className="text-brand-brown-medium mb-1" />
              <span className="text-[9px] text-[#8c7467] uppercase font-bold tracking-tight">Age</span>
              <span className="text-brand-brown-dark font-medium text-[10px] truncate w-full">{product.age || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-[#e0dac4]">
              <Award size={13} className="text-brand-pink mb-1" />
              <span className="text-[9px] text-[#8c7467] uppercase font-bold tracking-tight">Post K</span>
              <span className="text-brand-brown-dark font-bold text-[10px] font-mono">
                {product.postKarma?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <User size={13} className="text-brand-brown-medium/80 mb-1" />
              <span className="text-[9px] text-[#8c7467] uppercase font-bold tracking-tight">Comm K</span>
              <span className="text-brand-brown-dark font-medium text-[10px] font-mono">
                {product.commentKarma?.toLocaleString() || '0'}
              </span>
            </div>
          </div>
        )}

        {/* Static specifications if relevant */}
        {product.category !== 'reddit-accounts' && (
          <div className="flex items-center gap-2 mb-3.5 text-xs font-medium bg-[#f5f1e6] p-2.5 rounded-xl border border-[#e0dac4] text-[#6c5547] font-mono">
            <CheckCircle2 size={13} className="text-brand-pink" />
            <span>Instant priority delivery</span>
          </div>
        )}

        <p className="text-xs text-[#6e584f] line-clamp-3 mb-4.5 leading-relaxed">
          {product.description}
        </p>

        {/* Tags badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {product.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ebdcb8]/40 border border-[#ddcaa3]/40 text-brand-brown-medium uppercase tracking-tight">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Pricing structure & transactional buttons */}
        <div className="flex items-center justify-between pt-3.5 border-t border-[#e3dac9] mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-mono text-[#8a7266] font-bold tracking-wider leading-none mb-1">Portfolio Price</span>
            <div className="flex items-baseline gap-1.5">
              {isSale && (
                <span className="text-xs text-[#8a7266] line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-extrabold font-mono text-[#a62c0b]">
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Original Listing */}
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-brand-brown-medium hover:text-brand-pink bg-[#ebdcb8]/45 hover:bg-[#ebdcb8]/75 border border-[#ddcac0]/70 transition-all cursor-pointer"
              title="Visit Original Store Link"
            >
              <ExternalLink size={14} />
            </a>

            {!product.isOutOfStock ? (
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-brand-beige hover:bg-brand-beige-dark text-brand-brown-dark font-sans font-bold text-xs transition-all cursor-pointer border border-[#c4b9a1]/80 hover:border-[#b1a48c] active:translate-y-0.5"
              >
                <ShoppingCart size={13} className="text-brand-brown-dark" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                disabled
                className="py-2 px-3.5 rounded-xl bg-slate-200 text-slate-400 text-xs font-semibold cursor-not-allowed uppercase"
              >
                Sold Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
