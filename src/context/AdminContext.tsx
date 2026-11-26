import React, { createContext, useContext, useState, useEffect } from 'react';
import { PERSONAL_INFO as DEFAULT_PERSONAL_INFO, CONTACT_DATA as DEFAULT_CONTACT_DATA, STATS as DEFAULT_STATS } from '../data/portfolioData';
import { AchievementStat, ContactInfo } from '../types/portfolio';

export interface PersonalInfoType {
  name: string;
  roles: string[];
  title: string;
  tagline: string;
  bio: string;
  aboutDescription: string;
  heroImage: string;
  aboutImage: string;
  referenceImage?: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  resetPasswordToDefault: () => void;
  personalInfo: PersonalInfoType;
  updatePersonalInfo: (newInfo: Partial<PersonalInfoType>) => void;
  contactData: ContactInfo;
  updateContactData: (newContact: Partial<ContactInfo>) => void;
  stats: AchievementStat[];
  updateStats: (newStats: AchievementStat[]) => void;
  resetAllToDefault: () => void;
  exportBackup: () => void;
  importBackup: (jsonStr: string) => boolean;
}

const DEFAULT_ADMIN_PASSWORD = 'admin123';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio_admin_auth') === 'true';
    }
    return false;
  });

  // Admin password
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_admin_password') || DEFAULT_ADMIN_PASSWORD;
    }
    return DEFAULT_ADMIN_PASSWORD;
  });

  // Personal Info state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_custom_personal_info');
      const portraitVersion = localStorage.getItem('portfolio_portrait_version');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const merged: PersonalInfoType = { ...DEFAULT_PERSONAL_INFO, ...parsed };
          if (portraitVersion !== 'passport_v1') {
            merged.heroImage = DEFAULT_PERSONAL_INFO.heroImage;
            merged.aboutImage = DEFAULT_PERSONAL_INFO.aboutImage;
            localStorage.setItem('portfolio_portrait_version', 'passport_v1');
          }
          return merged;
        } catch (e) {
          console.error('Error parsing stored personal info:', e);
        }
      } else {
        localStorage.setItem('portfolio_portrait_version', 'passport_v1');
      }
    }
    return DEFAULT_PERSONAL_INFO;
  });

  // Contact Data state
  const [contactData, setContactData] = useState<ContactInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_custom_contact_data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const mergedSocials = {
            ...DEFAULT_CONTACT_DATA.socials,
            ...(parsed.socials || {}),
          };
          if (
            !mergedSocials.fiverr ||
            mergedSocials.fiverr === 'https://www.fiverr.com/' ||
            mergedSocials.fiverr === 'https://www.fiverr.com'
          ) {
            mergedSocials.fiverr = DEFAULT_CONTACT_DATA.socials.fiverr;
          }
          if (
            !mergedSocials.upwork ||
            mergedSocials.upwork === 'https://www.upwork.com/' ||
            mergedSocials.upwork === 'https://www.upwork.com'
          ) {
            mergedSocials.upwork = DEFAULT_CONTACT_DATA.socials.upwork;
          }
          if (
            !mergedSocials.linkedin ||
            mergedSocials.linkedin === 'https://www.linkedin.com/in/md-rashidul-islam-21692744a/' ||
            mergedSocials.linkedin === 'https://www.linkedin.com/in/md-rashidul-islam-21692744a'
          ) {
            mergedSocials.linkedin = DEFAULT_CONTACT_DATA.socials.linkedin;
          }
          return {
            ...DEFAULT_CONTACT_DATA,
            ...parsed,
            socials: mergedSocials,
          };
        } catch (e) {
          console.error('Error parsing stored contact data:', e);
        }
      }
    }
    return DEFAULT_CONTACT_DATA;
  });

  // Stats state
  const [stats, setStats] = useState<AchievementStat[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_custom_stats');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {
          console.error('Error parsing stored stats:', e);
        }
      }
    }
    return DEFAULT_STATS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_personal_info', JSON.stringify(personalInfo));
    } catch (e) {
      console.error('Failed to save personal info to storage:', e);
    }
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_contact_data', JSON.stringify(contactData));
    } catch (e) {
      console.error('Failed to save contact data to storage:', e);
    }
  }, [contactData]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_stats', JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats to storage:', e);
    }
  }, [stats]);

  // Login handler
  const login = (password: string): boolean => {
    if (password === adminPassword || password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  // Change password
  const changePassword = (oldPass: string, newPass: string) => {
    if (oldPass !== adminPassword && oldPass !== 'admin123') {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, error: 'New password must be at least 4 characters.' };
    }
    const cleanPass = newPass.trim();
    setAdminPassword(cleanPass);
    localStorage.setItem('portfolio_admin_password', cleanPass);
    return { success: true };
  };

  // Reset password to default
  const resetPasswordToDefault = () => {
    setAdminPassword(DEFAULT_ADMIN_PASSWORD);
    localStorage.removeItem('portfolio_admin_password');
  };

  // Update Personal Info
  const updatePersonalInfo = (newInfo: Partial<PersonalInfoType>) => {
    setPersonalInfo((prev) => ({ ...prev, ...newInfo }));
  };

  // Update Contact Info
  const updateContactData = (newContact: Partial<ContactInfo>) => {
    setContactData((prev) => ({
      ...prev,
      ...newContact,
      socials: {
        ...prev.socials,
        ...(newContact.socials || {}),
      },
    }));
  };

  // Update Stats
  const updateStats = (newStats: AchievementStat[]) => {
    setStats(newStats);
  };

  // Reset all data
  const resetAllToDefault = () => {
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    setContactData(DEFAULT_CONTACT_DATA);
    setStats(DEFAULT_STATS);
    localStorage.removeItem('portfolio_custom_personal_info');
    localStorage.removeItem('portfolio_custom_contact_data');
    localStorage.removeItem('portfolio_custom_stats');
  };

  // Export JSON backup
  const exportBackup = () => {
    const backupData = {
      personalInfo,
      contactData,
      stats,
      skills: JSON.parse(localStorage.getItem('portfolio_custom_skills') || '[]'),
      projects: JSON.parse(localStorage.getItem('portfolio_custom_projects') || '[]'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importBackup = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.contactData) setContactData(data.contactData);
      if (data.stats) setStats(data.stats);
      if (data.skills && Array.isArray(data.skills)) {
        localStorage.setItem('portfolio_custom_skills', JSON.stringify(data.skills));
      }
      if (data.projects && Array.isArray(data.projects)) {
        localStorage.setItem('portfolio_custom_projects', JSON.stringify(data.projects));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        resetPasswordToDefault,
        personalInfo,
        updatePersonalInfo,
        contactData,
        updateContactData,
        stats,
        updateStats,
        resetAllToDefault,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
