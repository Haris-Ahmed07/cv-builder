import React from 'react'
import {
  DndContext, // Context provider to enable drag and drop
  closestCenter, // Collision detection algorithm that finds the closest center
  PointerSensor, // Sensor for pointer (mouse/touch) input
  useSensor, // Hook to use a single sensor
  useSensors // Hook to combine multiple sensors
} from '@dnd-kit/core'
import {
  SortableContext, // Context to enable sorting inside DndContext
  arrayMove, // Utility to reorder items in an array
  verticalListSortingStrategy // Strategy for vertical sorting layout
} from '@dnd-kit/sortable'
import useCVStore from '../../store/cvStore' // Zustand store for CV state
import SectionWrapper from './SectionWrapper' // Wrapper component for each CV section
import sectionMap from './sectionMap' // Mapping from section id to section component

const BuilderForm = ({ className = '' }) => {
  // Setup drag sensor with activation constraint (drag starts after moving 8px)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  )

  // Get section order and setter from store
  const { sectionOrder, setSectionOrder } = useCVStore()

  // Handle drag end event and reorder the sectionOrder array
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div
      className={`w-full h-full p-4 overflow-y-auto 
        bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg
        ${className}`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Build Your CV</h2>
      </div>

      {/* Setup DnD context and sortable context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {/* Render each section inside a wrapper, enabling drag handle and drop area */}
          {sectionOrder.map((id) => {
            const SectionComponent = sectionMap[id]
            return (
              <SectionWrapper key={id} id={id}>
                <div className="mb-6">{SectionComponent && <SectionComponent />}</div>
              </SectionWrapper>
            )
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default BuilderForm
