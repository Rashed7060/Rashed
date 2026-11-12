import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_DATA, SKILLS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0] dark:border-[#2D3748] print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8500]" />
            <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider">
              Curriculum Vitae / Resume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="space-y-6 text-[#171923] dark:text-white">
          
          {/* Header */}
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#171923] dark:text-white">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-base font-semibold text-[#FF8500]">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#606575] dark:text-[#9EA3B0] pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#FF8500]" />
                {CONTACT_DATA.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#FF8500]" />
                {CONTACT_DATA.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF8500]" />
                {CONTACT_DATA.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
              {PERSONAL_INFO.bio} Specialized in technical and on-page SEO, Google Search Console optimization, schema markup, AI website development, and prompt-driven generative automation pipelines.
            </p>
          </div>

          {/* Core Technical & Design Competencies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
              Core Competencies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(() => {
                let list = SKILLS;
                if (typeof window !== 'undefined') {
                  const saved = localStorage.getItem('portfolio_custom_skills');
                  if (saved) {
                    try {
                      const parsed = JSON.parse(saved);
                      if (Array.isArray(parsed) && parsed.length > 0) {
                        list = parsed.map((s) => {
                          if (s.id === 'seo-technical' || s.name === 'Technical & On-Page SEO') {
                            return { ...s, name: 'SEO (Search Engine Optimization)' };
                          }
                          return s;
                        });
                      }
                    } catch (e) {
                      // fallback
                    }
                  }
                }
                return list.map((s) => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="font-semibold text-[#171923] dark:text-white flex justify-between">
                      <span>{s.name}</span>
                      <span className="text-[#FF8500] font-mono">{s.proficiency}%</span>
                    </div>
                    <span className="text-[10px] text-[#606575] dark:text-[#9EA3B0] block capitalize">
                      {s.category} Technology
                    </span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Professional Experience (Editable Placeholders as instructed) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
                Experience & Projects
              </h3>
              <span className="text-[10px] text-orange-500 font-medium">(Editable Placeholder Data)</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-[#171923] dark:text-white">Senior SEO Specialist & WordPress Developer</h4>
                    <span className="text-[#606575] dark:text-[#9EA3B0]">Global Client Engagements (Upwork / Direct)</span>
                  </div>
                  <span className="text-[#FF8500] font-medium text-[11px]">2022 — Present</span>
                </div>
                <p className="text-xs text-[#606575] dark:text-[#9EA3B0] pt-1">
                  Engineered 50+ bespoke WordPress & WooCommerce storefronts, customized Elementor templates, optimized PageSpeed to 95+, and implemented comprehensive technical SEO ranking architectures.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-[#171923] dark:text-white">AI Web Solutions & Search Optimizer</h4>
                    <span className="text-[#606575] dark:text-[#9EA3B0]">Creative Digital Tech Agency</span>
                  </div>
                  <span className="text-[#FF8500] font-medium text-[11px]">2020 — 2022</span>
                </div>
                <p className="text-xs text-[#606575] dark:text-[#9EA3B0] pt-1">
                  Developed search-optimized web experiences, integrated generative AI media workflows, structured schema markups, and increased website speed scores to 95+.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Credentials (Editable Placeholders) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
                Education & Training
              </h3>
              <span className="text-[10px] text-orange-500 font-medium">(Editable Placeholder Data)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <h4 className="font-bold text-[#171923] dark:text-white">Bachelor of Computer Science / Creative Arts</h4>
                  <span className="text-[#606575] dark:text-[#9EA3B0]">University / Technical Academy (Placeholder)</span>
                </div>
                <span className="text-[#FF8500] font-medium text-[11px]">2018 — 2022</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
