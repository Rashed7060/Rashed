export interface Skill {
  id: string;
  name: string;
  category: 'web' | 'design' | 'ai';
  proficiency: number;
  barColor: string; // Tailwind gradient or color hex
  iconName: string;
  experienceYears?: string;
  description: string;
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  category: 'web' | 'design' | 'ai' | 'seo';
  description: string;
  deliverables: string[];
  iconName: string;
  popular?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'wordpress' | 'design' | 'ai' | 'landing' | 'video';
  categoryLabel: string;
  description: string;
  imageUrl: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  videoFileName?: string;
  tags: string[];
  client: string;
  year: string;
  liveUrl?: string;
  caseStudy: {
    challenge: string;
    solution: string;
    results: string;
    toolsUsed: string[];
  };
}

export interface AchievementStat {
  label: string;
  value: string;
  subtext: string;
  isEditable?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  socials: {
    facebook: string;
    linkedin: string;
    fiverr: string;
    upwork: string;
    instagram?: string;
    github?: string;
    youtube?: string;
  };
}
