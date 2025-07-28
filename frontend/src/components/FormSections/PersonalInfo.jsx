import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const PersonalInfo = () => {
  const { personalInfo, updatePersonalInfo } = useCVStore()
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    let error = ''
    
    if (name === 'name') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        error = 'Name should contain only alphabets and spaces'
      }
    } else if (name === 'email' && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address'
      }
    } else if (name === 'phone' && value) {
      // Remove all non-digit characters except + for validation
      const digitsOnly = value.replace(/[^\d+]/g, '')
      if (!/^\+?[0-9]{12}$/.test(digitsOnly)) {
        error = 'Please enter a 12-digit phone number with country code (e.g., +123456789012)'
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
    
    return !error
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    
    // Format input based on field type
    if (name === 'name') {
      // Prevent numbers in name field
      value = value.replace(/[0-9]/g, '')
    } else if (name === 'phone') {
      // Allow only numbers and + at start for phone
      value = value.replace(/[^0-9+]/g, '')
      // Only allow + at the start
      if (value.length > 1 && value.startsWith('+')) {
        value = '+' + value.slice(1).replace(/[^0-9]/g, '')
      }
      // Limit to 12 digits after +
      const digitsOnly = value.replace(/[^0-9]/g, '')
      if (digitsOnly.length > 12) {
        value = value.slice(0, -1)
      }
    }
    
    validateField(name, value)
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
          <div key={name} className="space-y-1">
            <input
              type={type}
              name={name}
              value={personalInfo[name] || ''}
              onChange={handleChange}
              onBlur={(e) => validateField(name, e.target.value)}
              placeholder={placeholder}
              className={`w-full border ${errors[name] ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfo
