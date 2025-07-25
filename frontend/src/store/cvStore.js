import { create } from 'zustand'

const useCVStore = create((set) => ({
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
  },
  education: [],
  workExperience: [],
  updatePersonalInfo: (newInfo) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        ...newInfo,
      },
    })),
  updateEducation: (newEducation) =>
    set(() => ({
      education: newEducation,
    })),
  addEducation: (newEducation) =>
    set((state) => ({
      education: [...state.education, newEducation],
    })),
  removeEducation: (indexToRemove) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== indexToRemove),
    })),
  addWorkExperience: (newWork) =>
    set((state) => ({
      workExperience: [...state.workExperience, newWork],
    })),

  removeWorkExperience: (index) =>
    set((state) => ({
      workExperience: state.workExperience.filter((_, i) => i !== index),
    })),

}))

export default useCVStore
