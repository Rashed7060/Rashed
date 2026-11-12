import React from 'react';
import { MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';

export const WhatsAppFloatingButton: React.FC = () => {
  const cleanPhone = CONTACT_DATA.phone.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    'Hello Md Rashidul Islam! I saw your portfolio and would like to discuss a project with you.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 z-40 group flex items-center">
      {/* Floating Tooltip Bubble */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none mr-3 bg-white dark:bg-[#1A1D27] text-[#171923] dark:text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap">
        <span>Chat on WhatsApp</span>
        <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">
          {CONTACT_DATA.phone}
        </span>
      </div>

      {/* WhatsApp Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Message"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg shadow-emerald-500/35 hover:shadow-xl hover:shadow-emerald-500/45 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer relative"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-100 border-2 border-white dark:border-slate-900"></span>
        </span>
        <MessageSquare className="w-6 h-6 fill-white stroke-none sm:w-7 sm:h-7" />
      </a>
    </aside>
  );
};
