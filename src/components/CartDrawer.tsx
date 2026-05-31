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
        <div className="w-screen max-w-md bg-[#120e0a] border-l border-[#2c2016] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#2c2016] flex items-center justify-between bg-[#1c1611]">
            <h2 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <span>Shopping Cart</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#c59b27] text-white font-mono font-bold">
                {totalItems} items
              </span>
            </h2>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X size={20} />
            </button>
          </div>

          {checkoutStep === 3 ? (
            /* STEP 3: TRANSACTION SUCCESS */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/30 mb-5 animate-pulse">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Order Confirmed!</h3>
              <p className="text-sm text-slate-400 px-4 mb-6 leading-relaxed">
                Thank you for your order! Payment cleared successfully. Our automated delivery engine is dispatching secure instructions to <span className="text-white font-semibold">{emailAddress}</span>.
              </p>
              
              <div className="w-full bg-[#1c1611] rounded-2xl p-5 border border-[#2c2016] text-left text-xs mb-8">
                <div className="font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
                  Transaction Receipt Details
                </div>
                <div className="space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice No:</span>
                    <span className="text-[#dfba6b]">KW-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Status:</span>
                    <span className="text-emerald-400">Processing / Queue</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method:</span>
                    <span className="capitalize text-slate-300">{selectedPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Client:</span>
                    <span className="text-slate-300">{fullName}</span>
                  </div>
                  {telegramId && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Telegram contact:</span>
                      <span className="text-slate-300">@{telegramId}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-white transition-all text-sm cursor-pointer"
              >
                Return to Digital Shop
              </button>
            </div>
          ) : checkoutStep === 2 ? (
            /* STEP 2: DETAILS AND PAYMENT METHOD EXPLICIT INTEGRATION */
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-5 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">1. Contact & Delivery Info</h3>
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Full Name (*)</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 bg-[#1c1611] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Email Address (*) <span className="text-[10px] text-slate-500">(For automated credential delivery)</span></label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full px-3 py-2 bg-[#1c1611] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                      />
                      {errors.emailAddress && <p className="text-[11px] text-rose-500 mt-1">{errors.emailAddress}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Telegram ID <span className="text-slate-500">(Optional)</span></label>
                        <input
                          type="text"
                          value={telegramId}
                          onChange={(e) => setTelegramId(e.target.value)}
                          placeholder="johndoe_tg"
                          className="w-full px-3 py-2 bg-[#1c1611] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Reddit username <span className="text-slate-500">(Optional)</span></label>
                        <input
                          type="text"
                          value={redditUsername}
                          onChange={(e) => setRedditUsername(e.target.value)}
                          placeholder="u/reddit_user"
                          className="w-full px-3 py-2 bg-[#1c1611] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">2. Choose Payment Method</h3>
                  
                  {/* Tab Selector buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('cards')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                        selectedPayment === 'cards'
                          ? 'bg-[#2a1f16] border-[#c59b27] text-[#c59b27]'
                          : 'bg-[#1c1611] border-[#2c2016] text-[#dfba6b] hover:border-[#c59b27]'
                      }`}
                    >
                      <CreditCard size={18} className="mb-1" />
                      <span className="text-[10px] font-semibold font-mono tracking-tight leading-none">Cards</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('paypal')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                        selectedPayment === 'paypal'
                          ? 'bg-[#2a1f16] border-[#dfba6b] text-[#dfba6b]'
                          : 'bg-[#1c1611] border-[#2c2016] text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[13px] font-bold text-[#dfba6b] mb-1 italic">PP</span>
                      <span className="text-[10px] font-semibold font-mono tracking-tight leading-none">PayPal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('googlepay')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                        selectedPayment === 'googlepay'
                          ? 'bg-[#2a1f16] border-white text-white'
                          : 'bg-[#1c1611] border-[#2c2016] text-slate-400 hover:border-slate-750'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-[#dfba6b] mb-1">G Pay</span>
                      <span className="text-[10px] font-semibold font-mono tracking-tight leading-none">Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('applepay')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all ${
                        selectedPayment === 'applepay'
                          ? 'bg-[#2a1f16] border-[#c59b27] text-white'
                          : 'bg-[#1c1611] border-[#2c2016] text-slate-400 hover:border-slate-750'
                      }`}
                    >
                      <Smartphone size={18} className="mb-1 text-white" />
                      <span className="text-[10px] font-semibold font-mono tracking-tight leading-none">Apple Pay</span>
                    </button>
                  </div>

                  {/* Payment Panels Context */}
                  <div className="bg-[#1c1611] border border-[#2c2016] rounded-2xl p-4.5">
                    {selectedPayment === 'cards' && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-850">
                          <span>Secure Card Processing</span>
                          <Lock size={12} className="text-emerald-400 inline" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                            className="w-full px-3 py-2 bg-[#0f0b08] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                          />
                          {errors.cardNumber && <p className="text-[11px] text-rose-500 mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Expiry Date</label>
                            <input
                              type="text"
                              value={expiryDate}
                              placeholder="MM/YY"
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="w-full px-3 py-2 bg-[#0f0b08] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                            />
                            {errors.expiryDate && <p className="text-[11px] text-rose-500 mt-1">{errors.expiryDate}</p>}
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">CVV / Code</label>
                            <input
                              type="password"
                              value={cvv}
                              placeholder="123"
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full px-3 py-2 bg-[#0f0b08] border border-[#2c2016] rounded-lg text-white text-sm focus:outline-none focus:border-[#c59b27]"
                            />
                            {errors.cvv && <p className="text-[11px] text-rose-500 mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPayment === 'paypal' && (
                      <div className="text-center py-4">
                        <span className="inline-block bg-[#ffc439] hover:bg-[#f2ba36] text-[#003087] font-semibold italic text-sm tracking-tight px-8 py-2 rounded-lg shadow-sm border border-[#e1b332]">
                          PayPal Express Checkout Active
                        </span>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                          Secure wallet verification window will open shortly to authorization token clearance.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'googlepay' && (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center bg-white text-black px-8 py-2 rounded-lg font-bold border border-slate-350 select-none text-sm gap-2">
                          <span className="text-lg">G</span> Pay
                        </div>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                          Immediate debit from linked Google Account credit profiles.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'applepay' && (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center bg-black text-white px-8 py-2.5 rounded-lg font-bold border border-neutral-800 select-none text-sm gap-1">
                           Pay
                        </div>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                          Express biometric transaction validation using Apple Keychain profiles.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Automated Asset Verification</span>
                    Accounts are dispatched instantly via automated secure email nodes following check verification. Custom Comment services initiate within 30-45 minutes.
                  </div>
                </div>
              </div>

              {/* Steps footer controls */}
              <div className="p-5 border-t border-[#2c2016] bg-[#1c1611]/70">
                <div className="flex justify-between items-baseline mb-4 text-sm font-mono">
                  <span className="text-slate-400">Invoice Sum total:</span>
                  <span className="text-xl font-bold text-[#dfba6b]">${totalPrice.toFixed(2)}</span>
                </div>

                {isCheckingOut ? (
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#c59b27]" style={{ width: `${txProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Verifying clearance...</span>
                      <span>{txProgress}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="py-3 px-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all text-sm font-semibold"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-4 rounded-xl bg-[#c59b27] hover:bg-[#a87f18] text-white transition-all text-sm font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Pay Now</span>
                      <ArrowRight size={14} />
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
                    <span className="text-slate-600 mb-4 text-5xl">🛒</span>
                    <h3 className="text-base font-display font-medium text-slate-300 mb-1">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 max-w-[250px] leading-relaxed">
                      Explore our high-quality aged Reddit profiles and custom engagement posts to start stacking!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-5 py-2 px-5 rounded-lg bg-[#2a1f16] text-slate-300 hover:text-white border border-[#3d2f23] text-xs transition-colors"
                    >
                      Browse Digital Store
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const price = item.product.salePrice ?? item.product.originalPrice;
                    return (
                      <div key={item.product.id} className="flex gap-3 p-3 rounded-xl bg-[#1c1611]/60 border border-[#2c2016] hover:border-slate-800 transition-colors">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-850 shrink-0"
                        />
                        <div className="flex-1 flex flex-col min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate pr-4" title={item.product.title}>
                            {item.product.title}
                          </h4>
                          <span className="text-[10px] font-mono uppercase text-slate-500 mt-0.5">
                            ID: #{item.product.wpId}
                          </span>
                          
                          <div className="flex items-center justify-between mt-auto pt-1">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-[#0f0b08] p-1 rounded-lg border border-[#2c2016]">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-850 transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-mono font-medium text-white px-1.5">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-850 transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-bold text-[#dfba6b] font-mono">
                                ${(price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-500 align-top hover:bg-slate-850 transition-colors shrink-0"
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
                <div className="p-5 border-t border-[#2c2016] bg-[#1c1611] space-y-4">
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between font-mono">
                      <span>Total items counts:</span>
                      <span className="text-slate-200">{totalItems} units</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Automated secure dispatch:</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-slate-850 text-white font-mono">
                      <span>Final Subtotal:</span>
                      <span className="text-[#dfba6b]">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-3 px-4 rounded-xl bg-[#c59b27] hover:bg-[#a87f18] text-white font-semibold transition-all text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-[#c59b27]/25 hover:shadow-[#c59b27]/45 cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} />
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
