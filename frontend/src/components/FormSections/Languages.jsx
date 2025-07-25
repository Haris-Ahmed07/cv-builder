import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Languages = () => {
  const { languages, addLanguage, removeLanguage } = useCVStore()
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    addLanguage(input.trim())
    setInput('')
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Languages</h2>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a language"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* Show added languages */}
      <ul className="mt-4 flex flex-wrap gap-2">
        {languages.map((lang, idx) => (
          <li
            key={idx}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800 relative"
          >
            {lang}
            <button
              onClick={() => removeLanguage(idx)}
              className="ml-2 text-red-500 text-xs"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Languages
