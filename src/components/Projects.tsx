import React, { useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { 
  ExternalLink, Eye, ArrowRight, Plus, Trash2, RotateCcw, 
  CheckCircle2, AlertTriangle, Layers, Sparkles 
} from 'lucide-react';
import { AddProjectModal } from './AddProjectModal';

export const Projects: React.FC = () => {
  // Load stored projects from localStorage or default
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_custom_projects');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {
          console.error('Error parsing stored projects:', e);
        }
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'wordpress' | 'design' | 'ai' | 'landing'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Delete confirmation state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage whenever projects state changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.title}" has been added!`);
  };

  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    const title = projectToDelete.title;
    setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
    setProjectToDelete(null);
    showToast(`Project "${title}" has been deleted.`);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all projects back to the default showcase? Any custom added projects will be replaced.')) {
      setProjects(DEFAULT_PROJECTS);
      showToast('Projects reset to default showcase.');
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-24 relative bg-slate-50/50 dark:bg-[#0c0e14]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171923] dark:text-white">
            My <span className="text-[#FF8500]">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0]">
            A showcase of my recent client work, digital platforms, and creative experiments.
          </p>
        </div>

        {/* Management & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white dark:bg-[#1A1D27] rounded-full border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('wordpress')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'wordpress'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              SEO & Web Platforms
            </button>
            <button
              onClick={() => setActiveFilter('ai')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'ai'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              AI & Automation
            </button>
            <button
              onClick={() => setActiveFilter('design')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'design'
                  ? 'bg-[#FF8500] text-white shadow-sm'
                  : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              Branding & Design
            </button>
          </div>

          {/* Action Buttons: Add Project & Reset */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Reset button */}
            <button
              onClick={handleResetToDefaults}
              title="Reset to default showcase"
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-[#1A1D27] border border-transparent hover:border-[#E8EAF0] dark:hover:border-[#2D3748] transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* + Add Project Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>

        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-[#1A1D27] rounded-3xl p-10 border border-[#E8EAF0] dark:border-[#2D3748] text-center max-w-md mx-auto space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/40 text-[#FF8500] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#171923] dark:text-white">
                No Projects in this Category
              </h3>
              <p className="text-xs text-[#606575] dark:text-[#9EA3B0] mt-1">
                You can add a new project now or switch category filters.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
              <button
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                View All
              </button>
            </div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-[#1A1D27] rounded-3xl overflow-hidden border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/30 transition-all duration-300 group flex flex-col justify-between relative"
              >
                {/* Media Thumbnail Container with Clean Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Right Quick Delete Button */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectToDelete(project);
                      }}
                      title="Delete project"
                      aria-label="Delete project"
                      className="w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-500 hover:text-red-500 hover:bg-white dark:hover:bg-black border border-white/40 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scrim Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Case Study</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full text-white bg-[#FF8500] hover:bg-[#FF7700] shadow-md transition-colors"
                          title="Open Live Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata per Frontend Constitution */}
                    <div className="flex items-center gap-2 text-xs text-[#FF8500] font-medium mb-1.5">
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#606575] dark:text-[#9EA3B0]">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#606575] dark:text-[#9EA3B0]">{project.client}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-[#171923] dark:text-white group-hover:text-[#FF8500] transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#606575] dark:text-[#9EA3B0] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags list as clean text items */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-[#FF8500] hover:text-[#e67300] flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {/* Delete link */}
                      <button
                        onClick={() => setProjectToDelete(project)}
                        className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Delete this project"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setProjectToDelete(null)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#171923] dark:text-white">
                Delete Project?
              </h3>
              <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                Are you sure you want to remove <strong>"{projectToDelete.title}"</strong> from your portfolio? This can be undone by clicking the reset button.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteProject}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E8EAF0] dark:border-[#2D3748]">
              <div>
                <span className="text-xs font-semibold text-[#FF8500] uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#171923] dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Image with Scroll */}
            <div className="rounded-2xl overflow-hidden max-h-80 sm:max-h-96 bg-slate-100 dark:bg-slate-800 overflow-y-auto border border-slate-200 dark:border-slate-700 shadow-inner">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-auto object-cover object-top"
              />
            </div>
            <div className="text-[11px] text-[#606575] dark:text-[#9EA3B0] flex items-center justify-between px-1">
              <span>Scroll inside image preview to inspect the full page layout</span>
              <span className="text-[#FF8500] font-semibold">100% Responsive Storefront</span>
            </div>

            {/* Case Study Details */}
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-[#171923] dark:text-white mb-1">The Challenge:</h4>
                <p className="text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#171923] dark:text-white mb-1">Our Solution:</h4>
                <p className="text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-orange-950/25 border border-orange-100 dark:border-orange-500/20">
                <div className="flex items-center gap-2 font-bold text-[#FF8500] mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Result:</span>
                </div>
                <p className="text-sm font-medium text-[#171923] dark:text-white">
                  {selectedProject.caseStudy.results}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#171923] dark:text-white mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.caseStudy.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between">
              {selectedProject.liveUrl ? (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors flex items-center gap-1.5"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171923] dark:bg-white text-white dark:text-[#171923] px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FF8500]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
