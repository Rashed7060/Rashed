import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  accent: string;
  gradient: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'blue',
    name: 'Royal Sapphire',
    accent: '#2563EB',
    gradient: 'from-blue-600 to-indigo-500',
    description: 'Executive & Professional (matches suit portrait)',
  },
  {
    id: 'emerald',
    name: 'Emerald Growth',
    accent: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'High SEO, Google Rankings & Conversion',
  },
  {
    id: 'purple',
    name: 'Electric Violet',
    accent: '#7C3AED',
    gradient: 'from-purple-600 to-pink-500',
    description: 'Next-Gen AI & Modern Creative Tech',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    accent: '#0284C7',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Clean Digital Agency & Speed',
  },
  {
    id: 'orange',
    name: 'Sunset Amber',
    accent: '#FF8500',
    gradient: 'from-orange-500 to-amber-400',
    description: 'Warm Creative & Vibrant Energy',
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    accent: '#E11D48',
    gradient: 'from-rose-500 to-pink-600',
    description: 'Bold Modern & High-Impact Authority',
  },
];

interface ThemeSelectorProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button with Palette Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Website Color Theme"
        title="Change Website Color Theme"
        className="p-2 rounded-full text-[#606575] dark:text-[#9EA3B0] hover:text-[var(--primary-color)] hover:bg-[var(--primary-soft-bg)] transition-all cursor-pointer flex items-center justify-center relative group"
      >
        <Palette className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" />
        <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] absolute top-1 right-1 ring-1 ring-white dark:ring-[#1A1D27]" />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 sm:w-80 p-4 rounded-3xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8EAF0] dark:border-[#2D3748]">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[var(--primary-color)]" />
              <span className="text-xs font-bold text-[#171923] dark:text-white uppercase tracking-wider">
                Select Website Theme
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[var(--primary-soft-bg)] text-[var(--primary-color)]">
              Active: {THEME_OPTIONS.find((t) => t.id === currentTheme)?.name || 'Custom'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-[var(--primary-color)] bg-[var(--primary-soft-bg)] shadow-sm'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#171923] dark:text-white">
                        {theme.name}
                      </div>
                      <div className="text-[10px] text-[#606575] dark:text-[#9EA3B0] truncate">
                        {theme.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
