import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Projects = () => {
  // Access projects array and state modifiers from Zustand store
  const { projects, addProject, removeProject } = useCVStore()

  // Local state to handle form input values
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
  })

  // Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle form submit to prevent empty title, then add to store and reset form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title) return // title is required
    addProject(form)
    setForm({ title: '', description: '', techStack: '', link: '' })
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      {/* Project input form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="Tech Stack (e.g., React, Node.js)"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project Link (optional)"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-gray-300 rounded px-3 py-2 w-full md:col-span-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          Add Project
        </button>
      </form>

      {/* Project list display */}
      <div className="mt-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="relative border border-gray-300 rounded-lg bg-white p-5 mb-4 shadow-sm hover:shadow transition-shadow"
          >
            {/* Remove button */}
            <button
              onClick={() => removeProject(idx)}
              className="absolute top-3 right-4 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{proj.title}</h3>

            {/* Tech Stack */}
            {proj.techStack && (
              <p className="text-sm text-gray-500 italic mb-2">{proj.techStack}</p>
            )}

            {/* Description */}
            {proj.description && (
              <p className="text-sm text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                {proj.description}
              </p>
            )}

            {/* Link */}
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm text-blue-600 hover:underline"
              >
                🔗 View Project
              </a>
            )}
          </div>
        ))}


      </div>
    </div>
  )
}

export default Projects
