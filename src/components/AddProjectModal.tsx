import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Sparkles, Check, Link, Tag, Briefcase, Calendar } from 'lucide-react';
import { Project } from '../types/portfolio';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'wordpress' | 'design' | 'ai' | 'landing'>('wordpress');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2024');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/assets/aistudio/7485a2d5c688d5262d6049dbae1d1b84_c05bedca.jpg');
  const [tagsInput, setTagsInput] = useState('WordPress, WooCommerce, Elementor, SEO');
  const [liveUrl, setLiveUrl] = useState('');
  
  // Case study fields
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [toolsInput, setToolsInput] = useState('WordPress, Elementor Pro, SEO');

  if (!isOpen) return null;

  // Preset quick-select image samples
  const imagePresets = [
    { label: 'GlowCare Store', url: '/assets/aistudio/7485a2d5c688d5262d6049dbae1d1b84_c05bedca.jpg' },
    { label: 'Genesis AI App', url: '/src/assets/images/project_ai_platform_1794367988507.jpg' },
    { label: 'WooCommerce MacBook', url: '/src/assets/images/project_wordpress_store_1794367988517.jpg' },
    { label: 'Rashidul 3D Showcase', url: '/src/assets/images/hero_3d_rashidul_1794367987174.jpg' },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'wordpress': return 'WordPress & WooCommerce';
      case 'ai': return 'AI & Automation';
      case 'landing': return 'Landing Page Development';
      case 'design': return 'Branding & Design';
      default: return 'Web & Digital';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: getCategoryLabel(category),
      description: description.trim(),
      imageUrl: imageUrl.trim() || '/assets/aistudio/7485a2d5c688d5262d6049dbae1d1b84_c05bedca.jpg',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      client: client.trim() || 'Confidential Client',
      year: year.trim() || '2024',
      liveUrl: liveUrl.trim() || undefined,
      caseStudy: {
        challenge: challenge.trim() || 'Client needed a modern digital solution to boost online conversions and brand visibility.',
        solution: solution.trim() || 'Engineered a tailored, high-performance website with clean UI architecture and fast loading times.',
        results: results.trim() || 'Achieved high organic traffic and increased client inquiries.',
        toolsUsed: toolsInput.split(',').map(t => t.trim()).filter(Boolean),
      },
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8EAF0] dark:border-[#2D3748]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8500]" />
              <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider">
                Portfolio Management
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#171923] dark:text-white mt-1">
              Add New Project
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lumina — Organic Cosmetics Store"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              >
                <option value="wordpress">WordPress & WooCommerce</option>
                <option value="ai">AI & Automation</option>
                <option value="landing">Landing Page Development</option>
                <option value="design">Branding & Design</option>
              </select>
            </div>
          </div>

          {/* Client & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Client / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Lumina Health Co."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Year
              </label>
              <input
                type="text"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Short Summary Description *
            </label>
            <textarea
              required
              rows={2}
              placeholder="A brief overview of the project and key highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
            />
          </div>

          {/* Project Image URL & Quick Presets */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Project Image URL or Workspace Path
              </label>
              <span className="text-[10px] text-[#606575] dark:text-[#9EA3B0]">Preview available below</span>
            </div>

            <input
              type="text"
              required
              placeholder="/assets/aistudio/... or https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
            />

            {/* Quick Pick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-medium text-[#606575] dark:text-[#9EA3B0] mr-1">
                Quick Presets:
              </span>
              {imagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    imageUrl === preset.url
                      ? 'bg-orange-500/10 text-[#FF8500] border-orange-300 font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Image Thumbnail Preview */}
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden aspect-[16/9] max-h-36 bg-slate-200 dark:bg-slate-700">
                <img
                  src={imageUrl}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback visual if broken url
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags & Live URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="WooCommerce, Elementor, SEO"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Live URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>
          </div>

          {/* Case Study Details Section */}
          <div className="space-y-3 pt-2 border-t border-[#E8EAF0] dark:border-[#2D3748]">
            <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider block">
              Case Study Modal Details
            </span>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                The Challenge
              </label>
              <input
                type="text"
                placeholder="Client needed a high-speed eCommerce platform..."
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Our Solution
              </label>
              <input
                type="text"
                placeholder="Engineered custom WordPress architecture and schema markup..."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Key Result
                </label>
                <input
                  type="text"
                  placeholder="+140% sales & 98 PageSpeed"
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Tools Used (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="WordPress, WooCommerce, Elementor"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Portfolio</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
