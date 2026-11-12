import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';

const PROJECT_OPTIONS = [
  'WordPress Website Development',
  'WooCommerce Ecommerce Store',
  'SEO & Search Engine Optimization',
  'Website Speed & Core Web Vitals',
  'AI Integration & Automation',
  'Custom Web Development & Redesign',
  'Other Inquiry',
];

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService || PROJECT_OPTIONS[0]
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('To be discussed');
  const [timeline, setTimeline] = useState('1-2 Weeks');
  const [notes, setNotes] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);

    const cleanPhone = CONTACT_DATA.phone.replace(/[^0-9]/g, '');
    const waMsg = 
`*Hire Request from Portfolio* 💼

👤 *Name:* ${name.trim()}
📧 *Email:* ${email.trim()}
💼 *Service:* ${selectedService}
⏱️ *Timeline:* ${timeline}
💰 *Budget:* ${budget}

📝 *Project Overview / Notes:*
${notes.trim() || 'Ready to discuss on WhatsApp'}

------------------------------
Sent to Md Rashidul Islam (${CONTACT_DATA.phone})`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;
    setWaLink(url);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.log('Popup blocked or redirected');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-5 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E8EAF0] dark:border-[#2D3748]">
          <div>
            <span className="text-xs font-semibold text-[#FF8500] uppercase tracking-wider">
              Project Collaboration
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#171923] dark:text-white">
              Hire Md Rashidul Islam
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading text-xl font-bold text-[#171923] dark:text-white">
                WhatsApp Chat Initiated!
              </h4>
              <p className="text-xs sm:text-sm text-[#606575] dark:text-[#9EA3B0] max-w-sm mx-auto">
                Your project request has been prepared for <strong>Md Rashidul Islam ({CONTACT_DATA.phone})</strong>. If WhatsApp did not open automatically, click the button below:
              </p>
            </div>
            {waLink && (
              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer pt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Selected Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              >
                {PROJECT_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Mitchell"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                >
                  <option value="To be discussed">To be discussed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Desired Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                >
                  <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                  <option value="1-2 Weeks">1-2 Weeks</option>
                  <option value="2-4 Weeks">2-4 Weeks</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Project Overview
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your objectives, existing brand assets, or references..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#25D366] via-emerald-600 to-[#128C7E] hover:from-[#20BD5A] hover:to-[#0E7A6E] shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Request via WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              <div className="text-center text-[11px] text-[#606575] dark:text-[#9EA3B0]">
                Directly sends to WhatsApp: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{CONTACT_DATA.phone}</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
