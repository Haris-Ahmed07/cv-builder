import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Skills = () => {
  // Zustand store methods and state
  const { skills, addSkill, removeSkill } = useCVStore()

  // Local input state for the skill field
  const [skillInput, setSkillInput] = useState('')

  // Handle adding a new skill to the store
  const handleAdd = (e) => {
    e.preventDefault()
    if (!skillInput.trim()) return // prevent empty or whitespace-only input
    addSkill(skillInput.trim())
    setSkillInput('') // reset input after adding
  }

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      {/* Input form for adding skills */}
      <form onSubmit={handleAdd} className="flex gap-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter a skill"
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Display list of added skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
          >
            <span className="mr-2">{skill}</span>
            {/* Button to remove a specific skill */}
            <button
              onClick={() => removeSkill(idx)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
