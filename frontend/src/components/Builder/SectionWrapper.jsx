import React, { useState } from 'react'
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Wrapper for each resume section with drag-and-drop and toggle visibility
import { CheckCircle, AlertCircle } from 'lucide-react'

const SectionWrapper = ({ id, children, completed }) => {
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
      <div className="flex items-center">
        {/* Drag handle */}
        <button
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing mr-2"
          {...attributes}
          {...listeners}
          onClick={e => e.stopPropagation()}
          tabIndex={-1}
          aria-label="Drag section"
        >
          <GripVertical size={18} />
        </button>
        {/* Clickable area for title and chevron, full width */}
        <div
          className="flex justify-between items-center w-full cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {sectionTitles[id] || id}
              </h3>
              {completed ? (
                <CheckCircle size={20} className="text-green-500" title="Completed" />
              ) : (
                <AlertCircle size={20} className="text-orange-400" title="Incomplete" />
              )}
            </div>
            <span>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
        </div>
      </div>

      {/* Show section content if expanded */}
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default SectionWrapper
