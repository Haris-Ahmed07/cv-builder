import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const EducationForm = () => {
  // Zustand store values and functions for managing education entries
  const { education, addEducation, removeEducation } = useCVStore()

  // Local state for the education form fields
  const [form, setForm] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
  })

  // Handles input changes by updating local form state
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation for required fields
    if (!form.school || !form.degree) return
    // Add the form data to the global store
    addEducation(form)
    // Reset the form
    setForm({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
    })
  }

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Education</h2>

      {/* Education input form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="School / University"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="degree"
          value={form.degree}
          onChange={handleChange}
          placeholder="Degree"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="field"
          value={form.field}
          onChange={handleChange}
          placeholder="Field of Study"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="grade"
          value={form.grade}
          onChange={handleChange}
          placeholder="Grade / GPA"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="border border-gray-300 p-2 rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Education
        </button>
      </form>

      {/* Render added education entries below the form */}
      {education.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Added Entries</h3>
          {education.map((edu, index) => (
            <div
              key={index}
              className="border p-3 mb-2 rounded bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">{edu.school} — {edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.field}, {edu.startDate} to {edu.endDate}</p>
                  {edu.grade && <p className="text-sm text-gray-600">GPA: {edu.grade}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 font-bold text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
