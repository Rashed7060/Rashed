import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles, Palette } from 'lucide-react';
import { ThemeSelector, THEME_OPTIONS } from './ThemeSelector';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  colorTheme: string;
  onSelectColorTheme: (themeId: string) => void;
  onOpenHireModal: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  colorTheme,
  onSelectColorTheme,
  onOpenHireModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4`}
      >
        <div
          className={`flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 max-w-5xl w-full ${
            isScrolled
              ? 'bg-white/95 dark:bg-[#1A1D27]/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/25 border border-[#E8EAF0] dark:border-[#2D3748]'
              : 'bg-white/90 dark:bg-[#1A1D27]/90 backdrop-blur-sm shadow-md shadow-orange-500/5 border border-[#E8EAF0]/80 dark:border-[#2D3748]/80'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-1.5 font-heading text-lg sm:text-xl font-bold tracking-tight text-[#171923] dark:text-white shrink-0 hover:opacity-90 transition-opacity"
          >
            <span>Portfolio</span>
            <span className="w-2 h-2 rounded-full bg-[#FF8500] inline-block animate-pulse"></span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#FF8500] font-semibold bg-orange-500/10'
                      : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Zone: Theme Selector, Dark/Light Toggle & Hire Me CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Color Switcher */}
            <ThemeSelector currentTheme={colorTheme} onSelectTheme={onSelectColorTheme} />

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full text-[#606575] dark:text-[#9EA3B0] hover:text-[#FF8500] dark:hover:text-[#FFAB45] hover:bg-orange-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8500] cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#FFAB45]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Hire Me CTA Button */}
            <button
              onClick={() => onOpenHireModal()}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] rounded-full shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-95 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-full text-[#606575] dark:text-[#9EA3B0] hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-20 left-4 right-4 bg-white dark:bg-[#1A1D27] rounded-3xl p-6 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-orange-500/10 text-[#FF8500] font-semibold'
                        : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]"></span>}
                  </a>
                );
              })}
            </div>

            {/* Color Palette Selector on Mobile */}
            <div className="pt-3 border-t border-[#E8EAF0] dark:border-[#2D3748] space-y-2">
              <div className="text-xs font-semibold text-[#171923] dark:text-white flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#FF8500]" />
                <span>Color Theme</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectColorTheme(t.id);
                    }}
                    className={`p-2 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                      colorTheme === t.id
                        ? 'border-[#FF8500] bg-orange-500/10 text-[#171923] dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 text-[#606575] dark:text-[#9EA3B0]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                    <span className="truncate">{t.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark / Light Mode on Mobile */}
            <div className="pt-2 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between">
              <span className="text-xs text-[#606575] dark:text-[#9EA3B0]">Mode</span>
              <button
                onClick={onToggleDarkMode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
