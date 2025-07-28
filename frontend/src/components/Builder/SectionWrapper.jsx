import React, { useState } from 'react'
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Wrapper for each resume section with drag-and-drop and toggle visibility
const SectionWrapper = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false) // Tracks if section is expanded

  // Setup sortable behavior for drag-and-drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  // Apply transform/transition styles from dnd-kit
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  // Map section keys to display titles
  const sectionTitles = {
    PersonalInfo: 'Personal Information',
    Summary: 'Summary',
    Education: 'Education',
    Work: 'Work Experience',
    Skills: 'Skills',
    Achievements: 'Achievements',
    Projects: 'Projects',
    Certifications: 'Certifications',
    Languages: 'Languages'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative border border-gray-200 rounded-xl p-4 bg-white shadow mb-4"
    >
      {/* Section header with title and controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Drag handle */}
          <button
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>
          {/* Section title */}
          <h3 className="text-lg font-semibold text-gray-800">
            {sectionTitles[id] || id}
          </h3>
        </div>

        {/* Toggle collapse/expand */}
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Show section content if expanded */}
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default SectionWrapper
