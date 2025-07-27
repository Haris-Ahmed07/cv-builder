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
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a language"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim()}
        >
          Add
        </button>
      </form>

      <ul className="mt-4 flex flex-wrap gap-2">
        {languages.map((lang, idx) => (
          <li
            key={idx}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800 relative flex items-center"
          >
            {lang}
            <button
              onClick={() => removeLanguage(idx)}
              className="ml-2 text-red-500 text-xs hover:text-red-700 focus:outline-none"
              aria-label={`Remove language ${lang}`}
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
