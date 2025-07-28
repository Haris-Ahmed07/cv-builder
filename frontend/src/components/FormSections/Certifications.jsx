import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Certifications = () => {
  // Access certifications state and update functions from the store
  const { certifications, addCertification, removeCertification } = useCVStore()

  // Local state for the certification form
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    date: '',
  })

  // Handle input changes and update local state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Prevent empty fields
    if (!form.name.trim() || !form.issuer.trim() || !form.date) return
    addCertification(form) // Add new certification
    setForm({ name: '', issuer: '', date: '' }) // Reset form
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      {/* Certification input form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Certification Name *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          name="issuer"
          value={form.issuer}
          onChange={handleChange}
          placeholder="Issued By *"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg col-span-2 transition-colors font-medium"
        >
          Add Certification
        </button>
      </form>

      {/* List of added certifications */}
      <div className="mt-4 space-y-3">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="border border-gray-300 p-3 rounded-lg relative bg-gray-50"
          >
            {/* Remove button for a certification */}
            <button
              onClick={() => removeCertification(idx)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm font-semibold focus:outline-none"
              aria-label="Remove certification"
            >
              Remove
            </button>
            {/* Certification details */}
            <p className="font-semibold text-gray-800">{cert.name}</p>
            <p className="text-sm text-gray-600">{cert.issuer}</p>
            <p className="text-sm text-gray-500">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certifications
