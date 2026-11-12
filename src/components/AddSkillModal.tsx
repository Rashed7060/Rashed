import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { Skill } from '../types/portfolio';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (skill: Skill) => void;
}

const COLOR_OPTIONS = [
  { label: 'Primary Theme', value: 'from-[#FF8500] to-[#FFAB45]', gradient: 'linear-gradient(90deg, #FF8500, #FFAB45)' },
  { label: 'WordPress Blue', value: 'from-[#21759B] to-[#3B82F6]', gradient: 'linear-gradient(90deg, #21759B, #3B82F6)' },
  { label: 'Purple AI', value: 'from-[#8B5CF6] to-[#EC4899]', gradient: 'linear-gradient(90deg, #8B5CF6, #EC4899)' },
  { label: 'Emerald Speed', value: 'from-[#10B981] to-[#059669]', gradient: 'linear-gradient(90deg, #10B981, #059669)' },
  { label: 'Elementor Pink', value: 'from-[#D30C5C] to-[#E94E87]', gradient: 'linear-gradient(90deg, #D30C5C, #E94E87)' },
  { label: 'WooCommerce Plum', value: 'from-[#96588A] to-[#C070B0]', gradient: 'linear-gradient(90deg, #96588A, #C070B0)' },
  { label: 'HTML Orange', value: 'from-[#E44D26] to-[#F16529]', gradient: 'linear-gradient(90deg, #E44D26, #F16529)' },
  { label: 'Cyan Tech', value: 'from-[#06B6D4] to-[#3B82F6]', gradient: 'linear-gradient(90deg, #06B6D4, #3B82F6)' },
  { label: 'Amber Gold', value: 'from-[#F59E0B] to-[#D97706]', gradient: 'linear-gradient(90deg, #F59E0B, #D97706)' },
];

const ICON_OPTIONS = [
  { id: 'trending-up', label: 'SEO / Rank', symbol: '📈' },
  { id: 'wordpress', label: 'WordPress', symbol: 'W' },
  { id: 'shopping-bag', label: 'Ecommerce', symbol: '🛒' },
  { id: 'layout', label: 'Elementor/UI', symbol: 'E' },
  { id: 'code-2', label: 'Code', symbol: '</>' },
  { id: 'file-code', label: 'CSS/Styles', symbol: '#' },
  { id: 'sparkles', label: 'JS/Interactive', symbol: 'JS' },
  { id: 'server', label: 'Backend/PHP', symbol: 'PHP' },
  { id: 'palette', label: 'Design/Art', symbol: '🎨' },
  { id: 'figma', label: 'Figma', symbol: 'Fg' },
  { id: 'bot', label: 'AI Bot', symbol: 'AI' },
  { id: 'cpu', label: 'Automation', symbol: '⚙️' },
  { id: 'zap', label: 'Speed/Vitals', symbol: '⚡' },
];

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  onAddSkill,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'web' | 'design' | 'ai'>('web');
  const [proficiency, setProficiency] = useState<number>(100);
  const [barColor, setBarColor] = useState(COLOR_OPTIONS[0].value);
  const [iconName, setIconName] = useState(ICON_OPTIONS[0].id);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSkill: Skill = {
      id: `custom-skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      category,
      proficiency: Number(proficiency),
      barColor,
      iconName,
      description: description.trim() || `${name.trim()} implementation and optimization for client projects.`,
    };

    onAddSkill(newSkill);
    setName('');
    setDescription('');
    setProficiency(100);
    onClose();
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
        <div className="flex items-center justify-between pb-3 border-b border-[#E8EAF0] dark:border-[#2D3748]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#171923] dark:text-white">
                Add New Skill
              </h3>
              <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                Add a new technology, tool, or expertise to your portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Skill Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Skill / Tool Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shopify Development, Python, Webflow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Category *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('web')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                  category === 'web'
                    ? 'bg-orange-500/10 border-[#FF8500] text-[#FF8500] font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-[#606575] dark:text-[#9EA3B0]'
                }`}
              >
                SEO & Web Dev
              </button>
              <button
                type="button"
                onClick={() => setCategory('design')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                  category === 'design'
                    ? 'bg-orange-500/10 border-[#FF8500] text-[#FF8500] font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-[#606575] dark:text-[#9EA3B0]'
                }`}
              >
                Design & UI
              </button>
              <button
                type="button"
                onClick={() => setCategory('ai')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                  category === 'ai'
                    ? 'bg-orange-500/10 border-[#FF8500] text-[#FF8500] font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-[#606575] dark:text-[#9EA3B0]'
                }`}
              >
                AI & Auto
              </button>
            </div>
          </div>

          {/* Proficiency */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label className="text-[#171923] dark:text-white">
                Proficiency Percentage
              </label>
              <span className="text-[#FF8500] font-mono text-sm">{proficiency}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={proficiency}
              onChange={(e) => setProficiency(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF8500]"
            />
          </div>

          {/* Icon Badge Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Skill Icon / Badge
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {ICON_OPTIONS.map((ico) => (
                <button
                  key={ico.id}
                  type="button"
                  onClick={() => setIconName(ico.id)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    iconName === ico.id
                      ? 'border-[#FF8500] bg-orange-500/10 text-[#FF8500]'
                      : 'border-slate-200 dark:border-slate-700 text-[#606575] dark:text-[#9EA3B0] hover:border-slate-400'
                  }`}
                >
                  <span className="font-bold text-xs">{ico.symbol}</span>
                  <span className="text-[10px] truncate max-w-full">{ico.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Gradient Theme */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Progress Bar Gradient
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setBarColor(c.value)}
                  className={`h-7 px-2.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    barColor === c.value
                      ? 'border-black dark:border-white ring-2 ring-orange-500/30'
                      : 'border-transparent'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ background: c.gradient }} />
                  <span className="text-[#606575] dark:text-[#9EA3B0]">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Skill Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of what you achieve with this skill..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
            />
          </div>

          {/* Submit & Cancel */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#E8EAF0] dark:border-[#2D3748]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#606575] dark:text-[#9EA3B0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
