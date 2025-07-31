import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const PersonalInfo = () => {
  // pulling current personalInfo state and update function from store
  const { personalInfo, updatePersonalInfo } = useCVStore()

  // to store field-specific errors
  const [errors, setErrors] = useState({})

  // runs field-level validation and updates error state
  const validateField = (name, value) => {
    let error = ''
    
    if (name === 'name') {
      // only letters and spaces allowed
      if (!/^[A-Za-z\s]+$/.test(value)) {
        error = 'Name should contain only alphabets and spaces'
      }
    } else if (name === 'email' && value) {
      // basic email pattern
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address'
      }
    } else if (name === 'phone' && value) {
      // allow only digits and optional +
      const digitsOnly = value.replace(/[^0-9]/g, '')
      if (!/^\+?[0-9]{11,13}$/.test(value) || digitsOnly.length < 11 || digitsOnly.length > 13) {
        error = 'Phone number must be 11, 12, or 13 digits (with country code, e.g., +12345678901)'
      }
    }

    // update errors state
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))

    return !error
  }

  // handles input changes and formatting
  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'name') {
      // strip digits from name field
      value = value.replace(/[0-9]/g, '')
    } else if (name === 'phone') {
      // only allow numbers and leading +
      value = value.replace(/[^0-9+]/g, '')
      if (value.length > 1 && value.startsWith('+')) {
        value = '+' + value.slice(1).replace(/[^0-9]/g, '')
      }
      const digitsOnly = value.replace(/[^0-9]/g, '')
      if (digitsOnly.length > 13) {
        value = value.slice(0, -1)
      }
    }

    validateField(name, value)
    updatePersonalInfo({ [name]: value }) // update global state
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
              className={`w-full border ${errors[name] ? 'border-red-500' : 'border-gray-300'} p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {/* show validation message below input if error exists */}
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
