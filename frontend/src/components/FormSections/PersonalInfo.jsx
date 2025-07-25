import React from 'react'
import useCVStore from '../../store/cvStore'

const PersonalInfo = () => {
  // Get personalInfo state and updater function from Zustand store
  const { personalInfo, updatePersonalInfo } = useCVStore()

  // Handle input field changes and update store
  const handleChange = (e) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Personal Information</h3>

      {/* Input fields for personal information */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="Address"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="github"
          value={personalInfo.github}
          onChange={handleChange}
          placeholder="GitHub"
          className="border border-gray-300 p-2 rounded"
        />
      </div>
    </div>
  )
}

export default PersonalInfo
