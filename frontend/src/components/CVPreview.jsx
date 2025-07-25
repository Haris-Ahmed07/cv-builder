import React from 'react'
import useCVStore from '../store/cvStore'

const CVPreview = () => {
  const { personalInfo, education, workExperience, skills, achievements } = useCVStore()

  return (
    <div className="max-w-3xl mx-auto">
      <div
        id="cv-preview"
        className="border rounded p-6 shadow-md"
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          borderColor: '#d1d5db'
        }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p className="text-sm" style={{ color: '#4b5563' }}>
            {personalInfo.email || 'your@email.com'} | {personalInfo.phone || 'Phone Number'}
          </p>
          <p className="text-sm" style={{ color: '#4b5563' }}>
            {personalInfo.address || 'Address'}
          </p>
          <p className="text-sm" style={{ color: '#4b5563' }}>
            <span className="font-medium">LinkedIn:</span> {personalInfo.linkedin || 'linkedin.com/in/username'}
          </p>
          <p className="text-sm" style={{ color: '#4b5563' }}>
            <span className="font-medium">GitHub:</span> {personalInfo.github || 'github.com/username'}
          </p>
        </div>

        {education.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Education</h2>
            <div className="mb-4">
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold">{edu.school} — {edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.field}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} – {edu.endDate}
                    {edu.grade && ` | GPA: ${edu.grade}`}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {workExperience?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Work Experience</h2>
            <div className="mb-4">
              {workExperience.map((work, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold">{work.title} — {work.company}</p>
                  <p className="text-sm text-gray-600">{work.startDate} – {work.endDate}</p>
                  {work.description && (
                    <p className="text-sm text-gray-700 mt-1">{work.description}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Skills</h2>
            <ul className="mb-4 flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <li key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">
                  {skill}
                </li>
              ))}
            </ul>
          </>
        )}

        {achievements?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Achievements</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
              {achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default CVPreview
