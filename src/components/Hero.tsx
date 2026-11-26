import React from 'react';
import { Download, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenHireModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenHireModal }) => {
  const { personalInfo, contactData } = useAdmin();
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
            
            {/* Social & Freelance Marketplace Icons row */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* Facebook */}
              <a
                href={contactData.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook profile"
                title="Facebook"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#1877F2] hover:border-blue-200 dark:hover:border-blue-500/30 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={contactData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#0A66C2] hover:border-blue-200 dark:hover:border-blue-500/30 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Fiverr */}
              <a
                href={contactData.socials.fiverr}
                target="_blank"
                rel="noreferrer"
                aria-label="Fiverr profile"
                title="Fiverr"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#1DBF73] hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:scale-105 transition-all duration-200"
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
                rel="noreferrer"
                aria-label="Upwork profile"
                title="Upwork"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm flex items-center justify-center text-[#606575] dark:text-[#9EA3B0] hover:text-[#14A800] hover:border-green-300 dark:hover:border-green-500/40 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                </svg>
              </a>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171923] dark:text-white leading-[1.15]">
                Hi, I'm <span className="text-[#171923] dark:text-white">{personalInfo.name}</span>
              </h1>
              
              {/* Professional Title */}
              <div className="inline-block">
                <span className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-[var(--primary-gradient-start)] via-[var(--primary-color)] to-[var(--primary-gradient-end)] bg-clip-text text-transparent">
                  {personalInfo.title}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {personalInfo.tagline}
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

            {/* Main Portrait Frame (Clean, full uncropped 3:4 portrait framing) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto">
              <div className="relative z-10 rounded-3xl overflow-hidden bg-white dark:bg-[#1A1D27] p-2.5 border-2 border-white/80 dark:border-[#2D3748] shadow-2xl shadow-orange-500/10">
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white">
                  <img
                    src={personalInfo.heroImage}
                    alt="Md Rashidul Islam - SEO Specialist, WordPress Developer & AI Specialist"
                    className="w-full h-full object-cover object-top select-none hover:scale-[1.01] transition-transform duration-300"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
