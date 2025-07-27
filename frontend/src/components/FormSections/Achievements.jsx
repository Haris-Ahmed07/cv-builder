import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Achievements = () => {
  const { achievements, addAchievement, removeAchievement } = useCVStore()
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    addAchievement(input.trim())
    setInput('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="achievement"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an achievement"
          className="border border-gray-300 p-3 rounded-lg col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg col-span-2 transition-colors font-medium"
        >
          Add Achievement
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className="border border-gray-300 p-3 rounded-lg relative bg-gray-50"
          >
            <button
              onClick={() => removeAchievement(idx)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm font-semibold focus:outline-none"
              aria-label="Remove achievement"
            >
              Remove
            </button>
            <p className="text-sm text-gray-800">{ach}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Achievements
