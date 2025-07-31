import { create } from 'zustand'

// This is the central store managing all data for the CV Builder
const useCVStore = create((set) => ({
  // Personal information section
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
  },

  // Text summary/intro at the top of the CV
  summary: '',

  // Lists for each major CV section
  education: [],
  workExperience: [],
  skills: [],
  achievements: [],
  projects: [],
  certifications: [],
  languages: [],

  // Initial section order for drag-and-drop
  sectionOrder: [
    'PersonalInfo',
    'Summary',
    'Education',
    'Work',
    'Skills',
    'Achievements',
    'Projects',
    'Certifications',
    'Languages',
  ],

  // Function to update section order
  setSectionOrder: (updater) =>
    set((state) => ({
      sectionOrder: typeof updater === 'function' ? updater(state.sectionOrder) : updater
    })),

  // Updates multiple fields in personal info (merges with old data)
  updatePersonalInfo: (newInfo) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        ...newInfo,
      },
    })),

  // Updates the summary text
  setSummary: (value) => set({ summary: value }),

  // Replaces the entire education array
  updateEducation: (newEducation) =>
    set(() => ({ education: newEducation })),

  // Adds one education item
  addEducation: (newEducation) =>
    set((state) => ({
      education: [...state.education, newEducation],
    })),

  // Deletes an education item using its index
  removeEducation: (indexToRemove) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== indexToRemove),
    })),

  // Adds one work experience entry
  addWorkExperience: (newWork) =>
    set((state) => ({
      workExperience: [...state.workExperience, newWork],
    })),

  // Deletes a work experience entry by index
  removeWorkExperience: (index) =>
    set((state) => ({
      workExperience: state.workExperience.filter((_, i) => i !== index),
    })),

  // Adds a new skill
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),

  // Removes a skill by index
  removeSkill: (index) =>
    set((state) => ({
      skills: state.skills.filter((_, i) => i !== index),
    })),

  // Adds an achievement (simple string or object)
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),

  // Removes an achievement by index
  removeAchievement: (index) =>
    set((state) => ({
      achievements: state.achievements.filter((_, i) => i !== index),
    })),

  // Adds a project (title, description, etc.)
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  // Removes a project by index
  removeProject: (index) =>
    set((state) => ({
      projects: state.projects.filter((_, i) => i !== index),
    })),

  // Adds a certification (title, provider, year, etc.)
  addCertification: (certification) =>
    set((state) => ({
      certifications: [...state.certifications, certification],
    })),

  // Removes a certification by index
  removeCertification: (index) =>
    set((state) => ({
      certifications: state.certifications.filter((_, i) => i !== index),
    })),

  // Adds a language (name + level if you want)
  addLanguage: (lang) =>
    set((state) => ({
      languages: [...state.languages, lang],
    })),

  // Removes a language by index
  removeLanguage: (index) =>
    set((state) => ({
      languages: state.languages.filter((_, i) => i !== index),
    })),

  // Updates the entire CV store with new resume data
  updateCVStore: (newData) => {
    return set((state) => {
      const updatedState = {
        personalInfo: newData.personalInfo || state.personalInfo,
        summary: newData.summary || state.summary,
        education: Array.isArray(newData.education) ? [...newData.education] : state.education,
        workExperience: Array.isArray(newData.workExperience) ? [...newData.workExperience] : state.workExperience,
        skills: Array.isArray(newData.skills) ? [...newData.skills] : state.skills,
        achievements: Array.isArray(newData.achievements) ? [...newData.achievements] : state.achievements,
        projects: Array.isArray(newData.projects) ? [...newData.projects] : state.projects,
        certifications: Array.isArray(newData.certifications) ? [...newData.certifications] : state.certifications,
        languages: Array.isArray(newData.languages) ? [...newData.languages] : state.languages,
        sectionOrder: Array.isArray(newData.sectionOrder) ? [...newData.sectionOrder] : state.sectionOrder,
      };
      return updatedState;
    });
  },
}));

export default useCVStore;
