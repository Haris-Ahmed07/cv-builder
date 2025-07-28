import React, { useState, useEffect } from 'react'
import useCVStore from '../../store/cvStore'

const EducationForm = () => {
  const { education, addEducation, removeEducation } = useCVStore()

  const [form, setForm] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
  })
  const [charCount, setCharCount] = useState(0)
  const maxChars = 400

  useEffect(() => {
    setCharCount(form.description.length)
  }, [form.description])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'description' && value.length > maxChars) {
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.school.trim() || !form.degree.trim()) return
    addEducation(form)
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
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="School / University *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="degree"
          value={form.degree}
          onChange={handleChange}
          placeholder="Degree *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="field"
          value={form.field}
          onChange={handleChange}
          placeholder="Field of Study *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="grade"
          value={form.grade}
          onChange={handleChange}
          placeholder="Grade / GPA *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start Date *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          placeholder="End Date *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <div className="relative col-span-1 md:col-span-2">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            maxLength={maxChars}
            className={`border ${charCount === maxChars ? 'border-yellow-400' : 'border-gray-300'} rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
            rows={3}
          />
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${charCount === maxChars ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
              {charCount}/{maxChars} characters
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
        >
          Add Education
        </button>
      </form>

      {education.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Added Entries</h3>
          {education.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 mb-3 rounded-lg bg-gray-50 flex justify-between items-start"
            >
              <div>
                <p className="font-bold text-gray-900">{edu.school} — {edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.field || 'N/A'}, {edu.startDate || 'Start'} to {edu.endDate || 'End'}</p>
                {edu.grade && <p className="text-sm text-gray-600">GPA: {edu.grade}</p>}
                {edu.description && <p className="text-sm mt-1 text-gray-700">{edu.description}</p>}
              </div>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:underline text-sm font-semibold focus:outline-none"
                aria-label="Remove education entry"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
