import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const WorkExperience = () => {
  // Pull work experience data and actions from Zustand store
  const { workExperience, addWorkExperience, removeWorkExperience } = useCVStore()

  // Local form state to handle input fields
  const [form, setForm] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  // Update form fields as user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle form submission: add to store and reset form
  const handleSubmit = (e) => {
    e.preventDefault()
    addWorkExperience(form)
    setForm({ title: '', company: '', startDate: '', endDate: '', description: '' })
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

      {/* Work experience input form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          Add Experience
        </button>
      </form>

      {/* Display list of added experiences */}
      <div className="mt-4">
        {workExperience.map((exp, idx) => (
          <div key={idx} className="border p-3 mt-2 rounded relative">
            {/* Remove experience button */}
            <button
              onClick={() => removeWorkExperience(idx)}
              className="absolute top-1 right-2 text-red-500 text-sm"
            >
              Remove
            </button>
            {/* Display experience info */}
            <p className="font-semibold">{exp.title} at {exp.company}</p>
            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience
