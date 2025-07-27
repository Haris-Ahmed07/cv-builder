import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Projects = () => {
  const { projects, addProject, removeProject } = useCVStore()

  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    addProject(form)
    setForm({ title: '', description: '', techStack: '', link: '' })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="Tech Stack (e.g., React, Node.js)"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project Link (optional)"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg col-span-1 md:col-span-2 hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </form>

      <div className="mt-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="relative border border-gray-300 rounded-lg bg-white p-5 mb-4 shadow-sm hover:shadow transition-shadow"
          >
            <button
              onClick={() => removeProject(idx)}
              className="absolute top-3 right-4 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-1">{proj.title}</h3>

            {proj.techStack && (
              <p className="text-sm text-gray-500 italic mb-2">{proj.techStack}</p>
            )}

            {proj.description && (
              <p className="text-sm text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                {proj.description}
              </p>
            )}

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
