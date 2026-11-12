import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#151821] border-t border-[#E8EAF0] dark:border-[#2D3748] pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-1.5">
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 font-heading text-xl font-bold tracking-tight text-[#171923] dark:text-white"
            >
              <span>Portfolio</span>
              <span className="w-2 h-2 rounded-full bg-[#FF8500]"></span>
            </a>
            <p className="text-xs text-[#606575] dark:text-[#9EA3B0] max-w-sm">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-[#606575] dark:text-[#9EA3B0]">
            <a href="#home" className="hover:text-[#FF8500] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#FF8500] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#FF8500] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#FF8500] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#FF8500] transition-colors">Contact</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={CONTACT_DATA.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={CONTACT_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#606575] dark:text-[#9EA3B0] hover:text-[#FF8500] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all cursor-pointer shadow-sm hover:scale-105 ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-[#E8EAF0] dark:border-[#2D3748] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#606575] dark:text-[#9EA3B0]">
          <div>
            © {new Date().getFullYear()} Md Rashidul Islam. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for web performance & creative excellence</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
