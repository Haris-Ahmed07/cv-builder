import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

// Achievements section component
const Achievements = () => {
  // Get achievements and actions from store
  const { achievements, addAchievement, removeAchievement } = useCVStore()

  // Local state for input field
  const [input, setInput] = useState('')

  // Handle adding new achievement
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return // Ignore empty input
    addAchievement(input.trim())
    setInput('') // Clear input
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      {/* Form to add achievement */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="achievement"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an achievement"
          className="border border-gray-300 p-2 rounded col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          Add Achievement
        </button>
      </form>

      {/* Show list of achievements */}
      <div className="mt-4">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className="border p-3 mt-2 rounded relative"
          >
            {/* Button to remove achievement */}
            <button
              onClick={() => removeAchievement(idx)}
              className="absolute top-1 right-2 text-red-500 text-sm"
            >
              Remove
            </button>
            <p className="text-sm">{ach}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Achievements
