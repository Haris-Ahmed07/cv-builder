import React, { useState, useEffect } from 'react'
import useCVStore from '../../store/cvStore'

const Summary = () => {
  const { summary, setSummary } = useCVStore()
  const [charCount, setCharCount] = useState(summary.length)
  const maxChars = 600

  useEffect(() => {
    setCharCount(summary.length)
  }, [summary])

  const handleSummaryChange = (e) => {
    const newValue = e.target.value
    if (newValue.length <= maxChars) {
      setSummary(newValue)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="relative">
        <textarea
          value={summary}
          onChange={handleSummaryChange}
          placeholder="Write a short summary about yourself..."
          rows={5}
          maxLength={maxChars}
          className={`w-full border ${charCount === maxChars ? 'border-yellow-400' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
        />
        <div className="flex justify-end mt-1">
          <span className={`text-sm ${charCount === maxChars ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
            {charCount}/{maxChars} characters
          </span>
        </div>
      </div>
    </div>
  )
}

export default Summary
