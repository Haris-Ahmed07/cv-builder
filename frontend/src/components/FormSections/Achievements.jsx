import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Achievements = () => {
  // Access achievements state and update functions from Zustand store
  const { achievements, addAchievement, removeAchievement } = useCVStore()

  // Local state to manage input field value
  const [input, setInput] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Prevent adding empty or whitespace-only achievements
    if (!input.trim()) return
    // Add achievement to global store
    addAchievement(input.trim())
    // Reset input field
    setInput('')
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>

      {/* Input form to add a new achievement */}
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

      {/* List of added achievements */}
      <div className="mt-4">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className="border p-3 mt-2 rounded relative"
          >
            {/* Remove button for individual achievement */}
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
