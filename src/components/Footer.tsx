import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const Footer: React.FC = () => {
  const { personalInfo, contactData } = useAdmin();
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
              {personalInfo.title}
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
              href={contactData.socials.facebook}
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
              href={contactData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Fiverr */}
            <a
              href={contactData.socials.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr Profile"
              title="Fiverr"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#1DBF73] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M10.5 7.5c0-1.2.8-2 2-2h1.3V3.2H12c-2.4 0-4 1.6-4 4.1v1.4H6.2v2.4H8v8.7h2.5v-8.7h2.4v-2.4h-2.4V7.5zM15 8.7h2.5v11.1H15V8.7z"/>
                <circle cx="16.25" cy="5.6" r="1.45" />
              </svg>
            </a>

            {/* Upwork */}
            <a
              href={contactData.socials.upwork}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork Profile"
              title="Upwork"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#14A800] hover:bg-green-50 dark:hover:bg-green-950/30 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
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
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for web performance & creative excellence</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
