import React, { useState, useEffect } from 'react'
import useCVStore from '../../store/cvStore'

const Achievements = () => {
  const { achievements, addAchievement, removeAchievement } = useCVStore()
  const [input, setInput] = useState('')
  const [charCount, setCharCount] = useState(0)
  const maxChars = 200

  useEffect(() => {
    setCharCount(input.length)
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || input.length > maxChars) return
    addAchievement(input.trim())
    setInput('')
  }

  const handleChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setInput(value)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="achievement"
          value={input}
          onChange={handleChange}
          placeholder="Add an achievement *"
          className={`border ${charCount === maxChars ? 'border-yellow-400' : 'border-gray-300'} p-3 rounded-lg col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          maxLength={maxChars}
          required
        />
        <div className="col-span-2 flex justify-between items-center">
          <span className={`text-xs ${charCount === maxChars ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
            {charCount}/{maxChars} characters
          </span>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
        >
            Add Achievement
          </button>
        </div>
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
