import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Heart, Award, Code, Palette, Laptop } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AboutProps {
  onOpenHireModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenHireModal }) => {
  const { personalInfo, stats } = useAdmin();
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Creative Professional Character with Starburst Backdrop (Reference image style) */}
          <div className="lg:col-span-5 relative flex justify-center items-center order-2 lg:order-1">
            
            {/* Geometric Orange Star / Diamond Background Accent (matching reference image) */}
            <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
              
              {/* Star / Polygonal Orange Graphic Motif */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <svg
                  className="w-72 h-72 sm:w-96 sm:h-96 text-orange-400/20 dark:text-orange-500/10 fill-current animate-pulse duration-1000"
                  viewBox="0 0 200 200"
                >
                  <polygon points="100,0 130,70 200,75 145,125 165,195 100,155 35,195 55,125 0,75 70,70" />
                </svg>
                {/* Secondary rotated theme accent */}
                <div className="absolute w-64 h-64 bg-gradient-to-tr from-[var(--primary-color)]/25 to-[var(--primary-hover)]/20 rounded-full blur-2xl" />
              </div>

              {/* Professional Portrait Image */}
              <div className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] rounded-3xl overflow-hidden bg-white dark:bg-[#1A1D27] p-2.5 border-2 border-white/80 dark:border-[#2D3748] shadow-2xl shadow-orange-500/10">
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white">
                  <img
                    src={personalInfo.aboutImage}
                    alt="Md Rashidul Islam - SEO Specialist & WordPress Developer"
                    className="w-full h-full object-cover object-top select-none hover:scale-[1.01] transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content & Stats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-2">
            
            {/* Section Tag & Heading */}
            <div className="space-y-2">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FF8500]">
                About Me
              </h2>
              <div className="h-1 w-16 bg-[#FF8500] rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Description Text (card with soft background as in reference image) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#1A1D27]/80 border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm">
              <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
                {personalInfo.aboutDescription}
              </p>
            </div>

            {/* Three Achievement Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm text-center group hover:border-orange-300 dark:hover:border-orange-500/30 transition-all duration-200"
                >
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#FF8500] group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#171923] dark:text-white mt-1">
                    {stat.label}
                  </div>
                  {stat.isEditable && (
                    <span className="inline-block text-[10px] text-orange-600/70 dark:text-orange-400/70 mt-0.5">
                      (editable)
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={() => setShowDetailsModal(true)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#FF8500] hover:text-white bg-transparent hover:bg-[#FF8500] border-2 border-[#FF8500] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Learn More Detailed Modal */}
      {showDetailsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8EAF0] dark:border-[#2D3748]">
              <div>
                <span className="text-xs font-semibold text-[#FF8500] uppercase tracking-wider">
                  Personal Biography & Workflow
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#171923] dark:text-white">
                  About Md Rashidul Islam
                </h3>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 text-sm text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
              <p>
                As a specialized digital professional, I operate at the intersection of <strong>data-driven technical SEO</strong>, <strong>professional WordPress development</strong>, and <strong>cutting-edge AI solutions</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-500/20">
                  <div className="flex items-center gap-2 font-semibold text-[#171923] dark:text-white mb-1">
                    <Palette className="w-4 h-4 text-[#FF8500]" />
                    <span>Search Engine Mastery</span>
                  </div>
                  <p className="text-xs">
                    Websites must not only look visually stunning—they must claim top organic Google rankings, attract qualified buyers, and convert at maximum efficiency.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-500/20">
                  <div className="flex items-center gap-2 font-semibold text-[#171923] dark:text-white mb-1">
                    <Laptop className="w-4 h-4 text-blue-500" />
                    <span>WordPress & Web Engineering</span>
                  </div>
                  <p className="text-xs">
                    Clean code, fast sub-second load times, Elementor Pro customization, WooCommerce store architectures, and intelligent AI features.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-[#171923] dark:text-white mb-2">My 4-Step Process:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF8500] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span><strong>Technical SEO & Keyword Audit:</strong> Identifying search volume, competitor gaps, crawl health, and keyword opportunities.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF8500] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span><strong>High-Converting UI/UX Architecture:</strong> Designing clean, mobile-first layouts with conversion funnels and clear CTAs.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF8500] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span><strong>AI Development & Integration:</strong> Building intelligent websites equipped with automated pipelines, smart search, and AI workflows.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF8500] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                    <span><strong>Schema Markup, Speed & Indexing:</strong> Guaranteeing Google PageSpeed 95+, rich snippets, and continuous rank tracking.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#E8EAF0] dark:border-[#2D3748] flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  onOpenHireModal();
                }}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm transition-all"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
