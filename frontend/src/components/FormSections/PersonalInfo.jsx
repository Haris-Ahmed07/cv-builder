import React from 'react'
import useCVStore from '../../store/cvStore'

const PersonalInfo = () => {
  const { personalInfo, updatePersonalInfo } = useCVStore()

  const handleChange = (e) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="grid grid-cols-1 gap-4">
        {[
          { name: 'name', type: 'text', placeholder: 'Full Name' },
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'phone', type: 'tel', placeholder: 'Phone Number' },
          { name: 'address', type: 'text', placeholder: 'Address' },
          { name: 'linkedin', type: 'text', placeholder: 'LinkedIn' },
          { name: 'github', type: 'text', placeholder: 'GitHub' },
        ].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={personalInfo[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ))}
      </div>
    </div>
  )
}

export default PersonalInfo
