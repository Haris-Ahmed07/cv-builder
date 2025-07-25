import React from 'react'
import useCVStore from '../../store/cvStore'

const PersonalInfo = () => {
  const { personalInfo, updatePersonalInfo } = useCVStore()

  const handleChange = (e) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="github"
          value={personalInfo.github}
          onChange={handleChange}
          placeholder="GitHub"
          className="border p-2 rounded"
        />
      </div>
    </div>
  )
}

export default PersonalInfo
