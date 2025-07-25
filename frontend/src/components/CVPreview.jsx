import React from 'react'
import useCVStore from '../store/cvStore'

const CVPreview = () => {
  // Pull all relevant CV state from the Zustand store
  const { personalInfo, education, workExperience, skills, achievements, projects, certifications } = useCVStore()

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
        {/* Personal info (only show if fields are filled) */}
        <div className="text-center mb-6">
          {personalInfo.name && (
            <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
              {personalInfo.name}
            </h1>
          )}
          {(personalInfo.email || personalInfo.phone) && (
            <p className="text-sm" style={{ color: '#4b5563' }}>
              {personalInfo.email}{personalInfo.email && personalInfo.phone ? ' | ' : ''}{personalInfo.phone}
            </p>
          )}
          {personalInfo.address && (
            <p className="text-sm" style={{ color: '#4b5563' }}>
              {personalInfo.address}
            </p>
          )}
          {personalInfo.linkedin && (
            <p className="text-sm" style={{ color: '#4b5563' }}>
              <span className="font-medium">LinkedIn:</span> {personalInfo.linkedin}
            </p>
          )}
          {personalInfo.github && (
            <p className="text-sm" style={{ color: '#4b5563' }}>
              <span className="font-medium">GitHub:</span> {personalInfo.github}
            </p>
          )}
        </div>

        {/* Education section */}
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

        {/* Work experience section */}
        {workExperience.length > 0 && (
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

        {/* Projects section */}
        {projects.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Projects</h2>
            <div className="mb-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-semibold">{proj.title}</p>
                  <p className="text-sm text-gray-600 italic">{proj.techStack}</p>
                  <p className="text-sm text-gray-700">{proj.description}</p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Skills section */}
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

        {/* Achievements section */}
        {achievements.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Achievements</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
              {achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </>
        )}

        {/* Certifications section */}
        {certifications.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 border-b pb-1" style={{ color: '#1f2937' }}>Certifications</h2>
            <div className="mb-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} {cert.date && `— ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default CVPreview
