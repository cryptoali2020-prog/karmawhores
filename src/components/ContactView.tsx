/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Phone, CheckCircle, Send, Globe, Facebook } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('accounts');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      // Auto close success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono text-[#c59b27] uppercase tracking-widest bg-[#c59b27]/10 px-3 py-1 rounded-full border border-[#c59b27]/20">
          Reach Our Support Desk
        </span>
        <h2 className="text-3xl sm:text-4xl title-font font-bold text-white mt-3 mb-4 tracking-tight">
          24/7 London-Based Customer Support
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Need a custom aged-accounts batch, bulk discount, or assistance setting up comment streams? Email our support team directly. We resolve all inquiries in under 4 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Support coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#231a12] rounded-2xl border border-[#3d2b1c] p-6 shadow-md shadow-black/10">
            <h3 className="text-lg font-display font-semibold text-white mb-5 pb-3 border-b border-slate-800">
              Support Touchpoints
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#c59b27]/10 text-[#c59b27] rounded-xl shrink-0 border border-[#c59b27]/15">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Office Location</h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">London, EC1A 1BB, United Kingdom</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#dfba6b]/10 text-[#dfba6b] rounded-xl shrink-0 border border-[#dfba6b]/15">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Email Address</h4>
                  <a href="mailto:support@karmawhores.com" className="text-xs text-slate-400 mt-0.5 hover:text-[#dfba6b] font-mono block">
                    support@karmawhores.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl shrink-0 border border-sky-500/15">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Helpline Support</h4>
                  <span className="text-xs text-slate-400 mt-0.5 font-mono block">
                    +44 20 7946 0192 (Line 24/7 active)
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 border border-emerald-500/15">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Warranty Guarantee</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    All processed payments are backed by our clean 14-days conditional hand-over replacement or full-refund guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social connection list */}
          <div className="bg-[#231a12] rounded-2xl border border-[#3d2b1c] p-6 shadow-md shadow-black/10">
            <h4 className="text-sm font-semibold text-white mb-3">Core Social Profiles</h4>
            <div className="space-y-3">
              <a
                href="https://www.facebook.com/Reddit-accounts-for-sale-500910903614566/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#35261a] hover:bg-[#473424] text-slate-300 hover:text-white transition-all text-xs border border-[#4a3523]"
              >
                <Facebook size={16} className="text-[#1877F2]" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold">Facebook Official Fan-Page</span>
                  <span className="text-[10px] text-slate-500">reddit-accounts-for-sale</span>
                </div>
              </a>
              
              <div className="flex gap-2.5 p-3.5 bg-[#110b07] rounded-xl text-slate-500 text-[11px] items-center border border-[#3d2b1c]">
                <Globe size={14} className="shrink-0" />
                <span>Default GMT Office Hours: Monday - Sunday, 00:00 - 24:00.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7 bg-[#231a12] rounded-2xl border border-[#3d2b1c] p-6 sm:p-8 shadow-md shadow-black/10">
          <h3 className="text-lg font-display font-semibold text-white mb-1">
            Submit a Help Ticket
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Fields marked with (*) are required. We typically reply in under 2 hours.
          </p>

          {isSuccess && (
            <div className="mb-6 p-4.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Ticket Sent Successfully!</strong>
                Your request has been filed under ID #KW-{Math.floor(1000 + Math.random() * 9000)}. An automated confirmation has been received by our server nodes.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Your Name (*)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-[#110b07] border border-[#3d2b1c] rounded-xl text-white text-sm focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Email Address (*)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="w-full px-3 py-2 bg-[#110b07] border border-[#3d2b1c] rounded-xl text-white text-sm focus:outline-none focus:border-[#c59b27]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Inquiry Topic</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-[#110b07] border border-[#3d2b1c] rounded-xl text-white text-sm focus:outline-none focus:border-[#c59b27]"
              >
                <option value="accounts">Buying Aged Accounts (Custom/Bulk)</option>
                <option value="posts">Upvotes & Posting Boost Service</option>
                <option value="billing">Billing & Alternative Payment Methods</option>
                <option value="guide"> Beginner Strategy Guide Assistance</option>
                <option value="complaint">Refund Policy / Defective claims</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 font-mono">Your Message Details (*)</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Give us details about your Reddit campaign goals..."
                className="w-full px-3 py-2 bg-[#110b07] border border-[#3d2b1c] rounded-xl text-white text-sm focus:outline-none focus:border-[#c59b27] placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-3 px-5 rounded-xl bg-[#c59b27] hover:bg-[#a87f18] text-white text-sm font-semibold transition-all shadow-md shadow-[#c59b27]/15 flex items-center justify-center gap-2 cursor-pointer ${
                isSending ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Transmitting security ticket...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
