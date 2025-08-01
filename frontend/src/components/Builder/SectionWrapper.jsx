import React, { useState, useRef, useCallback } from 'react'
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckCircle, AlertCircle } from 'lucide-react'

const SectionWrapper = ({ id, children, completed }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dragHandleRef = useRef(null)
  const isDraggingRef = useRef(false)

  // Setup sortable behavior for drag-and-drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id,
    // Only allow dragging from the specific handle
    handle: dragHandleRef
  })

  // Apply transform/transition styles from dnd-kit
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Ensure the section doesn't interfere with scrolling
    touchAction: 'auto'
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

  // Handle drag start to prevent conflicts
  const handleDragStart = useCallback((e) => {
    isDraggingRef.current = true
    // Prevent the drag from interfering with other interactions
    e.stopPropagation()
  }, [])

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    // Small delay to prevent click events from firing after drag
    setTimeout(() => {
      isDraggingRef.current = false
    }, 100)
  }, [])

  // Handle section toggle - prevent if we're dragging
  const handleToggle = useCallback((e) => {
    // Don't toggle if we just finished dragging
    if (isDraggingRef.current) {
      e.preventDefault()
      return
    }
    setIsOpen(!isOpen)
  }, [isOpen])

  // Handle touch events on drag handle
  const handleTouchStart = useCallback((e) => {
    // Mark that we're starting a potential drag
    isDraggingRef.current = true
    // Don't prevent default here - let dnd-kit handle it
  }, [])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative border border-gray-200 rounded-lg p-1 sm:p-2 bg-white shadow mb-2 ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
    >
      {/* Section header with title and controls */}
      <div className="flex items-center text-xs sm:text-sm">
        {/* Drag handle - isolated touch handling */}
        <div 
          ref={dragHandleRef}
          className="select-none touch-none"
          {...attributes}
          {...listeners}
          onMouseDown={handleDragStart}
          onTouchStart={handleTouchStart}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          <button
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-2 -ml-2 touch-manipulation"
            tabIndex={-1}
            aria-label="Drag section"
            style={{
              // Prevent any scrolling interference on the drag handle
              touchAction: 'none',
              // Ensure the button doesn't interfere with drag detection
              pointerEvents: 'none'
            }}
          >
            <GripVertical size={18} />
          </button>
        </div>

        {/* Clickable area for title and chevron - separate from drag handle */}
        <div
          className="flex justify-between items-center w-full cursor-pointer select-none"
          onClick={handleToggle}
          style={{
            // Allow normal scrolling on this area
            touchAction: 'auto'
          }}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold flex-1 select-none text-[10px] sm:text-xs">
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
      {isOpen && (
        <div 
          className="mt-4"
          style={{
            // Ensure content area allows normal scrolling
            touchAction: 'auto'
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default SectionWrapper