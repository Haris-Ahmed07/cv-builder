import React, { useState } from 'react'
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SectionWrapper = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

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
      {/* Header row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {sectionTitles[id] || id}
          </h3>
        </div>

        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default SectionWrapper
