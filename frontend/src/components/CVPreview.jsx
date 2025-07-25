import React from 'react'
import useCVStore from '../store/cvStore'

const CVPreview = () => {
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
          <h1 className="text-xl font-bold tracking-wider uppercase text-black">
            {personalInfo.name}
          </h1>
        )}
        <p className="text-[11px] text-black mt-[2px]">
          {[personalInfo.email, personalInfo.phone].filter(Boolean).join(' | ')}
        </p>
        <p className="text-[11px] text-black">
          {[personalInfo.address, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}
        </p>
      </div>
    ),

    Summary: () =>
      summary && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Professional Summary
          </h2>
          <p className="text-[11px] text-justify">{summary}</p>
        </div>
      ),

    Education: () =>
      education.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between text-[11px]">
                <p className="font-semibold">{edu.degree}</p>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-[11px]">{edu.school}</p>
              {edu.field && <p className="text-[11px]">{edu.field}</p>}
              {edu.grade && <p className="text-[11px]">GPA: {edu.grade}</p>}
              {edu.description && <p className="text-[11px]">{edu.description}</p>}
            </div>
          ))}
        </div>
      ),

    Work: () =>
      workExperience.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between text-[11px]">
                <p className="font-semibold">{work.title}</p>
                <span>{work.startDate} – {work.endDate}</span>
              </div>
              <p className="text-[11px]">{work.company}</p>
              {work.description && <p className="text-[11px]">{work.description}</p>}
            </div>
          ))}
        </div>
      ),

    Skills: () =>
      skills.length > 0 && (
        <div className="mb-2 text-start ">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Skills
          </h2>
          <p className="text-[11px]">{skills.join(' | ')}</p>
        </div>
      ),

    Achievements: () =>
      achievements.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Achievements
          </h2>
          <ul className="list-disc pl-4 text-[11px] space-y-[2px]">
            {achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      ),

    Projects: () =>
      projects.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Projects
          </h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-1">
              <p className="text-[11px] font-semibold">{proj.title}</p>
              {proj.techStack && (
                <p className="text-[11px] italic">{proj.techStack}</p>
              )}
              <p className="text-[11px]">{proj.description}</p>
              {proj.link && (
                <p className="text-[11px] text-blue-700">{proj.link}</p>
              )}
            </div>
          ))}
        </div>
      ),

    Certifications: () =>
      certifications.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Certifications
          </h2>
          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-1 text-[11px]">
              <div className="flex justify-between">
                <p className="font-semibold">{cert.name}</p>
                {cert.date && <span>{cert.date}</span>}
              </div>
              <p>{cert.issuer}</p>
            </div>
          ))}
        </div>
      ),

    Languages: () =>
      languages.length > 0 && (
        <div className="mb-2 text-start">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-black border-b border-black pb-[2px] mb-[2px]">
            Languages
          </h2>
          <p className="text-[11px]">{languages.join(' | ')}</p>
        </div>
      ),
  }

  return (
    <div className="w-full flex justify-center py-6 bg-white">
      <div
        id="cv-preview"
        className="bg-white w-[794px] min-h-[1123px] px-[40px] py-[30px] border border-black"
        style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: '11px',
          lineHeight: '1.4',
        }}
      >
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
