import React, { useState, useEffect } from 'react'
import useCVStore from '../../store/cvStore'

const Projects = () => {
  const { projects, addProject, removeProject } = useCVStore()

  // form state to store new project inputs
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
  })

  // for tracking and limiting characters in description
  const [charCount, setCharCount] = useState(0)
  const maxChars = 300

  // update character count whenever description changes
  useEffect(() => {
    setCharCount(form.description.length)
  }, [form.description])

  // handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target

    // prevent description from going beyond max characters
    if (name === 'description' && value.length > maxChars) return

    setForm({ ...form, [name]: value })
  }

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // basic required field check
    if (!form.title.trim() || !form.techStack.trim() || !form.description.trim()) return

    // save to global store
    addProject(form)

    // reset form after submission
    setForm({ title: '', description: '', techStack: '', link: '' })
    setCharCount(0)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      {/* project form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* title input */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />

        {/* tech stack input */}
        <input
          type="text"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="Tech Stack (e.g., React, Node.js) *"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />

        {/* project link (optional) */}
        <input
          type="text"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project Link (optional)"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* description textarea */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description *"
          className={`border ${charCount === maxChars ? 'border-yellow-400' : 'border-gray-300'} rounded-lg px-3 py-2 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          rows={4}
          required
          maxLength={maxChars}
        />

        {/* bottom row: char count + submit button */}
        <div className="col-span-1 md:col-span-2 flex justify-between items-center">
          <span className={`text-xs ${charCount === maxChars ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
            {charCount}/{maxChars} characters
          </span>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Project
          </button>
        </div>
      </form>

      {/* display saved projects */}
      <div className="mt-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="relative border border-gray-300 rounded-lg bg-white p-5 mb-4 shadow-sm hover:shadow transition-shadow"
          >
            {/* remove button */}
            <button
              onClick={() => removeProject(idx)}
              className="absolute top-3 right-4 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>

            {/* project title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{proj.title}</h3>

            {/* tech stack (optional) */}
            {proj.techStack && (
              <p className="text-sm text-gray-500 italic mb-2">{proj.techStack}</p>
            )}

            {/* description */}
            {proj.description && (
              <p className="text-sm text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                {proj.description}
              </p>
            )}

            {/* project link (if any) */}
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
