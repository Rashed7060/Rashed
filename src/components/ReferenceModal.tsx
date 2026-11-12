import React, { useState } from 'react';
import { Eye, X, Image as ImageIcon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ReferenceModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating comparison badge in bottom corner */}
      <div className="fixed bottom-5 left-5 z-40 print:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[#1A1D27]/90 backdrop-blur-md border border-[#E8EAF0] dark:border-[#2D3748] shadow-lg hover:shadow-xl text-xs font-semibold text-[#171923] dark:text-white hover:text-[#FF8500] hover:border-orange-300 dark:hover:border-orange-500/40 transition-all duration-200 cursor-pointer group"
          title="Compare with original reference layout"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#FF8500] group-hover:scale-110 transition-transform" />
          <span>Design Reference</span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-4 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAF0] dark:border-[#2D3748]">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#171923] dark:text-white">
                  Visual Reference Image
                </h3>
                <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                  Original inspiration layout: Floating navbar, 3D character, About Me starburst, and Skill cards.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-xl bg-slate-100 dark:bg-slate-900 p-2">
              <img
                src={PERSONAL_INFO.referenceImage}
                alt="Reference design layout"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-[#606575] dark:text-[#9EA3B0]">
              <span>Faithfully reproduced with custom 3D art, modern typography & interactive tools.</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-full bg-[#FF8500] text-white font-medium hover:bg-[#FF7700] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
