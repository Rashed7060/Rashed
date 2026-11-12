import React from 'react';
import { Download, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenHireModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenHireModal }) => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--primary-color)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[var(--primary-color)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Social Media Icons row (matching top-left in reference image) */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* Instagram */}
              <a
                href={CONTACT_DATA.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#FF8500] hover:border-orange-200 dark:hover:border-orange-500/30 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={CONTACT_DATA.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook profile"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#1877F2] hover:border-blue-200 dark:hover:border-blue-500/30 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#0A66C2] hover:border-blue-200 dark:hover:border-blue-500/30 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={CONTACT_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white hover:border-slate-400 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171923] dark:text-white leading-[1.15]">
                Hi, I'm <span className="text-[#171923] dark:text-white">{PERSONAL_INFO.name}</span>
              </h1>
              
              {/* Professional Title */}
              <div className="inline-block">
                <span className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-[var(--primary-gradient-start)] via-[var(--primary-color)] to-[var(--primary-gradient-end)] bg-clip-text text-transparent">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Download CV (Orange filled) */}
              <button
                onClick={onOpenResumeModal}
                className="px-6 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </button>

              {/* Contact Me (Outlined secondary button) */}
              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold text-[#171923] dark:text-white bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] hover:border-orange-300 dark:hover:border-orange-500/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#FF8500]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Micro proof highlight */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#606575] dark:text-[#9EA3B0]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF8500]" />
                <span>Available for freelance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF8500]" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Portrait Photograph */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Ambient Radial Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-color)]/25 via-[var(--primary-hover)]/20 to-transparent rounded-full filter blur-3xl transform scale-95 -z-10" />

            {/* Main Portrait Frame (Clean, without extra text overlays) */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              <div className="relative z-10 rounded-3xl overflow-hidden bg-white dark:bg-[#1A1D27] p-2 border-2 border-white/80 dark:border-[#2D3748] shadow-2xl shadow-orange-500/10">
                <img
                  src={PERSONAL_INFO.heroImage}
                  alt="Md Rashidul Islam - SEO Specialist, WordPress Developer & AI Specialist"
                  className="w-full h-auto aspect-square object-cover rounded-2xl select-none hover:scale-[1.01] transition-transform duration-300"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
