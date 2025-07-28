import React from 'react'
import { render, screen } from '@testing-library/react'
import CVSections from '../../src/components/CVSections'
import * as cvStore from '../../src/store/cvStore'

jest.mock('../../src/store/cvStore')

const mockState = {
  sectionOrder: [
    'PersonalInfo',
    'Summary',
    'Education',
    'Work',
    'Skills',
    'Achievements',
    'Projects',
    'Certifications',
    'Languages'
  ],
  personalInfo: {
    name: 'Haris Ahmed',
    email: 'haris@example.com',
    phone: '123456789',
    address: 'Karachi, Pakistan',
    linkedin: 'linkedin.com/in/haris',
    github: 'github.com/haris'
  },
  summary: 'A motivated full-stack developer.',
  education: [
    {
      degree: 'BS Computer Science',
      school: 'ABC University',
      field: 'Software Engineering',
      grade: '3.7 CGPA',
      startDate: '2019',
      endDate: '2023',
      description: 'Final Year Project on Autism Monitoring.'
    }
  ],
  workExperience: [
    {
      title: 'Frontend Developer',
      company: 'XYZ Ltd.',
      description: 'Worked with React and Tailwind.',
      startDate: '2023',
      endDate: '2024'
    }
  ],
  skills: ['React', 'Node.js', 'MongoDB'],
  achievements: ['Dean’s List 2022', 'Google Certified Developer'],
  projects: [
    {
      title: 'Resume Builder',
      techStack: 'React, Express, MongoDB',
      description: 'Built a resume web app.',
      link: 'https://github.com/haris/resume-builder'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon',
      date: '2024'
    }
  ],
  languages: ['English', 'Urdu']
}

describe('CVSections', () => {
  beforeEach(() => {
    cvStore.default = jest.fn(() => mockState)
  })

  it('renders all CV sections correctly', () => {
    render(<CVSections />)

    // Personal Info
    expect(screen.getByText('Haris Ahmed')).toBeInTheDocument()
    expect(screen.getByText(/haris@example\.com/)).toBeInTheDocument()
    expect(screen.getByText(/Karachi, Pakistan/)).toBeInTheDocument()

    // Summary
    expect(screen.getByText('Summary')).toBeInTheDocument()
    expect(screen.getByText(mockState.summary)).toBeInTheDocument()

    // Education
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('BS Computer Science')).toBeInTheDocument()
    expect(screen.getByText('ABC University')).toBeInTheDocument()

    // Work
    expect(screen.getByText('Work Experience')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('XYZ Ltd.')).toBeInTheDocument()

    // Skills
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText(/React.*Node\.js.*MongoDB/)).toBeInTheDocument()

    // Achievements
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Dean’s List 2022')).toBeInTheDocument()

    // Projects
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Resume Builder')).toBeInTheDocument()
    expect(screen.getByText('Built a resume web app.')).toBeInTheDocument()

    // Certifications
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('AWS Certified Developer')).toBeInTheDocument()

    // Languages
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText(/English.*Urdu/)).toBeInTheDocument()
  })
})
