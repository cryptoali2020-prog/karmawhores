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
        return <span className="bg-[#c59b27]/10 text-[#c59b27] text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-1 rounded-md border border-[#c59b27]/20">Reddit Account</span>;
      case 'reddit-posts':
        return <span className="bg-[#dfba6b]/10 text-[#dfba6b] text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-1 rounded-md border border-[#dfba6b]/20">Reddit Posts</span>;
      case 'reddit-comments':
        return <span className="bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-1 rounded-md border border-indigo-500/20">Reddit Comments</span>;
      case 'guides':
        return <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-1 rounded-md border border-emerald-500/20">Strategy Guide</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`relative flex flex-col bg-[#1c1611] rounded-2xl overflow-hidden border ${product.isOutOfStock ? 'border-dashed border-slate-700 opacity-75' : 'border-[#2c2016] hover:border-[#c59b27]/40'} transition-all duration-300 group shadow-md shadow-black/10`}>
      {/* Discount / Category Badges overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {getCategoryBadge()}
        {isSale && !product.isOutOfStock && (
          <span className="bg-[#c59b27] text-white text-xs font-bold font-mono px-2 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Card Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-900 group-hover:opacity-90 transition-opacity">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1611] to-transparent opacity-60"></div>
        
        {/* Out of stock banner overlay */}
        {product.isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-xs">
            <span className="border-2 border-rose-500 text-rose-500 font-display font-semibold uppercase tracking-widest text-xs px-4 py-1.5 rounded-lg rotate-12">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Main Contents description */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="title-font font-semibold text-white group-hover:text-[#c59b27] transition-colors line-clamp-2 min-h-[2.5rem] tracking-tight leading-snug text-base mb-2">
          {product.title}
        </h3>

        {/* Detailed accounts metric bar if relevant */}
        {product.category === 'reddit-accounts' && (
          <div className="grid grid-cols-3 gap-1.5 py-3.5 px-3 rounded-xl bg-[#0f0b08] border border-[#2c2016] mb-4 text-xs font-mono">
            <div className="flex flex-col items-center text-center">
              <Calendar size={13} className="text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 uppercase">Age</span>
              <span className="text-white font-medium text-[11px] truncate w-full">{product.age || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-[#2b1f15]">
              <Award size={13} className="text-[#dfba6b] mb-1" />
              <span className="text-[10px] text-slate-500 uppercase">Post Karma</span>
              <span className="text-white font-medium text-[11px] font-mono text-[#dfba6b]">
                {product.postKarma?.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <User size={13} className="text-[#e2be75] mb-1" />
              <span className="text-[10px] text-slate-500 uppercase">Comment K</span>
              <span className="text-white font-medium text-[11px] font-mono text-[#e2be75]">
                {product.commentKarma?.toLocaleString() || '0'}
              </span>
            </div>
          </div>
        )}

        {/* Static specifications if relevant */}
        {product.category !== 'reddit-accounts' && (
          <div className="flex items-center gap-2 mb-4 text-xs font-medium bg-[#0f0b08] p-2.5 rounded-xl border border-[#2c2016] text-slate-400 font-mono">
            <CheckCircle2 size={13} className="text-[#c59b27]" />
            <span>Instant & Automated Priority Delivery</span>
          </div>
        )}

        <p className="text-xs text-slate-400 line-clamp-3 mb-5 leading-relaxed">
          {product.description}
        </p>

        {/* Tags badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {product.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 roundedbg rounded-md bg-[#2a1f16] text-slate-400 uppercase tracking-tight">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Pricing structure & transactional buttons */}
        <div className="flex items-end justify-between pt-4 border-t border-[#2c2016] mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-slate-500">Price Portfolio</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-[#dfba6b]">
                ${finalPrice.toFixed(2)}
              </span>
              {isSale && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Original Listing - absolutely essential so no original wordpress links are lost! */}
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#2a1f16] hover:bg-[#382a1e] border border-[#3d2f23] transition-all"
              title="Visit Original Store Link"
            >
              <ExternalLink size={15} />
            </a>

            {!product.isOutOfStock ? (
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-[#c59b27] hover:bg-[#a87f18] text-white text-xs font-semibold shadow-md shadow-[#c59b27]/15 hover:shadow-[#c59b27]/30 transition-all cursor-pointer"
              >
                <ShoppingCart size={13} />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                disabled
                className="py-2 px-3.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed uppercase"
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
