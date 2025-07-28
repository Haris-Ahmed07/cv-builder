import React, { useState } from 'react'
import useCVStore from '../../store/cvStore'

const Skills = () => {
  const { skills, addSkill, removeSkill } = useCVStore()
  const [skillInput, setSkillInput] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!skillInput.trim()) return
    addSkill(skillInput.trim())
    setSkillInput('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <form onSubmit={handleAdd} className="flex gap-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter a skill"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Skill input"
          maxLength={30}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
          >
            <span className="mr-2">{skill}</span>
            <button
              onClick={() => removeSkill(idx)}
              className="text-red-500 text-xs hover:text-red-700 focus:outline-none"
              aria-label={`Remove skill ${skill}`}
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
