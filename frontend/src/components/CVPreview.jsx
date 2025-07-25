import React from 'react'
import useCVStore from '../store/cvStore'

// Main CV preview component that renders all sections
const CVPreview = () => {
  // Grab all CV data and section order from the store
  const {
    sectionOrder,
    personalInfo,
    education,
    workExperience,
    skills,
    achievements,
    projects,
    certifications,
    summary,
    languages
  } = useCVStore()

  // Map section names to their render functions for dynamic rendering
  const sectionRenderMap = {
    PersonalInfo: () =>
      <div className="text-center mb-6">
        {/* Render name if available */}
        {personalInfo.name && (
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
        )}
        {/* Render email and phone if present */}
        {(personalInfo.email || personalInfo.phone) && (
          <p className="text-sm text-gray-600">
            {personalInfo.email}{personalInfo.email && personalInfo.phone ? ' | ' : ''}{personalInfo.phone}
          </p>
        )}
        {/* Render address if present */}
        {personalInfo.address && <p className="text-sm text-gray-600">{personalInfo.address}</p>}
        {/* Render LinkedIn and GitHub if present */}
        {personalInfo.linkedin && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">LinkedIn:</span> {personalInfo.linkedin}
          </p>
        )}
        {personalInfo.github && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">GitHub:</span> {personalInfo.github}
          </p>
        )}
      </div>,

    Summary: () =>
      summary && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Summary</h2>
          <p className="text-sm text-gray-700 mb-4">{summary}</p>
        </>
      ),

    Education: () =>
      education.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Education</h2>
          <div className="mb-4">
            {/* Render each education entry */}
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{edu.school} — {edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.field}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} – {edu.endDate}
                  {edu.grade && ` | GPA: ${edu.grade}`}
                </p>
                {/* Optional description */}
                {edu.description && (
                  <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ),

    Work: () =>
      workExperience.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Work Experience</h2>
          <div className="mb-4">
            {/* Render each work experience */}
            {workExperience.map((work, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{work.title} — {work.company}</p>
                <p className="text-sm text-gray-600">{work.startDate} – {work.endDate}</p>
                {/* Optional description */}
                {work.description && (
                  <p className="text-sm text-gray-700 mt-1">{work.description}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ),

    Skills: () =>
      skills.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Skills</h2>
          {/* Render skills as badges */}
          <ul className="mb-4 flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <li key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">
                {skill}
              </li>
            ))}
          </ul>
        </>
      ),

    Achievements: () =>
      achievements.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Achievements</h2>
          {/* List achievements */}
          <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
            {achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </>
      ),

    Projects: () =>
      projects.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Projects</h2>
          <div className="mb-4">
            {/* Render each project */}
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-sm text-gray-600 italic">{proj.techStack}</p>
                <p className="text-sm text-gray-700">{proj.description}</p>
                {/* Optional project link */}
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600">
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      ),

    Certifications: () =>
      certifications.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Certifications</h2>
          <div className="mb-4">
            {/* Render each certification */}
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
      ),

    Languages: () =>
      languages.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Languages</h2>
          {/* Render languages as badges */}
          <ul className="mb-4 flex flex-wrap gap-2">
            {languages.map((lang, idx) => (
              <li key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">
                {lang}
              </li>
            ))}
          </ul>
        </>
      )
  }

  // Main render of the CV preview
  return (
    <div className="w-full">
      <div
        id="cv-preview"
        className="border rounded p-6 shadow-md w-full"
        style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#d1d5db' }}
      >
        {/* Render sections in the specified order */}
        {sectionOrder.map(id => (
          <React.Fragment key={id}>
            {sectionRenderMap[id]?.()}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default CVPreview
