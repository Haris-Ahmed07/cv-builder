import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Certifications = () => {
  // get certifications and actions from store
  const { certifications, addCertification, removeCertification } = useCVStore()

  // form state for new certification
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    date: '',
  })

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // add new certification
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name) return
    addCertification(form)
    setForm({ name: '', issuer: '', date: '' })
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Certifications</h2>

      {/* add certification form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Certification Name"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="issuer"
          value={form.issuer}
          onChange={handleChange}
          placeholder="Issued By"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          Add Certification
        </button>
      </form>

      {/* list certifications */}
      <div className="mt-4">
        {certifications.map((cert, idx) => (
          <div key={idx} className="border p-3 mt-2 rounded relative">
            {/* remove button */}
            <button
              onClick={() => removeCertification(idx)}
              className="absolute top-1 right-2 text-red-500 text-sm"
            >
              Remove
            </button>
            <p className="font-semibold">{cert.name}</p>
            <p className="text-sm text-gray-600">{cert.issuer}</p>
            <p className="text-sm text-gray-500">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certifications
