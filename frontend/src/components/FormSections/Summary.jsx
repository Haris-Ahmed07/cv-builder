import React from 'react'
import useCVStore from '../../store/cvStore'

const Summary = () => {
  const { summary, setSummary } = useCVStore()

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write a short summary about yourself..."
        rows={5}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </div>
  )
}

export default Summary
