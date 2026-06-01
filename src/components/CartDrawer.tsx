/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Lock, ArrowRight, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

type PaymentMethod = 'paypal' | 'googlepay' | 'cards' | 'applepay';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cards');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1); // 1: review, 2: details+payment, 3: success
  const [txProgress, setTxProgress] = useState(0);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [redditUsername, setRedditUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const totalPrice = cart.reduce((acc, curr) => acc + (curr.product.salePrice || curr.product.originalPrice) * curr.quantity, 0);
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const validateStep2 = () => {
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = "Full name is required.";
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      tempErrors.emailAddress = "Please enter a valid email address.";
    }

    if (selectedPayment === 'cards') {
      if (!cardNumber.trim() || cardNumber.length < 12) tempErrors.cardNumber = "Enter a valid card number.";
      if (!expiryDate.trim() || expiryDate.length < 4) tempErrors.expiryDate = "MM/YY is required.";
      if (!cvv.trim() || cvv.length < 3) tempErrors.cvv = "CVV is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsCheckingOut(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setTxProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCheckoutStep(3);
          setIsCheckingOut(false);
          onClearCart();
        }, 600);
      }
    }, 200);
  };

  const handleRestart = () => {
    setCheckoutStep(1);
    setTxProgress(0);
    setFullName('');
    setEmailAddress('');
    setTelegramId('');
    setRedditUsername('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-[#e4dcc9] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#e4dcc9] flex items-center justify-between bg-white">
            <h2 className="text-lg font-sans font-bold text-brand-brown-dark flex items-center gap-2">
              <span>Shopping Cart</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-pink text-white font-mono font-semibold">
                {totalItems} items
              </span>
            </h2>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-brand-pink hover:bg-slate-100 transition-colors">
              <X size={20} />
            </button>
          </div>

          {checkoutStep === 3 ? (
            /* STEP 3: TRANSACTION SUCCESS */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/30 mb-5 animate-pulse">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-xl font-sans font-black text-brand-brown-dark mb-2">Order Confirmed!</h3>
              <p className="text-xs text-[#6e584f] px-4 mb-6 leading-relaxed">
                Thank you for your order! Payment cleared successfully. Our automated delivery engine is dispatching secure instructions to <span className="text-brand-brown-dark font-semibold">{emailAddress}</span>.
              </p>
              
              <div className="w-full bg-white rounded-2xl p-5 border border-[#e4dcc9] text-left text-xs mb-8 shadow-xs">
                <div className="font-bold text-brand-pink uppercase tracking-wider mb-3 pb-2 border-b border-[#ebdcb8]">
                  Transaction Receipt Details
                </div>
                <div className="space-y-2 font-mono text-brand-brown-dark">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice No:</span>
                    <span className="text-brand-pink font-bold">KW-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Status:</span>
                    <span className="text-emerald-600 font-bold">Processing / Queue</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method:</span>
                    <span className="capitalize">{selectedPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Client:</span>
                    <span>{fullName}</span>
                  </div>
                  {telegramId && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Telegram contact:</span>
                      <span>@{telegramId}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="w-full py-3 px-5 rounded-xl bg-brand-beige hover:bg-brand-beige-dark border border-[#c4b9a1] text-brand-brown-dark font-sans font-bold transition-all text-sm cursor-pointer shadow-xs active:translate-y-0.5"
              >
                Return to Digital Shop
              </button>
            </div>
          ) : checkoutStep === 2 ? (
            /* STEP 2: DETAILS AND PAYMENT METHOD EXPLICIT INTEGRATION */
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-5 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3">1. Contact & Delivery Info</h3>
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-brand-brown-medium mb-1 font-mono">Full Name (*)</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 bg-white border border-[#ebdcb8] text-brand-brown-dark rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-brown-medium mb-1 font-mono">Email Address (*) <span className="text-[10px] text-slate-500 font-sans font-normal">(For credentials dispatch)</span></label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full px-3.5 py-2 bg-white border border-[#ebdcb8] text-brand-brown-dark rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                      />
                      {errors.emailAddress && <p className="text-[11px] text-rose-500 mt-1">{errors.emailAddress}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 font-mono text-[10px]">Telegram ID <span className="text-slate-500 font-sans font-normal">(Opt)</span></label>
                        <input
                          type="text"
                          value={telegramId}
                          onChange={(e) => setTelegramId(e.target.value)}
                          placeholder="johndoe_tg"
                          className="w-full px-3 py-1.5 bg-white border border-[#ebdcb8] text-brand-brown-dark rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 font-mono text-[10px]">Reddit User <span className="text-slate-500 font-sans font-normal">(Opt)</span></label>
                        <input
                          type="text"
                          value={redditUsername}
                          onChange={(e) => setRedditUsername(e.target.value)}
                          placeholder="u/reddit_user"
                          className="w-full px-3 py-1.5 bg-white border border-[#ebdcb8] text-brand-brown-dark rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3">2. Choose Payment Method</h3>
                  
                  {/* Tab Selector buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('cards')}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedPayment === 'cards'
                          ? 'bg-white border-brand-pink text-brand-pink shadow-xs font-bold'
                          : 'bg-white border-[#ebdcb8] text-brand-brown-medium hover:border-[#ebdcb8]/80'
                      }`}
                    >
                      <CreditCard size={15} className="mb-1" />
                      <span className="text-[9px] font-semibold font-mono tracking-tight leading-none">Cards</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('paypal')}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedPayment === 'paypal'
                          ? 'bg-white border-brand-pink text-brand-pink shadow-xs font-bold'
                          : 'bg-white border-[#ebdcb8] text-brand-brown-medium hover:border-[#ebdcb8]/80'
                      }`}
                    >
                      <span className="text-[12px] font-bold text-sky-700 mb-1 italic">PP</span>
                      <span className="text-[9px] font-semibold font-mono tracking-tight leading-none">PayPal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('googlepay')}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedPayment === 'googlepay'
                          ? 'bg-white border-brand-pink text-brand-pink shadow-xs font-bold'
                          : 'bg-white border-[#ebdcb8] text-brand-brown-medium hover:border-[#ebdcb8]/80'
                      }`}
                    >
                      <span className="text-xs font-black text-brand-brown-dark mb-1">G Pay</span>
                      <span className="text-[9px] font-semibold font-mono tracking-tight leading-none">Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('applepay')}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedPayment === 'applepay'
                          ? 'bg-white border-brand-pink text-brand-pink shadow-xs font-bold'
                          : 'bg-white border-[#ebdcb8] text-brand-brown-medium hover:border-[#ebdcb8]/80'
                      }`}
                    >
                      <Smartphone size={15} className="mb-1 text-black" />
                      <span className="text-[9px] font-semibold font-mono tracking-tight leading-none">Apple Pay</span>
                    </button>
                  </div>

                  {/* Payment Panels Context */}
                  <div className="bg-white border border-[#e4dcc9] rounded-2xl p-4">
                    {selectedPayment === 'cards' && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-[#ebdcb8]">
                          <span className="font-semibold text-brand-brown-medium">Secure Card Processing</span>
                          <Lock size={12} className="text-emerald-600 inline" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono font-bold text-[#8c7467] mb-1 uppercase">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                            className="w-full px-3 py-2 bg-white border border-[#ebdcb8] rounded-lg text-brand-brown-dark text-sm focus:outline-none focus:border-brand-pink"
                          />
                          {errors.cardNumber && <p className="text-[11px] text-rose-500 mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono font-bold text-[#8c7467] mb-1 uppercase">Expiry Date</label>
                            <input
                              type="text"
                              value={expiryDate}
                              placeholder="MM/YY"
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#ebdcb8] rounded-lg text-brand-brown-dark text-sm focus:outline-none focus:border-brand-pink"
                            />
                            {errors.expiryDate && <p className="text-[11px] text-rose-500 mt-1">{errors.expiryDate}</p>}
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono font-bold text-[#8c7467] mb-1 uppercase">CVV / Code</label>
                            <input
                              type="password"
                              value={cvv}
                              placeholder="123"
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#ebdcb8] rounded-lg text-brand-brown-dark text-sm focus:outline-none focus:border-brand-pink"
                            />
                            {errors.cvv && <p className="text-[11px] text-rose-500 mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPayment === 'paypal' && (
                      <div className="text-center py-4 bg-amber-50/40 rounded-xl border border-amber-100">
                        <span className="inline-block bg-[#ffc439] hover:bg-[#f2ba36] text-[#003087] font-sans font-bold text-xs tracking-tight px-6 py-2 rounded-lg shadow-xs cursor-pointer select-none">
                          PayPal Express Checkout Active
                        </span>
                        <p className="text-[11px] text-[#6e584f] mt-3 leading-relaxed px-4">
                          Secure wallet verification window will open shortly to authorize token clearance.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'googlepay' && (
                      <div className="text-center py-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="inline-flex items-center justify-center bg-white text-black px-6 py-1.5 rounded-lg font-bold border border-slate-300 select-none text-xs gap-1.5 shadow-xs">
                          <span className="text-blue-500">G</span> Pay
                        </div>
                        <p className="text-[11px] text-[#6e584f] mt-3 leading-relaxed px-4">
                          Immediate debit from linked Google Account credit profiles.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'applepay' && (
                      <div className="text-center py-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="inline-flex items-center justify-center bg-black text-white px-6 py-1.5 rounded-lg font-bold select-none text-xs gap-1 shadow-xs">
                           Pay
                        </div>
                        <p className="text-[11px] text-[#6e584f] mt-3 leading-relaxed px-4">
                          Express biometric transaction validation using Apple Keychain profiles.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5 p-3.5 bg-[#ebdcb8]/40 border border-[#ddcaa3] rounded-xl text-xs text-[#6e584f]">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-brand-pink" />
                  <div>
                    <span className="font-bold block mb-0.5 text-brand-brown-dark">Automated Asset Verification</span>
                    Accounts are dispatched instantly via automated secure email nodes following check verification. Custom Comment services initiate within 30-45 minutes.
                  </div>
                </div>
              </div>

              {/* Steps footer controls */}
              <div className="p-5 border-t border-[#e4dcc9] bg-[#ebdcb8]/20">
                <div className="flex justify-between items-baseline mb-4 text-sm font-mono">
                  <span className="text-slate-500 font-bold">Invoice Sum total:</span>
                  <span className="text-xl font-extrabold text-[#7d2207]">${totalPrice.toFixed(2)}</span>
                </div>

                {isCheckingOut ? (
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-pink" style={{ width: `${txProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-[#8c7467]">
                      <span>Verifying clearance...</span>
                      <span>{txProgress}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="py-3 px-4 rounded-xl border border-[#ebdcb8] bg-white text-[#6e584f] hover:text-brand-brown-dark transition-all text-sm font-semibold cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-4 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold transition-all text-sm flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-brand-pink/10"
                    >
                      <span>Pay Now</span>
                      <ArrowRight size={14} className="text-white" />
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            /* STEP 1: TYPICAL CART SHOPPING LIST */
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <span className="text-slate-400 mb-4 text-5xl">🛒</span>
                    <h3 className="text-base font-sans font-bold text-brand-brown-dark mb-1">Your cart is empty</h3>
                    <p className="text-xs text-[#8c7467] max-w-[250px] leading-relaxed">
                      Explore our high-quality aged Reddit profiles and custom engagement posts to start stacking!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-5 py-2 px-5 rounded-lg bg-white hover:bg-slate-50 text-brand-brown-dark border border-[#ebdcb8] text-xs transition-colors cursor-pointer font-semibold font-sans"
                    >
                      Browse Digital Store
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const price = item.product.salePrice ?? item.product.originalPrice;
                    return (
                      <div key={item.product.id} className="flex gap-3 p-3 rounded-xl bg-white border border-[#e4dcc9] hover:border-brand-pink/30 transition-colors shadow-2xs">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-contain bg-[#f0ebe0] border border-[#e4dcc9] p-1 shrink-0"
                        />
                        <div className="flex-1 flex flex-col min-w-0">
                          <h4 className="text-xs font-bold text-brand-brown-dark truncate pr-4" title={item.product.title}>
                            {item.product.title}
                          </h4>
                          <span className="text-[10px] font-mono uppercase text-[#a62c0b] font-bold mt-0.5">
                            ID: #{item.product.wpId}
                          </span>
                          
                          <div className="flex items-center justify-between mt-auto pt-1">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#ebdcb8]">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="p-0.5 rounded text-[#8c7467] hover:text-brand-pink hover:bg-slate-100 transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-mono font-bold text-brand-brown-dark px-1.5">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-0.5 rounded text-[#8c7467] hover:text-brand-pink hover:bg-slate-100 transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-bold text-brand-brown-dark font-mono">
                                ${(price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-brand-pink hover:bg-slate-50 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer footer summing block */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#e4dcc9] bg-white space-y-4">
                  <div className="space-y-1.5 text-xs text-[#8c7467]">
                    <div className="flex justify-between font-mono">
                      <span>Total items counts:</span>
                      <span className="text-brand-brown-medium font-bold">{totalItems} units</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Automated secure dispatch:</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-[#e4dcc9] text-brand-brown-dark font-mono">
                      <span>Final Subtotal:</span>
                      <span className="text-[#a62c0b] font-extrabold">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-3 px-4 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white font-bold transition-all text-sm flex items-center justify-center gap-1.5 shadow-md shadow-brand-pink/10 cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
