import React from 'react'
import useCVStore from '../../store/cvStore'

// Summary component for editing the professional summary section of the CV
const Summary = () => {
  // Get summary value and setter from the global store
  const { summary, setSummary } = useCVStore()

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      {/* Section title */}
      <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
      {/* Textarea for user to input their summary */}
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)} // Update summary in store on change
        placeholder="Write a short summary about yourself..."
        rows={5}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
  )
}

export default Summary
