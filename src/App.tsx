import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HireModal } from './components/HireModal';
import { ResumeModal } from './components/ResumeModal';
import { ReferenceModal } from './components/ReferenceModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [colorTheme, setColorTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_color_theme');
      if (saved) return saved;
    }
    return 'blue'; // Royal Sapphire (modern executive blue matching his new portrait)
  });

  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [selectedServiceForHire, setSelectedServiceForHire] = useState<string | undefined>(undefined);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', colorTheme);
    localStorage.setItem('portfolio_color_theme', colorTheme);
  }, [colorTheme]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenHireModal = (serviceName?: string) => {
    setSelectedServiceForHire(serviceName);
    setHireModalOpen(true);
  };

  const handleCloseHireModal = () => {
    setHireModalOpen(false);
    setSelectedServiceForHire(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#0B0E17] text-[#606575] dark:text-[#9EA3B0] transition-colors duration-200 flex flex-col justify-between selection:bg-[#FF8500] selection:text-white">
      {/* Floating Center Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        colorTheme={colorTheme}
        onSelectColorTheme={setColorTheme}
        onOpenHireModal={handleOpenHireModal}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenHireModal={() => handleOpenHireModal()}
        />

        {/* About Me Section */}
        <About onOpenHireModal={() => handleOpenHireModal()} />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={handleCloseHireModal}
        preselectedService={selectedServiceForHire}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloatingButton />

      {/* Reference comparison widget */}
      <ReferenceModal />
    </div>
  );
}
