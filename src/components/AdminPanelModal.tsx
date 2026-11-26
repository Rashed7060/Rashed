import React, { useState, useRef } from 'react';
import { 
  X, Image as ImageIcon, Type, Phone, BarChart2, Shield, 
  Upload, RotateCcw, Check, Save, Download, AlertCircle, 
  ExternalLink, LogOut, CheckCircle2, Sparkles, RefreshCw
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { PERSONAL_INFO as DEFAULT_INFO, CONTACT_DATA as DEFAULT_CONTACT, STATS as DEFAULT_STATS } from '../data/portfolioData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { 
    logout, 
    personalInfo, 
    updatePersonalInfo, 
    contactData, 
    updateContactData, 
    stats, 
    updateStats,
    changePassword,
    resetAllToDefault,
    exportBackup,
    importBackup,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'contact' | 'stats' | 'security'>('photos');

  // Local draft state for editing before saving
  const [draftInfo, setDraftInfo] = useState(personalInfo);
  const [draftContact, setDraftContact] = useState(contactData);
  const [draftStats, setDraftStats] = useState(stats);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // Toast notice
  const [toast, setToast] = useState<string | null>(null);

  // File input refs
  const heroFileRef = useRef<HTMLInputElement>(null);
  const aboutFileRef = useRef<HTMLInputElement>(null);
  const backupFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Handle image file upload converting to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'about') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === 'hero') {
        setDraftInfo((prev) => ({ ...prev, heroImage: dataUrl }));
        updatePersonalInfo({ heroImage: dataUrl });
      } else {
        setDraftInfo((prev) => ({ ...prev, aboutImage: dataUrl }));
        updatePersonalInfo({ aboutImage: dataUrl });
      }
      showToast(`${target === 'hero' ? 'Hero' : 'About'} photo updated successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Restore default original photo
  const handleRestoreDefaultPhoto = (target: 'hero' | 'about') => {
    const defaultImg = DEFAULT_INFO.heroImage;
    if (target === 'hero') {
      setDraftInfo((prev) => ({ ...prev, heroImage: defaultImg }));
      updatePersonalInfo({ heroImage: defaultImg });
    } else {
      setDraftInfo((prev) => ({ ...prev, aboutImage: defaultImg }));
      updatePersonalInfo({ aboutImage: defaultImg });
    }
    showToast(`${target === 'hero' ? 'Hero' : 'About'} photo restored to default!`);
  };

  // Save all text & bio changes
  const handleSaveTextChanges = () => {
    updatePersonalInfo(draftInfo);
    showToast('Website text and bio updated successfully!');
  };

  // Save contact & social changes
  const handleSaveContactChanges = () => {
    updateContactData(draftContact);
    showToast('Contact and social links updated successfully!');
  };

  // Save stats changes
  const handleSaveStatsChanges = () => {
    updateStats(draftStats);
    showToast('Achievements and stats updated successfully!');
  };

  // Change password handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ success: false, msg: 'New passwords do not match.' });
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordFeedback({ success: true, msg: 'Password changed successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordFeedback(null), 4000);
    } else {
      setPasswordFeedback({ success: false, msg: res.error || 'Failed to change password.' });
    }
  };

  // Reset everything to defaults
  const handleFullReset = () => {
    if (window.confirm('Are you sure you want to restore all website content, photos, and text back to original defaults?')) {
      resetAllToDefault();
      setDraftInfo(DEFAULT_INFO);
      setDraftContact(DEFAULT_CONTACT);
      setDraftStats(DEFAULT_STATS);
      showToast('All website content restored to defaults!');
    }
  };

  // Handle backup import file
  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = importBackup(content);
      if (ok) {
        showToast('Backup restored successfully!');
        window.location.reload();
      } else {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-4xl w-full h-[90vh] shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#171923] dark:text-white">
                  Admin Control Panel
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Logged In
                </span>
              </div>
              <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                Edit photos, text, contact information, and portfolio settings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-[#E8EAF0] dark:border-[#2D3748] flex items-center gap-1 overflow-x-auto shrink-0 bg-white dark:bg-[#1A1D27]">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'photos'
                ? 'border-[#FF8500] text-[#FF8500]'
                : 'border-transparent text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Website Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'text'
                ? 'border-[#FF8500] text-[#FF8500]'
                : 'border-transparent text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Bio & Text</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-[#FF8500] text-[#FF8500]'
                : 'border-transparent text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact & Socials</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-[#FF8500] text-[#FF8500]'
                : 'border-transparent text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-[#FF8500] text-[#FF8500]'
                : 'border-transparent text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Password & Backup</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-500/20 text-xs text-[#606575] dark:text-[#9EA3B0] flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#FF8500] shrink-0" />
                <span>
                  Upload your real photograph or paste an image link. Changes will immediately appear in the Hero and About sections.
                </span>
              </div>

              {/* Hero Image Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-[#171923] dark:text-white">
                    Hero Section Photo (Main Profile)
                  </h4>
                  <button
                    onClick={() => handleRestoreDefaultPhoto('hero')}
                    className="text-xs text-[#FF8500] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Default Portrait</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Photo Preview */}
                  <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-orange-400 shadow-md shrink-0 bg-white">
                    <img
                      src={draftInfo.heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    {/* File upload button */}
                    <div>
                      <input
                        type="file"
                        ref={heroFileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'hero')}
                      />
                      <button
                        type="button"
                        onClick={() => heroFileRef.current?.click()}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo From Device</span>
                      </button>
                    </div>

                    {/* Or URL input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#606575] dark:text-[#9EA3B0]">
                        Or enter direct image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://example.com/my-photo.jpg"
                          value={draftInfo.heroImage}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftInfo({ ...draftInfo, heroImage: val });
                            updatePersonalInfo({ heroImage: val });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Image Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-[#171923] dark:text-white">
                    About Section Photo
                  </h4>
                  <button
                    onClick={() => handleRestoreDefaultPhoto('about')}
                    className="text-xs text-[#FF8500] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Default Portrait</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Photo Preview */}
                  <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-orange-400 shadow-md shrink-0 bg-white">
                    <img
                      src={draftInfo.aboutImage}
                      alt="About Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <input
                        type="file"
                        ref={aboutFileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'about')}
                      />
                      <button
                        type="button"
                        onClick={() => aboutFileRef.current?.click()}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo From Device</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#606575] dark:text-[#9EA3B0]">
                        Or enter direct image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://example.com/my-photo.jpg"
                          value={draftInfo.aboutImage}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftInfo({ ...draftInfo, aboutImage: val });
                            updatePersonalInfo({ aboutImage: val });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BIO & TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  value={draftInfo.name}
                  onChange={(e) => setDraftInfo({ ...draftInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Professional Title / Specializations
                </label>
                <input
                  type="text"
                  value={draftInfo.title}
                  onChange={(e) => setDraftInfo({ ...draftInfo, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Hero Tagline / Heading Pitch
                </label>
                <textarea
                  rows={3}
                  value={draftInfo.tagline}
                  onChange={(e) => setDraftInfo({ ...draftInfo, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Short Bio (Used in resume & summaries)
                </label>
                <textarea
                  rows={3}
                  value={draftInfo.bio}
                  onChange={(e) => setDraftInfo({ ...draftInfo, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  About Me Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={draftInfo.aboutDescription}
                  onChange={(e) => setDraftInfo({ ...draftInfo, aboutDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveTextChanges}
                  className="w-full py-3 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Text & Bio Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={draftContact.phone}
                    onChange={(e) => setDraftContact({ ...draftContact, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={draftContact.email}
                    onChange={(e) => setDraftContact({ ...draftContact, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    value={draftContact.location}
                    onChange={(e) => setDraftContact({ ...draftContact, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Availability Status
                  </label>
                  <input
                    type="text"
                    value={draftContact.availability}
                    onChange={(e) => setDraftContact({ ...draftContact, availability: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 border-t border-[#E8EAF0] dark:border-[#2D3748] space-y-4">
                <h4 className="font-heading font-bold text-sm text-[#171923] dark:text-white">
                  Social Media Links
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Facebook Profile URL
                  </label>
                  <input
                    type="url"
                    value={draftContact.socials.facebook}
                    onChange={(e) =>
                      setDraftContact({
                        ...draftContact,
                        socials: { ...draftContact.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={draftContact.socials.linkedin}
                    onChange={(e) =>
                      setDraftContact({
                        ...draftContact,
                        socials: { ...draftContact.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Fiverr Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.fiverr.com/your-username"
                    value={draftContact.socials.fiverr}
                    onChange={(e) =>
                      setDraftContact({
                        ...draftContact,
                        socials: { ...draftContact.socials, fiverr: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Upwork Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.upwork.com/freelancers/your-profile"
                    value={draftContact.socials.upwork}
                    onChange={(e) =>
                      setDraftContact({
                        ...draftContact,
                        socials: { ...draftContact.socials, upwork: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveContactChanges}
                  className="w-full py-3 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact & Socials</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-500/20 text-xs text-[#606575] dark:text-[#9EA3B0]">
                These 3 statistics are displayed in the About Me section of the portfolio.
              </div>

              {draftStats.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider">
                      Statistic #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#171923] dark:text-white">
                        Value (e.g. 5+, 10+, 100+)
                      </label>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const copy = [...draftStats];
                          copy[idx] = { ...copy[idx], value: e.target.value };
                          setDraftStats(copy);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-sm font-mono font-bold text-[#FF8500]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#171923] dark:text-white">
                        Label Title
                      </label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const copy = [...draftStats];
                          copy[idx] = { ...copy[idx], label: e.target.value };
                          setDraftStats(copy);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-xs font-semibold text-[#171923] dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#171923] dark:text-white">
                      Subtext Description
                    </label>
                    <input
                      type="text"
                      value={st.subtext}
                      onChange={(e) => {
                        const copy = [...draftStats];
                        copy[idx] = { ...copy[idx], subtext: e.target.value };
                        setDraftStats(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#606575] dark:text-[#9EA3B0]"
                    />
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveStatsChanges}
                  className="w-full py-3 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Statistics</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: PASSWORD & BACKUP */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
              
              {/* Change Password Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm space-y-4">
                <h4 className="font-heading font-bold text-base text-[#171923] dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FF8500]" />
                  <span>Change Admin Password</span>
                </h4>

                {passwordFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      passwordFeedback.success
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300'
                    }`}
                  >
                    {passwordFeedback.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{passwordFeedback.msg}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#171923] dark:text-white">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Current password (default: admin123)"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#171923] dark:text-white">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="At least 4 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#171923] dark:text-white">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Backup & Restore */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1D27] border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm space-y-4">
                <h4 className="font-heading font-bold text-base text-[#171923] dark:text-white">
                  Backup & Restore Site Data
                </h4>
                <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                  Download a JSON backup of your site information or upload a previously saved backup file.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={exportBackup}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <input
                    type="file"
                    ref={backupFileRef}
                    accept=".json"
                    className="hidden"
                    onChange={handleImportBackupFile}
                  />
                  <button
                    type="button"
                    onClick={() => backupFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#171923] dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-[#E8EAF0] dark:border-[#2D3748]"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import JSON Backup</span>
                  </button>
                </div>
              </div>

              {/* Reset Everything */}
              <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-3">
                <h4 className="font-heading font-bold text-base text-red-600 dark:text-red-400">
                  Danger Zone
                </h4>
                <p className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                  Reset all photos, text, contact info, and custom stats back to their initial showcase defaults.
                </p>
                <button
                  type="button"
                  onClick={handleFullReset}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore All Website Defaults</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Floating Toast Notification */}
        {toast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#171923] text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-fade-in border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
          <span className="text-[#606575] dark:text-[#9EA3B0]">
            All updates sync instantly to your website.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#FF8500] hover:bg-[#FF7700] transition-colors cursor-pointer"
          >
            Close & View Website
          </button>
        </div>
      </div>
    </div>
  );
};
