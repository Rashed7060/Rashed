import React, { useState, useEffect } from 'react';
import { SKILLS as DEFAULT_SKILLS } from '../data/portfolioData';
import { Skill } from '../types/portfolio';
import { 
  Sparkles, Code2, Layers, Cpu, Check, Info, 
  Plus, Trash2, RotateCcw, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import { AddSkillModal } from './AddSkillModal';

export const Skills: React.FC = () => {
  // Load skills from localStorage or fallback to defaults
  const [skills, setSkills] = useState<Skill[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_custom_skills');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((s) => {
              if (s.id === 'seo-technical' || s.name === 'Technical & On-Page SEO') {
                return { ...s, name: 'SEO (Search Engine Optimization)' };
              }
              return s;
            });
          }
        } catch (e) {
          console.error('Error parsing stored skills:', e);
        }
      }
    }
    return DEFAULT_SKILLS;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'design' | 'ai'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_skills', JSON.stringify(skills));
    } catch (e) {
      console.error('Error saving skills to localStorage:', e);
    }
  }, [skills]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddSkill = (newSkill: Skill) => {
    setSkills((prev) => [newSkill, ...prev]);
    showToast(`Skill "${newSkill.name}" has been added!`);
  };

  const confirmDeleteSkill = () => {
    if (!skillToDelete) return;
    const name = skillToDelete.name;
    setSkills((prev) => prev.filter((s) => s.id !== skillToDelete.id));
    if (selectedSkill?.id === skillToDelete.id) {
      setSelectedSkill(null);
    }
    setSkillToDelete(null);
    showToast(`Skill "${name}" has been deleted.`);
  };

  const handleResetSkills = () => {
    if (window.confirm('Reset all skills to the default showcase? Any custom added skills will be cleared.')) {
      setSkills(DEFAULT_SKILLS);
      showToast('Skills reset to default showcase.');
    }
  };

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter((s) => s.category === activeTab);

  // Helper to render distinct skill icons
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'wordpress':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#21759B]/10 text-[#21759B] flex items-center justify-center font-bold text-sm">
            W
          </div>
        );
      case 'shopping-bag':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#96588A]/10 text-[#96588A] flex items-center justify-center font-bold text-sm">
            🛒
          </div>
        );
      case 'layout':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#D30C5C]/10 text-[#D30C5C] flex items-center justify-center font-bold text-sm">
            E
          </div>
        );
      case 'code-2':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#E44D26]/10 text-[#E44D26] flex items-center justify-center font-bold text-xs">
            &lt;/&gt;
          </div>
        );
      case 'file-code':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#264DE4]/10 text-[#264DE4] flex items-center justify-center font-bold text-xs">
            #
          </div>
        );
      case 'sparkles':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#F7DF1E]/20 text-[#D4AC0D] flex items-center justify-center font-bold text-xs">
            JS
          </div>
        );
      case 'server':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#777BB4]/15 text-[#777BB4] flex items-center justify-center font-bold text-xs">
            PHP
          </div>
        );
      case 'palette':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FF8500]/10 text-[#FF8500] flex items-center justify-center font-bold text-sm">
            🎨
          </div>
        );
      case 'image':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#31A8FF]/15 text-[#007acc] flex items-center justify-center font-bold text-xs">
            Ps
          </div>
        );
      case 'figma':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#F24E1E]/10 text-[#F24E1E] flex items-center justify-center font-bold text-xs">
            Fg
          </div>
        );
      case 'bot':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
            AI
          </div>
        );
      case 'cpu':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
            ⚙️
          </div>
        );
      case 'trending-up':
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-[#FF8500] flex items-center justify-center font-bold text-xs">
            📈
          </div>
        );
      case 'zap':
        return (
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
            ⚡
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-[#FF8500] flex items-center justify-center font-bold text-xs">
            ★
          </div>
        );
    }
  };

  // Helper to ensure all skill progress bars are filled with vivid, visible gradients
  const getSkillBarBackground = (barColor?: string) => {
    if (!barColor) {
      return 'linear-gradient(90deg, var(--primary-gradient-start), var(--primary-gradient-end))';
    }

    if (barColor.includes('#FF8500') || barColor.includes('orange')) {
      return 'linear-gradient(90deg, var(--primary-gradient-start), var(--primary-gradient-end))';
    }
    if (barColor.includes('8B5CF6') || barColor.includes('purple')) {
      return 'linear-gradient(90deg, #8B5CF6, #EC4899)';
    }
    if (barColor.includes('10B981') || barColor.includes('emerald')) {
      return 'linear-gradient(90deg, #10B981, #059669)';
    }
    if (barColor.includes('21759B') || barColor.includes('3B82F6')) {
      return 'linear-gradient(90deg, #21759B, #3B82F6)';
    }
    if (barColor.includes('96588A')) {
      return 'linear-gradient(90deg, #96588A, #C070B0)';
    }
    if (barColor.includes('D30C5C')) {
      return 'linear-gradient(90deg, #D30C5C, #E94E87)';
    }
    if (barColor.includes('E44D26')) {
      return 'linear-gradient(90deg, #E44D26, #F16529)';
    }
    if (barColor.includes('06B6D4') || barColor.includes('cyan')) {
      return 'linear-gradient(90deg, #06B6D4, #3B82F6)';
    }
    if (barColor.includes('F59E0B') || barColor.includes('F7DF1E')) {
      return 'linear-gradient(90deg, #F59E0B, #D97706)';
    }
    if (barColor.includes('264DE4')) {
      return 'linear-gradient(90deg, #264DE4, #2965F1)';
    }
    if (barColor.includes('A855F7')) {
      return 'linear-gradient(90deg, #A855F7, #EC4899)';
    }

    const hexMatches = barColor.match(/#[0-9a-fA-F]{3,6}/g);
    if (hexMatches && hexMatches.length >= 2) {
      return `linear-gradient(90deg, ${hexMatches[0]}, ${hexMatches[1]})`;
    }
    if (hexMatches && hexMatches.length === 1) {
      return `linear-gradient(90deg, ${hexMatches[0]}, ${hexMatches[0]})`;
    }

    return 'linear-gradient(90deg, var(--primary-gradient-start), var(--primary-gradient-end))';
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-slate-50/50 dark:bg-[#0c0e14]/50">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#171923] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Subtitle */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FF8500]">
            My Skills
          </h2>
          <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0]">
            Technologies and creative tools I use to build amazing digital experiences.
          </p>
        </div>

        {/* Management & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white dark:bg-[#1A1D27] rounded-full border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              All Skills ({skills.length})
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              SEO & Web Dev
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              Design & UI
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              AI & Automation
            </button>
          </div>

          {/* Action Buttons: Add Skill & Reset */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>

            <button
              onClick={handleResetSkills}
              title="Reset skills to default"
              className="p-2 rounded-full text-[#606575] dark:text-[#9EA3B0] hover:text-[#FF8500] bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] hover:border-orange-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Empty state if filtered category has no items */}
        {filteredSkills.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-[#1A1D27] rounded-3xl border border-[#E8EAF0] dark:border-[#2D3748] p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/40 text-[#FF8500] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#171923] dark:text-white">
              No skills found in this category
            </h3>
            <p className="text-xs sm:text-sm text-[#606575] dark:text-[#9EA3B0] max-w-sm mx-auto">
              You can add a custom skill to this category using the button below.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Skill</span>
            </button>
          </div>
        ) : (
          /* Responsive Grid of Skill Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="bg-white dark:bg-[#1A1D27] rounded-2xl p-5 border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4 relative"
              >
                {/* Top row: Icon + Skill Name + Delete Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="transition-transform group-hover:scale-110 duration-200 shrink-0">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <div className="font-heading font-bold text-sm sm:text-base text-[#171923] dark:text-white group-hover:text-[#FF8500] transition-colors truncate">
                      {skill.name}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSkillToDelete(skill);
                    }}
                    title={`Delete ${skill.name}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Middle row: Proficiency label + percentage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#606575] dark:text-[#9EA3B0]">Proficiency</span>
                    <span className="text-[#FF8500] font-mono tabular-nums">{skill.proficiency}%</span>
                  </div>

                  {/* Dual-toned progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{
                        width: `${Math.max(skill.proficiency, 5)}%`,
                        background: getSkillBarBackground(skill.barColor),
                      }}
                    />
                  </div>
                </div>

                {/* Footer prompt */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#606575] dark:text-[#9EA3B0] border-t border-slate-100 dark:border-slate-800/80">
                  <span className="capitalize">{skill.category} Tool</span>
                  <span className="text-orange-500 group-hover:translate-x-0.5 transition-transform">Details →</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSkill={handleAddSkill}
      />

      {/* Delete Confirmation Modal */}
      {skillToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSkillToDelete(null)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#171923] dark:text-white">
                Delete Skill?
              </h3>
              <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                Are you sure you want to remove <strong>"{skillToDelete.name}"</strong> from your skills list?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSkillToDelete(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-[#606575] dark:text-[#9EA3B0] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSkill}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {renderSkillIcon(selectedSkill.iconName)}
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#171923] dark:text-white">
                    {selectedSkill.name}
                  </h3>
                  <span className="text-xs font-medium text-[#FF8500] uppercase tracking-wider">
                    {selectedSkill.category} Specialist
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
                {selectedSkill.description}
              </p>

              <div className="p-3 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-500/20">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-[#171923] dark:text-white">Assessed Proficiency</span>
                  <span className="text-[#FF8500] font-mono tabular-nums">{selectedSkill.proficiency}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{
                      width: `${Math.max(selectedSkill.proficiency, 5)}%`,
                      background: getSkillBarBackground(selectedSkill.barColor),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#E8EAF0] dark:border-[#2D3748]">
              <button
                onClick={() => {
                  const toDel = selectedSkill;
                  setSelectedSkill(null);
                  setSkillToDelete(toDel);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Skill</span>
              </button>

              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
