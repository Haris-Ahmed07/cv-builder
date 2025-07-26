import React from 'react'
import useCVStore from '../store/cvStore'

const baseTextClass = "text-[9px] text-black font-sans leading-tight"
const headingClass = "text-[9px] font-semibold uppercase tracking-wide text-black border-b border-black pb-2 mb-1"

const CVSections = () => {
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

  const sectionRenderMap = {
    PersonalInfo: () => (
      <div className="mb-2 text-center">
        {personalInfo.name && (
          <h1 className="text-[11px] font-extrabold tracking-wide uppercase text-black font-sans mb-0.5">
            {personalInfo.name}
          </h1>
        )}
        <p className={baseTextClass + " mt-0.5"}>
          {[personalInfo.email, personalInfo.phone].filter(Boolean).join(' | ')}
        </p>
        <p className={baseTextClass}>
          {[personalInfo.address, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}
        </p>
      </div>
    ),
    Summary: () =>
      summary && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Summary</h2>
          <p className={baseTextClass}>{summary}</p>
        </div>
      ),
    Education: () =>
      education.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-center mb-1">
                <p className={baseTextClass + " font-bold"}>{edu.degree}</p>
                <span className={baseTextClass}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className={baseTextClass + " mb-0.5"}>{edu.school}</p>
              {edu.field && <p className={baseTextClass + " mb-0.5"}>{edu.field}</p>}
              {edu.grade && <p className={baseTextClass + " mb-0.5"}>GPA: {edu.grade}</p>}
              {edu.description && <p className={baseTextClass + " mb-0.5"}>{edu.description}</p>}
            </div>
          ))}
        </div>
      ),
    Work: () =>
      workExperience.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Work Experience</h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-center mb-1">
                <p className={baseTextClass + " font-bold"}>{work.title}</p>
                <span className={baseTextClass}>{work.startDate} – {work.endDate}</span>
              </div>
              <p className={baseTextClass + " mb-0.5"}>{work.company}</p>
              {work.description && <p className={baseTextClass + " mb-0.5"}>{work.description}</p>}
            </div>
          ))}
        </div>
      ),
    Skills: () =>
      skills.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Skills</h2>
          <p className={baseTextClass}>{skills.join(' | ')}</p>
        </div>
      ),
    Achievements: () =>
      achievements.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Achievements</h2>
          <ul className={"list-disc pl-4 " + baseTextClass + " space-y-0.5"}>
            {achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      ),
    Projects: () =>
      projects.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-1">
              <p className={baseTextClass + " font-bold mb-0.5"}>{proj.title}</p>
              {proj.techStack && (
                <p className={baseTextClass + " italic mb-0.5"}>{proj.techStack}</p>
              )}
              <p className={baseTextClass + " mb-0.5"}>{proj.description}</p>
              {proj.link && (
                <a href={proj.link} className={baseTextClass + " underline mb-0.5"}>{proj.link}</a>
              )}
            </div>
          ))}
        </div>
      ),
    Certifications: () =>
      certifications.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Certifications</h2>
          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-1">
              <div className="flex justify-between items-center mb-1">
                <p className={baseTextClass + " font-bold"}>{cert.name}</p>
                {cert.date && <span className={baseTextClass}>{cert.date}</span>}
              </div>
              <p className={baseTextClass + " mb-0.5"}>{cert.issuer}</p>
            </div>
          ))}
        </div>
      ),
    Languages: () =>
      languages.length > 0 && (
        <div className="mb-2 text-left">
          <h2 className={headingClass}>Languages</h2>
          <p className={baseTextClass}>{languages.join(' | ')}</p>
        </div>
      ),
  }

  return (
    <>
      {sectionOrder.map(id => (
        <React.Fragment key={id}>
          {sectionRenderMap[id]?.()}
        </React.Fragment>
      ))}
    </>
  )
}

export default CVSections
