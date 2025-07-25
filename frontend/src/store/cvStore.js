import { create } from 'zustand'

// Zustand store to manage all CV-related state
const useCVStore = create((set) => ({
  // Basic personal information
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
  },

  // Core sections of the CV
  education: [],
  workExperience: [],
  skills: [],
  achievements: [],
  projects: [],
  certifications: [],

  // Update any personal info field (merges with existing)
  updatePersonalInfo: (newInfo) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        ...newInfo,
      },
    })),

  // Replace the whole education array (bulk update)
  updateEducation: (newEducation) =>
    set(() => ({
      education: newEducation,
    })),

  // Add one education entry
  addEducation: (newEducation) =>
    set((state) => ({
      education: [...state.education, newEducation],
    })),

  // Remove a specific education entry using its index
  removeEducation: (indexToRemove) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== indexToRemove),
    })),

  // Add one work experience entry
  addWorkExperience: (newWork) =>
    set((state) => ({
      workExperience: [...state.workExperience, newWork],
    })),

  // Remove a work entry by index
  removeWorkExperience: (index) =>
    set((state) => ({
      workExperience: state.workExperience.filter((_, i) => i !== index),
    })),

  // Add a new skill to the list
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),

  // Remove a skill from the list by index
  removeSkill: (index) =>
    set((state) => ({
      skills: state.skills.filter((_, i) => i !== index),
    })),

  // Add an achievement (can be a string or object if you expand later)
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),

  // Remove an achievement by index
  removeAchievement: (index) =>
    set((state) => ({
      achievements: state.achievements.filter((_, i) => i !== index),
    })),

  // Add a project with title, description, etc.
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  // Remove a project by index
  removeProject: (index) =>
    set((state) => ({
      projects: state.projects.filter((_, i) => i !== index),
    })),

  // Add a certification (title, provider, year, etc.)
  addCertification: (certification) =>
    set((state) => ({
      certifications: [...state.certifications, certification],
    })),

  // Remove a certification by index
  removeCertification: (index) =>
    set((state) => ({
      certifications: state.certifications.filter((_, i) => i !== index),
    })),
}))

export default useCVStore
