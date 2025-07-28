import React, { useState, useEffect } from 'react'
import useCVStore from '../../store/cvStore'

const WorkExperience = () => {
  const { workExperience, addWorkExperience, removeWorkExperience } = useCVStore()

  // form state to hold user input
  const [form, setForm] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  // track character count for description field
  const [charCount, setCharCount] = useState(0)
  const maxChars = 400

  // update char count when description changes
  useEffect(() => {
    setCharCount(form.description.length)
  }, [form.description])

  // update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'description' && value.length > maxChars) return
    setForm({ ...form, [name]: value })
  }

  // handle form submit and validate required fields
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !form.title.trim() ||
      !form.company.trim() ||
      !form.startDate ||
      !form.endDate ||
      !form.description.trim()
    )
      return

    // add experience and reset form
    addWorkExperience(form)
    setForm({ title: '', company: '', startDate: '', endDate: '', description: '' })
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      {/* form to add new work experience */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="month"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date *"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="month"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date *"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* description textarea with char limit display */}
        <div className="relative col-span-1 md:col-span-2">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description *"
            required
            maxLength={maxChars}
            className={`w-full p-2 border ${charCount === maxChars ? 'border-yellow-400' : 'border-gray-300'} rounded`}
            rows={3}
          />
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${charCount === maxChars ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
              {charCount}/{maxChars} characters
            </span>
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          Add Experience
        </button>
      </form>

      {/* list of added work experiences */}
      <div className="mt-4">
        {workExperience.map((exp, idx) => (
          <div key={idx} className="border p-3 mt-2 rounded relative">
            <button
              onClick={() => removeWorkExperience(idx)}
              className="absolute top-1 right-2 text-red-500 text-sm"
            >
              Remove
            </button>
            <p className="font-semibold">{exp.title} at {exp.company}</p>
            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience
